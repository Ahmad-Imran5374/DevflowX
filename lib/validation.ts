/** Shared by the client forms (instant feedback) and the API routes (authoritative check). */

export const budgetOptions = [
  "Under $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000+",
  "Not sure yet",
] as const;

export type ContactInput = {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
};

export type FieldErrors<T> = Partial<Record<keyof T, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const isEmail = (v: string) => v.length <= 254 && EMAIL_RE.test(v);

export function validateContact(input: ContactInput): FieldErrors<ContactInput> {
  const e: FieldErrors<ContactInput> = {};
  if (input.name.trim().length < 2) e.name = "Please enter your name.";
  if (input.name.length > 100) e.name = "Name is too long.";
  if (!isEmail(input.email.trim())) e.email = "Please enter a valid email address.";
  if (input.company.length > 150) e.company = "Company name is too long.";
  if (!input.service) e.service = "Please choose a service.";
  if (!input.budget) e.budget = "Please choose a budget range.";
  const msg = input.message.trim();
  if (msg.length < 20) e.message = "Please describe your project in at least 20 characters.";
  if (msg.length > 5000) e.message = "Message must be under 5,000 characters.";
  return e;
}

/** Trim and coerce unknown JSON into a ContactInput. */
export function parseContact(raw: unknown): ContactInput {
  const o = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const s = (k: string) => (typeof o[k] === "string" ? (o[k] as string).trim() : "");
  return {
    name: s("name"),
    email: s("email"),
    company: s("company"),
    service: s("service"),
    budget: s("budget"),
    message: s("message"),
  };
}
