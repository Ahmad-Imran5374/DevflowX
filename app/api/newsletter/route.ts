import { NextResponse } from "next/server";
import { escapeText, getEmailConfig } from "@/lib/email";
import { clientIp, looksLikeBot, rateLimited } from "@/lib/spam";
import { isEmail } from "@/lib/validation";

/**
 * Newsletter sign-ups are emailed to CONTACT_TO_EMAIL as notifications.
 * To manage a real subscriber list, connect a Resend Audience or an email platform here.
 */
export async function POST(req: Request) {
  const now = Date.now();

  if (rateLimited(`newsletter:${clientIp(req)}`, now)) {
    return NextResponse.json({ ok: false, error: "Too many requests. Please try again later." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (looksLikeBot(body, now)) return NextResponse.json({ ok: true });

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!isEmail(email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 422 });
  }

  const config = getEmailConfig();
  if (!config) {
    console.error("[newsletter] RESEND_API_KEY or CONTACT_TO_EMAIL is not configured.");
    return NextResponse.json({ ok: false, error: "Subscriptions are temporarily unavailable." }, { status: 503 });
  }

  try {
    const { error } = await config.resend.emails.send({
      from: config.from,
      to: config.to,
      replyTo: email,
      subject: `New newsletter subscriber: ${escapeText(email)}`,
      text: `New newsletter subscriber:\n${email}`,
    });
    if (error) throw new Error(error.message);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[newsletter] Failed to send email", err);
    return NextResponse.json({ ok: false, error: "We could not subscribe you. Please try again." }, { status: 502 });
  }
}
