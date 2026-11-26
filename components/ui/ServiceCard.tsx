import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import type { Service } from "@/types";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group relative flex h-full flex-col rounded-3xl border border-line bg-gradient-to-b from-navy-800/70 to-navy-900/60 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-electric/50">
      <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-[0_8px_24px_-8px_rgba(91,140,255,0.8)]">
        <ServiceIcon name={service.icon} />
      </span>
      <h3 className="mt-6 font-display text-2xl font-medium text-white">
        <Link href={`/services/${service.slug}`} className="after:absolute after:inset-0 after:content-['']">
          {service.title}
        </Link>
      </h3>
      <p className="mt-3 flex-1 leading-relaxed text-muted">{service.summary}</p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand-electric">
        Learn more
        <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
      </span>
    </article>
  );
}
