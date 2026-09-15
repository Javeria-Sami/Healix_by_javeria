import React from 'react';

export function PageContainer({ children, className = '', as: Component = 'div', ...props }) {
  return (
    <Component
      className={`w-full max-w-container mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
