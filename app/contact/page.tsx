import type { Metadata } from "next";
import { Suspense } from "react";
import { CalendarCheck, Clock, Mail, MapPin } from "lucide-react";
import { CalendlyEmbed } from "@/components/ui/CalendlyEmbed";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { services } from "@/data/services";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Request a project quote or book a consultation with DevFlowX. Tell us about your project and we will reply by email.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const serviceOptions = services.map(({ slug, title }) => ({ slug, title }));
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s build <span className="text-gradient">what&apos;s next</span>
          </>
        }
        description="Share a few details about your project. We read every inquiry and reply by email."
      />
      <section className="pb-24">
        <Container className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          {/* useSearchParams (service/intent presets) requires a Suspense boundary */}
          <Suspense fallback={<div className="surface h-[34rem] animate-pulse rounded-3xl" aria-hidden />}>
            <ContactForm services={serviceOptions} />
          </Suspense>

          <aside className="space-y-5" aria-label="Other ways to reach us">
            <div id="consultation" className="surface rounded-3xl p-7">
              <CalendarCheck aria-hidden className="size-7 text-brand-electric" />
              <h2 className="mt-4 font-display text-2xl text-white">Prefer to talk?</h2>
              <p className="mt-2 text-muted">Book a free consultation call to discuss your goals.</p>
              <ButtonLink href={siteConfig.bookingUrl} className="mt-5" arrow>
                Book a Consultation
              </ButtonLink>
            </div>
            {siteConfig.contactEmail && (
              <div className="surface rounded-3xl p-7">
                <Mail aria-hidden className="size-7 text-brand-lilac" />
                <h2 className="mt-4 font-display text-2xl text-white">Email us</h2>
                <a href={`mailto:${siteConfig.contactEmail}`} className="mt-2 inline-block text-brand-electric hover:text-white">
                  {siteConfig.contactEmail}
                </a>
              </div>
            )}
            <div className="surface rounded-3xl p-7">
              <MapPin aria-hidden className="size-7 text-brand-electric" />
              <h2 className="mt-4 font-display text-2xl text-white">Our office</h2>
              <address className="mt-2 not-italic leading-relaxed text-muted">
                {siteConfig.address.lines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </address>
              <a
                href={siteConfig.address.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm text-brand-electric hover:text-white"
              >
                View on map
              </a>
            </div>
            <div className="surface rounded-3xl p-7">
              <Clock aria-hidden className="size-7 text-brand-electric" />
              <h2 className="mt-4 font-display text-2xl text-white">What happens next</h2>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-muted marker:text-brand-electric">
                <li>We review your inquiry.</li>
                <li>We reply by email with questions or next steps.</li>
                <li>We agree scope and a plan together.</li>
              </ol>
            </div>
          </aside>
        </Container>
      </section>

      <section aria-labelledby="schedule-title" className="pb-24">
        <Container>
          <div className="mb-8 max-w-2xl">
            <h2 id="schedule-title" className="font-display text-3xl font-medium text-white sm:text-4xl">
              Schedule a consultation
            </h2>
            <p className="mt-3 text-muted">Pick a time that suits you. We will discuss your goals and the best way forward.</p>
          </div>
          <CalendlyEmbed />
        </Container>
      </section>
    </>
  );
}
