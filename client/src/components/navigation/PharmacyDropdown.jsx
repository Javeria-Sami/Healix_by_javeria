import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, Pill, Sparkles, HeartPulse } from 'lucide-react';
import { PHARMACY_NAV } from '../../data/navigation';

export default function PharmacyDropdown({ isOpen, onClose, triggerRef }) {
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose();
        triggerRef?.current?.focus();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  const sectionIcons = {
    'medications': Pill,
    'wellness-beauty': Sparkles,
    'devices-injectables': HeartPulse,
  };

  return (
    <div
      ref={dropdownRef}
      role="region"
      aria-label="Pharmacy Categories Navigation Menu"
      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[92vw] max-w-5xl bg-white rounded-2xl shadow-soft-2xl border border-neutral-200/90 p-6 sm:p-8 z-50 animate-in fade-in zoom-in-95 duration-150 origin-top"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        {PHARMACY_NAV.sections.map((section) => {
          const IconComponent = sectionIcons[section.id] || Pill;
          return (
            <div key={section.id} className="flex flex-col">
              {/* Section Header */}
              <div className="flex items-center gap-2.5 pb-3.5 mb-3 border-b border-neutral-100">
                <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600">
                  <IconComponent className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-[#075A46] uppercase tracking-wider">
                    {section.title}
                  </h2>
                  <p className="text-[11px] text-neutral-600 line-clamp-1">
                    {section.description}
                  </p>
                </div>
              </div>

              {/* Category List */}
              <ul className="space-y-1" role="list">
                {section.categories.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      to={cat.href}
                      onClick={onClose}
                      className="group flex items-center justify-between px-3 py-1.5 rounded-lg text-sm text-neutral-700 hover:text-primary-700 hover:bg-neutral-50 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                    >
                      <span className="font-normal group-hover:font-medium transition-all">
                        {cat.name}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-neutral-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 text-primary-500 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* View All Categories Footer */}
      <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between bg-neutral-50/70 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 px-6 sm:px-8 py-3.5 rounded-b-2xl">
        <span className="text-xs text-neutral-600 font-medium">
          Comprehensive directory of certified medicines, devices, and wellness items
        </span>
        <Link
          to={PHARMACY_NAV.viewAll.href}
          onClick={onClose}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-600 hover:text-primary-700 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded px-2 py-1 transition-colors"
        >
          <span>{PHARMACY_NAV.viewAll.label}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
