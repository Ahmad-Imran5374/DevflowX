import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featuredProjects } from "@/data/projects";

export function FeaturedProjects() {
  const items = featuredProjects().slice(0, 4);
  return (
    <section aria-labelledby="projects-title" className="py-24 sm:py-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Featured projects"
            title={<span id="projects-title">Selected work</span>}
            description="Products we have designed, built and shipped across AI, SaaS, e-commerce and healthcare."
          />
          <ButtonLink href="/portfolio" variant="secondary" arrow>
            View all projects
          </ButtonLink>
        </div>
        <ul className="mt-14 grid gap-5 md:grid-cols-2">
          {items.map((p, i) => (
            <li key={p.slug}>
              <Reveal delay={(i % 2) * 0.08} className="h-full">
                <ProjectCard project={p} size="lg" />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
