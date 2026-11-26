import Image from "next/image";
import type { Project } from "@/types";

const accents: Record<Project["accent"], string> = {
  blue: "from-[#1d4ed8] via-[#0b1a4a] to-[#050816]",
  violet: "from-[#6d28d9] via-[#1a0f3d] to-[#050816]",
  indigo: "from-[#4338ca] via-[#0f1240] to-[#050816]",
  cyan: "from-[#0e7490] via-[#08203a] to-[#050816]",
};

/**
 * Project preview. Uses a real screenshot when `project.image` is set,
 * otherwise generated brand artwork so layouts are complete before screenshots exist.
 */
export function ProjectVisual({
  project,
  className = "",
  sizes = "(min-width: 1024px) 33vw, 100vw",
}: {
  project: Pick<Project, "title" | "image" | "accent">;
  className?: string;
  sizes?: string;
}) {
  if (project.image) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={project.image} alt={`${project.title} screenshot`} fill sizes={sizes} className="object-cover" />
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label={`${project.title} project artwork`}
      className={`relative overflow-hidden bg-gradient-to-br ${accents[project.accent]} ${className}`}
    >
      <div aria-hidden className="absolute -right-10 -top-10 size-64 rounded-full bg-brand-violet/30 blur-3xl" />
      <div aria-hidden className="absolute -bottom-16 left-1/4 size-64 rounded-full bg-brand-blue/30 blur-3xl" />
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: "repeating-linear-gradient(115deg, transparent 0 28px, rgba(255,255,255,0.06) 28px 30px)",
        }}
      />
      <span
        aria-hidden
        className="absolute bottom-4 left-5 max-w-[90%] truncate font-display text-4xl font-semibold tracking-tight text-white/20 sm:text-5xl"
      >
        {project.title}
      </span>
    </div>
  );
}
