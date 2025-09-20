"use client";

import { useState } from "react";
import { Send, Phone, Mail } from "lucide-react";
import { ToneKey } from "@/shared/tone";

export interface ContactCardData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface ContactCardProps {
  title?: string;
  subtitle?: string;
  tone?:ToneKey
  onSubmit?: (data: ContactCardData) => Promise<void> | void;
  submittingText?: string;
  submitLabel?: string;
  className?: string;
  email?: string;
  phone?: string;
}

const toneMap: Record<NonNullable<ContactCardProps["tone"]>, { accent: string; button: string; buttonHover: string; bubble: string; overlay: string }> = {
  brand: {
    accent: "text-brand-600",
    button: "bg-brand-600",
    buttonHover: "hover:bg-brand-500",
    bubble: "bg-brand-500/15",
    overlay: "bg-brand-500/10",
  },
  blue: {
    accent: "text-tone-blue-600",
    button: "bg-tone-blue-600",
    buttonHover: "hover:bg-tone-blue-500",
    bubble: "bg-tone-blue-500/15",
    overlay: "bg-tone-blue-500/10",
  },
  teal: {
    accent: "text-tone-teal-600",
    button: "bg-tone-teal-600",
    buttonHover: "hover:bg-tone-teal-500",
    bubble: "bg-tone-teal-500/15",
    overlay: "bg-tone-teal-500/10",
  },
  green: {
    accent: "text-tone-green-600",
    button: "bg-tone-green-600",
    buttonHover: "hover:bg-tone-green-500",
    bubble: "bg-tone-green-500/15",
    overlay: "bg-tone-green-500/10",
  },
  violet: {
    accent: "text-tone-violet-600",
    button: "bg-tone-violet-600",
    buttonHover: "hover:bg-tone-violet-500",
    bubble: "bg-tone-violet-500/15",
    overlay: "bg-tone-violet-500/10",
  },
  coral: {
    accent: "text-tone-coral-600",
    button: "bg-tone-coral-600",
    buttonHover: "hover:bg-tone-coral-500",
    bubble: "bg-tone-coral-500/15",
    overlay: "bg-tone-coral-500/10",
  },
  sun: {
    accent: "text-tone-sun-600",
    button: "bg-tone-sun-500",
    buttonHover: "hover:bg-tone-sun-400",
    bubble: "bg-tone-sun-500/15",
    overlay: "bg-tone-sun-500/10",
  },
  warm: {
    accent: "text-tone-warm-600",
    button: "bg-tone-warm-600",
    buttonHover: "hover:bg-tone-warm-500",
    bubble: "bg-tone-warm-500/15",
    overlay: "bg-tone-warm-500/10",
  },
  muted: {
    accent: "text-tone-muted-700",
    button: "bg-tone-muted-700",
    buttonHover: "hover:bg-tone-muted-600",
    bubble: "bg-tone-muted-500/15",
    overlay: "bg-tone-muted-500/10",
  },
};

export function ContactCard({
  title = "¿Listo para conversar?",
  subtitle = "Déjanos tus datos y uno de nuestros asesores se comunicará contigo.",
  tone = "teal",
  onSubmit,
  submittingText = "Enviando...",
  submitLabel = "Enviar mensaje",
  className = "",
  email,
  phone,
}: ContactCardProps) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const toneStyles = toneMap[tone];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      return;
    }

    try {
      setSending(true);
      setStatus("idle");
      await onSubmit?.({
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        message: form.message,
      });
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <div className="relative grid gap-8">
        <div className={`pointer-events-none absolute -left-16 top-10 hidden h-28 w-28 rounded-full blur-2xl md:block ${toneStyles.bubble}`} />

        <div className="relative grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          <div className="flex flex-col gap-4">
            <span className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] ${toneStyles.accent}`}>
              <Send className="h-4 w-4" />
              Contáctanos
            </span>
            <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">{title}</h2>
            <p className="text-sm text-slate-600 md:text-base">{subtitle}</p>

            <div className="mt-4 grid gap-3 text-sm text-slate-600">
              <div className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-sm backdrop-blur">
                <Mail className={`h-5 w-5 ${toneStyles.accent}`} />
                {email ? (
                  <div className="flex flex-wrap items-center gap-1">
                    <a href={`mailto:${email}`} className="font-medium text-slate-800 hover:underline">{email}</a>
                    <span className="text-slate-500">— Respondemos en menos de 24 horas.</span>
                  </div>
                ) : (
                  <span>Escríbenos y respondemos en menos de 24 horas.</span>
                )}
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-sm backdrop-blur">
                <Phone className={`h-5 w-5 ${toneStyles.accent}`} />
                {phone ? (
                  <div className="flex flex-wrap items-center gap-1">
                    <a href={`tel:${phone.replace(/\s+/g, '')}`} className="font-medium text-slate-800 hover:underline">{phone}</a>
                    <span className="text-slate-500">— También podemos agendar una llamada.</span>
                  </div>
                ) : (
                  <span>También podemos agendar una llamada estratégica.</span>
                )}
              </div>
            </div>
          </div>

          <form
            className="relative z-10 grid gap-4 rounded-2xl border border-white/80 bg-white/85 p-6 shadow-lg backdrop-blur-lg"
            onSubmit={handleSubmit}
          >
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-semibold text-slate-700">
                Nombre completo
              </label>
              <input
                id="name"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Ingresa tu nombre"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-slate-300"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-semibold text-slate-700">
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="tucorreo@dominio.com"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-slate-300"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="phone" className="text-sm font-semibold text-slate-700">
                Número de contacto
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="(XXX) XXX-XXXX"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-slate-300"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="message" className="text-sm font-semibold text-slate-700">
                Cuéntanos cómo podemos ayudarte
              </label>
              <textarea
                id="message"
                name="message"
                required
                value={form.message}
                onChange={handleChange}
                placeholder="Escribe los detalles de tu consulta o proyecto"
                rows={4}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-slate-300"
              />
            </div>

          <div className="flex items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              Al enviar tus datos aceptas nuestra política de privacidad.
            </p>
            <button
              type="submit"
              disabled={sending}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-colors disabled:opacity-60 ${toneStyles.button} ${toneStyles.buttonHover}`}
            >
              <Send className="h-4 w-4" />
              {sending ? submittingText : submitLabel}
            </button>
          </div>

          {status === "success" && (
            <p className="rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-600">
              ¡Gracias! Hemos recibido tu mensaje.
            </p>
          )}
          {status === "error" && (
            <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-600">
              Ocurrió un error al enviar. Intenta nuevamente.
            </p>
          )}
        </form>
      </div>
    </div>
    </>
  );
}

export default ContactCard;
