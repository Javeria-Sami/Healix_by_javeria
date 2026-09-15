import React, { forwardRef, useId } from 'react';
import clsx from 'clsx';
import { Check } from 'lucide-react';

export const Checkbox = forwardRef(function Checkbox(
  {
    label,
    description,
    errorMessage,
    id: customId,
    checked,
    onChange,
    disabled = false,
    className = '',
    ...props
  },
  ref
) {
  const autoId = useId();
  const checkboxId = customId || autoId;
  const descId = `${checkboxId}-desc`;
  const errorId = `${checkboxId}-error`;

  const hasError = Boolean(errorMessage);

  return (
    <div className={clsx('relative flex items-start gap-3 text-left select-none py-1', className)}>
      <div className="flex items-center min-h-[24px] pt-0.5">
        <input
          ref={ref}
          id={checkboxId}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          aria-invalid={hasError ? 'true' : undefined}
          aria-describedby={
            clsx(
              hasError && errorId,
              description && descId
            ) || undefined
          }
          className="sr-only peer"
          {...props}
        />

        <label
          htmlFor={checkboxId}
          className={clsx(
            'w-4 h-4 rounded-healix-sm border flex items-center justify-center cursor-pointer transition-all duration-150 peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2',
            checked
              ? 'bg-primary border-primary text-white shadow-soft-sm'
              : 'bg-background border-border hover:border-primary/50',
            hasError && 'border-status-error',
            disabled && 'opacity-50 cursor-not-allowed bg-surface-muted pointer-events-none'
          )}
        >
          {checked && <Check className="w-3 h-3 stroke-[3]" aria-hidden="true" />}
        </label>
      </div>

      <div className="text-xs space-y-0.5">
        {label && (
          <label
            htmlFor={checkboxId}
            className={clsx(
              'font-medium text-text-primary cursor-pointer',
              disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
            )}
          >
            {label}
          </label>
        )}

        {description && (
          <p id={descId} className="text-text-muted leading-relaxed">
            {description}
          </p>
        )}

        {hasError && (
          <p id={errorId} className="text-status-error font-medium">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
});
