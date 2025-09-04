// src/app/maintenance/page.tsx
export const dynamic = 'force-static';
export const metadata = { title: 'Mantenimiento' };

export default function Maintenance() {
  return (
    <main className="min-h-dvh grid place-items-center p-8 text-center">
      <div className="max-w-xl space-y-4">
        <h1 className="text-3xl font-bold">Mantenimiento</h1>
        <p>{process.env.MAINTENANCE_MSG || 'Estamos trabajando en mejoras.'}</p>
      </div>
    </main>
  );
}
