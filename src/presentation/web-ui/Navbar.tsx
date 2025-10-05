'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, MapPin, Mail, Phone, Search, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { Button } from './Button';
import { clsx } from 'clsx';

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  icon: 'facebook' | 'instagram' | 'twitter' | 'linkedin';
  href: string;
  label: string;
}

export interface ContactInfo {
  address?: string;
  email?: string;
  phone?: string;
}

export interface NavbarProps {
  logo?: React.ReactNode;
  links?: NavLink[];
  ctaLabel?: string;
  ctaHref?: string;
  socialLinks?: SocialLink[];
  contactInfo?: ContactInfo;
  showSearch?: boolean;
}

// Helper to render social icons
const SocialIcon = ({ icon }: { icon: SocialLink['icon'] }) => {
  const icons = {
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
    linkedin: Linkedin,
  };
  const Icon = icons[icon];
  return <Icon size={16} />;
};

export const Navbar = ({
  logo,
  links = [],
  ctaLabel = 'Contáctanos',
  ctaHref = '/contacto',
  socialLinks = [],
  contactInfo,
  showSearch = true
}: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);

  return (
    <div className="sticky top-0 z-50">
      {/* TOPBAR - Info & Social */}
      <div className="bg-brand-500 border-b border-brand-600/30 hidden lg:block">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-11">
            {/* Left: Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.icon}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label={social.label}
                >
                  <SocialIcon icon={social.icon} />
                </Link>
              ))}
            </div>

            {/* Right: Contact Info */}
            <div className="flex items-center gap-6 text-[13px] text-white/90">
              {contactInfo?.address && (
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-accent-400" />
                  <span>{contactInfo.address}</span>
                </div>
              )}
              {contactInfo?.email && (
                <Link
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail size={14} className="text-accent-400" />
                  <span>{contactInfo.email}</span>
                </Link>
              )}
              {contactInfo?.phone && (
                <Link
                  href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone size={14} className="text-accent-400" />
                  <span>{contactInfo.phone}</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6">
          {/* Desktop Layout */}
          <div className="hidden lg:flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 rounded-lg transition-transform hover:scale-105"
            >
              {logo || (
                <span className="text-2xl font-bold text-brand-600">
                  Cooperativa
                </span>
              )}
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setActiveLink(link.href)}
                  onMouseLeave={() => setActiveLink(null)}
                  className={clsx(
                    "relative px-4 py-2 text-[15px] font-medium transition-all duration-200",
                    "text-neutral-700 hover:text-brand-600",
                    "focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-lg"
                  )}
                >
                  {link.label}
                  {activeLink === link.href && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-600"
                      initial={false}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Right Section: Search + CTA */}
            <div className="flex items-center gap-4">
              {showSearch && (
                <button
                  className="p-2 text-neutral-600 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-brand-500"
                  aria-label="Buscar"
                >
                  <Search size={20} />
                </button>
              )}
              <Button
                variant="primary"
                size="sm"
                className="shadow-sm hover:shadow-md transition-all bg-accent-500 hover:bg-accent-600 text-neutral-900 font-semibold"
                asChild
              >
                <Link href={ctaHref}>{ctaLabel}</Link>
              </Button>
            </div>
          </div>

          {/* Tablet Layout (md to lg) */}
          <div className="hidden md:flex lg:hidden items-center justify-between h-16">
            <Link
              href="/"
              className="flex items-center focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-lg"
            >
              {logo || (
                <span className="text-xl font-bold text-brand-600">
                  Cooperativa
                </span>
              )}
            </Link>

            <div className="flex items-center gap-4">
              {links.slice(0, 3).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-neutral-700 hover:text-brand-600 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 rounded px-2 py-1"
                >
                  {link.label}
                </Link>
              ))}
              <Button variant="primary" size="sm" className="bg-accent-500 hover:bg-accent-600 text-neutral-900" asChild>
                <Link href={ctaHref}>{ctaLabel}</Link>
              </Button>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden flex items-center justify-between h-16">
            <Link
              href="/"
              className="flex items-center focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-lg"
            >
              {logo || (
                <span className="text-lg font-bold text-brand-600">
                  Cooperativa
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-brand-600 hover:bg-brand-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="md:hidden border-t border-neutral-200 bg-white shadow-lg"
          >
            <div className="px-4 py-4 space-y-1 max-w-7xl mx-auto">
              {links.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3.5 text-neutral-700 hover:bg-brand-50 hover:text-brand-700 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-3 space-y-3">
                {showSearch && (
                  <button className="w-full px-4 py-3 text-neutral-700 hover:bg-brand-50 rounded-lg font-medium transition-all flex items-center gap-2">
                    <Search size={18} />
                    <span>Buscar</span>
                  </button>
                )}
                <Button variant="primary" fullWidth className="bg-accent-500 hover:bg-accent-600 text-neutral-900 font-semibold" asChild>
                  <Link href={ctaHref} onClick={() => setMobileMenuOpen(false)}>
                    {ctaLabel}
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
