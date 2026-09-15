import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { Loader2 } from 'lucide-react';

const variantMap = {
  primary:
    'bg-[#8FD21F] bg-primary text-[#075C49] hover:bg-[#7CB919] hover:text-[#075C49] active:bg-[#6FA816] font-bold shadow-soft-sm hover:shadow-soft-md hover:-translate-y-0.5 focus-visible:ring-[#8FD21F] transition-all duration-200',
  secondary:
    'bg-secondary border border-[#DCE8E3] text-[#075C49] hover:bg-[#F5F8F6] active:bg-[#EAF5EF] font-bold focus-visible:ring-[#075C49]',
  accent:
    'bg-[#8FD21F] text-[#075C49] hover:bg-[#7CB919] font-bold shadow-soft-sm hover:shadow-soft-md hover:-translate-y-0.5 focus-visible:ring-[#8FD21F]',
  outline:
    'border border-[#DCE8E3] bg-white text-[#075C49] hover:bg-[#F5F8F6] hover:border-[#075C49]/60 font-bold focus-visible:ring-[#075C49]',
  ghost:
    'bg-transparent text-[#075C49] hover:text-[#054839] hover:bg-[#F5F8F6] font-semibold focus-visible:ring-[#075C49]',
  destructive:
    'bg-status-error text-white hover:bg-red-700 active:bg-red-800 shadow-soft-sm focus-visible:ring-status-error',
  link:
    'bg-transparent text-[#075C49] hover:text-[#054839] underline-offset-4 hover:underline p-0 h-auto font-semibold focus-visible:ring-[#075C49]',
};

const sizeMap = {
  sm: 'px-4 py-2 text-xs rounded-full gap-1.5',
  md: 'px-6 py-2.5 text-sm rounded-full gap-2',
  lg: 'px-8 py-3.5 text-base rounded-full gap-2.5',
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
