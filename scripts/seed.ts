import clientPromise from "@/infrastructure/db/mongodb/client";
import { COL } from "@/infrastructure/db/mongodb/collections";

(async()=>{
  const db = (await clientPromise).db();

  await db.collection(COL.NAV).deleteMany({});
  await db.collection(COL.FOOTER).deleteMany({});
  await db.collection(COL.ANNS).deleteMany({});
  await db.collection(COL.EVENTS).deleteMany({});
  await db.collection(COL.ATTS).deleteMany({});

  await db.collection(COL.NAV).insertOne({
    items: [
      { label: "Inicio", href: "/" },
      { label: "Sobre nosotros", href: "/sobre-nosotros" },
      { label: "Servicios", href: "/servicios", children: [
        { label: "Consultoría", href: "/servicios/consultoria" }
      ]},
      { label: "Convenios", href: "/convenios" },
      { label: "Anexos", href: "/anexos" }
    ],
    createdAt: new Date(), updatedAt: new Date()
  });

  await db.collection(COL.FOOTER).insertOne({
    columns: [{ title: "Institucional", links: [{ label: "Sobre", href: "/sobre-nosotros" }] }],
    socials: [{ name: "Facebook", href: "#" }],
    note: "© Org",
    createdAt: new Date(), updatedAt: new Date()
  });

  await db.collection(COL.ANNS).insertMany([
    { title: "Bienvenidos", body: "<p>Nuevo sitio en línea.</p>", image: null, startsAt: new Date(), createdAt: new Date(), updatedAt: new Date() }
  ]);

  const now = new Date();
  await db.collection(COL.EVENTS).insertMany([
    { title: "Webinar Next.js", description: "Introducción", image: null, location: "Online", startsAt: new Date(now.getTime()+86400000*7), createdAt: new Date(), updatedAt: new Date() }
  ]);

  await db.collection(COL.ATTS).insertMany([
    { title: "Reglamento interno", fileUrl: "https://example.com/reglamento.pdf", fileType: "application/pdf", category: "reglamentos", createdAt: new Date(), updatedAt: new Date() }
  ]);

  // scripts/seed.ts (añade al final)
await db.collection(COL.SERVICES).deleteMany({});
await db.collection(COL.SERVICES).insertMany([
  {
    slug: "consultoria",
    name: "Consultoría",
    description: "Diagnóstico, estrategia y roadmap de transformación digital.",
    icon: { url: "/icons/consulting.svg", alt: "Consultoría" },
    subservices: [
      { name: "Evaluación tecnológica", links: [{ label: "Ver brochure", href: "#" }] },
      { name: "Arquitectura de software", links: [{ label: "Contáctanos", href: "/contacto" }] }
    ],
    highlights: ["Workshops ejecutivos", "Entregables accionables", "KPIs y métricas"],
    createdAt: new Date(), updatedAt: new Date()
  },
  {
    slug: "desarrollo-web",
    name: "Desarrollo Web",
    description: "Aplicaciones modernas, seguras y escalables.",
    icon: { url: "/icons/webdev.svg", alt: "Desarrollo Web" },
    subservices: [
      { name: "Sites corporativos", links: [{ label: "Casos", href: "#" }] },
      { name: "Portales de contenido", links: [] }
    ],
    highlights: ["Next.js + RSC", "CI/CD", "Observabilidad"],
    createdAt: new Date(), updatedAt: new Date()
  }
]);

await db.collection(COL.AGREEMENTS).deleteMany({});
await db.collection(COL.AGREEMENTS).insertMany([
  {
    slug: "universidad-x",
    name: "Convenio con Universidad X",
    description: "Alianza académica para impulsar proyectos de investigación y capacitación.",
    logo: { url: "/logos/universidadx.png", alt: "Universidad X" },
    category: "Educación",
    startsAt: new Date("2023-01-01"),
    endsAt: new Date("2026-12-31"),
    links: [{ label: "Ver comunicado", href: "#" }],
    createdAt: new Date(), updatedAt: new Date()
  },
  {
    slug: "empresa-y",
    name: "Convenio con Empresa Y",
    description: "Colaboración en innovación tecnológica y proyectos de software.",
    logo: { url: "/logos/empresay.png", alt: "Empresa Y" },
    category: "Tecnología",
    startsAt: new Date("2024-03-01"),
    endsAt: null,
    links: [{ label: "Sitio oficial", href: "https://empresa-y.com" }],
    createdAt: new Date(), updatedAt: new Date()
  }
]);

// scripts/seed.ts (añadir)
await db.collection(COL.ATTS).deleteMany({});
await db.collection(COL.ATTS).insertMany([
  {
    title: "Reglamento interno",
    fileUrl: "https://example.com/reglamento.pdf",
    fileType: "application/pdf",
    fileSizeBytes: 1048576,
    version: "v1.0",
    category: "reglamentos",
    tags: ["normativa", "interno"],
    createdAt: new Date(), updatedAt: new Date()
  },
  {
    title: "Formulario de inscripción",
    fileUrl: "https://example.com/inscripcion.pdf",
    fileType: "application/pdf",
    fileSizeBytes: 734003,
    version: "v2.1",
    category: "formularios",
    tags: ["admisiones"],
    createdAt: new Date(), updatedAt: new Date()
  }
]);

await db.collection(COL.ANNS).deleteMany({});
await db.collection(COL.ANNS).insertMany([
  {
    slug: "apertura-inscripciones-2025",
    title: "Apertura de Inscripciones 2025",
    description: "Conoce fechas clave y requisitos.",
    bodyHTML: "<p>Ya están abiertas las inscripciones para 2025...</p>",
    image: { url: "/banners/inscripciones.jpg", alt: "Inscripciones 2025" },
    cta: { label: "Ver calendario", href: "/anexos?category=formularios" },
    tags: ["admisiones","2025"],
    pinned: true,
    priority: 10,
    publishedAt: new Date(),
    expiresAt: null,
    visible: true,
    createdAt: new Date(), updatedAt: new Date(),
  },
  {
    slug: "alianza-universidad-x",
    title: "Nueva alianza con Universidad X",
    description: "Fortalecemos la investigación y la innovación.",
    image: { url: "/banners/alianza.jpg", alt: "Alianza" },
    cta: { label: "Conoce el convenio", href: "/convenios/universidad-x" },
    tags: ["convenios"],
    priority: 5,
    publishedAt: new Date(),
    visible: true,
    createdAt: new Date(), updatedAt: new Date(),
  },
]);


  console.log("Seed done.");
  process.exit(0);
})();
