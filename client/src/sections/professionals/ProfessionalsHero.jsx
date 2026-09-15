import React from 'react';
import { PageContainer } from '../../layouts/PageContainer.jsx';
import { Breadcrumb } from '../../components/common/Breadcrumb.jsx';
import { Badge } from '../../components/common/Badge.jsx';
import { ROUTES } from '../../constants/routes.js';
import { ShieldCheck, Award, Clock, Users } from 'lucide-react';

export function ProfessionalsHero() {
  const breadcrumbItems = [
    { label: 'Home', href: ROUTES.HOME },
    { label: 'Medical Team', active: true },
  ];

  return (
    <section className="relative pt-8 pb-14 md:pt-12 md:pb-20 overflow-hidden border-b border-border/40 bg-gradient-to-b from-surface via-background to-background">
      {/* Background Ambience */}
      <div 
        className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" 
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-0 left-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none -z-10" 
        aria-hidden="true" 
      />

      <PageContainer>
        <div className="mb-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <div className="max-w-3xl space-y-6">
          <div className="flex items-center gap-2">
            <Badge variant="primary" dot>
              Clinical Leadership & Faculty
            </Badge>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#075A46] tracking-tight leading-[1.15]">
            Meet the Physicians & <br />
            <span className="font-serif italic font-normal text-primary">
              Specialists Behind Healix
            </span>
          </h1>

          <p className="text-text-secondary text-lg sm:text-xl leading-relaxed">
            Our interdisciplinary faculty of board-certified clinicians brings together expertise in 
            preventive cardiology, endocrinology, functional genomics, and longevity medicine.
          </p>

          {/* Credential Indicators */}
          <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-text-muted">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border">
              <Award className="w-4 h-4 text-primary" />
              <span>100% Board-Certified Clinicians</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>Interdisciplinary Peer Review</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border">
              <Clock className="w-4 h-4 text-primary" />
              <span>Dedicated Consultation Time</span>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
