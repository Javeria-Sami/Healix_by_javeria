import React from 'react';
import clsx from 'clsx';

const variantMap = {
  default: 'bg-surface-muted text-text-primary border-border',
  primary: 'bg-primary-light text-primary-dark border-primary/20',
  secondary: 'bg-secondary text-text-primary border-secondary-200',
  success: 'bg-status-success-bg text-status-success border-status-success/20',
  warning: 'bg-status-warning-bg text-status-warning border-status-warning/20',
  error: 'bg-status-error-bg text-status-error border-status-error/20',
  info: 'bg-status-info-bg text-status-info border-status-info/20',
  outline: 'bg-transparent text-text-secondary border-border',
};

const sizeMap = {
  sm: 'px-2 py-0.5 text-[11px]',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm',
};

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  icon: Icon,
  dot = false,
  pill = true,
  className = '',
  ...props
}) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 font-semibold border transition-colors',
        pill ? 'rounded-healix-pill' : 'rounded-healix-sm',
        variantMap[variant] || variantMap.default,
        sizeMap[size] || sizeMap.md,
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full bg-current flex-shrink-0"
          aria-hidden="true"
        />
      )}
      {Icon && <Icon className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />}
      <span>{children}</span>
    </span>
  );
}
