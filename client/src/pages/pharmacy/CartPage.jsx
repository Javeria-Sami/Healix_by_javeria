import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { usePharmacy } from '../../context/PharmacyContext';

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartSubtotal,
    cartDiscount,
    cartDeliveryFee,
    cartTotal,
    hasPrescriptionItems,
  } = usePharmacy();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50/60 py-20 px-4">
        <div className="max-w-md mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-neutral-200/80 shadow-sm text-center">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-primary-50 text-primary-600 flex items-center justify-center text-4xl mb-4">
            🛒
          </div>
          <h1 className="text-2xl font-bold text-[#075B43] mb-2 font-heading">Your Pharmacy Cart is Empty</h1>
          <p className="text-sm text-neutral-500 mb-8 leading-relaxed">
            You haven't added any medicines or healthcare products to your cart yet.
          </p>
          <div className="space-y-3">
            <Link
              to={ROUTES.PHARMACY_MEDICINES}
              className="block w-full py-3.5 px-6 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm transition-colors shadow-md shadow-primary-600/20"
            >
              Browse Medicines Catalog
            </Link>
            <Link
              to={ROUTES.PHARMACY_PRESCRIPTION}
              className="block w-full py-3 px-6 rounded-2xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold text-sm transition-colors"
            >
              Upload a Prescription
            </Link>
          </div>
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
            <span className="text-neutral-900 font-semibold" aria-current="page">Shopping Cart</span>
          </nav>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#075B43] tracking-tight font-heading">
                Review Your Cart
              </h1>
              <p className="text-sm text-neutral-500 mt-1">
                {cart.length} {cart.length === 1 ? 'item' : 'items'} in your healthcare basket
              </p>
            </div>
            <button
              type="button"
              onClick={clearCart}
              className="text-xs font-semibold text-red-600 hover:text-red-700 py-2 px-3 rounded-xl hover:bg-red-50 transition-colors"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Prescription Requirement Banner if applicable */}
        {hasPrescriptionItems && (
          <div className="mb-6 p-4 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 flex items-start gap-3 text-xs sm:text-sm">
            <span className="text-xl flex-shrink-0">📋</span>
            <div>
              <strong className="block font-bold mb-0.5">Prescription Required for Selected Items</strong>
              <p className="text-amber-800 text-xs">
                One or more items in your cart require a doctor's prescription. You can attach an uploaded prescription during checkout or our pharmacist will contact you to verify before dispatch.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-sm divide-y divide-neutral-100 overflow-hidden">
              {cart.map((item) => {
                const itemTotal = item.price * item.quantity;
                return (
                  <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-16 h-16 rounded-2xl bg-neutral-50 border border-neutral-200/70 flex items-center justify-center text-2xl flex-shrink-0">
                        {item.dosageForm.toLowerCase().includes('inhaler') ? '💨' :
                         item.dosageForm.toLowerCase().includes('syrup') || item.dosageForm.toLowerCase().includes('liquid') ? '🧴' :
                         item.dosageForm.toLowerCase().includes('capsule') ? '💊' : '💊'}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Link
                            to={`/pharmacy/medicine/${item.slug}`}
                            className="font-bold text-sm sm:text-base text-[#075B43] hover:text-[#064C38] transition-colors truncate"
                          >
                            {item.name}
                          </Link>
                          {item.prescriptionRequired && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 bg-amber-50 text-amber-800 rounded border border-amber-200 flex-shrink-0">
                              Rx
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-neutral-500">
                          {item.genericName} • {item.strength} • {item.packSize}
                        </p>
                        <div className="text-xs font-semibold text-neutral-700 mt-1">
                          Rs. {item.price.toFixed(2)} each
                        </div>
                      </div>
                    </div>

                    {/* Quantity & Actions */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-neutral-100">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-neutral-200 rounded-xl bg-neutral-50 p-0.5">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:bg-white rounded-lg transition-colors font-bold text-sm"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-[#075B43]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:bg-white rounded-lg transition-colors font-bold text-sm"
                        >
                          +
                        </button>
                      </div>

                      {/* Line Subtotal */}
                      <div className="text-right min-w-[70px]">
                        <div className="font-extrabold text-sm sm:text-base text-[#075B43]">
                          Rs. {itemTotal.toFixed(2)}
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.name} from cart`}
                        className="p-1.5 text-neutral-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-2">
              <Link
                to={ROUTES.PHARMACY_MEDICINES}
                className="text-xs sm:text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary Card */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-sm space-y-5 sticky top-24">
              <h2 className="text-lg font-bold text-[#075B43] pb-3 border-b border-neutral-100 font-heading">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-neutral-900">Rs. {cartSubtotal.toFixed(2)}</span>
                </div>

                {cartDiscount > 0 && (
                  <div className="flex items-center justify-between text-emerald-600">
                    <span>Special Savings</span>
                    <span className="font-semibold">-Rs. {cartDiscount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-neutral-600">
                  <div>
                    <span>Delivery Fee</span>
                    {cartSubtotal >= 40 && (
                      <span className="text-[10px] block text-emerald-600 font-bold">
                        Eligible for Free Delivery (Rs. 40+)
                      </span>
                    )}
                  </div>
                  <span className="font-semibold text-neutral-900">
                    {cartDeliveryFee === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      `Rs. ${cartDeliveryFee.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-base font-extrabold text-[#075B43]">
                  <span>Total Amount</span>
                  <span className="text-xl text-primary-900">Rs. {cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => navigate(ROUTES.PHARMACY_CHECKOUT)}
                  className="w-full py-3.5 px-6 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-base transition-all shadow-md shadow-primary-600/20 active:scale-[0.98]"
                >
                  Continue to Checkout →
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 border-t border-neutral-100 space-y-2 text-[11px] text-neutral-500">
                <div className="flex items-center gap-2">
                  <span>🔒</span>
                  <span>End-to-end encrypted secure checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🛡️</span>
                  <span>100% Genuine Pharmacy Certified Products</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>⚡</span>
                  <span>Same-day clinical dispatch available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
