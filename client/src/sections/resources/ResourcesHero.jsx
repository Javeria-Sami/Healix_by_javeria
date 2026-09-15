import React from 'react';
import { PageContainer } from '../../layouts/PageContainer.jsx';
import { Breadcrumb } from '../../components/common/Breadcrumb.jsx';
import { Badge } from '../../components/common/Badge.jsx';
import { ROUTES } from '../../constants/routes.js';

export function ResourcesHero() {
  const breadcrumbItems = [
    { label: 'Home', href: ROUTES.HOME },
    { label: 'Resources', active: true },
  ];

  return (
    <section className="relative pt-8 pb-14 md:pt-12 md:pb-20 bg-[#F4F8F5] border-b border-[#DCE8E3]/60 overflow-hidden">
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

        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2">
            <Badge variant="primary" dot>
              Medical Insights & Preventative Guides
            </Badge>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#075C49] tracking-tight leading-[1.15]">
            Physician Perspectives on <br />
            <span className="font-serif italic font-normal text-[#8FD21F]">
              Preventative Longevity
            </span>
          </h1>

          <p className="text-text-secondary text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
            Evidence-guided clinical reviews, advanced biomarker analyses, and actionable healthcare intelligence 
            curated by Healix medical directors.
          </p>
        </div>
      </PageContainer>
    </section>
  );
}
