import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageSkeleton } from "@/components/ui/PageSkeleton";
import { Check } from "lucide-react";
import { ConsultationCTA } from "@/components/sections/ConsultationCTA";
import { PageHero } from "@/components/sections/PageHero";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LivePreview } from "@/components/ui/LivePreview";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { caseStudyProjects, getProject } from "@/data/projects";

export function generateStaticParams() {
  return caseStudyProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/case-studies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project?.caseStudy) return {};
  return {
    title: `${project.title} case study`,
    description: project.caseStudy.challenge,
    alternates: { canonical: `/case-studies/${project.slug}` },
    openGraph: { title: `${project.title} case study`, description: project.caseStudy.challenge, url: `/case-studies/${project.slug}` },
  };
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-4 py-10 md:grid-cols-[220px_1fr] md:gap-10">
      <h2 className="text-sm font-medium uppercase tracking-widest text-brand-electric">{label}</h2>
      <div className="text-lg leading-relaxed text-slate-300">{children}</div>
    </section>
  );
}

export default function CaseStudyPage({ params }: PageProps<"/case-studies/[slug]">) {
  // Reading params inside Suspense lets the route shell render instantly.
  return (
    <Suspense fallback={<PageSkeleton />}>
      <CaseStudyPageContent params={params} />
    </Suspense>
  );
}

async function CaseStudyPageContent({ params }: { params: PageProps<"/case-studies/[slug]">["params"] }) {
  const { slug } = await params;
  const project = getProject(slug);
  const cs = project?.caseStudy;
  if (!project || !cs) notFound();

  return (
    <>
      <PageHero eyebrow={`Case study · ${project.category}`} title={project.title} description={project.tagline}>
        {project.links?.map((l) => (
          <ButtonLink key={l.href} href={l.href} variant="secondary" size="lg" arrow>
            {l.label}
          </ButtonLink>
        ))}
      </PageHero>

      <Container className="pb-8">
        <LivePreview
          title={project.title}
          url={project.links?.[0]?.href}
          poster={<ProjectVisual project={project} className="size-full" sizes="100vw" />}
        />
        <div className="divide-y divide-line">
          <Block label="The challenge">
            <p>{cs.challenge}</p>
          </Block>
          <Block label="The solution">
            <p>{cs.solution}</p>
          </Block>
          <Block label="Implementation">
            <ul className="space-y-3">
              {cs.implementation.map((i) => (
                <li key={i} className="flex gap-3">
                  <span aria-hidden className="mt-3 size-1.5 shrink-0 rounded-full bg-brand-violet" />
                  {i}
                </li>
              ))}
            </ul>
          </Block>
          <Block label="Technology stack">
            <ul className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <li key={t}>
                  <Badge>{t}</Badge>
                </li>
              ))}
            </ul>
          </Block>
          <Block label="Results">
            <ul className="space-y-3">
              {cs.results.map((r) => (
                <li key={r} className="flex gap-3">
                  <Check aria-hidden className="mt-1.5 size-5 shrink-0 text-emerald-400" />
                  {r}
                </li>
              ))}
            </ul>
          </Block>
        </div>
      </Container>
      <ConsultationCTA title="Want results like these?" />
    </>
  );
}
