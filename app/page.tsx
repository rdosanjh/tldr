import { SignedIn, SignedOut } from '@clerk/nextjs';
import { LandingPage } from '@/components/landing-page';
import { PodcastGenerator } from '@/components/podcast-generator';

export default function Home() {
  return (
    <>
      <SignedOut>
        <LandingPage />
      </SignedOut>
      <SignedIn>
        <PodcastGenerator />
      </SignedIn>
    </>
  );
}
