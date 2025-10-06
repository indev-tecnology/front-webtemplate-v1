# HighlightSlider Component

Componente de slider/flayer destacado con diseño full-width, responsive, elementos abstractos 3D y animaciones suaves.

## Características

- ✨ Diseño full-width responsive
- 🎨 Gradientes dinámicos basados en el tone de cada slide
- 🎭 Elementos decorativos 3D flotantes
- 🎬 Animaciones suaves (Ken Burns, fade-in, float)
- ♿ Accesible (ARIA labels, navegación por teclado)
- 📱 Optimizado para móviles y desktop
- ⚡ Autoplay configurable
- 🎯 Badge opcional
- 🔘 Navegación con flechas e indicadores

## Uso básico

```tsx
import HighlightSlider from '@/presentation/web-ui/shared/HighlightSlider';

const slides = [
  {
    title: 'Transformando vidas en Colombia',
    description: 'Apoyamos a comunidades vulnerables con programas de educación, salud y desarrollo sostenible.',
    image: '/images/highlight-1.jpg',
    cta: {
      label: 'Conoce más',
      href: '/programas',
    },
    badge: 'Nuevo programa',
    tone: '#E63946', // Rojo solidario
  },
  {
    title: 'Juntos construimos futuro',
    description: 'Únete a nuestra red de voluntarios y marca la diferencia en tu comunidad.',
    image: '/images/highlight-2.jpg',
    cta: {
      label: 'Voluntariado',
      href: '/voluntariado',
    },
    tone: '#2A9D8F', // Verde esperanza
  },
];

export default function HomePage() {
  return (
    <HighlightSlider
      slides={slides}
      autoplay={true}
      autoplayInterval={6000}
    />
  );
}
```

## Props

### HighlightSliderProps

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `slides` | `HighlightSlide[]` | **required** | Array de slides a mostrar |
| `autoplay` | `boolean` | `true` | Activar reproducción automática |
| `autoplayInterval` | `number` | `5000` | Intervalo en ms entre slides |
| `className` | `string` | `''` | Clases CSS adicionales |

### HighlightSlide

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `title` | `string` | Título principal del slide |
| `description` | `string` | Descripción o subtítulo |
| `image` | `string` | URL de la imagen de fondo |
| `cta` | `{ label: string, href: string }` | Call-to-action button |
| `badge` | `string?` | Badge opcional superior |
| `tone` | `string` | Color hex principal (ej: '#E63946') |

## Paleta de colores sugerida (Sector solidario)

```tsx
const solidarityColors = {
  red: '#E63946',      // Urgencia, salud
  green: '#2A9D8F',    // Esperanza, medio ambiente
  blue: '#457B9D',     // Confianza, educación
  orange: '#F77F00',   // Energía, comunidad
  purple: '#7209B7',   // Creatividad, cultura
  teal: '#06AED5',     // Agua, saneamiento
};
```

## Ejemplos de uso sectorial

### Salud
```tsx
{
  title: 'Salud para todos',
  description: 'Brigadas médicas gratuitas en zonas rurales',
  tone: '#E63946',
  badge: 'Activo',
  // ...
}
```

### Educación
```tsx
{
  title: 'Educación sin fronteras',
  description: 'Becas y herramientas para niños de bajos recursos',
  tone: '#457B9D',
  badge: 'Inscripciones abiertas',
  // ...
}
```

### Medio ambiente
```tsx
{
  title: 'Planeta sostenible',
  description: 'Reforestación y reciclaje comunitario',
  tone: '#2A9D8F',
  // ...
}
```

## Accesibilidad

- Usa etiquetas ARIA (`aria-label`)
- Navegación por teclado habilitada
- Contraste de color adecuado (WCAG AA)
- Indicadores visuales claros
- Estados de deshabilitado durante transiciones

## Optimización de imágenes

Asegúrate de usar Next.js Image optimization:
- Formato WebP/AVIF
- Tamaño recomendado: 1920x700px
- Calidad: 80-90

## Personalización

Puedes modificar las animaciones editando las keyframes en el `<style jsx>`:

```tsx
@keyframes ken-burns {
  0% { transform: scale(1); }
  100% { transform: scale(1.1); }
}
```

## Compatibilidad

- Next.js 13+ (App Router)
- React 18+
- Tailwind CSS 3+
- TypeScript 5+
