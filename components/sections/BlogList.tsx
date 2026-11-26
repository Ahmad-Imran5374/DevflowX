"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

type PostSummary = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  dateLabel: string;
  readingMinutes: number;
};

/** Client component: category filtering. Posts are passed in as plain serialisable props. */
export function BlogList({ posts, categories }: { posts: PostSummary[]; categories: string[] }) {
  const [active, setActive] = useState("All");
  const visible = active === "All" ? posts : posts.filter((p) => p.category === active);

  return (
    <div>
      <div role="group" aria-label="Filter articles by category" className="mb-10 flex flex-wrap gap-2">
        {categories.map((c) => (
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
      <ul className="grid gap-5 md:grid-cols-2">
        {visible.map((post) => (
          <li key={post.slug}>
            <article className="group relative flex h-full flex-col rounded-3xl border border-line bg-navy-900/60 p-7 transition-colors hover:border-brand-electric/50">
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <Badge>{post.category}</Badge>
                <time dateTime={post.date}>{post.dateLabel}</time>
                <span>{post.readingMinutes} min read</span>
              </div>
              <h2 className="mt-5 font-display text-2xl font-medium text-white">
                <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 after:content-['']">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 flex-1 leading-relaxed text-muted">{post.excerpt}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand-electric">
                Read article <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
