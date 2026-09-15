import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, TestTubes, FlaskConical, Stethoscope } from 'lucide-react';
import { LAB_TESTS_NAV } from '../../data/navigation';

export default function LabTestsDropdown({ isOpen, onClose, triggerRef }) {
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

  const columnIcons = [TestTubes, FlaskConical, Stethoscope];

  return (
    <div
      ref={dropdownRef}
      role="region"
      aria-label="Lab Tests & Diagnostic Pathology Navigation Menu"
      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[92vw] max-w-5xl bg-white rounded-2xl shadow-soft-2xl border border-neutral-200/90 p-6 sm:p-8 z-50 animate-in fade-in zoom-in-95 duration-150 origin-top"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        {LAB_TESTS_NAV.columns.map((col, idx) => {
          const IconComponent = columnIcons[idx % columnIcons.length];
          return (
            <div key={col.id} className="flex flex-col">
              {/* Column Header */}
              <div className="flex items-center gap-2.5 pb-3.5 mb-3 border-b border-healix-border/50">
                <div className="w-8 h-8 rounded-lg bg-[#F1F8F4] flex items-center justify-center text-[#075B43]">
                  <IconComponent className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                    {col.title}
                  </h2>
                  <p className="text-[11px] text-neutral-600">
                    Clinical Diagnostic Tests
                  </p>
                </div>
              </div>

              {/* Lab Test Items */}
              <ul className="space-y-1" role="list">
                {col.items.map((item) => (
                  <li key={item.slug}>
                    <Link
                      to={item.href}
                      onClick={onClose}
                      className="group flex items-center justify-between px-3 py-1.5 rounded-lg text-sm text-neutral-700 hover:text-[#075B43] hover:bg-[#F1F8F4] transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <span className="font-normal group-hover:font-medium transition-all">
                        {item.name}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-neutral-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 text-[#075B43] transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* All Lab Tests Footer */}
      <div className="mt-6 pt-4 border-t border-healix-border/50 flex items-center justify-between bg-[#F7FBF8] -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 px-6 sm:px-8 py-3.5 rounded-b-2xl">
        <span className="text-xs text-neutral-600 font-medium">
          Accredited pathology, home blood sampling & fast digital test reports
        </span>
        <Link
          to={LAB_TESTS_NAV.viewAll.href}
          onClick={onClose}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#075B43] hover:text-[#064C38] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-2 py-1 transition-colors"
        >
          <span>{LAB_TESTS_NAV.viewAll.label}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
