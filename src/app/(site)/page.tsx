import { apiConsumer } from "@/presentation/adapters/apiConsumer";
import {HeroSlider, SlideData} from "@/presentation/components/ui/Hero";
import {Section} from "@/presentation/components/ui/SectionPage";
import { Announcement } from "@/domain/entities/Announcement";
import MosaicCards, {NewsItem, SectionData} from "@/presentation/components/ui/CardMosaic";
import EventsPanel from "@/presentation/components/ui/EventsPanel";
import {TimeLine, TimeLineSchema} from "@/presentation/components/ui/TimeLine";
import { formatRelativeEs } from "@/presentation/components/ui/CardMosaic";
import HeroFull, {HeroFullSlide} from "@/presentation/components/ui/HeroFull";
import FeaturesLinks from "@/presentation/components/ui/FeaturesLinks";
import { SectionHeader } from "@/presentation/components/ui/SectionHeader";
import { Recommendation } from "@/domain/entities/Recommendation";
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

const recommendations:any = [
  {
    image: "/images/tip1.jpg",
    title: "Optimize Your Workflow",
    description: "Learn how to improve your daily productivity with these simple steps.",
    tone: "coral",
    cta: {
      label: "Learn More",
      href: "/tips/workflow"
    }
  },
  {
    image: "/images/tip2.jpg",
    title: "Security Best Practices",
    description: "Keep your application secure with our recommended security measures.",
    tone: "green",
    brand: "SecurityFirst",
    cta: {
      label: "View Guide",
      href: "/security"
    }
  },
  // ... more items
];
async function dataHero(data:any[]): Promise<HeroFullSlide[]> {
  return data.map( a => ({
    title: a.title,
    description: a.description,
    image: a.image?.url || '/images/wcs_default.png',
    cta: a.cta?.label || null,
    badge: a.tags[0] || null,
    tone:  a.tone || 'brand',
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
  const items: HeroFullSlide[] = await dataHero(announcements);
  const features = await dataFeatures();
  const cards: NewsItem[] = await dataNews(announcements);
  const eventsRaw: any[] = await apiConsumer.events({ limit: 10, latest: true });
  const eventsItems: NewsItem[] = await dataEvents(eventsRaw);
  const itemsRecomendations: TimeLineSchema[] = await fetchRecomendations();
  return (
     <div className="flex flex-col">
      
      <Section id="sectionHero" ariaLabel="Sección de bienvenida" pad="xl" tone="muted">
        <HeroFull slides={items}></HeroFull>
        {/* <HeroSlider slides={items}/> */}
      </Section>
      <Section id="sectionEvents" ariaLabel="Sección sobre features" pad="standard" tone="muted">
        <SectionHeader className="mb-5" title="Conoce sobre mas" description="Conoce mas sobre nuestros servicios" align="center" tone="warm"/>
        <FeaturesLinks/>
      </Section>
      <Section id="sectionInfoClave" ariaLabel="Sección de información clave" pad="standard">
        <InfoClave/>
      </Section>
      <Section id="sectionTimeline" ariaLabel="Sección de recomendaciones" pad="standard" tone="teal">
        <SectionHeader title="Para tener en cuenta" tone="teal" className="mb-5"/>
        <TimeLine
          items={itemsRecomendations}
        />
      </Section>
      <hr />
      <Section id="sectionCards" ariaLabel="Sección de noticias y eventos" pad="standard">
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
    </div>
  );
}
