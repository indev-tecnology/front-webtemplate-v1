import Image from "next/image";
import { SectionHeader } from "@/presentation/components/ui/SectionHeader";
import { Card } from "@/presentation/components/ui/Card";
import { fmtCo } from "@/shared/date";
import { getCachedAgreementBySlug } from "@/application/cached";

export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ag = await getCachedAgreementBySlug(slug);
  return { title: ag?.name || "Convenio" };
}

export default async function AgreementDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ag = await getCachedAgreementBySlug(slug);
  if (!ag) return <div className="p-8">Convenio no disponible.</div>;

  return (
    <div className="mx-auto max-w-5xl p-6 space-y-8">
      <SectionHeader title={ag.name} description={ag.description} />
      <Card>
        <Card.Body className="flex items-center gap-6">
          {ag.logo?.url && (
            <Image src={ag.logo.url} alt={ag.logo.alt || ag.name} width={80} height={40} className="object-contain h-12" />
          )}
          <div className="text-sm text-gray-600">
            {ag.startsAt && <>Vigente desde {fmtCo(ag.startsAt)}</>}
            {ag.endsAt && <> hasta {fmtCo(ag.endsAt)}</>}
          </div>
        </Card.Body>
      </Card>

      {ag.links?.length ? (
        <Card>
          <Card.Header title="Enlaces" />
          <Card.Body>
            <ul className="list-disc pl-6 space-y-1">
              {ag.links.map((l: any, i: number) => (
                <li key={i}><a href={l.href} className="text-blue-600 hover:underline">{l.label}</a></li>
              ))}
            </ul>
          </Card.Body>
        </Card>
      ) : null}
    </div>
  );
}
