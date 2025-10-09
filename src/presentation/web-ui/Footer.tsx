'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  icon: 'facebook' | 'instagram' | 'twitter' | 'linkedin';
  href: string;
  label: string;
}

export interface FooterProps {
  sections?: FooterSection[];
  socialLinks?: SocialLink[];
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  copyright?: string;
}

const socialIcons = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  linkedin: Linkedin,
};

export const Footer = ({
  sections = [],
  socialLinks = [],
  contactInfo,
  copyright = '© 2025 Cooperativa. Todos los derechos reservados.'
}: FooterProps) => {
  return (
    <footer className="bg-brand text-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Información de contacto */}
          {contactInfo && (
            <div>
              <h3 className="font-bold text-lg mb-4">Contáctanos</h3>
              <div className="space-y-3 text-sm">
                {contactInfo.email && (
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-start gap-2 hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded"
                  >
                    <Mail size={18} className="mt-0.5 flex-shrink-0" />
                    <span>{contactInfo.email}</span>
                  </a>
                )}
                {contactInfo.phone && (
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="flex items-start gap-2 hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded"
                  >
                    <Phone size={18} className="mt-0.5 flex-shrink-0" />
                    <span>{contactInfo.phone}</span>
                  </a>
                )}
                {contactInfo.address && (
                  <div className="flex items-start gap-2">
                    <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                    <span>{contactInfo.address}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Secciones de enlaces */}
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="font-bold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-2 text-sm">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Redes sociales */}
        {socialLinks.length > 0 && (
          <div className="border-t border-brand-400 pt-8 mb-8">
            <h3 className="font-bold text-lg mb-4">Síguenos</h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                    const Icon = socialIcons[social.icon];
                    return (
                      <a
                        key={`${social.icon}-${social.href}`}
                        href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="p-2 bg-brand-600 hover:bg-accent hover:text-neutral-900 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* Copyright */}
        <div className="border-t border-brand-400 pt-8 text-sm text-center md:text-left">
          <p>{copyright}</p>
        </div>
      </div>
    </footer>
  );
};
