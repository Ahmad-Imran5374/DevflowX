import { NextResponse } from "next/server";
import { geoFromHeaders, getRedis, recordVisit, sanitizeVisitorId } from "@/lib/analytics";

const BOT_RE = /bot|crawl|spider|slurp|headless|lighthouse|preview|monitor|curl|wget|python-requests|facebookexternalhit/i;

/** Called once per browser session by <VisitTracker />. Always answers 204 so tracking never affects UX. */
export async function POST(req: Request) {
  const ua = req.headers.get("user-agent") ?? "";
  if (!ua || BOT_RE.test(ua)) return new NextResponse(null, { status: 204 });

  const redis = getRedis();
  if (!redis) return new NextResponse(null, { status: 204 });

  let visitorId = "anon";
  try {
    const body = await req.json();
    visitorId = sanitizeVisitorId(body?.vid);
  } catch {
    /* no body: count as anonymous */
  }

  try {
    await recordVisit(redis, geoFromHeaders(req.headers), visitorId);
  } catch (err) {
    console.error("[track] failed to record visit", err);
  }
  return new NextResponse(null, { status: 204 });
}
