import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { ROUTES } from '../../constants/routes.js';
import { PHARMACY_NAV } from '../../data/navigation.js';
import { usePharmacy } from '../../context/PharmacyContext.jsx';
import {
  ChevronDown,
  ArrowRight,
  Pill,
  Sparkles,
  HeartPulse,
  ShoppingBag,
  Phone,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { HeaderSearch } from './HeaderSearch.jsx';
import { trackConversionEvent, CONVERSION_CATEGORIES } from '../../services/conversionAnalytics.js';

export function MobileMenu({ isOpen, onClose, triggerRef }) {
  const location = useLocation();
  const drawerRef = useRef(null);
  const { cartCount } = usePharmacy();

  // Accordion states
  const [pharmacyOpen, setPharmacyOpen] = useState(true);
  const [openPharmacySection, setOpenPharmacySection] = useState('medications');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
        if (triggerRef?.current && typeof triggerRef.current.focus === 'function') {
          triggerRef.current.focus();
        }
      };
    }
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  const isAboutActive = location.pathname === ROUTES.ABOUT;
  const isPharmacyActive = location.pathname.startsWith('/pharmacy');
  const isServicesActive = location.pathname.startsWith('/services') || location.pathname.startsWith('/lab-tests');
  const isInsightsActive =
    location.pathname.startsWith('/insights') ||
    location.pathname.startsWith('/resources') ||
    location.pathname.startsWith('/blog');
  const isContactActive = location.pathname === ROUTES.CONTACT;

  const sectionIcons = {
    'medications': Pill,
    'wellness-beauty': Sparkles,
    'devices-injectables': HeartPulse,
  };

  return (
    <div
      id="mobile-navigation-drawer"
      ref={drawerRef}
      className="fixed inset-x-0 top-20 bottom-0 z-drawer bg-white/98 backdrop-blur-xl border-t border-neutral-200 p-5 pb-[max(2rem,env(safe-area-inset-bottom))] overflow-y-auto lg:hidden animate-in fade-in duration-200 flex flex-col justify-between gap-6 shadow-2xl"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
    >
      <nav className="flex flex-col gap-3" aria-label="Mobile Navigation Links">
        {/* Mobile Search Bar */}
        <div className="pb-2">
          <HeaderSearch onSelectResult={onClose} />
        </div>

        {/* 1. About */}
        <Link
          to={ROUTES.ABOUT}
          onClick={onClose}
          aria-current={isAboutActive ? 'page' : undefined}
          className={clsx(
            'min-h-[48px] flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all duration-150',
            isAboutActive
              ? 'text-primary bg-primary-50 font-bold border-l-4 border-primary pl-3'
              : 'text-neutral-800 hover:text-neutral-900 hover:bg-neutral-50'
          )}
        >
          <span className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-primary" />
            <span>About</span>
          </span>
          {isAboutActive && <span className="text-xs text-primary font-bold uppercase tracking-wider">Current</span>}
        </Link>

        {/* 2. Pharmacy (Expandable Accordion) */}
        <div className="rounded-xl border border-neutral-200/80 overflow-hidden bg-neutral-50/50">
          <button
            type="button"
            onClick={() => setPharmacyOpen((prev) => !prev)}
            aria-expanded={pharmacyOpen}
            className={clsx(
              'min-h-[48px] w-full flex items-center justify-between px-4 py-3.5 text-base font-semibold transition-colors',
              isPharmacyActive ? 'text-primary bg-primary-50/80 font-bold' : 'text-neutral-900 hover:bg-neutral-100/70'
            )}
          >
            <span className="flex items-center gap-2.5">
              <Pill className="w-5 h-5 text-primary" />
              <span>Pharmacy</span>
            </span>
            <ChevronDown
              className={clsx(
                'w-5 h-5 text-neutral-500 transition-transform duration-200',
                pharmacyOpen && 'rotate-180 text-primary'
              )}
            />
          </button>

          {pharmacyOpen && (
            <div className="p-2 space-y-2 bg-white border-t border-neutral-200/60 animate-in slide-in-from-top-2 duration-150">
              {PHARMACY_NAV.sections.map((section) => {
                const IconComponent = sectionIcons[section.id] || Pill;
                const isSectionOpen = openPharmacySection === section.id;
                return (
                  <div key={section.id} className="rounded-lg border border-neutral-100 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setOpenPharmacySection(isSectionOpen ? null : section.id)}
                      aria-expanded={isSectionOpen}
                      className="min-h-[44px] w-full flex items-center justify-between px-3.5 py-2.5 text-sm font-bold text-neutral-800 bg-neutral-50/80 hover:bg-neutral-100/80 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <IconComponent className="w-4 h-4 text-primary" />
                        <span>{section.title}</span>
                      </span>
                      <ChevronDown
                        className={clsx(
                          'w-4 h-4 text-neutral-400 transition-transform duration-200',
                          isSectionOpen && 'rotate-180 text-primary'
                        )}
                      />
                    </button>

                    {isSectionOpen && (
                      <ul className="p-2 space-y-1 bg-white border-t border-neutral-100" role="list">
                        {section.categories.map((cat) => (
                          <li key={cat.slug}>
                            <Link
                              to={cat.href}
                              onClick={onClose}
                              className="min-h-[42px] flex items-center justify-between px-3 py-2 rounded-md text-sm text-neutral-700 hover:text-primary hover:bg-primary-50/50 transition-colors"
                            >
                              <span>{cat.name}</span>
                              <ArrowRight className="w-3.5 h-3.5 text-neutral-300" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}

              {/* View All Categories Link */}
              <div className="pt-2">
                <Link
                  to={PHARMACY_NAV.viewAll.href}
                  onClick={onClose}
                  className="min-h-[44px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold text-primary bg-primary-50 hover:bg-primary-100 transition-colors"
                >
                  <span>{PHARMACY_NAV.viewAll.label}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* 3. Services */}
        <Link
          to={ROUTES.SERVICES}
          onClick={onClose}
          aria-current={isServicesActive ? 'page' : undefined}
          className={clsx(
            'min-h-[48px] flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all duration-150',
            isServicesActive
              ? 'text-primary bg-primary-50 font-bold border-l-4 border-primary pl-3'
              : 'text-neutral-800 hover:text-neutral-900 hover:bg-neutral-50'
          )}
        >
          <span className="flex items-center gap-2.5">
            <HeartPulse className="w-5 h-5 text-primary" />
            <span>Services</span>
          </span>
          {isServicesActive && <span className="text-xs text-primary font-bold uppercase tracking-wider">Current</span>}
        </Link>

        {/* 4. Insights */}
        <Link
          to={ROUTES.INSIGHTS}
          onClick={onClose}
          aria-current={isInsightsActive ? 'page' : undefined}
          className={clsx(
            'min-h-[48px] flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all duration-150',
            isInsightsActive
              ? 'text-primary bg-primary-50 font-bold border-l-4 border-primary pl-3'
              : 'text-neutral-800 hover:text-neutral-900 hover:bg-neutral-50'
          )}
        >
          <span className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-primary" />
            <span>Insights</span>
          </span>
          {isInsightsActive && <span className="text-xs text-primary font-bold uppercase tracking-wider">Current</span>}
        </Link>

        {/* 5. Contact */}
        <Link
          to={ROUTES.CONTACT}
          onClick={onClose}
          aria-current={isContactActive ? 'page' : undefined}
          className={clsx(
            'min-h-[48px] flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all duration-150',
            isContactActive
              ? 'text-primary bg-primary-50 font-bold border-l-4 border-primary pl-3'
              : 'text-neutral-800 hover:text-neutral-900 hover:bg-neutral-50'
          )}
        >
          <span className="flex items-center gap-2.5">
            <Phone className="w-5 h-5 text-primary" />
            <span>Contact</span>
          </span>
          {isContactActive && <span className="text-xs text-primary font-bold uppercase tracking-wider">Current</span>}
        </Link>

        {/* 6. Cart */}
        <Link
          to={ROUTES.PHARMACY_CART}
          onClick={onClose}
          className="min-h-[48px] flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold text-neutral-800 hover:bg-neutral-50 border border-neutral-200/80 transition-all duration-150"
        >
          <span className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <span>Pharmacy Cart</span>
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-primary text-white text-xs font-bold">
            {cartCount} {cartCount === 1 ? 'item' : 'items'}
          </span>
        </Link>

        {/* 6. Schedule Consultation CTA */}
        <div className="pt-1">
          <Link
            to={ROUTES.CONTACT}
            onClick={() => {
              trackConversionEvent({
                category: CONVERSION_CATEGORIES.CTA_CLICK,
                action: 'click_mobile_menu_cta',
                location: 'mobile_menu',
                destination: ROUTES.CONTACT,
              });
              onClose();
            }}
            className="min-h-[48px] w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#8FD21F] hover:bg-[#7CB919] text-[#10231E] text-sm font-extrabold transition-all shadow-soft-sm hover:shadow-soft-md"
          >
            <span>Schedule Consultation</span>
            <ArrowRight className="w-4 h-4 text-[#10231E]" />
          </Link>
        </div>
      </nav>

      {/* Clinical Support Footer */}
      <div className="pt-6 border-t border-neutral-200/80 text-xs text-neutral-500 space-y-2.5">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
          <span>Care Support: 24/7 Pharmacy Concierge</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
          <span>Direct Helpline: <a href="tel:+18004325491" className="text-primary font-medium hover:underline">+1 (800) 432-5491</a></span>
        </div>
        <div className="flex items-center gap-2 pt-1 text-[11px] text-neutral-400">
          <ShieldCheck className="w-3.5 h-3.5 text-primary flex-shrink-0" aria-hidden="true" />
          <span>Guest-First Healthcare • 100% Verified Medications</span>
        </div>
      </div>
    </div>
  );
}
