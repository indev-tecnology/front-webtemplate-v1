import React from 'react';
import { FileText, File, ImageIcon, Archive, Sheet, Presentation, FileSpreadsheet } from 'lucide-react';

export type AttachmentKind = 'pdf' | 'doc' | 'excel' | 'powerpoint' | 'image' | 'archive' | 'csv' | 'binary' | 'other';

export type DocumentStatus = 'new' | 'updated' | 'vigente';

export interface DocumentBadge {
  label: string;
  className: string;
  icon?: string;
}

export function guessKind(fileType?: string, fileUrl?: string): AttachmentKind {
  const ft = (fileType || '').toLowerCase();
  const url = (fileUrl || '').toLowerCase();

  if (ft.includes('pdf') || url.endsWith('.pdf')) return 'pdf';
  if (ft.includes('word') || ft.includes('msword') || url.match(/\.(docx?|rtf)$/i)) return 'doc';
  if (ft.includes('spreadsheet') || ft.includes('excel') || url.match(/\.(xlsx?|xlsm)$/i)) return 'excel';
  if (ft.includes('presentation') || ft.includes('powerpoint') || url.match(/\.(pptx?|pps)$/i)) return 'powerpoint';
  if (ft.includes('csv') || url.endsWith('.csv')) return 'csv';
  if (ft.startsWith('image') || url.match(/\.(png|jpe?g|gif|webp|svg)$/i)) return 'image';
  if (ft.includes('zip') || ft.includes('tar') || url.match(/\.(zip|tar|gz|rar|7z)$/i)) return 'archive';
  if (ft.includes('octet-stream') || ft.includes('application') && !ft.includes('pdf') && !ft.includes('word')) return 'binary';
  return 'other';
}

export function kindIcon(kind: AttachmentKind) {
  switch (kind) {
    case 'pdf': return FileText;
    case 'doc': return FileText;
    case 'excel': return FileSpreadsheet;
    case 'powerpoint': return Presentation;
    case 'csv': return Sheet;
    case 'image': return ImageIcon;
    case 'archive': return Archive;
    case 'binary': return File;
    default: return File;
  }
}

export function kindTone(kind: AttachmentKind) {
  switch (kind) {
    case 'pdf': return 'bg-red-50 border border-red-200 text-red-700';
    case 'doc': return 'bg-blue-50 border border-blue-200 text-blue-700';
    case 'excel': return 'bg-green-50 border border-green-200 text-green-700';
    case 'powerpoint': return 'bg-orange-50 border border-orange-200 text-orange-700';
    case 'csv': return 'bg-teal-50 border border-teal-200 text-teal-700';
    case 'image': return 'bg-amber-50 border border-amber-200 text-amber-700';
    case 'archive': return 'bg-violet-50 border border-violet-200 text-violet-700';
    case 'binary': return 'bg-gray-50 border border-gray-200 text-gray-700';
    default: return 'bg-surface-50 border border-neutral-200 text-neutral-800';
  }
}

export function kindLabel(kind: AttachmentKind): string {
  switch (kind) {
    case 'pdf': return 'PDF';
    case 'doc': return 'DOC';
    case 'excel': return 'Excel';
    case 'powerpoint': return 'PPT';
    case 'csv': return 'CSV';
    case 'image': return 'Imagen';
    case 'archive': return 'ZIP';
    case 'binary': return 'Archivo';
    default: return 'Otro';
  }
}

/**
 * Determina el estado de un documento basado en sus fechas
 * - "new": subido hace menos de 30 días
 * - "updated": actualizado hace menos de 7 días (pero no nuevo)
 * - "vigente": estado por defecto
 */
export function getDocumentStatus(uploadedAt?: Date | string, createdAt?: Date | string): DocumentStatus {
  const now = new Date();
  const uploaded = uploadedAt ? new Date(uploadedAt) : null;
  const created = createdAt ? new Date(createdAt) : null;
  const referenceDate = uploaded || created;

  if (!referenceDate) return 'vigente';

  const diffMs = now.getTime() - referenceDate.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return 'vigente'; // fecha futura, caso edge
  if (diffDays <= 30) return 'new';
  if (diffDays <= 37 && uploaded) return 'updated'; // actualizado recientemente

  return 'vigente';
}

/**
 * Retorna la configuración del badge según el estado del documento
 */
export function getDocumentBadge(status: DocumentStatus): DocumentBadge {
  switch (status) {
    case 'new':
      return {
        label: 'Nuevo',
        className: 'bg-green-100 text-green-700 border border-green-300',
        icon: '🆕',
      };
    case 'updated':
      return {
        label: 'Actualizado',
        className: 'bg-yellow-100 text-yellow-700 border border-yellow-300',
        icon: '📝',
      };
    case 'vigente':
      return {
        label: 'Vigente',
        className: 'bg-neutral-100 text-neutral-600 border border-neutral-200',
        icon: '✓',
      };
  }
}

export default { guessKind, kindIcon, kindTone, kindLabel, getDocumentStatus, getDocumentBadge };
