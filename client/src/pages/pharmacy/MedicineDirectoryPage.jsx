import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import MedicineCard from '../../components/pharmacy/MedicineCard';
import MedicineSearchInput from '../../components/pharmacy/MedicineSearchInput';
import RequestMedicineModal from '../../components/pharmacy/RequestMedicineModal';
import { SAMPLE_MEDICINES, getMedicinesByLetter } from '../../data/pharmacy';

export default function MedicineDirectoryPage() {
  const { letter } = useParams();
  const navigate = useNavigate();
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [requestItemName, setRequestItemName] = useState('');
  const [dosageFilter, setDosageFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('name-asc');

  const selectedLetter = (letter || '').toUpperCase();
  const filteredByLetter = selectedLetter ? getMedicinesByLetter(selectedLetter) : SAMPLE_MEDICINES;

  // Filter by dosage form if selected
  const filteredMedicines = filteredByLetter.filter((item) => {
    if (dosageFilter === 'ALL') return true;
    if (dosageFilter === 'TABLETS') return item.dosageForm.toLowerCase().includes('tablet');
    if (dosageFilter === 'CAPSULES') return item.dosageForm.toLowerCase().includes('capsule');
    if (dosageFilter === 'SYRUPS') return item.dosageForm.toLowerCase().includes('syrup') || item.dosageForm.toLowerCase().includes('liquid') || item.dosageForm.toLowerCase().includes('oral');
    if (dosageFilter === 'INHALERS') return item.dosageForm.toLowerCase().includes('inhaler');
    if (dosageFilter === 'DEVICES') return item.dosageForm.toLowerCase().includes('device') || item.dosageForm.toLowerCase().includes('patch');
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

  const handleSelectLetter = (newLetter) => {
    if (newLetter) {
      navigate(`/pharmacy/medicines/${newLetter.toLowerCase()}`);
    } else {
      navigate(ROUTES.PHARMACY_MEDICINES);
    }
  };

  const handleRequestItem = (med) => {
    setRequestItemName(med.name);
    setRequestModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-neutral-50/60 pb-24">
      {/* Header & Breadcrumb */}
      <div className="bg-white border-b border-neutral-200/80 pt-6 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-4" aria-label="Breadcrumb">
            <Link to={ROUTES.HOME} className="hover:text-primary-600 transition-colors">Home</Link>
            <span>/</span>
            <Link to={ROUTES.PHARMACY} className="hover:text-primary-600 transition-colors">Pharmacy</Link>
            <span>/</span>
            <span className="text-neutral-900 font-semibold" aria-current="page">Medicines Directory</span>
          </nav>

          <div className="max-w-2xl">
            <MedicineSearchInput placeholder="Search medicines by name, generic name, or condition..." showRecent={false} />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Results Count Header */}
        <div className="mb-6">
          <span className="text-sm font-bold text-neutral-900">
            {sortedMedicines.length} {sortedMedicines.length === 1 ? 'Product' : 'Products'} available
          </span>
          {selectedLetter && (
            <span className="ml-3 px-2.5 py-0.5 rounded-full bg-primary-100 text-primary-800 text-xs font-semibold">
              Starting with "{selectedLetter}"
            </span>
          )}
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
              🔍
            </div>
            <h2 className="text-lg font-bold text-neutral-900 mb-1">
              No medicines found starting with "{selectedLetter}"
            </h2>
            <p className="text-sm text-neutral-500 mb-6">
              We couldn't find an exact match under this letter filter. Try browsing all letters or search directly.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => handleSelectLetter('')}
                className="px-4 py-2 bg-primary-600 text-white rounded-xl text-sm font-semibold hover:bg-primary-700 transition-colors shadow-sm"
              >
                View All Medicines
              </button>
              <Link
                to={ROUTES.PHARMACY_PRESCRIPTION}
                className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl text-sm font-medium transition-colors"
              >
                Upload Prescription
              </Link>
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
