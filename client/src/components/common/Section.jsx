import React from 'react';
import clsx from 'clsx';

const spacingMap = {
  none: 'py-0',
  sm: 'py-8 md:py-12',
  md: 'py-12 md:py-16',
  lg: 'py-16 md:py-24',
  xl: 'py-20 md:py-32',
};

const surfaceMap = {
  transparent: 'bg-transparent',
  base: 'bg-background',
  surface: 'bg-surface border-y border-border',
  muted: 'bg-surface-muted border-y border-border-subtle',
  secondary: 'bg-secondary border-y border-border/40',
  dark: 'bg-surface-dark text-text-inverse',
};

export function Section({
  children,
  spacing = 'lg',
  surface = 'transparent',
  className = '',
  as: Component = 'section',
  id,
  ...props
}) {
  return (
    <Component
      id={id}
      className={clsx(
        'w-full relative overflow-hidden transition-colors',
        spacingMap[spacing] || spacingMap.lg,
        surfaceMap[surface] || surfaceMap.transparent,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
