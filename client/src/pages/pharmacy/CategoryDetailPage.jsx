import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import MedicineCard from '../../components/pharmacy/MedicineCard';
import MedicineSearchInput from '../../components/pharmacy/MedicineSearchInput';
import RequestMedicineModal from '../../components/pharmacy/RequestMedicineModal';
import {
  PHARMACY_CATEGORIES,
  getMedicinesByCategory
} from '../../data/pharmacy';

export default function CategoryDetailPage() {
  const { category: categoryId } = useParams();
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [requestItemName, setRequestItemName] = useState('');
  const [dosageFilter, setDosageFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('name-asc');
  const [rxOnlyFilter, setRxOnlyFilter] = useState('ALL');

  const categoryObj = PHARMACY_CATEGORIES.find((c) => c.id === categoryId || c.slug === categoryId) || {
    id: categoryId,
    slug: categoryId,
    name: categoryId
      ? categoryId.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
      : 'Pharmacy Department',
    description: 'Certified clinical medications, therapeutic care products, and wellness remedies.',
    itemCount: 4,
    color: 'emerald',
  };
  const medicines = getMedicinesByCategory(categoryId);

  // Filter
  const filteredMedicines = medicines.filter((item) => {
    if (dosageFilter !== 'ALL') {
      if (!item.dosageForm.toLowerCase().includes(dosageFilter.toLowerCase())) return false;
    }
    if (rxOnlyFilter === 'RX' && !item.prescriptionRequired) return false;
    if (rxOnlyFilter === 'OTC' && item.prescriptionRequired) return false;
    return true;
  });

  // Sort
  const sortedMedicines = [...filteredMedicines].sort((a, b) => {
    if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
    if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'discount') return b.discountPercentage - a.discountPercentage;
    return 0;
  });

  const handleRequestItem = (med) => {
    setRequestItemName(med.name);
    setRequestModalOpen(true);
  };

  if (!categoryObj) {
    return (
      <div className="min-h-screen bg-neutral-50 py-16 px-4 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-neutral-200/80 shadow-sm">
          <div className="text-4xl mb-4">📂</div>
          <h1 className="text-xl font-bold text-[#075B43] mb-2">Category Not Found</h1>
          <p className="text-sm text-neutral-500 mb-6">
            The requested pharmacy department does not exist in our catalog.
          </p>
          <Link
            to={ROUTES.PHARMACY_CATEGORIES}
            className="px-5 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-semibold hover:bg-primary-700 transition-colors"
          >
            Browse All Categories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50/60 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200/80 pt-8 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-4" aria-label="Breadcrumb">
            <Link to={ROUTES.HOME} className="hover:text-primary-600 transition-colors">Home</Link>
            <span>/</span>
            <Link to={ROUTES.PHARMACY} className="hover:text-primary-600 transition-colors">Pharmacy</Link>
            <span>/</span>
            <Link to={ROUTES.PHARMACY_CATEGORIES} className="hover:text-primary-600 transition-colors">Categories</Link>
            <span>/</span>
            <span className="text-neutral-900 font-semibold" aria-current="page">{categoryObj.name}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl ${categoryObj.color} flex items-center justify-center text-3xl flex-shrink-0`}>
                {categoryObj.icon}
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#075B43] tracking-tight">
                  {categoryObj.name}
                </h1>
                <p className="text-sm text-neutral-500 mt-1 max-w-xl">
                  {categoryObj.description}
                </p>
              </div>
            </div>
            <div className="w-full md:w-72">
              <MedicineSearchInput placeholder="Search in this category..." showRecent={false} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-white p-4 rounded-2xl border border-neutral-200/70 shadow-sm">
          <div className="text-sm font-bold text-[#075B43]">
            {sortedMedicines.length} {sortedMedicines.length === 1 ? 'Product' : 'Products'} available
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Prescription filter */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-neutral-500 font-medium">Type:</span>
              <select
                value={rxOnlyFilter}
                onChange={(e) => setRxOnlyFilter(e.target.value)}
                className="bg-white border border-neutral-200 rounded-xl px-2.5 py-1.5 text-neutral-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              >
                <option value="ALL">All Products</option>
                <option value="OTC">OTC (No Rx)</option>
                <option value="RX">Prescription (Rx)</option>
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-neutral-500 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-neutral-200 rounded-xl px-2.5 py-1.5 text-neutral-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              >
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="discount">Highest Discount</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {sortedMedicines.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedMedicines.map((med) => (
              <MedicineCard key={med.id} medicine={med} onRequestItem={handleRequestItem} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-white rounded-3xl border border-neutral-200/80 shadow-sm max-w-lg mx-auto">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-neutral-100 flex items-center justify-center text-3xl mb-4">
              📦
            </div>
            <h2 className="text-lg font-bold text-[#075B43] mb-1">
              No products match these filters
            </h2>
            <p className="text-sm text-neutral-500 mb-6">
              Try adjusting your filter settings or request an unlisted medicine.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setDosageFilter('ALL');
                  setRxOnlyFilter('ALL');
                }}
                className="px-4 py-2 bg-primary-600 text-white rounded-xl text-sm font-semibold hover:bg-primary-700 transition-colors shadow-sm"
              >
                Reset Filters
              </button>
              <button
                type="button"
                onClick={() => {
                  setRequestItemName('');
                  setRequestModalOpen(true);
                }}
                className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl text-sm font-medium transition-colors"
              >
                Request an Item
              </button>
            </div>
          </div>
        )}
      </div>

      <RequestMedicineModal
        isOpen={requestModalOpen}
        onClose={() => setRequestModalOpen(false)}
        initialMedicineName={requestItemName}
      />
    </div>
  );
}
