"use client";

import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

type ToneKey = 'blue' | 'teal' | 'green' | 'violet' | 'coral' | 'sun' | 'warm' | 'muted';

// Conjunto de clases por tono para evitar purga de Tailwind (clases dinámicas)
const toneMap: Record<ToneKey, {
  // Textos
  text500: string;
  text600: string;
  text600GH: string; // group-hover:text-*
  // Bordes
  border200: string;
  hoverBorder200: string;
  // Gradientes suaves y fuertes
  from50: string; to50: string;
  from100: string; to100: string;
  from200_30: string; to200_30: string;
  via100_50: string;
  from500: string; to500: string;
  // Fondos discretos
  bg50: string; bg100: string;
}> = {
  blue:   { text500:'text-tone-blue-500', text600:'text-tone-blue-600', text600GH:'group-hover:text-tone-blue-600', border200:'border-tone-blue-200', hoverBorder200:'hover:border-tone-blue-200', from50:'from-tone-blue-50', to50:'to-tone-blue-50', from100:'from-tone-blue-100', to100:'to-tone-blue-100', from200_30:'from-tone-blue-200/30', to200_30:'to-tone-blue-200/30', via100_50:'via-tone-blue-100/50', from500:'from-tone-blue-500', to500:'to-tone-blue-500', bg50:'bg-tone-blue-50', bg100:'bg-tone-blue-100' },
  teal:   { text500:'text-tone-teal-500', text600:'text-tone-teal-600', text600GH:'group-hover:text-tone-teal-600', border200:'border-tone-teal-200', hoverBorder200:'hover:border-tone-teal-200', from50:'from-tone-teal-50', to50:'to-tone-teal-50', from100:'from-tone-teal-100', to100:'to-tone-teal-100', from200_30:'from-tone-teal-200/30', to200_30:'to-tone-teal-200/30', via100_50:'via-tone-teal-100/50', from500:'from-tone-teal-500', to500:'to-tone-teal-500', bg50:'bg-tone-teal-50', bg100:'bg-tone-teal-100' },
  green:  { text500:'text-tone-green-500', text600:'text-tone-green-600', text600GH:'group-hover:text-tone-green-600', border200:'border-tone-green-200', hoverBorder200:'hover:border-tone-green-200', from50:'from-tone-green-50', to50:'to-tone-green-50', from100:'from-tone-green-100', to100:'to-tone-green-100', from200_30:'from-tone-green-200/30', to200_30:'to-tone-green-200/30', via100_50:'via-tone-green-100/50', from500:'from-tone-green-500', to500:'to-tone-green-500', bg50:'bg-tone-green-50', bg100:'bg-tone-green-100' },
  violet: { text500:'text-tone-violet-500', text600:'text-tone-violet-600', text600GH:'group-hover:text-tone-violet-600', border200:'border-tone-violet-200', hoverBorder200:'hover:border-tone-violet-200', from50:'from-tone-violet-50', to50:'to-tone-violet-50', from100:'from-tone-violet-100', to100:'to-tone-violet-100', from200_30:'from-tone-violet-200/30', to200_30:'to-tone-violet-200/30', via100_50:'via-tone-violet-100/50', from500:'from-tone-violet-500', to500:'to-tone-violet-500', bg50:'bg-tone-violet-50', bg100:'bg-tone-violet-100' },
  coral:  { text500:'text-tone-coral-500', text600:'text-tone-coral-600', text600GH:'group-hover:text-tone-coral-600', border200:'border-tone-coral-200', hoverBorder200:'hover:border-tone-coral-200', from50:'from-tone-coral-50', to50:'to-tone-coral-50', from100:'from-tone-coral-100', to100:'to-tone-coral-100', from200_30:'from-tone-coral-200/30', to200_30:'to-tone-coral-200/30', via100_50:'via-tone-coral-100/50', from500:'from-tone-coral-500', to500:'to-tone-coral-500', bg50:'bg-tone-coral-50', bg100:'bg-tone-coral-100' },
  sun:    { text500:'text-tone-sun-500', text600:'text-tone-sun-600', text600GH:'group-hover:text-tone-sun-600', border200:'border-tone-sun-200', hoverBorder200:'hover:border-tone-sun-200', from50:'from-tone-sun-50', to50:'to-tone-sun-50', from100:'from-tone-sun-100', to100:'to-tone-sun-100', from200_30:'from-tone-sun-200/30', to200_30:'to-tone-sun-200/30', via100_50:'via-tone-sun-100/50', from500:'from-tone-sun-500', to500:'to-tone-sun-500', bg50:'bg-tone-sun-50', bg100:'bg-tone-sun-100' },
  warm:   { text500:'text-tone-warm-500', text600:'text-tone-warm-600', text600GH:'group-hover:text-tone-warm-600', border200:'border-tone-warm-200', hoverBorder200:'hover:border-tone-warm-200', from50:'from-tone-warm-50', to50:'to-tone-warm-50', from100:'from-tone-warm-100', to100:'to-tone-warm-100', from200_30:'from-tone-warm-200/30', to200_30:'to-tone-warm-200/30', via100_50:'via-tone-warm-100/50', from500:'from-tone-warm-500', to500:'to-tone-warm-500', bg50:'bg-tone-warm-50', bg100:'bg-tone-warm-100' },
  muted:  { text500:'text-tone-muted-500', text600:'text-tone-muted-600', text600GH:'group-hover:text-tone-muted-600', border200:'border-tone-muted-200', hoverBorder200:'hover:border-tone-muted-200', from50:'from-tone-muted-50', to50:'to-tone-muted-50', from100:'from-tone-muted-100', to100:'to-tone-muted-100', from200_30:'from-tone-muted-200/30', to200_30:'to-tone-muted-200/30', via100_50:'via-tone-muted-100/50', from500:'from-tone-muted-500', to500:'to-tone-muted-500', bg50:'bg-tone-muted-50', bg100:'bg-tone-muted-100' },
};

