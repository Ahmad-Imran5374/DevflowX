"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { isEmail } from "@/lib/validation";

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const startedAt = useRef(0);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    if (!isEmail(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website: data.get("website") ?? "", startedAt: startedAt.current }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (res.ok && json.ok) {
        setStatus("success");
        setMessage("You're subscribed. Thank you!");
        form.reset();
      } else {
        setStatus("error");
        setMessage(json.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full max-w-md" aria-busy={status === "loading"}>
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex gap-2 rounded-full border border-white/15 bg-navy-950/60 p-1.5 focus-within:border-brand-electric">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          required
          aria-invalid={status === "error" ? true : undefined}
          aria-describedby="newsletter-status"
          className="min-w-0 flex-1 bg-transparent px-4 text-white placeholder:text-slate-500 focus:outline-none"
        />
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <input name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-brand-gradient inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium text-white disabled:opacity-60"
        >
          {status === "loading" ? <Loader2 aria-hidden className="size-4 animate-spin" /> : null}
          Subscribe
        </button>
      </div>
      <p
        id="newsletter-status"
        role={status === "error" ? "alert" : "status"}
        className={`mt-3 min-h-5 pl-4 text-sm ${status === "error" ? "text-red-400" : "text-emerald-400"}`}
      >
        {status === "success" || status === "error" ? message : ""}
      </p>
    </form>
  );
}
