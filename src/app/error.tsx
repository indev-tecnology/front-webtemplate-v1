// src/app/error.tsx
'use client';
export default function GlobalError({ error }: { error: Error }) {
  return (
    <>
      <h1 className="text-2xl font-bold">Ha ocurrido un error</h1>
        <p className="mt-2 text-sm text-gray-600">Intenta de nuevo más tarde.</p>
    </>
  );
}
