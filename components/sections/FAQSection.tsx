import { Container } from "@/components/ui/Container";
import { FAQList } from "@/components/ui/Accordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { FAQ } from "@/types";

export function FAQSection({
  items,
  title = "Frequently asked questions",
  id = "faq-title",
}: {
  items: FAQ[];
  title?: string;
  id?: string;
}) {
  return (
    <section aria-labelledby={id} className="py-24 sm:py-32">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
        <SectionHeading eyebrow="FAQ" title={<span id={id}>{title}</span>} />
        <FAQList items={items} />
      </Container>
    </section>
  );
}
