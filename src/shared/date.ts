// src/shared/date.ts
export const fmtCo = (d?: string | Date) =>
  d ? new Date(d).toLocaleDateString("es-CO", { timeZone: "UTC" }) : "";
