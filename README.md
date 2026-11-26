# DevFlowX website

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Resend.

## Setup

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

Environment variables are documented in `.env.example`. `RESEND_API_KEY` and `CONTACT_TO_EMAIL` are server-only and power the contact and newsletter forms.

## Where to edit content

| What | File |
| --- | --- |
| Services (pages, FAQs, related projects) | `data/services.ts` |
| Portfolio and case studies | `data/projects.ts` |
| Testimonials, FAQs, process, industries, impact facts | `data/content.ts` |
| Blog articles | `data/blog.ts` |
| Booking URL, contact email, socials | `.env.local` / `lib/site.ts` |
| Project screenshots | add to `public/images/projects/` and set `image` in `data/projects.ts` |

Items marked `[Placeholder]` are intentionally visible until real content is supplied.

## Structure

`app/` routes · `components/{layout,sections,ui,forms}` · `data/` content · `lib/` helpers (site config, validation, spam protection, email) · `types/` shared types.
