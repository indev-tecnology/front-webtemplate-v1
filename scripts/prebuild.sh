#!/usr/bin/env bash
set -euo pipefail

echo "Node: $(node -v)"
echo "npm:  $(npm -v)"

# 1) Validación de variables
: "${MONGODB_URI:?MONGODB_URI es requerida para build/SSR}"
export NEXT_PUBLIC_BASE_URL="${NEXT_PUBLIC_BASE_URL:-''}"

echo "REVALIDATE_SECRET: ${REVALIDATE_SECRET:+<set>}"
echo "NEXT_PUBLIC_BASE_URL: '${NEXT_PUBLIC_BASE_URL}'"

# 2) Instalación + lint + build (estilo Vercel)
npm ci

# Ejecutar lint sólo si ESLint está disponible y no se ha indicado saltarlo
if [ "${NEXT_DISABLE_ESLINT:-0}" = "1" ] || [ "${VERCEL:-}" = "1" ]; then
  echo "Omitiendo lint en build (NEXT_DISABLE_ESLINT/VERCEL)."
else
  if npx --no-install eslint -v >/dev/null 2>&1; then
    npm run lint || echo "Lint con warnings/errores. Continúo build."
  else
    echo "ESLint no instalado. Omitiendo lint."
  fi
fi

CI=1 NEXT_PUBLIC_BASE_URL='' npm run build

echo "OK: Build pasó con configuración estilo Vercel"
