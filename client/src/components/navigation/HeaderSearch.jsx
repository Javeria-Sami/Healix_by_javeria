import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Loader2, Pill, TestTubes, BookOpen, ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import { searchHealthcareCatalog } from '../../utils/searchIndex.js';

export function HeaderSearch({ className = '', onSelectResult }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState({ medicines: [], labTests: [], articles: [], all: [], totalCount: 0 });
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults({ medicines: [], labTests: [], articles: [], all: [], totalCount: 0 });
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      const res = searchHealthcareCatalog(query);
      setResults(res);
      setIsLoading(false);
      setSelectedIndex(-1);
    }, 150);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (!isOpen || results.all.length === 0) {
      if (e.key === 'Enter' && query.trim()) {
        navigate(`/pharmacy/search?q=${encodeURIComponent(query.trim())}`);
        setIsOpen(false);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.all.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.all.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && results.all[selectedIndex]) {
        handleSelect(results.all[selectedIndex]);
      } else if (query.trim()) {
        navigate(`/pharmacy/search?q=${encodeURIComponent(query.trim())}`);
        setIsOpen(false);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleSelect = (item) => {
    setIsOpen(false);
    setQuery('');
    if (onSelectResult) onSelectResult(item);
    navigate(item.href);
  };

  const handleClear = () => {
    setQuery('');
    setResults({ medicines: [], labTests: [], articles: [], all: [], totalCount: 0 });
    inputRef.current?.focus();
  };

  return (
    <div
      ref={containerRef}
      className={clsx('relative w-full', className)}
    >
      {/* Search Input Bar Matching Reference */}
      <div className="relative flex items-center h-11 bg-slate-50/90 hover:bg-slate-100/70 focus-within:bg-white rounded-xl border border-neutral-200/90 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all overflow-hidden shadow-soft-2xs">
        <input
          ref={inputRef}
          type="search"
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-autocomplete="list"
          aria-label="Search medicines, lab tests and health information"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search medicines, lab tests & health information..."
          className="w-full h-full pl-4 pr-16 bg-transparent text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 transition-all outline-none"
        />

        <div className="absolute right-0 top-0 bottom-0 flex items-center">
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 mr-1 rounded-full text-neutral-400 hover:text-text-primary hover:bg-neutral-200/60 focus:outline-none cursor-pointer"
              aria-label="Clear search input"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              if (query.trim()) {
                navigate(`/pharmacy/search?q=${encodeURIComponent(query.trim())}`);
                setIsOpen(false);
              } else {
                inputRef.current?.focus();
              }
            }}
            className="w-12 h-full bg-primary hover:bg-primary-hover text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Submit search"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-white" />
            ) : (
              <Search className="w-4 h-4 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Auto-suggest Dropdown */}
      {isOpen && query.trim().length > 0 && (
        <div
          role="listbox"
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-soft-2xl border border-neutral-200/90 overflow-hidden z-50 text-left animate-in fade-in zoom-in-95 duration-150"
        >
          {results.totalCount > 0 ? (
            <div className="max-h-96 overflow-y-auto divide-y divide-neutral-100">
              {/* Medicines */}
              {results.medicines.length > 0 && (
                <div className="p-2">
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                    <Pill className="w-3.5 h-3.5 text-primary" />
                    <span>Medicines & Devices</span>
                  </div>
                  {results.medicines.map((item) => {
                    const globalIdx = results.all.findIndex(x => x.id === item.id);
                    const isSelected = selectedIndex === globalIdx;
                    return (
                      <div
                        key={item.id}
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => handleSelect(item)}
                        className={clsx(
                          'flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition-colors',
                          isSelected ? 'bg-primary-50 text-primary-900 font-semibold' : 'hover:bg-neutral-50'
                        )}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-surface border border-neutral-200 flex items-center justify-center flex-shrink-0">
                            <Pill className="w-3.5 h-3.5 text-primary" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-text-primary truncate">
                              {item.title}
                            </p>
                            <p className="text-[11px] text-text-muted truncate">
                              {item.subtitle}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {item.price && (
                            <span className="text-xs font-bold text-primary">
                              {item.price}
                            </span>
                          )}
                          <span className={clsx('text-[10px] font-medium px-2 py-0.5 rounded-full border', item.badgeClass)}>
                            {item.type}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Lab Tests */}
              {results.labTests.length > 0 && (
                <div className="p-2">
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                    <TestTubes className="w-3.5 h-3.5 text-primary" />
                    <span>Lab Tests & Pathology</span>
                  </div>
                  {results.labTests.map((item) => {
                    const globalIdx = results.all.findIndex(x => x.id === item.id);
                    const isSelected = selectedIndex === globalIdx;
                    return (
                      <div
                        key={item.id}
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => handleSelect(item)}
                        className={clsx(
                          'flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition-colors',
                          isSelected ? 'bg-primary-50 text-primary-900 font-semibold' : 'hover:bg-neutral-50'
                        )}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0 text-primary">
                            <TestTubes className="w-3.5 h-3.5" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-text-primary truncate">
                              {item.title}
                            </p>
                            <p className="text-[11px] text-text-muted truncate">
                              {item.subtitle}
                            </p>
                          </div>
                        </div>
                        <span className={clsx('text-[10px] font-medium px-2 py-0.5 rounded-full border', item.badgeClass)}>
                          {item.type}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Health Articles */}
              {results.articles.length > 0 && (
                <div className="p-2">
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-primary" />
                    <span>Health Information</span>
                  </div>
                  {results.articles.map((item) => {
                    const globalIdx = results.all.findIndex(x => x.id === item.id);
                    const isSelected = selectedIndex === globalIdx;
                    return (
                      <div
                        key={item.id}
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => handleSelect(item)}
                        className={clsx(
                          'flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition-colors',
                          isSelected ? 'bg-primary-50 text-primary-900 font-semibold' : 'hover:bg-neutral-50'
                        )}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0 text-primary">
                            <BookOpen className="w-3.5 h-3.5" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-text-primary truncate">
                              {item.title}
                            </p>
                            <p className="text-[11px] text-text-muted truncate">
                              {item.subtitle}
                            </p>
                          </div>
                        </div>
                        <span className={clsx('text-[10px] font-medium px-2 py-0.5 rounded-full border', item.badgeClass)}>
                          {item.type}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* All results button */}
              <div className="p-2 bg-neutral-50">
                <button
                  type="button"
                  onClick={() => {
                    navigate(`/pharmacy/search?q=${encodeURIComponent(query.trim())}`);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold text-primary hover:bg-white transition-colors cursor-pointer"
                >
                  <span>Explore all results for &ldquo;{query}&rdquo;</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 text-center">
              <p className="text-xs font-medium text-text-primary">
                No matching results found for &ldquo;{query}&rdquo;
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
