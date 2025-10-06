import type { Metadata } from 'next';
import { Breadcrumbs, type BreadcrumbItem } from '../page-sections/Breadcrumbs';
import { PageHero, type PageHeroProps } from '../page-sections/PageHero';

export interface PageLayoutProps {
  children: React.ReactNode;
  hero?: PageHeroProps;
  breadcrumbs?: BreadcrumbItem[];
  showBreadcrumbs?: boolean;
}

/**
 * PageLayout - Layout estándar para páginas internas
 *
 * Características:
 * - Hero configurable con tono temático
 * - Breadcrumbs opcionales
 * - Container responsive centrado
 * - Padding vertical consistente
 *
 * Uso:
 * ```tsx
 * <PageLayout
 *   hero={{ title: "Servicios", subtitle: "Nuestros servicios", tone: "green" }}
 *   breadcrumbs={[{ label: "Servicios" }]}
 * >
 *   {children}
 * </PageLayout>
 * ```
 */
export const PageLayout = ({
  children,
  hero,
  breadcrumbs,
  showBreadcrumbs = true,
}: PageLayoutProps) => {
  return (
    <>
      {/* Hero Section */}
      {hero && <PageHero {...hero} />}

      {/* Breadcrumbs */}
      {showBreadcrumbs && breadcrumbs && (
        <div className="bg-surface-100 border-b border-neutral-200">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          {children}
        </div>
      </main>
    </>
  );
};
