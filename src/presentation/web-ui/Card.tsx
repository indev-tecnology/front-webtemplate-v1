import { forwardRef, type HTMLAttributes } from 'react';
import { clsx } from 'clsx';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'elevated' | 'outlined' | 'flat';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'elevated', padding = 'md', className, children, ...props }, ref) => {
    const baseStyles = 'rounded-lg bg-surface-50';

    const variants = {
      elevated: 'shadow-md hover:shadow-lg transition-shadow',
      outlined: 'border-2 border-neutral-200',
      flat: 'bg-surface-100',
    };

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    return (
      <div
        ref={ref}
        className={clsx(baseStyles, variants[variant], paddings[padding], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
