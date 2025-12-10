import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { ArticleContent, PodcastScript } from './types';

const SCRIPT_SYSTEM_PROMPT = `You are a professional podcast script writer. Your task is to convert article content into an engaging, conversational podcast script.

Guidelines:
- Start with a brief, engaging introduction
- Use conversational language, as if speaking to a friend
- Break down complex topics into digestible segments
- Add natural transitions between sections
- End with a memorable conclusion
- Keep the tone informative yet entertaining
- Aim for a natural speaking rhythm
- Output only the spoken content, no metadata or stage directions`;

export async function generatePodcastScript(
  article: ArticleContent
): Promise<PodcastScript> {
  const userPrompt = `Convert this article into a podcast script:

Title: ${article.title}
${article.byline ? `Author: ${article.byline}` : ''}
${article.siteName ? `Source: ${article.siteName}` : ''}

Content:
${article.textContent}

Create an engaging podcast script that captures the key points and makes them accessible to listeners.`;

  const { text } = await generateText({
    model: openai('gpt-4o'),
    system: SCRIPT_SYSTEM_PROMPT,
    prompt: userPrompt,
    maxTokens: 4000,
  });

  const wordCount = text.split(/\s+/).length;
  const estimatedDuration = Math.ceil((wordCount / 150) * 60);

  return {
    title: article.title,
    script: text,
    estimatedDuration,
  };
}
