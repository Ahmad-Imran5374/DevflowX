"use client";

import { useEffect } from "react";

/** Counts one visit per browser session. Renders nothing. */
export function VisitTracker() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem("dfx_visit")) return;
      sessionStorage.setItem("dfx_visit", "1");

      let vid = localStorage.getItem("dfx_vid");
      if (!vid) {
        vid = crypto.randomUUID();
        localStorage.setItem("dfx_vid", vid);
      }
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vid }),
        keepalive: true,
      }).catch(() => {});
    } catch {
      /* storage blocked: skip tracking */
    }
  }, []);

  return null;
}
