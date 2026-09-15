import React from 'react';
import { PageContainer } from '../../layouts/PageContainer.jsx';
import { SectionHeading } from '../../components/common/SectionHeading.jsx';
import { Card } from '../../components/cards/Card.jsx';
import { CheckCircle2, Award, BookOpen } from 'lucide-react';

export function ProfessionalExpertise({ focusAreas = [], qualifications = [] }) {
  return (
    <section className="py-16 md:py-24 bg-surface border-b border-border/40">
      <PageContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Clinical Focus Areas */}
          <Card variant="default" className="p-6 sm:p-8 bg-background border-border/70">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-healix-md bg-primary-light text-primary flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-[#075C49]">
                  Clinical Focus & Sub-Specialties
                </h3>
                <p className="text-xs text-text-muted">Primary clinical research and patient care areas</p>
              </div>
            </div>

            <div className="space-y-3">
              {focusAreas.map((area, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-3 p-3 rounded-healix-md bg-surface border border-border/50 text-xs font-medium text-text-primary"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <span>{area}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Qualifications & Board Certifications */}
          <Card variant="default" className="p-6 sm:p-8 bg-background border-border/70">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-healix-md bg-primary-light text-primary flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-[#075C49]">
                  Qualifications & Credentials
                </h3>
                <p className="text-xs text-text-muted">Verified medical education and board certifications</p>
              </div>
            </div>

            <div className="space-y-3">
              {qualifications.map((qual, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-3 p-3 rounded-healix-md bg-surface border border-border/50 text-xs text-text-secondary"
                >
                  <Award className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-medium text-text-primary">{qual}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </PageContainer>
    </section>
  );
}
