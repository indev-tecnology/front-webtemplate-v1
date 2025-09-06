import { apiConsumer } from "@/presentation/adapters/apiConsumer";
import TextLink from "@/presentation/components/ui/TextLink";
import {HeroSlider, SlideData} from "@/presentation/components/ui/Hero";
import {Section, SectionHeader} from "@/presentation/components/ui/SectionPage";
import { Announcement } from "@/domain/entities/Announcement";
import Gallery from "@/presentation/components/ui/Gallery";
import MosaicCards, {NewsItem, SectionData} from "@/presentation/components/ui/CardMosaic";
import EventsPanel from "@/presentation/components/ui/EventsPanel";
import FeatureLinks from "@/presentation/components/ui/FeaturesLinks";
import type { Event } from "@/domain/entities/Event";

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


async function dataHero(data:any[]): Promise<SlideData[]> {
  return data.map( a => ({
    title: a.title,
    description: a.description,
    image: a.image?.url || '/images/wcs_default.png',
    cta: a.cta || null,
    badge: a.tags[0] || null,
    tone: a.tone,
  }));
}

async function dataFeatures() {
  return (await apiConsumer.features()).map((e:any) => ({
    label: e.label,
    cta: e.cta || '#',
    image: e.image || '/images/wcs_default.png',
    brand: e.brand || 'gray',
  }));
};

async function dataNews(data:any[]): Promise<NewsItem[]> {
  return data.map( a => ({
    id: a.id,
    title: a.title,
    description: a.description,
    imageUrl: a.image?.url || '/images/wcs_default.png',
    href: a.cta?.href || null,
    ctaLabel: a.cta?.label || 'Más información',
    badge: a.tags[0] || null,
    tone: a.tone || 'brand',
    publishedAt: a.publishedAt ? new Date(a.publishedAt) : undefined,
  }));
}

async function dataEvents(data: any[]): Promise<NewsItem[]> {
  return data.map((e: any) => ({
    id: e.id,
    title: e.title,
    description: e.description,
    imageUrl: e.image?.url || '/images/wcs_default.png',
    startsAt: e.startsAt ? new Date(e.startsAt) : undefined,
    href: e.slug ? `/eventos/${e.slug}` : undefined,
    badge: e.location || undefined,
  }));
}

export default async function Home() {
  const announcements: Announcement[] = await apiConsumer.announcements({ limit: 5, latest: true });
  const items: SlideData[] = await dataHero(announcements);
  const features = await dataFeatures();
  const cards: NewsItem[] = await dataNews(announcements);
  const eventsRaw: any[] = await apiConsumer.events({ limit: 10, latest: true });
  const eventsItems: NewsItem[] = await dataEvents(eventsRaw);
  return (
     <div className="flex flex-col">
      <Section id="sectionHero" ariaLabel="Sección de bienvenida" pad="xl" tone="green">
        <HeroSlider slides={items}/>
      </Section>
      <Section id="sectionEvents" ariaLabel="Sección sobre features" container={false} width="wide">
        <FeatureLinks items={features} tonePrimary="sun"/>
      </Section>
      <Section id="sectionCards" ariaLabel="Sección de noticias y eventos" pad="standard">
        <SectionHeader title="Novedades y eventos" key={"seccion-novedades"}/>
        <hr />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <MosaicCards
              title="Últimas novedades"
              ctaLabel="Ver más"
              ctaHref="/noticias"
              tone="warm"
              items={cards}
            />
          </div>
          <div className="lg:col-span-1">
            <EventsPanel
              title="Próximos eventos"
              ctaLabel="Ver todos"
              ctaHref="/eventos"
              tone="teal"
              badgeTone="sun"
              items={eventsItems}
            />
          </div>
        </div>
      </Section>
      {/* Información clave */}
      <Section id="sectionInfoClave" ariaLabel="Sección de información clave">
        <InfoClave />
      </Section>
    </div>
  );
}
