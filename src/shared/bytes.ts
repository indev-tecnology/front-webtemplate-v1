// src/shared/bytes.ts
export const fmtMB = (n?: number) => n ? `${(n/1048576).toFixed(2)} MB` : "";
