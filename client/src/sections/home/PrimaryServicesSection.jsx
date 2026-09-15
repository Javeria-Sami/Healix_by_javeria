import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes.js';
import { Container } from '../../components/common/Container.jsx';
import { ShieldCheck, Truck, Heart, FlaskConical, Home as HomeIcon, Calendar, ArrowRight } from 'lucide-react';

export function PrimaryServicesSection() {
  return (
    <section
      id="primary-services"
      aria-label="Our Services"
      className="py-12 sm:py-16 lg:py-20 bg-white border-b border-[#DCE8E3]/60 relative overflow-hidden"
    >
      <Container>
        {/* ============================================================
            SECTION HEADER (Centered Pill + Title + Subtitle)
            ============================================================ */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-3">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center justify-center">
            <span className="px-4 py-1 rounded-full bg-[#EAF5EF] border border-[#DCE8E3] text-[11px] font-bold tracking-[0.2em] text-[#075C49] uppercase">
              OUR SERVICES
            </span>
          </div>

          {/* Heading */}
          <h2
            id="primary-services-heading"
            className="font-heading text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#10231F] tracking-tight leading-tight"
          >
            How Can We Help <span className="font-serif italic font-normal text-[#075C49]">You?</span>
          </h2>

          {/* Subtitle */}
          <p className="font-body text-sm sm:text-base text-neutral-600 max-w-xl mx-auto leading-relaxed">
            Quick, reliable and convenient healthcare services — all in one place.
          </p>
        </div>

        {/* ============================================================
            2-CARD SERVICES GRID
            ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {/* ============================================================
              CARD 1: Pharmacy / Order Medicines (Green Theme)
              ============================================================ */}
          <article className="group relative flex flex-col justify-between bg-gradient-to-r from-[#F4F9F6] via-[#F4F9F6] to-[#E8F4EE] rounded-[28px] sm:rounded-[32px] border border-[#DCE8E3] p-6 sm:p-8 lg:p-10 overflow-hidden shadow-soft-xs hover:shadow-soft-sm transition-all duration-300 min-h-[320px] sm:min-h-[340px]">
            {/* Background Arch Shapes */}
            <div
              className="absolute -right-12 top-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-[#D7EDE1]/40 pointer-events-none transition-transform duration-500 group-hover:scale-105"
              aria-hidden="true"
            />
            <div
              className="absolute -right-4 top-1/2 -translate-y-1/2 w-48 h-48 sm:w-60 sm:h-60 rounded-full bg-[#C6E6D3]/40 pointer-events-none"
              aria-hidden="true"
            />

            {/* Right Subject Image (Package Delivery) */}
            <div className="absolute right-0 bottom-0 top-0 h-full w-[45%] sm:w-[50%] pointer-events-none select-none flex items-end justify-end overflow-hidden">
              <img
                src="/images/service_pharmacy_delivery.png"
                alt="Healix medicine delivery package delivered with care"
                className="w-full h-auto max-h-full object-contain object-right-bottom transition-transform duration-500 group-hover:scale-102"
                loading="lazy"
              />
            </div>

            {/* Card Content (Left-aligned) */}
            <div className="relative z-10 max-w-[65%] sm:max-w-[58%] space-y-4 text-left">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#075C49] uppercase block font-sans">
                PHARMACY
              </span>

              <div className="space-y-1.5">
                <h3 className="font-heading text-2xl sm:text-[28px] font-extrabold text-[#10231F] tracking-tight leading-snug">
                  Order Medicines
                </h3>
                <p className="font-body text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-xs">
                  Get genuine medicines from trusted brands, delivered to your doorstep.
                </p>
              </div>

              {/* 3 Mini Features */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3.5 pt-1">
                <div className="flex items-center gap-1.5 text-left">
                  <div className="w-7 h-7 rounded-lg bg-white/80 border border-[#DCE8E3] text-[#075C49] flex items-center justify-center flex-shrink-0 shadow-2xs">
                    <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <span className="text-[11px] font-semibold text-neutral-700 leading-tight">
                    Genuine<br className="hidden sm:inline" /> Products
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-left">
                  <div className="w-7 h-7 rounded-lg bg-white/80 border border-[#DCE8E3] text-[#075C49] flex items-center justify-center flex-shrink-0 shadow-2xs">
                    <Truck className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <span className="text-[11px] font-semibold text-neutral-700 leading-tight">
                    Fast<br className="hidden sm:inline" /> Delivery
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-left">
                  <div className="w-7 h-7 rounded-lg bg-white/80 border border-[#DCE8E3] text-[#075C49] flex items-center justify-center flex-shrink-0 shadow-2xs">
                    <Heart className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <span className="text-[11px] font-semibold text-neutral-700 leading-tight">
                    Care You<br className="hidden sm:inline" /> Can Trust
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <Link
                  to={ROUTES.PHARMACY}
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[#075C49] hover:bg-[#054839] text-white font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all duration-200 group/btn focus:outline-none focus-visible:ring-2 focus-visible:ring-[#075C49] focus-visible:ring-offset-2"
                >
                  <span>Order Medicines</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </article>

          {/* ============================================================
              CARD 2: Diagnostics / Book Lab Tests (Blue Theme)
              ============================================================ */}
          <article className="group relative flex flex-col justify-between bg-gradient-to-r from-[#F4F8FB] via-[#F4F8FB] to-[#EBF3FA] rounded-[28px] sm:rounded-[32px] border border-[#D8E6F2] p-6 sm:p-8 lg:p-10 overflow-hidden shadow-soft-xs hover:shadow-soft-sm transition-all duration-300 min-h-[320px] sm:min-h-[340px]">
            {/* Background Arch Shapes */}
            <div
              className="absolute -right-12 top-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-[#D4E7F7]/40 pointer-events-none transition-transform duration-500 group-hover:scale-105"
              aria-hidden="true"
            />
            <div
              className="absolute -right-4 top-1/2 -translate-y-1/2 w-48 h-48 sm:w-60 sm:h-60 rounded-full bg-[#C2DEF5]/40 pointer-events-none"
              aria-hidden="true"
            />

            {/* Right Subject Image (Lab Test Diagnostics) */}
            <div className="absolute right-0 bottom-0 top-0 h-full w-[45%] sm:w-[50%] pointer-events-none select-none flex items-end justify-end overflow-hidden">
              <img
                src="/images/service_lab_diagnostics.png"
                alt="Clinical laboratory diagnostic sample testing"
                className="w-full h-auto max-h-full object-contain object-right-bottom transition-transform duration-500 group-hover:scale-102"
                loading="lazy"
              />
            </div>

            {/* Card Content (Left-aligned) */}
            <div className="relative z-10 max-w-[65%] sm:max-w-[58%] space-y-4 text-left">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#1A5276] uppercase block font-sans">
                DIAGNOSTICS
              </span>

              <div className="space-y-1.5">
                <h3 className="font-heading text-2xl sm:text-[28px] font-extrabold text-[#10231F] tracking-tight leading-snug">
                  Book Lab Tests
                </h3>
                <p className="font-body text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-xs">
                  Home-sampling & in-lab bookings at your convenience.
                </p>
              </div>

              {/* 3 Mini Features */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3.5 pt-1">
                <div className="flex items-center gap-1.5 text-left">
                  <div className="w-7 h-7 rounded-lg bg-white/80 border border-[#D8E6F2] text-[#1A5276] flex items-center justify-center flex-shrink-0 shadow-2xs">
                    <FlaskConical className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <span className="text-[11px] font-semibold text-neutral-700 leading-tight">
                    Accurate<br className="hidden sm:inline" /> Results
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-left">
                  <div className="w-7 h-7 rounded-lg bg-white/80 border border-[#D8E6F2] text-[#1A5276] flex items-center justify-center flex-shrink-0 shadow-2xs">
                    <HomeIcon className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <span className="text-[11px] font-semibold text-neutral-700 leading-tight">
                    Home<br className="hidden sm:inline" /> Collection
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-left">
                  <div className="w-7 h-7 rounded-lg bg-white/80 border border-[#D8E6F2] text-[#1A5276] flex items-center justify-center flex-shrink-0 shadow-2xs">
                    <Calendar className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <span className="text-[11px] font-semibold text-neutral-700 leading-tight">
                    Easy<br className="hidden sm:inline" /> Scheduling
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <Link
                  to={ROUTES.LAB_TESTS || ROUTES.SERVICES}
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[#1A5276] hover:bg-[#133F5C] text-white font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all duration-200 group/btn focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A5276] focus-visible:ring-offset-2"
                >
                  <span>Book a Lab Test</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
