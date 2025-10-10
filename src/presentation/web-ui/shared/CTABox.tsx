"use client";

import React from "react";
import { Shield, HelpCircle, Star, Info, Mail, Phone, FileText } from "lucide-react";

const iconMap = {
  Shield,
  HelpCircle,
  Star,
  Info,
  Mail,
  Phone,
  FileText,
} as const;

export type IconName = keyof typeof iconMap;

export interface CTAButton {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
}

export interface CTABoxProps {
  icon?: IconName;
  title: string;
  description: string;
  primaryButton?: CTAButton;
  secondaryButton?: CTAButton;
  variant?: "green" | "neutral" | "accent";
  infoBoxes?: Array<{
    label: string;
    value: string;
  }>;
}

/**
 * CTABox - Componente estandarizado para llamados a la acción
 *
 * Uso en diferentes páginas manteniendo consistencia visual
 * del sector solidario con colores suaves y minimalistas.
 *
 * @example
 * ```tsx
 * <CTABox
 *   icon="Shield"
 *   title="Información Adicional"
 *   description="Si requiere más información..."
 *   variant="green"
 *   primaryButton={{ label: "Contáctanos", href: "/contacto" }}
 *   secondaryButton={{ label: "Ver servicios", href: "/services" }}
 *   infoBoxes={[
 *     { label: "Atención", value: "Lun - Vie: 8:00 AM - 5:00 PM" },
 *     { label: "Email", value: "contacto@cooperativa.com" }
 *   ]}
 * />
 * ```
 */
export const CTABox = ({
  icon,
  title,
  description,
  primaryButton,
  secondaryButton,
  variant = "green",
  infoBoxes,
}: CTABoxProps) => {
  const Icon = icon ? iconMap[icon] : null;

  const variantStyles = {
    green: {
      container: "bg-gradient-to-br from-brand-50 via-white to-brand-50/50 border-brand-200",
      iconBg: "bg-brand-100 border-brand-200",
      iconColor: "text-brand-700",
      title: "text-brand-900",
      description: "text-neutral-700",
      infoBox: "bg-white border-brand-100",
      primaryBtn: "bg-brand-600 hover:bg-brand-700 text-white",
      secondaryBtn: "border-brand-300 hover:border-brand-400 hover:bg-brand-50 text-brand-700",
    },
    neutral: {
      container: "bg-gradient-to-br from-neutral-50 via-white to-neutral-50/50 border-neutral-200",
      iconBg: "bg-neutral-100 border-neutral-200",
      iconColor: "text-neutral-600",
      title: "text-neutral-900",
      description: "text-neutral-600",
      infoBox: "bg-white border-neutral-200",
      primaryBtn: "bg-neutral-800 hover:bg-neutral-900 text-white",
      secondaryBtn: "border-neutral-300 hover:border-neutral-400 hover:bg-neutral-50 text-neutral-700",
    },
    accent: {
      container: "bg-gradient-to-br from-accent-50 via-white to-accent-50/50 border-accent-200",
      iconBg: "bg-accent-100 border-accent-200",
      iconColor: "text-accent-700",
      title: "text-neutral-900",
      description: "text-neutral-700",
      infoBox: "bg-white border-accent-100",
      primaryBtn: "bg-accent-600 hover:bg-accent-700 text-neutral-900",
      secondaryBtn: "border-accent-300 hover:border-accent-400 hover:bg-accent-50 text-accent-800",
    },
  };

  const styles = variantStyles[variant];

  return (
    <div className={`border rounded-xl p-8 ${styles.container}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-start gap-6 mb-6">
          {Icon && (
            <div className={`w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 border ${styles.iconBg}`}>
              <Icon className={`w-7 h-7 ${styles.iconColor}`} />
            </div>
          )}
          <div className="flex-1">
            <h2 className={`text-xl font-bold mb-2 ${styles.title}`}>
              {title}
            </h2>
            <p className={`text-sm leading-relaxed ${styles.description}`}>
              {description}
            </p>
          </div>
        </div>

        {/* Info Boxes */}
        {infoBoxes && infoBoxes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 pt-6 border-t border-neutral-200">
            {infoBoxes.map((box, index) => (
              <div key={index} className={`rounded-lg p-4 border ${styles.infoBox}`}>
                <p className="text-xs font-medium text-neutral-500 mb-1">{box.label}</p>
                <p className="text-sm text-neutral-900 font-semibold">{box.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Buttons */}
        {(primaryButton || secondaryButton) && (
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {primaryButton && (
              <a
                href={primaryButton.href}
                className={`inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium rounded-lg transition-colors ${styles.primaryBtn}`}
              >
                {primaryButton.label}
              </a>
            )}
            {secondaryButton && (
              <a
                href={secondaryButton.href}
                className={`inline-flex items-center justify-center px-6 py-2.5 border text-sm font-medium rounded-lg transition-colors ${styles.secondaryBtn}`}
              >
                {secondaryButton.label}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CTABox;
