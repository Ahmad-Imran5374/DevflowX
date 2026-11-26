import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ConsultationCTA } from "@/components/sections/ConsultationCTA";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { caseStudyProjects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "How DevFlowX approached real product challenges: the problem, solution, implementation and outcomes.",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesPage() {
  const items = caseStudyProjects();
  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title={
          <>
            Real problems, <span className="text-gradient">engineered solutions</span>
          </>
        }
        description="A closer look at how we approached the challenge, what we built and what it delivered."
      />
      <section className="pb-12">
        <Container>
          <ul className="space-y-6">
            {items.map((p, i) => (
              <li key={p.slug}>
                <article className="group relative grid overflow-hidden rounded-[2rem] border border-white/15 bg-navy-900/60 transition-colors hover:border-brand-electric/60 md:grid-cols-2">
                  <ProjectVisual
                    project={p}
                    className={`min-h-64 ${i % 2 ? "md:order-2" : ""}`}
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                  <div className="flex flex-col justify-center p-8 sm:p-12">
                    <p className="text-xs uppercase tracking-widest text-slate-500">{p.category}</p>
                    <h2 className="mt-3 font-display text-3xl font-medium text-white">
                      <Link href={`/case-studies/${p.slug}`} className="after:absolute after:inset-0 after:content-['']">
                        {p.title}
                      </Link>
                    </h2>
                    <p className="mt-3 leading-relaxed text-muted">{p.caseStudy?.challenge}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand-electric">
                      Read case study
                      <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <ConsultationCTA />
    </>
  );
}
