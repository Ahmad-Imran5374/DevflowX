import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { whyChoose } from "@/data/content";

export function WhyChoose() {
  return (
    <section aria-labelledby="why-title" className="py-24 sm:py-32">
      <Container className="grid gap-14 lg:grid-cols-[1fr_1.4fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow="Why DevFlowX"
            title={<span id="why-title">A partner that builds like an owner</span>}
            description="We combine product judgement with senior engineering, so you get software that works for users and for the business."
          />
        </div>
        <ul className="grid gap-5 sm:grid-cols-2">
          {whyChoose.map((item, i) => (
            <li key={item.title}>
              <Reveal delay={(i % 2) * 0.07} className="h-full">
                <div className="surface h-full rounded-3xl p-6">
                  <span className="flex size-9 items-center justify-center rounded-full bg-brand-electric/15 text-brand-electric">
                    <Check aria-hidden className="size-4" />
                  </span>
                  <h3 className="mt-5 text-lg font-medium text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
