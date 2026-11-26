import { ButtonLink } from "@/components/ui/Button";
import { quoteHref, siteConfig } from "@/lib/site";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] overflow-hidden bg-navy-950">
      {/* Atmosphere: vertical light beams, glow and grid */}
      <div aria-hidden className="hero-beams" />
      <div aria-hidden className="absolute -right-32 top-10 -z-10 size-[42rem] rounded-full bg-brand-violet/25 blur-[140px]" />
      <div aria-hidden className="absolute -left-40 bottom-0 -z-10 size-[36rem] rounded-full bg-brand-blue/25 blur-[140px]" />
      <div aria-hidden className="grid-fade absolute inset-0 -z-10" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy-950 to-transparent" />

      {/* Glowing arc, bottom-left */}
      <div
        aria-hidden
        className="hero-orb absolute -left-[10%] bottom-[8%] hidden h-48 w-[62%] rounded-[100%] sm:block"
      />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col justify-between gap-16 px-5 pb-14 pt-36 sm:px-8 sm:pt-44">
        <h1 className="max-w-4xl font-display text-[2.6rem] font-medium leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          <span className="block text-white">We build SaaS, web apps</span>
          <span className="block text-slate-300/85">and AI-powered products</span>
          <span className="block text-slate-500">user-first, outcome-driven.</span>
        </h1>

        <div className="self-end md:w-[26rem] lg:mr-[8%]">
          <p className="text-base leading-relaxed text-slate-300">
            From first idea to scale, DevFlowX brings experience-led strategy, lean engineering and safe AI automation —
            just the right structure to get your product live.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href={siteConfig.bookingUrl} size="lg">
              Book a Consultation
            </ButtonLink>
            <ButtonLink href="/case-studies" variant="secondary" size="lg">
              See Our Work
            </ButtonLink>
          </div>
          <p className="mt-5 text-sm text-slate-500">
            Or{" "}
            <a href={quoteHref} className="text-brand-electric underline-offset-4 hover:underline">
              get a project quote
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
