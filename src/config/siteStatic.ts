// Configuración estática (sin BD) para el sitio.
import 'server-only';
// Mantén aquí contenido poco cambiante: textos institucionales, enlaces, datos de contacto, etc.

import type { ToneKey } from "@/shared/tone";

// Iconos: pasamos solo una clave, y en el componente se mapea a un icono real
export type IconKey = "target" | "lightbulb" | "users";

export interface PillarConfigItem {
  title: string;
  description?: string;
  tone?: ToneKey;
  iconKey?: IconKey;
  href?: string;
}

export const pillarsConfig: PillarConfigItem[] = [
  {
    title: "Misión",
    description:
      "Impulsar el desarrollo sostenible a través de soluciones tecnológicas y humanas.",
    tone: "green",
    iconKey: "target",
  },
  {
    title: "Visión",
    description:
      "Ser referente en innovación y en el impacto positivo en la sociedad.",
    tone: "sun",
    iconKey: "lightbulb",
  },
  {
    title: "Valores",
    description: "Compromiso, transparencia, colaboración y excelencia.",
    tone: "blue",
    iconKey: "users",
  },
];

// Ejemplo de otros datos estáticos que podrías centralizar aquí
export const siteMeta = {
  brandName: "Tu Entidad",
  shortName: "Entidad",
  tagline: "Compromiso, innovación y servicio.",
  locale: "es-CO",
};

export const contactInfo = {
  phone: "+57 300 000 0000",
  email: "contacto@tu-entidad.gov.co",
  address: "Cra 0 # 00-00, Ciudad, País",
  schedule: "Lun–Vie 8:00–17:00",
};

export const socialLinks = {
  facebook: "https://facebook.com/tuentidad",
  instagram: "https://instagram.com/tuentidad",
  youtube: "https://youtube.com/@tuentidad",
  x: "https://x.com/tuentidad",
};

// Copia fija del Home (sin i18n)
export const homeCopy = {
  features: {
    title: "Principales servicios",
    description: "Conoce más sobre algunos de nuestros principales servicios que tenemos para ti.",
  },
  pillars: {
    title: "Nuestra esencia",
    description: "Misión, visión y valores que nos guían.",
  },
  tips: {
    title: "Información de interés",
    description: "Consejos breves para aprovechar al máximo nuestros servicios.",
    badge: "Para ti",
  },
  events: {
    title: "Eventos y novedades",
  },
  contact: {
    title: "Construyamos algo juntos",
    subtitle: "Completa el formulario y agenda una llamada con nuestro equipo de especialistas.",
    tone: "sun" as ToneKey,
  },
};
