import React from 'react';
import clsx from 'clsx';
import { Compass } from 'lucide-react';

export function EmptyState({
  icon: Icon = Compass,
  title = 'No Records Located',
  description = 'There are currently no items matching your criteria in this section.',
  action,
  className = '',
}) {
  return (
    <div
      className={clsx(
        'p-10 text-center bg-surface border border-border rounded-healix-xl max-w-md mx-auto space-y-4 shadow-soft-sm',
        className
      )}
    >
      <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center mx-auto">
        <Icon className="w-6 h-6" aria-hidden="true" />
      </div>

      <div className="space-y-1">
        <h3 className="font-heading font-bold text-lg text-text-primary">{title}</h3>
        <p className="text-xs text-text-secondary leading-relaxed">{description}</p>
      </div>

      {action && <div className="pt-2">{action}</div>}
    </div>
  );
}
