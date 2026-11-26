"use client";

import { Container } from "@/components/ui/Container";

export default function Error({ unstable_retry }: { error: Error & { digest?: string }; unstable_retry: () => void }) {
  return (
    <Container className="flex min-h-[80svh] flex-col items-start justify-center pt-32">
      <h1 className="font-display text-4xl font-medium text-white">Something went wrong</h1>
      <p className="mt-3 max-w-md text-muted">An unexpected error occurred. Please try again.</p>
      <button
        type="button"
        onClick={() => unstable_retry()}
        className="bg-brand-gradient mt-8 h-11 rounded-full px-6 text-sm font-medium text-white"
      >
        Try again
      </button>
    </Container>
  );
}
