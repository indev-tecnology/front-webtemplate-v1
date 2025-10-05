
// Mantén aquí contenido poco cambiante: textos institucionales, enlaces, datos de contacto, etc.

import type { ToneKey } from "@/shared/tone";
import { FooterSection, SocialLink } from '@/presentation/web-ui/Footer';

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
  logo: "/images/web-logo.png", // Logo principal del sitio
  favicon: "/favicon.ico",
  keywords:
    "cooperativa, ahorro, crédito, finanzas, servicios financieros, asociados, préstamos, inversión",
  brandName: "Tu Entidad",
  shortName: "Entidad",
  tagline: "Compromiso, innovación y servicio.",
  locale: "es-CO",
};

// Footer
export const footerSections: FooterSection[] = [
  {
    title: 'Servicios',
    links: [
      { label: 'Créditos', href: '/servicios/creditos' },
      { label: 'Ahorro e inversión', href: '/servicios/ahorro' },
      { label: 'Seguros', href: '/servicios/seguros' },
      { label: 'Educación financiera', href: '/servicios/educacion' },
    ],
  },
  {
    title: 'Institucional',
    links: [
      { label: 'Quiénes somos', href: '/nosotros' },
      { label: 'Misión y visión', href: '/nosotros/mision-vision' },
      { label: 'Gobierno corporativo', href: '/nosotros/gobierno' },
      { label: 'Trabaja con nosotros', href: '/trabaja-con-nosotros' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Políticas de privacidad', href: '/politicas' },
      { label: 'Términos y condiciones', href: '/terminos' },
      { label: 'Protección de datos', href: '/proteccion-datos' },
      { label: 'SARLAFT', href: '/sarlaft' },
    ],
  },
];

export const contactInfo = {
  email: 'atencion@cooperativa.coop',
  phone: '+57 (601) 234 5678',
  address: 'Calle 72 #10-51, Bogotá D.C., Colombia',
};

export const socialLinks: SocialLink[] = [
  { icon: 'facebook', href: 'https://facebook.com/cooperativa', label: 'Facebook' },
  { icon: 'instagram', href: 'https://instagram.com/cooperativa', label: 'Instagram' },
  { icon: 'twitter', href: 'https://twitter.com/cooperativa', label: 'Twitter' },
  { icon: 'linkedin', href: 'https://linkedin.com/company/cooperativa', label: 'LinkedIn' },
];

// Copia fija del Home (sin i18n)
export const homeSections = {
  services: {
    subtitle: "Nuestros servicios",
    title: "Soluciones para tu bienestar financiero",
    description: "Ofrecemos una amplia gama de servicios diseñados para apoyar tu crecimiento personal y familiar en el sector solidario.",
    align: "center",
    className: "mb-12",
  },
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
    title: "Comunicate con nosotros",
    subtitle: "Nuestros medios de contacto estan a tu disposición, si tienes algo para nosotros no dudes en comunicarlo por este medio.",
    tone: "sun" as ToneKey,
  },
  flayers:{
    footer: "Cointramin garantiza la protección de información de terceros - Ley Estatutaria 1581 de 2012"
  }
};
