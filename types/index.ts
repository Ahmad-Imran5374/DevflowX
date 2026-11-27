export type FAQ = { question: string; answer: string };

export type ServiceIconName =
  | "layers"
  | "app-window"
  | "brain-circuit"
  | "workflow"
  | "server"
  | "code-xml";

export type ProcessStep = { title: string; description: string };

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  seoDescription: string;
  icon: ServiceIconName;
  problems: string[];
  deliverables: string[];
  technologies: string[];
  process: ProcessStep[];
  faqs: FAQ[];
  /** Slugs of related projects in data/projects.ts */
  projectSlugs: string[];
};

export type ProjectCategory =
  | "SaaS"
  | "AI & LLM"
  | "Web Applications"
  | "E-commerce"
  | "Healthcare";

export type CaseStudy = {
  challenge: string;
  solution: string;
  implementation: string[];
  /** Factual outcomes. Only add measured results you can stand behind. */
  results: string[];
  /** Shown as a visible placeholder until real, measured results are added. */
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  summary: string;
  highlights: string[];
  technologies: string[];
  serviceSlugs: string[];
  featured?: boolean;
  /** Public, staging or dev URLs, where available. */
  links?: { href: string; label: string }[];
  /** Path under /public, e.g. "/images/projects/codexa.png". Falls back to generated artwork. */
  image?: string;
  /** Used for the generated artwork when no screenshot exists. */
  accent: "blue" | "violet" | "indigo" | "cyan";
  status?: string;
  caseStudy?: CaseStudy;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO
  readingMinutes: number;
  author: string;
  sections: { heading?: string; paragraphs: string[]; list?: string[] }[];
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};
