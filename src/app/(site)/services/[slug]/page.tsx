import { SectionHeader } from "@/presentation/components/ui/SectionHeader";
import { Card } from "@/presentation/components/ui/Card";
import { getCachedServiceBySlug } from "@/application/cached";

export const revalidate = 86400;

export async function generateMetadata({ params }:{ params: Promise<{slug:string}> }){
  const { slug } = await params; 
  const s = await getCachedServiceBySlug(slug);
  
  return { title: s?.name || "Servicio" };
}

export default async function ServiceDetail({ params }:{ params: Promise<{slug:string}> }){
  const { slug } = await params; const s = await getCachedServiceBySlug(slug);
  if(!s) return <div className="p-8">Servicio no disponible.</div>;

  return (
    <div className="mx-auto max-w-5xl p-6 space-y-8">
      <SectionHeader title={s.name} description={s.description} />
      {s.subservices?.length ? (
        <Card>
          <Card.Header title="Subservicios" />
          <Card.Body>
            <ul className="grid gap-3 sm:grid-cols-2">
              {s.subservices.map((ss:any,i:number)=>(
                <li key={i} className="rounded-lg border p-4 bg-white">
                  <div className="font-medium">{ss.name}</div>
                  {ss.links?.length ? (
                    <ul className="mt-2 list-disc pl-5 text-sm text-gray-700">
                      {ss.links.map((l:any,j:number)=><li key={j}><a className="hover:underline" href={l.href}>{l.label}</a></li>)}
                    </ul>
                  ):null}
                </li>
              ))}
            </ul>
          </Card.Body>
        </Card>
      ):null}
    </div>
  );
}
