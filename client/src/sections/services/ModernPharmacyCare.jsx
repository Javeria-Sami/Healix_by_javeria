import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../components/common/Container.jsx';
import { Breadcrumb } from '../../components/common/Breadcrumb.jsx';
import { ROUTES } from '../../constants/routes.js';
import { Pill, UserCheck, Truck, Heart, FileText, ArrowRight, ShieldCheck } from 'lucide-react';

export const PHARMACY_OFFERINGS = [
  {
    id: 'prescription',
    title: 'Prescription Medicines',
    description: '100% genuine medicines, sourced from trusted suppliers.',
    icon: Pill,
    link: ROUTES.PHARMACY_PRESCRIPTION,
  },
  {
    id: 'consultations',
    title: 'Pharmacist Consultations',
    description: 'Expert advice for safe and effective use.',
    icon: UserCheck,
    link: ROUTES.CONTACT,
  },
  {
    id: 'delivery',
    title: 'Convenient Home Delivery',
    description: 'Get your medicines delivered to your doorstep.',
    icon: Truck,
    link: ROUTES.PHARMACY_MEDICINES,
  },
  {
    id: 'wellness',
    title: 'Wellness Essentials',
    description: 'Vitamins, supplements and everyday health products.',
    icon: Heart,
    link: ROUTES.PHARMACY_CATEGORIES,
  },
  {
    id: 'support',
    title: 'Ongoing Medication Support',
    description: 'Guidance for chronic and long-term conditions.',
    icon: FileText,
    link: ROUTES.CONTACT,
  },
];

export function ModernPharmacyCare() {
  const breadcrumbItems = [
    { label: 'Home', href: ROUTES.HOME },
    { label: 'Services', active: true },
  ];

  return (
    <section
      id="modern-pharmacy-care"
      aria-label="Modern Pharmacy Care"
      className="pt-6 pb-12 sm:pt-8 sm:pb-16 lg:pt-10 lg:pb-20 bg-white border-b border-[#DCEBE4]/60 relative overflow-hidden"
    >
      <Container>
        {/* ============================================================
            BREADCRUMB & SECTION HEADER (Left-Aligned Group)
            ============================================================ */}
        <div className="mb-8 sm:mb-12 max-w-6xl mx-auto">
          {/* Breadcrumbs Left-Aligned */}
          <div className="mb-5 sm:mb-6">
            <Breadcrumb items={breadcrumbItems} />
          </div>

          <div className="space-y-2 text-left">
            <span className="text-xs font-semibold tracking-[0.18em] text-[#075C46] uppercase block font-sans">
              PRIMARY SERVICE
            </span>
            <h1
              id="modern-pharmacy-heading"
              className="font-heading text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-neutral-900 tracking-tight leading-tight"
            >
              Modern Pharmacy Care
            </h1>
            <p className="font-body text-sm sm:text-base text-[#42554E] max-w-xl leading-relaxed pt-1">
              Safe, convenient, and personalized pharmacy support to help you and your family live healthier, every day.
            </p>
          </div>
        </div>

        {/* ============================================================
            TWO-CARD GRID LAYOUT
            ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto">
          {/* ============================================================
              LEFT CARD: Prescription Care, Made Simpler (Full Background Image)
              ============================================================ */}
          <article className="lg:col-span-7 bg-[#F1F8F4] border border-[#DCEBE4] rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden shadow-soft-xs hover:shadow-soft-sm transition-all duration-300 group min-h-[380px] sm:min-h-[400px]">
            {/* Full Background Photography Layer */}
            <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden">
              <img
                src="/images/pharmacy_card_bg.png"
                alt="Healix certified medicine bottle on stone pedestal"
                className="w-full h-full object-cover object-right transition-transform duration-500 ease-out group-hover:scale-102"
                loading="lazy"
              />
              {/* Subtle Gradient Mask: Ensures high text contrast on the left while seamlessly revealing the bottle and mint background on the right */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-[#F1F8F4] via-[#F1F8F4]/85 sm:via-[#F1F8F4]/75 to-transparent w-full sm:w-[65%] lg:w-[60%] pointer-events-none"
                aria-hidden="true"
              />
            </div>

            {/* Content Container (Left-aligned, clear text over soft background) */}
            <div className="relative z-10 space-y-4 max-w-full xs:max-w-[62%] sm:max-w-[58%] text-left">
              {/* Pill Icon Badge */}
              <div className="w-11 h-11 rounded-2xl bg-[#075B43] text-white flex items-center justify-center shadow-xs">
                <Pill className="w-5 h-5 stroke-[2]" aria-hidden="true" />
              </div>

              <div className="space-y-2 pt-1">
                <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.18em] text-neutral-600 uppercase block">
                  TRUSTED PHARMACY SUPPORT
                </span>
                <h3 className="font-heading text-2xl sm:text-[28px] lg:text-[32px] font-extrabold text-neutral-900 tracking-tight leading-tight">
                  Prescription Care, <br />
                  Made Simpler
                </h3>
                <p className="font-body text-xs sm:text-sm text-neutral-600 leading-relaxed pt-1">
                  From prescription refills to expert guidance, we make it easy to access the medicines you need with confidence and care.
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-3">
                <Link
                  to={ROUTES.PHARMACY}
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-full bg-[#075B43] hover:bg-[#064C38] text-white font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all duration-200 group/btn focus:outline-none focus-visible:ring-2 focus-visible:ring-[#075B43] focus-visible:ring-offset-2"
                >
                  <span>Explore Pharmacy Services</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Bottom/Floating Trust Chip */}
            <div className="mt-6 pt-4 border-t border-[#DCEBE4]/80 flex items-center gap-2 text-xs font-semibold text-[#075B43] relative z-10">
              <ShieldCheck className="w-4 h-4 text-[#075B43]" aria-hidden="true" />
              <span>Safe • Authentic • Reliable</span>
            </div>
          </article>

          {/* ============================================================
              RIGHT CARD: What We Offer (5 Interactive Service Rows)
              ============================================================ */}
          <article className="lg:col-span-5 bg-white border border-[#DCEBE4] rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 flex flex-col justify-between shadow-soft-xs hover:shadow-soft-sm transition-all duration-300">
            {/* Header: Title & Action Link */}
            <div className="flex items-center justify-between pb-4 border-b border-[#DCEBE4]/60">
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-neutral-900">
                What We Offer
              </h3>
              <Link
                to={ROUTES.PHARMACY_CATEGORIES}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#075B43] hover:text-[#064C38] transition-colors group/link"
              >
                <span>More Than Medicines</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-1" aria-hidden="true" />
              </Link>
            </div>

            {/* List of 5 Offerings */}
            <div className="py-2 divide-y divide-[#DCEBE4]/40">
              {PHARMACY_OFFERINGS.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.id}
                    to={item.link}
                    className="group/item flex items-start gap-3.5 py-3 sm:py-3.5 first:pt-2 last:pb-0 text-left transition-colors rounded-xl px-1 hover:bg-[#F1F8F4]/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#075B43]"
                  >
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#EAF5EF] text-[#075B43] flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover/item:scale-105">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.75]" aria-hidden="true" />
                    </div>
                    <div className="space-y-0.5 min-w-0">
                      <h4 className="font-heading text-xs sm:text-sm font-bold text-neutral-900 group-hover/item:text-[#075B43] transition-colors">
                        {item.title}
                      </h4>
                      <p className="font-body text-[11px] sm:text-xs text-neutral-500 leading-snug">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
