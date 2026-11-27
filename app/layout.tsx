import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Urbanist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { services } from "@/data/services";
import { siteConfig } from "@/lib/site";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const display = Urbanist({ variable: "--font-display", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.seoTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "technology",
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_CA",
    title: siteConfig.seoTitle,
    description: siteConfig.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seoTitle,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  // Set GOOGLE_SITE_VERIFICATION (and optionally BING_SITE_VERIFICATION) in env to verify Search Console / Bing.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
  },
};

const sameAs = [siteConfig.social.linkedin, siteConfig.social.github].filter(Boolean);

/** Organization + WebSite structured data: helps Google connect "DevFlowX" searches to this site. */
const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    logo: `${siteConfig.url}/devflowx-app-512.png`,
    image: `${siteConfig.url}/opengraph-image`,
    ...(siteConfig.contactEmail ? { email: siteConfig.contactEmail } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: "Unit 1, 56 Chesterwood Crescent",
      addressLocality: "Brampton",
      addressRegion: "ON",
      postalCode: "L6Y 0Z4",
      addressCountry: "CA",
    },
    areaServed: "Worldwide",
    knowsAbout: [
      "AI automation",
      "Business process automation",
      "AI and LLM integration",
      "Web application development",
      "SaaS development",
      "API development",
      "Custom software development",
    ],
    ...(sameAs.length ? { sameAs } : {}),
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    alternateName: ["DevFlowX Studio", "Dev Flow X"],
    publisher: { "@id": `${siteConfig.url}/#organization` },
    inLanguage: "en",
  },
];

export const viewport: Viewport = {
  themeColor: "#050816",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const navServices = services.map(({ slug, title, shortTitle }) => ({ slug, title, shortTitle }));
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${display.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
        <Navbar services={navServices} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
