import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Impact } from "@/components/sections/Impact";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { Industries } from "@/components/sections/Industries";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQSection } from "@/components/sections/FAQSection";
import { ConsultationCTA } from "@/components/sections/ConsultationCTA";
import { Newsletter } from "@/components/sections/Newsletter";
import { homeFaqs } from "@/data/content";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <FeaturedProjects />
      <Impact />
      <ProcessSection />
      <WhyChoose />
      <Industries />
      <Testimonials />
      <FAQSection items={homeFaqs} />
      <ConsultationCTA />
      <Newsletter />
    </>
  );
}
