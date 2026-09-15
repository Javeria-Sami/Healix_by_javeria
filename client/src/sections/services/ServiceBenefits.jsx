import React from 'react';
import { PageContainer } from '../../layouts/PageContainer.jsx';
import { SectionHeading } from '../../components/common/SectionHeading.jsx';
import { Card } from '../../components/cards/Card.jsx';
import { CheckCircle, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export function ServiceBenefits({ benefits = [] }) {
  if (!benefits || benefits.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-surface border-b border-border/40">
      <PageContainer>
        <SectionHeading
          badge="Measurable Value"
          title="Evidence-Based Clinical Benefits"
          subtitle="How proactive diagnostics and physician synthesis translate into tangible healthspan improvements."
          align="left"
          className="mb-12 max-w-3xl"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((benefit, idx) => (
            <Card
              key={idx}
              variant="default"
              className="p-6 sm:p-8 bg-background border-border/70 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-healix-md bg-primary-light text-primary flex items-center justify-center mb-5">
                  <ShieldCheck className="w-5 h-5" />
                </div>

                <h3 className="font-heading text-lg font-bold text-[#075C49] mb-3">
                  {benefit.title}
                </h3>

                <p className="text-sm text-text-secondary leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
