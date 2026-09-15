import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { ROUTES } from '../../constants/routes.js';
import { Container } from '../common/Container.jsx';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { usePharmacy } from '../../context/PharmacyContext.jsx';
import { HeaderSearch } from './HeaderSearch.jsx';
import { LocationSelector } from './LocationSelector.jsx';

export function Navbar({
  isMobileOpen = false,
  onToggleMobile,
  triggerRef,
  actionSlot,
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { cartCount } = usePharmacy();
  const navContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAboutActive = location.pathname === ROUTES.ABOUT;
  const isPharmacyActive = location.pathname.startsWith('/pharmacy');
  const isServicesActive = location.pathname.startsWith('/services') || location.pathname.startsWith('/lab-tests');
  const isInsightsActive =
    location.pathname.startsWith('/insights') ||
    location.pathname.startsWith('/resources') ||
    location.pathname.startsWith('/blog');
  const isContactActive = location.pathname === ROUTES.CONTACT;

  return (
    <header
      ref={navContainerRef}
      className={clsx(
        'sticky top-0 z-sticky transition-all duration-300 border-b relative bg-white',
        isScrolled
          ? 'border-neutral-200/90 shadow-soft-sm py-2'
          : 'border-neutral-200/60 py-3'
      )}
    >
      <Container>
        {/* ============================================================
            TOP ROW: Brand Logo + Location Selector + Wide Search + Cart
            ============================================================ */}
        <div className="flex items-center justify-between gap-3 sm:gap-6 lg:gap-8">
          {/* 1. BRAND LOGO */}
          <div className="flex-shrink-0">
            <Link
              to={ROUTES.HOME}
              className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl p-1 group"
              aria-label="Go to Healix home - Healix Healthcare Homepage"
            >
              <img
                src="/images/healix_logo.png"
                alt="Healix - Health Made Simpler"
                className="h-10 sm:h-11 md:h-12 lg:h-[50px] w-auto object-contain transition-transform duration-200 group-hover:scale-102 rounded-xl shadow-xs"
              />
              <span className="sr-only">Healix</span>
            </Link>
          </div>

          {/* 2. LOCATION SELECTOR */}
          <div className="hidden md:block flex-shrink-0">
            <LocationSelector />
          </div>

          {/* 3. WIDE GLOBAL SEARCH BAR */}
          <div className="hidden sm:block flex-1 max-w-2xl">
            <HeaderSearch />
          </div>

          {/* 4. CART & MOBILE TOGGLE */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {actionSlot}

            {/* Guest-First Shopping Cart with Badge */}
            <Link
              to={ROUTES.PHARMACY_CART}
              className="relative p-2.5 rounded-xl text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100/70 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary flex items-center justify-center cursor-pointer"
              aria-label={`Pharmacy Cart with ${cartCount} items`}
            >
              <ShoppingCart className="w-6 h-6 text-neutral-800" />
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-white text-[11px] font-bold flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            </Link>

            {/* Mobile Location Selector Icon */}
            <div className="md:hidden flex-shrink-0">
              <LocationSelector />
            </div>

            {/* Mobile Menu Hamburger */}
            <div className="flex lg:hidden items-center flex-shrink-0">
              <button
                ref={triggerRef}
                type="button"
                onClick={onToggleMobile}
                className="p-2 rounded-xl text-neutral-800 hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
                aria-label={isMobileOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
                aria-expanded={isMobileOpen}
                aria-controls="mobile-navigation-drawer"
              >
                {isMobileOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================
            BOTTOM ROW: Primary Navigation Links (About | Pharmacy | Services | Insights | Contact)
            ============================================================ */}
        <nav
          className="hidden lg:flex items-center justify-start gap-8 pt-3 border-t border-neutral-100 mt-2.5 relative"
          aria-label="Primary Navigation"
        >
          {/* 1. About */}
          <Link
            to={ROUTES.ABOUT}
            aria-current={isAboutActive ? 'page' : undefined}
            className={clsx(
              'relative py-1 text-sm transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-1',
              isAboutActive
                ? 'text-[#075C45] font-semibold'
                : 'text-neutral-700 hover:text-[#075C45] font-medium'
            )}
          >
            <span>About</span>
            {isAboutActive && (
              <span
                className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#93D51B] rounded-full transition-all duration-200"
                aria-hidden="true"
              />
            )}
          </Link>

          {/* 2. Pharmacy */}
          <Link
            to={ROUTES.PHARMACY}
            aria-current={isPharmacyActive ? 'page' : undefined}
            className={clsx(
              'relative py-1 text-sm transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-1',
              isPharmacyActive
                ? 'text-[#075C45] font-semibold'
                : 'text-neutral-700 hover:text-[#075C45] font-medium'
            )}
          >
            <span>Pharmacy</span>
            {isPharmacyActive && (
              <span
                className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#93D51B] rounded-full transition-all duration-200"
                aria-hidden="true"
              />
            )}
          </Link>

          {/* 3. Services */}
          <Link
            to={ROUTES.SERVICES}
            aria-current={isServicesActive ? 'page' : undefined}
            className={clsx(
              'relative py-1 text-sm transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-1',
              isServicesActive
                ? 'text-[#075C45] font-semibold'
                : 'text-neutral-700 hover:text-[#075C45] font-medium'
            )}
          >
            <span>Services</span>
            {isServicesActive && (
              <span
                className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#93D51B] rounded-full transition-all duration-200"
                aria-hidden="true"
              />
            )}
          </Link>

          {/* 4. Insights */}
          <Link
            to={ROUTES.INSIGHTS}
            aria-current={isInsightsActive ? 'page' : undefined}
            className={clsx(
              'relative py-1 text-sm transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-1',
              isInsightsActive
                ? 'text-[#075C45] font-semibold'
                : 'text-neutral-700 hover:text-[#075C45] font-medium'
            )}
          >
            <span>Insights</span>
            {isInsightsActive && (
              <span
                className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#93D51B] rounded-full transition-all duration-200"
                aria-hidden="true"
              />
            )}
          </Link>

          {/* 5. Contact */}
          <Link
            to={ROUTES.CONTACT}
            aria-current={isContactActive ? 'page' : undefined}
            className={clsx(
              'relative py-1 text-sm transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-1',
              isContactActive
                ? 'text-[#075C45] font-semibold'
                : 'text-neutral-700 hover:text-[#075C45] font-medium'
            )}
          >
            <span>Contact</span>
            {isContactActive && (
              <span
                className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#93D51B] rounded-full transition-all duration-200"
                aria-hidden="true"
              />
            )}
          </Link>
        </nav>
      </Container>
    </header>
  );
}
