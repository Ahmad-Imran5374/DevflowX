export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
}) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p className="mb-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-brand-electric">
          <span aria-hidden className="size-1.5 rounded-full bg-brand-electric" />
          {eyebrow}
        </p>
      )}
      <Tag className="font-display text-4xl font-medium leading-[1.08] tracking-tight text-white sm:text-5xl">
        {title}
      </Tag>
      {description && <p className="mt-5 text-lg leading-relaxed text-muted">{description}</p>}
    </div>
  );
}
