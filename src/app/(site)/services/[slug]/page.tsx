import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageLayout } from '@/presentation/web-ui/layouts/PageLayout';
import { ServiceDetailTemplate } from '@/presentation/web-ui/templates/ServiceDetailTemplate';
import type { Service } from '@/domain/entities/Service';
import type { ToneKey } from '@/shared/tone';
import { getCachedServiceBySlug } from '@/application/cached/CacheService';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600; // Revalidar cada hora

// Generar metadata dinámica
export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const service = await getCachedServiceBySlug(slug) as Service & { tone?: ToneKey };

    if (!service) {
      return {
        title: 'Servicio no encontrado',
        description: 'El servicio que buscas no está disponible.',
      };
    }

    return {
      title: `${service.title} | Servicios | Cooperativa`,
      description: service.summary || `Conoce todo sobre nuestro servicio de ${service.title}. Soluciones del sector solidario diseñadas para tu bienestar financiero.`,
      keywords: [service.title, 'cooperativa', 'servicios financieros', 'sector solidario', ...(service.tags || [])],
      openGraph: {
        title: service.title,
        description: service.summary || '',
        images: service.heroImage?.url ? [{
          url: service.heroImage.url,
          alt: service.heroImage.alt || service.title,
          width: 1200,
          height: 630,
        }] : [],
        type: 'website',
        siteName: 'Cooperativa',
      },
      twitter: {
        card: 'summary_large_image',
        title: service.title,
        description: service.summary,
        images: service.heroImage?.url ? [service.heroImage.url] : [],
      },
    };
  } catch (error) {
    return {
      title: 'Servicio no encontrado',
    };
  }
}

// Generar rutas estáticas para ISR
export async function generateStaticParams() {
  try {
    const { getCachedServices } = await import('@/application/cached/CacheService');
    const services = await getCachedServices();

    return services.map((service) => ({
      slug: service.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function ServicioDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getCachedServiceBySlug(slug) as Service & { tone?: ToneKey };

  if (!service) {
    notFound();
  }

  return (
    <PageLayout
      hero={{
        title: service.title,
        subtitle: 'Nuestros servicios',
        description: service.summary,
        tone: service.tone || 'green',
        align: 'left',

      }}
      breadcrumbs={[
        { label: 'Servicios', href: '/services' },
        { label: service.title },
      ]}
    >
      <ServiceDetailTemplate service={service} />
    </PageLayout>
  );
}
