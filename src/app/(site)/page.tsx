import { HeroSlider, type HeroSlide } from '@/presentation/web-ui/HeroSlider';
import { Section } from '@/presentation/web-ui/Section';
import { SectionHeader } from '@/presentation/web-ui/SectionHeader';
import { ServicesSection, type Service } from '@/presentation/web-ui/home/ServicesSection';
import { NewsSection, type Announcement, type Event } from '@/presentation/web-ui/home/NewsSection';
import { CTASection } from '@/presentation/web-ui/home/CTASection';
import { StatsSection, type Stat } from '@/presentation/web-ui/home/StatsSection';
// Icon names for client-side mapping (do not import icon components here)
import { homeSections } from '@/config/siteStatic';
import HighlightSlider from '@/presentation/web-ui/shared/HighlightSlider';
import { getCachedAnnouncements, getCachedAnnouncementsActives } from '@/application/cached/CacheAnnouncements';
import { getCachedServicesFeed } from '@/application/cached/CacheService';

// ==================== DATOS MOCK ====================

// Estadísticas
// Use icon names (strings) so they can be serialized from server to client
const stats: Stat[] = [
  { icon: 'Users', value: '25', suffix: 'K+', label: 'Asociados activos' },
  { icon: 'Award', value: '15', suffix: '+', label: 'Años de experiencia' },
  { icon: 'Briefcase', value: '120', suffix: '+', label: 'Convenios vigentes' },
  { icon: 'TrendingUp', value: '$85', suffix: 'M', label: 'Patrimonio administrado' },
];

// Eventos (fieles al domain Event)
const events: Event[] = [
  {
    id: '1',
    slug: 'asamblea-2025',
    title: 'Asamblea General Ordinaria 2025',
    description: 'Participación democrática en las decisiones estratégicas de nuestra cooperativa. Presentación de resultados financieros y proyectos para el próximo año.',
    image: { url: '/images/wcs_default.png', alt: 'Asamblea General' },
    location: 'Auditorio Principal - Sede Bogotá',
    startsAt: new Date('2025-03-15T09:00:00'),
    endsAt: new Date('2025-03-15T14:00:00'),
    tags: ['Institucional'],
  },
  {
    id: '2',
    slug: 'taller-finanzas-personales',
    title: 'Taller: Finanzas Personales para Principiantes',
    description: 'Aprende a administrar tu dinero, crear presupuestos efectivos y planificar tu futuro financiero con expertos del sector.',
    image: { url: '/images/wcs_default.png', alt: 'Taller de finanzas' },
    location: 'Online - Plataforma Zoom',
    startsAt: new Date('2025-03-22T15:00:00'),
    endsAt: new Date('2025-03-22T18:00:00'),
    tags: ['Educación Financiera'],
  },
  {
    id: '3',
    slug: 'feria-servicios',
    title: 'Feria de Servicios Cooperativos',
    description: 'Conoce todos nuestros servicios, convenios y beneficios. Stands informativos, asesorías personalizadas y actividades para toda la familia.',
    image: { url: '/images/wcs_default.png', alt: 'Feria de servicios' },
    location: 'Plaza Central - Centro Comercial Andino',
    startsAt: new Date('2025-04-05T10:00:00'),
    tags: ['Feria'],
  },
  {
    id: '4',
    slug: 'dia-asociado',
    title: 'Día del Asociado - Integración Familiar',
    description: 'Jornada recreativa con actividades deportivas, culturales y lúdicas para asociados y sus familias. Incluye almuerzo y refrigerios.',
    image: { url: '/images/wcs_default.png', alt: 'Día del asociado' },
    location: 'Parque Jaime Duque',
    startsAt: new Date('2025-04-20T08:00:00'),
    endsAt: new Date('2025-04-20T16:00:00'),
    tags: ['Recreación'],
  },
  {
    id: '5',
    slug: 'conferencia-ahorro',
    title: 'Conferencia: El Ahorro como Herramienta de Transformación',
    description: 'Expertos del sector cooperativo compartirán estrategias de ahorro efectivas para familias colombianas.',
    location: 'Auditorio - Sede Principal',
    startsAt: new Date('2025-10-25T10:00:00'),
    endsAt: new Date('2025-10-28T12:00:00'),
    tags: ['Educación'],
  },
];

