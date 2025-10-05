'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { clsx } from 'clsx';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: 'section' | 'div' | 'article';
  contained?: boolean;
  paddingY?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  background?: 'white' | 'muted' | 'primary' | 'accent';
  children: React.ReactNode;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({
    as: Component = 'section',
    contained = true,
    paddingY = 'lg',
    background = 'white',
    className,
    children,
    ...props
  }, ref) => {
    const backgrounds = {
      white: 'bg-white',
      muted: 'bg-surface-100',
      primary: 'bg-brand text-white',
      accent: 'bg-accent text-neutral-900',
    };

    const paddings = {
      none: '',
      sm: 'py-8',
      md: 'py-12',
      lg: 'py-16 md:py-20',
      xl: 'py-20 md:py-28',
    };

    return (
      <Component
        ref={ref as any}
        className={clsx(backgrounds[background], paddings[paddingY], className)}
        {...props}
      >
        {contained ? (
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            {children}
          </div>
        ) : (
          children
        )}
      </Component>
    );
  }
);

Section.displayName = 'Section';
