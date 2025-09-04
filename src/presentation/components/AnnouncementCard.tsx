export function AnnouncementCard({ data }: { data: any }){
  return (
    <article className="border rounded-lg overflow-hidden">
      {data?.image?.url && <img src={data.image.url} alt={data.image.alt||''} className="w-full h-48 object-cover"/>}
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-lg">{data?.title}</h3>
        {data?.body && <div className="text-sm text-gray-700" dangerouslySetInnerHTML={{__html: data.body}} />}
      </div>
    </article>
  );
}
