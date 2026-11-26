import type { Project, ProjectCategory } from "@/types";

/**
 * Project content is drawn from the delivered work described in the owner's résumés.
 * - Add real screenshots at `image` (e.g. "/images/projects/codexa-leads.png") to replace the generated artwork.
 * - Add measured business results to `caseStudy.results` only once confirmed with the client.
 * - Confirm you are permitted to showcase each project (client/employer work) before publishing.
 */
const RESULTS_PLACEHOLDER =
  "[Placeholder] Add measured business results here (e.g. conversion, time saved, revenue, uptime) once confirmed.";

export const projects: Project[] = [
  {
    slug: "codexa",
    title: "Codexa",
    tagline: "AI-native B2B lead-to-deal platform",
    category: "AI & LLM",
    summary:
      "A multi-tenant, AI-native CRM that converts B2B leads into deals through AI lead scoring, outreach campaigns and meeting scheduling.",
    highlights: [
      "Next-Best-Action engine using LLM reasoning over lead signals",
      "Outreach sequenced across email, LinkedIn and AI voice",
      "Human-in-the-loop approvals and kill-switch controls",
    ],
    technologies: ["React", "TypeScript", "Node.js", "Express 5", "Prisma", "PostgreSQL", "Redis", "BullMQ", "OpenAI", "OpenRouter", "Vapi"],
    serviceSlugs: ["saas-development", "ai-integration-llm-development", "backend-api-development", "business-process-automation"],
    featured: true,
    links: [{ href: "https://staging.codexahub.io", label: "View staging site" }],
    image: "/images/projects/codexa-leads.png",
    accent: "violet",
    status: "In development",
    caseStudy: {
      challenge:
        "B2B sales teams lose deals to slow, inconsistent follow-up. Deciding who to contact, through which channel and when is mostly manual, and automating it naively risks sending the wrong message at scale.",
      solution:
        "A multi-tenant platform that scores leads with AI and uses a Next-Best-Action engine to decide and sequence the next outreach step across email, LinkedIn and AI voice, with human approval and kill switches keeping automation safe.",
      implementation: [
        "Designed a layered backend (Express 5, Prisma, PostgreSQL) with a tenant-isolated data model.",
        "Built queued AI jobs with retries on Redis and BullMQ so LLM calls are resilient and observable.",
        "Integrated OpenAI, OpenRouter, Vapi, Apollo, Smartlead, Unipile and Calendly.",
        "Added human-in-the-loop approvals and kill-switch controls for safe AI automation.",
      ],
      results: [
        "Multi-tenant platform live on a staging environment.",
        "Single engine coordinating email, LinkedIn and AI voice outreach.",
      ],
      resultsPlaceholder: RESULTS_PLACEHOLDER,
    },
  },
  {
    slug: "smarthire",
    title: "SmartHire",
    tagline: "AI recruitment and candidate scoring",
    category: "AI & LLM",
    summary:
      "An AI pipeline that parses PDF resumes into structured candidate profiles and ranks candidates against a job-specific scorecard.",
    highlights: [
      "LLM extraction of skills, experience and education from PDFs",
      "Job-specific AI scorecards generated per role",
      "Explainable scoring and ranking",
    ],
    technologies: ["LLM structured outputs", "AI document parsing", "TypeScript", "Node.js"],
    serviceSlugs: ["ai-integration-llm-development", "saas-development"],
    featured: true,
    links: [{ href: "https://staging.smart-hire.io", label: "View staging site" }],
    image: "/images/projects/smarthire-dashboard.png",
    accent: "blue",
    status: "In development",
    caseStudy: {
      challenge:
        "Recruiters spend hours reading unstructured resumes and comparing candidates inconsistently, which slows hiring and introduces bias.",
      solution:
        "An AI pipeline turns resumes into structured profiles, generates a scorecard for each role, and automatically scores and ranks candidates with explainable criteria.",
      implementation: [
        "Built a PDF resume parsing pipeline using LLM extraction into a strict structured schema.",
        "Generated a job-specific scorecard per role to define what 'good' looks like.",
        "Scored and ranked candidates against the scorecard, exposing the reasoning behind each score.",
      ],
      results: [
        "Unstructured resumes converted into consistent, searchable candidate profiles.",
        "Every ranking is accompanied by explainable criteria.",
      ],
      resultsPlaceholder: RESULTS_PLACEHOLDER,
    },
  },
  {
    slug: "kultur-tonight",
    title: "Kultur Tonight",
    tagline: "Multilingual last-minute ticketing, Switzerland",
    category: "Web Applications",
    summary:
      "A cultural discovery and last-minute ticketing platform with real-time EN/DE/FR translation and high-concurrency booking.",
    highlights: [
      "Real-time English, German and French translation",
      "Booking logic built for thousands of simultaneous requests",
      "Tiered membership engine",
      "High-availability design for timed membership releases",
    ],
    technologies: ["PostgreSQL", "Express", "React", "Node.js", "Azure Translator API", "CDN", "Tailwind CSS"],
    serviceSlugs: ["web-application-development", "custom-software-development"],
    featured: true,
    links: [{ href: "https://dev.kulturtonight.ch/en", label: "View dev site" }],
    image: "/images/projects/kultur-tonight.png",
    accent: "indigo",
    caseStudy: {
      challenge:
        "Timed membership releases create sudden spikes where thousands of people compete for limited tickets, in a market that spans three languages.",
      solution:
        "A ticketing platform with concurrency-safe booking logic and real-time translation so every visitor gets a consistent experience in their language.",
      implementation: [
        "Engineered high-concurrency Node.js booking logic to stay correct under simultaneous requests.",
        "Integrated Azure Translator API for real-time EN/DE/FR translation.",
        "Served assets through a CDN and designed for high availability.",
      ],
      results: [
        "Booking logic handles thousands of simultaneous requests during timed membership releases.",
        "Live in production for the Swiss market.",
      ],
      resultsPlaceholder: RESULTS_PLACEHOLDER,
    },
  },
  {
    slug: "wyszukaj-dane",
    title: "wyszukaj dane",
    tagline: "Big-data search platform, Poland",
    category: "Web Applications",
    summary:
      "A platform aggregating millions of address, demographic and administrative records with sub-second search and Stripe payments.",
    highlights: [
      "Millions of hierarchical geographic and demographic records",
      "Sub-second search latency",
      "Stripe payments with automated PDF invoicing and full Polish localisation",
    ],
    technologies: ["MongoDB", "Express", "React", "Node.js", "AWS S3", "Stripe", "i18next"],
    serviceSlugs: ["web-application-development", "backend-api-development"],
    featured: true,
    links: [{ href: "https://wyszukajdane.pl", label: "Visit wyszukajdane.pl" }],
    image: "/images/projects/wyszukaj-dane.png",
    accent: "cyan",
    caseStudy: {
      challenge:
        "Millions of records across a deep geographic hierarchy had to be searchable instantly and monetised through paid access in the Polish market.",
      solution:
        "A purpose-designed MongoDB schema for hierarchical data, fast search, Stripe payments with automated invoicing, and full Polish localisation.",
      implementation: [
        "Modelled hierarchical geographic and demographic data in MongoDB for fast lookups.",
        "Stored files on AWS S3.",
        "Implemented dual-model Stripe payments with automated PDF invoicing.",
        "Localised the experience into Polish with i18next.",
      ],
      results: [
        "Sub-second search across millions of records.",
        "Automated PDF invoicing for every payment.",
      ],
      resultsPlaceholder: RESULTS_PLACEHOLDER,
    },
  },
  {
    slug: "zavaro",
    title: "Zavaro",
    tagline: "Premium fashion e-commerce platform",
    category: "E-commerce",
    summary:
      "A full-stack e-commerce platform for a fashion brand with live order and inventory updates, dual payment options and SEO-focused rendering.",
    highlights: [
      "Real-time order tracking and inventory via Socket.io",
      "Media stored on Cloudflare R2",
      "Lemon Squeezy payments plus Cash on Delivery",
      "Self-managed Linux server with custom domain and SSL",
    ],
    technologies: ["Next.js", "Node.js", "Socket.io", "Cloudflare R2", "Lemon Squeezy", "Linux"],
    serviceSlugs: ["web-application-development", "custom-software-development"],
        links: [{ href: "https://zavaro-wear.com", label: "Visit zavaro-wear.com" }],
    accent: "violet",
    image: "/images/projects/zavaro.png",
    caseStudy: {
      challenge:
        "A premium fashion brand needed a store that feels fast, shows live stock and orders, supports local payment preferences and ranks in search.",
      solution:
        "A server-rendered Next.js storefront with real-time updates, dual payment methods and media on Cloudflare R2, deployed on a self-managed server.",
      implementation: [
        "Built multi-collection catalogues with server-side rendering for SEO.",
        "Used Socket.io for live order and inventory updates.",
        "Integrated Lemon Squeezy with webhook handling, plus Cash on Delivery.",
        "Deployed over SSH on Linux with a custom domain and SSL configuration.",
      ],
      results: [
        "Live storefront with real-time order and inventory updates.",
        "Two payment methods supported in a single checkout flow.",
      ],
      resultsPlaceholder: RESULTS_PLACEHOLDER,
    },
  },
  {
    slug: "genetic-wellness-platform",
    title: "Genetic Testing & Wellness Platform",
    tagline: "From DNA kit checkout to personalised supplement plans",
    category: "Healthcare",
    summary:
      "An end-to-end platform covering DNA kit checkout, lab result processing, patient dashboards and an explainable recommendation engine.",
    highlights: [
      "Stripe checkout with reliable webhook-driven order handling",
      "Recommendation engine mapping genetic markers to supplement plans",
      "Automated patient engagement through GoHighLevel CRM",
      "600,000+ lines of type-safe TypeScript with RBAC-secured REST APIs",
      "SEO-focused marketing site using SSR/ISR with GoHighLevel lead automation",
    ],
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "Express", "PostgreSQL", "Zustand", "Stripe", "GoHighLevel", "Tailwind CSS"],
    serviceSlugs: ["saas-development", "business-process-automation", "backend-api-development"],
    featured: true,
    links: [
      { href: "https://app.projectrebuilt.com", label: "Visit the web app" },
      { href: "https://projectrebuilt.com", label: "Visit the marketing site" },
    ],
    image: "/images/projects/rebuilt-app.png",
    accent: "blue",
    status: "Client details confidential",
    caseStudy: {
      challenge:
        "Customers needed a smooth path from buying a DNA kit to understanding their results, while the business needed explainable recommendations and automated patient communication.",
      solution:
        "A platform that connects checkout, lab result processing and patient dashboards, with a rules-based recommendation engine whose outputs can be explained.",
      implementation: [
        "Built the journey from DNA kit purchase (Stripe) to diagnostic result processing.",
        "Designed the rules and data model for the marker-to-supplement recommendation engine.",
        "Automated onboarding, result notifications and follow-ups via GoHighLevel integration.",
      ],
      results: [
        "End-to-end journey from checkout to results delivered in one platform.",
        "Explainable recommendations driven by a defined rules model.",
      ],
      resultsPlaceholder: RESULTS_PLACEHOLDER,
    },
  },
  {
    slug: "ai-coach-chatbot",
    title: "AI Coach Chatbot",
    tagline: "Conversational, context-aware guidance in a mobile app",
    category: "AI & LLM",
    summary:
      "A rebuilt AI coaching chatbot for a mobile app delivering conversational, context-aware guidance using LLM APIs.",
    highlights: ["LLM-powered conversational guidance", "Context-aware responses", "Mobile-first delivery"],
    technologies: ["LLM APIs", "Node.js", "TypeScript"],
    serviceSlugs: ["ai-integration-llm-development"],
    accent: "indigo",
    status: "Client details confidential",
  },
  {
    slug: "rebuilt-app",
    title: "Rebuilt App",
    tagline: "Enterprise PERN platform with RBAC-secured APIs",
    category: "Web Applications",
    summary:
      "A high-performance PERN-stack enterprise application: 600,000+ lines of type-safe TypeScript, modular architecture and role-based access across REST APIs.",
    highlights: ["600,000+ lines of type-safe TypeScript", "Modular architecture", "RBAC-secured REST APIs"],
    technologies: ["PostgreSQL", "Express", "React", "Node.js", "TypeScript", "Zustand"],
    serviceSlugs: ["web-application-development", "backend-api-development", "custom-software-development"],
    image: "/images/projects/rebuilt-app.png",
    links: [{ href: "https://app.projectrebuilt.com", label: "Visit the web app" }],
    accent: "indigo",
  },
  {
    slug: "rebuilt-marketing",
    title: "Rebuilt Marketing",
    tagline: "Conversion-focused site with CRM lead automation",
    category: "Web Applications",
    summary:
      "A conversion-centric Next.js platform integrated with GoHighLevel for lead automation, with Stripe-powered DNA kit checkout and SSR/ISR for strong SEO.",
    highlights: ["GoHighLevel lead automation", "Stripe-powered DNA kit checkout", "SSR/ISR for SEO"],
    technologies: ["Next.js", "GoHighLevel", "Stripe", "Tailwind CSS"],
    serviceSlugs: ["web-application-development", "business-process-automation"],
    image: "/images/projects/rebuilt-marketing.png",
    links: [{ href: "https://projectrebuilt.com", label: "Visit the marketing site" }],
    accent: "violet",
  },
  {
    slug: "dzbnb",
    title: "DZbnb",
    tagline: "Airbnb-style booking engine",
    category: "Web Applications",
    summary:
      "A hospitality and booking engine with real-time availability and reservation management.",
    highlights: ["Real-time availability", "Reservation management", "Backend services and APIs"],
    technologies: ["React", "Node.js", "PostgreSQL"],
    serviceSlugs: ["web-application-development", "custom-software-development", "backend-api-development"],
    links: [{ href: "https://dev.dz-bnb.com", label: "View dev site" }],
    image: "/images/projects/dzbnb.png",
    accent: "cyan",
  },
  {
    slug: "sudduth-reality",
    title: "SudduthReality",
    tagline: "Real-estate listing and management platform",
    category: "Web Applications",
    summary:
      "A real-estate listing and management platform with search and filtering, modelled on leading property portals.",
    highlights: ["Listing management", "Search and filtering", "Relational data models and search APIs"],
    technologies: ["Node.js", "REST APIs", "Relational databases"],
    serviceSlugs: ["custom-software-development", "backend-api-development"],
    image: "/images/projects/sudduth-reality.png",
    accent: "blue",
  },
  {
    slug: "dentment",
    title: "Dentment",
    tagline: "Professional network for dental mentors and students",
    category: "SaaS",
    summary:
      "A professional networking platform connecting dental mentors, students and practitioners, with secure authentication and role-based access.",
    highlights: ["Role-based authorisation", "Secure authentication", "Mentor / student / practitioner matching"],
    technologies: ["React", "Node.js", "MongoDB", "JWT"],
    serviceSlugs: ["custom-software-development", "saas-development"],
    image: "/images/projects/dentment.png",
    links: [{ href: "https://dev.dent-ment.com", label: "View dev site" }],
    accent: "violet",
  },
];

export const projectCategories: ("All" | ProjectCategory)[] = [
  "All",
  "SaaS",
  "AI & LLM",
  "Web Applications",
  "E-commerce",
  "Healthcare",
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const featuredProjects = () => projects.filter((p) => p.featured);
export const caseStudyProjects = () => projects.filter((p) => p.caseStudy);
export const projectsForService = (slugs: string[]) =>
  slugs.map((s) => getProject(s)).filter((p): p is Project => Boolean(p));
