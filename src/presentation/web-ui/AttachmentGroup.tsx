"use client";

import React, { useCallback, useState } from "react";
import { Card } from "@/presentation/web-ui/Card";
import { fmtMB } from "@/shared/bytes";
import { ClipboardCopyIcon } from "lucide-react";
import { guessKind, kindIcon, kindTone } from "@/presentation/web-ui/attachmentUtils";
import { toDate } from '@/shared/date';

const getRelativeTime = (value: any) => {
  const d = toDate(value || new Date());
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Hoy';
  if (diffDays === 1) return 'Ayer';
  if (diffDays < 7) return `Hace ${diffDays}d`;
  return d.toLocaleDateString('es-CO', { day: '2-digit', month: 'short' });
};

export type AttachmentItem = {
  id: string;
  title: string;
  fileUrl: string;
  fileType?: string;
  fileSizeBytes?: number;
  version?: string;
  tags?: string[];
  uploadedAt?: string | Date;
  createdAt?: string | Date;
};

export interface AttachmentGroupProps {
  title: string;
  description?: string;
  items: AttachmentItem[];
  compact?: boolean; // render compact list style when true
}

// Componente simple y accesible para listar archivos y permitir descarga.
export const AttachmentGroup = ({ title, description, items, compact = false }: AttachmentGroupProps) => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyLink = useCallback(async (url: string, id: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // no-op
    }
  }, []);

  return (
    <section aria-labelledby={`att-group-${title}`} className="space-y-4">
      <h3 id={`att-group-${title}`} className="text-xl font-semibold">{title}</h3>
      {description ? <p className="text-sm text-neutral-600">{description}</p> : null}

      {/* Compact layout: tighter rows with small icon and actions */}
      {compact ? (
        <div className="space-y-2">
          {items.map((it) => {
            const kind = guessKind(it.fileType, it.fileUrl);
            const Icon = kindIcon(kind);
            const tone = kindTone(kind);
            return (
              <div key={it.id} className="flex items-center justify-between gap-2 py-1 px-2 rounded-md hover:bg-surface-50">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`flex items-center justify-center w-9 h-9 rounded-md ${tone}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium truncate text-sm">{it.title}{it.version ? ` · ${it.version}` : ""}</div>
                    <div className="text-xs text-gray-500">{it.fileType || "PDF"} • {fmtMB(it.fileSizeBytes)} · <span className="text-neutral-500">{getRelativeTime((it as any).uploadedAt || it.createdAt)}</span></div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={it.fileUrl}
                    download
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-md bg-brand-600 text-white px-2 py-1 text-sm hover:bg-brand-700"
                    aria-label={`Descargar ${it.title}`}
                  >
                    Descargar
                  </a>
                  <button
                    type="button"
                    onClick={() => copyLink(it.fileUrl, it.id)}
                    className="inline-flex items-center rounded-md border px-2 py-1 text-sm text-neutral-700 bg-white hover:bg-surface-50"
                    aria-label={`Copiar enlace de ${it.title}`}
                    title="Copiar enlace"
                  >
                    <ClipboardCopyIcon className="w-4 h-4" />
                  </button>
                  {copied === it.id && <span className="text-xs text-green-600">Copiado</span>}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((it) => {
          const kind = guessKind(it.fileType, it.fileUrl);
          const Icon = kindIcon(kind);
          const tone = kindTone(kind);

          return (
            <Card key={it.id} padding="sm" className="flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className={`flex items-center justify-center w-12 h-12 rounded-md ${tone}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="font-medium truncate">{it.title}{it.version ? ` · ${it.version}` : ""}</div>
                  {it.tags && it.tags.length ? (
                    <div className="text-xs text-gray-500 mt-1 truncate">{it.tags.join(" · ")}</div>
                  ) : null}
                  <div className="text-xs text-gray-500 mt-1">{it.fileType || "PDF"} • {fmtMB(it.fileSizeBytes)} · <span className="text-neutral-500">{getRelativeTime((it as any).uploadedAt || it.createdAt)}</span></div>
                </div>
              </div>

              <div className="flex-shrink-0 ml-4 flex items-center gap-2">
                <a
                  href={it.fileUrl}
                  download
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md bg-brand-600 text-white px-3 py-2 text-sm hover:bg-brand-700"
                  aria-label={`Descargar ${it.title}`}
                >
                  Descargar
                </a>

                <button
                  type="button"
                  onClick={() => copyLink(it.fileUrl, it.id)}
                  className="inline-flex items-center rounded-md border px-2 py-2 text-sm text-neutral-700 bg-white hover:bg-surface-50"
                  aria-label={`Copiar enlace de ${it.title}`}
                  title="Copiar enlace"
                >
                  <ClipboardCopyIcon className="w-4 h-4" />
                </button>

                {copied === it.id && <span className="text-xs text-green-600">Copiado</span>}
              </div>
            </Card>
          );
          })}
        </div>
      )}
    </section>
  );
};

export default AttachmentGroup;
