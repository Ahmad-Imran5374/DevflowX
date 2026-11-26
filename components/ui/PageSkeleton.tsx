/** Instant shell shown while a dynamic [slug] route resolves its params. */
export function PageSkeleton() {
  return (
    <div role="status" aria-label="Loading" className="mx-auto w-full max-w-7xl px-5 pb-24 pt-40 sm:px-8 sm:pt-48">
      <div className="h-4 w-28 animate-pulse rounded-full bg-white/10" />
      <div className="mt-6 h-14 w-2/3 max-w-xl animate-pulse rounded-2xl bg-white/10" />
      <div className="mt-6 h-5 w-full max-w-2xl animate-pulse rounded-full bg-white/5" />
      <div className="mt-3 h-5 w-3/4 max-w-xl animate-pulse rounded-full bg-white/5" />
    </div>
  );
}
