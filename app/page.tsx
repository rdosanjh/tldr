'use client';

import { useState } from 'react';
import { UrlInputForm } from '@/components/url-input-form';
import { ProgressIndicator } from '@/components/progress-indicator';
import { DownloadButton } from '@/components/download-button';
import { ProcessingStage } from '@/lib/types';

export default function Home() {
  const [stage, setStage] = useState<ProcessingStage>('idle');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ audioBase64: string; title: string } | null>(null);

  const handleSubmit = async (url: string, options: { voice: string; model: string }) => {
    setStage('extracting');
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/generate-podcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, ...options }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate podcast');
      }

      setResult({ audioBase64: data.audioBase64, title: data.title });
      setStage('complete');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setStage('error');
    }
  };

  const isProcessing = ['extracting', 'generating-script', 'generating-audio'].includes(stage);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-16 px-8 bg-white dark:bg-black">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
          Article to Podcast
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8 text-center">
          Paste an article URL and get a downloadable podcast episode
        </p>

        <UrlInputForm onSubmit={handleSubmit} isProcessing={isProcessing} />

        {isProcessing && <ProgressIndicator stage={stage} />}

        {error && (
          <div className="mt-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-8 flex flex-col items-center gap-4">
            <p className="text-lg text-zinc-900 dark:text-zinc-100">
              Your podcast is ready!
            </p>
            <audio
              controls
              src={`data:audio/mpeg;base64,${result.audioBase64}`}
              className="w-full max-w-md"
            />
            <DownloadButton audioBase64={result.audioBase64} filename={result.title} />
          </div>
        )}
      </main>
    </div>
  );
}
