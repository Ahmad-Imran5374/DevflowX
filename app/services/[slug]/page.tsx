import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageSkeleton } from "@/components/ui/PageSkeleton";
import { Check } from "lucide-react";
import { ConsultationCTA } from "@/components/sections/ConsultationCTA";
import { FAQSection } from "@/components/sections/FAQSection";
import { PageHero } from "@/components/sections/PageHero";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projectsForService } from "@/data/projects";
import { getService, services } from "@/data/services";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.seoDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title: `${service.title} | ${siteConfig.name}`, description: service.seoDescription, url: `/services/${service.slug}` },
  };
}

export default function ServicePage({ params }: PageProps<"/services/[slug]">) {
  // Reading params inside Suspense lets the route shell render instantly.
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ServicePageContent params={params} />
    </Suspense>
  );
}

async function ServicePageContent({ params }: { params: PageProps<"/services/[slug]">["params"] }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const related = projectsForService(service.projectSlugs);

  return (
    <>
      <PageHero eyebrow="Service" title={service.title} description={service.summary}>
        <ButtonLink href={siteConfig.bookingUrl} size="lg">
          Book a Consultation
        </ButtonLink>
        <ButtonLink href={`/contact?intent=quote&service=${service.slug}`} variant="secondary" size="lg">
          Get a Project Quote
        </ButtonLink>
      </PageHero>

      <section aria-labelledby="problems-title" className="py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="The challenge" title={<span id="problems-title">Problems we solve</span>} />
            <ul className="mt-8 space-y-4">
              {service.problems.map((p) => (
                <li key={p} className="flex gap-3 leading-relaxed text-slate-300">
                  <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand-violet" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Outcomes" title="What we deliver" />
            <ul className="mt-8 grid gap-3">
              {service.deliverables.map((d) => (
                <li key={d} className="surface flex items-start gap-3 rounded-2xl px-5 py-4 text-slate-200">
                  <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-electric" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section aria-labelledby="tech-title" className="py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Stack" title={<span id="tech-title">Technologies we use</span>} />
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {service.technologies.map((t) => (
              <li key={t}>
                <Badge>{t}</Badge>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="process-title" className="py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="How we work" title={<span id="process-title">Our process</span>} />
          <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {service.process.map((step, i) => (
              <li key={step.title} className="surface rounded-3xl p-6">
                <span className="font-display text-3xl text-gradient">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-medium text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="py-16 sm:py-20">
          <Container>
            <SectionHeading eyebrow="Proof" title={<span id="related-title">Relevant projects</span>} />
            <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <ProjectCard project={p} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <FAQSection items={service.faqs} title={`${service.shortTitle} FAQs`} id="service-faq-title" />
      <ConsultationCTA title={`Let's talk about your ${service.shortTitle.toLowerCase()} project`} />
    </>
  );
}
