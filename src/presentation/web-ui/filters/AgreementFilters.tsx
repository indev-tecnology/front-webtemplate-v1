'use client';

import { useState, useMemo, useEffect } from 'react';
import { X, Search } from 'lucide-react';
import type { Agreement } from '@/domain/entities/Agreement';

interface AgreementFiltersProps {
  agreements: Agreement[];
  onFilterChange: (filtered: Agreement[]) => void;
}

export const AgreementFilters = ({ agreements, onFilterChange }: AgreementFiltersProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    agreements.forEach((a) => {
      if (a.category) cats.add(a.category);
    });
    return Array.from(cats).sort();
  }, [agreements]);

  // Filter agreements
  const filteredAgreements = useMemo(() => {
    let filtered = agreements;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((a) => a.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((a) =>
        a.name.toLowerCase().includes(query) ||
        a.description?.toLowerCase().includes(query) ||
        a.category?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [agreements, selectedCategory, searchQuery]);

  // Notify parent of filter changes
  useEffect(() => {
    onFilterChange(filteredAgreements);
  }, [filteredAgreements, onFilterChange]);

  const clearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
  };

  const hasActiveFilters = selectedCategory !== 'all' || searchQuery.trim() !== '';

  return (
    <div className="mb-12">
      {/* Header con contador de resultados y búsqueda */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">
            {filteredAgreements.length} {filteredAgreements.length === 1 ? 'Convenio' : 'Convenios'}
          </h2>
          <p className="text-neutral-600 text-sm mt-1">
            {hasActiveFilters ? 'Filtros aplicados' : 'Mostrando todos los convenios vigentes'}
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Search input */}
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <input
              type="text"
              placeholder="Buscar convenio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white border-2 border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all"
            />
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium text-sm transition-colors whitespace-nowrap"
            >
              <X size={16} />
              Limpiar
            </button>
          )}
        </div>
      </div>

      {/* Filtros de categorías */}
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
              Todos
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
    </div>
  );
};
