'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { clsx } from 'clsx';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => {
  return (
    <nav aria-label="Breadcrumb" className={clsx('py-4', className)}>
      <ol className="flex items-center gap-2 text-sm">
        {/* Home link */}
        <li>
          <Link
            href="/"
            className="text-neutral-600 hover:text-brand-600 transition-colors flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-brand-500 rounded px-1"
          >
            <Home size={16} />
            <span className="sr-only md:not-sr-only">Inicio</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-2">
              <ChevronRight size={16} className="text-neutral-400" aria-hidden="true" />
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-neutral-600 hover:text-brand-600 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 rounded px-1"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={clsx(
                    isLast ? 'text-neutral-900 font-medium' : 'text-neutral-600'
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
