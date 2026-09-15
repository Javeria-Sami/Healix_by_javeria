import React from 'react';
import { PageContainer } from '../../layouts/PageContainer.jsx';
import { Breadcrumb } from '../../components/common/Breadcrumb.jsx';
import { Badge } from '../../components/common/Badge.jsx';
import { ROUTES } from '../../constants/routes.js';
import { Activity, Building2, Stethoscope, Dna } from 'lucide-react';

export function PortfolioHero() {
  const breadcrumbItems = [
    { label: 'Home', href: ROUTES.HOME },
    { label: 'Portfolio', active: true },
  ];

  return (
    <section className="relative pt-8 pb-14 md:pt-12 md:pb-20 bg-gradient-to-b from-surface via-background to-background border-b border-border/40 overflow-hidden">
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
              Case Studies & Deployments
            </Badge>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#075C49] tracking-tight leading-[1.15]">
            Clinical Deployments & <br />
            <span className="font-serif italic font-normal text-primary">
              Healthcare Case Studies
            </span>
          </h1>

          <p className="text-text-secondary text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
            Explore how Healix preventative diagnostics, precision longevity suites, and digital telemetry 
            modernize clinical workflows and deliver proactive health protection.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-text-muted">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border">
              <Building2 className="w-4 h-4 text-primary" />
              <span>Enterprise Workforce Health</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border">
              <Activity className="w-4 h-4 text-primary" />
              <span>Diagnostic Telemetry</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border">
              <Dna className="w-4 h-4 text-primary" />
              <span>Genomic Integration</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border">
              <Stethoscope className="w-4 h-4 text-primary" />
              <span>Physician-Led Care</span>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
