'use client';

import { useState } from 'react';

interface UrlInputFormProps {
  onSubmit: (url: string, options: { voice: string; model: string }) => void;
  isProcessing: boolean;
}

export function UrlInputForm({ onSubmit, isProcessing }: UrlInputFormProps) {
  const [url, setUrl] = useState('');
  const [voice, setVoice] = useState('alloy');
  const [model, setModel] = useState('tts-1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url.trim(), { voice, model });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-4">
      <div>
        <label htmlFor="url" className="block text-sm font-medium mb-2">
          Article URL
        </label>
        <input
          id="url"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/article"
          disabled={isProcessing}
          required
          className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 disabled:opacity-50"
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label htmlFor="voice" className="block text-sm font-medium mb-2">
            Voice
          </label>
          <select
            id="voice"
            value={voice}
            onChange={(e) => setVoice(e.target.value)}
            disabled={isProcessing}
            className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500 disabled:opacity-50"
          >
            <option value="alloy">Alloy</option>
            <option value="echo">Echo</option>
            <option value="fable">Fable</option>
            <option value="onyx">Onyx</option>
            <option value="nova">Nova</option>
            <option value="shimmer">Shimmer</option>
          </select>
        </div>

        <div className="flex-1">
          <label htmlFor="model" className="block text-sm font-medium mb-2">
            Quality
          </label>
          <select
            id="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            disabled={isProcessing}
            className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500 disabled:opacity-50"
          >
            <option value="tts-1">Standard</option>
            <option value="tts-1-hd">HD</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isProcessing || !url.trim()}
        className="w-full px-6 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-medium rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isProcessing ? 'Generating...' : 'Generate Podcast'}
      </button>
    </form>
  );
}
