"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2, TriangleAlert } from "lucide-react";
import { Select } from "@/components/ui/Select";
import { budgetOptions, validateContact, type ContactInput, type FieldErrors } from "@/lib/validation";

type Status = "idle" | "loading" | "success" | "error";

const fieldCls =
  "mt-2 w-full rounded-xl border border-white/10 bg-navy-950/60 px-4 py-3 text-white placeholder:text-slate-500 transition-colors focus:border-brand-electric focus:outline-none aria-[invalid=true]:border-red-400";

export function ContactForm({ services }: { services: { slug: string; title: string }[] }) {
  const params = useSearchParams();
  const preset = services.find((s) => s.slug === params.get("service"))?.title ?? "";
  const intent = params.get("intent");
  const serviceOptions = [...services.map((x) => x.title), "Not sure yet"];

  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors<ContactInput>>({});
  const [formError, setFormError] = useState("");
  // Timestamp used for basic bot detection (instant submissions are rejected server-side).
  const startedAt = useRef(0);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const input: ContactInput = {
      name: data.name ?? "",
      email: data.email ?? "",
      company: data.company ?? "",
      service: data.service ?? "",
      budget: data.budget ?? "",
      message: data.message ?? "",
    };
    const found = validateContact(input);
    setErrors(found);
    setFormError("");
    if (Object.keys(found).length > 0) {
      form.querySelector<HTMLElement>("[aria-invalid=true]")?.focus();
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...input, website: data.website ?? "", startedAt: startedAt.current }),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        fieldErrors?: FieldErrors<ContactInput>;
      };
      if (res.ok && json.ok) {
        setStatus("success");
        form.reset();
        return;
      }
      if (json.fieldErrors) setErrors(json.fieldErrors);
      setFormError(json.error ?? "Something went wrong. Please try again.");
      setStatus("error");
    } catch {
      setFormError("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="surface rounded-3xl p-10 text-center">
        <CheckCircle2 aria-hidden className="mx-auto size-12 text-emerald-400" />
        <h2 className="mt-5 font-display text-3xl text-white">Thank you, we&apos;ve got your message</h2>
        <p className="mx-auto mt-3 max-w-md text-muted">
          Our team will reach out to you within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 text-sm text-brand-electric underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  const err = (k: keyof ContactInput) => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${k}-error` : undefined,
  });
  const fieldError = (k: keyof ContactInput) =>
    errors[k] ? (
      <p id={`${k}-error`} className="mt-1.5 text-sm text-red-400">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className="surface space-y-5 rounded-3xl p-6 sm:p-9" aria-busy={status === "loading"}>
      {intent === "consultation" && (
        <p className="rounded-xl bg-brand-electric/10 px-4 py-3 text-sm text-brand-electric">
          Request a consultation: tell us a little about your project and we will arrange a call.
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-slate-200">
            Name <span aria-hidden>*</span>
          </label>
          <input id="name" name="name" autoComplete="name" required className={fieldCls} {...err("name")} />
          {fieldError("name")}
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-slate-200">
            Email <span aria-hidden>*</span>
          </label>
          <input id="email" name="email" type="email" autoComplete="email" required className={fieldCls} {...err("email")} />
          {fieldError("email")}
        </div>
      </div>

      <div>
        <label htmlFor="company" className="text-sm font-medium text-slate-200">
          Company <span className="text-slate-500">(optional)</span>
        </label>
        <input id="company" name="company" autoComplete="organization" className={fieldCls} {...err("company")} />
        {fieldError("company")}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="service" className="text-sm font-medium text-slate-200">
            Service <span aria-hidden>*</span>
          </label>
          <Select
            id="service"
            name="service"
            options={serviceOptions}
            placeholder="Select a service"
            defaultValue={preset}
            invalid={Boolean(errors.service)}
            describedBy={errors.service ? "service-error" : undefined}
          />
          {fieldError("service")}
        </div>
        <div>
          <label htmlFor="budget" className="text-sm font-medium text-slate-200">
            Budget <span aria-hidden>*</span>
          </label>
          <Select
            id="budget"
            name="budget"
            options={budgetOptions}
            placeholder="Select a range"
            invalid={Boolean(errors.budget)}
            describedBy={errors.budget ? "budget-error" : undefined}
          />
          {fieldError("budget")}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-slate-200">
          Project description <span aria-hidden>*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          placeholder="What are you building, and what does success look like?"
          className={fieldCls}
          {...err("message")}
        />
        {fieldError("message")}
      </div>

      {/* Honeypot: hidden from people and assistive tech, bots tend to fill it. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div aria-live="polite">
        {status === "error" && (
          <p role="alert" className="flex items-start gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-300">
            <TriangleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
            {formError}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-brand-gradient inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-7 font-medium text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? (
          <>
            <Loader2 aria-hidden className="size-4 animate-spin" /> Sending…
          </>
        ) : (
          "Send inquiry"
        )}
      </button>
    </form>
  );
}
