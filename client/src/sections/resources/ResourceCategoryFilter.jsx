import React from 'react';
import { Search, X } from 'lucide-react';
import { ARTICLE_CATEGORIES } from '../../data/articles.js';

export function ResourceCategoryFilter({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  totalResults,
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Tablist */}
        <div 
          className="flex flex-wrap items-center gap-2" 
          role="tablist" 
          aria-label="Filter resources by topic"
        >
          {ARTICLE_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isSelected}
                onClick={() => onSelectCategory(cat)}
                className={`px-4 py-2 rounded-healix-pill text-xs font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 ${
                  isSelected
                    ? 'bg-primary text-white shadow-soft-sm'
                    : 'bg-surface border border-border text-text-secondary hover:text-text-primary hover:border-primary/40'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <label htmlFor="resource-search" className="sr-only">
            Search medical resources and articles
          </label>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
            <Search className="w-4 h-4" />
          </div>
          <input
            id="resource-search"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search resources & articles..."
            className="w-full pl-9 pr-8 py-2 text-xs bg-surface border border-border rounded-healix-md text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-text-muted hover:text-text-primary"
              aria-label="Clear search input"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Active Filter Status & Count */}
      <div className="flex items-center justify-between text-xs text-text-muted border-t border-border/40 pt-4">
        <span>
          Showing <strong className="text-text-primary font-semibold">{totalResults}</strong> {totalResults === 1 ? 'article' : 'articles'}
          {selectedCategory !== 'All Resources' && ` in "${selectedCategory}"`}
          {searchQuery && ` matching "${searchQuery}"`}
        </span>

        {(selectedCategory !== 'All Resources' || searchQuery) && (
          <button
            type="button"
            onClick={() => {
              onSelectCategory('All Resources');
              onSearchChange('');
            }}
            className="text-primary hover:underline font-semibold"
          >
            Reset Filters
          </button>
        )}
      </div>
    </div>
  );
}
