import React from 'react';
import clsx from 'clsx';

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
  titleAs: TitleTag = 'h2',
  children,
  action,
}) {
  const isCentered = align === 'center';

  return (
    <div
      className={clsx(
        'space-y-4 mb-10 md:mb-14',
        isCentered ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl',
        className
      )}
    >
      {eyebrow && (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light text-primary-dark text-xs font-semibold uppercase tracking-wider">
          {eyebrow}
        </div>
      )}

      {title && (
        <TitleTag className="font-h2 text-text-primary tracking-tight">
          {title}
        </TitleTag>
      )}

      {description && (
        <p className="font-body-lg text-text-secondary leading-relaxed">
          {description}
        </p>
      )}

      {children}

      {action && (
        <div className={clsx('pt-2 flex items-center gap-4', isCentered ? 'justify-center' : 'justify-start')}>
          {action}
        </div>
      )}
    </div>
  );
}
