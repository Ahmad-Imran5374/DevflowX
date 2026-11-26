export default function Loading() {
  return (
    <div role="status" aria-label="Loading" className="flex min-h-[60svh] items-center justify-center pt-24">
      <span className="size-8 animate-spin rounded-full border-2 border-white/15 border-t-brand-electric" />
    </div>
  );
}