// Comunicados (fieles al domain Announcement)
const announcements: Announcement[] = [
  {
    slug: 'nuevas-tasas-vivienda',
    title: 'Nuevas tasas de interés para créditos de vivienda',
    description: 'A partir del 1 de marzo, contaremos con tasas aún más competitivas para créditos de vivienda, con plazos de hasta 20 años.',
    image: { url: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?q=80&w=1546', alt: 'Créditos de vivienda' },
    tags: ['Créditos'],
    pinned: true,
    priority: 10,
    publishedAt: new Date('2025-02-28'),
    createdAt: new Date('2025-02-28'),
  },
  {
    slug: 'asamblea-2025',
    title: 'Convocatoria Asamblea General Ordinaria 2025',
    description: 'Convocamos a todos nuestros asociados a la Asamblea General que se realizará el 15 de marzo en nuestro auditorio principal.',
    image: { url: '/images/wcs_default.png', alt: 'Asamblea' },
    tags: ['Institucional'],
    publishedAt: new Date('2025-02-25'),
    createdAt: new Date('2025-02-25'),
  },
  {
    slug: 'taller-finanzas',
    title: 'Jornada de educación financiera gratuita',
    description: 'Inscríbete en nuestro taller "Finanzas personales para alcanzar tus metas" totalmente gratuito para asociados.',
    image: { url: '/images/wcs_default.png', alt: 'Educación financiera' },
    tags: ['Educación'],
    publishedAt: new Date('2025-02-20'),
    createdAt: new Date('2025-02-20'),
  },
  {
    slug: 'sarlaft-actualizacion',
    title: 'Actualización de normativas SARLAFT',
    description: 'Conoce las nuevas disposiciones y procedimientos para el Sistema de Administración de Riesgo de Lavado de Activos.',
    tags: ['Institucional'],
    publishedAt: new Date('2025-02-18'),
    createdAt: new Date('2025-02-18'),
  },
  {
    slug: 'beneficios-asociados',
    title: 'Nuevos beneficios para asociados activos',
    description: 'Descuentos exclusivos en comercios aliados, acceso a líneas de crédito preferenciales y más ventajas para ti.',
    tags: ['Beneficios'],
    publishedAt: new Date('2025-02-15'),
    createdAt: new Date('2025-02-15'),
  },
];

// Fetch announcements on the server and render the page as a Server Component
async function fetchAnnouncementsActives(): Promise<HeroSlide[]> {
  const res = await getCachedAnnouncementsActives(5);
  const mapper = res.map((a) => ({
    title: a.title,
    subtitle: a.tags && a.tags.length > 0 ? a.tags[0] : undefined,
    description: a.description || '',
    image: a.image?.url || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1740',
    ctaLabel: a.cta?.label || 'Leer más',
    ctaHref: a.cta?.href || `/post/${a.slug}`,
    ctaVariant: 'secondary' as const,
  }));
  return mapper;
}

async function fetchServices(): Promise<Service[]> {
  const res = await getCachedServicesFeed(3);
  return res.map((s) => ({
    id: s.id,
    slug: s.slug,
    name: s.title,
    summary: s.summary,
    icon: s.heroImage,
    tone: s.tone || 'muted',
    highlights: s.tags,
  }));
}

async function fetchAnnouncements(): Promise<Announcement[]> {
  const res = await getCachedAnnouncements(5);
  return res;
}

// ==================== COMPONENTE PRINCIPAL (Server Component) ====================

export default async function Home() {
  const heroSlides = await fetchAnnouncementsActives();
  const announcements = await fetchAnnouncements();
  const services = await fetchServices();
  return (
    <>
      {/* Contenido principal */}
      <main>
        {/* Hero */}
        <HeroSlider slides={heroSlides} autoPlayInterval={7000} />

        {/* Estadísticas */}
        <Section paddingY="lg" background="muted">
          <StatsSection stats={stats} />
        </Section>

        {/* Servicios */}
        <Section paddingY="xl" background="white" id="servicios" aria-label="Nuestros servicios">
          <SectionHeader
            subtitle={homeSections.services.subtitle}
            title={homeSections.services.title}
            description={homeSections.services.description}
            align={homeSections.services.align as 'left' | 'center' | undefined}
            className="mb-12"
          />
          <ServicesSection services={services} viewAllHref="/servicios" maxVisible={3} />
        </Section>

        {/*Flayer home */}
        <HighlightSlider slides={[
          {
            title: 'Nueva forma de pago',
            description: 'Ahora puedes realizar tus pagos a través de PSE de manera rápida y segura.',
            image: '/images/flayers/home_flayer_pse.png',
            cta: {
              label: 'Conoce más',
              href: '/blog/nueva-forma-de-pago-pse',
            },
            badge: 'Transaccional',
            tone: 'blue', // Rojo solidario
          }
        ]}/>
        {/* Novedades - 2 Columnas: Comunicados + Eventos */}
        {/* Novedades - Bento Grid + Sidebar Compacto */}
        <Section paddingY="xl" background="white" id="novedades" aria-label="Novedades y actividades">
          <NewsSection
            announcements={announcements}
            events={events}
            viewAllAnnouncementsHref="/comunicados"
            viewAllEventsHref="/eventos"
          />
        </Section>

        {/* CTA - Llamado a la acción */}
        <Section paddingY="lg" background="white" id="vinculacion" aria-label="Únete a nosotros">
          <CTASection
            title="¿Listo para ser parte de nuestra familia?"
            description="Únete a miles de colombianos que ya confían en nosotros para construir su futuro financiero. El proceso es rápido, fácil y 100% digital."
            primaryCTA={{
              label: 'Vincúlate ahora',
              href: '/vinculacion',
            }}
            secondaryCTA={{
              label: 'Conocer requisitos',
              href: '/vinculacion/requisitos',
            }}
          />
        </Section>
      </main>
    </>
  );
}
