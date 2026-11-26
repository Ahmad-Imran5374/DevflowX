import { NextResponse } from "next/server";
import { escapeText, getEmailConfig } from "@/lib/email";
import { clientIp, looksLikeBot, rateLimited } from "@/lib/spam";
import { parseContact, validateContact } from "@/lib/validation";

export async function POST(req: Request) {
  const now = Date.now();

  if (rateLimited(`contact:${clientIp(req)}`, now)) {
    return NextResponse.json({ ok: false, error: "Too many requests. Please try again later." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Bots get a convincing success response and nothing is sent.
  if (looksLikeBot(body, now)) return NextResponse.json({ ok: true });

  const input = parseContact(body);
  const errors = validateContact(input);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, error: "Please check the form and try again.", fieldErrors: errors }, { status: 422 });
  }

  const config = getEmailConfig();
  if (!config) {
    console.error("[contact] RESEND_API_KEY or CONTACT_TO_EMAIL is not configured.");
    return NextResponse.json({ ok: false, error: "Our contact form is temporarily unavailable. Please try again later." }, { status: 503 });
  }

  const text = [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Company: ${input.company || "—"}`,
    `Service: ${input.service}`,
    `Budget: ${input.budget}`,
    "",
    input.message,
  ].join("\n");

  try {
    const { error } = await config.resend.emails.send({
      from: config.from,
      to: config.to,
      replyTo: input.email,
      subject: `New inquiry: ${escapeText(input.service)} — ${escapeText(input.name)}`,
      text,
    });
    if (error) throw new Error(error.message);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Failed to send email", err);
    return NextResponse.json({ ok: false, error: "We could not send your message. Please try again." }, { status: 502 });
  }
}
