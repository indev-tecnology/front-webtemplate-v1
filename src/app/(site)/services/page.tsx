import Image from "next/image";
import { SectionHeader } from "@/presentation/components/ui/SectionHeader";
import { Card } from "@/presentation/components/ui/Card";
import TextLink from "@/presentation/components/ui/TextLink";
import { getCachedServices } from "@/application/cached";

export const metadata = { title: "Servicios" };

export const revalidate = 86400;

export default async function Services(){
  const services = await getCachedServices();
  return (
    <div className="mx-auto max-w-6xl p-6 space-y-8">
      <SectionHeader title="Servicios" description="Soluciones diseñadas para impacto y escala." align="center" />
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s:any)=>(
          <Card key={s.id}>
            {s.icon?.url && (
              <Card.Media className="pb-0">
                <Image src={s.icon.url} alt={s.icon.alt||s.name} width={64} height={64} className="h-12 w-12" />
              </Card.Media>
            )}
            <Card.Header title={s.name} />
            <Card.Body>
              {s.description && <p className="text-sm text-gray-600">{s.description}</p>}
              {s.highlights?.length ? (
                <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 space-y-1">
                  {s.highlights.slice(0,4).map((h:string,i:number)=><li key={i}>{h}</li>)}
                </ul>
              ) : null}
              {s.subservices?.length ? (
                <div className="mt-2 space-y-1">
                  <div className="text-xs text-gray-500 font-medium">Subservicios</div>
                  <ul className="space-y-1 text-sm">
                    {s.subservices.map((ss:any,i:number)=>(
                      <li key={i}>
                        <span className="font-medium">{ss.name}</span>
                        {ss.links?.length ? <span className="text-gray-500"> · {ss.links.map((l:any)=>l.label).join(" · ")}</span> : null}
                      </li>
                    ))}
                  </ul>
                </div>
              ):null}
            </Card.Body>
            <Card.Footer>
              <TextLink href={`/services/${s.slug}`} prominent>Ver detalle</TextLink>
            </Card.Footer>
          </Card>
        ))}
      </section>
    </div>
  );
}
