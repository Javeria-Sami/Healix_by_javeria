import React from 'react';
import { PageContainer } from '../../layouts/PageContainer.jsx';
import { SectionHeading } from '../../components/common/SectionHeading.jsx';
import { Card } from '../../components/cards/Card.jsx';

export function ServicePathway({ process = [] }) {
  if (!process || process.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-background border-b border-border/40">
      <PageContainer>
        <SectionHeading
          badge="Clinical Process"
          title="The 4-Step Clinical Journey"
          subtitle="A clear, structured pathway engineered to deliver rapid diagnostic results and actionable clinical direction."
          align="center"
          className="mb-14"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {process.map((stepItem, idx) => (
            <Card
              key={idx}
              variant="default"
              className="p-6 flex flex-col justify-between relative overflow-hidden border-border/70"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-2xl font-black text-primary/30">
                    {stepItem.step}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-text-muted px-2 py-0.5 rounded bg-secondary">
                    Phase {idx + 1}
                  </span>
                </div>

                <h3 className="font-heading text-base font-bold text-[#075A46] mb-2">
                  {stepItem.title}
                </h3>

                <p className="text-xs text-text-secondary leading-relaxed">
                  {stepItem.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
