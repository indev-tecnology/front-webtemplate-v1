'use client';

import { forwardRef, type ButtonHTMLAttributes, type ReactElement, cloneElement } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  asChild?: boolean;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    asChild = false,
    className,
    children,
    disabled,
    ...props
  }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md';

    const variants = {
      primary: 'bg-gradient-to-br from-brand to-brand-700 text-white hover:from-brand-600 hover:to-brand-800 focus:ring-brand/30',
      secondary: 'bg-gradient-to-br from-accent to-accent-600 text-neutral-900 hover:from-accent-500 hover:to-accent-700 focus:ring-accent/30',
      outline: 'border-2 border-brand text-brand hover:bg-brand/5 hover:border-brand-600 focus:ring-brand/30 shadow-none',
      ghost: 'text-brand hover:bg-brand/10 focus:ring-brand/30 shadow-none',
    };

    const sizes = {
      sm: 'px-4 py-2.5 text-sm gap-1.5',
      md: 'px-6 py-3.5 text-base gap-2',
      lg: 'px-8 py-4 text-lg gap-2.5',
    };

    const classes = clsx(
      baseStyles,
      variants[variant],
      sizes[size],
      fullWidth && 'w-full',
      className
    );

    if (asChild && children) {
      return cloneElement(children as ReactElement, {
        className: classes,
        ...props,
      });
    }

    return (
      <motion.button
        ref={ref}
        whileHover={!disabled ? { scale: 1.02 } : {}}
        whileTap={!disabled ? { scale: 0.98 } : {}}
        className={classes}
        disabled={disabled}
        {...(props as any)}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
