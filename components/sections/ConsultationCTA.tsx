import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { quoteHref, siteConfig } from "@/lib/site";

export function ConsultationCTA({
  title = "Ready to build something that works?",
  description = "Tell us about your idea or challenge. We will help you scope it and map the fastest route to a successful launch.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="py-16 sm:py-24">
      <Container>
        <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-navy-900 px-6 py-16 text-center sm:px-16 sm:py-20">
          <div aria-hidden className="absolute -left-20 -top-20 -z-10 size-96 rounded-full bg-brand-blue/30 blur-[110px]" />
          <div aria-hidden className="absolute -bottom-24 -right-16 -z-10 size-96 rounded-full bg-brand-violet/35 blur-[110px]" />
          <h2 id="cta-title" className="mx-auto max-w-2xl font-display text-4xl font-medium leading-tight text-white sm:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-slate-300">{description}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <ButtonLink href={siteConfig.bookingUrl} size="lg">
              Book a Consultation
            </ButtonLink>
            <ButtonLink href={quoteHref} variant="secondary" size="lg">
              Get a Project Quote
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
