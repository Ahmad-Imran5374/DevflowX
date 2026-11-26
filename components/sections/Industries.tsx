import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { industries } from "@/data/content";

export function Industries() {
  return (
    <section aria-labelledby="industries-title" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Industries"
          title={<span id="industries-title">Experience across sectors</span>}
          description="The same engineering fundamentals apply everywhere, tuned to the realities of each industry."
        />
        <ul className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((item) => (
            <li key={item.name} className="bg-navy-900 p-6 transition-colors hover:bg-navy-800">
              <h3 className="font-medium text-white">{item.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
