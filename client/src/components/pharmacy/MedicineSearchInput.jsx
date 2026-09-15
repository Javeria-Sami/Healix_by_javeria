import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Pill, Clock, ArrowRight } from 'lucide-react';
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
        {/* Left Search Icon */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none flex items-center justify-center">
          <Search className="w-5 h-5 text-neutral-400 stroke-[2]" aria-hidden="true" />
        </div>

        {/* Search Input Field */}
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
          className="w-full pl-12 pr-32 py-3.5 bg-white rounded-2xl border border-neutral-200/90 shadow-sm text-neutral-900 placeholder:text-neutral-400 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#075B43]/20 focus:border-[#075B43] transition-all duration-200"
        />

        {/* Right Action Group (Clear Button + Search Button) */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setIsOpen(false);
              }}
              aria-label="Clear search"
              className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#075B43] cursor-pointer"
            >
              <X className="w-4 h-4 stroke-[2]" aria-hidden="true" />
            </button>
          )}

          <button
            type="submit"
            className="px-4 sm:px-5 py-2 sm:py-2.5 bg-[#075B43] hover:bg-[#064C38] text-white text-sm font-bold rounded-xl transition-all shadow-xs hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#075B43] cursor-pointer"
          >
            Search
          </button>
        </div>
      </form>

      {/* Autocomplete / Suggestions Dropdown */}
      {isOpen && (
        <div
          id="medicine-search-results"
          role="listbox"
          className="absolute z-50 left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-neutral-200/90 shadow-soft-lg overflow-hidden divide-y divide-neutral-100 animate-in fade-in slide-in-from-top-1 duration-150"
        >
          {suggestions.length > 0 ? (
            <div>
              <div className="px-4 py-2.5 bg-[#F4F8F5] text-[11px] font-bold text-[#075B43] tracking-[0.15em] uppercase border-b border-[#DCEBE4]/60 text-left">
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
                      selectedIndex === idx ? 'bg-[#F1F8F4] text-[#075B43]' : 'hover:bg-neutral-50'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 text-left">
                      <div className="w-8 h-8 rounded-lg bg-[#EAF5EF] text-[#075B43] flex items-center justify-center flex-shrink-0">
                        <Pill className="w-4 h-4 stroke-[2]" aria-hidden="true" />
                      </div>
                      <div className="truncate">
                        <div className="font-semibold text-sm text-neutral-900 truncate">
                          {item.name} <span className="text-neutral-500 text-xs font-normal">({item.strength})</span>
                        </div>
                        <div className="text-xs text-neutral-500 truncate">
                          {item.genericName} • {item.dosageForm}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                      <span className="font-bold text-sm text-neutral-900">
                        ${item.price.toFixed(2)}
                      </span>
                      {item.prescriptionRequired && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 bg-amber-50 text-amber-800 rounded border border-amber-200">
                          Rx
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="p-2.5 bg-[#F4F8F5] border-t border-[#DCEBE4]/60 text-center">
                <button
                  type="button"
                  onClick={() => handleSearchSubmit()}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#075B43] hover:text-[#064C38] transition-colors cursor-pointer"
                >
                  <span>View all results for "{query}"</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          ) : query.trim().length >= 2 ? (
            <div className="p-6 text-center">
              <p className="text-sm text-neutral-600 mb-2">No direct product matches for "{query}"</p>
              <button
                type="button"
                onClick={() => handleSearchSubmit()}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#075B43] hover:underline cursor-pointer"
              >
                <span>Search all catalog records</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          ) : showRecent && recentSearches.length > 0 ? (
            <div className="p-3 text-left">
              <div className="px-2 py-1 text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-1.5">
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
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-100 hover:bg-[#EAF5EF] hover:text-[#075B43] text-neutral-700 rounded-full text-xs font-medium transition-colors cursor-pointer"
                  >
                    <Clock className="w-3 h-3 text-neutral-400" aria-hidden="true" />
                    <span>{term}</span>
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
