import Image from "next/image";
import { SectionHeader } from "@/presentation/components/ui/SectionHeader";
import { Card } from "@/presentation/components/ui/Card";
import TextLink from "@/presentation/components/ui/TextLink";
import { fmtCo } from "@/shared/date";

async function getAgreements(){
  const r = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/agreements`, { next:{ revalidate:60 }});
  return r.ok ? r.json() : [];
}

export const metadata = { title: "Convenios" };

export default async function Convenios(){
  const items = await getAgreements();
  return (
    <div className="mx-auto max-w-6xl p-6 space-y-8">
      <SectionHeader title="Convenios" description="Alianzas estratégicas que potencian nuestro impacto." align="center" />
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((ag:any)=> {
          const active = !ag.endsAt || new Date(ag.endsAt) > new Date();
          return (
            <Card key={ag.id}>
              {ag.logo?.url && (
                <Card.Media className="flex justify-center">
                  <Image src={ag.logo.url} alt={ag.logo.alt||ag.name} width={120} height={60} className="object-contain h-12" />
                </Card.Media>
              )}
              <Card.Header
                title={ag.name}
                right={
                  <div className="flex gap-2">
                    {ag.category && <Card.Badge>{ag.category}</Card.Badge>}
                    <Card.Badge tone={active ? "success" : "danger"}>{active ? "Activo" : "Finalizado"}</Card.Badge>
                  </div>
                }
              />
              <Card.Body>
                {ag.description && <p className="text-sm text-gray-600">{ag.description}</p>}
                <div className="text-xs text-gray-500">
                  {ag.startsAt && <>Desde {fmtCo(ag.startsAt)}</>}
                  {ag.endsAt && <> · Hasta {fmtCo(ag.endsAt)}</>}
                </div>
              </Card.Body>
              <Card.Footer>
                <TextLink href={`/agreements/${ag.slug}`} prominent>Ver más</TextLink>
              </Card.Footer>
            </Card>
          );
        })}
      </section>
    </div>
  );
}
