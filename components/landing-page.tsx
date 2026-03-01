'use client';

import { SignUpButton } from '@clerk/nextjs';

const STEPS = [
  { number: 1, label: 'Paste URL', description: 'Drop in any article link' },
  { number: 2, label: 'AI writes script', description: 'We extract and convert to speech' },
  { number: 3, label: 'Download podcast', description: 'Get your audio file instantly' },
];

export function LandingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-16 px-8 bg-white dark:bg-black">
        {/* Hero */}
        <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-zinc-100 mb-4 text-center leading-tight">
          Turn any article into a podcast in seconds
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 text-center max-w-xl">
          Paste a URL, and our AI extracts the content, writes a natural script, and generates a downloadable audio episode.
        </p>
        <SignUpButton mode="modal">
          <button className="px-8 py-3 text-base font-medium bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">
            Get Started Free
          </button>
        </SignUpButton>

        {/* Demo audio player */}
        <div className="mt-16 w-full max-w-md flex flex-col items-center gap-3">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Hear a sample
          </p>
          <p className="text-base font-medium text-zinc-900 dark:text-zinc-100 text-center">
            &ldquo;How Large Language Models Are Changing Search&rdquo;
          </p>
          <audio controls src="/demo.mp3" className="w-full" />
        </div>

        {/* How it works */}
        <div className="mt-20 w-full max-w-2xl">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-10 text-center">
            How it works
          </h2>
          <div className="flex items-start justify-between">
            {STEPS.map((step) => (
              <div key={step.number} className="flex flex-col items-center flex-1">
                <div className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100">
                  <span className="text-sm font-medium">{step.number}</span>
                </div>
                <span className="mt-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {step.label}
                </span>
                <span className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 text-center px-2">
                  {step.description}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-20 flex flex-col items-center gap-4">
          <p className="text-lg text-zinc-600 dark:text-zinc-400 text-center">
            Ready to listen instead of read?
          </p>
          <SignUpButton mode="modal">
            <button className="px-8 py-3 text-base font-medium bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">
              Sign Up Free
            </button>
          </SignUpButton>
        </div>
      </main>
    </div>
  );
}
