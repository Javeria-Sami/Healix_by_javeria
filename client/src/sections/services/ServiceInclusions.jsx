import React from 'react';
import { PageContainer } from '../../layouts/PageContainer.jsx';
import { SectionHeading } from '../../components/common/SectionHeading.jsx';
import { Card } from '../../components/cards/Card.jsx';
import { CheckCircle2, ShieldAlert } from 'lucide-react';

export function ServiceInclusions({ inclusions = [] }) {
  if (!inclusions || inclusions.length === 0) return null;

  return (
    <section id="inclusions" className="py-16 md:py-24 bg-background border-b border-border/40 scroll-mt-20">
      <PageContainer>
        <SectionHeading
          badge="Clinical Inclusions"
          title="What This Service Includes"
          subtitle="A transparent, comprehensive breakdown of every clinical test, specialist consultation, and diagnostic deliverable in this program."
          align="left"
          className="mb-12 max-w-3xl"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {inclusions.map((inclusion, idx) => (
            <Card
              key={idx}
              variant="default"
              className="p-6 sm:p-8 flex flex-col justify-between border-border/70"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-primary-light text-primary flex items-center justify-center font-mono text-xs font-bold">
                    0{idx + 1}
                  </span>
                  <h3 className="font-heading text-lg font-bold text-[#075C49]">
                    {inclusion.title}
                  </h3>
                </div>

                <p className="text-text-secondary text-sm leading-relaxed mb-6">
                  {inclusion.description}
                </p>

                {inclusion.items && inclusion.items.length > 0 && (
                  <div className="space-y-2.5 pt-4 border-t border-border/50">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted block mb-1">
                      Included Components
                    </span>
                    {inclusion.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex items-start gap-2.5 text-xs text-text-secondary">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
