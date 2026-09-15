import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { getMedicineBySlug, getMedicinesByCategory } from '../../data/pharmacy';
import { usePharmacy } from '../../context/PharmacyContext';
import MedicineCard from '../../components/pharmacy/MedicineCard';
import RequestMedicineModal from '../../components/pharmacy/RequestMedicineModal';

export default function MedicineDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = usePharmacy();
  const [quantity, setQuantity] = useState(1);
  const [btnState, setBtnState] = useState('idle'); // idle | loading | added
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // overview | usage | storage | warnings | faq

  const medicine = getMedicineBySlug(slug);

  if (!medicine) {
    return (
      <div className="min-h-screen bg-neutral-50 py-20 px-4 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-neutral-200/80 shadow-sm">
          <div className="text-4xl mb-4">💊</div>
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">Medicine Not Found</h1>
          <p className="text-sm text-neutral-500 mb-6">
            We couldn't locate the medicine you requested in our active directory.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              to={ROUTES.PHARMACY_MEDICINES}
              className="px-5 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-semibold hover:bg-primary-700 transition-colors"
            >
              Browse Medicines A–Z
            </Link>
            <Link
              to={ROUTES.PHARMACY}
              className="px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-sm font-medium transition-colors"
            >
              Pharmacy Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isOutOfStock = medicine.stockStatus === 'out-of-stock';
  const relatedProducts = getMedicinesByCategory(medicine.category)
    .filter((m) => m.id !== medicine.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    setBtnState('loading');
    setTimeout(() => {
      addToCart(medicine, quantity);
      setBtnState('added');
      setTimeout(() => setBtnState('idle'), 2200);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-neutral-50/60 pb-24">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-neutral-200/80 pt-6 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <nav className="flex flex-wrap items-center gap-2 text-xs text-neutral-500" aria-label="Breadcrumb">
            <Link to={ROUTES.HOME} className="hover:text-primary-600 transition-colors">Home</Link>
            <span>/</span>
            <Link to={ROUTES.PHARMACY} className="hover:text-primary-600 transition-colors">Pharmacy</Link>
            <span>/</span>
            <Link to={`/pharmacy/category/${medicine.category}`} className="hover:text-primary-600 capitalize transition-colors">
              {medicine.category.replace(/-/g, ' ')}
            </Link>
            <span>/</span>
            <span className="text-neutral-900 font-semibold truncate max-w-xs sm:max-w-md" aria-current="page">
              {medicine.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-12">
        {/* Main Product Section: Two Columns */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-neutral-200/80 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          
          {/* Left Column: Product Visual Container */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full aspect-square max-w-md rounded-3xl bg-neutral-50 border border-neutral-200/80 p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
              {/* Prescription / OTC Badge */}
              <div className="absolute top-4 left-4 z-10">
                {medicine.prescriptionRequired ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500 text-white rounded-full text-xs font-bold shadow-sm">
                    <span>Rx</span> Prescription Required
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-600 text-white rounded-full text-xs font-bold shadow-sm">
                    OTC (Over-The-Counter)
                  </span>
                )}
              </div>

              {/* Discount Tag */}
              {medicine.discountPercentage > 0 && (
                <div className="absolute top-4 right-4 z-10 px-2.5 py-1 bg-rose-500 text-white rounded-full text-xs font-bold shadow-sm">
                  {medicine.discountPercentage}% OFF
                </div>
              )}

              {/* Visual Presentation */}
              <div className="w-full h-full flex items-center justify-center p-4">
                {medicine.imageUrl ? (
                  <img
                    src={medicine.imageUrl}
                    alt={`${medicine.name} ${medicine.strength}`}
                    className="max-h-72 w-auto object-contain transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="text-center">
                    <div className="w-28 h-28 sm:w-36 sm:h-36 mx-auto rounded-3xl bg-primary-100/60 border border-primary-200/60 text-primary-700 flex items-center justify-center text-5xl sm:text-6xl shadow-sm mb-4">
                      {medicine.dosageForm.toLowerCase().includes('inhaler') ? '💨' :
                       medicine.dosageForm.toLowerCase().includes('syrup') || medicine.dosageForm.toLowerCase().includes('liquid') ? '🧴' :
                       medicine.dosageForm.toLowerCase().includes('capsule') ? '💊' :
                       medicine.dosageForm.toLowerCase().includes('strip') || medicine.dosageForm.toLowerCase().includes('device') ? '🩺' : '💊'}
                    </div>
                    <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                      Verified Pharmaceutical Specimen
                    </div>
                    <div className="text-xs text-neutral-500 mt-0.5">
                      Pack: {medicine.packSize}
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Storage / Safety Badge under Image */}
            <div className="w-full max-w-md mt-4 p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200/60 text-xs text-neutral-600 flex items-center gap-3">
              <span className="text-xl flex-shrink-0">🛡️</span>
              <div>
                <span className="font-semibold text-neutral-800">Licensed Pharmacy Verification</span>
                <p className="text-[11px] text-neutral-500 mt-0.5">
                  Dispatched in tamper-evident, climate-controlled clinical packaging.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Key Details & Purchasing */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 bg-primary-50 text-primary-700 rounded-lg text-xs font-bold uppercase tracking-wider">
                {medicine.brand}
              </span>
              <span className="text-xs text-neutral-400">•</span>
              <span className="text-xs font-medium text-neutral-500">
                Manufacturer: <strong className="text-neutral-700">{medicine.manufacturer}</strong>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight mb-2">
              {medicine.name}
            </h1>

            <div className="text-sm font-medium text-neutral-600 mb-4">
              Active Ingredient: <span className="font-semibold text-neutral-900">{medicine.genericName}</span>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-3.5 px-4 bg-neutral-50 rounded-2xl border border-neutral-200/60 mb-6 text-xs">
              <div>
                <span className="text-neutral-400 block font-medium">Strength</span>
                <span className="text-neutral-900 font-semibold text-sm">{medicine.strength}</span>
              </div>
              <div>
                <span className="text-neutral-400 block font-medium">Dosage Form</span>
                <span className="text-neutral-900 font-semibold text-sm">{medicine.dosageForm}</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-neutral-400 block font-medium">Pack Size</span>
                <span className="text-neutral-900 font-semibold text-sm">{medicine.packSize}</span>
              </div>
            </div>

            {/* Pricing Presentation */}
            <div className="flex items-baseline gap-3 mb-6">
              <div className="text-3xl sm:text-4xl font-extrabold text-neutral-900">
                Rs. {medicine.price.toFixed(2)}
              </div>
              {medicine.compareAtPrice && medicine.compareAtPrice > medicine.price && (
                <div className="text-lg text-neutral-400 line-through font-medium">
                  Rs. {medicine.compareAtPrice.toFixed(2)}
                </div>
              )}
              {medicine.discountPercentage > 0 && (
                <div className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-lg">
                  Save {medicine.discountPercentage}%
                </div>
              )}
            </div>

            {/* Stock Status Indicator */}
            <div className="flex items-center gap-2 mb-6">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  isOutOfStock ? 'bg-red-500' : 'bg-emerald-500 animate-pulse'
                }`}
              />
              <span className={`text-sm font-semibold ${isOutOfStock ? 'text-red-700' : 'text-emerald-700'}`}>
                {isOutOfStock ? 'Currently Unavailable (Out of Stock)' : 'In Stock • Ready for Same-Day Dispatch'}
              </span>
            </div>

            {/* Prescription Requirement Callout if Rx */}
            {medicine.prescriptionRequired && (
              <div className="mb-6 p-4 bg-amber-50/80 rounded-2xl border border-amber-200/80 text-xs sm:text-sm text-amber-900 flex items-start gap-3">
                <span className="text-xl flex-shrink-0">📋</span>
                <div>
                  <strong className="block font-semibold mb-0.5">Doctor's Prescription Mandatory</strong>
                  <p className="text-amber-800/90 text-xs leading-relaxed">
                    This medication requires a valid prescription. You can upload it during checkout or directly via the{' '}
                    <Link to={ROUTES.PHARMACY_PRESCRIPTION} className="underline font-bold text-amber-950 hover:text-black">
                      Prescription Portal
                    </Link>.
                  </p>
                </div>
              </div>
            )}

            {/* Action Bar: Quantity & Add to Cart / Request */}
            <div className="pt-2 border-t border-neutral-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {!isOutOfStock ? (
                <>
                  <div className="flex items-center border border-neutral-300 rounded-2xl bg-white p-1 shadow-sm">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      aria-label="Decrease quantity"
                      className="w-10 h-10 flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-xl transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                    >
                      −
                    </button>
                    <span className="w-12 text-center text-base font-bold text-neutral-900" aria-label={`Quantity: ${quantity}`}>
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                      aria-label="Increase quantity"
                      className="w-10 h-10 flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-xl transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={btnState === 'loading'}
                    className={`flex-1 py-3.5 px-6 rounded-2xl font-bold text-base transition-all duration-200 shadow-md flex items-center justify-center gap-2 ${
                      btnState === 'added'
                        ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                        : 'bg-primary-600 hover:bg-primary-700 text-white shadow-primary-600/20 active:scale-[0.98]'
                    }`}
                  >
                    {btnState === 'loading' ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Adding to Cart...
                      </span>
                    ) : btnState === 'added' ? (
                      <span className="inline-flex items-center gap-1.5">
                        ✓ Added to Cart!
                      </span>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Add to Cart • ${(medicine.price * quantity).toFixed(2)}
                      </>
                    )}
                  </button>

                  <Link
                    to={ROUTES.PHARMACY_CART}
                    className="px-5 py-3.5 rounded-2xl border border-neutral-300 hover:border-neutral-400 bg-white text-neutral-800 text-sm font-semibold text-center hover:bg-neutral-50 transition-colors"
                  >
                    View Cart
                  </Link>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setRequestModalOpen(true)}
                  className="w-full py-3.5 px-6 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-base transition-colors shadow-sm"
                >
                  Request Item (Notify on Restock)
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Structured Product Information Tabs */}
        <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-sm overflow-hidden">
          {/* Tabs Navigation */}
          <div className="flex border-b border-neutral-200/80 overflow-x-auto scrollbar-thin bg-neutral-50/70">
            {[
              { id: 'overview', label: 'About & Ingredients' },
              { id: 'usage', label: 'Usage & Dosage' },
              { id: 'storage', label: 'Storage' },
              { id: 'warnings', label: 'Safety & Warnings' },
              { id: 'faq', label: 'FAQs' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-600 text-primary-600 bg-white'
                    : 'border-transparent text-neutral-500 hover:text-neutral-800 hover:bg-white/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Contents */}
          <div className="p-6 sm:p-8 text-neutral-700 leading-relaxed text-sm">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-neutral-900 mb-2">Description</h3>
                  <p>{medicine.description}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-100">
                  <div>
                    <h4 className="font-bold text-neutral-900 text-xs uppercase tracking-wider mb-1">Active Ingredients</h4>
                    <p className="text-sm font-medium text-neutral-800">{medicine.ingredients}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-900 text-xs uppercase tracking-wider mb-1">Manufacturer</h4>
                    <p className="text-sm font-medium text-neutral-800">{medicine.manufacturer}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'usage' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-neutral-900 mb-2">Usage & Administration</h3>
                <p>{medicine.usageInformation}</p>
                <div className="p-4 bg-primary-50/60 rounded-2xl border border-primary-200/60 text-xs text-primary-900">
                  📌 <strong>Guidance:</strong> Follow the exact dosage prescribed by your medical practitioner. Do not exceed the stated dose without clinical approval.
                </div>
              </div>
            )}

            {activeTab === 'storage' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-neutral-900 mb-2">Storage Instructions</h3>
                <p>{medicine.storageInformation}</p>
                <p className="text-xs text-neutral-500">
                  Keep all medicines out of reach and sight of children. Do not use after the expiration date printed on the pack.
                </p>
              </div>
            )}

            {activeTab === 'warnings' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-neutral-900 mb-2">Safety Warnings & Precautions</h3>
                <p className="text-red-700 bg-red-50 p-4 rounded-2xl border border-red-200/70 font-medium">
                  ⚠️ {medicine.warnings}
                </p>
                <div className="text-xs text-neutral-500 space-y-1">
                  <p>• Consult your doctor before using if you are pregnant, planning to become pregnant, or breastfeeding.</p>
                  <p>• Inform your physician about any existing health conditions or ongoing medications.</p>
                </div>
              </div>
            )}

            {activeTab === 'faq' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-neutral-900 mb-2">Frequently Asked Questions</h3>
                {medicine.faqs && medicine.faqs.length > 0 ? (
                  <div className="space-y-3">
                    {medicine.faqs.map((faq, i) => (
                      <div key={i} className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200/60">
                        <h4 className="font-bold text-neutral-900 text-sm mb-1">{faq.q}</h4>
                        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-neutral-500 text-xs">No specific FAQs recorded for this item. Contact our clinical pharmacist for questions.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Category Products */}
        {relatedProducts.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
                Related Products in {medicine.category.replace(/-/g, ' ')}
              </h2>
              <Link
                to={`/pharmacy/category/${medicine.category}`}
                className="text-xs sm:text-sm font-semibold text-primary-600 hover:text-primary-700"
              >
                View Category →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <MedicineCard
                  key={rel.id}
                  medicine={rel}
                  onRequestItem={() => {
                    navigate(`/pharmacy/medicine/${rel.slug}`);
                  }}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      <RequestMedicineModal
        isOpen={requestModalOpen}
        onClose={() => setRequestModalOpen(false)}
        initialMedicineName={medicine.name}
      />
    </div>
  );
}
