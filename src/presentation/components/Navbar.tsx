export function Navbar({ data }: { data: { items: { label:string; href:string; children?: any[] }[] } }){
  return (
    <header className="border-b">
      <div className="mx-auto max-w-6xl p-4 flex items-center gap-6">
        <a href="/" className="font-semibold text-brand-500">Cointramin</a>
        <nav className="ml-auto">
          <ul className="flex gap-4">
            {data?.items?.map((it:any)=> (
              <li key={it.href} className="relative group">
                <a href={it.href} className="hover:underline">{it.label}</a>
                {it.children?.length ? (
                  <ul className="absolute hidden group-hover:block bg-white shadow rounded p-2 mt-2">
                    {it.children.map((c:any)=> (
                      <li key={c.href}><a className="block px-3 py-1 hover:bg-gray-50" href={c.href}>{c.label}</a></li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
