import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageLayout } from '@/presentation/web-ui/layouts/PageLayout';
import { ServiceDetailTemplate } from '@/presentation/web-ui/templates/ServiceDetailTemplate';
import type { Service } from '@/domain/entities/Service';
import type { ToneKey } from '@/shared/tone';
import { getCachedServiceBySlug } from '@/application/cached';

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
      title: `${service.name} | Servicios | Cooperativa`,
      description: service.description || `Conoce todo sobre nuestro servicio de ${service.name}. Soluciones del sector solidario diseñadas para tu bienestar financiero.`,
      keywords: [service.name, 'cooperativa', 'servicios financieros', 'sector solidario', ...(service.highlights || [])],
      openGraph: {
        title: service.name,
        description: service.description || '',
        images: service.icon?.url ? [{
          url: service.icon.url,
          alt: service.icon.alt || service.name,
          width: 1200,
          height: 630,
        }] : [],
        type: 'website',
        siteName: 'Cooperativa',
      },
      twitter: {
        card: 'summary_large_image',
        title: service.name,
        description: service.description,
        images: service.icon?.url ? [service.icon.url] : [],
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
    const { getCachedServices } = await import('@/application/cached');
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
        title: service.name,
        subtitle: 'Nuestros servicios',
        description: service.description,
        tone: service.tone || 'green',
        align: 'left',

      }}
      breadcrumbs={[
        { label: 'Servicios', href: '/services' },
        { label: service.name },
      ]}
    >
      <ServiceDetailTemplate service={service} />
    </PageLayout>
  );
}
