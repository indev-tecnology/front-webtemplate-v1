import type { BaseDoc } from "./common";
export type FooterLink = { label: string; href: string };
export type SocialLink = { name: string; href: string };
export type Footer = BaseDoc & {
  columns: { title?: string; links: FooterLink[] }[];
  socials?: SocialLink[];
  note?: string;
};
