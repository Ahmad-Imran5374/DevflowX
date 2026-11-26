import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageSkeleton } from "@/components/ui/PageSkeleton";
import { ArrowLeft } from "lucide-react";
import { ConsultationCTA } from "@/components/sections/ConsultationCTA";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { getPost, posts } from "@/data/blog";
import { formatDate } from "@/lib/format";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    authors: [{ name: post.author }],
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  // Reading params inside Suspense lets the route shell render instantly.
  return (
    <Suspense fallback={<PageSkeleton />}>
      <BlogPostPageContent params={params} />
    </Suspense>
  );
}

async function BlogPostPageContent({ params }: { params: PageProps<"/blog/[slug]">["params"] }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: siteConfig.name },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  };

  return (
    <>
      <article className="pb-12 pt-40 sm:pt-48">
        <Container className="max-w-3xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted hover:text-white">
            <ArrowLeft aria-hidden className="size-4" /> All articles
          </Link>
          <header className="mt-8">
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
              <Badge>{post.category}</Badge>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>{post.readingMinutes} min read</span>
            </div>
            <h1 className="mt-6 font-display text-4xl font-medium leading-tight text-white sm:text-5xl">{post.title}</h1>
            <p className="mt-5 text-xl leading-relaxed text-muted">{post.excerpt}</p>
          </header>
          <div className="mt-12 space-y-10">
            {post.sections.map((s, i) => (
              <section key={i}>
                {s.heading && <h2 className="font-display text-2xl font-medium text-white">{s.heading}</h2>}
                {s.paragraphs.map((p) => (
                  <p key={p} className="mt-4 text-lg leading-relaxed text-slate-300">
                    {p}
                  </p>
                ))}
                {s.list && (
                  <ul className="mt-4 list-disc space-y-2 pl-6 text-lg leading-relaxed text-slate-300 marker:text-brand-electric">
                    {s.list.map((li) => (
                      <li key={li}>{li}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
          <p className="mt-14 border-t border-line pt-6 text-sm text-slate-500">Written by {post.author}</p>
        </Container>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      </article>
      <ConsultationCTA />
    </>
  );
}
