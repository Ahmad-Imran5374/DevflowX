import Image from "next/image";
import Link from "next/link";
import { services } from "@/data/services";
import { mainNav, siteConfig } from "@/lib/site";

export function Footer() {
  const { social, contactEmail } = siteConfig;
  return (
    <footer className="border-t border-line bg-navy-950">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" aria-label="DevFlowX home">
            <Image src="/images/devflowx-logo-dark.svg" alt="DevFlowX" width={520} height={120} className="h-9 w-auto" />
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">{siteConfig.tagline}</p>
          <address className="mt-5 text-sm not-italic leading-relaxed text-muted">
            <a href={siteConfig.address.mapUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              {siteConfig.address.lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </a>
          </address>
          {contactEmail && (
            <a href={`mailto:${contactEmail}`} className="mt-5 inline-block text-sm text-brand-electric hover:text-white">
              {contactEmail}
            </a>
          )}
        </div>

        <nav aria-label="Services">
          <h2 className="text-sm font-medium text-white">Services</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="hover:text-white">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <h2 className="text-sm font-medium text-white">Company</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            {mainNav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-white">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-medium text-white">Start a project</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li>
              <Link href="/contact?intent=quote" className="hover:text-white">
                Get a Project Quote
              </Link>
            </li>
            <li>
              <a
                href={siteConfig.bookingUrl}
                className="hover:text-white"
                {...(/^https?:/.test(siteConfig.bookingUrl) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                Book a Consultation
              </a>
            </li>
            {social.linkedin && (
              <li>
                <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  LinkedIn
                </a>
              </li>
            )}
            {social.github && (
              <li>
                <a href={social.github} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  GitHub
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-7xl px-5 py-6 text-xs text-slate-500 sm:px-8">
          &copy; {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
