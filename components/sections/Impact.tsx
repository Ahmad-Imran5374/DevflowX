import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { impactHighlights } from "@/data/content";

export function Impact() {
  return (
    <section aria-labelledby="impact-title" className="relative py-24 sm:py-32">
      <div aria-hidden className="absolute inset-x-0 top-1/2 -z-10 h-72 -translate-y-1/2 bg-brand-indigo/10 blur-3xl" />
      <Container>
        <SectionHeading
          eyebrow="Business impact"
          title={<span id="impact-title">Engineering that holds up under real demand</span>}
          description="What our delivered platforms handle in production. Measured client outcomes are added to each case study as they are confirmed."
        />
        <dl className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {impactHighlights.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} className="flex flex-col bg-navy-900 p-8">
              <dt className="order-2 mt-3 text-sm leading-relaxed text-muted">{s.label}</dt>
              <dd className="font-display text-4xl font-medium text-gradient">{s.value}</dd>
              <p className="mt-4 text-xs uppercase tracking-widest text-slate-500">{s.source}</p>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
