import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FileText, ArrowRight } from 'lucide-react';
import { ROUTES } from '../../constants/routes';
import MedicineSearchInput from '../../components/pharmacy/MedicineSearchInput';
import MedicineCard from '../../components/pharmacy/MedicineCard';
import RequestMedicineModal from '../../components/pharmacy/RequestMedicineModal';
import { searchMedicines, PHARMACY_CATEGORIES, SAMPLE_MEDICINES } from '../../data/pharmacy';

export default function PharmacySearchPage() {
  const [searchParams] = useSearchParams();
  const rawQuery = searchParams.get('q') || '';
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [rxFilter, setRxFilter] = useState('ALL');
  const [stockFilter, setStockFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('relevance');
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [requestItemName, setRequestItemName] = useState('');

  const initialResults = rawQuery ? searchMedicines(rawQuery) : SAMPLE_MEDICINES;

  // Apply filters
  const filtered = initialResults.filter((item) => {
    if (categoryFilter !== 'ALL' && item.category !== categoryFilter) return false;
    if (rxFilter === 'RX' && !item.prescriptionRequired) return false;
    if (rxFilter === 'OTC' && item.prescriptionRequired) return false;
    if (stockFilter === 'IN_STOCK' && item.stockStatus !== 'in-stock') return false;
    if (stockFilter === 'OUT_OF_STOCK' && item.stockStatus !== 'out-of-stock') return false;
    return true;
  });

  // Apply sort
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
    if (sortBy === 'discount') return b.discountPercentage - a.discountPercentage;
    return 0; // relevance keeps search score
  });

  const handleRequestItem = (med) => {
    setRequestItemName(med.name);
    setRequestModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-neutral-50/60 pb-24">
      {/* Search Header */}
      <div className="bg-white border-b border-neutral-200/80 pt-8 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-4" aria-label="Breadcrumb">
            <Link to={ROUTES.HOME} className="hover:text-primary-600 transition-colors">Home</Link>
            <span>/</span>
            <Link to={ROUTES.PHARMACY} className="hover:text-primary-600 transition-colors">Pharmacy</Link>
            <span>/</span>
            <span className="text-neutral-900 font-semibold" aria-current="page">Search Results</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                {rawQuery ? (
                  <>
                    Search Results for <span className="text-primary-600">"{rawQuery}"</span>
                  </>
                ) : (
                  'All Healthcare Products'
                )}
              </h1>
              <p className="text-sm text-neutral-500 mt-1">
                Showing {sorted.length} {sorted.length === 1 ? 'result' : 'results'} found in pharmacy catalog
              </p>
            </div>
            <div className="w-full md:w-96">
              <MedicineSearchInput initialQuery={rawQuery} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-5 rounded-3xl border border-neutral-200/80 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <span className="text-sm font-bold text-neutral-900">Filters</span>
                {(categoryFilter !== 'ALL' || rxFilter !== 'ALL' || stockFilter !== 'ALL') && (
                  <button
                    type="button"
                    onClick={() => {
                      setCategoryFilter('ALL');
                      setRxFilter('ALL');
                      setStockFilter('ALL');
                    }}
                    className="text-xs font-semibold text-primary-600 hover:text-primary-800"
                  >
                    Reset all
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                  Category
                </label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                >
                  <option value="ALL">All Categories</option>
                  {PHARMACY_CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Prescription Requirement */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                  Prescription (Rx)
                </label>
                <div className="space-y-2 text-xs text-neutral-700 font-medium">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="rxFilter"
                      checked={rxFilter === 'ALL'}
                      onChange={() => setRxFilter('ALL')}
                      className="text-primary-600 focus:ring-primary-500"
                    />
                    <span>All Products</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="rxFilter"
                      checked={rxFilter === 'OTC'}
                      onChange={() => setRxFilter('OTC')}
                      className="text-primary-600 focus:ring-primary-500"
                    />
                    <span>Over-the-Counter (No Rx)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="rxFilter"
                      checked={rxFilter === 'RX'}
                      onChange={() => setRxFilter('RX')}
                      className="text-primary-600 focus:ring-primary-500"
                    />
                    <span>Prescription Required (Rx)</span>
                  </label>
                </div>
              </div>

              {/* Stock Status */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                  Availability
                </label>
                <div className="space-y-2 text-xs text-neutral-700 font-medium">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="stockFilter"
                      checked={stockFilter === 'ALL'}
                      onChange={() => setStockFilter('ALL')}
                      className="text-primary-600 focus:ring-primary-500"
                    />
                    <span>All Items</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="stockFilter"
                      checked={stockFilter === 'IN_STOCK'}
                      onChange={() => setStockFilter('IN_STOCK')}
                      className="text-primary-600 focus:ring-primary-500"
                    />
                    <span>In Stock Only</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="stockFilter"
                      checked={stockFilter === 'OUT_OF_STOCK'}
                      onChange={() => setStockFilter('OUT_OF_STOCK')}
                      className="text-primary-600 focus:ring-primary-500"
                    />
                    <span>Out of Stock (Requestable)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Need Help / Prescription Card */}
            <div className="bg-[#F1F8F4] border border-[#DCEBE4] p-5 sm:p-6 rounded-[24px] space-y-3.5 shadow-soft-xs text-left relative overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-[#EAF5EF] text-[#075B43] flex items-center justify-center shadow-2xs">
                <FileText className="w-5 h-5 stroke-[2]" aria-hidden="true" />
              </div>
              <div className="space-y-1">
                <h3 className="font-heading text-sm sm:text-base font-bold text-neutral-900">
                  Can't find what you need?
                </h3>
                <p className="font-body text-xs sm:text-[13px] text-[#42554E] leading-relaxed">
                  Upload your doctor's prescription or request an unlisted medicine directly.
                </p>
              </div>
              <Link
                to={ROUTES.PHARMACY_PRESCRIPTION}
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#075B43] hover:bg-[#064C38] text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs hover:shadow-sm group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#075B43]"
              >
                <span>Upload Prescription</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Search Results Column */}
          <div className="lg:col-span-3 space-y-6">
            {/* Sorting Toolbar */}
            <div className="flex items-center justify-between bg-white p-3.5 rounded-2xl border border-neutral-200/70 shadow-sm text-xs">
              <span className="font-semibold text-neutral-700">
                {sorted.length} {sorted.length === 1 ? 'item' : 'items'} found
              </span>
              <div className="flex items-center gap-2">
                <span className="text-neutral-500">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-neutral-50 border border-neutral-200 rounded-xl px-2.5 py-1.5 font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                >
                  <option value="relevance">Relevance</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="discount">Highest Discount</option>
                </select>
              </div>
            </div>

            {/* Products Grid or Empty State */}
            {sorted.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sorted.map((med) => (
                  <MedicineCard key={med.id} medicine={med} onRequestItem={handleRequestItem} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-neutral-200/80 shadow-sm">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-neutral-100 flex items-center justify-center text-3xl mb-4">
                  🔍
                </div>
                <h2 className="text-xl font-bold text-neutral-900 mb-2">
                  We couldn't find a medicine matching that search.
                </h2>
                <p className="text-sm text-neutral-500 max-w-md mx-auto mb-8">
                  Check your spelling, try generic names, browse our comprehensive categories, or submit a prescription request.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto">
                  <Link
                    to={ROUTES.PHARMACY_CATEGORIES}
                    className="p-4 rounded-2xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/80 text-center transition-colors"
                  >
                    <span className="text-2xl block mb-1">📂</span>
                    <span className="text-xs font-bold text-neutral-800 block">Browse Categories</span>
                  </Link>
                  <Link
                    to={ROUTES.PHARMACY_MEDICINES}
                    className="p-4 rounded-2xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/80 text-center transition-colors"
                  >
                    <span className="text-2xl block mb-1">🔤</span>
                    <span className="text-xs font-bold text-neutral-800 block">A–Z Directory</span>
                  </Link>
                  <Link
                    to={ROUTES.PHARMACY_PRESCRIPTION}
                    className="p-4 rounded-2xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/80 text-center transition-colors"
                  >
                    <span className="text-2xl block mb-1">📋</span>
                    <span className="text-xs font-bold text-neutral-800 block">Upload Prescription</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <RequestMedicineModal
        isOpen={requestModalOpen}
        onClose={() => setRequestModalOpen(false)}
        initialMedicineName={requestItemName || rawQuery}
      />
    </div>
  );
}
