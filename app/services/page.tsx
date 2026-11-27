import type { Metadata } from "next";
import { ConsultationCTA } from "@/components/sections/ConsultationCTA";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "AI Automation, Web & Software Development Services",
  description:
    "DevFlowX offers AI automation, LLM integration, business process automation, website and web application development, SaaS, backend and API development, and custom software.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Capabilities to take you from <span className="text-gradient">idea to scale</span>
          </>
        }
        description="Six focused services, delivered by engineers who care about the product, not just the code."
      />
      <section className="pb-12">
        <Container>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.slug}>
                <ServiceCard service={s} />
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <ConsultationCTA />
    </>
  );
}
