// src/presentation/components/ui/Button.tsx
import Link from "next/link";
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type BaseProps = {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "light";
  size?: "sm" | "md" | "lg" | "icon";
  full?: boolean;
  loading?: boolean;
  className?: string;
  href?: string;
};

const base =
  "inline-flex items-center justify-center rounded-lg font-medium transition disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none";
const sizes = {
  sm: "h-9 px-3 text-sm gap-2",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-5 text-base gap-2",
  icon: "h-10 w-10"
};
const variants = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-700 shadow-sm",
  secondary:
    "bg-surface-50 text-ink-900 hover:bg-white border border-gray-200 shadow-sm",
  ghost:
    "bg-transparent text-ink-900 hover:bg-surface-50",
  light:
    "bg-white text-ink-900 border border-gray-200 hover:shadow-sm",
  danger:
    "bg-danger-600 text-white hover:opacity-90"
};

function Spinner() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 animate-spin">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity=".25" />
      <path d="M22 12a10 10 0 0 0-10-10" fill="currentColor" />
    </svg>
  );
}

export function Button(props: BaseProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  const { variant="primary", size="md", full, loading, className, children, ...rest } = props;
  return (
    <button
      {...rest}
      aria-busy={loading || undefined}
      className={clsx(base, sizes[size], variants[variant], full && "w-full", className)}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
}

export function ButtonLink(props: BaseProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { variant="primary", size="md", full, loading, className, href="", children, ...rest } = props;
  return (
    <Link
      href={href}
      aria-busy={loading || undefined}
      className={clsx(base, sizes[size], variants[variant], full && "w-full", className)}
      {...rest}
    >
      {loading && <Spinner />}
      {children}
    </Link>
  );
}
