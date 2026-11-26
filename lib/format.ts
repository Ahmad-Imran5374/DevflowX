/** Deterministic date formatting (UTC) so server and client output always match. */
export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" }).format(new Date(iso));
}
