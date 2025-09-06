"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Navigation, NavItem } from "@/domain/entities/Navigation";
import { cn } from "@/shared/cn";

function isExternal(href: string) {
  return /^(https?:)?\/\//.test(href);
}

function Brand() {
  const [logoFailed, setLogoFailed] = useState(false);
  const logoSrc = process.env.NEXT_PUBLIC_APP_LOGO || "/images/web-logo.png";
  const webTitle = process.env.NEXT_PUBLIC_APP_NAME || "Wexperts Tecnology";
  return (
    <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight text-ink-900">
      {!logoFailed ? (
        <Image
          src={logoSrc}
          alt="Cointramin"
          width={120}
          height={32}
          className="h-7 w-auto object-contain"
          priority={false}
          onError={() => setLogoFailed(true)}
        />
      ) : (
        <>
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-brand-200 text-brand-700">C</span>
          <span className="hidden sm:inline">{webTitle}</span>
        </>
      )}
      <span className="sr-only">Inicio</span>
    </Link>
  );
}

function CaretDown({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={cn("h-4 w-4", className)} aria-hidden="true">
      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08z" clipRule="evenodd" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return open ? (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ) : (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  );
}

function DesktopItem({ item, active }: { item: NavItem; active: boolean }) {
  const hasChildren = !!item.children?.length;

  return (
    <li className="relative group">
      {hasChildren ? (
        <button
          type="button"
          className={cn(
            "group inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40",
            active ? "text-brand-700 bg-brand-50" : "text-ink-700 hover:text-ink-900 hover:bg-gray-50"
          )}
          aria-haspopup="menu"
          aria-expanded={false}
        >
          {item.label}
          <CaretDown className="text-ink-500 group-hover:text-ink-700" />
          <span
            aria-hidden
            className={cn(
              "pointer-events-none absolute left-2 right-2 -bottom-1 h-0.5 rounded-full bg-brand-500 transition-all",
              active ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
            )}
          />
        </button>
      ) : (
        <Link
          href={item.href}
          className={cn(
            "group relative inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40",
            active ? "text-brand-700 bg-brand-50" : "text-ink-700 hover:text-ink-900 hover:bg-gray-50"
          )}
          aria-current={active ? "page" : undefined}
        >
          {item.label}
          <span
            aria-hidden
            className={cn(
              "pointer-events-none absolute left-2 right-2 -bottom-1 h-0.5 rounded-full bg-brand-500 transition-all",
              active ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
            )}
          />
        </Link>
      )}

      {hasChildren && (
        <div className="invisible absolute left-0 top-full z-40 min-w-[14rem] translate-y-2 rounded-xl bg-white/90 dark:bg-slate-900/90 p-1 opacity-0 shadow-lg ring-1 ring-black/5 backdrop-blur transition-all duration-150 group-hover:visible group-hover:translate-y-1 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-1 group-focus-within:opacity-100">
          <ul className="py-1">
            {item.children!.map((c) => (
              <li key={c.href}>
                <NavLink item={c} className="block rounded-md px-3 py-2 text-sm text-ink-700 hover:bg-gray-50 dark:hover:bg-slate-800/60 hover:text-ink-900" />
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

function NavLink({ item, className }: { item: NavItem; className?: string }) {
  const external = isExternal(item.href);
  const base = (
    <span className="inline-flex items-center gap-2">
      {item.label}
      {external && (
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 opacity-70" aria-hidden="true">
          <path d="M14.5 2a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0V5.41l-5.3 5.3a1 1 0 0 1-1.4-1.42l5.3-5.3H13.5V3a1 1 0 0 1 1-1z" />
          <path d="M4 5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-3a1 1 0 1 0-2 0v3H4V7h3a1 1 0 1 0 0-2H4z" />
        </svg>
      )}
    </span>
  );

  if (external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
        {base}
      </a>
    );
  }
  return (
    <Link href={item.href} className={className}>
      {base}
    </Link>
  );
}

function DesktopSearch() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) {
      const id = window.setTimeout(() => inputRef.current?.focus(), 50);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onClick);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative flex items-center">
      <button
        type="button"
        aria-label="Buscar"
        aria-controls="desktop-search"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex items-center justify-center rounded-md border border-token-border p-2 text-ink-700",
          "hover:bg-gray-50 dark:hover:bg-slate-800/60"
        )}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      </button>
      <form
        id="desktop-search"
        role="search"
        aria-label="Buscar"
        className={cn(
          "ml-2 overflow-hidden rounded-md border border-token-border bg-surface text-sm",
          "transition-all duration-200 ease-out",
          open ? "w-56 opacity-100 shadow-sm" : "w-0 opacity-0 pointer-events-none"
        )}
        onSubmit={(e) => {
          if (!open) e.preventDefault();
        }}
      >
        <input
          ref={inputRef}
          type="search"
          placeholder="Buscar..."
          className="w-full bg-transparent px-3 py-1.5 text-ink-900 placeholder:text-ink-500 outline-none"
        />
      </form>
    </div>
  );
}

export function Navbar({ data, searchSlot }: { data: Navigation; searchSlot?: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = useMemo(() => data?.items ?? [], [data]);

  const isActive = (href: string, withPrefix = false) => {
    if (!href) return false;
    if (withPrefix) return pathname?.startsWith(href) ?? false;
    return pathname === href;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-token-border bg-surface/80 backdrop-blur">
      <div className="container grid h-16 grid-cols-[auto_1fr_auto] items-center gap-3">
        {/* Left: Brand */}
        <div className="flex items-center">
          <Brand />
        </div>

        {/* Center: Desktop navigation (centered) */}
        <nav aria-label="Primary" className="hidden lg:block justify-self-center">
          <ul className="flex items-center gap-3 lg:gap-4">
            {items.map((it) => (
              <DesktopItem key={it.href} item={it} active={isActive(it.href, true)} />
            ))}
          </ul>
        </nav>

        {/* Right: Search + Mobile toggle */}
        <div className="flex items-center gap-2 justify-self-end">
          {/* Desktop search: icon that expands input on click */}
          <div className="hidden lg:flex items-center">
            {searchSlot ? (
              searchSlot
            ) : (
              <DesktopSearch />
            )}
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label="Abrir menú"
            aria-controls="mobile-menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-md border border-token-border p-2 text-ink-700 hover:bg-gray-50 dark:hover:bg-slate-800/60 focus-visible:outline-none lg:hidden"
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        className={cn(
          "lg:hidden border-t border-token-border bg-surface transition-[max-height,opacity] duration-200 ease-out",
          open ? "max-h-[80vh] opacity-100" : "max-h-0 overflow-hidden opacity-0"
        )}
      >
        {/* Mobile search area */}
        <div className="container py-3">
          {searchSlot ? (
            <div>{searchSlot}</div>
          ) : (
            <form role="search" aria-label="Buscar" className="flex items-center gap-2 rounded-md border border-token-border px-2 py-1.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 text-ink-600" aria-hidden>
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
              <input
                type="search"
                name="q"
                placeholder="Buscar..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-ink-500"
              />
            </form>
          )}
        </div>
        <ul className="container flex flex-col gap-1 pb-3">
          {items.map((it, idx) => {
            const hasChildren = !!it.children?.length;
            const expanded = openIndex === idx;
            const activeTop = isActive(it.href, true);
            return (
              <li key={it.href} className="">
                <div className="flex items-center">
                  <NavLink
                    item={it}
                    className={cn(
                      "flex-1 rounded-md px-3 py-2 text-sm font-medium",
                      activeTop ? "text-brand-600" : "text-ink-700 hover:bg-gray-50 dark:hover:bg-slate-800/60 hover:text-ink-900"
                    )}
                  />
                  {hasChildren && (
                    <button
                      type="button"
                      aria-label={expanded ? "Cerrar submenú" : "Abrir submenú"}
                      aria-expanded={expanded}
                      onClick={() => setOpenIndex(expanded ? null : idx)}
                      className="ml-1 inline-flex h-8 w-8 items-center justify-center rounded-md text-ink-600 hover:bg-gray-50 dark:hover:bg-slate-800/60"
                    >
                      <CaretDown className={cn("transition", expanded ? "rotate-180" : "rotate-0")} />
                    </button>
                  )}
                </div>

                {hasChildren && (
                  <ul
                    className={cn(
                      "mt-1 grid overflow-hidden rounded-lg border border-token-border bg-surface/60 transition-[grid-template-rows,opacity]",
                      expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <li className="min-h-0">
                      <ul className="space-y-1 p-2">
                        {it.children!.map((c) => (
                          <li key={c.href}>
                            <NavLink
                              item={c}
                              className={cn(
                                "block rounded-md px-3 py-2 text-sm text-ink-700 hover:bg-gray-50 dark:hover:bg-slate-800/60 hover:text-ink-900",
                                isActive(c.href) && "text-brand-600"
                              )}
                            />
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
