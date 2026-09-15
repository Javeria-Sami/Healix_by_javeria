import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { Loader2 } from 'lucide-react';

const variantMap = {
  primary:
    'bg-primary text-white hover:bg-primary-hover active:bg-primary-active shadow-soft-sm hover:shadow-soft-md focus-visible:ring-primary',
  secondary:
    'bg-secondary border border-primary text-primary hover:bg-primary-soft active:bg-primary-light focus-visible:ring-primary',
  accent:
    'bg-[#8FD21F] text-[#10231F] hover:bg-[#7CB919] font-bold shadow-soft-sm focus-visible:ring-[#8FD21F]',
  outline:
    'border border-border bg-surface text-text-primary hover:bg-surface-muted hover:border-primary/60 focus-visible:ring-primary',
  ghost:
    'bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-muted focus-visible:ring-primary',
  destructive:
    'bg-status-error text-white hover:bg-red-700 active:bg-red-800 shadow-soft-sm focus-visible:ring-status-error',
  link:
    'bg-transparent text-primary hover:text-primary-dark underline-offset-4 hover:underline p-0 h-auto font-semibold focus-visible:ring-primary',
};

const sizeMap = {
  sm: 'px-3.5 py-2 text-xs rounded-healix-sm gap-1.5',
  md: 'px-5 py-2.5 text-sm rounded-healix-md gap-2',
  lg: 'px-7 py-3.5 text-base rounded-healix-md gap-2.5',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isDisabled = false,
  disabled: propDisabled,
  isExternal = false,
  external = false,
  iconLeading: IconLeading,
  iconTrailing: IconTrailing,
  className = '',
  type = 'button',
  to,
  href,
  onClick,
  'aria-label': ariaLabel,
  target,
  rel,
  ...props
}) {
  const isButtonDisabled = Boolean(isDisabled || propDisabled || isLoading);
  const isExt = isExternal || external || target === '_blank';

  const baseClasses = clsx(
    'inline-flex items-center justify-center font-semibold transition-all duration-200 select-none outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    variantMap[variant] || variantMap.primary,
    variant !== 'link' && sizeMap[size],
    isButtonDisabled && 'opacity-50 cursor-not-allowed pointer-events-none shadow-none',
    className
  );

  const content = (
    <>
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" aria-hidden="true" />
      ) : IconLeading ? (
        <IconLeading className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
      ) : null}
      {children && <span>{children}</span>}
      {!isLoading && IconTrailing ? (
        <IconTrailing className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
      ) : null}
    </>
  );

  // If internal React Router destination provided
  if (to && !isButtonDisabled) {
    return (
      <Link to={to} onClick={onClick} className={baseClasses} aria-label={ariaLabel} {...props}>
        {content}
      </Link>
    );
  }

  // If external URL destination provided
  if (href && !isButtonDisabled) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={baseClasses}
        aria-label={ariaLabel}
        target={isExt ? (target || '_blank') : target}
        rel={isExt ? (rel || 'noopener noreferrer') : rel}
        {...props}
      >
        {content}
      </a>
    );
  }

  // Native button for actions
  return (
    <button
      type={type}
      disabled={isButtonDisabled}
      onClick={onClick}
      className={baseClasses}
      aria-label={ariaLabel}
      aria-busy={isLoading ? 'true' : undefined}
      {...props}
    >
      {content}
    </button>
  );
}
