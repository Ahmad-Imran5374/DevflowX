/**
 * Central site configuration. Everything business-specific that you may want to
 * change (booking link, contact email, socials) lives here or in environment
 * variables, never hard-coded in components.
 */
export const siteConfig = {
  name: "DevFlowX",
  tagline: "Software, AI and automation, engineered for outcomes.",
  description:
    "DevFlowX is a software development studio building SaaS products, web applications, AI integrations, automation and APIs — user-first and outcome-driven.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  /** Calendly / Cal.com / any scheduling URL. Falls back to the contact form. */
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? "/contact?intent=consultation",
  /** Optional public email shown in the footer/contact page. Leave unset to hide. */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  /** Office address shown in the footer and on the contact page. */
  address: {
    lines: ["Unit 1, 56 Chesterwood Crescent", "Brampton, ON L6Y 0Z4", "Canada"],
    mapUrl: "https://www.google.com/maps/search/?api=1&query=56+Chesterwood+Crescent+Brampton+ON+L6Y+0Z4",
  },
  social: {
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "",
    github: process.env.NEXT_PUBLIC_GITHUB_URL ?? "",
  },
} as const;

export const quoteHref = "/contact?intent=quote";

export const mainNav = [
  { label: "Case Studies", href: "/case-studies" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export function isExternal(href: string) {
  return /^https?:\/\//i.test(href);
}
