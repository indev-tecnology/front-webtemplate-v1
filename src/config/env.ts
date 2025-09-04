import { z } from "zod";
const Env = z.object({
  MONGODB_URI: z.string().url(),
  NEXT_PUBLIC_BASE_URL: z.string().url(),
  REVALIDATE_SECRET: z.string().optional(),
  NEXT_REVALIDATE_SECONDS: z.coerce.number().int().positive().default(60),
});
export const env = Env.parse({
  MONGODB_URI: process.env.MONGODB_URI,
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  REVALIDATE_SECRET: process.env.REVALIDATE_SECRET,
  NEXT_REVALIDATE_SECONDS: process.env.NEXT_REVALIDATE_SECONDS,
});
