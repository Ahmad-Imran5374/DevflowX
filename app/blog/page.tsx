import type { Metadata } from "next";
import { BlogList } from "@/components/sections/BlogList";
import { Newsletter } from "@/components/sections/Newsletter";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { blogCategories, sortedPosts } from "@/data/blog";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Blog",
  description: "Practical articles on software engineering, AI automation, SaaS architecture and product delivery from DevFlowX.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = sortedPosts().map(({ slug, title, excerpt, category, date, readingMinutes }) => ({
    slug,
    title,
    excerpt,
    category,
    date,
    dateLabel: formatDate(date),
    readingMinutes,
  }));
  return (
    <>
      <PageHero eyebrow="Blog" title="Insights" description="Notes on building and scaling software, AI and automation." />
      <section className="pb-16">
        <Container>
          <BlogList posts={posts} categories={blogCategories} />
        </Container>
      </section>
      <Newsletter />
    </>
  );
}
