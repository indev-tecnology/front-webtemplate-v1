'use client';

import { useState, useMemo, useEffect } from 'react';
import { X } from 'lucide-react';
import type { Service } from '@/domain/entities/Service';

interface ServiceFiltersProps {
  services: Service[];
  onFilterChange: (filtered: Service[]) => void;
}

export const ServiceFilters = ({ services, onFilterChange }: ServiceFiltersProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  // Extract unique categories and tags
  const categories = useMemo(() => {
    const cats = new Set<string>();
    services.forEach((s) => s.categories?.forEach((c) => cats.add(c)));
    return Array.from(cats).sort();
  }, [services]);

  const tags = useMemo(() => {
    const t = new Set<string>();
    services.forEach((s) => s.tags?.forEach((tag) => t.add(tag)));
    return Array.from(t).sort();
  }, [services]);

  // Filter services
  const filteredServices = useMemo(() => {
    let filtered = services;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((s) => s.categories?.includes(selectedCategory));
    }

    // Filter by tags
    if (selectedTags.size > 0) {
      filtered = filtered.filter((s) =>
        s.tags?.some((tag) => selectedTags.has(tag))
      );
    }

    return filtered;
  }, [services, selectedCategory, selectedTags]);

  // Notify parent of filter changes (useEffect to avoid setting parent state during render)
  useEffect(() => {
    onFilterChange(filteredServices);
  }, [filteredServices, onFilterChange]);

  const toggleTag = (tag: string) => {
    const newTags = new Set(selectedTags);
    if (newTags.has(tag)) {
      newTags.delete(tag);
    } else {
      newTags.add(tag);
    }
    setSelectedTags(newTags);
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedTags(new Set());
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedTags.size > 0;

  if (categories.length === 0 && tags.length === 0) {
    return null;
  }

  return (
    <div className="mb-12">
      {/* Header con contador de resultados */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">
            {filteredServices.length} {filteredServices.length === 1 ? 'Servicio' : 'Servicios'}
          </h2>
          <p className="text-neutral-600 text-sm mt-1">
            {hasActiveFilters ? 'Filtros aplicados' : 'Mostrando todos los servicios disponibles'}
          </p>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium text-sm transition-colors"
          >
            <X size={16} />
            Limpiar
          </button>
        )}
      </div>

      {/* Filtros minimalistas */}
      <div className="space-y-5">
        {/* Categories - Diseño horizontal minimalista */}
        {categories.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Categorías
              </span>
              <div className="flex-1 h-px bg-neutral-200" />
            </div>
            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-brand text-white shadow-lg shadow-brand/30'
                    : 'bg-white border-2 border-neutral-200 text-neutral-700 hover:border-brand-200 hover:text-brand-700'
                }`}
              >
                Todas
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                    selectedCategory === cat
                      ? 'bg-brand text-white shadow-lg shadow-brand/30'
                      : 'bg-white border-2 border-neutral-200 text-neutral-700 hover:border-brand-200 hover:text-brand-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tags - Diseño con chips minimalistas */}
        {tags.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Características
              </span>
              <div className="flex-1 h-px bg-neutral-200" />
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-4 py-2 rounded-full font-medium text-xs transition-all ${
                    selectedTags.has(tag)
                      ? 'bg-accent text-neutral-900 shadow-md shadow-accent/30'
                      : 'bg-neutral-50 text-neutral-600 hover:bg-accent-50 hover:text-accent-700 border border-neutral-200 hover:border-accent-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
