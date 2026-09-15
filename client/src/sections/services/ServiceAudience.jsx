import React from 'react';
import { PageContainer } from '../../layouts/PageContainer.jsx';
import { SectionHeading } from '../../components/common/SectionHeading.jsx';
import { Card } from '../../components/cards/Card.jsx';
import { Users, UserCheck } from 'lucide-react';

export function ServiceAudience({ audience = [] }) {
  if (!audience || audience.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-surface border-b border-border/40">
      <PageContainer>
        <SectionHeading
          badge="Candidate Suitability"
          title="Who Is This Program Designed For?"
          subtitle="Understand which health profiles, risk indications, and proactive goals align best with this specialization."
          align="left"
          className="mb-12 max-w-3xl"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {audience.map((item, idx) => (
            <Card
              key={idx}
              variant="default"
              className="p-6 bg-background border-border/70 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-healix-md bg-primary-light text-primary flex items-center justify-center mb-4">
                  <UserCheck className="w-5 h-5" />
                </div>

                <h3 className="font-heading text-base font-bold text-[#075A46] mb-2">
                  {item.profile}
                </h3>

                <p className="text-xs text-text-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
