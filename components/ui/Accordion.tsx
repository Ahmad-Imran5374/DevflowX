import { ChevronDown } from "lucide-react";
import type { FAQ } from "@/types";

/** Accessible FAQ built on native details/summary: keyboard-friendly and works without JavaScript. */
export function FAQList({ items }: { items: FAQ[] }) {
  return (
    <div className="divide-y divide-line rounded-3xl border border-line bg-navy-900/60">
      {items.map((item) => (
        <details key={item.question} className="group px-6 py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-md text-left text-base font-medium text-white marker:hidden sm:text-lg">
            {item.question}
            <ChevronDown
              aria-hidden
              className="size-5 shrink-0 text-brand-electric transition-transform duration-300 group-open:rotate-180"
            />
          </summary>
          <p className="mt-3 max-w-3xl leading-relaxed text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
