import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import type { Project } from "@/types";

/** Outlined project card with artwork and a "Preview" pill, inspired by editorial portfolio grids. */
export function ProjectCard({ project, size = "md" }: { project: Project; size?: "md" | "lg" }) {
  const href = `/portfolio/${project.slug}`;
  const preview = project.links?.[0]?.href;
  // Sits above the card-wide link overlay so it is independently clickable.
  const pill =
    "absolute bottom-7 right-7 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-navy-950/60 px-4 py-2 text-xs font-medium text-white backdrop-blur transition-colors hover:bg-white hover:text-navy-950 group-hover:bg-white group-hover:text-navy-950";
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/15 bg-navy-900/60 transition-colors duration-300 hover:border-brand-electric/60">
      <div className="p-6 pb-5">
        <p className="text-xs uppercase tracking-widest text-slate-500">{project.category}</p>
        <h3 className="mt-3 font-display text-2xl font-medium text-white">
          <Link href={href} className="after:absolute after:inset-0 after:content-['']">
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{project.tagline}</p>
      </div>
      <div className="relative mt-auto px-3 pb-3">
        <ProjectVisual
          project={project}
          className={`rounded-[1.25rem] aspect-[2/1] transition-transform duration-500 group-hover:scale-[1.015]`}
        />
        {preview ? (
          <a
            href={preview}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Preview ${project.title} (opens in a new tab)`}
            className={pill}
          >
            Preview <ArrowUpRight aria-hidden className="size-3.5" />
          </a>
        ) : (
          // No live URL yet: the pill is decorative and the whole card opens the project details.
          <span aria-hidden className={`${pill} pointer-events-none`}>
            Details <ArrowUpRight aria-hidden className="size-3.5" />
          </span>
        )}
      </div>
    </article>
  );
}
