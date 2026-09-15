import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { ChevronRight } from 'lucide-react';

export function Breadcrumb({ items = [], className = '' }) {
  if (!items.length) return null;

  return (
    <nav aria-label="Breadcrumb" className={clsx('w-full', className)}>
      <ol className="flex flex-wrap items-center gap-2 text-sm font-sans">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.label || index} className="inline-flex items-center gap-2">
              {index > 0 && (
                <ChevronRight className="w-3.5 h-3.5 text-neutral-400 stroke-[1.75] flex-shrink-0" aria-hidden="true" />
              )}
              {isLast ? (
                <span className="font-semibold text-neutral-900" aria-current="page">
                  {item.label}
                </span>
              ) : item.href ? (
                <Link
                  to={item.href}
                  className="font-medium text-neutral-500 hover:text-[#075C46] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#075C46] rounded"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-neutral-500">{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
