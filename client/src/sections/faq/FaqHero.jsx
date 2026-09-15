import React from 'react';
import { PageContainer } from '../../layouts/PageContainer.jsx';
import { Breadcrumb } from '../../components/common/Breadcrumb.jsx';
import { Badge } from '../../components/common/Badge.jsx';
import { ROUTES } from '../../constants/routes.js';
import { HelpCircle, Stethoscope, ShieldCheck, CreditCard } from 'lucide-react';

export function FaqHero() {
  const breadcrumbItems = [
    { label: 'Home', href: ROUTES.HOME },
    { label: 'FAQ', active: true },
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
              Patient & Clinical Inquiries
            </Badge>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#075B43] tracking-tight leading-[1.15]">
            Frequently Asked <br />
            <span className="font-serif italic font-normal text-primary">
              Questions
            </span>
          </h1>

          <p className="text-text-secondary text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
            Find direct, evidence-guided answers regarding diagnostic protocols, insurance compatibility, 
            membership tiers, physician access, and patient health data security.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-text-muted">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border">
              <Stethoscope className="w-4 h-4 text-primary" />
              <span>Clinical Protocols</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border">
              <CreditCard className="w-4 h-4 text-primary" />
              <span>HSA / FSA & Insurance</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>HIPAA Security</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border">
              <HelpCircle className="w-4 h-4 text-primary" />
              <span>Concierge Support</span>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
