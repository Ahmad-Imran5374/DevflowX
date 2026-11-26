import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Container } from "@/components/ui/Container";

export function Newsletter() {
  return (
    <section aria-labelledby="newsletter-title" className="pb-24 sm:pb-32">
      <Container className="flex flex-col items-start justify-between gap-8 border-t border-line pt-16 lg:flex-row lg:items-center">
        <div className="max-w-lg">
          <h2 id="newsletter-title" className="font-display text-3xl font-medium text-white">
            Engineering insights, occasionally
          </h2>
          <p className="mt-3 text-muted">
            Practical notes on shipping software, AI and automation. No spam, unsubscribe any time.
          </p>
        </div>
        <NewsletterForm />
      </Container>
    </section>
  );
}
