import React from 'react';
import { PageContainer } from '../../layouts/PageContainer.jsx';
import { SectionHeading } from '../../components/common/SectionHeading.jsx';
import { COMPARISON_FEATURES } from '../../data/plans.js';
import { Check, Minus, CheckCircle2 } from 'lucide-react';

export function PlanComparisonTable() {
  const renderCell = (val) => {
    if (typeof val === 'boolean') {
      return val ? (
        <Check className="w-4 h-4 text-primary mx-auto" aria-label="Included" />
      ) : (
        <Minus className="w-4 h-4 text-text-muted/40 mx-auto" aria-label="Not Included" />
      );
    }
    return <span className="text-xs font-semibold text-text-primary">{val}</span>;
  };

  return (
    <section className="py-16 md:py-24 bg-surface border-b border-border/40">
      <PageContainer>
        <SectionHeading
          badge="Detailed Matrix"
          title="Care Membership Comparison"
          subtitle="Compare diagnostic frequencies, specialist consultation models, and digital concierge features across tiers."
          align="center"
          className="mb-14"
        />

        {/* Responsive Table Wrapper */}
        <div className="bg-background border border-border rounded-healix-xl shadow-soft-sm overflow-hidden">
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th scope="col" className="p-4 sm:p-6 text-sm font-bold text-text-primary w-2/5">
                    Program Features & Services
                  </th>
                  <th scope="col" className="p-4 sm:p-6 text-center text-sm font-bold text-text-primary w-1/5 border-l border-border/50">
                    Essential Care
                  </th>
                  <th scope="col" className="p-4 sm:p-6 text-center text-sm font-bold text-primary w-1/5 border-l border-border/50 bg-primary/5">
                    Professional Health
                    <span className="block text-[10px] font-mono text-text-muted font-normal mt-0.5">Most Recommended</span>
                  </th>
                  <th scope="col" className="p-4 sm:p-6 text-center text-sm font-bold text-text-primary w-1/5 border-l border-border/50">
                    Executive & Enterprise
                  </th>
                </tr>
              </thead>

              <tbody>
                {COMPARISON_FEATURES.map((group, groupIdx) => (
                  <React.Fragment key={groupIdx}>
                    {/* Category Header Row */}
                    <tr className="bg-secondary/40 border-y border-border/60">
                      <th 
                        colSpan={4} 
                        scope="colgroup" 
                        className="py-3 px-4 sm:px-6 text-xs font-bold uppercase tracking-wider text-text-primary"
                      >
                        {group.category}
                      </th>
                    </tr>

                    {/* Feature Items */}
                    {group.items.map((item, itemIdx) => (
                      <tr 
                        key={itemIdx} 
                        className="border-b border-border/40 hover:bg-surface/50 transition-colors"
                      >
                        <th 
                          scope="row" 
                          className="p-4 sm:px-6 sm:py-4 text-xs font-medium text-text-secondary"
                        >
                          {item.name}
                        </th>
                        <td className="p-4 sm:py-4 text-center border-l border-border/40">
                          {renderCell(item.essential)}
                        </td>
                        <td className="p-4 sm:py-4 text-center border-l border-border/40 bg-primary/5">
                          {renderCell(item.pro)}
                        </td>
                        <td className="p-4 sm:py-4 text-center border-l border-border/40">
                          {renderCell(item.enterprise)}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
