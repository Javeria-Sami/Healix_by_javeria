import React from 'react';
import { PageContainer } from '../../layouts/PageContainer.jsx';
import { SectionHeading } from '../../components/common/SectionHeading.jsx';
import { Card } from '../../components/cards/Card.jsx';
import { Quote } from 'lucide-react';

export function ProfessionalBiography({ bio, philosophy }) {
  if (!bio) return null;

  return (
    <section className="py-16 md:py-24 bg-background border-b border-border/40">
      <PageContainer>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-6">
            <SectionHeading
              badge="Clinical Biography"
              title="Physician Background & Stewardship"
              align="left"
              className="mb-6"
            />

            <div className="prose prose-sm text-text-secondary leading-relaxed space-y-4">
              <p className="text-base sm:text-lg text-text-primary font-medium leading-relaxed">
                {bio}
              </p>
            </div>
          </div>

          {philosophy && (
            <div className="lg:col-span-5">
              <Card
                variant="default"
                className="p-6 sm:p-8 bg-surface border-border/80 relative overflow-hidden flex flex-col justify-between h-full"
              >
                <div>
                  <div className="w-10 h-10 rounded-healix-md bg-primary-light text-primary flex items-center justify-center mb-4">
                    <Quote className="w-5 h-5" />
                  </div>

                  <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-text-muted mb-3">
                    Philosophy of Care
                  </h3>

                  <blockquote className="font-serif italic text-base sm:text-lg text-text-primary leading-relaxed">
                    "{philosophy}"
                  </blockquote>
                </div>

                <div className="pt-6 mt-6 border-t border-border/50 text-[11px] text-text-muted">
                  Healix Clinical Stewardship Standard
                </div>
              </Card>
            </div>
          )}
        </div>
      </PageContainer>
    </section>
  );
}
