import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageSkeleton } from "@/components/ui/PageSkeleton";
import { ArrowUpRight, Check } from "lucide-react";
import { ConsultationCTA } from "@/components/sections/ConsultationCTA";
import { PageHero } from "@/components/sections/PageHero";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LivePreview } from "@/components/ui/LivePreview";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { getProject, projects } from "@/data/projects";
import { getService } from "@/data/services";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/portfolio/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title}: ${project.tagline}`,
    description: project.summary,
    alternates: { canonical: `/portfolio/${project.slug}` },
    openGraph: { title: project.title, description: project.summary, url: `/portfolio/${project.slug}` },
  };
}

export default function ProjectPage({ params }: PageProps<"/portfolio/[slug]">) {
  // Reading params inside Suspense lets the route shell render instantly.
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ProjectPageContent params={params} />
    </Suspense>
  );
}

async function ProjectPageContent({ params }: { params: PageProps<"/portfolio/[slug]">["params"] }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const relatedServices = project.serviceSlugs.map(getService).filter((s) => s !== undefined);

  return (
    <>
      <PageHero eyebrow={project.category} title={project.title} description={project.summary}>
        {project.caseStudy && (
          <ButtonLink href={`/case-studies/${project.slug}`} size="lg" arrow>
            Read the case study
          </ButtonLink>
        )}
        {project.links?.map((l) => (
          <ButtonLink key={l.href} href={l.href} variant="secondary" size="lg" arrow>
            {l.label}
          </ButtonLink>
        ))}
      </PageHero>

      <section className="pb-20">
        <Container className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <LivePreview
            title={project.title}
            url={project.links?.[0]?.href}
            poster={<ProjectVisual project={project} className="size-full" sizes="(min-width: 1024px) 60vw, 100vw" />}
            className="self-start"
          />
          <div className="space-y-10">
            <div>
              <h2 className="text-sm font-medium uppercase tracking-widest text-slate-500">Highlights</h2>
              <ul className="mt-4 space-y-3">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-slate-200">
                    <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-electric" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-medium uppercase tracking-widest text-slate-500">Technologies</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <li key={t}>
                    <Badge>{t}</Badge>
                  </li>
                ))}
              </ul>
            </div>
            {project.status && (
              <p className="text-sm text-muted">
                <span className="text-slate-500">Status:</span> {project.status}
              </p>
            )}
            {relatedServices.length > 0 && (
              <div>
                <h2 className="text-sm font-medium uppercase tracking-widest text-slate-500">Related services</h2>
                <ul className="mt-4 space-y-2">
                  {relatedServices.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="inline-flex items-center gap-1.5 text-brand-electric hover:text-white">
                        {s.title} <ArrowUpRight aria-hidden className="size-4" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Container>
      </section>
      <ConsultationCTA />
    </>
  );
}
