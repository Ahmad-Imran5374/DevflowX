import type { Metadata } from "next";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { ConsultationCTA } from "@/components/sections/ConsultationCTA";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Selected SaaS, AI, web, e-commerce and healthcare projects designed and built by DevFlowX.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Projects"
        description="A selection of products we have built across AI, SaaS, web and e-commerce. Filter by category to explore."
      />
      <section className="pb-12">
        <Container>
          <PortfolioGrid />
        </Container>
      </section>
      <ConsultationCTA />
    </>
  );
}
