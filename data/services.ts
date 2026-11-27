import type { ProcessStep, Service } from "@/types";

const standardProcess = (build: string): ProcessStep[] => [
  {
    title: "Discovery",
    description:
      "We align on goals, users and constraints, then agree what success looks like before any code is written.",
  },
  {
    title: "Architecture & design",
    description:
      "Data model, system architecture and key user flows are designed and reviewed with you.",
  },
  {
    title: "Build",
    description: build,
  },
  {
    title: "Launch & hardening",
    description:
      "Testing, security review, monitoring and a controlled release so go-live is uneventful.",
  },
  {
    title: "Support & iteration",
    description:
      "We stay on to fix, measure and improve, guided by real usage rather than assumptions.",
  },
];

export const services: Service[] = [
  {
    slug: "saas-development",
    title: "SaaS Development",
    shortTitle: "SaaS",
    summary:
      "Multi-tenant, subscription-ready products designed to scale from first customer to thousands.",
    seoDescription:
      "SaaS development: multi-tenant architecture, billing, onboarding and admin tooling built by DevFlowX for startups and growing businesses.",
    icon: "layers",
    problems: [
      "An idea that needs to become a reliable, billable product quickly.",
      "An MVP that can't safely serve more than a handful of customers.",
      "Tenant data isolation, roles and permissions that were bolted on too late.",
      "Billing, onboarding and admin workflows that eat engineering time.",
    ],
    deliverables: [
      "Multi-tenant architecture with tenant-isolated data",
      "Authentication, roles and permissions",
      "Subscription billing and payment integrations",
      "Customer dashboards and admin tooling",
      "Background job pipelines with retries",
      "Documentation and a clean hand-off",
    ],
    technologies: ["TypeScript", "Next.js", "Node.js", "PostgreSQL", "Prisma", "Redis", "BullMQ", "Stripe"],
    process: standardProcess(
      "Iterative delivery in short cycles with working software you can review at every step.",
    ),
    faqs: [
      {
        question: "Can you take an existing MVP and make it production-ready?",
        answer:
          "Yes. We start with a technical review of the codebase, data model and infrastructure, then agree a prioritised plan covering security, reliability and scalability.",
      },
      {
        question: "How do you handle multiple customers on one platform?",
        answer:
          "We design tenant isolation into the data model and every query path from day one, so one customer can never see another's data.",
      },
      {
        question: "Which payment providers do you work with?",
        answer:
          "We have integrated Stripe and Lemon Squeezy, including webhook handling for reliable payment events.",
      },
    ],
    projectSlugs: ["codexa", "smarthire", "genetic-wellness-platform"],
  },
  {
    slug: "web-application-development",
    title: "Web Application Development",
    shortTitle: "Web Apps",
    summary:
      "Fast, accessible, SEO-friendly web applications — from customer portals to high-traffic platforms.",
    seoDescription:
      "Web application development with Next.js, React and Node.js: performant, accessible and built to handle real traffic. By DevFlowX.",
    icon: "app-window",
    problems: [
      "A slow or fragile web app that frustrates users and hurts conversion.",
      "High-traffic moments, such as timed releases, that overwhelm the system.",
      "Content that needs real-time updates or multiple languages.",
      "Search over large, complex datasets that must feel instant.",
    ],
    deliverables: [
      "Responsive, accessible front end",
      "Server-side rendering for SEO where it matters",
      "Real-time features (live orders, inventory, availability)",
      "Internationalisation and localisation",
      "Search, filtering and reporting",
      "Deployment, SSL and monitoring",
    ],
    technologies: ["Next.js", "React", "Tailwind CSS", "Node.js", "Socket.io", "PostgreSQL", "MongoDB", "i18next"],
    process: standardProcess(
      "Component-driven front end paired with a tested API, shipped incrementally behind review.",
    ),
    faqs: [
      {
        question: "Do you build multilingual applications?",
        answer:
          "Yes. We have delivered English/German/French and Polish experiences, including real-time translation and full localisation.",
      },
      {
        question: "Can you handle traffic spikes?",
        answer:
          "We design booking and checkout paths for concurrency up front, and load-test critical flows before launch.",
      },
      {
        question: "Will the site be SEO-friendly?",
        answer:
          "Yes. We use server rendering, semantic markup, structured metadata and performance budgets as standard.",
      },
    ],
    projectSlugs: ["kultur-tonight", "wyszukaj-dane", "zavaro", "dzbnb"],
  },
  {
    slug: "ai-integration-llm-development",
    title: "AI Integration & LLM Development",
    shortTitle: "AI & LLM",
    summary:
      "Practical, safe AI features — from document parsing to decision engines and chat assistants — wired into your product.",
    seoDescription:
      "AI integration and LLM development: structured outputs, RAG, AI agents and human-in-the-loop automation by DevFlowX.",
    icon: "brain-circuit",
    problems: [
      "Manual, repetitive work that language models can do reliably with oversight.",
      "AI prototypes that never make it into a real product.",
      "Unstructured documents (PDFs, resumes, emails) that need to become clean data.",
      "Worry about runaway automation, cost or unsafe outputs.",
    ],
    deliverables: [
      "LLM integration with structured (JSON) outputs",
      "Document parsing and extraction pipelines",
      "Retrieval-augmented generation (RAG) over your data",
      "Conversational assistants with context",
      "Human-in-the-loop approvals and kill-switch controls",
      "Queued AI jobs with retries and cost controls",
    ],
    technologies: ["OpenAI API", "OpenRouter", "DeepSeek", "RAG", "Vector databases", "Vapi", "TypeScript", "BullMQ"],
    process: standardProcess(
      "Prompt, evaluation and integration work in tight loops, with guardrails and review steps built in.",
    ),
    faqs: [
      {
        question: "Which models and providers do you work with?",
        answer:
          "We have built with OpenAI, DeepSeek and OpenRouter, and design integrations so the model can be swapped as the landscape changes.",
      },
      {
        question: "How do you keep AI automation safe?",
        answer:
          "We use human-in-the-loop approvals, kill switches, structured outputs and audit trails so automation stays controllable.",
      },
      {
        question: "Can AI be added to our existing product?",
        answer:
          "Usually, yes. We scope a narrow, high-value feature first, integrate it behind a flag and measure it before expanding.",
      },
    ],
    projectSlugs: ["codexa", "smarthire", "ai-coach-chatbot"],
  },
  {
    slug: "business-process-automation",
    title: "Business Process Automation",
    shortTitle: "Automation",
    summary:
      "Replace manual hand-offs with reliable workflows across your CRM, payments, email and internal tools.",
    seoDescription:
      "Business process automation: CRM workflows, webhooks, background jobs and integrations that remove manual work. By DevFlowX.",
    icon: "workflow",
    problems: [
      "Teams copying data between tools by hand.",
      "Follow-ups and notifications that depend on someone remembering.",
      "Disconnected systems with no single source of truth.",
      "Automations that break silently and nobody notices.",
    ],
    deliverables: [
      "Workflow mapping and automation plan",
      "CRM integrations and automated engagement flows",
      "Webhook and event-driven pipelines",
      "Scheduled and queued background jobs",
      "Error handling, alerts and retries",
      "Runbooks so your team can operate it",
    ],
    technologies: ["GoHighLevel", "Webhooks", "Node.js", "Redis", "BullMQ", "Stripe", "Calendly", "Smartlead"],
    process: standardProcess(
      "Workflows are automated one at a time, each verified against real data before the next.",
    ),
    faqs: [
      {
        question: "Which tools can you integrate?",
        answer:
          "We have worked with GoHighLevel, Stripe, Calendly, Apollo, Smartlead and Unipile, and routinely build against third-party REST APIs and webhooks.",
      },
      {
        question: "What happens when an automation fails?",
        answer:
          "Jobs are queued with retries and alerting, so failures are visible and recoverable rather than silent.",
      },
      {
        question: "Where should we start?",
        answer:
          "With the single most repetitive, highest-volume workflow. We map it, automate it, measure it and then expand.",
      },
    ],
    projectSlugs: ["genetic-wellness-platform", "codexa"],
  },
  {
    slug: "backend-api-development",
    title: "Backend & API Development",
    shortTitle: "Backend & APIs",
    summary:
      "Secure, well-structured backends and APIs that other systems and front ends can depend on.",
    seoDescription:
      "Backend and API development with Node.js, TypeScript, PostgreSQL and Prisma: secure REST APIs, webhooks and background jobs by DevFlowX.",
    icon: "server",
    problems: [
      "A tangled backend that slows every new feature.",
      "Slow queries and endpoints as data grows.",
      "Third-party integrations that are brittle or insecure.",
      "No clear separation of concerns, making testing painful.",
    ],
    deliverables: [
      "Layered REST API design and implementation",
      "Relational data modelling and migrations",
      "Authentication and authorisation (JWT, OAuth)",
      "Webhook consumers and third-party integrations",
      "Query and performance optimisation",
      "API documentation and tests",
    ],
    technologies: ["Node.js", "Express", "Nest.js", "TypeScript", "PostgreSQL", "MySQL", "Prisma", "Redis", "Docker"],
    process: standardProcess(
      "API-first delivery: contracts agreed up front, then implemented, tested and documented endpoint by endpoint.",
    ),
    faqs: [
      {
        question: "Which backend frameworks do you use?",
        answer:
          "Primarily Node.js with Express or Nest.js in TypeScript, with PostgreSQL/MySQL and Prisma or Sequelize.",
      },
      {
        question: "Can you improve an existing API's performance?",
        answer:
          "Yes. We profile, fix the slow queries and hot paths, and add the indexing and caching that the data actually needs.",
      },
      {
        question: "How is API security handled?",
        answer:
          "Authentication, authorisation, input validation, rate limiting and secret management are part of the baseline, not an add-on.",
      },
    ],
    projectSlugs: ["codexa", "genetic-wellness-platform", "dzbnb", "sudduth-reality"],
  },
  {
    slug: "custom-software-development",
    title: "Custom Software Development",
    shortTitle: "Custom Software",
    summary:
      "Tailor-made platforms for the problems off-the-shelf tools can't solve.",
    seoDescription:
      "Custom software development: bespoke platforms, marketplaces and internal tools built around your workflow by DevFlowX.",
    icon: "code-xml",
    problems: [
      "Off-the-shelf tools that don't fit how your business actually works.",
      "Spreadsheets and email threads acting as critical systems.",
      "A unique idea that needs a bespoke data model and workflow.",
      "Legacy applications that need to be extended safely.",
    ],
    deliverables: [
      "Requirements and domain modelling",
      "Bespoke web platforms and internal tools",
      "Marketplaces, booking and listing platforms",
      "Role-based access for different user types",
      "Integration with your existing systems",
      "Maintainable, documented code",
    ],
    technologies: ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "MongoDB", "AWS S3", "Docker"],
    process: standardProcess(
      "Close collaboration with your team, reviewing working builds frequently so the product converges on the real need.",
    ),
    faqs: [
      {
        question: "Can you work inside a large existing codebase?",
        answer:
          "Yes. Our engineers have maintained and extended enterprise codebases of 600,000+ lines across several industries.",
      },
      {
        question: "How do you price custom projects?",
        answer:
          "After discovery we provide a scoped proposal. Share your goals through the quote form and we will respond with next steps.",
      },
      {
        question: "Who owns the code?",
        answer:
          "Ownership terms are agreed in the contract before work begins.",
      },
    ],
    projectSlugs: ["dzbnb", "sudduth-reality", "dentment", "kultur-tonight"],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
