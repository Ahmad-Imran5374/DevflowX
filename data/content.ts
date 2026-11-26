import type { FAQ, ProcessStep, Testimonial } from "@/types";

export const processPhases: {
  duration: string;
  title: string;
  description: string;
  tags: { label: string; highlight?: boolean }[];
}[] = [
  {
    duration: "PHASE 01",
    title: "Discovery & Strategy",
    description: "Understand users, goals and constraints before committing to a build.",
    tags: [
      { label: "Stakeholder interviews" },
      { label: "Goals definition", highlight: true },
      { label: "Scope & roadmap" },
    ],
  },
  {
    duration: "PHASE 02",
    title: "Architecture & Design",
    description: "Design the data model, system architecture and key user flows.",
    tags: [
      { label: "System architecture", highlight: true },
      { label: "Data modelling" },
      { label: "UX flows & UI" },
    ],
  },
  {
    duration: "PHASE 03",
    title: "Build & Iterate",
    description: "Ship working software in short cycles with continuous review.",
    tags: [
      { label: "Weekly demos", highlight: true },
      { label: "Automated testing" },
      { label: "Code review" },
    ],
  },
  {
    duration: "PHASE 04",
    title: "Launch & Scale",
    description: "Harden, release and keep improving with real usage data.",
    tags: [
      { label: "Security review" },
      { label: "Monitoring", highlight: true },
      { label: "Ongoing support" },
    ],
  },
];

export const whyChoose: { title: string; description: string }[] = [
  {
    title: "Product thinking, not just code",
    description:
      "We question scope, prioritise outcomes and design for the people who will actually use the software.",
  },
  {
    title: "AI that ships safely",
    description:
      "We have built LLM features with structured outputs, approval steps and kill switches, not demos.",
  },
  {
    title: "Full-stack ownership",
    description:
      "One accountable team from data model to UI, deployment and integrations.",
  },
  {
    title: "Built for real traffic",
    description:
      "Concurrency, queues, retries and tenant isolation are designed in from the start.",
  },
  {
    title: "Transparent collaboration",
    description:
      "Frequent demos, direct access to engineers and plain-English communication.",
  },
  {
    title: "International delivery",
    description:
      "Experience delivering multilingual, payment-enabled platforms for clients in several markets.",
  },
];

/** Verifiable engineering facts from delivered work. Do not add numbers you cannot substantiate. */
export const impactHighlights: { value: string; label: string; source: string }[] = [
  {
    value: "Thousands",
    label: "of simultaneous booking requests handled during timed releases",
    source: "Kultur Tonight",
  },
  {
    value: "Millions",
    label: "of records searchable with sub-second latency",
    source: "wyszukaj dane",
  },
  {
    value: "3 languages",
    label: "served with real-time translation (EN / DE / FR)",
    source: "Kultur Tonight",
  },
  {
    value: "600,000+",
    label: "lines of enterprise code maintained and extended",
    source: "Enterprise client work",
  },
];

export const industries: { name: string; description: string }[] = [
  { name: "Healthcare & Wellness", description: "Genetic testing, patient journeys and recommendation engines." },
  { name: "B2B Sales & Marketing", description: "AI lead scoring, outreach and CRM automation." },
  { name: "HR & Recruitment", description: "Resume parsing, scorecards and candidate ranking." },
  { name: "E-commerce & Retail", description: "Real-time storefronts and flexible payments." },
  { name: "Events & Ticketing", description: "High-concurrency booking and multilingual experiences." },
  { name: "Real Estate & Hospitality", description: "Listings, availability and reservation engines." },
  { name: "Data & Information Services", description: "Large datasets, fast search and paid access." },
  { name: "Education & Professional Networks", description: "Role-based communities and mentorship platforms." },
];

/**
 * Only add genuine, approved client testimonials here.
 * The homepage shows a clearly marked placeholder while this list is empty.
 */
export const testimonials: Testimonial[] = [];

export const homeFaqs: FAQ[] = [
  {
    question: "What kinds of projects does DevFlowX take on?",
    answer:
      "SaaS products, web applications, AI and LLM integrations, process automation, backend and API development, and custom software. If you are unsure which fits, book a consultation and we will help you scope it.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "It depends on scope. After a short discovery we give you a phased plan with a realistic timeline, and you see working software throughout rather than only at the end.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Every project is different. Use the quote form with your goals and budget range and we will respond with a scoped proposal.",
  },
  {
    question: "Do you work with international clients and time zones?",
    answer:
      "Yes. We work remotely and have delivered for clients in Europe and the Middle East, with overlap for UAE, KSA and Qatar time zones.",
  },
  {
    question: "Can you add AI to an existing product?",
    answer:
      "Often, yes. We start with one focused, high-value feature, integrate it safely and measure it before expanding.",
  },
  {
    question: "What happens after launch?",
    answer:
      "We offer ongoing support and iteration so the product keeps improving with real usage.",
  },
];

export const aboutValues: { title: string; description: string }[] = [
  { title: "Outcome-driven", description: "Every feature must serve a measurable business or user goal." },
  { title: "User-first", description: "Clarity, speed and accessibility come before cleverness." },
  { title: "Lean and honest", description: "Right-sized tech, clear trade-offs and no inflated promises." },
  { title: "Safe by design", description: "Security, reliability and human oversight are built in, not bolted on." },
];

export const expertise: { area: string; items: string[] }[] = [
  { area: "AI & LLM", items: ["OpenAI", "OpenRouter", "DeepSeek", "RAG", "Structured outputs", "AI agents", "Vapi voice"] },
  { area: "Front end", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "React Native"] },
  { area: "Back end", items: ["Node.js", "Express", "Nest.js", "REST & webhooks", "BullMQ", "Socket.io"] },
  { area: "Data & infra", items: ["PostgreSQL", "MongoDB", "Prisma", "Redis", "Docker", "AWS S3", "Cloudflare R2"] },
];

export const homeProcessSteps: ProcessStep[] = processPhases.map((p) => ({
  title: p.title,
  description: p.description,
}));
