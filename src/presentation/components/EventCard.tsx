export function EventCard({ data }: { data: any }){
  const dt = new Date(data.startsAt);
  return (
    <article className="border rounded-lg overflow-hidden p-4 space-y-2">
      {data?.image?.url && <img src={data.image.url} alt={data.image.alt||''} className="w-full h-40 object-cover rounded"/>}
      <h3 className="font-semibold text-lg">{data?.title}</h3>
      <div className="text-sm text-gray-600">{dt.toLocaleDateString('es')}</div>
      {data?.location && <div className="text-sm">{data.location}</div>}
    </article>
  );
}
