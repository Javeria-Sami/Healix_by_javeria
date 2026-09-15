import React from 'react';
import clsx from 'clsx';

const sizeMap = {
  container: 'max-w-container',
  editorial: 'max-w-editorial',
  narrow: 'max-w-narrow',
  full: 'max-w-full',
};

export function Container({
  children,
  size = 'container',
  className = '',
  as: Component = 'div',
  ...props
}) {
  return (
    <Component
      className={clsx(
        'w-full mx-auto px-4 sm:px-6 lg:px-8',
        sizeMap[size] || sizeMap.container,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
