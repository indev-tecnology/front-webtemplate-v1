"use client";

import React from "react";
import { motion } from "framer-motion";
import { Filter, X, Grid3x3, List, ArrowUpDown } from "lucide-react";
import type { AttachmentKind } from "@/presentation/web-ui/attachmentUtils";
import { kindLabel } from "@/presentation/web-ui/attachmentUtils";

export type ViewMode = "grid" | "list";
export type SortBy = "date" | "name" | "size";

export interface FilterState {
  search: string;
  types: AttachmentKind[];
  topics: string[];
  sortBy: SortBy;
}

export interface DocumentFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  availableTypes: AttachmentKind[];
  availableTopics: string[];
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  totalResults: number;
}

const documentTypes: AttachmentKind[] = ["pdf", "doc", "excel", "powerpoint", "csv", "image", "archive"];

const sortOptions: { value: SortBy; label: string }[] = [
  { value: "date", label: "Más reciente" },
  { value: "name", label: "Nombre A-Z" },
  { value: "size", label: "Tamaño" },
];

export const DocumentFilters = ({
  filters,
  onFiltersChange,
  availableTypes,
  availableTopics,
  viewMode,
  onViewModeChange,
  totalResults,
}: DocumentFiltersProps) => {
  const [showFilters, setShowFilters] = React.useState(false);

  const toggleType = (type: AttachmentKind) => {
    const newTypes = filters.types.includes(type)
      ? filters.types.filter((t) => t !== type)
      : [...filters.types, type];
    onFiltersChange({ ...filters, types: newTypes });
  };

  const toggleTopic = (topic: string) => {
    const newTopics = filters.topics.includes(topic)
      ? filters.topics.filter((t) => t !== topic)
      : [...filters.topics, topic];
    onFiltersChange({ ...filters, topics: newTopics });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: "",
      types: [],
      topics: [],
      sortBy: "date",
    });
  };

  const hasActiveFilters = filters.types.length > 0 || filters.topics.length > 0 || filters.search;

  return (
    <div className="space-y-4">
      {/* Barra principal de controles */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Búsqueda */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Buscar documentos por título o etiqueta..."
            value={filters.search}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all"
          />
        </div>

        {/* Ordenamiento */}
        <select
          value={filters.sortBy}
          onChange={(e) => onFiltersChange({ ...filters, sortBy: e.target.value as SortBy })}
          className="px-4 py-3 rounded-lg border border-neutral-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all bg-white"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Toggle de filtros */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`inline-flex items-center gap-2 px-4 py-3 rounded-lg border transition-all ${
            showFilters || hasActiveFilters
              ? "border-brand-500 bg-brand-50 text-brand-700"
              : "border-neutral-300 hover:border-brand-400 text-neutral-700"
          }`}
        >
          <Filter className="w-4 h-4" />
          <span className="hidden sm:inline">Filtros</span>
          {hasActiveFilters && (
            <span className="inline-flex items-center justify-center w-5 h-5 bg-brand-600 text-white text-xs font-bold rounded-full">
              {filters.types.length + filters.topics.length}
            </span>
          )}
        </button>

        {/* Toggle de vista */}
        <div className="flex items-center gap-1 border border-neutral-300 rounded-lg p-1">
          <button
            onClick={() => onViewModeChange("grid")}
            className={`p-2 rounded transition-all ${
              viewMode === "grid"
                ? "bg-brand-600 text-white"
                : "text-neutral-600 hover:bg-neutral-100"
            }`}
            aria-label="Vista de grilla"
          >
            <Grid3x3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewModeChange("list")}
            className={`p-2 rounded transition-all ${
              viewMode === "list"
                ? "bg-brand-600 text-white"
                : "text-neutral-600 hover:bg-neutral-100"
            }`}
            aria-label="Vista de lista"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Contador de resultados */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-neutral-600">
          <span className="font-semibold text-brand-700">{totalResults}</span> documento
          {totalResults !== 1 ? "s" : ""} encontrado{totalResults !== 1 ? "s" : ""}
        </p>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="inline-flex items-center gap-1 text-sm text-neutral-600 hover:text-brand-700 transition-colors"
          >
            <X className="w-3 h-3" />
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Panel de filtros expandible */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-surface-50 border border-neutral-200 rounded-lg p-5 space-y-4"
        >
          {/* Filtro por tipo de documento */}
          <div>
            <h4 className="text-sm font-semibold text-neutral-700 mb-2">Tipo de documento</h4>
            <div className="flex flex-wrap gap-2">
              {documentTypes
                .filter((type) => availableTypes.includes(type))
                .map((type) => (
                  <button
                    key={type}
                    onClick={() => toggleType(type)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium border transition-all ${
                      filters.types.includes(type)
                        ? "bg-brand-600 text-white border-brand-600"
                        : "bg-white text-neutral-700 border-neutral-300 hover:border-brand-400"
                    }`}
                  >
                    {kindLabel(type)}
                  </button>
                ))}
            </div>
          </div>

          {/* Filtro por tópico/categoría */}
          {availableTopics.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-neutral-700 mb-2">Categoría</h4>
              <div className="flex flex-wrap gap-2">
                {availableTopics.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => toggleTopic(topic)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium border transition-all ${
                      filters.topics.includes(topic)
                        ? "bg-brand-600 text-white border-brand-600"
                        : "bg-white text-neutral-700 border-neutral-300 hover:border-brand-400"
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default DocumentFilters;
