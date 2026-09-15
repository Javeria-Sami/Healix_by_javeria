import React from 'react';
import clsx from 'clsx';
import { Loader2 } from 'lucide-react';

const sizeMap = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-10 h-10',
};

export function Loader({
  size = 'md',
  label = 'Loading content...',
  className = '',
  fullHeight = false,
}) {
  return (
    <div
      role="status"
      aria-label={label}
      className={clsx(
        'flex flex-col items-center justify-center gap-3',
        fullHeight ? 'min-h-[300px] w-full' : 'py-6',
        className
      )}
    >
      <Loader2
        className={clsx('animate-spin text-primary', sizeMap[size] || sizeMap.md)}
        aria-hidden="true"
      />
      {label && <span className="text-xs font-medium text-text-secondary">{label}</span>}
      <span className="sr-only">{label}</span>
    </div>
  );
}

export function Skeleton({ className = '', ...props }) {
  return (
    <div
      className={clsx('animate-pulse bg-border/60 rounded-healix-sm', className)}
      aria-hidden="true"
      {...props}
    />
  );
}
