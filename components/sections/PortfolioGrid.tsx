"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projectCategories, projects } from "@/data/projects";

/** Client component: category filtering is the only interactive piece of the portfolio page. */
export function PortfolioGrid() {
  const [active, setActive] = useState<(typeof projectCategories)[number]>("All");
  const visible = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
        {projectCategories.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={active === c}
            onClick={() => setActive(c)}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              active === c
                ? "border-brand-electric bg-brand-electric text-navy-950"
                : "border-line text-slate-300 hover:border-white/30 hover:text-white"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <p role="status" className="sr-only">
        Showing {visible.length} project{visible.length === 1 ? "" : "s"}
      </p>
      <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <li key={p.slug}>
            <ProjectCard project={p} />
          </li>
        ))}
      </ul>
    </div>
  );
}
