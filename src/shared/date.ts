// src/shared/date.ts
export const fmtCo = (d?: string | Date) =>
  d ? new Date(d).toLocaleDateString("es-CO", { timeZone: "UTC" }) : "";

export function toDate(value: any): Date {
  if (!value) return new Date(0);
  if (value instanceof Date) return value;
  // Handle Mongo Extended JSON like { $date: "..."} or plain object with $date
  if (typeof value === 'object' && ('$date' in value || 'date' in value)) {
    const d = (value as any).$date ?? (value as any).date;
    return new Date(d);
  }
  // Fallback for string/number
  return new Date(value);
}
