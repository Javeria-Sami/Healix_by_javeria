import React, { useState, useEffect, useRef } from 'react';
import { MapPin, ChevronDown, Check, Search, X } from 'lucide-react';
import clsx from 'clsx';

const CITIES = [
  { id: 'lahore', name: 'Lahore', region: 'Punjab', popular: true },
  { id: 'karachi', name: 'Karachi', region: 'Sindh', popular: true },
  { id: 'islamabad', name: 'Islamabad', region: 'Federal Capital', popular: true },
  { id: 'rawalpindi', name: 'Rawalpindi', region: 'Punjab', popular: true },
  { id: 'faisalabad', name: 'Faisalabad', region: 'Punjab', popular: false },
  { id: 'multan', name: 'Multan', region: 'Punjab', popular: false },
  { id: 'peshawar', name: 'Peshawar', region: 'KPK', popular: false },
  { id: 'sialkot', name: 'Sialkot', region: 'Punjab', popular: false },
  { id: 'gujranwala', name: 'Gujranwala', region: 'Punjab', popular: false },
  { id: 'quetta', name: 'Quetta', region: 'Balochistan', popular: false },
];

export function LocationSelector({ className = '' }) {
  const [selectedCity, setSelectedCity] = useState(() => {
    try {
      return localStorage.getItem('healix_delivery_city') || 'Lahore';
    } catch {
      return 'Lahore';
    }
  });
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const popoverRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearchQuery('');
    }
  }, [isOpen]);

  const handleSelect = (cityName) => {
    setSelectedCity(cityName);
    try {
      localStorage.setItem('healix_delivery_city', cityName);
    } catch {
      // Ignore storage errors
    }
    setIsOpen(false);
  };

  const filteredCities = CITIES.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={clsx('relative', className)} ref={popoverRef}>
      {/* Trigger Button Matching Reference Box Pill */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label={`Delivery location: Deliver to ${selectedCity}. Click to change.`}
        className="flex items-center gap-3 px-3.5 py-1.5 rounded-xl bg-slate-50/90 hover:bg-slate-100/90 border border-neutral-200/90 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer group shadow-soft-2xs h-11"
      >
        <MapPin className="w-4 h-4 text-neutral-700 flex-shrink-0" aria-hidden="true" />
        
        <div className="text-left leading-none">
          <span className="block text-[10px] font-medium text-neutral-400 mb-0.5">
            Deliver to
          </span>
          <span className="block text-xs sm:text-sm font-bold text-[#075B43] group-hover:text-primary transition-colors">
            {selectedCity}
          </span>
        </div>

        <ChevronDown
          className={clsx(
            'w-4 h-4 text-neutral-600 ml-1 transition-transform duration-200 flex-shrink-0',
            isOpen && 'rotate-180 text-primary'
          )}
          aria-hidden="true"
        />
      </button>

      {/* Dropdown Modal/Menu */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Select Delivery City"
          className="absolute left-0 sm:left-auto sm:right-0 md:left-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-soft-2xl border border-neutral-200/90 p-4 z-50 text-left animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <div>
              <h3 className="text-sm font-bold text-[#075B43]">
                Select Your City
              </h3>
              <p className="text-xs text-text-muted">
                Express delivery & tests available across Pakistan
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-text-primary hover:bg-neutral-100 cursor-pointer"
              aria-label="Close location selector"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Search Box */}
          <div className="relative my-3">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search city or region..."
              className="w-full h-9 pl-9 pr-3 text-xs sm:text-sm rounded-xl border border-neutral-200 bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          {/* Popular Cities */}
          {!searchQuery && (
            <div className="mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-1.5">
                Popular Cities
              </span>
              <div className="flex flex-wrap gap-1.5">
                {CITIES.filter((c) => c.popular).map((city) => (
                  <button
                    key={city.id}
                    type="button"
                    onClick={() => handleSelect(city.name)}
                    className={clsx(
                      'px-2.5 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer',
                      selectedCity === city.name
                        ? 'bg-primary text-white font-bold'
                        : 'bg-surface hover:bg-primary-50 hover:text-primary text-text-secondary border border-neutral-200/60'
                    )}
                  >
                    {city.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Full List */}
          <div className="mt-2 max-h-48 overflow-y-auto divide-y divide-neutral-100">
            {filteredCities.length > 0 ? (
              filteredCities.map((city) => {
                const isSelected = selectedCity === city.name;
                return (
                  <button
                    key={city.id}
                    type="button"
                    onClick={() => handleSelect(city.name)}
                    className={clsx(
                      'w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left text-xs sm:text-sm transition-colors cursor-pointer',
                      isSelected
                        ? 'bg-primary-50 text-primary-900 font-semibold'
                        : 'hover:bg-neutral-50 text-text-primary'
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <MapPin
                        className={clsx(
                          'w-3.5 h-3.5',
                          isSelected ? 'text-primary' : 'text-neutral-400'
                        )}
                      />
                      <span>{city.name}</span>
                      <span className="text-[11px] text-text-muted">
                        ({city.region})
                      </span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-primary" />}
                  </button>
                );
              })
            ) : (
              <div className="py-4 text-center text-xs text-text-muted">
                No cities found matching &ldquo;{searchQuery}&rdquo;
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
