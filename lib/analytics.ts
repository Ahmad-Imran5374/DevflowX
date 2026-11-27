import "server-only";
import { Redis } from "@upstash/redis";

/**
 * Visit analytics backed by Upstash Redis (reads UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN).
 *
 * Keys:
 *  - analytics:total            all-time visit counter
 *  - analytics:total:uniques    HyperLogLog of all-time unique visitor ids
 *  - analytics:total:country    hash  country  -> visits (all time)
 *  - analytics:total:region     hash  "CC-REGION" -> visits (all time)
 *  - analytics:visits           sorted set (score = timestamp) of individual visits, used for the
 *                               24h report window. Members: "ts|country|region|visitorId|rand".
 *
 * Only country/region codes are stored. IP addresses are never persisted.
 */

const K = {
  total: "analytics:total",
  uniques: "analytics:total:uniques",
  country: "analytics:total:country",
  region: "analytics:total:region",
  visits: "analytics:visits",
};

export type VisitGeo = { country: string; region: string };

export function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

const clean = (v: string | null | undefined, fallback: string) => {
  const s = (v ?? "").trim().toUpperCase();
  return /^[A-Z0-9-]{1,10}$/.test(s) ? s : fallback;
};

/** Reads geo info from the hosting platform's headers (Vercel, or Cloudflare as a fallback). */
export function geoFromHeaders(headers: Headers): VisitGeo {
  const country = clean(headers.get("x-vercel-ip-country") ?? headers.get("cf-ipcountry"), "XX");
  const region = clean(headers.get("x-vercel-ip-country-region"), "NA");
  return { country, region };
}

export function sanitizeVisitorId(v: unknown): string {
  return typeof v === "string" && /^[A-Za-z0-9-]{8,64}$/.test(v) ? v : "anon";
}

export async function recordVisit(redis: Redis, geo: VisitGeo, visitorId: string, now = Date.now()) {
  const member = `${now}|${geo.country}|${geo.region}|${visitorId}|${Math.random().toString(36).slice(2, 8)}`;
  const p = redis.pipeline();
  p.incr(K.total);
  if (visitorId !== "anon") p.pfadd(K.uniques, visitorId);
  p.hincrby(K.country, geo.country, 1);
  p.hincrby(K.region, `${geo.country}-${geo.region}`, 1);
  p.zadd(K.visits, { score: now, member });
  await p.exec();
}

export type CountryStat = { country: string; visits: number; regions: { region: string; visits: number }[] };

export type Report = {
  windowStart: number;
  windowEnd: number;
  periodVisits: number;
  periodUniques: number;
  allTimeVisits: number;
  allTimeUniques: number;
  periodByCountry: CountryStat[];
  allTimeByCountry: CountryStat[];
};

function groupRegions(entries: [string, number][]): CountryStat[] {
  const map = new Map<string, CountryStat>();
  for (const [key, visits] of entries) {
    const idx = key.indexOf("-");
    const country = idx === -1 ? key : key.slice(0, idx);
    const region = idx === -1 ? "NA" : key.slice(idx + 1);
    const c = map.get(country) ?? { country, visits: 0, regions: [] };
    c.visits += visits;
    c.regions.push({ region, visits });
    map.set(country, c);
  }
  const out = [...map.values()];
  for (const c of out) c.regions.sort((a, b) => b.visits - a.visits);
  return out.sort((a, b) => b.visits - a.visits);
}

export async function buildReport(redis: Redis, windowStart: number, windowEnd: number): Promise<Report> {
  const [members, allTimeVisits, allTimeUniques, regionHash] = await Promise.all([
    redis.zrange<unknown[]>(K.visits, windowStart, windowEnd - 1, { byScore: true }),
    redis.get<number>(K.total),
    redis.pfcount(K.uniques),
    redis.hgetall<Record<string, number>>(K.region),
  ]);

  const periodRegions = new Map<string, number>();
  const periodUniques = new Set<string>();
  for (const m of members) {
    const [, country, region, vid] = String(m).split("|");
    const key = `${country}-${region}`;
    periodRegions.set(key, (periodRegions.get(key) ?? 0) + 1);
    if (vid && vid !== "anon") periodUniques.add(vid);
  }

  return {
    windowStart,
    windowEnd,
    periodVisits: members.length,
    periodUniques: periodUniques.size,
    allTimeVisits: Number(allTimeVisits ?? 0),
    allTimeUniques,
    periodByCountry: groupRegions([...periodRegions]),
    allTimeByCountry: groupRegions(Object.entries(regionHash ?? {}).map(([k, v]) => [k, Number(v)])),
  };
}

/** Drops individual visit rows older than `keepMs` (all-time counters are unaffected). */
export async function pruneVisits(redis: Redis, olderThan: number) {
  await redis.zremrangebyscore(K.visits, 0, olderThan);
}
