export function SectionHeader(
  { title, subtitle, center=false }: { title: string; subtitle?: string; center?: boolean }
) {
  return (
    <header className={center ? "text-center space-y-2" : "space-y-2"}>
      <h1 className="text-3xl sm:text-4xl font-bold">{title}</h1>
      {subtitle && <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
    </header>
  );
}
