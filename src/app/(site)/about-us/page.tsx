// src/presentation/sections/SobreNosotros.tsx
import { Button } from "@/presentation/components/ui/Button"; // suponiendo un wrapper
import { Users, Target, Lightbulb } from "lucide-react";

export const revalidate = 86400;

export default function AboutUsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-gradient-to-r from-blue-50 to-white">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Sobre Nosotros
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Somos una organización comprometida con generar impacto positivo
            mediante innovación y colaboración.
          </p>
          <div className="mt-6">
            <Button href="/servicios">Conoce nuestros servicios</Button>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-semibold text-center mb-10">
          Nuestra esencia
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl border p-6 text-center shadow-sm hover:shadow-md transition">
            <Target className="mx-auto h-10 w-10 text-blue-600 mb-4" />
            <h3 className="font-semibold text-lg">Misión</h3>
            <p className="text-sm text-gray-600 mt-2">
              Impulsar el desarrollo sostenible a través de soluciones
              tecnológicas y humanas.
            </p>
          </div>
          <div className="rounded-2xl border p-6 text-center shadow-sm hover:shadow-md transition">
            <Lightbulb className="mx-auto h-10 w-10 text-blue-600 mb-4" />
            <h3 className="font-semibold text-lg">Visión</h3>
            <p className="text-sm text-gray-600 mt-2">
              Ser referente en innovación y en el impacto positivo en la
              sociedad.
            </p>
          </div>
          <div className="rounded-2xl border p-6 text-center shadow-sm hover:shadow-md transition">
            <Users className="mx-auto h-10 w-10 text-blue-600 mb-4" />
            <h3 className="font-semibold text-lg">Valores</h3>
            <p className="text-sm text-gray-600 mt-2">
              Compromiso, transparencia, colaboración y excelencia.
            </p>
          </div>
        </div>
      </section>

      {/* Historia */}
      <section className="bg-gray-50 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-semibold mb-8 text-center">
            Nuestra historia
          </h2>
          <ol className="relative border-l border-gray-200">
            <li className="mb-10 ml-6">
              <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-sm">2015</span>
              <h3 className="font-semibold">Fundación</h3>
              <p className="text-sm text-gray-600">Iniciamos con un equipo de entusiastas de la tecnología.</p>
            </li>
            <li className="mb-10 ml-6">
              <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-sm">2020</span>
              <h3 className="font-semibold">Expansión</h3>
              <p className="text-sm text-gray-600">Abrimos operaciones internacionales y proyectos con impacto global.</p>
            </li>
            <li className="ml-6">
              <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-sm">2025</span>
              <h3 className="font-semibold">Presente</h3>
              <p className="text-sm text-gray-600">Seguimos creciendo y construyendo un futuro sostenible.</p>
            </li>
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white px-6 py-16">
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <h2 className="text-3xl font-bold">¿Quieres trabajar con nosotros?</h2>
          <p className="text-lg text-blue-100">
            Únete a nuestra red de colaboradores y construyamos juntos el futuro.
          </p>
          <Button href="/contacto" variant="light">
            Contáctanos
          </Button>
        </div>
      </section>
    </div>
  );
}
