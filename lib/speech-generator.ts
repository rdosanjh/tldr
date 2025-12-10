import { experimental_generateSpeech as generateSpeech } from 'ai';
import { openai } from '@ai-sdk/openai';

export interface SpeechOptions {
  voice?: 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer';
  model?: 'tts-1' | 'tts-1-hd';
}

export async function generateAudio(
  text: string,
  options: SpeechOptions = {}
): Promise<Uint8Array> {
  const { voice = 'alloy', model = 'tts-1' } = options;
  const MAX_CHARS = 4096;

  if (text.length <= MAX_CHARS) {
    return generateSingleAudio(text, voice, model);
  }

  const chunks = chunkText(text, MAX_CHARS);
  const audioChunks: Uint8Array[] = [];

  for (const chunk of chunks) {
    const audio = await generateSingleAudio(chunk, voice, model);
    audioChunks.push(audio);
  }

  return concatenateAudio(audioChunks);
}

async function generateSingleAudio(
  text: string,
  voice: string,
  model: string
): Promise<Uint8Array> {
  const result = await generateSpeech({
    model: openai.speech(model),
    text,
    voice,
  });

  // The result.audio is a DefaultGeneratedAudioFile with uint8ArrayData property
  const audio = result.audio as {
    uint8ArrayData?: Uint8Array;
    base64Data?: string;
  };

  if (audio.uint8ArrayData) {
    return audio.uint8ArrayData;
  }

  if (audio.base64Data) {
    const binaryString = atob(audio.base64Data);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  throw new Error('Could not extract audio data from TTS response');
}

function chunkText(text: string, maxLength: number): string[] {
  const chunks: string[] = [];
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  let currentChunk = '';

  for (const sentence of sentences) {
    if ((currentChunk + sentence).length > maxLength) {
      if (currentChunk) chunks.push(currentChunk.trim());
      currentChunk = sentence;
    } else {
      currentChunk += sentence;
    }
  }

  if (currentChunk) chunks.push(currentChunk.trim());
  return chunks;
}

function concatenateAudio(chunks: Uint8Array[]): Uint8Array {
  const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;

  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }

  return result;
}
