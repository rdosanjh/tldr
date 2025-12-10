import { NextRequest, NextResponse } from 'next/server';
import { extractArticle } from '@/lib/article-extractor';
import { generatePodcastScript } from '@/lib/script-generator';
import { generateAudio } from '@/lib/speech-generator';

export const maxDuration = 60;

function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { url, voice = 'alloy', model = 'tts-1' } = await request.json();

    if (!url || !isValidUrl(url)) {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
    }

    const article = await extractArticle(url);
    if (!article) {
      return NextResponse.json(
        { error: 'Failed to extract article content' },
        { status: 422 }
      );
    }

    const script = await generatePodcastScript(article);
    console.log('Script generated, length:', script.script.length);

    const audioData = await generateAudio(script.script, { voice, model });
    console.log('Audio generated, size:', audioData.length, 'bytes');

    const audioBase64 = Buffer.from(audioData).toString('base64');
    console.log('Base64 encoded, length:', audioBase64.length);

    return NextResponse.json({
      success: true,
      audioBase64,
      title: script.title,
    });
  } catch (error) {
    console.error('Podcast generation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Generation failed' },
      { status: 500 }
    );
  }
}
