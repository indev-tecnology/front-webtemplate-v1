export function Footer({ data }: { data: any }){
  return (
    <footer className="border-t bg-surface-200 text-neutral-700">
      <div className="mx-auto max-w-6xl p-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {data?.columns?.map((col:any, i:number)=> (
          <div key={i}>
            {col.title && <h3 className="font-semibold mb-2">{col.title}</h3>}
            <ul className="space-y-1">
              {col.links?.map((l:any)=> (<li key={l.href}><a className="hover:underline" href={l.href}>{l.label}</a></li>))}
            </ul>
          </div>
        ))}
        {data?.socials?.length ? (
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-semibold mb-2">Redes</h3>
            <ul className="flex gap-3">{data.socials.map((s:any)=> (<li key={s.href}><a href={s.href}>{s.name}</a></li>))}</ul>
          </div>
        ) : null}
      </div>
      <div className="text-center text-sm text-gray-500 p-4">{data?.note}</div>
    </footer>
  );
}
