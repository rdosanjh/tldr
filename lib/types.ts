export interface ArticleContent {
  title: string;
  content: string;
  textContent: string;
  byline: string | null;
  excerpt: string | null;
  siteName: string | null;
  length: number;
}

export interface PodcastScript {
  title: string;
  script: string;
  estimatedDuration: number;
}

export interface GeneratePodcastRequest {
  url: string;
  voice?: 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer';
  model?: 'tts-1' | 'tts-1-hd';
}

export interface GeneratePodcastResponse {
  success: boolean;
  audioBase64?: string;
  title?: string;
  error?: string;
}

export type ProcessingStage =
  | 'idle'
  | 'extracting'
  | 'generating-script'
  | 'generating-audio'
  | 'complete'
  | 'error';
