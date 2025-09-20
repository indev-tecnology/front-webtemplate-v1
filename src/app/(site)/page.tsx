import { apiConsumer } from "@/presentation/adapters/apiConsumer";
import {Section} from "@/presentation/components/ui/SectionPage";
import { Announcement } from "@/domain/entities/Announcement";
import {TimeLine, TimeLineSchema} from "@/presentation/components/ui/TimeLine";
import HeroFull, {HeroFullSlide} from "@/presentation/components/ui/HeroFull";
import FeaturesLinks, {FeaturesLinksProps} from "@/presentation/components/ui/FeaturesLinks";
import { SectionHeader } from "@/presentation/components/ui/SectionHeader";
import { Recommendation } from "@/domain/entities/Recommendation";
import { TipsMosaic } from "@/presentation/components/ui/TipsMosaic";
import ContactCard from "@/presentation/components/ui/ContactCard";
import type { EventItem } from "@/presentation/components/ui/EventsMosaic";
import EventsSplitView from "@/presentation/components/ui/EventsSplitView";
import { PillarsCompact, type PillarItem } from "@/presentation/components/ui/PillarsCompact";
import { Target, Lightbulb, Users } from "lucide-react";
import { pillarsConfig, homeCopy, contactInfo, type IconKey } from "@/config/siteStatic";
// Información clave
function InfoClave() {
  return (
    <section>
      <div className="mx-auto max-w-6xl grid gap-8 sm:grid-cols-3 text-center">
        <div>
          <h3 className="text-2xl font-bold text-blue-700">+10 años</h3>
          <p className="text-sm text-gray-600">de experiencia</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-blue-700">50+</h3>
          <p className="text-sm text-gray-600">convenios vigentes</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-blue-700">1000+</h3>
          <p className="text-sm text-gray-600">clientes satisfechos</p>
        </div>
      </div>
    </section>
  );
}

//
async function dataHero(data:any[]): Promise<HeroFullSlide[]> {
  return data.map( a => ({
    title: a.title,
    description: a.description,
    image: a.image?.url || '/images/wcs_default.png',
    cta: a.cta || null,
    badge: a.tags[0] || null,
    tone:  a.tone || 'brand',
  }));
}

async function fetchRecomendations(): Promise<TimeLineSchema[]> {
  const recsRaw: Recommendation[] = await apiConsumer.recommendations({ limit: 4 });
  const recs: TimeLineSchema[] = recsRaw.map(r => ({
    image: r.image?.url || '/images/wcs_default.png',
    title: r.title,
    description: r.description || '',
    cta: r.cta ? { label: r.cta.label, href: r.cta.href } : undefined,
    brand: r.badge || undefined,
    tone: r.tone as TimeLineSchema['tone'] || undefined,
  }));
  return recs;
}

export default async function Home() {
  const announcements: Announcement[] = await apiConsumer.announcements({ limit: 5, latest: true });
  const heroSlides: HeroFullSlide[] = await dataHero(announcements);
  const featuresLinks = await apiConsumer.features(); 
  const eventsRaw: any[] = await apiConsumer.events({ limit: 10, latest: true });
  const eventsItems: EventItem[] = (eventsRaw || []).map((e: any) => ({
    image: e?.image?.url || '/images/wcs_default.png',
    title: e?.title ?? '',
    description: e?.description ?? '',
    date: e?.startsAt,
    endDate: e?.endsAt,
    location: e?.location,
    // cta opcional: activa si tienes página de detalle
    // cta: { label: 'Ver detalles', href: `/eventos/${e.slug || e.id}` },
    published: true,
    featured: false,
  }));
  const itemsRecomendations: TimeLineSchema[] = await fetchRecomendations();
  // Mapeo de iconos desde claves declaradas en la config estática
  const iconMap: Record<IconKey, React.ElementType<{ className?: string }>> = {
    target: Target,
    lightbulb: Lightbulb,
    users: Users,
  };
  const pillars: PillarItem[] = pillarsConfig.map((it) => ({
    title: it.title,
    description: it.description,
    tone: it.tone,
    href: it.href,
    icon: it.iconKey ? iconMap[it.iconKey] : undefined,
  }));
  return (
     <div className="flex flex-col">
      
      <Section id="sectionHero" ariaLabel="Sección de bienvenida" pad="xl">
        <HeroFull slides={heroSlides}></HeroFull>
        {/* <HeroSlider slides={items}/> */}
      </Section>
      <Section id="sectionPillars" ariaLabel="Misión y visión" pad="standard" tone="none">
        <SectionHeader
          className="mb-6"
          title={homeCopy.pillars.title}
          description={homeCopy.pillars.description}
          align="center"
          tone="green"
        />
        <PillarsCompact items={pillars} columns={3} tone="green" />
        <FeaturesLinks items={featuresLinks} className="mt-10"/>
      </Section>
      {/* Pilares de identidad: fondo con degradado (brand → surface) */}
      <Section id="sectionTips" ariaLabel="Sección de información de interés" pad="standard" tone="green">
        <SectionHeader title={homeCopy.tips.title} description={homeCopy.tips.description} badge={homeCopy.tips.badge} />
        <TipsMosaic
          items={itemsRecomendations}
          className="mt-10"
        />
      </Section>
      <Section id="sectionEvents" ariaLabel="Eventos y anuncios" pad="standard">
        <SectionHeader title={homeCopy.events.title} tone="sun" className="mb-5"/>
        <EventsSplitView items={eventsItems} maxList={6} />
      </Section>
      <Section id="sectionContact" ariaLabel="Sección de contacto" pad="standard" tone="muted">
        <ContactCard title={homeCopy.contact.title} subtitle={homeCopy.contact.subtitle} tone={homeCopy.contact.tone} email={contactInfo.email} phone={contactInfo.phone} />
      </Section>
    </div>
  );
}
