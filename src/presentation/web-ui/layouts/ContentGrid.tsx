import { forwardRef, type HTMLAttributes } from 'react';
import { clsx } from 'clsx';

export interface ContentGridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const ContentGrid = forwardRef<HTMLDivElement, ContentGridProps>(
  ({ columns = 3, gap = 'md', className, children, ...props }, ref) => {
    const gridColumns = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    };

    const gaps = {
      sm: 'gap-4',
      md: 'gap-6',
      lg: 'gap-8',
    };

    return (
      <div
        ref={ref}
        className={clsx('grid', gridColumns[columns], gaps[gap], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ContentGrid.displayName = 'ContentGrid';
