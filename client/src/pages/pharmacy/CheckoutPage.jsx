import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { usePharmacy } from '../../context/PharmacyContext';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    cartDeliveryFee,
    cartTotal,
    hasPrescriptionItems,
    clearCart,
    prescriptions,
  } = usePharmacy();

  const [step, setStep] = useState(1); // 1: Delivery | 2: Review | 3: Payment

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Metropolis',
    area: '',
    deliveryInstructions: '',
    selectedPrescriptionId: prescriptions.length > 0 ? prescriptions[0].id : '',
    paymentMethod: 'cod', // cod | card | insurance
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  const [errors, setErrors] = useState({});

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50/60 py-20 px-4 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-neutral-200/80 shadow-sm">
          <div className="text-4xl mb-4">🛒</div>
          <h1 className="text-xl font-bold text-[#075B43] mb-2">No Items in Cart</h1>
          <p className="text-sm text-neutral-500 mb-6">
            Please add medicines or healthcare products to your cart before proceeding to checkout.
          </p>
          <Link
            to={ROUTES.PHARMACY_MEDICINES}
            className="px-5 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-semibold hover:bg-primary-700 transition-colors"
          >
            Browse Medicines
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required.';
    if (!formData.phone.trim()) newErrors.phone = 'Contact Phone number is required for dispatch.';
    if (!formData.address.trim()) newErrors.address = 'Street address is required.';
    if (!formData.city.trim()) newErrors.city = 'City is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber || !formData.cardExpiry || !formData.cardCvc) {
        setErrors({ payment: 'Please enter valid card details or select Cash on Delivery.' });
        return;
      }
    }

    const orderId = `HLX-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderRecord = {
      orderId,
      date: new Date().toISOString(),
      items: [...cart],
      pricing: {
        subtotal: cartSubtotal,
        discount: cartDiscount,
        deliveryFee: cartDeliveryFee,
        total: cartTotal,
      },
      delivery: {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        area: formData.area,
        deliveryInstructions: formData.deliveryInstructions,
      },
      paymentMethod: formData.paymentMethod,
      hasPrescriptionItems,
      selectedPrescriptionId: formData.selectedPrescriptionId,
    };

    // Save order in session/local storage for confirmation page
    try {
      sessionStorage.setItem('healix_latest_order', JSON.stringify(orderRecord));
    } catch (err) {
      console.warn('Session storage write error:', err);
    }

    clearCart();
    navigate(ROUTES.PHARMACY_ORDER_CONFIRMATION);
  };

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
            <Link to={ROUTES.PHARMACY_CART} className="hover:text-primary-600 transition-colors">Cart</Link>
            <span>/</span>
            <span className="text-neutral-900 font-semibold" aria-current="page">Checkout</span>
          </nav>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#075B43] tracking-tight font-heading">
            Secure Pharmacy Checkout
          </h1>

          {/* 3-Step Indicator */}
          <div className="flex items-center justify-between max-w-xl mt-6">
            <div className="flex items-center gap-2">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                step >= 1 ? 'bg-primary-600 text-white' : 'bg-neutral-200 text-neutral-600'
              }`}>
                1
              </span>
              <span className={`text-xs font-semibold ${step >= 1 ? 'text-[#075B43]' : 'text-neutral-400'}`}>
                Delivery
              </span>
            </div>
            <div className={`flex-1 h-0.5 mx-3 ${step >= 2 ? 'bg-primary-600' : 'bg-neutral-200'}`} />
            <div className="flex items-center gap-2">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                step >= 2 ? 'bg-primary-600 text-white' : 'bg-neutral-200 text-neutral-600'
              }`}>
                2
              </span>
              <span className={`text-xs font-semibold ${step >= 2 ? 'text-[#075B43]' : 'text-neutral-400'}`}>
                Review
              </span>
            </div>
            <div className={`flex-1 h-0.5 mx-3 ${step >= 3 ? 'bg-primary-600' : 'bg-neutral-200'}`} />
            <div className="flex items-center gap-2">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                step >= 3 ? 'bg-primary-600 text-white' : 'bg-neutral-200 text-neutral-600'
              }`}>
                3
              </span>
              <span className={`text-xs font-semibold ${step >= 3 ? 'text-[#075B43]' : 'text-neutral-400'}`}>
                Payment
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Step Form Container */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-sm">
            
            {/* STEP 1: Delivery Information */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-[#075B43] mb-1 font-heading">
                    1. Delivery Address & Contact
                  </h2>
                  <p className="text-xs text-neutral-500">
                    Where should our courier deliver your medicine order?
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Full Recipient Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                    />
                    {errors.fullName && <span className="text-xs text-red-600 mt-1 block">{errors.fullName}</span>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                    />
                    {errors.phone && <span className="text-xs text-red-600 mt-1 block">{errors.phone}</span>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Street Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="e.g. 124 Health Parkway, Apt 4B"
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                    />
                    {errors.address && <span className="text-xs text-red-600 mt-1 block">{errors.address}</span>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Area / Postal Code
                    </label>
                    <input
                      type="text"
                      name="area"
                      value={formData.area}
                      onChange={handleInputChange}
                      placeholder="e.g. 10001"
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Special Delivery Instructions (Optional)
                    </label>
                    <textarea
                      rows={2}
                      name="deliveryInstructions"
                      value={formData.deliveryInstructions}
                      onChange={handleInputChange}
                      placeholder="e.g. Leave with concierge or call upon arrival"
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold text-sm transition-colors shadow-sm"
                  >
                    Proceed to Order Review →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Order Review & Prescription Confirmation */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                  <div>
                    <h2 className="text-xl font-bold text-[#075B43] font-heading">
                      2. Review Order & Prescription
                    </h2>
                    <p className="text-xs text-neutral-500">
                      Verify your items and delivery destination before choosing payment.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs font-semibold text-primary-600 hover:underline"
                  >
                    Edit Delivery Info
                  </button>
                </div>

                {/* Delivery Target Preview */}
                <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200/70 text-xs text-neutral-700">
                  <div className="font-bold text-[#075B43] text-sm mb-1">{formData.fullName}</div>
                  <div>{formData.address}, {formData.city} {formData.area}</div>
                  <div className="text-neutral-500 mt-1">📞 {formData.phone} {formData.email && `• ✉️ ${formData.email}`}</div>
                </div>

                {/* Prescription Status if Rx items exist */}
                {hasPrescriptionItems && (
                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-sm text-amber-950">
                      <span>📋</span> Prescription Verification Required
                    </div>
                    <p>
                      Your order contains prescription medicines. Our licensed clinical pharmacist will verify your prescription details before order dispatch.
                    </p>
                    {prescriptions.length > 0 ? (
                      <div className="pt-2">
                        <label className="block font-semibold mb-1">Attached Prescription Record:</label>
                        <select
                          name="selectedPrescriptionId"
                          value={formData.selectedPrescriptionId}
                          onChange={handleInputChange}
                          className="w-full bg-white border border-amber-300 rounded-xl px-3 py-2 text-xs font-medium text-neutral-800"
                        >
                          {prescriptions.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.fileName} (Uploaded: {p.patientName || 'Patient'})
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <div className="pt-1">
                        <Link
                          to={ROUTES.PHARMACY_PRESCRIPTION}
                          className="inline-block px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-xs transition-colors"
                        >
                          Upload Doctor's Prescription Now
                        </Link>
                        <span className="text-[11px] text-amber-700 block mt-1">
                          (Or proceed with order and our pharmacy support will call you to collect it).
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Items Summary Table */}
                <div className="divide-y divide-neutral-100 border border-neutral-200/70 rounded-2xl overflow-hidden">
                  {cart.map((item) => (
                    <div key={item.id} className="p-3.5 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-[#075B43]">{item.name}</span>
                        <span className="text-neutral-500 ml-2">x {item.quantity}</span>
                        <div className="text-[11px] text-neutral-400">{item.strength} • {item.dosageForm}</div>
                      </div>
                      <div className="font-bold text-[#075B43] text-sm">
                        Rs. {(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2.5 text-neutral-600 hover:bg-neutral-100 rounded-xl text-xs font-semibold transition-colors"
                  >
                    ← Back to Delivery
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold text-sm transition-colors shadow-sm"
                  >
                    Proceed to Payment →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Payment Method & Place Order */}
            {step === 3 && (
              <form onSubmit={handlePlaceOrder} className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-[#075B43] mb-1 font-heading">
                    3. Select Payment Method
                  </h2>
                  <p className="text-xs text-neutral-500">
                    Safe, transparent transactions with zero hidden charges.
                  </p>
                </div>

                {errors.payment && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                    {errors.payment}
                  </div>
                )}

                <div className="space-y-3">
                  {/* Cash on Delivery */}
                  <label className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    formData.paymentMethod === 'cod'
                      ? 'border-primary-600 bg-primary-50/50 shadow-sm ring-2 ring-primary-500/20'
                      : 'border-neutral-200 bg-white hover:bg-neutral-50'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleInputChange}
                        className="text-primary-600 focus:ring-primary-500"
                      />
                      <div>
                        <div className="font-bold text-sm text-[#075B43]">Cash on Delivery (COD)</div>
                        <div className="text-xs text-neutral-500">Pay securely in cash when your medicines arrive.</div>
                      </div>
                    </div>
                    <span className="text-2xl">💵</span>
                  </label>

                  {/* Credit / Debit Card */}
                  <label className={`p-4 rounded-2xl border flex flex-col gap-3 cursor-pointer transition-all ${
                    formData.paymentMethod === 'card'
                      ? 'border-primary-600 bg-primary-50/50 shadow-sm ring-2 ring-primary-500/20'
                      : 'border-neutral-200 bg-white hover:bg-neutral-50'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={formData.paymentMethod === 'card'}
                          onChange={handleInputChange}
                          className="text-primary-600 focus:ring-primary-500"
                        />
                        <div>
                          <div className="font-bold text-sm text-[#075B43]">Credit / Debit Card</div>
                          <div className="text-xs text-neutral-500">Encrypted instant checkout via Visa, Mastercard, AMEX.</div>
                        </div>
                      </div>
                      <span className="text-2xl">💳</span>
                    </div>

                    {formData.paymentMethod === 'card' && (
                      <div className="pt-3 border-t border-primary-200/60 grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-3">
                          <label className="block text-[11px] font-bold text-neutral-700 mb-1">Card Number</label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            placeholder="4000 1234 5678 9010"
                            className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-neutral-700 mb-1">Expiry (MM/YY)</label>
                          <input
                            type="text"
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleInputChange}
                            placeholder="08/28"
                            className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-neutral-700 mb-1">CVC / CVV</label>
                          <input
                            type="text"
                            name="cardCvc"
                            value={formData.cardCvc}
                            onChange={handleInputChange}
                            placeholder="123"
                            className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                          />
                        </div>
                      </div>
                    )}
                  </label>

                  {/* Health Insurance Direct Claim */}
                  <label className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    formData.paymentMethod === 'insurance'
                      ? 'border-primary-600 bg-primary-50/50 shadow-sm ring-2 ring-primary-500/20'
                      : 'border-neutral-200 bg-white hover:bg-neutral-50'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="insurance"
                        checked={formData.paymentMethod === 'insurance'}
                        onChange={handleInputChange}
                        className="text-primary-600 focus:ring-primary-500"
                      />
                      <div>
                        <div className="font-bold text-sm text-[#075B43]">Direct Health Insurance Claim</div>
                        <div className="text-xs text-neutral-500">Provide insurance membership ID upon pharmacist call.</div>
                      </div>
                    </div>
                    <span className="text-2xl">🏥</span>
                  </label>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-4 py-2.5 text-neutral-600 hover:bg-neutral-100 rounded-xl text-xs font-semibold transition-colors"
                  >
                    ← Back to Review
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-base transition-all shadow-md shadow-emerald-600/20 active:scale-[0.98]"
                  >
                    Confirm & Place Order (Rs. {cartTotal.toFixed(2)})
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Sticky Summary on Right */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-sm space-y-4 sticky top-24">
              <h3 className="text-base font-bold text-[#075B43] pb-3 border-b border-neutral-100 font-heading">
                Summary ({cart.length} items)
              </h3>
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-neutral-900">Rs. {cartSubtotal.toFixed(2)}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount</span>
                    <span className="font-semibold">-Rs. {cartDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-600">
                  <span>Delivery</span>
                  <span className="font-semibold text-neutral-900">
                    {cartDeliveryFee === 0 ? 'FREE' : `Rs. ${cartDeliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-neutral-100 flex justify-between text-sm font-extrabold text-[#075B43]">
                  <span>Total Payable</span>
                  <span className="text-base text-primary-900">Rs. {cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-100 text-[11px] text-neutral-500 space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <span>✓</span>
                  <span>Free doorstep cancellation if seal is broken</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span>✓</span>
                  <span>Registered Clinical Pharmacy Partner</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
