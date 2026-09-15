import React from 'react';
import clsx from 'clsx';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

const iconMap = {
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertCircle,
  info: Info,
};

const styleMap = {
  success: 'bg-white border-status-success/30 text-text-primary shadow-soft-md',
  warning: 'bg-white border-status-warning/30 text-text-primary shadow-soft-md',
  error: 'bg-white border-status-error/30 text-text-primary shadow-soft-md',
  info: 'bg-white border-status-info/30 text-text-primary shadow-soft-md',
};

const iconColorMap = {
  success: 'text-status-success',
  warning: 'text-status-warning',
  error: 'text-status-error',
  info: 'text-status-info',
};

export function Toast({
  type = 'info',
  title,
  message,
  onDismiss,
  className = '',
}) {
  const Icon = iconMap[type] || Info;

  return (
    <div
      role="status"
      aria-live="polite"
      className={clsx(
        'flex items-start gap-3 p-4 rounded-healix-lg border max-w-sm w-full animate-in slide-in-from-top-2 duration-200',
        styleMap[type] || styleMap.info,
        className
      )}
    >
      <Icon className={clsx('w-5 h-5 flex-shrink-0 mt-0.5', iconColorMap[type])} aria-hidden="true" />
      <div className="flex-grow pr-2">
        {title && <h4 className="font-heading font-bold text-xs text-[#075C49]">{title}</h4>}
        <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">{message}</p>
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="p-1.5 min-w-[32px] min-h-[32px] flex items-center justify-center rounded text-text-muted hover:text-text-primary transition-colors focus-visible:ring-1 focus-visible:ring-primary -mr-1 -mt-1"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
