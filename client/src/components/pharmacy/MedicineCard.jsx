import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import {
  ShoppingCart,
  Check,
  FileText,
  AlertCircle,
  Plus,
  Minus,
  Sparkles,
  Pill,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { usePharmacy } from '../../context/PharmacyContext.jsx';
import { ROUTES } from '../../constants/routes.js';
import { Button } from '../common/Button.jsx';

export function MedicineCard({
  medicine,
  onRequestItem,
  className = '',
}) {
  const { addToCart } = usePharmacy();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!medicine) return null;

  const isOutOfStock = medicine.stockStatus === 'out_of_stock';
  const hasDiscount = medicine.compareAtPrice && medicine.compareAtPrice > medicine.price;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;

    addToCart(medicine, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1800);
  };

  const handleIncrement = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setQuantity((prev) => Math.min(prev + 1, 10));
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div
      className={clsx(
        'group flex flex-col bg-surface border border-border/80 rounded-healix-xl overflow-hidden transition-all duration-300 hover:shadow-soft-lg hover:border-primary/40 focus-within:ring-2 focus-within:ring-primary',
        className
      )}
    >
      {/* 1. Authentic Product Image Container */}
      <div className="relative w-full pt-[75%] bg-white border-b border-border/60 overflow-hidden flex items-center justify-center p-3">
        {medicine.imageUrl ? (
          <img
            src={medicine.imageUrl}
            alt={`${medicine.name} ${medicine.strength}`}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-contain p-2.5 transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        ) : (
          /* Placeholder / Visual Graphic */
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center transition-transform duration-300 group-hover:scale-105 bg-surface-muted/40">
            <div className="w-16 h-16 rounded-healix-lg bg-primary-light/60 text-primary flex items-center justify-center mb-2 shadow-soft-xs">
              <Pill className="w-8 h-8" aria-hidden="true" />
            </div>
            <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider line-clamp-1">
              {medicine.brand}
            </span>
          </div>
        )}

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {hasDiscount && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-status-error-bg text-status-error border border-status-error/30 shadow-soft-xs">
              Save {medicine.discountPercentage}%
            </span>
          )}
          {medicine.prescriptionRequired ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-300 shadow-soft-xs">
              <FileText className="w-3 h-3" />
              <span>Rx Required</span>
            </span>
          ) : (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-soft-xs">
              OTC
            </span>
          )}
        </div>

        {isOutOfStock && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px] flex items-center justify-center z-20">
            <span className="px-3 py-1 rounded-healix-md bg-surface border border-border text-xs font-bold text-text-muted shadow-soft-sm">
              Currently Unavailable
            </span>
          </div>
        )}
      </div>


      {/* 2. Medicine Information Section */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span className="font-medium text-text-secondary truncate max-w-[140px]">
              {medicine.dosageForm}
            </span>
            <span className="text-[11px] font-mono">{medicine.packSize}</span>
          </div>

          <h3 className="font-heading font-bold text-base text-[#075B43] group-hover:text-[#0D7657] transition-colors leading-snug">
            <Link
              to={`/pharmacy/medicine/${medicine.slug}`}
              className="focus:outline-none focus-visible:underline"
            >
              {medicine.name} <span className="font-normal text-text-secondary text-xs">({medicine.strength})</span>
            </Link>
          </h3>

          <p className="text-xs text-text-secondary line-clamp-1 italic font-editorial">
            {medicine.genericName}
          </p>
        </div>

        {/* 3. Pricing & Quantity / Add to Cart */}
        <div className="pt-3 border-t border-border/70 space-y-3">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-heading font-extrabold text-lg text-[#075B43]">
                Rs. {medicine.price.toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="text-xs text-text-muted line-through">
                  Rs. {medicine.compareAtPrice.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">
              Per Unit
            </span>
          </div>

          {/* Action Row */}
          {isOutOfStock ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full text-xs"
              onClick={() => onRequestItem && onRequestItem(medicine)}
            >
              <AlertCircle className="w-3.5 h-3.5 mr-1" />
              <span>Request Item</span>
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              {/* Quantity Stepper */}
              <div
                className="flex items-center border border-border rounded-healix-md bg-surface-muted/30 p-0.5"
                role="group"
                aria-label={`Quantity selector for ${medicine.name}`}
              >
                <button
                  type="button"
                  onClick={handleDecrement}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                  className="w-7 h-7 flex items-center justify-center text-text-secondary hover:text-text-primary disabled:opacity-40 disabled:cursor-not-allowed rounded-healix-sm transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-6 text-center text-xs font-bold text-text-primary font-mono">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={handleIncrement}
                  disabled={quantity >= 10}
                  aria-label="Increase quantity"
                  className="w-7 h-7 flex items-center justify-center text-text-secondary hover:text-text-primary disabled:opacity-40 disabled:cursor-not-allowed rounded-healix-sm transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isAdded}
                className={clsx(
                  'flex-1 flex items-center justify-center gap-1.5 h-8 px-3 rounded-healix-md text-xs font-bold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  isAdded
                    ? 'bg-emerald-600 text-white shadow-soft-xs'
                    : 'bg-primary text-white hover:bg-primary-dark shadow-soft-xs hover:shadow-soft-sm'
                )}
                aria-label={`Add ${quantity} of ${medicine.name} to cart`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5 animate-in zoom-in-50" />
                    <span>Added</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MedicineCard;

