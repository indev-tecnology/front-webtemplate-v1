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
npm run lint
CI=1 NEXT_PUBLIC_BASE_URL='' npm run build

echo "OK: Build pasó con configuración estilo Vercel"
