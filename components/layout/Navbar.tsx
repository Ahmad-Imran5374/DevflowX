"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { mainNav, siteConfig } from "@/lib/site";

type NavService = { slug: string; shortTitle: string; title: string };

export function Navbar({ services }: { services: NavService[] }) {
  const pathname = usePathname();
  // The menu is "open" only for the page it was opened on, so navigating closes it without an effect.
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;
  const setOpen = (v: boolean) => setOpenAt(v ? pathname : null);

  // Escape closes the menu; lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenAt(null);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const linkCls = (href: string) =>
    `rounded-full px-3 py-2 text-sm transition-colors hover:text-white ${
      pathname === href || pathname.startsWith(href + "/") ? "text-white" : "text-slate-300"
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <a
        href="#main"
        className="sr-only rounded-full bg-white px-4 py-2 text-sm font-medium text-navy-950 focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between rounded-full border border-white/10 bg-navy-900/70 pl-5 pr-2.5 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl"
      >
        <Link href="/" aria-label="DevFlowX home" className="shrink-0">
          <Image src="/images/devflowx-logo-dark.svg" alt="DevFlowX" width={520} height={120} className="h-8 w-auto" priority />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          <li className="group relative">
            <Link href="/services" className={`${linkCls("/services")} inline-flex items-center gap-1`}>
              Services
              <ChevronDown aria-hidden className="size-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
            </Link>
            <div className="invisible absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              <ul className="rounded-2xl border border-white/10 bg-navy-900/95 p-2 shadow-2xl backdrop-blur-xl">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="block rounded-xl px-4 py-2.5 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={linkCls(item.href)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {/* Wrapper (not a className on the button) hides it reliably below sm. */}
          <div className="hidden sm:block">
            <ButtonLink href={siteConfig.bookingUrl}>Book a Consultation</ButtonLink>
          </div>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-white/10 text-white lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="mx-auto mt-3 max-h-[calc(100dvh-6.5rem)] max-w-6xl overflow-y-auto rounded-3xl border border-white/10 bg-navy-900/95 p-4 shadow-2xl backdrop-blur-xl lg:hidden"
        >
          <p className="px-3 pb-2 pt-1 text-xs font-medium uppercase tracking-widest text-slate-500">Services</p>
          <ul>
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="block rounded-xl px-3 py-3 text-slate-200 hover:bg-white/5">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="my-3 h-px bg-white/10" />
          <ul>
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="block rounded-xl px-3 py-3 text-slate-200 hover:bg-white/5">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2">
            <ButtonLink href={siteConfig.bookingUrl} size="lg" className="w-full">
              Book a Consultation
            </ButtonLink>
            <ButtonLink href="/contact?intent=quote" variant="secondary" size="lg" className="w-full">
              Get a Project Quote
            </ButtonLink>
          </div>
        </div>
      )}
    </header>
  );
}
