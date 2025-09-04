import Link from "next/link";

export default function TextLink(
  { href, children, subtle, prominent }:
  { href: string; children: React.ReactNode; subtle?: boolean; prominent?: boolean }
) {
  return (
    <Link
      href={href}
      className={
        prominent ? "text-brand-600 underline hover:text-brand-700" :
        subtle ? "text-ink-700 hover:underline" :
        "text-blue-700 hover:underline"
      }
    >
      {children}
    </Link>
  );
}
