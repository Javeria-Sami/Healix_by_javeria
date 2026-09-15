import React from 'react';
import clsx from 'clsx';

const surfaceMap = {
  base: 'bg-surface border-border',
  muted: 'bg-surface-muted border-border-subtle',
  secondary: 'bg-secondary border-border/60',
  elevated: 'bg-surface border-border shadow-soft-md',
};

export function Card({
  children,
  surface = 'base',
  variant,
  isInteractive = false,
  hoverEffect = false,
  className = '',
  as: Component = 'div',
  ...props
}) {
  const activeSurface = variant === 'elevated' ? 'elevated' : (variant === 'muted' ? 'muted' : (variant || surface));
  const hasHover = isInteractive || hoverEffect;

  return (
    <Component
      className={clsx(
        'rounded-healix-xl border transition-all duration-200 overflow-hidden flex flex-col',
        surfaceMap[activeSurface] || surfaceMap.base,
        hasHover && 'hover:shadow-soft-md hover:border-primary/40',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export function CardMedia({
  src,
  alt = '',
  aspectRatio = 'aspect-[16/9]',
  className = '',
  children,
  ...props
}) {
  return (
    <div className={clsx('w-full overflow-hidden bg-surface-muted relative', aspectRatio, className)} {...props}>
      {src && (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
      )}
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '', ...props }) {
  return (
    <div className={clsx('p-6 pb-2 space-y-1.5', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  as: Component = 'h3',
  className = '',
  ...props
}) {
  return (
    <Component
      className={clsx('font-heading font-bold text-xl text-text-primary tracking-tight', className)}
      {...props}
    >
      {children}
    </Component>
  );
}

export function CardDescription({ children, className = '', ...props }) {
  return (
    <p className={clsx('text-xs text-text-secondary leading-relaxed', className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ children, className = '', ...props }) {
  return (
    <div className={clsx('p-6 pt-2 flex-grow', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '', ...props }) {
  return (
    <div
      className={clsx(
        'p-6 pt-4 border-t border-border/40 mt-auto flex items-center justify-between gap-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
