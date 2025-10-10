"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Download, Link as LinkIcon, FileCheck, Calendar } from "lucide-react";
import { fmtMB } from "@/shared/bytes";
import { toDate } from "@/shared/date";
import {
  guessKind,
  kindLabel,
  getDocumentStatus,
  getDocumentBadge,
} from "@/presentation/web-ui/attachmentUtils";
import type { AttachmentItem } from "@/presentation/web-ui/AttachmentGroup";
import Image from "next/image";

export interface DocumentCardProps {
  document: AttachmentItem;
  index?: number;
}

const getFormattedDate = (value: any) => {
  const d = toDate(value || new Date());
  return d.toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
};

export const DocumentCard = ({ document, index = 0 }: DocumentCardProps) => {
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);

  const kind = guessKind(document.fileType, document.fileUrl);
  const label = kindLabel(kind);

  const status = getDocumentStatus(
    (document as any).uploadedAt || document.createdAt,
    document.createdAt
  );
  const badge = getDocumentBadge(status);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(document.fileUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Error copying link:", error);
    }
  };

  // Logo institucional por defecto
  const logoUrl = imageError ? "/images/wcs_default.png" : "/images/web-logo.png";

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="group relative bg-white border border-brand-100 hover:border-brand-200 hover:shadow-sm transition-all duration-200 rounded-lg overflow-hidden"
    >
      {/* Header con logo y acento de color suave */}
      <div className="flex items-start gap-4 p-4 border-b border-brand-50 bg-gradient-to-r from-brand-50/30 to-transparent">
        {/* Logo institucional */}
        <div className="relative w-14 h-14 flex-shrink-0 bg-white rounded border border-brand-100">
          <Image
            src={logoUrl}
            alt="Logo institucional"
            fill
            className="object-contain p-2"
            onError={() => setImageError(true)}
          />
        </div>

        {/* Título y metadata */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-1.5">
            <h3 className="text-sm font-semibold text-neutral-900 leading-snug">
              {document.title}
            </h3>
            {status !== "vigente" && (
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold whitespace-nowrap ${badge.className}`}
              >
                {badge.label}
              </span>
            )}
          </div>

          {/* Tipo de documento y versión */}
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-brand-50 text-brand-700 border border-brand-200 rounded text-xs font-medium">
              <FileCheck className="w-3 h-3" />
              {label}
            </span>
            {document.version && (
              <span className="text-xs text-neutral-500 font-medium">
                v{document.version}
              </span>
            )}
          </div>

          {/* Fecha */}
          <div className="flex items-center gap-1.5 text-xs text-neutral-500">
            <Calendar className="w-3 h-3 text-brand-500" />
            <span>{getFormattedDate((document as any).uploadedAt || document.createdAt)}</span>
            <span className="mx-1">•</span>
            <span className="font-medium">{fmtMB(document.fileSizeBytes)}</span>
          </div>
        </div>
      </div>

      {/* Tags institucionales */}
      {document.tags && document.tags.length > 0 && (
        <div className="px-4 py-2.5 bg-neutral-50/50 border-b border-neutral-100">
          <div className="flex flex-wrap gap-1.5">
            {document.tags.map((tag, i) => (
              <span
                key={i}
                className="inline-block px-2 py-0.5 bg-white text-neutral-600 text-xs font-medium rounded border border-brand-100"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Acciones */}
      <div className="px-4 py-3 bg-gradient-to-r from-brand-50/20 to-transparent">
        <div className="flex items-center gap-2">
          <a
            href={document.fileUrl}
            download
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded transition-colors duration-200 shadow-sm"
            aria-label={`Descargar ${document.title}`}
          >
            <Download className="w-4 h-4" />
            <span>Descargar</span>
          </a>

          <button
            type="button"
            onClick={copyLink}
            className="inline-flex items-center justify-center px-3 py-2 border border-brand-200 hover:border-brand-300 hover:bg-brand-50 text-brand-700 text-sm font-medium rounded transition-colors duration-200"
            aria-label={`Copiar enlace de ${document.title}`}
            title="Copiar enlace"
          >
            {copied ? (
              <motion.span
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="text-green-600 text-xs font-semibold"
              >
                ✓ Copiado
              </motion.span>
            ) : (
              <LinkIcon className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Acento lateral verde suave */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-400 to-brand-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
    </motion.article>
  );
};

export default DocumentCard;
