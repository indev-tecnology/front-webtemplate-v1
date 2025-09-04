import { apiConsumer } from "@/presentation/adapters/apiConsumer";
import TextLink from "@/presentation/components/ui/TextLink";
import {HeroSlider, HeroSlide} from "@/presentation/components/ui/Hero";
import {Section} from "@/presentation/components/ui/SectionPage";
import { Announcement } from "@/domain/entities/Announcement";
import Gallery from "@/presentation/components/ui/Gallery";
import {MosaicCards, MosaicItem} from "@/presentation/components/ui/CardMosaic";

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


async function dataHero(data:any[]): Promise<HeroSlide[]> {
  return data.map( a => ({
    title: a.title,
    description: a.description,
    image: a.image?.url || '/images/wcs_default.png',
    cta: a.cta || null,
    badge: a.tags[0] || null,
    tone: a.tone || 'indigo',
  }));
}

async function dataCards(data:any[]): Promise<MosaicItem[]> {
  return data.map( a => ({
    id: a.id,
    title: a.title,
    description: a.description,
    imageUrl: a.image?.url || '/images/wcs_default.png',
    href: a.cta.href || null,
    ctaLabel: a.cta.label || 'Más información',
    badge: a.tags[0] || null,
    tone: a.tone || 'brand',
  }));
}

async function dataEvents() {
  return (await apiConsumer.events()).map((e:any) => ({
    id: e.id,
    title: e.title,
    description: e.description,
    date: e.eventDate,
    imageCover: e.image || null,
    imageAlt: e.image?.alt || e.title,
    href: `/events/${e.slug}`,
  }));
}

async function onlyDataPage() {

}

export default async function Home() {
  const announcements: Announcement[] = await apiConsumer.announcements();
  const items: HeroSlide[] = await dataHero(announcements);
  const cards = await dataCards(announcements);
  const events = await dataEvents();
  return (
     <div className="flex flex-col">
      <Section id="sectionHero" ariaLabel="Sección de bienvenida" tone="muted">
        <HeroSlider slides={items}/>
      </Section>
      <Section id="sectionCards" ariaLabel="Sección de tarjetas informativas">
        <MosaicCards items={cards} columns={3} aspect="landscape" />
      </Section>
      {/* Información clave */}
      <Section id="sectionInfoClave" ariaLabel="Sección de información clave">
        <InfoClave />
      </Section>
    </div>
  );
}
