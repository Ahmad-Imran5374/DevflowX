import type { Metadata } from "next";
import { Target, Telescope, UserRound } from "lucide-react";
import { ConsultationCTA } from "@/components/sections/ConsultationCTA";
import { PageHero } from "@/components/sections/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutValues, expertise } from "@/data/content";

export const metadata: Metadata = {
  title: "About",
  description: "DevFlowX is a software studio focused on user-first, outcome-driven products, with deep expertise in AI, SaaS and automation.",
  alternates: { canonical: "/about" },
};

// Replace with real team members when ready. Do not publish invented people.
const team = [
  { name: "[Team member name]", role: "[Role]" },
  { name: "[Team member name]", role: "[Role]" },
  { name: "[Team member name]", role: "[Role]" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About DevFlowX"
        title={
          <>
            Engineers who care about <span className="text-gradient">outcomes</span>
          </>
        }
        description="DevFlowX is a software studio that designs and builds SaaS products, web applications, AI features and automation for businesses that want to move fast without cutting corners."
      />

      <section aria-labelledby="mission-title" className="py-16">
        <Container className="grid gap-5 md:grid-cols-2">
          <h2 id="mission-title" className="sr-only">
            Mission and vision
          </h2>
          <div className="surface rounded-3xl p-8">
            <Target aria-hidden className="size-7 text-brand-electric" />
            <h3 className="mt-5 font-display text-2xl text-white">Our mission</h3>
            <p className="mt-3 leading-relaxed text-muted">
              To turn business ideas into dependable software, combining product thinking, solid engineering and safe
              AI so every release creates real value for the people who use it.
            </p>
          </div>
          <div className="surface rounded-3xl p-8">
            <Telescope aria-hidden className="size-7 text-brand-lilac" />
            <h3 className="mt-5 font-display text-2xl text-white">Our vision</h3>
            <p className="mt-3 leading-relaxed text-muted">
              A world where every growing business can use well-built, intelligent software without enterprise-sized
              budgets or complexity.
            </p>
          </div>
        </Container>
      </section>

      <section aria-labelledby="philosophy-title" className="py-16">
        <Container>
          <SectionHeading eyebrow="Philosophy" title={<span id="philosophy-title">How we build</span>} />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {aboutValues.map((v) => (
              <li key={v.title} className="surface rounded-3xl p-6">
                <h3 className="font-medium text-white">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="expertise-title" className="py-16">
        <Container>
          <SectionHeading eyebrow="Expertise" title={<span id="expertise-title">Technical depth</span>} />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {expertise.map((e) => (
              <div key={e.area} className="surface rounded-3xl p-7">
                <h3 className="font-display text-xl text-white">{e.area}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {e.items.map((i) => (
                    <li key={i}>
                      <Badge>{i}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="team-title" className="py-16">
        <Container>
          <SectionHeading
            eyebrow="Team"
            title={<span id="team-title">The people behind DevFlowX</span>}
            description="[Placeholder] Team profiles will be added here."
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m, i) => (
              <li key={i} className="rounded-3xl border border-dashed border-line p-6">
                <span className="flex size-16 items-center justify-center rounded-full bg-white/5 text-slate-500">
                  <UserRound aria-hidden className="size-7" />
                </span>
                <p className="mt-4 font-medium text-slate-300">{m.name}</p>
                <p className="text-sm text-slate-500">{m.role}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <ConsultationCTA />
    </>
  );
}
