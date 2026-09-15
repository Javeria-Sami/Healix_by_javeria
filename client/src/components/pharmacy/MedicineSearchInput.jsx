import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { ROUTES } from '../../constants/routes';
import { searchMedicines } from '../../data/pharmacy';
import { usePharmacy } from '../../context/PharmacyContext';

export default function MedicineSearchInput({
  initialQuery = '',
  placeholder = 'Search medicines, brands, active ingredients, or health products...',
  className = '',
  autoFocus = false,
  showRecent = true
}) {
  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);
  const { recentSearches, addRecentSearch } = usePharmacy();

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    if (query.trim().length >= 2) {
      const results = searchMedicines(query.trim()).slice(0, 6);
      setSuggestions(results);
      setIsOpen(true);
    } else {
      setSuggestions([]);
      if (query.trim().length === 0 && showRecent && recentSearches.length > 0) {
        // keep open for recent searches on focus
      } else {
        setIsOpen(false);
      }
    }
    setSelectedIndex(-1);
  }, [query, showRecent, recentSearches.length]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (searchQuery) => {
    const term = searchQuery || query;
    if (!term || !term.trim()) return;
    addRecentSearch(term.trim());
    setIsOpen(false);
    navigate(`${ROUTES.PHARMACY_SEARCH}?q=${encodeURIComponent(term.trim())}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        const item = suggestions[selectedIndex];
        addRecentSearch(item.name);
        setIsOpen(false);
        navigate(`/pharmacy/medicine/${item.slug}`);
      } else {
        handleSearchSubmit();
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div ref={wrapperRef} className={`relative w-full ${className}`}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearchSubmit();
        }}
        className="relative flex items-center w-full"
        role="search"
      >
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none flex items-center justify-center">
          <Search className="w-5 h-5 text-neutral-400 stroke-[2]" aria-hidden="true" />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (query.trim().length >= 2 || (showRecent && recentSearches.length > 0)) {
              setIsOpen(true);
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus={autoFocus}
          aria-label="Search medicines and healthcare products"
          aria-autocomplete="list"
          aria-controls="medicine-search-results"
          aria-expanded={isOpen}
          className="w-full pl-12 pr-28 py-3.5 bg-white rounded-2xl border border-neutral-200/80 shadow-sm text-neutral-900 placeholder:text-neutral-400 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-200"
        />

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            aria-label="Clear search"
            className="absolute right-20 text-neutral-400 hover:text-neutral-600 p-1.5 rounded-full hover:bg-neutral-100 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        <button
          type="submit"
          className="absolute right-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
        >
          Search
        </button>
      </form>

      {/* Autocomplete / Suggestions Dropdown */}
      {isOpen && (
        <div
          id="medicine-search-results"
          role="listbox"
          className="absolute z-40 left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-neutral-100 shadow-xl overflow-hidden divide-y divide-neutral-100 animate-in fade-in slide-in-from-top-1 duration-150"
        >
          {suggestions.length > 0 ? (
            <div>
              <div className="px-4 py-2 bg-neutral-50/70 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                Matching Products
              </div>
              <ul className="py-1">
                {suggestions.map((item, idx) => (
                  <li
                    key={item.id}
                    role="option"
                    aria-selected={selectedIndex === idx}
                    onClick={() => {
                      addRecentSearch(item.name);
                      setIsOpen(false);
                      navigate(`/pharmacy/medicine/${item.slug}`);
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`px-4 py-2.5 flex items-center justify-between cursor-pointer transition-colors ${
                      selectedIndex === idx ? 'bg-primary-50 text-primary-900' : 'hover:bg-neutral-50'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-base flex-shrink-0">💊</span>
                      <div className="truncate">
                        <div className="font-medium text-sm text-neutral-900 truncate">
                          {item.name} <span className="text-neutral-500 text-xs">({item.strength})</span>
                        </div>
                        <div className="text-xs text-neutral-500 truncate">
                          {item.genericName} • {item.dosageForm}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                      <span className="font-semibold text-sm text-neutral-900">
                        ${item.price.toFixed(2)}
                      </span>
                      {item.prescriptionRequired && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 bg-amber-50 text-amber-700 rounded border border-amber-200">
                          Rx
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="p-2 bg-neutral-50 border-t border-neutral-100 text-center">
                <button
                  type="button"
                  onClick={() => handleSearchSubmit()}
                  className="text-xs font-semibold text-primary-600 hover:text-primary-700 transition-colors"
                >
                  View all results for "{query}" →
                </button>
              </div>
            </div>
          ) : query.trim().length >= 2 ? (
            <div className="p-6 text-center">
              <p className="text-sm text-neutral-600 mb-2">No direct product matches for "{query}"</p>
              <button
                type="button"
                onClick={() => handleSearchSubmit()}
                className="text-xs font-semibold text-primary-600 hover:underline"
              >
                Search all catalog records →
              </button>
            </div>
          ) : showRecent && recentSearches.length > 0 ? (
            <div className="p-3">
              <div className="px-2 py-1 text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                Recent Searches
              </div>
              <div className="flex flex-wrap gap-1.5">
                {recentSearches.map((term, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setQuery(term);
                      handleSearchSubmit(term);
                    }}
                    className="px-3 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-full text-xs font-medium transition-colors"
                  >
                    🕒 {term}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
