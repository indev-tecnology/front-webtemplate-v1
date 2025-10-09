import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageLayout } from '@/presentation/web-ui/layouts/PageLayout';
import { AgreementDetailTemplate } from '@/presentation/web-ui/templates/AgreementDetailTemplate';
import { getCachedAgreementBySlug, getCachedAgreements } from '@/application/cached';
import type { Agreement } from '@/domain/entities/Agreement';

interface AgreementPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export async function generateMetadata({ params }: AgreementPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const agreement = await getCachedAgreementBySlug(slug);
    if (!agreement) return { title: 'Convenio no encontrado' };
    return {
      title: `${agreement.name} | Convenios`,
      description: agreement.description,
      openGraph: { title: agreement.name, description: agreement.description, images: agreement.logo?.url ? [{ url: agreement.logo.url }] : [] },
    };
  } catch {
    return { title: 'Convenio' };
  }
}

export async function generateStaticParams() {
  try {
    const agreements = await getCachedAgreements();
    return agreements.map((a) => ({ slug: a.slug }));
  } catch {
    return [];
  }
}

export default async function AgreementDetailPage({ params }: AgreementPageProps) {
  const { slug } = await params;
  const agreement = await getCachedAgreementBySlug(slug) as Agreement | null;
  if (!agreement) notFound();

  return (
    <PageLayout
      hero={{
        title: agreement.name,
        subtitle: 'Convenios',
        description: agreement.description,
        tone: 'blue',
        align: 'left',
      }}
      breadcrumbs={[{ label: 'Convenios', href: '/agreements' }, { label: agreement.name }]}
    >
      <AgreementDetailTemplate agreement={agreement} />
    </PageLayout>
  );
}
