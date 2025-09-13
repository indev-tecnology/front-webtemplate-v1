import React from "react";
import Link from "next/link";
import { Search, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-surface-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-2xl p-6 sm:p-10">
        <div className="grid gap-8 sm:grid-cols-[1.1fr_1fr] items-center">
          {/* Ilustración 404 */}
          <div>
            <svg viewBox="0 0 360 220" className="w-full h-auto">
              <defs>
                <linearGradient id="a1" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#dcfce7" />
                  <stop offset="100%" stopColor="#16a34a" />
                </linearGradient>
                <linearGradient id="a2" x1="0" x2="1" y1="1" y2="0">
                  <stop offset="0%" stopColor="#dbeafe" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
              </defs>
              <rect x="0" y="170" width="360" height="50" rx="14" fill="#f1f5f9" />
              <g opacity="0.9">
                <path d="M30 110 h40 v-30 h20 v30 h40 v20 h-40 v30 h-20 v-30 h-40z" fill="url(#a1)" opacity="0.5" />
                <circle cx="180" cy="120" r="26" fill="url(#a2)" opacity="0.7" />
                <path d="M210 110 h40 v-30 h20 v30 h40 v20 h-40 v30 h-20 v-30 h-40z" fill="url(#a1)" opacity="0.5" />
              </g>
              <g transform="translate(150,70)">
                <circle r="28" fill="#fff" stroke="#e2e8f0" />
                <circle cx="-9" cy="-2" r="3" fill="#334155" />
                <circle cx="9" cy="-2" r="3" fill="#334155" />
                <path d="M -10 10 Q 0 14 10 10" stroke="#334155" strokeWidth="2.5" fill="none" />
              </g>
            </svg>
          </div>
          {/* Texto y acciones */}
          <div>
            <span className="inline-block text-xs font-semibold tracking-wide text-tone-green-600 bg-tone-green-50 px-2 py-1 rounded-full">404 • Página no encontrada</span>
            <h1 className="mt-3 text-2xl sm:text-3xl font-bold text-ink-0">No pudimos encontrar lo que buscas</h1>
            <p className="mt-2 text-gray-600">La URL puede haber cambiado o el contenido ya no está disponible. Te proponemos volver al inicio o explorar secciones populares.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/" className="inline-flex items-center gap-2 rounded-md bg-brand-600 text-white px-4 py-2 text-sm hover:bg-brand-700">
                <Home className="h-4 w-4" /> Ir al inicio
              </Link>
              <Link href="/services" className="inline-flex items-center gap-2 rounded-md border border-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                <Search className="h-4 w-4" /> Ver servicios
              </Link>
              <Link href="/noticias" className="inline-flex items-center gap-2 rounded-md border border-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                <ArrowLeft className="h-4 w-4 rotate-180" /> Novedades
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

