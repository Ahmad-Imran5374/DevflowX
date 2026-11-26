import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { processPhases } from "@/data/content";

/** Large light-weight headline with fading lines, followed by phase columns with tag chips. */
export function ProcessSection() {
  return (
    <section aria-labelledby="process-title" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="absolute -left-40 top-20 -z-10 size-[30rem] rounded-full bg-brand-blue/10 blur-[120px]" />
      <Container>
        <p className="mb-8 inline-flex items-center gap-2 text-xs text-slate-400">
          <span aria-hidden className="size-1.5 rounded-full bg-emerald-400" />
          Development process
        </p>
        <h2
          id="process-title"
          className="font-display text-4xl font-light uppercase leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
        >
          <span className="block text-white">Structured process</span>
          <span className="block text-slate-300/80 sm:pl-[14%]">from idea</span>
          <span className="block text-slate-500">to launch</span>
        </h2>
        <p className="mt-10 max-w-sm text-sm leading-relaxed text-muted sm:ml-[48%]">
          Every project follows a clear, iterative path. Each phase reduces risk, improves usability and keeps scope
          honest, so the result is a system aligned with real user needs.
        </p>

        <ol className="mt-20 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {processPhases.map((phase, i) => (
            <li key={phase.title} className={i > 0 ? "lg:border-l lg:border-line lg:pl-8" : "lg:pr-8"}>
              <Reveal delay={i * 0.08}>
                <p className="text-xs tracking-widest text-slate-500">{phase.duration}</p>
                <h3 className="mt-2 font-display text-2xl text-white">{phase.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{phase.description}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {phase.tags.map((t) => (
                    <li key={t.label}>
                      <Badge highlight={t.highlight}>{t.label}</Badge>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
