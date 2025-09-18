import clientPromise from "./client";
export async function db() { return (await clientPromise).db(); }
export async function col(name: string) { return (await db()).collection(name); }
export const COL = {
  NAV: "navigation",
  FOOTER: "footer",
  ANNS: "announcements",
  EVENTS: "events",
  ATTS: "attachments",
  SERVICES: "services",
  AGREEMENTS: "agreements",
  FEATURES: "features",
  RECS: "recommendations",
  PAGES: "pages",
} as const;
