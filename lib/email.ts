import "server-only";
import { Resend } from "resend";

/**
 * Server-only Resend helper. API keys are read from environment variables and never
 * reach the browser (this module cannot be imported into a Client Component).
 */
export function getEmailConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL ?? "DevFlowX <onboarding@resend.dev>";
  if (!apiKey || !to) return null;
  return { resend: new Resend(apiKey), to, from };
}

export const escapeText = (v: string) => v.replace(/[\r\n]+/g, " ").slice(0, 200);
