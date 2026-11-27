import { NextResponse } from "next/server";
import { buildReport, getRedis, pruneVisits, type CountryStat } from "@/lib/analytics";
import { getEmailConfig } from "@/lib/email";

const DAY = 24 * 60 * 60 * 1000;
// Report cut-off time of day, in the report timezone. Defaults: 11:45 at UTC+5 (Pakistan).
const REPORT_HOUR = Number(process.env.REPORT_HOUR ?? 11);
const REPORT_MINUTE = Number(process.env.REPORT_MINUTE ?? 45);
const TZ_OFFSET_MIN = Number(process.env.REPORT_TZ_OFFSET_MINUTES ?? 300);
const TZ_LABEL = process.env.REPORT_TZ_LABEL ?? "PKT";

/** The most recent REPORT_HOUR:REPORT_MINUTE (local) at or before `now`, as a UTC timestamp. */
function latestBoundary(now: number): number {
  const local = new Date(now + TZ_OFFSET_MIN * 60_000);
  let b = Date.UTC(local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate(), REPORT_HOUR, REPORT_MINUTE) - TZ_OFFSET_MIN * 60_000;
  if (b > now) b -= DAY;
  return b;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
const names = new Intl.DisplayNames(["en"], { type: "region" });
const countryName = (code: string) => {
  if (code === "XX") return "Unknown";
  try {
    return names.of(code) ?? code;
  } catch {
    return code;
  }
};
const fmtDate = (ts: number) =>
  new Date(ts).toLocaleString("en-GB", { timeZone: "UTC", dateStyle: "medium", timeStyle: "short", hourCycle: "h12" });
const local = (ts: number) => fmtDate(ts + TZ_OFFSET_MIN * 60_000) + ` ${TZ_LABEL}`;

function table(rows: CountryStat[], limit = 25): string {
  if (rows.length === 0) return `<p style="color:#666">No visits.</p>`;
  const body = rows
    .slice(0, limit)
    .map((c) => {
      const states = c.regions
        .filter((r) => r.region !== "NA")
        .slice(0, 8)
        .map((r) => `${esc(r.region)}: ${r.visits}`)
        .join(", ");
      return `<tr><td style="padding:6px 10px;border-bottom:1px solid #eee">${esc(countryName(c.country))}</td>
<td style="padding:6px 10px;border-bottom:1px solid #eee;text-align:right"><b>${c.visits}</b></td>
<td style="padding:6px 10px;border-bottom:1px solid #eee;color:#555;font-size:12px">${states || "-"}</td></tr>`;
    })
    .join("");
  const more = rows.length > limit ? `<p style="color:#666;font-size:12px">…and ${rows.length - limit} more countries.</p>` : "";
  return `<table style="border-collapse:collapse;width:100%;font-size:14px">
<tr style="background:#f4f4f8;text-align:left"><th style="padding:6px 10px">Country</th><th style="padding:6px 10px;text-align:right">Visits</th><th style="padding:6px 10px">Top states / regions</th></tr>${body}</table>${more}`;
}

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const redis = getRedis();
  const config = getEmailConfig();
  if (!redis || !config) {
    return NextResponse.json({ ok: false, error: "Redis or email is not configured." }, { status: 503 });
  }

  const end = latestBoundary(Date.now());
  const start = end - DAY;
  const report = await buildReport(redis, start, end);

  if (new URL(req.url).searchParams.get("dryRun")) return NextResponse.json({ ok: true, report });

  const to = (process.env.REPORT_TO_EMAIL ?? "ahmadcancerian3@gmail.com").split(",").map((s) => s.trim()).filter(Boolean);
  const html = `<div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#111">
<h2 style="margin-bottom:4px">DevFlowX visitor report</h2>
<p style="color:#555;margin-top:0">${esc(local(start))} → ${esc(local(end))}</p>
<table style="width:100%;border-collapse:collapse;margin:16px 0"><tr>
<td style="padding:12px;background:#f4f4f8;text-align:center"><div style="font-size:28px;font-weight:bold">${report.periodVisits}</div>Visits (last 24h)</td>
<td style="padding:12px;background:#f4f4f8;text-align:center"><div style="font-size:28px;font-weight:bold">${report.periodUniques}</div>Unique visitors (24h)</td>
<td style="padding:12px;background:#eef;text-align:center"><div style="font-size:28px;font-weight:bold">${report.allTimeVisits}</div>All-time visits</td>
<td style="padding:12px;background:#eef;text-align:center"><div style="font-size:28px;font-weight:bold">${report.allTimeUniques}</div>All-time unique</td>
</tr></table>
<h3>Last 24 hours by country</h3>${table(report.periodByCountry)}
<h3>All time by country</h3>${table(report.allTimeByCountry)}
</div>`;

  const { error } = await config.resend.emails.send({
    from: config.from,
    to,
    subject: `DevFlowX visitors: ${report.periodVisits} in last 24h, ${report.allTimeVisits} all time`,
    html,
  });
  if (error) {
    console.error("[daily-report] email failed", error);
    return NextResponse.json({ ok: false, error: "Email failed" }, { status: 502 });
  }

  // Keep a few days of raw rows for re-runs; all-time counters are separate.
  await pruneVisits(redis, start - 3 * DAY);
  return NextResponse.json({ ok: true, visits: report.periodVisits });
}
