'use client';

import { useState, useMemo } from 'react';
import { X, Filter } from 'lucide-react';
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

  // Notify parent of filter changes
  useMemo(() => {
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
    <div className="mb-8 bg-white rounded-2xl border-2 border-neutral-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-primary-600" />
          <h3 className="font-bold text-lg text-neutral-900">Filtrar servicios</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-neutral-600 hover:text-primary-600 flex items-center gap-1 transition-colors"
          >
            <X size={16} />
            Limpiar filtros
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Categories */}
        {categories.length > 0 && (
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-3">
              Categoría
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                Todos
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                    selectedCategory === cat
                      ? 'bg-primary-500 text-white shadow-md'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-3">
              Características
            </label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-4 py-2 rounded-xl font-medium text-sm transition-all border-2 ${
                    selectedTags.has(tag)
                      ? 'bg-primary-50 border-primary-500 text-primary-700'
                      : 'bg-white border-neutral-200 text-neutral-700 hover:border-primary-300'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results count */}
      <div className="mt-6 pt-6 border-t border-neutral-100">
        <p className="text-sm text-neutral-600">
          Mostrando <span className="font-bold text-neutral-900">{filteredServices.length}</span> de{' '}
          <span className="font-bold text-neutral-900">{services.length}</span> servicios
        </p>
      </div>
    </div>
  );
};
