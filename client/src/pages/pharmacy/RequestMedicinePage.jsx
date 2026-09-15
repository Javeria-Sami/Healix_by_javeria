import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { usePharmacy } from '../../context/PharmacyContext';

export default function RequestMedicinePage() {
  const { requestMedicine } = usePharmacy();
  const [medicineName, setMedicineName] = useState('');
  const [strength, setStrength] = useState('');
  const [dosageForm, setDosageForm] = useState('Tablets');
  const [quantity, setQuantity] = useState(1);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!medicineName.trim()) {
      setError('Please provide the medicine name.');
      return;
    }
    if (!phone.trim() && !email.trim()) {
      setError('Please provide a contact phone number or email address.');
      return;
    }

    requestMedicine({
      name: medicineName.trim(),
      strength: strength.trim(),
      dosageForm,
      quantity: Number(quantity) || 1,
      phone: phone.trim(),
      email: email.trim(),
      notes: notes.trim(),
    });

    setSubmitted(true);
    setError('');
  };

  return (
    <div className="min-h-screen bg-neutral-50/60 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200/80 pt-8 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-4" aria-label="Breadcrumb">
            <Link to={ROUTES.HOME} className="hover:text-primary-600 transition-colors">Home</Link>
            <span>/</span>
            <Link to={ROUTES.PHARMACY} className="hover:text-primary-600 transition-colors">Pharmacy</Link>
            <span>/</span>
            <span className="text-neutral-900 font-semibold" aria-current="page">Request Medicine</span>
          </nav>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Request an Unavailable Medicine
          </h1>
          <p className="text-sm text-neutral-500 mt-1 max-w-2xl">
            Can't find your required medicine in our catalog? Submit a request and our procurement team will source it from certified distributors.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-neutral-200/80 shadow-sm">
          {submitted ? (
            <div className="text-center py-8 space-y-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-4xl border border-emerald-200 shadow-sm">
                ✓
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-neutral-900 mb-2">Request Submitted!</h2>
                <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                  Thank you. We have logged your request for <strong className="text-neutral-900">{medicineName}</strong>. Our pharmacy procurement team will notify you at <strong className="text-neutral-900">{phone || email}</strong> once available.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
                <Link
                  to={ROUTES.PHARMACY}
                  className="px-6 py-3.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold text-sm transition-colors shadow-sm"
                >
                  Return to Pharmacy Home
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setMedicineName('');
                    setStrength('');
                    setQuantity(1);
                    setNotes('');
                  }}
                  className="px-6 py-3.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl font-semibold text-sm transition-colors"
                >
                  Request Another Product
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Medicine / Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={medicineName}
                  onChange={(e) => setMedicineName(e.target.value)}
                  placeholder="e.g. Augmentin, Ventolin Inhaler, Janumet"
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Strength / Dosage
                  </label>
                  <input
                    type="text"
                    value={strength}
                    onChange={(e) => setStrength(e.target.value)}
                    placeholder="e.g. 500mg, 10mg"
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Dosage Form
                  </label>
                  <select
                    value={dosageForm}
                    onChange={(e) => setDosageForm(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 bg-white"
                  >
                    <option value="Tablets">Tablets</option>
                    <option value="Capsules">Capsules</option>
                    <option value="Syrup / Liquid">Syrup / Liquid</option>
                    <option value="Inhaler">Inhaler</option>
                    <option value="Injection">Injection</option>
                    <option value="Cream / Ointment">Cream / Ointment</option>
                    <option value="Medical Device">Medical Device</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Quantity Needed
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Contact Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Additional Details or Manufacturer Preference (Optional)
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Specific brand, urgency requirement..."
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                />
              </div>

              <div className="pt-4 border-t border-neutral-100 flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold text-sm transition-colors shadow-sm"
                >
                  Submit Medicine Request
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
