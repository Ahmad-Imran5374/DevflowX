import type { MetadataRoute } from "next";
import { posts } from "@/data/blog";
import { caseStudyProjects, projects } from "@/data/projects";
import { services } from "@/data/services";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const abs = (path: string) => `${siteConfig.url}${path}`;
  const staticPages = ["", "/services", "/case-studies", "/portfolio", "/about", "/blog", "/contact"];

  return [
    ...staticPages.map((p) => ({ url: abs(p || "/"), changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8 })),
    ...services.map((s) => ({ url: abs(`/services/${s.slug}`), changeFrequency: "monthly" as const, priority: 0.8 })),
    ...caseStudyProjects().map((p) => ({ url: abs(`/case-studies/${p.slug}`), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...projects.map((p) => ({ url: abs(`/portfolio/${p.slug}`), changeFrequency: "monthly" as const, priority: 0.6 })),
    ...posts.map((p) => ({ url: abs(`/blog/${p.slug}`), lastModified: p.date, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
