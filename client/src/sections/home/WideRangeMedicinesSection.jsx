import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../components/common/Container.jsx';
import { ROUTES } from '../../constants/routes.js';
import { MEDICINE_PRODUCTS } from '../../data/pharmacy.js';
import { usePharmacy } from '../../context/PharmacyContext.jsx';
import { ShoppingCart, Check, FileText, ChevronRight } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'skin-care', label: 'Skin Care' },
  { id: 'pain-fever-otc', label: 'Pain Relief' },
  { id: 'respiratory-allergy', label: 'Cold & Flu' },
  { id: 'medications', label: 'Mental Health & Rx' },
  { id: 'digestive-health', label: 'Digestive Health' },
  { id: 'wellness-vitamins', label: 'Vitamins' },
];

export function WideRangeMedicinesSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [addedId, setAddedId] = useState(null);
  const { addToCart } = usePharmacy();

  const filteredMedicines = useMemo(() => {
    if (activeCategory === 'all') {
      return MEDICINE_PRODUCTS.slice(0, 5);
    }
    const filtered = MEDICINE_PRODUCTS.filter(
      (m) => m.categorySlug === activeCategory || m.category?.toLowerCase().includes(activeCategory)
    );
    return filtered.length > 0 ? filtered.slice(0, 5) : MEDICINE_PRODUCTS.slice(0, 5);
  }, [activeCategory]);

  const featuredProduct = filteredMedicines[0];
  const gridProducts = filteredMedicines.slice(1, 5);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product) return;

    addToCart(product, 1);
    setAddedId(product.id);
    setTimeout(() => {
      setAddedId(null);
    }, 1600);
  };

  return (
    <section
      id="pharmacy-discovery"
      aria-label="Wide Range of Medicines"
      className="py-12 sm:py-16 lg:py-20 bg-white border-b border-neutral-200/50 transition-colors"
    >
      <Container>
        {/* ============================================================
            SECTION HEADER: Title, Description, and Catalog Action
            ============================================================ */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-3 max-w-6xl mx-auto">
          <div className="space-y-1.5 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F8F6] border border-[#DCE8E3] shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8FD21F]" aria-hidden="true" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#075C49] uppercase">
                PHARMACY
              </span>
            </div>

            <h2
              id="wide-range-medicines-heading"
              className="font-heading text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-neutral-900 tracking-tight leading-tight"
            >
              Wide Range of Medicines
            </h2>

            <p className="font-body text-xs sm:text-sm text-neutral-600 max-w-xl leading-relaxed">
              Explore genuine medicines and everyday health essentials from trusted brands, all in one convenient place.
            </p>
          </div>

          <Link
            to={ROUTES.PHARMACY}
            className="hidden sm:inline-flex items-center gap-1.5 font-bold text-xs sm:text-sm text-[#075C49] hover:text-[#054839] transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm py-1 flex-shrink-0"
          >
            <span>View Online Pharmacy</span>
            <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* ============================================================
            CATEGORY NAVIGATION: Horizontal Compact Pill Tabs (Light Theme)
            ============================================================ */}
        <div
          className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 max-w-6xl mx-auto"
          role="tablist"
          aria-label="Medicine categories"
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isActive
                    ? 'bg-[#075C49] text-white shadow-2xs'
                    : 'bg-[#F5F8F6] hover:bg-[#DCE8E3] text-neutral-700 border border-[#DCE8E3]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* ============================================================
            PRODUCT COLLECTION: Light Healix Theme Cards
            ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch max-w-6xl mx-auto">
          {/* 1. Large Featured Product Card (Light Healix Mint Theme) */}
          {featuredProduct && (
            <div className="lg:col-span-6 flex flex-col justify-between bg-[#F5F8F6] rounded-xl sm:rounded-2xl border border-[#DCE8E3] hover:border-[#B7D9CA] shadow-soft-xs hover:shadow-soft-sm transition-all duration-300 overflow-hidden group p-4 sm:p-5">
              {/* Product Pack Visual Container (Seamless on Mint Card Background) */}
              <div className="relative w-full h-44 sm:h-52 flex items-center justify-center p-2 mb-4 overflow-hidden">
                {featuredProduct.prescriptionRequired && (
                  <span className="absolute top-1 left-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 shadow-2xs z-10">
                    <FileText className="w-2.5 h-2.5" />
                    <span>Rx Required</span>
                  </span>
                )}
                <img
                  src={featuredProduct.imageUrl}
                  alt={`${featuredProduct.name} ${featuredProduct.packSize || ''}`}
                  className="w-full h-full object-contain select-none transition-transform duration-500 group-hover:scale-105 drop-shadow-sm"
                  loading="lazy"
                />
              </div>

              {/* Product Meta & Pricing */}
              <div className="space-y-3 text-left">
                <div className="space-y-0.5">
                  <h3 className="font-heading text-base sm:text-lg font-bold text-neutral-900 group-hover:text-[#075C49] transition-colors leading-snug">
                    <Link
                      to={`/pharmacy/medicine/${featuredProduct.slug}`}
                      className="focus:outline-none focus-visible:underline"
                    >
                      {featuredProduct.name}
                    </Link>
                  </h3>
                  <p className="font-body text-xs text-neutral-500 line-clamp-1">
                    {featuredProduct.genericName}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#DCE8E3]">
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading font-extrabold text-base sm:text-lg text-[#075C49]">
                      Rs. {featuredProduct.price.toFixed(2)}
                    </span>
                    {featuredProduct.compareAtPrice && (
                      <span className="text-xs text-neutral-400 line-through">
                        Rs. {featuredProduct.compareAtPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => handleAddToCart(e, featuredProduct)}
                    className={`inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer ${
                      addedId === featuredProduct.id
                        ? 'bg-[#0C6F58] text-white'
                        : 'bg-[#075C49] hover:bg-[#054839] text-white'
                    }`}
                    aria-label={`Add ${featuredProduct.name} to cart`}
                  >
                    {addedId === featuredProduct.id ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>Added ✓</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-3 h-3" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 2. 2x2 Grid of Medicine Cards (Light Healix Mint Theme) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 items-stretch">
            {gridProducts.map((product) => {
              const isItemAdded = addedId === product.id;
              return (
                <div
                  key={product.id}
                  className="group relative flex flex-col justify-between bg-[#F5F8F6] rounded-xl border border-[#DCE8E3] hover:border-[#B7D9CA] shadow-soft-xs hover:shadow-soft-sm transition-all duration-300 p-3.5 sm:p-4 overflow-hidden"
                >
                  {/* Product Pack Visual Container (Seamless on Mint Card Background) */}
                  <div className="relative w-full h-28 sm:h-32 flex items-center justify-center p-1.5 mb-3 overflow-hidden">
                    {product.prescriptionRequired && (
                      <span className="absolute top-0.5 left-0.5 inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-amber-50 text-amber-800 border border-amber-200 shadow-2xs z-10">
                        <FileText className="w-2 h-2" />
                        <span>Rx</span>
                      </span>
                    )}
                    <img
                      src={product.imageUrl}
                      alt={`${product.name} ${product.packSize || ''}`}
                      className="w-full h-full object-contain select-none transition-transform duration-500 group-hover:scale-105 drop-shadow-xs"
                      loading="lazy"
                    />

                    {/* Quick View Item Action Overlay on Hover */}
                    <Link
                      to={`/pharmacy/medicine/${product.slug}`}
                      className="absolute inset-0 bg-neutral-900/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-2 z-20"
                      aria-label={`View details for ${product.name}`}
                    >
                      <span className="px-3 py-1 rounded-md bg-white/95 text-neutral-900 font-bold text-[11px] shadow-sm transform translate-y-1 group-hover:translate-y-0 transition-transform">
                        View Item
                      </span>
                    </Link>
                  </div>

                  {/* Product Details & Price */}
                  <div className="space-y-2 text-left">
                    <div className="space-y-0.5">
                      <h3 className="font-heading text-xs sm:text-sm font-bold text-neutral-900 group-hover:text-[#075C49] transition-colors line-clamp-1 leading-snug">
                        <Link
                          to={`/pharmacy/medicine/${product.slug}`}
                          className="focus:outline-none focus-visible:underline"
                        >
                          {product.name}
                        </Link>
                      </h3>
                      <p className="text-[10px] text-neutral-500 font-medium line-clamp-1">
                        {product.dosageForm} • {product.packSize}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-1.5 border-t border-[#DCE8E3]">
                      <div className="flex items-baseline gap-1">
                        <span className="font-heading font-extrabold text-xs sm:text-sm text-[#075C49]">
                          Rs. {product.price.toFixed(product.price % 1 === 0 ? 1 : 2)}
                        </span>
                        {product.compareAtPrice && (
                          <span className="text-[10px] text-neutral-400 line-through">
                            Rs. {product.compareAtPrice.toFixed(product.compareAtPrice % 1 === 0 ? 1 : 2)}
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handleAddToCart(e, product)}
                        className={`p-1.5 rounded-lg text-xs font-bold transition-all shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer ${
                          isItemAdded
                            ? 'bg-[#0C6F58] text-white'
                            : 'bg-white hover:bg-[#075C49] text-neutral-700 hover:text-white border border-[#DCE8E3]'
                        }`}
                        aria-label={`Add ${product.name} to cart`}
                        title="Add to cart"
                      >
                        {isItemAdded ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          <ShoppingCart className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile View All Link */}
        <div className="mt-6 text-center sm:hidden">
          <Link
            to={ROUTES.PHARMACY}
            className="inline-flex items-center gap-1.5 font-bold text-xs text-[#075C49] hover:text-[#054839] transition-colors py-2 px-3.5 rounded-lg bg-[#F5F8F6] border border-[#DCE8E3] shadow-2xs"
          >
            <span>View Online Pharmacy</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
