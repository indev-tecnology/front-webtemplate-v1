// src/app/(site)/anexos/page.tsx
import { SectionHeader } from "@/presentation/components/ui/SectionHeader";
import { Card } from "@/presentation/components/ui/Card";
import TextLink from "@/presentation/components/ui/TextLink";
import { fmtMB } from "@/shared/bytes";
import { apiConsumer } from "@/presentation/adapters/apiConsumer";

export const metadata = { title: "Anexos" };

type SP = Record<string, string | string[] | undefined>;

export default async function Anexos(
  { searchParams }: { searchParams: Promise<SP> }
) {
  const sp = await searchParams;
  const get1 = (v: SP[keyof SP]) => Array.isArray(v) ? v[0] : v;

  const category = get1(sp.category);
  const q = get1(sp.q);
  const pageStr = get1(sp.page);
  const page = pageStr ? Number(pageStr) : 1;
  const pageSize = 24;

  const { items, total } = await apiConsumer.attachments({ category, q, page, pageSize });
  const pages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="mx-auto max-w-6xl p-6 space-y-8">
      <SectionHeader title="Anexos" subtitle="Descarga de documentos oficiales en PDF." center />

      <Card>
        <Card.Body className="grid gap-3 sm:grid-cols-3">
          <form className="col-span-2">
            <input name="q" defaultValue={q || ""} placeholder="Buscar por título o etiqueta" className="w-full rounded-lg border px-3 py-2" />
          </form>
          <form>
            <select name="category" defaultValue={category || ""} className="w-full rounded-lg border px-3 py-2">
              <option value="">Todas las categorías</option>
              <option value="reglamentos">Reglamentos</option>
              <option value="formularios">Formularios</option>
              <option value="politicas">Políticas</option>
            </select>
          </form>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-surface-50 text-left">
                <tr>
                  <th className="px-4 py-3">Documento</th>
                  <th className="px-4 py-3 hidden sm:table-cell">Categoría</th>
                  <th className="px-4 py-3 hidden md:table-cell">Tipo</th>
                  <th className="px-4 py-3 hidden md:table-cell">Tamaño</th>
                  <th className="px-4 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {items.map((a:any)=>(
                  <tr key={a.id} className="border-t">
                    <td className="px-4 py-3">
                      <div className="font-medium">{a.title}{a.version ? ` · ${a.version}` : ""}</div>
                      {a.tags?.length ? <div className="text-xs text-gray-500">{a.tags.join(" · ")}</div> : null}
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">{a.category || "-"}</td>
                    <td className="px-4 py-3 hidden md:table-cell">{a.fileType || "PDF"}</td>
                    <td className="px-4 py-3 hidden md:table-cell">{fmtMB(a.fileSizeBytes)}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-3">
                        <a href={a.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">Ver</a>
                        <a href={a.fileUrl} download className="text-brand-600 underline hover:text-brand-700">Descargar</a>
                      </div>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr><td colSpan={5} className="px-4 py-6 text-center text-gray-500">Sin resultados.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>

      {pages > 1 && (
        <nav className="flex justify-center gap-2">
          {Array.from({ length: pages }).map((_, i) => {
            const n = i + 1;
            const qs = new URLSearchParams({
              ...(category ? { category } : {}),
              ...(q ? { q } : {}),
              page: String(n),
            }).toString();
            return (
              <a key={n} href={`/anexos?${qs}`} className={`px-3 py-1 rounded border ${n===page ? "bg-blue-600 text-white border-blue-600" : "bg-white"}`}>
                {n}
              </a>
            );
          })}
        </nav>
      )}
    </div>
  );
}
