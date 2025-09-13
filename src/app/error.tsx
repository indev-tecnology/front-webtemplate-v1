"use client";
import React from "react";
import Link from "next/link";
import { RefreshCw, Home } from "lucide-react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const message = error?.message || "Algo salió mal";
  return (
    <html>
      <body className="min-h-screen bg-surface-50 flex items-center justify-center p-6">
        <div className="max-w-3xl w-full bg-white rounded-2xl p-6 sm:p-8">
          <div className="grid gap-6 sm:grid-cols-[1fr_1.2fr] items-center">
            {/* Ilustración simple con SVG responsivo */}
            <div className="order-last sm:order-first">
              <svg viewBox="0 0 300 220" className="w-full h-auto">
                <defs>
                  <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="#bfdbfe" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" x2="1" y1="1" y2="0">
                    <stop offset="0%" stopColor="#fde68a" />
                    <stop offset="100%" stopColor="#f97316" />
                  </linearGradient>
                </defs>
                <rect x="0" y="160" width="300" height="60" rx="12" fill="#f1f5f9" />
                <circle cx="70" cy="80" r="58" fill="url(#g1)" opacity="0.25" />
                <circle cx="230" cy="70" r="42" fill="url(#g2)" opacity="0.25" />
                <g>
                  <rect x="40" y="110" width="220" height="60" rx="12" fill="#fff" stroke="#e2e8f0" />
                  <rect x="55" y="125" width="120" height="10" rx="5" fill="#94a3b8" />
                  <rect x="55" y="142" width="90" height="8" rx="4" fill="#cbd5e1" />
                  <rect x="185" y="125" width="60" height="24" rx="12" fill="#e2e8f0" />
                </g>
                {/* Carita/estado */}
                <g transform="translate(115,55)">
                  <circle r="28" fill="#fff" stroke="#e2e8f0" />
                  <circle cx="-10" cy="-2" r="3" fill="#334155" />
                  <circle cx="10" cy="-2" r="3" fill="#334155" />
                  <path d="M -10 10 Q 0 4 10 10" stroke="#ef4444" strokeWidth="2.5" fill="none" />
                </g>
              </svg>
            </div>
            {/* Contenido */}
            <div className="space-y-3">
              <span className="inline-block text-xs font-semibold tracking-wide text-tone-warm-600 bg-tone-warm-50 px-2 py-1 rounded-full">Error inesperado</span>
              <h1 className="text-2xl sm:text-3xl font-bold text-ink-0">Lo sentimos, ocurrió un problema</h1>
              <p className="text-gray-600">{message}</p>
              {error?.digest && (
                <p className="text-xs text-gray-400">Código de referencia: {error.digest}</p>
              )}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => reset()}
                  className="inline-flex items-center gap-2 rounded-md bg-tone-blue-600 text-white px-4 py-2 text-sm hover:bg-tone-blue-700"
                >
                  <RefreshCw className="h-4 w-4" /> Reintentar
                </button>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-md border border-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Home className="h-4 w-4" /> Ir al inicio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

