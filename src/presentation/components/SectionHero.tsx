export function SectionHero(props: { title: string; subtitle?: string; image?: { url: string; alt?: string } }){
  return (
    <section className="rounded-xl border p-6 grid gap-4 md:grid-cols-2 items-center">
      <div>
        <h2 className="text-2xl font-bold">{props.title}</h2>
        {props.subtitle && <p className="text-gray-700 mt-2">{props.subtitle}</p>}
      </div>
      {props?.image?.url && <img src={props.image.url} alt={props.image.alt||''} className="w-full h-auto rounded" />}
    </section>
  );
}
