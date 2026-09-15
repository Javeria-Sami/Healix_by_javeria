import React, { forwardRef, useId } from 'react';
import clsx from 'clsx';
import { AlertCircle } from 'lucide-react';

export const Input = forwardRef(function Input(
  {
    label,
    helperText,
    errorMessage,
    error,
    id: customId,
    type = 'text',
    className = '',
    inputClassName = '',
    disabled = false,
    required = false,
    iconLeading: IconLeading,
    iconTrailing: IconTrailing,
    ...props
  },
  ref
) {
  const autoId = useId();
  const inputId = customId || autoId;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;

  const activeError = errorMessage || error;
  const hasError = Boolean(activeError);

  return (
    <div className={clsx('space-y-1.5 w-full text-left', className)}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold text-text-primary"
        >
          {label} {required && <span className="text-status-error" aria-hidden="true">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {IconLeading && (
          <div className="absolute left-3.5 text-text-muted pointer-events-none">
            <IconLeading className="w-4 h-4" aria-hidden="true" />
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          type={type}
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
            'w-full py-2.5 rounded-healix-md border bg-[var(--color-input-bg,#F4F8F5)] text-sm text-text-primary placeholder:text-text-muted transition-colors duration-150 focus:outline-none',
            IconLeading ? 'pl-10' : 'pl-4',
            IconTrailing || hasError ? 'pr-10' : 'pr-4',
            hasError
              ? 'border-status-error bg-status-error-bg/20 focus:ring-1 focus:ring-status-error text-status-error'
              : 'border-border hover:border-healix-muted/40 focus:border-primary focus:ring-1 focus:ring-primary focus:bg-[var(--color-input-bg-focus,#F5F8F6)]',
            disabled && 'opacity-50 cursor-not-allowed bg-surface-muted',
            inputClassName
          )}
          {...props}
        />

        {hasError ? (
          <div className="absolute right-3.5 text-status-error pointer-events-none">
            <AlertCircle className="w-4 h-4" aria-hidden="true" />
          </div>
        ) : IconTrailing ? (
          <div className="absolute right-3.5 text-text-muted pointer-events-none">
            <IconTrailing className="w-4 h-4" aria-hidden="true" />
          </div>
        ) : null}
      </div>

      {hasError && (
        <p id={errorId} role="alert" className="text-[11px] text-status-error font-medium flex items-center gap-1 mt-1">
          <span>{activeError}</span>
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
