import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import MedicineSearchInput from '../../components/pharmacy/MedicineSearchInput';
import MedicineCard from '../../components/pharmacy/MedicineCard';
import PrescriptionUploadBanner from '../../components/pharmacy/PrescriptionUploadBanner';
import RequestMedicineModal from '../../components/pharmacy/RequestMedicineModal';
import {
  PHARMACY_CATEGORIES,
  getFeaturedMedicines,
  SAMPLE_MEDICINES
} from '../../data/pharmacy';

export default function PharmacyPage() {
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [requestItemName, setRequestItemName] = useState('');

  const featuredMedicines = getFeaturedMedicines();
  const otcMedicines = SAMPLE_MEDICINES.filter((m) => m.category === 'pain-fever-otc').slice(0, 4);
  const wellnessMedicines = SAMPLE_MEDICINES.filter((m) => m.category === 'wellness-vitamins').slice(0, 4);

  const handleRequestItem = (med) => {
    setRequestItemName(med.name);
    setRequestModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-neutral-50/50 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#F4F8F5] border-b border-[#DCEBE4]/60 text-text-primary pt-14 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Glow ambient decorations */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-64 bg-primary/5 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Verified Online Pharmacy & Health Store
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-text-primary mb-6 leading-tight max-w-4xl mx-auto font-heading">
            Your Medicines, Delivered With Care
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed font-body">
            Discover authentic medicines, daily health essentials, and medical devices. Backed by certified clinical pharmacists and safe delivery.
          </p>

          {/* Prominent Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <MedicineSearchInput />
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-text-muted">
              <span>Popular searches:</span>
              {['Panadol', 'Augmentin', 'Glucophage', 'Ventolin', 'Omega-3', 'Vitamin C'].map((term) => (
                <Link
                  key={term}
                  to={`${ROUTES.PHARMACY_SEARCH}?q=${encodeURIComponent(term)}`}
                  className="px-2.5 py-1 bg-white hover:bg-neutral-100 border border-border rounded-lg text-text-primary hover:text-primary transition-colors shadow-2xs"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to={ROUTES.PHARMACY_MEDICINES}
              className="px-6 py-3.5 bg-primary hover:bg-primary-hover text-white font-bold rounded-2xl transition-all shadow-md"
            >
              Shop Medicines A–Z
            </Link>
            <Link
              to={ROUTES.PHARMACY_PRESCRIPTION}
              className="px-6 py-3.5 bg-white hover:bg-neutral-50 text-text-primary font-semibold rounded-2xl border border-border shadow-xs transition-all"
            >
              Upload Prescription
            </Link>
            <Link
              to={ROUTES.PHARMACY_CATEGORIES}
              className="px-6 py-3.5 bg-surface hover:bg-surface-muted text-text-secondary hover:text-text-primary font-medium rounded-2xl border border-border transition-all"
            >
              All Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Safety Notice Bar */}
      <div className="bg-amber-50/90 border-y border-amber-200/70 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-2 text-xs md:text-sm text-amber-900 text-center font-medium">
          <svg className="w-4 h-4 text-amber-700 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>
            <strong>Medical Safety Note:</strong> Healix is an online pharmacy platform, not a replacement for a doctor's diagnosis. Use medicines strictly according to your doctor's advice. Prescription required for Rx products.
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        {/* 2. PRESCRIPTION UPLOAD BANNER */}
        <PrescriptionUploadBanner />

        {/* 3. POPULAR CATEGORIES */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
                Explore Top Categories
              </h2>
              <p className="text-sm text-neutral-500 mt-1">
                Browse verified pharmaceutical and health care departments
              </p>
            </div>
            <Link
              to={ROUTES.PHARMACY_CATEGORIES}
              className="text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1 group"
            >
              View all ({PHARMACY_CATEGORIES.length})
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {PHARMACY_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/pharmacy/category/${cat.id}`}
                className="group relative p-5 bg-white rounded-3xl border border-neutral-200/70 hover:border-primary-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl ${cat.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                    {cat.icon}
                  </div>
                  <span className="text-xs font-semibold text-neutral-400 group-hover:text-primary-600 transition-colors">
                    {cat.itemCount}+ items
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900 group-hover:text-primary-600 text-sm sm:text-base transition-colors mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-neutral-500 line-clamp-2">
                    {cat.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 4. FEATURED MEDICINES */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
                  Featured Healthcare Products
                </h2>
              </div>
              <p className="text-sm text-neutral-500 mt-1">
                Most requested certified medications and healthcare essentials
              </p>
            </div>
            <Link
              to={ROUTES.PHARMACY_MEDICINES}
              className="text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1 group"
            >
              Browse Catalog
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredMedicines.map((med) => (
              <MedicineCard key={med.id} medicine={med} onRequestItem={handleRequestItem} />
            ))}
          </div>
        </section>

        {/* 5. OVER-THE-COUNTER (OTC) SECTION */}
        <section className="p-6 sm:p-8 bg-white rounded-3xl border border-neutral-200/70 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">No Prescription Needed</span>
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight mt-0.5">
                Pain Relief, Fever & Daily Care
              </h2>
            </div>
            <Link
              to="/pharmacy/category/pain-fever-otc"
              className="text-xs sm:text-sm font-semibold text-primary-600 hover:text-primary-700"
            >
              View All OTC Products →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {otcMedicines.map((med) => (
              <MedicineCard key={med.id} medicine={med} onRequestItem={handleRequestItem} />
            ))}
          </div>
        </section>

        {/* 6. WELLNESS & VITAMINS SECTION */}
        <section className="p-6 sm:p-8 bg-white rounded-3xl border border-neutral-200/70 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Daily Health & Immunity</span>
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight mt-0.5">
                Vitamins, Minerals & Supplements
              </h2>
            </div>
            <Link
              to="/pharmacy/category/wellness-vitamins"
              className="text-xs sm:text-sm font-semibold text-primary-600 hover:text-primary-700"
            >
              View All Vitamins →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wellnessMedicines.map((med) => (
              <MedicineCard key={med.id} medicine={med} onRequestItem={handleRequestItem} />
            ))}
          </div>
        </section>

        {/* 7. HOW IT WORKS (3 Simple Steps) */}
        <section className="bg-neutral-100/70 rounded-3xl p-8 md:p-12 border border-neutral-200/60">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-primary-600">Simplicity & Clarity</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mt-1">
              How Healix Pharmacy Works
            </h2>
            <p className="text-sm text-neutral-600 mt-2">
              A frictionless healthcare commerce experience designed to minimize stress.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-neutral-200/60 shadow-sm relative">
              <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-700 font-extrabold text-sm flex items-center justify-center mb-4">
                01
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">Search or Upload</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Find your required medicines via search, A–Z catalog, or upload a clear photo/PDF of your doctor's prescription.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-neutral-200/60 shadow-sm relative">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 font-extrabold text-sm flex items-center justify-center mb-4">
                02
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">Review & Verify</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Check item strength, dosage, pack size, and transparent pricing. Licensed pharmacists verify prescription orders before packing.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-neutral-200/60 shadow-sm relative">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 font-extrabold text-sm flex items-center justify-center mb-4">
                03
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">Fast Doorstep Delivery</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Confirm your order with transparent checkout. Receive prompt doorstep delivery in secure, temperature-controlled packaging.
              </p>
            </div>
          </div>
        </section>

        {/* 8. TRUST & SAFETY SECTION */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white p-8 md:p-12 rounded-3xl border border-neutral-200/70 shadow-sm">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-4 border border-emerald-200">
              ✓ Clinical Standards & Safety
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight mb-4">
              Why Patients Trust Healix Pharmacy
            </h2>
            <div className="space-y-4 text-sm text-neutral-600">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">
                  1
                </span>
                <div>
                  <h4 className="font-semibold text-neutral-900">100% Genuine & Verified Stock</h4>
                  <p className="text-xs text-neutral-500 mt-0.5">Directly sourced from licensed pharmaceutical distributors and manufacturers.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">
                  2
                </span>
                <div>
                  <h4 className="font-semibold text-neutral-900">Registered Pharmacist Oversight</h4>
                  <p className="text-xs text-neutral-500 mt-0.5">Every prescription is reviewed for drug interactions, correct dosage, and patient safety.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">
                  3
                </span>
                <div>
                  <h4 className="font-semibold text-neutral-900">Zero Dark Patterns</h4>
                  <p className="text-xs text-neutral-500 mt-0.5">Transparent prices, exact unit rates, and authentic discounts with no hidden surprise fees.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">
                  4
                </span>
                <div>
                  <h4 className="font-semibold text-neutral-900">Data Privacy & Non-Public Storage</h4>
                  <p className="text-xs text-neutral-500 mt-0.5">Prescriptions and health queries are securely managed and never shared with third parties.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 rounded-3xl bg-neutral-50 border border-neutral-200/80">
            <h3 className="text-lg font-bold text-neutral-900 mb-3">
              Frequently Asked Questions
            </h3>
            <div className="space-y-3 text-xs sm:text-sm">
              <details className="p-3 bg-white rounded-xl border border-neutral-200/70 group cursor-pointer">
                <summary className="font-semibold text-neutral-800 list-none flex justify-between items-center">
                  <span>How do I order prescription medicines?</span>
                  <span className="text-neutral-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-neutral-600 text-xs leading-relaxed">
                  You can upload a photo or PDF of your doctor's prescription directly via our Prescription Upload page or during checkout for Rx-flagged medicines.
                </p>
              </details>

              <details className="p-3 bg-white rounded-xl border border-neutral-200/70 group cursor-pointer">
                <summary className="font-semibold text-neutral-800 list-none flex justify-between items-center">
                  <span>How long does delivery take?</span>
                  <span className="text-neutral-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-neutral-600 text-xs leading-relaxed">
                  Orders confirmed before 3:00 PM are dispatched same-day. Standard city delivery is within 24 to 48 hours in temperature-maintained parcels.
                </p>
              </details>

              <details className="p-3 bg-white rounded-xl border border-neutral-200/70 group cursor-pointer">
                <summary className="font-semibold text-neutral-800 list-none flex justify-between items-center">
                  <span>What if a required medicine is out of stock?</span>
                  <span className="text-neutral-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-neutral-600 text-xs leading-relaxed">
                  Click the "Request Item" button on the product card. Our procurement team will source the item and notify you immediately via phone or email.
                </p>
              </details>
            </div>
          </div>
        </section>
      </div>

      <RequestMedicineModal
        isOpen={requestModalOpen}
        onClose={() => setRequestModalOpen(false)}
        initialMedicineName={requestItemName}
      />
    </div>
  );
}
