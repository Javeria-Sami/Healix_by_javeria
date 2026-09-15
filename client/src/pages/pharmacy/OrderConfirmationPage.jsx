import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

export default function OrderConfirmationPage() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('healix_latest_order');
      if (stored) {
        setOrder(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Could not read stored order', e);
    }
  }, []);

  const dummyOrderId = 'HLX-ORD-749210';
  const displayId = order ? order.orderId : dummyOrderId;
  const displayDelivery = order ? order.delivery : {
    fullName: 'Valued Patient',
    address: '124 Health Parkway, Apt 4B',
    city: 'Metropolis',
    phone: '+1 (555) 019-2831',
  };
  const displayItems = order ? order.items : [];
  const displayTotal = order ? order.pricing.total : 42.50;

  return (
    <div className="min-h-screen bg-neutral-50/60 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Success Header Box */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-neutral-200/80 shadow-sm text-center relative overflow-hidden">
          <div className="w-20 h-20 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-4xl mb-6 border border-emerald-200 shadow-sm animate-in zoom-in-50 duration-300">
            ✓
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-3 border border-emerald-200">
            <span>Order Confirmed</span> • Reference: {displayId}
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mb-3">
            Your Order Has Been Received
          </h1>

          <p className="text-sm sm:text-base text-neutral-600 max-w-xl mx-auto leading-relaxed">
            Thank you for ordering with Healix Pharmacy. Our licensed clinical team is reviewing your order details and preparing it for safe, climate-controlled dispatch.
          </p>
        </div>

        {/* What Happens Next (HCI Principle: System Status) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-sm">
          <h2 className="text-base sm:text-lg font-bold text-neutral-900 mb-6 flex items-center gap-2">
            <span>🧭</span> What Happens Next?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/70">
              <div className="w-7 h-7 rounded-lg bg-primary-100 text-primary-700 font-bold text-xs flex items-center justify-center mb-3">
                1
              </div>
              <h3 className="font-bold text-sm text-neutral-900 mb-1">Pharmacist Check</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Our pharmacist reviews prescription medicines, dosages, and interactions.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/70">
              <div className="w-7 h-7 rounded-lg bg-teal-100 text-teal-700 font-bold text-xs flex items-center justify-center mb-3">
                2
              </div>
              <h3 className="font-bold text-sm text-neutral-900 mb-1">Cold-Chain Packing</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Items are safely packed in tamper-evident clinical boxes with batch lot verification.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/70">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center mb-3">
                3
              </div>
              <h3 className="font-bold text-sm text-neutral-900 mb-1">Doorstep Delivery</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Courier delivers to your address within 24–48 hours. Inspect seal upon arrival.
              </p>
            </div>
          </div>
        </div>

        {/* Order Details Receipt */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-neutral-100 gap-2">
            <div>
              <span className="text-xs text-neutral-400 font-bold uppercase tracking-wider">Order Reference</span>
              <div className="font-bold text-base text-neutral-900">{displayId}</div>
            </div>
            <div className="text-xs text-neutral-500">
              Expected Delivery: <strong className="text-neutral-900">Within 24–48 Hours</strong>
            </div>
          </div>

          {/* Delivery Target */}
          <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200/60 text-xs">
            <span className="font-bold text-neutral-500 uppercase tracking-wider block mb-1 text-[10px]">
              Delivery Destination
            </span>
            <div className="font-bold text-sm text-neutral-900">{displayDelivery.fullName}</div>
            <div className="text-neutral-600">{displayDelivery.address}, {displayDelivery.city}</div>
            <div className="text-neutral-500 mt-0.5">📞 {displayDelivery.phone}</div>
          </div>

          {/* Items Table */}
          {displayItems.length > 0 && (
            <div className="divide-y divide-neutral-100 border border-neutral-200/60 rounded-2xl overflow-hidden">
              {displayItems.map((item) => (
                <div key={item.id} className="p-3.5 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-neutral-900">{item.name}</span>
                    <span className="text-neutral-500 ml-2">x {item.quantity}</span>
                    <div className="text-[11px] text-neutral-400">{item.strength} • {item.dosageForm}</div>
                  </div>
                  <div className="font-bold text-neutral-900 text-sm">
                    Rs. {(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="pt-2 flex justify-between items-center text-base font-extrabold text-neutral-900 border-t border-neutral-100">
            <span>Total Paid / Payable</span>
            <span className="text-xl text-primary-900">Rs. {displayTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Return to Pharmacy CTA */}
        <div className="text-center pt-4">
          <Link
            to={ROUTES.PHARMACY}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-base transition-all shadow-md shadow-primary-600/20"
          >
            ← Return to Healix Pharmacy Home
          </Link>
        </div>
      </div>
    </div>
  );
}
