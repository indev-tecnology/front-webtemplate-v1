// domain/entities/About.ts
import type { BaseDoc, Image, SEO } from './common';
import type { Block } from '../shared/Block.type';

/**
 * Sección: Historia de la organización
 */
export interface HistorySection {
  title: string;
  description: string;
  milestones: Milestone[];
}

/**
 * Hito histórico
 */
export interface Milestone {
  year: string;
  title: string;
  description: string;
  icon?: string; // Lucide icon name
  image?: Image;
}

/**
 * Misión, Visión, Valores
 */
export interface MissionVisionValues {
  mission: {
    title: string;
    description: string;
    icon?: string;
  };
  vision: {
    title: string;
    description: string;
    icon?: string;
  };
  values: Value[];
}

/**
 * Valor corporativo
 */
export interface Value {
  id: string;
  name: string;
  description: string;
  icon?: string; // Lucide icon name
}

/**
 * Miembro del equipo directivo
 */
export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio?: string;
  photo?: Image;
  email?: string;
  phone?: string;
  linkedin?: string;
  order?: number; // Para ordenamiento
}

/**
 * Certificación o reconocimiento
 */
export interface Certification {
  id: string;
  name: string;
  issuer: string; // Entidad emisora
  year?: number;
  description?: string;
  logo?: Image;
  validUntil?: Date;
}

/**
 * Estadística de la organización
 */
export interface AboutStat {
  id: string;
  value: string;
  suffix?: string;
  label: string;
  icon?: string; // Lucide icon name
  description?: string;
}

/**
 * Sección "Por qué elegirnos"
 */
export interface WhyChooseUs {
  title: string;
  description: string;
  reasons: Reason[];
}

/**
 * Razón para elegir la cooperativa
 */
export interface Reason {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

/**
 * Entidad principal: About Page
 */
export interface About extends BaseDoc {
  id: string;

  // Hero Section
  hero: {
    title: string;
    subtitle?: string;
    description: string;
    image?: Image;
    video?: string; // URL de video (YouTube, Vimeo)
  };

  // Introducción
  introduction: {
    title: string;
    content: string | Block[]; // Texto plano o bloques estructurados
  };

  // Historia
  history?: HistorySection;

  // Misión, Visión, Valores
  missionVisionValues: MissionVisionValues;

  // Estadísticas
  stats: AboutStat[];

  // Por qué elegirnos
  whyChooseUs?: WhyChooseUs;

  // Equipo directivo
  team?: {
    title: string;
    description?: string;
    members: TeamMember[];
  };

  // Certificaciones y reconocimientos
  certifications?: {
    title: string;
    description?: string;
    items: Certification[];
  };

  // Contenido adicional (bloques flexibles)
  additionalContent?: Block[];

  // Estado
  status: 'draft' | 'published';

  // Versionado y localización
  version: number; // Versión del contenido (para auditoría y rollback)
  locale: string; // Código de idioma (ej: 'es-CO', 'en-US') para i18n futuro

  // SEO
  seo?: SEO;
}
