export function Badge({ children, highlight = false }: { children: React.ReactNode; highlight?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
        highlight ? "bg-brand-electric text-navy-950" : "border border-line bg-white/5 text-slate-300"
      }`}
    >
      {children}
    </span>
  );
}
