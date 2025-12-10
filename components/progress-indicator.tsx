'use client';

import { ProcessingStage } from '@/lib/types';

interface ProgressIndicatorProps {
  stage: ProcessingStage;
}

const STAGES = [
  { key: 'extracting', label: 'Extracting article' },
  { key: 'generating-script', label: 'Writing script' },
  { key: 'generating-audio', label: 'Generating audio' },
];

export function ProgressIndicator({ stage }: ProgressIndicatorProps) {
  const currentIndex = STAGES.findIndex((s) => s.key === stage);

  return (
    <div className="w-full max-w-2xl mt-8">
      <div className="flex items-center justify-between">
        {STAGES.map((s, index) => {
          const isComplete = index < currentIndex;
          const isCurrent = s.key === stage;

          return (
            <div key={s.key} className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                  isComplete
                    ? 'bg-green-500 border-green-500 text-white'
                    : isCurrent
                    ? 'border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100'
                    : 'border-zinc-300 dark:border-zinc-700 text-zinc-400'
                }`}
              >
                {isComplete ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : isCurrent ? (
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              <span
                className={`mt-2 text-xs font-medium ${
                  isCurrent ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-500'
                }`}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
