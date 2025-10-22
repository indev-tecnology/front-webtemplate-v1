// scripts/seed-about.ts
/**
 * Script para poblar la colección About con datos de ejemplo
 * Ejecutar con: npx tsx scripts/seed-about.ts
 */

import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/webtemplate';

const aboutData = {
  status: 'published',
  version: 1,
  locale: 'es-CO',

  hero: {
    title: 'Construyendo Futuro, Juntos',
    subtitle: 'Más de 15 años de confianza',
    description: 'Somos una cooperativa del sector solidario comprometida con el bienestar financiero de nuestros asociados y sus familias. Nuestra misión es brindar soluciones financieras accesibles, justas y sostenibles.',
    image: {
      url: '/images/wcs_default.png',
      alt: 'Equipo de la cooperativa',
      width: 1200,
      height: 800,
    },
  },

  introduction: {
    title: 'Nuestra Historia',
    content: 'Fundada en 2010, nuestra cooperativa nació del sueño compartido de un grupo de trabajadores que buscaban crear una alternativa financiera más humana y solidaria. Desde entonces, hemos crecido hasta convertirnos en una institución sólida que sirve a más de 25,000 asociados en todo el país, manteniendo siempre nuestros valores de transparencia, equidad y desarrollo comunitario.',
  },

  history: {
    title: 'Nuestra Trayectoria',
    description: 'Momentos clave que han marcado nuestro crecimiento',
    milestones: [
      {
        year: '2010',
        title: 'Fundación de la Cooperativa',
        description: 'Un grupo de 50 trabajadores visionarios se unieron para crear una cooperativa que pusiera a las personas en el centro de las decisiones financieras.',
        icon: 'Sparkles',
      },
      {
        year: '2013',
        title: 'Primera Oficina Regional',
        description: 'Expandimos nuestra cobertura abriendo nuestra primera sucursal en Medellín, alcanzando 5,000 asociados.',
        icon: 'Building',
      },
      {
        year: '2016',
        title: 'Certificación de Calidad ISO 9001',
        description: 'Obtuvimos la certificación internacional ISO 9001, garantizando los más altos estándares en nuestros procesos.',
        icon: 'Award',
      },
      {
        year: '2019',
        title: 'Plataforma Digital',
        description: 'Lanzamos nuestra plataforma de banca digital, permitiendo a los asociados gestionar sus finanzas 24/7 desde cualquier lugar.',
        icon: 'Smartphone',
      },
      {
        year: '2022',
        title: '20,000 Asociados',
        description: 'Celebramos el hito de 20,000 familias confiando en nuestra cooperativa para construir su futuro financiero.',
        icon: 'Users',
      },
      {
        year: '2025',
        title: 'Expansión Nacional',
        description: 'Presencia en 15 ciudades del país con más de 25,000 asociados activos y $85M en patrimonio administrado.',
        icon: 'MapPin',
      },
    ],
  },

  missionVisionValues: {
    mission: {
      title: 'Misión',
      description: 'Brindar soluciones financieras integrales, accesibles y sostenibles que mejoren la calidad de vida de nuestros asociados y sus familias, promoviendo el desarrollo económico solidario y la inclusión financiera en nuestras comunidades.',
      icon: 'Target',
    },
    vision: {
      title: 'Visión',
      description: 'Ser la cooperativa líder en el sector solidario colombiano, reconocida por nuestra excelencia en el servicio, innovación tecnológica y compromiso con el desarrollo integral de nuestros asociados y la transformación social.',
      icon: 'Eye',
    },
    values: [
      {
        id: '1',
        name: 'Solidaridad',
        description: 'Trabajamos unidos por el bienestar común, apoyándonos mutuamente en el camino hacia la prosperidad.',
        icon: 'Heart',
      },
      {
        id: '2',
        name: 'Transparencia',
        description: 'Actuamos con honestidad y claridad en todas nuestras operaciones, manteniendo la confianza de nuestros asociados.',
        icon: 'Eye',
      },
      {
        id: '3',
        name: 'Responsabilidad',
        description: 'Cumplimos nuestros compromisos con excelencia, asumiendo las consecuencias de nuestras decisiones.',
        icon: 'Shield',
      },
      {
        id: '4',
        name: 'Equidad',
        description: 'Tratamos a todos nuestros asociados con justicia e igualdad de oportunidades.',
        icon: 'Scale',
      },
      {
        id: '5',
        name: 'Innovación',
        description: 'Nos adaptamos continuamente a las necesidades cambiantes de nuestros asociados mediante soluciones creativas.',
        icon: 'Lightbulb',
      },
      {
        id: '6',
        name: 'Compromiso Social',
        description: 'Contribuimos activamente al desarrollo sostenible de las comunidades que servimos.',
        icon: 'Users',
      },
    ],
  },

  stats: [
    {
      id: '1',
      value: '25',
      suffix: 'K+',
      label: 'Asociados activos',
      icon: 'Users',
      description: 'Familias confiando en nosotros',
    },
    {
      id: '2',
      value: '15',
      suffix: '+',
      label: 'Años de experiencia',
      icon: 'Award',
      description: 'Desde 2010 sirviendo',
    },
    {
      id: '3',
      value: '120',
      suffix: '+',
      label: 'Convenios vigentes',
      icon: 'Briefcase',
      description: 'Beneficios exclusivos',
    },
    {
      id: '4',
      value: '$85',
      suffix: 'M',
      label: 'Patrimonio administrado',
      icon: 'TrendingUp',
      description: 'En activos gestionados',
    },
  ],

  whyChooseUs: {
    title: '¿Por qué elegirnos?',
    description: 'Razones que nos hacen diferentes en el sector cooperativo',
    reasons: [
      {
        id: '1',
        title: 'Tasas Competitivas',
        description: 'Ofrecemos las mejores tasas del mercado en créditos y ahorros, porque tu bienestar financiero es nuestra prioridad.',
        icon: 'TrendingUp',
      },
      {
        id: '2',
        title: 'Atención Personalizada',
        description: 'No eres un número, eres parte de nuestra familia. Recibe asesoría personalizada de expertos comprometidos con tus metas.',
        icon: 'Heart',
      },
      {
        id: '3',
        title: 'Tecnología de Vanguardia',
        description: 'Plataforma digital 24/7, app móvil intuitiva y procesos 100% digitales para tu comodidad.',
        icon: 'Zap',
      },
      {
        id: '4',
        title: 'Educación Financiera',
        description: 'Talleres gratuitos, asesorías y recursos educativos para que tomes decisiones financieras inteligentes.',
        icon: 'Award',
      },
      {
        id: '5',
        title: 'Beneficios Exclusivos',
        description: 'Acceso a más de 120 convenios con descuentos en salud, educación, recreación y mucho más.',
        icon: 'Gift',
      },
      {
        id: '6',
        title: 'Seguridad y Confianza',
        description: 'Supervisados por entidades gubernamentales, con certificaciones internacionales de calidad y seguridad.',
        icon: 'Shield',
      },
    ],
  },

  team: {
    title: 'Nuestro Equipo Directivo',
    description: 'Líderes comprometidos con el desarrollo de nuestra cooperativa',
    members: [
      {
        id: '1',
        name: 'María Fernanda González',
        position: 'Gerente General',
        bio: 'Administradora de empresas con MBA en Finanzas. 20 años de experiencia en el sector cooperativo.',
        photo: {
          url: '/images/team/member-1.jpg',
          alt: 'María Fernanda González',
        },
        email: 'mfgonzalez@cooperativa.com',
        order: 1,
      },
      {
        id: '2',
        name: 'Carlos Andrés Ramírez',
        position: 'Director Financiero',
        bio: 'Contador público especialista en gestión financiera cooperativa y análisis de riesgos.',
        photo: {
          url: '/images/team/member-2.jpg',
          alt: 'Carlos Andrés Ramírez',
        },
        email: 'caramirez@cooperativa.com',
        order: 2,
      },
      {
        id: '3',
        name: 'Laura Sofía Martínez',
        position: 'Directora de Operaciones',
        bio: 'Ingeniera industrial con especialización en gestión de procesos y mejora continua.',
        photo: {
          url: '/images/team/member-3.jpg',
          alt: 'Laura Sofía Martínez',
        },
        email: 'lsmartinez@cooperativa.com',
        order: 3,
      },
      {
        id: '4',
        name: 'Javier Esteban Torres',
        position: 'Director de Tecnología',
        bio: 'Ingeniero de sistemas especializado en transformación digital y ciberseguridad.',
        photo: {
          url: '/images/team/member-4.jpg',
          alt: 'Javier Esteban Torres',
        },
        email: 'jetorres@cooperativa.com',
        order: 4,
      },
    ],
  },

  certifications: {
    title: 'Certificaciones y Reconocimientos',
    description: 'Avalados por las más prestigiosas entidades nacionales e internacionales',
    items: [
      {
        id: '1',
        name: 'ISO 9001:2015',
        issuer: 'International Organization for Standardization',
        year: 2023,
        description: 'Sistema de gestión de calidad',
        logo: {
          url: '/images/certifications/iso-9001.png',
          alt: 'ISO 9001',
        },
        validUntil: new Date('2026-12-31'),
      },
      {
        id: '2',
        name: 'Superintendencia de Economía Solidaria',
        issuer: 'Gobierno de Colombia',
        year: 2010,
        description: 'Vigilancia y control',
        logo: {
          url: '/images/certifications/supersolidaria.png',
          alt: 'Supersolidaria',
        },
      },
      {
        id: '3',
        name: 'Mejor Cooperativa 2024',
        issuer: 'Revista Dinero',
        year: 2024,
        description: 'Reconocimiento a la excelencia',
        logo: {
          url: '/images/certifications/dinero-award.png',
          alt: 'Premio Dinero',
        },
      },
    ],
  },

  seo: {
    title: 'Nosotros - Cooperativa del Sector Solidario',
    description: 'Conoce nuestra historia, misión, visión y valores. Más de 15 años sirviendo a 25,000+ familias con soluciones financieras solidarias.',
    ogImage: {
      url: '/images/og-nosotros.jpg',
      alt: 'Nosotros - Cooperativa',
    },
  },

  createdAt: new Date(),
  updatedAt: new Date(),
};

async function seed() {
  console.log('🌱 Conectando a MongoDB...');
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('✅ Conectado a MongoDB');

    const db = client.db();
    const collection = db.collection('about');

    // Insertar nuevos datos
    const result = await collection.insertOne(aboutData);
    console.log('✅ Datos insertados:', result.insertedId);

    console.log('\n✨ Seed completado exitosamente!');
    console.log('📄 Puedes ver la página en: http://localhost:3000/nosotros');

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('👋 Conexión cerrada');
  }
}

seed();
