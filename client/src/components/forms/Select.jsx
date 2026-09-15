import React, { forwardRef, useId } from 'react';
import clsx from 'clsx';
import { ChevronDown, AlertCircle } from 'lucide-react';

export const Select = forwardRef(function Select(
  {
    label,
    options = [],
    helperText,
    errorMessage,
    id: customId,
    className = '',
    selectClassName = '',
    disabled = false,
    required = false,
    children,
    ...props
  },
  ref
) {
  const autoId = useId();
  const selectId = customId || autoId;
  const helperId = `${selectId}-helper`;
  const errorId = `${selectId}-error`;

  const hasError = Boolean(errorMessage);

  return (
    <div className={clsx('space-y-1.5 w-full text-left', className)}>
      {label && (
        <label
          htmlFor={selectId}
          className="block text-xs font-semibold text-text-primary"
        >
          {label} {required && <span className="text-status-error" aria-hidden="true">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        <select
          ref={ref}
          id={selectId}
          disabled={disabled}
          required={required}
          aria-invalid={hasError ? 'true' : undefined}
          aria-describedby={
            clsx(
              hasError && errorId,
              helperText && helperId
            ) || undefined
          }
          className={clsx(
            'w-full px-4 py-2.5 rounded-healix-md border bg-[var(--color-input-bg,#F4F8F5)] text-sm text-text-primary appearance-none pr-10 transition-colors duration-150 focus:outline-none cursor-pointer',
            hasError
              ? 'border-status-error bg-status-error-bg/20 focus:ring-1 focus:ring-status-error text-status-error'
              : 'border-border hover:border-healix-muted/40 focus:border-primary focus:ring-1 focus:ring-primary focus:bg-[var(--color-input-bg-focus,#F7FAF8)]',
            disabled && 'opacity-50 cursor-not-allowed bg-surface-muted',
            selectClassName
          )}
          {...props}
        >
          {options.length > 0
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                  {opt.label}
                </option>
              ))
            : children}
        </select>

        <div className="absolute right-3.5 text-text-muted pointer-events-none">
          <ChevronDown className="w-4 h-4" aria-hidden="true" />
        </div>
      </div>

      {hasError && (
        <p id={errorId} className="text-[11px] text-status-error font-medium flex items-center gap-1 mt-1">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
          <span>{errorMessage}</span>
        </p>
      )}

      {!hasError && helperText && (
        <p id={helperId} className="text-[11px] text-text-muted mt-1">
          {helperText}
        </p>
      )}
    </div>
  );
});
