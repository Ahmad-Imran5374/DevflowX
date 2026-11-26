import { siteConfig } from "@/lib/site";

/**
 * Inline Calendly scheduler themed to the site (navy background, electric-blue accents).
 * Renders only when the configured booking URL is a Calendly link.
 */
export function CalendlyEmbed({ className = "" }: { className?: string }) {
  let src: string;
  try {
    const url = new URL(siteConfig.bookingUrl);
    if (url.hostname !== "calendly.com") return null;
    url.searchParams.set("embed_domain", new URL(siteConfig.url).hostname);
    url.searchParams.set("embed_type", "Inline");
    url.searchParams.set("hide_gdpr_banner", "1");
    url.searchParams.set("background_color", "0a1024");
    url.searchParams.set("text_color", "e8ecf8");
    url.searchParams.set("primary_color", "5b8cff");
    src = url.toString();
  } catch {
    return null;
  }

  return (
    <div className={`overflow-hidden rounded-3xl border border-line bg-navy-900 ${className}`}>
      <iframe
        src={src}
        title="Schedule a consultation"
        loading="lazy"
        className="h-[1000px] w-full border-0 sm:h-[720px]"
      />
    </div>
  );
}
