/**
 * Lightweight spam protection for public forms:
 *  1. Honeypot field (bots fill hidden inputs, humans do not)
 *  2. Minimum time-to-submit (bots submit instantly)
 *  3. Per-IP rate limiting
 *
 * The rate limiter is in-memory, so it is per server instance. For multi-instance or
 * serverless production deployments, swap it for a shared store (e.g. Redis/Upstash).
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

export function rateLimited(key: string, now: number): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  // Opportunistic cleanup so the map cannot grow without bound.
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return false;
}

export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd?.split(",")[0] ?? req.headers.get("x-real-ip") ?? "unknown").trim();
}

/** Returns true when the submission looks automated. */
export function looksLikeBot(body: { website?: unknown; startedAt?: unknown }, now: number): boolean {
  if (typeof body.website === "string" && body.website.length > 0) return true;
  const started = Number(body.startedAt);
  // Missing/invalid timestamp or a form "filled" in under 3 seconds.
  if (!Number.isFinite(started) || now - started < 3000) return true;
  return false;
}
