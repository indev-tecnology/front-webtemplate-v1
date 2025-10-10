"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DocumentGroup } from "./DocumentGroup";
import { DocumentCard } from "./DocumentCard";
import { DocumentFilters, type FilterState, type ViewMode } from "./DocumentFilters";
import type { AttachmentItem } from "@/presentation/web-ui/AttachmentGroup";
import { guessKind, type AttachmentKind } from "@/presentation/web-ui/attachmentUtils";
import { FileQuestion } from "lucide-react";

export interface DocumentLibraryProps {
  documents: AttachmentItem[];
  groupedByTopic?: Record<string, AttachmentItem[]>;
}

export const DocumentLibrary = ({ documents, groupedByTopic }: DocumentLibraryProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    types: [],
    topics: [],
    sortBy: "date",
  });

  // Extraer tipos disponibles
  const availableTypes = useMemo(() => {
    const types = new Set<AttachmentKind>();
    documents.forEach((doc) => {
      const kind = guessKind(doc.fileType, doc.fileUrl);
      types.add(kind);
    });
    return Array.from(types);
  }, [documents]);

  // Extraer tópicos disponibles
  const availableTopics = useMemo(() => {
    if (groupedByTopic) {
      return Object.keys(groupedByTopic).sort();
    }
    const topics = new Set<string>();
    documents.forEach((doc) => {
      if ((doc as any).topic) {
        topics.add((doc as any).topic);
      }
      doc.tags?.forEach((tag) => topics.add(tag));
    });
    return Array.from(topics).sort();
  }, [documents, groupedByTopic]);

  // Filtrar y ordenar documentos
  const filteredAndSortedDocs = useMemo(() => {
    let result = [...documents];

    // Filtro por búsqueda
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (doc) =>
          doc.title.toLowerCase().includes(searchLower) ||
          doc.tags?.some((tag) => tag.toLowerCase().includes(searchLower)) ||
          (doc as any).topic?.toLowerCase().includes(searchLower)
      );
    }

    // Filtro por tipo
    if (filters.types.length > 0) {
      result = result.filter((doc) => {
        const kind = guessKind(doc.fileType, doc.fileUrl);
        return filters.types.includes(kind);
      });
    }

    // Filtro por tópico
    if (filters.topics.length > 0) {
      result = result.filter((doc) => {
        const docTopic = (doc as any).topic;
        const docTags = doc.tags || [];
        return (
          (docTopic && filters.topics.includes(docTopic)) ||
          docTags.some((tag) => filters.topics.includes(tag))
        );
      });
    }

    // Ordenamiento
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case "name":
          return a.title.localeCompare(b.title);
        case "size":
          return (b.fileSizeBytes || 0) - (a.fileSizeBytes || 0);
        case "date":
        default:
          const aDate = new Date((a as any).uploadedAt || a.createdAt || 0);
          const bDate = new Date((b as any).uploadedAt || b.createdAt || 0);
          return bDate.getTime() - aDate.getTime();
      }
    });

    return result;
  }, [documents, filters]);

  // Agrupar documentos filtrados por tópico si existe agrupación
  const groupedFilteredDocs = useMemo(() => {
    if (!groupedByTopic) return null;

    const groups: Record<string, AttachmentItem[]> = {};
    const filteredIds = new Set(filteredAndSortedDocs.map((doc) => doc.id));

    Object.entries(groupedByTopic).forEach(([topic, docs]) => {
      const filteredDocs = docs.filter((doc) => filteredIds.has(doc.id));
      if (filteredDocs.length > 0) {
        groups[topic] = filteredDocs;
      }
    });

    return groups;
  }, [groupedByTopic, filteredAndSortedDocs]);

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <DocumentFilters
        filters={filters}
        onFiltersChange={setFilters}
        availableTypes={availableTypes}
        availableTopics={availableTopics}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        totalResults={filteredAndSortedDocs.length}
      />

      {/* Resultados */}
      <AnimatePresence mode="wait">
        {filteredAndSortedDocs.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20 px-4 bg-neutral-50 rounded-lg border-2 border-dashed border-neutral-300"
          >
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 border border-neutral-200">
              <FileQuestion className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-700 mb-2">No se encontraron anexos</h3>
            <p className="text-neutral-500 text-center text-sm max-w-md">
              Intenta ajustar los filtros o la búsqueda para encontrar los documentos que necesitas.
            </p>
          </motion.div>
        ) : groupedFilteredDocs ? (
          // Vista agrupada con accordion
          <motion.div
            key="grouped"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {Object.entries(groupedFilteredDocs).map(([topic, docs], groupIndex) => (
              <DocumentGroup
                key={topic}
                title={topic}
                documents={docs}
                defaultExpanded={groupIndex === 0}
                index={groupIndex}
              />
            ))}
          </motion.div>
        ) : (
          // Vista sin agrupar
          <motion.div
            key="ungrouped"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            {filteredAndSortedDocs.map((doc, index) => (
              <DocumentCard key={doc.id} document={doc} index={index} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DocumentLibrary;
