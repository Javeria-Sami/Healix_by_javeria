import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../../layouts/PageContainer.jsx';
import { Breadcrumb } from '../../components/common/Breadcrumb.jsx';
import { Badge } from '../../components/common/Badge.jsx';
import { Button } from '../../components/common/Button.jsx';
import { ROUTES } from '../../constants/routes.js';
import { Clock, Calendar, ShieldCheck, ArrowRight, ChevronRight, Stethoscope } from 'lucide-react';

export function ServiceDetailHero({ service }) {
  const breadcrumbItems = [
    { label: 'Home', href: ROUTES.HOME },
    { label: 'Services', href: ROUTES.SERVICES },
    { label: service.title, active: true },
  ];

  return (
    <section className="relative pt-8 pb-14 md:pt-12 md:pb-20 bg-surface border-b border-border/60 overflow-hidden">
      {/* Background Ambience */}
      <div 
        className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" 
        aria-hidden="true" 
      />

      <PageContainer>
        {/* Breadcrumbs */}
        <div className="mb-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Hero Column */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="primary" dot>
                {service.category}
              </Badge>
              {service.badge && (
                <Badge variant="outline">
                  {service.badge}
                </Badge>
              )}
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#075B43] tracking-tight leading-[1.15]">
              {service.title}
            </h1>

            <p className="text-text-secondary text-lg sm:text-xl leading-relaxed">
              {service.tagline}
            </p>

            <div className="p-4 rounded-healix-lg bg-background border border-border/80 text-sm text-text-secondary leading-relaxed">
              <p>{service.description}</p>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button
                to={ROUTES.CONTACT}
                variant="primary"
                size="md"
                className="inline-flex items-center gap-2 shadow-soft-sm"
              >
                <span>Request Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
              <a
                href="#inclusions"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-healix-md border border-border bg-background text-sm font-semibold text-text-primary hover:border-primary/40 hover:text-primary transition-colors"
              >
                <span>View What's Included</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Facts Sidebar Card */}
          <div className="lg:col-span-4">
            <div className="bg-background border border-border rounded-healix-xl p-6 shadow-soft-sm space-y-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-text-muted">
                Consultation Snapshot
              </h2>

              <div className="space-y-3.5 text-xs">
                <div className="flex items-center justify-between py-2 border-b border-border/50">
                  <span className="text-text-muted flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    Duration
                  </span>
                  <span className="font-semibold text-text-primary">{service.duration}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-border/50">
                  <span className="text-text-muted flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    Availability
                  </span>
                  <span className="font-semibold text-text-primary">{service.availability || 'Same-Week'}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-border/50">
                  <span className="text-text-muted flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-primary" />
                    Supervision
                  </span>
                  <span className="font-semibold text-text-primary">Board-Certified</span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-text-muted flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    Confidentiality
                  </span>
                  <span className="font-semibold text-text-primary">Encrypted Records</span>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  to={ROUTES.CONTACT}
                  variant="secondary"
                  size="sm"
                  className="w-full justify-center text-xs font-semibold"
                >
                  Speak with an Advisor
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
