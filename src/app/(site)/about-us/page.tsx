// app/(site)/nosotros/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getCachedAbout } from '@/application/cached/CacheAbout';
import { AboutHero } from '@/presentation/web-ui/about/AboutHero';
import { MissionVisionValues } from '@/presentation/web-ui/about/MissionVisionValues';
import { Timeline } from '@/presentation/web-ui/about/Timeline';
import { AboutStats } from '@/presentation/web-ui/about/AboutStats';
import { WhyChooseUs } from '@/presentation/web-ui/about/WhyChooseUs';
import { TeamGrid } from '@/presentation/web-ui/about/TeamGrid';
import { Section } from '@/presentation/web-ui/Section';
import { BlockRenderer } from '@/presentation/web-ui/content/BlockRenderer';
import { siteMeta } from '@/config/siteStatic';

// Revalidación cada 24 horas (contenido singleton de baja frecuencia)
export const revalidate = 86400;

/**
 * Metadata dinámica para SEO
 */
export async function generateMetadata(): Promise<Metadata> {
  const about = await getCachedAbout();

  if (!about) {
    return {
      title: 'Nosotros | ' + siteMeta.brandName,
      description: 'Conoce más sobre nuestra cooperativa',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = about.seo?.title || `Nosotros | ${siteMeta.brandName}`;
  const description = about.seo?.description || about.hero.description;
  const ogImage = about.seo?.ogImage?.url || about.hero.image?.url || siteMeta.ogImage;

  return {
    title,
    description,

    keywords: [
      siteMeta.brandName,
      'cooperativa',
      'nosotros',
      'misión',
      'visión',
      'valores',
      'historia',
      'equipo',
    ].join(', '),

    openGraph: {
      type: 'website',
      locale: siteMeta.locale,
      url: `${siteMeta.url}/nosotros`,
      siteName: siteMeta.brandName,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },

    alternates: {
      canonical: `${siteMeta.url}/nosotros`,
    },
  };
}

/**
 * Página About Us - Server Component
 */
export default async function AboutPage() {
  const about = await getCachedAbout();

  if (!about) {
    notFound();
  }

  return (
    <main>
      {/* Hero */}
      <AboutHero hero={about.hero} />

      {/* Estadísticas destacadas */}
      {about.stats && about.stats.length > 0 && (
        <AboutStats stats={about.stats} />
      )}

      {/* Introducción */}
      {about.introduction && (
        <Section paddingY="xl" background="white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              {about.introduction.title}
            </h2>
            <div className="prose prose-lg mx-auto text-neutral-700 leading-relaxed">
              {typeof about.introduction.content === 'string' ? (
                <p>{about.introduction.content}</p>
              ) : (
                <BlockRenderer blocks={about.introduction.content} />
              )}
            </div>
          </div>
        </Section>
      )}

      {/* Misión, Visión, Valores */}
      <MissionVisionValues data={about.missionVisionValues} />

      {/* Historia (Timeline) */}
      {about.history && about.history.milestones.length > 0 && (
        <Timeline history={about.history} />
      )}

      {/* Por qué elegirnos */}
      {about.whyChooseUs && about.whyChooseUs.reasons.length > 0 && (
        <WhyChooseUs data={about.whyChooseUs} />
      )}

      {/* Equipo Directivo */}
      {about.team && about.team.members.length > 0 && (
        <Section paddingY="xl" background="muted">
          <TeamGrid
            title={about.team.title}
            description={about.team.description}
            members={about.team.members}
          />
        </Section>
      )}

      {/* Certificaciones (opcional) */}
      {about.certifications && about.certifications.items.length > 0 && (
        <Section paddingY="lg" background="white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              {about.certifications.title}
            </h2>
            {about.certifications.description && (
              <p className="text-neutral-600 text-lg mb-8">
                {about.certifications.description}
              </p>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {about.certifications.items.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-white p-6 rounded-xl border border-neutral-200 hover:shadow-md transition-shadow"
                >
                  {cert.logo && (
                    <img
                      src={cert.logo.url}
                      alt={cert.logo.alt || cert.name}
                      className="w-full h-20 object-contain mb-3"
                    />
                  )}
                  <h3 className="font-semibold text-sm text-neutral-900 mb-1">
                    {cert.name}
                  </h3>
                  <p className="text-xs text-neutral-600">{cert.issuer}</p>
                  {cert.year && (
                    <p className="text-xs text-neutral-500 mt-1">{cert.year}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}
    </main>
  );
}
