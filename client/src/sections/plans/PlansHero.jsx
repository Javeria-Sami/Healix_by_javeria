import React from 'react';
import { PageContainer } from '../../layouts/PageContainer.jsx';
import { Breadcrumb } from '../../components/common/Breadcrumb.jsx';
import { Badge } from '../../components/common/Badge.jsx';
import { ROUTES } from '../../constants/routes.js';
import { ShieldCheck, HeartPulse, Sparkles, Clock } from 'lucide-react';

export function PlansHero({ annualBilling, onToggleBilling }) {
  const breadcrumbItems = [
    { label: 'Home', href: ROUTES.HOME },
    { label: 'Care Plans', active: true },
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
              Care Memberships & Pricing
            </Badge>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#075C49] tracking-tight leading-[1.15]">
            Transparent, Predictable <br />
            <span className="font-serif italic font-normal text-primary">
              Preventative Healthcare
            </span>
          </h1>

          <p className="text-text-secondary text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
            Select a tailored preventative care plan designed around comprehensive diagnostic reviews, 
            continuous physician stewardship, and proactive healthspan extension.
          </p>

          {/* Billing Frequency Switch */}
          <div className="pt-4 flex items-center justify-center gap-4">
            <span 
              id="label-monthly"
              className={`text-sm font-semibold transition-colors ${
                !annualBilling ? 'text-text-primary' : 'text-text-muted'
              }`}
            >
              Monthly Billing
            </span>

            <button
              type="button"
              role="switch"
              aria-checked={annualBilling}
              aria-label="Toggle between monthly and annual billing"
              onClick={onToggleBilling}
              className="relative inline-flex h-8 w-16 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-secondary transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-primary shadow-soft-sm ring-0 transition duration-200 ease-in-out ${
                  annualBilling ? 'translate-x-8' : 'translate-x-0'
                }`}
              />
            </button>

            <span 
              id="label-annual"
              className={`text-sm font-semibold flex items-center gap-2 transition-colors ${
                annualBilling ? 'text-text-primary' : 'text-text-muted'
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-2 py-0.5 rounded-full bg-primary-light text-primary text-xs font-bold font-mono">
                Save 15%
              </span>
            </span>
          </div>

          {/* Value Badges */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-text-muted">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>No Surprise Fees</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border">
              <HeartPulse className="w-4 h-4 text-primary" />
              <span>HSA / FSA Eligible</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border">
              <Clock className="w-4 h-4 text-primary" />
              <span>30-Day Satisfaction Window</span>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
