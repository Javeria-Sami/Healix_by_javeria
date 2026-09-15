import React from 'react';
import { PageContainer } from '../../layouts/PageContainer.jsx';

export function ProfessionalsFilter({ departments, activeDepartment, onSelectDepartment, counts }) {
  return (
    <div className="py-8 bg-background border-b border-border/30">
      <PageContainer>
        <div 
          className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none"
          role="tablist"
          aria-label="Filter medical team by clinical department"
        >
          {departments.map((dept) => {
            const isSelected = activeDepartment === dept;
            const count = counts[dept] ?? 0;

            return (
              <button
                key={dept}
                role="tab"
                aria-selected={isSelected}
                aria-controls="professionals-grid"
                id={`tab-${dept.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => onSelectDepartment(dept)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                  isSelected
                    ? 'bg-primary text-white shadow-soft-sm'
                    : 'bg-surface border border-border text-text-secondary hover:text-text-primary hover:border-primary/40'
                }`}
              >
                <span>{dept}</span>
                <span 
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-secondary text-text-muted'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </PageContainer>
    </div>
  );
}
