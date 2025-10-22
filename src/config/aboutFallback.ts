// config/aboutFallback.ts
/**
 * Contenido de fallback estático para la página About
 *
 * Se utiliza cuando MongoDB no está disponible o hay errores de conexión.
 * Este contenido garantiza que la página siempre tenga información básica
 * para mostrar, mejorando la resiliencia del sitio.
 *
 * IMPORTANTE: Mantener sincronizado con el contenido principal en MongoDB
 * cuando se realicen cambios significativos.
 */

import type { About } from '@/domain/entities/About';
import { siteMeta } from './siteStatic';

export const aboutFallback: About = {
  id: 'fallback-about',
  status: 'published',
  version: 1,
  locale: 'es-CO',

  hero: {
    title: `Conoce ${siteMeta.brandName}`,
    subtitle: 'Compromiso con nuestros asociados',
    description:
      'Somos una cooperativa del sector solidario comprometida con el bienestar financiero de nuestros asociados y sus familias. Brindamos soluciones financieras accesibles, justas y sostenibles.',
    image: {
      url: '/images/wcs_default.png',
      alt: 'Nuestra cooperativa',
      width: 1200,
      height: 800,
    },
  },

  introduction: {
    title: 'Nuestra Historia',
    content:
      'Nuestra cooperativa nació del sueño compartido de crear una alternativa financiera más humana y solidaria. Hemos crecido hasta convertirnos en una institución sólida que sirve a miles de asociados, manteniendo siempre nuestros valores de transparencia, equidad y desarrollo comunitario.',
  },

  missionVisionValues: {
    mission: {
      title: 'Misión',
      description:
        'Brindar soluciones financieras integrales, accesibles y sostenibles que mejoren la calidad de vida de nuestros asociados y sus familias, promoviendo el desarrollo económico solidario.',
      icon: 'Target',
    },
    vision: {
      title: 'Visión',
      description:
        'Ser la cooperativa líder en el sector solidario, reconocida por nuestra excelencia en el servicio, innovación tecnológica y compromiso con el desarrollo integral de nuestros asociados.',
      icon: 'Eye',
    },
    values: [
      {
        id: '1',
        name: 'Solidaridad',
        description:
          'Trabajamos unidos por el bienestar común, apoyándonos mutuamente en el camino hacia la prosperidad.',
        icon: 'Heart',
      },
      {
        id: '2',
        name: 'Transparencia',
        description:
          'Actuamos con honestidad y claridad en todas nuestras operaciones, manteniendo la confianza de nuestros asociados.',
        icon: 'Eye',
      },
      {
        id: '3',
        name: 'Responsabilidad',
        description:
          'Cumplimos nuestros compromisos con excelencia, asumiendo las consecuencias de nuestras decisiones.',
        icon: 'Shield',
      },
      {
        id: '4',
        name: 'Equidad',
        description:
          'Tratamos a todos nuestros asociados con justicia e igualdad de oportunidades.',
        icon: 'Scale',
      },
    ],
  },

  stats: [
    {
      id: '1',
      value: '10',
      suffix: 'K+',
      label: 'Asociados activos',
      icon: 'Users',
      description: 'Familias confiando en nosotros',
    },
    {
      id: '2',
      value: '10',
      suffix: '+',
      label: 'Años de experiencia',
      icon: 'Award',
      description: 'Sirviendo a la comunidad',
    },
    {
      id: '3',
      value: '50',
      suffix: '+',
      label: 'Convenios vigentes',
      icon: 'Briefcase',
      description: 'Beneficios exclusivos',
    },
    {
      id: '4',
      value: '$50',
      suffix: 'M',
      label: 'Patrimonio',
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
        description:
          'Ofrecemos las mejores tasas del mercado en créditos y ahorros, porque tu bienestar financiero es nuestra prioridad.',
        icon: 'TrendingUp',
      },
      {
        id: '2',
        title: 'Atención Personalizada',
        description:
          'No eres un número, eres parte de nuestra familia. Recibe asesoría personalizada de expertos comprometidos.',
        icon: 'Heart',
      },
      {
        id: '3',
        title: 'Tecnología de Vanguardia',
        description:
          'Plataforma digital 24/7, app móvil intuitiva y procesos 100% digitales para tu comodidad.',
        icon: 'Zap',
      },
      {
        id: '4',
        title: 'Seguridad y Confianza',
        description:
          'Supervisados por entidades gubernamentales, con certificaciones internacionales de calidad.',
        icon: 'Shield',
      },
    ],
  },

  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
};
