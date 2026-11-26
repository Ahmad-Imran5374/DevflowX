import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[80svh] flex-col items-start justify-center pt-32">
      <p className="font-display text-7xl font-medium text-gradient">404</p>
      <h1 className="mt-4 font-display text-4xl font-medium text-white">This page could not be found</h1>
      <p className="mt-3 max-w-md text-muted">The page may have moved or never existed. Let&apos;s get you back on track.</p>
      <div className="mt-8 flex gap-3">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/contact" variant="secondary">
          Contact us
        </ButtonLink>
      </div>
    </Container>
  );
}
