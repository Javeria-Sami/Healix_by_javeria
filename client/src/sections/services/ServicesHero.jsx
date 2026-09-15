import React from 'react';
import { PageContainer } from '../../layouts/PageContainer.jsx';
import { Breadcrumb } from '../../components/common/Breadcrumb.jsx';
import { Badge } from '../../components/common/Badge.jsx';
import { ROUTES } from '../../constants/routes.js';

export function ServicesHero() {
  const breadcrumbItems = [
    { label: 'Home', href: ROUTES.HOME },
    { label: 'Services', active: true },
  ];

  return (
    <section className="relative pt-8 pb-14 md:pt-12 md:pb-20 overflow-hidden border-b border-[#D8E7E0]/60 bg-[#F4F8F5]">
      {/* Subtle Background Glows */}
      <div 
        className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" 
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-0 left-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none -z-10" 
        aria-hidden="true" 
      />

      <PageContainer>
        <div className="mb-6 flex justify-start text-left">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center justify-center gap-2">
            <Badge variant="primary" dot>
              Clinical Offerings & Specializations
            </Badge>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#075A46] tracking-tight leading-[1.15]">
            Proactive Healthcare & <br />
            <span className="font-serif italic font-normal text-primary">
              Diagnostic Specializations
            </span>
          </h1>

          <p className="text-text-secondary text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
            Every clinical offering at Healix is designed around early biomarker detection, 
            interdisciplinary physician synthesis, and measurable longevity roadmaps tailored to your biology.
          </p>
        </div>
      </PageContainer>
    </section>
  );
}
