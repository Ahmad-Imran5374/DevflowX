import { Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/content";

export function Testimonials() {
  // Hidden until genuine, approved testimonials are added to data/content.ts.
  if (testimonials.length === 0) return null;
  return (
    <section aria-labelledby="testimonials-title" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Client feedback"
          title={<span id="testimonials-title">What clients say</span>}
        />
        <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <li key={`${t.name}-${t.company}`}>
              <figure className="surface h-full rounded-3xl p-7">
                <Quote aria-hidden className="size-6 text-brand-electric" />
                <blockquote className="mt-4 leading-relaxed text-slate-200">{t.quote}</blockquote>
                <figcaption className="mt-6 text-sm">
                  <span className="font-medium text-white">{t.name}</span>
                  <span className="block text-muted">
                    {t.role}, {t.company}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
