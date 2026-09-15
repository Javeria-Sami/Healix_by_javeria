import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { PHARMACY_NAV } from '../../data/navigation';
import MedicineSearchInput from '../../components/pharmacy/MedicineSearchInput';
import { Pill, Sparkles, HeartPulse, ChevronRight, ShieldCheck, ArrowRight } from 'lucide-react';

export default function PharmacyCategoriesPage() {
  const sectionIcons = {
    'medications': Pill,
    'wellness-beauty': Sparkles,
    'devices-injectables': HeartPulse,
  };

  const sectionColors = {
    'medications': 'bg-emerald-50 text-emerald-700 border-emerald-100',
    'wellness-beauty': 'bg-violet-50 text-violet-700 border-violet-100',
    'devices-injectables': 'bg-blue-50 text-blue-700 border-blue-100',
  };

  return (
    <div className="min-h-screen bg-neutral-50/60 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200/80 pt-8 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-4" aria-label="Breadcrumb">
            <Link to={ROUTES.HOME} className="hover:text-primary-600 transition-colors">Home</Link>
            <span>/</span>
            <Link to={ROUTES.PHARMACY} className="hover:text-primary-600 transition-colors">Pharmacy</Link>
            <span>/</span>
            <span className="text-neutral-900 font-semibold" aria-current="page">All Categories</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#075B43] tracking-tight">
                All Pharmacy Categories
              </h1>
              <p className="text-sm text-neutral-500 mt-1.5 max-w-xl">
                Browse our structured medical departments, prescription medications, over-the-counter remedies, wellness products, and diagnostic equipment.
              </p>
            </div>
            <div className="w-full md:w-80">
              <MedicineSearchInput placeholder="Search within categories..." showRecent={false} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Category Sections */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-12">
        {PHARMACY_NAV.sections.map((section) => {
          const IconComponent = sectionIcons[section.id] || Pill;
          const colorClass = sectionColors[section.id] || 'bg-primary-50 text-primary-700 border-primary-100';

          return (
            <div key={section.id} className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-soft-sm">
              {/* Section Header */}
              <div className="flex items-center gap-3 pb-5 mb-6 border-b border-neutral-100">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${colorClass}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#075B43]">
                    {section.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-500">
                    {section.description} • ({section.categories.length} Specialized Departments)
                  </p>
                </div>
              </div>

              {/* Category Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    to={cat.href}
                    className="group p-4 rounded-2xl border border-neutral-100 hover:border-primary-300 hover:bg-neutral-50/80 transition-all duration-150 flex items-center justify-between"
                  >
                    <div>
                      <h3 className="text-sm font-bold text-[#075B43] group-hover:text-primary-600 transition-colors">
                        {cat.name}
                      </h3>
                      <span className="text-[11px] text-neutral-400">
                        Explore verified remedies
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-neutral-100/70 group-hover:bg-primary-50 flex items-center justify-center text-neutral-400 group-hover:text-primary-600 transition-colors">
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