const getTone = (key?: string, fallback: ToneKey = 'violet') => {
  const k = (key as ToneKey) || fallback;
  return toneMap[k] ?? toneMap[fallback];
};

export interface FeatureItem {
  image: string; // emoji o url http
  badge?: string;
  label: string;
  cta: string; // hash o url absoluta/relativa
}

export interface FeatureLinksProps {
  items?: FeatureItem[];
  tonePrimary?: ToneKey;   // para morado por defecto
  toneSecondary?: ToneKey; // para rosa por defecto
}

const FeatureLinks: React.FC<FeatureLinksProps> = ({ items = [], tonePrimary = 'violet', toneSecondary = 'coral' }) => {
  // Datos de ejemplo si no se proporcionan items
  const defaultItems = [
    {
      image: "🚀",
      badge: "Popular",
      label: "Desarrollo Web",
      cta: "#desarrollo-web"
    },
    {
      image: "🎨",
      badge: "Nuevo",
      label: "Diseño UI/UX",
      cta: "#diseno"
    },
    {
      image: "📱",
      label: "Apps Móviles",
      cta: "#mobile"
    },
    {
      image: "⚡",
      badge: "Rápido",
      label: "Optimización",
      cta: "#optimizacion"
    },
    {
      image: "🔒",
      label: "Seguridad",
      cta: "#seguridad"
    },
    {
      image: "📊",
      badge: "Pro",
      label: "Analytics",
      cta: "#analytics"
    }
  ];

  const displayItems: FeatureItem[] = items.length > 0 ? items : defaultItems;

  const handleItemClick = (cta: string) => {
    if (cta.startsWith('#')) {
      const element = document.querySelector(cta);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = cta;
    }
  };

  return (
    <div className={`w-full bg-gradient-to-br ${getTone(tonePrimary).from100} ${getTone(tonePrimary).via100_50} ${getTone(toneSecondary).to100} py-12 px-4 relative overflow-hidden`}>
      {/* Elementos decorativos de fondo */}
      <div className={`absolute top-0 left-0 w-72 h-72 bg-gradient-to-br ${getTone(tonePrimary).from200_30} ${getTone(toneSecondary).to200_30} rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 motion-safe:animate-pulse`}></div>
      <div className={`absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br ${getTone(toneSecondary).from200_30} ${getTone(tonePrimary).to200_30} rounded-full blur-3xl translate-x-1/2 translate-y-1/2 motion-safe:animate-pulse`} style={{animationDelay: '2s'}}></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Encabezado opcional */}

        {/* Contenedor de opciones */}
        <div className="flex flex-wrap justify-center items-center gap-4 lg:gap-6">
          {displayItems.map((item, index) => (
            <div
              key={index}
              onClick={() => handleItemClick(item.cta)}
              role="link"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleItemClick(item.cta); } }}
              className={`group relative flex items-center gap-4 bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-xl rounded-2xl px-6 py-4 cursor-pointer transition-[transform,box-shadow] duration-300 motion-safe:hover:scale-105 motion-safe:hover:-translate-y-1 border border-white/50 ${getTone(tonePrimary).hoverBorder200} w-full sm:w-[calc(50%-0.75rem)] lg:w-auto`}
              style={{
                animationDelay: `${index * 150}ms`,
                animation: `slideInUp 0.6s ease-out forwards`
              }}
            >
              {/* Badge flotante */}
              {item.badge && (
                <div className={`absolute -top-2 -right-2 bg-gradient-to-r ${getTone(tonePrimary).from500} ${getTone(toneSecondary).to500} text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300 z-10`}>
                  {item.badge}
                </div>
              )}

              {/* Efecto de brillo animado */}
              <div className={`absolute inset-0 pointer-events-none will-change-transform will-change-opacity bg-gradient-to-r from-transparent ${getTone(tonePrimary).via100_50} to-transparent opacity-0 group-hover:opacity-100 -skew-x-12 -translate-x-full motion-safe:group-hover:translate-x-full transition-[transform,opacity] duration-700 rounded-2xl`}></div>

              {/* Imagen/Icono */}
              <div className="relative flex-shrink-0">
                <div className={`w-12 h-12 bg-gradient-to-br ${getTone(tonePrimary).from100} ${getTone(toneSecondary).to100} rounded-xl flex items-center justify-center motion-safe:group-hover:rotate-6 motion-safe:group-hover:scale-110 transition-transform duration-300 will-change-transform`}>
                  {typeof item.image === 'string' && item.image.startsWith('http') ? (
                    <img src={item.image} alt={item.label} className="w-8 h-8 object-cover rounded-lg" />
                  ) : (
                    <span className="text-2xl group-hover:animate-bounce">{item.image}</span>
                  )}
                </div>
              </div>

              {/* Contenido */}
              <div className="flex items-center gap-3 min-w-0 relative z-10">
                <div>
                  <h3 className={`text-lg font-semibold text-gray-800 ${getTone(tonePrimary).text600GH} transition-colors duration-200 whitespace-nowrap`}
                  >
                    {item.label}
                  </h3>
                </div>
                
                {/* Flecha */}
                <ArrowRight className={`w-5 h-5 ${getTone(tonePrimary).text500} ${getTone(tonePrimary).text600GH} motion-safe:group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0 will-change-transform`} />
              </div>

              {/* Línea decorativa inferior */}
              <div className={`absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r ${getTone(tonePrimary).from500} ${getTone(toneSecondary).to500} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
            </div>
          ))}
        </div>

        {/* Indicador visual inferior */}
        <div className="flex justify-center mt-8">
          <div className={`w-16 h-1 bg-gradient-to-r ${getTone(tonePrimary).from500} ${getTone(toneSecondary).to500} rounded-full opacity-60`}></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
          }
        }
      `}</style>
    </div>
  );
};

export default FeatureLinks;
