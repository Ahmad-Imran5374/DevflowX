import type { BlogPost } from "@/types";

/** Starter articles written for DevFlowX. Review and edit before publishing. */
export const posts: BlogPost[] = [
  {
    slug: "scope-an-mvp-without-overbuilding",
    title: "How to scope an MVP without overbuilding",
    excerpt:
      "A practical way to decide what goes into version one, what waits, and how to keep the first release genuinely useful.",
    category: "Product",
    date: "2026-11-10",
    readingMinutes: 5,
    author: "DevFlowX Team",
    sections: [
      {
        paragraphs: [
          "Most MVPs fail not because they were too small, but because they were unfocused. A good first release answers one question: will a specific user pay for, or consistently use, this solution to a specific problem?",
        ],
      },
      {
        heading: "Start from the job, not the feature list",
        paragraphs: [
          "Write down the single job your user is trying to get done. Every feature should be traceable to that job. If you cannot explain how a feature helps the user complete it, it is a candidate for version two.",
        ],
      },
      {
        heading: "A simple filter for every feature",
        paragraphs: ["Ask these questions about each item on the backlog:"],
        list: [
          "Does the core journey break without it?",
          "Can we deliver the same value manually for the first customers?",
          "Will it change what we learn from early users?",
          "Is it expensive to retrofit later, such as tenancy, permissions or billing?",
        ],
      },
      {
        heading: "Build the expensive-to-change parts properly",
        paragraphs: [
          "Cut features aggressively, but be careful with foundations. Data models, authentication and tenant isolation are costly to rewrite. Everything else — dashboards, settings, polish — can be iterative.",
        ],
      },
      {
        heading: "Ship, measure, repeat",
        paragraphs: [
          "Release to a small group early, instrument the core journey and let real behaviour set the roadmap. A short feedback loop beats a long specification every time.",
        ],
      },
    ],
  },
  {
    slug: "human-in-the-loop-ai-automation",
    title: "Human-in-the-loop AI: designing automation you can trust",
    excerpt:
      "Why approvals, kill switches and structured outputs matter when you let language models take real actions.",
    category: "AI",
    date: "2026-11-14",
    readingMinutes: 6,
    author: "DevFlowX Team",
    sections: [
      {
        paragraphs: [
          "Language models are excellent at reasoning over messy information, but they can also be confidently wrong. When a model's output triggers real actions — sending an email, updating a record, making a call — the cost of a mistake rises sharply.",
        ],
      },
      {
        heading: "Make outputs structured",
        paragraphs: [
          "Ask the model for JSON that conforms to a schema, validate it on your side and reject anything that does not fit. Free-form text should never be what your system acts on directly.",
        ],
      },
      {
        heading: "Add approval where the stakes are high",
        paragraphs: [
          "Not every action needs a human. Low-risk steps can run automatically, while high-impact ones queue for approval. Over time, as you gain confidence from reviewed decisions, you can widen what is automatic.",
        ],
      },
      {
        heading: "Always have a kill switch",
        paragraphs: [
          "Automation will occasionally misbehave. A clear, tested way to pause every AI-driven action at the tenant or system level turns a potential incident into a minor inconvenience.",
        ],
      },
      {
        heading: "Log everything",
        paragraphs: [
          "Store the inputs, model, prompt version, output and the decision taken. Audit trails make debugging, evaluation and customer trust possible.",
        ],
      },
    ],
  },
  {
    slug: "multi-tenant-saas-data-isolation",
    title: "Multi-tenant SaaS: keeping customer data isolated",
    excerpt:
      "The main approaches to tenant isolation in PostgreSQL, and how to enforce it in your application layer.",
    category: "Engineering",
    date: "2026-11-18",
    readingMinutes: 6,
    author: "DevFlowX Team",
    sections: [
      {
        paragraphs: [
          "In a multi-tenant SaaS product, many customers share the same application. The most important guarantee you make is simple: one customer must never see another's data.",
        ],
      },
      {
        heading: "Three common approaches",
        paragraphs: ["Each has trade-offs between isolation, cost and operational complexity:"],
        list: [
          "Shared tables with a tenant identifier column: simplest and cheapest, relies on disciplined enforcement.",
          "Schema per tenant: stronger separation, more migration overhead.",
          "Database per tenant: strongest isolation, highest cost and complexity.",
        ],
      },
      {
        heading: "Enforce it in one place",
        paragraphs: [
          "Whatever model you choose, do not rely on every developer remembering a filter. Centralise tenant scoping in your data-access layer so queries are scoped by default, and add automated tests that attempt cross-tenant access.",
        ],
      },
      {
        heading: "Consider database-level guards",
        paragraphs: [
          "PostgreSQL row-level security can act as a second line of defence, so a missed filter in application code does not become a data leak.",
        ],
      },
    ],
  },
  {
    slug: "reliable-background-jobs-queues-and-retries",
    title: "Reliable background jobs: queues, retries and idempotency",
    excerpt:
      "How to move slow or flaky work out of the request cycle and make it safe to retry.",
    category: "Engineering",
    date: "2026-11-22",
    readingMinutes: 5,
    author: "DevFlowX Team",
    sections: [
      {
        paragraphs: [
          "API calls to LLMs, email providers or payment gateways can be slow or fail intermittently. Running them inside a web request makes your application feel unreliable. A job queue gives you a better model.",
        ],
      },
      {
        heading: "Queue the work",
        paragraphs: [
          "Accept the request, store the intent, return quickly and let a worker process the job. Queues such as BullMQ on Redis provide delays, concurrency control and visibility into job state.",
        ],
      },
      {
        heading: "Retry with backoff",
        paragraphs: [
          "Transient failures are normal. Retry with exponential backoff, cap the number of attempts and move permanently failing jobs to a dead-letter state you can inspect.",
        ],
      },
      {
        heading: "Make jobs idempotent",
        paragraphs: [
          "A retried job must not charge a customer twice or send the same email twice. Use idempotency keys and check state before acting, so running a job again is always safe.",
        ],
      },
    ],
  },
];

export const blogCategories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];
export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
export const sortedPosts = () => [...posts].sort((a, b) => b.date.localeCompare(a.date));
