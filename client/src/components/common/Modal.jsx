import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { X } from 'lucide-react';

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  className = '',
}) {
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);

  const sizeMap = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement;
      document.body.style.overflow = 'hidden';

      // Focus first focusable element inside modal
      const timer = setTimeout(() => {
        if (modalRef.current) {
          const focusable = modalRef.current.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
          if (focusable) focusable.focus();
        }
      }, 50);

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
        if (previousActiveElement.current && typeof previousActiveElement.current.focus === 'function') {
          previousActiveElement.current.focus();
        }
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-modal flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'healix-modal-title' : undefined}
      aria-describedby={description ? 'healix-modal-desc' : undefined}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog Window */}
      <div
        ref={modalRef}
        className={clsx(
          'relative w-full max-h-[calc(100dvh-2rem)] overflow-y-auto bg-surface border border-border rounded-healix-xl p-6 sm:p-8 shadow-soft-xl z-10 animate-in fade-in zoom-in-95 duration-200 focus:outline-none',
          sizeMap[size] || sizeMap.md,
          className
        )}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-healix-md text-text-secondary hover:text-text-primary hover:bg-surface-muted transition-colors focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {title && (
          <div className="mb-4 pr-8">
            <h2 id="healix-modal-title" className="font-heading font-bold text-xl text-text-primary">
              {title}
            </h2>
            {description && (
              <p id="healix-modal-desc" className="text-xs text-text-secondary mt-1">
                {description}
              </p>
            )}
          </div>
        )}

        <div className="text-sm text-text-primary">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
