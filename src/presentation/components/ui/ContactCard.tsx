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
  tone?: ToneKey;
  onSubmit?: (data: ContactCardData) => Promise<void> | void;
  submittingText?: string;
  submitLabel?: string;
  className?: string;
  email?: string;
  phone?: string;
}

const toneMap: Record<
  NonNullable<ContactCardProps["tone"]>,
  {
    accent: string;
    button: string;
    buttonHover: string;
    buttonFocus: string;
    bubble: string;
    overlay: string;
    ring: string;
  }
> = {
  brand: {
    accent: "text-brand-600",
    button: "bg-brand-600",
    buttonHover: "hover:bg-brand-500",
    buttonFocus: "focus-visible:ring-brand-400/70",
    bubble: "bg-brand-500/15",
    overlay: "bg-brand-500/10",
    ring: "focus:ring-brand-400/50",
  },
  blue: {
    accent: "text-tone-blue-600",
    button: "bg-tone-blue-600",
    buttonHover: "hover:bg-tone-blue-500",
    buttonFocus: "focus-visible:ring-tone-blue-400/70",
    bubble: "bg-tone-blue-500/15",
    overlay: "bg-tone-blue-500/10",
    ring: "focus:ring-tone-blue-400/50",
  },
  teal: {
    accent: "text-tone-teal-600",
    button: "bg-tone-teal-600",
    buttonHover: "hover:bg-tone-teal-500",
    buttonFocus: "focus-visible:ring-tone-teal-400/70",
    bubble: "bg-tone-teal-500/15",
    overlay: "bg-tone-teal-500/10",
    ring: "focus:ring-tone-teal-400/50",
  },
  green: {
    accent: "text-tone-green-600",
    button: "bg-tone-green-600",
    buttonHover: "hover:bg-tone-green-500",
    buttonFocus: "focus-visible:ring-tone-green-400/70",
    bubble: "bg-tone-green-500/15",
    overlay: "bg-tone-green-500/10",
    ring: "focus:ring-tone-green-400/50",
  },
  violet: {
    accent: "text-tone-violet-600",
    button: "bg-tone-violet-600",
    buttonHover: "hover:bg-tone-violet-500",
    buttonFocus: "focus-visible:ring-tone-violet-400/70",
    bubble: "bg-tone-violet-500/15",
    overlay: "bg-tone-violet-500/10",
    ring: "focus:ring-tone-violet-400/50",
  },
  coral: {
    accent: "text-tone-coral-600",
    button: "bg-tone-coral-600",
    buttonHover: "hover:bg-tone-coral-500",
    buttonFocus: "focus-visible:ring-tone-coral-400/70",
    bubble: "bg-tone-coral-500/15",
    overlay: "bg-tone-coral-500/10",
    ring: "focus:ring-tone-coral-400/50",
  },
  sun: {
    accent: "text-tone-sun-600",
    button: "bg-tone-sun-500",
    buttonHover: "hover:bg-tone-sun-400",
    buttonFocus: "focus-visible:ring-tone-sun-400/70",
    bubble: "bg-tone-sun-500/15",
    overlay: "bg-tone-sun-500/10",
    ring: "focus:ring-tone-sun-400/50",
  },
  warm: {
    accent: "text-tone-warm-600",
    button: "bg-tone-warm-600",
    buttonHover: "hover:bg-tone-warm-500",
    buttonFocus: "focus-visible:ring-tone-warm-400/70",
    bubble: "bg-tone-warm-500/15",
    overlay: "bg-tone-warm-500/10",
    ring: "focus:ring-tone-warm-400/50",
  },
  muted: {
    accent: "text-tone-muted-700",
    button: "bg-tone-muted-700",
    buttonHover: "hover:bg-tone-muted-600",
    buttonFocus: "focus-visible:ring-tone-muted-500/70",
    bubble: "bg-tone-muted-500/15",
    overlay: "bg-tone-muted-500/10",
    ring: "focus:ring-tone-muted-500/40",
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
    <section
      className={`relative overflow-hidden rounded-[2.25rem] border border-slate-200/70 bg-transparent p-6 md:p-10 ${className}`}
    >
      <div className={`pointer-events-none absolute -left-24 top-10 hidden h-56 w-56 rounded-full blur-3xl md:block ${toneStyles.bubble}`} />
      <div className={`pointer-events-none absolute -right-24 bottom-6 hidden h-60 w-60 rounded-full blur-3xl md:block ${toneStyles.overlay}`} />

      <div className="relative grid items-start gap-10 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-8 rounded-[1.75rem] border border-slate-200/70 bg-white/90 p-6 shadow-[0_25px_60px_-35px_rgba(15,23,42,0.25)] backdrop-blur">
          <div className="space-y-4">
            <span className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] ${toneStyles.accent}`}>
              <Send className="h-4 w-4" />
              Contáctanos
            </span>
            <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">{title}</h2>
            <p className="max-w-md text-sm text-slate-600 md:text-base">{subtitle}</p>
          </div>

          <div className="grid gap-4 text-sm text-slate-600">
            <div className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-3.5 shadow-sm shadow-black/5">
              <Mail className={`mt-0.5 h-5 w-5 flex-none ${toneStyles.accent}`} />
              {email ? (
                <div className="space-y-0.5">
                  <a href={`mailto:${email}`} className="text-sm font-medium text-slate-900 transition-colors hover:text-slate-700 hover:underline">
                    {email}
                  </a>
                  <p className="text-xs text-slate-500">Respondemos en menos de 24 horas.</p>
                </div>
              ) : (
                <span>Escríbenos y respondemos en menos de 24 horas.</span>
              )}
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-3.5 shadow-sm shadow-black/5">
              <Phone className={`mt-0.5 h-5 w-5 flex-none ${toneStyles.accent}`} />
              {phone ? (
                <div className="space-y-0.5">
                  <a
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className="text-sm font-medium text-slate-900 transition-colors hover:text-slate-700 hover:underline"
                  >
                    {phone}
                  </a>
                  <p className="text-xs text-slate-500">Podemos agendar una llamada estratégica.</p>
                </div>
              ) : (
                <span>También podemos agendar una llamada estratégica.</span>
              )}
            </div>
          </div>
        </div>

        <form
          className="relative z-10 flex flex-col gap-5 rounded-[1.75rem] border border-slate-200/80 bg-white/95 p-6 shadow-[0_25px_60px_-35px_rgba(15,23,42,0.25)] backdrop-blur md:p-8"
          onSubmit={handleSubmit}
        >
          <div className="grid gap-2">
            <label htmlFor="name" className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Nombre completo
            </label>
            <input
              id="name"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Ingresa tu nombre"
              className={`w-full rounded-xl border border-slate-200 bg-white/95 px-4 py-3 text-sm text-slate-900 transition focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-white ${toneStyles.ring}`}
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="email" className="text-xs font-medium uppercase tracking-wide text-slate-500">
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
              className={`w-full rounded-xl border border-slate-200 bg-white/95 px-4 py-3 text-sm text-slate-900 transition focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-white ${toneStyles.ring}`}
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="phone" className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Número de contacto
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="(XXX) XXX-XXXX"
              className={`w-full rounded-xl border border-slate-200 bg-white/95 px-4 py-3 text-sm text-slate-900 transition focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-white ${toneStyles.ring}`}
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="message" className="text-xs font-medium uppercase tracking-wide text-slate-500">
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
              className={`w-full rounded-xl border border-slate-200 bg-white/95 px-4 py-3 text-sm text-slate-900 transition focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-white ${toneStyles.ring}`}
            />
          </div>

          <div className="flex flex-col gap-4 pt-2 md:flex-row md:items-center md:justify-between">
            <p className="text-xs text-slate-500">
              Al enviar tus datos aceptas nuestra política de privacidad.
            </p>
            <button
              type="submit"
              disabled={sending}
              className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all disabled:opacity-60 disabled:grayscale focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${toneStyles.button} ${toneStyles.buttonHover} ${toneStyles.buttonFocus}`}
            >
              <Send className="h-4 w-4" />
              {sending ? submittingText : submitLabel}
            </button>
          </div>

          {status === "success" && (
            <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              ¡Gracias! Hemos recibido tu mensaje.
            </p>
          )}
          {status === "error" && (
            <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
              Ocurrió un error al enviar. Intenta nuevamente.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export default ContactCard;
