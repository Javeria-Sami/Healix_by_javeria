import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes.js';
import { Container } from '../../components/common/Container.jsx';
import { Pill, Sparkles, UserCheck, Truck, ArrowRight } from 'lucide-react';

export const PHARMACY_SERVICES = [
  {
    number: '01',
    title: 'Prescription Medicines',
    description: 'Verified medicines with trusted pharmacist support.',
    icon: Pill,
    link: ROUTES.PHARMACY_PRESCRIPTION,
    actionLabel: 'Upload Rx',
  },
  {
    number: '02',
    title: 'Everyday Health',
    description: 'OTC medicines, vitamins, and essential wellness products.',
    icon: Sparkles,
    link: ROUTES.PHARMACY_CATEGORIES,
    actionLabel: 'Browse OTC',
  },
  {
    number: '03',
    title: 'Pharmacist Guidance',
    description: 'Clear, practical advice for safer medication use.',
    icon: UserCheck,
    link: ROUTES.CONTACT,
    actionLabel: 'Consult Team',
  },
  {
    number: '04',
    title: 'Easy Ordering',
    description: 'Simple ordering with convenient doorstep delivery.',
    icon: Truck,
    link: ROUTES.PHARMACY_MEDICINES,
    actionLabel: 'Shop A–Z',
  },
];

export function PrimaryServicesSection() {
  return (
    <section
      id="primary-services"
      aria-label="Pharmacy Services"
      className="py-14 sm:py-18 lg:py-22 bg-[#F4F8F5] border-b border-[#D8E7E0]/60 transition-colors relative overflow-hidden"
    >
      {/* Subtle ambient lighting */}
      <div 
        className="absolute top-0 right-1/4 w-96 h-96 bg-[#075A46]/5 rounded-full blur-3xl pointer-events-none -z-10" 
        aria-hidden="true" 
      />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center max-w-6xl mx-auto">
          {/* ============================================================
              LEFT: Compact Editorial Introduction Block
              ============================================================ */}
          <div className="lg:col-span-5 space-y-6 text-left">
            {/* Small Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#D8E7E0] shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#94D126]" aria-hidden="true" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#075A46] uppercase">
                PHARMACY SERVICES
              </span>
            </div>

            {/* Main Heading */}
            <h2
              id="primary-services-heading"
              className="font-heading text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-neutral-900 tracking-tight leading-[1.18]"
            >
              Simple Pharmacy Care, <br />
              <span className="font-serif italic font-normal text-[#075A46]">
                Built Around You
              </span>
            </h2>

            {/* Short Supporting Sentence */}
            <p className="font-body text-sm sm:text-base text-neutral-600 leading-relaxed max-w-md">
              Trusted medicines, clear guidance, and convenient support when you need it.
            </p>

            {/* Primary CTA */}
            <div className="pt-2">
              <Link
                to={ROUTES.PHARMACY}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#075A46] hover:bg-[#054837] text-white font-bold text-sm shadow-xs hover:shadow-md transition-all duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#075A46] focus-visible:ring-offset-2 min-h-[44px]"
              >
                <span>Explore Pharmacy</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* ============================================================
              RIGHT: Clean 2x2 Grid of 4 Refined Service Cards
              ============================================================ */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {PHARMACY_SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.number}
                  to={service.link}
                  className="group relative flex flex-col justify-between p-6 sm:p-7 bg-white rounded-2xl border border-[#D8E7E0] hover:border-[#B7D9CA] hover:shadow-soft-sm transition-all duration-200 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#075A46]"
                >
                  <div>
                    {/* Card Top: Number & Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#EAF4EF] text-[#075A46] flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                        <Icon className="w-5 h-5 stroke-[1.75]" aria-hidden="true" />
                      </div>
                      <span className="text-xs font-bold font-mono text-[#075A46]/60 tracking-wider">
                        {service.number}
                      </span>
                    </div>

                    {/* Service Title */}
                    <h3 className="font-heading text-base sm:text-lg font-bold text-neutral-900 group-hover:text-[#075A46] transition-colors leading-snug mb-1.5">
                      {service.title}
                    </h3>

                    {/* One-Line Description */}
                    <p className="font-body text-xs sm:text-sm text-neutral-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Subtle Action Link Footer */}
                  <div className="pt-4 mt-2 flex items-center gap-1 text-xs font-bold text-[#075A46] opacity-80 group-hover:opacity-100 transition-opacity">
                    <span>{service.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

