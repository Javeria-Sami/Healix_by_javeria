import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes.js';
import { Container } from '../../components/common/Container.jsx';
import { ArrowRight } from 'lucide-react';

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
          <article className="group relative flex flex-col justify-between rounded-[28px] sm:rounded-[32px] border border-[#DCE8E3] p-7 sm:p-9 lg:p-11 overflow-hidden shadow-soft-xs hover:shadow-soft-sm transition-all duration-300 min-h-[300px] sm:min-h-[320px] bg-[#F4F9F6]">
            {/* Background Visual Layer */}
            <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden" aria-hidden="true">
              <img
                src="/images/service_pharmacy_card_bg.png"
                alt=""
                className="w-full h-full object-cover object-right transition-transform duration-500 group-hover:scale-[1.02]"
                loading="lazy"
              />
            </div>

            {/* Card Content (Left-aligned) */}
            <div className="relative z-10 max-w-[62%] sm:max-w-[55%] flex flex-col justify-between h-full space-y-6 text-left">
              <div className="space-y-2.5">
                <span className="text-[11px] font-bold tracking-[0.2em] text-[#075C49] uppercase block font-sans">
                  PHARMACY
                </span>
                <h3 className="font-heading text-2xl sm:text-[28px] font-extrabold text-[#10231F] tracking-tight leading-snug">
                  Order Medicines
                </h3>
                <p className="font-body text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-xs">
                  Get genuine medicines from trusted brands, delivered to your doorstep.
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <Link
                  to={ROUTES.PHARMACY}
                  className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-xl bg-[#075C49] hover:bg-[#054839] text-white font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all duration-200 group/btn focus:outline-none focus-visible:ring-2 focus-visible:ring-[#075C49] focus-visible:ring-offset-2"
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
          <article className="group relative flex flex-col justify-between rounded-[28px] sm:rounded-[32px] border border-[#D8E6F2] p-7 sm:p-9 lg:p-11 overflow-hidden shadow-soft-xs hover:shadow-soft-sm transition-all duration-300 min-h-[300px] sm:min-h-[320px] bg-[#F4F8FB]">
            {/* Background Visual Layer */}
            <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden" aria-hidden="true">
              <img
                src="/images/service_lab_card_bg.png"
                alt=""
                className="w-full h-full object-cover object-right transition-transform duration-500 group-hover:scale-[1.02]"
                loading="lazy"
              />
            </div>

            {/* Card Content (Left-aligned) */}
            <div className="relative z-10 max-w-[62%] sm:max-w-[55%] flex flex-col justify-between h-full space-y-6 text-left">
              <div className="space-y-2.5">
                <span className="text-[11px] font-bold tracking-[0.2em] text-[#1A5276] uppercase block font-sans">
                  DIAGNOSTICS
                </span>
                <h3 className="font-heading text-2xl sm:text-[28px] font-extrabold text-[#10231F] tracking-tight leading-snug">
                  Book Lab Tests
                </h3>
                <p className="font-body text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-xs">
                  Home-sampling & in-lab bookings at your convenience.
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <Link
                  to={ROUTES.LAB_TESTS || ROUTES.SERVICES}
                  className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-xl bg-[#1A5276] hover:bg-[#133F5C] text-white font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all duration-200 group/btn focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A5276] focus-visible:ring-offset-2"
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
