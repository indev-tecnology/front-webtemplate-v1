import type { Metadata } from 'next';
import { PageLayout } from '@/presentation/web-ui/layouts/PageLayout';
import { ContentGrid } from '@/presentation/web-ui/layouts/ContentGrid';
import { AgreementCard } from '@/presentation/web-ui/templates/AgreementCard';
import { getCachedAgreements } from '@/application/cached';
import type { Agreement } from '@/domain/entities/Agreement';

export const metadata: Metadata = {
  title: 'Convenios | Cooperativa',
  description: 'Explora los convenios y beneficios para asociados con nuestros aliados estratégicos.',
};

export default async function AgreementsPage() {
  const agreements = await getCachedAgreements();

  return (
    <PageLayout
      hero={{
        title: 'Convenios y Beneficios',
        subtitle: 'Convenios',
        description: 'Conoce los convenios vigentes con instituciones y aliados para acceso a beneficios exclusivos.',
        tone: 'blue',
        align: 'center',
      }}
      breadcrumbs={[{ label: 'Convenios', href: '/agreements' }]}
    >
      <ContentGrid columns={3} gap="lg">
        {agreements.map((agreement: Agreement) => (
          <AgreementCard key={agreement.id ?? agreement.slug} agreement={agreement} href={`/agreements/${agreement.slug}`} />
        ))}
      </ContentGrid>
    </PageLayout>
  );
}
