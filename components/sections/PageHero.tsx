import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Compact hero used at the top of inner pages. Renders the page's single h1. */
export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden pb-16 pt-40 sm:pb-20 sm:pt-48">
      <div aria-hidden className="grid-fade absolute inset-0 -z-10" />
      <div aria-hidden className="absolute -right-24 top-0 -z-10 size-[28rem] rounded-full bg-brand-violet/20 blur-[120px]" />
      <div aria-hidden className="absolute -left-24 top-24 -z-10 size-[24rem] rounded-full bg-brand-blue/15 blur-[120px]" />
      <Container>
        <SectionHeading as="h1" eyebrow={eyebrow} title={title} description={description} />
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </Container>
    </section>
  );
}
