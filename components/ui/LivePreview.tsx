"use client";

import { useState } from "react";
import { ArrowUpRight, MonitorPlay } from "lucide-react";

/**
 * Click-to-load live preview of a project site inside a browser frame.
 * The iframe is only created on demand (no third-party requests or layout cost until clicked).
 * `poster` is shown first; if no URL exists, only the poster is rendered.
 */
export function LivePreview({
  title,
  url,
  poster,
  className = "",
}: {
  title: string;
  url?: string;
  poster: React.ReactNode;
  className?: string;
}) {
  const [active, setActive] = useState(false);

  if (!url) return <div className={className}>{poster}</div>;

  const host = new URL(url).host;

  return (
    <div className={`overflow-hidden rounded-[2rem] border border-line bg-navy-900 ${className}`}>
      <div className="flex items-center gap-3 border-b border-line bg-navy-800/80 px-4 py-3">
        <span aria-hidden className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
        </span>
        <span className="min-w-0 flex-1 truncate rounded-full bg-navy-950/70 px-4 py-1 text-center text-xs text-slate-400">
          {host}
        </span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${title} in a new tab`}
          className="text-slate-400 hover:text-white"
        >
          <ArrowUpRight aria-hidden className="size-4" />
        </a>
      </div>

      <div className="relative aspect-[16/10] bg-navy-950">
        {active ? (
          <iframe
            src={url}
            title={`${title} live preview`}
            loading="lazy"
            referrerPolicy="no-referrer"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            className="absolute inset-0 size-full border-0 bg-white"
          />
        ) : (
          <>
            <div className="absolute inset-0">{poster}</div>
            <div className="absolute inset-0 flex items-center justify-center bg-navy-950/40">
              <button
                type="button"
                onClick={() => setActive(true)}
                className="bg-brand-gradient inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-medium text-white shadow-[0_8px_30px_-8px_rgba(91,140,255,0.8)] transition-transform hover:-translate-y-0.5"
              >
                <MonitorPlay aria-hidden className="size-4" />
                Load live preview
              </button>
            </div>
          </>
        )}
      </div>
      {active && (
        <p className="border-t border-line px-4 py-2.5 text-xs text-slate-500">
          Some sites restrict embedding or may be a dev/staging build.{" "}
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-brand-electric hover:underline">
            Open in a new tab
          </a>
          .
        </p>
      )}
    </div>
  );
}
