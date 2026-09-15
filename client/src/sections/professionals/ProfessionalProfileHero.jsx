import React from 'react';
import { PageContainer } from '../../layouts/PageContainer.jsx';
import { Breadcrumb } from '../../components/common/Breadcrumb.jsx';
import { Badge } from '../../components/common/Badge.jsx';
import { Button } from '../../components/common/Button.jsx';
import { ROUTES } from '../../constants/routes.js';
import { Calendar, Award, Clock, ShieldCheck, ArrowRight, ChevronRight, Stethoscope } from 'lucide-react';

export function ProfessionalProfileHero({ professional }) {
  const breadcrumbItems = [
    { label: 'Home', href: ROUTES.HOME },
    { label: 'Medical Team', href: ROUTES.PROFESSIONALS },
    { label: professional.name, active: true },
  ];

  return (
    <section className="relative pt-8 pb-14 md:pt-12 md:pb-20 bg-surface border-b border-border/60 overflow-hidden">
      <div 
        className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" 
        aria-hidden="true" 
      />

      <PageContainer>
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Avatar & Consultation Snapshot Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="aspect-[4/5] w-full rounded-healix-xl overflow-hidden bg-secondary border border-border shadow-soft-sm relative">
              <img
                src={professional.avatar}
                alt={professional.name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-3 right-3 bg-surface/95 backdrop-blur-sm text-xs font-bold text-[#075C49] px-3 py-1 rounded-full border border-border">
                {professional.experienceYears}+ Yrs Practice
              </div>
            </div>

            {/* Quick Facts Sidebar Card */}
            <div className="bg-background border border-border rounded-healix-xl p-6 shadow-soft-sm space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-text-muted">
                Consultation Logistics
              </h2>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between py-2 border-b border-border/50">
                  <span className="text-text-muted flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    Office Days
                  </span>
                  <span className="font-semibold text-text-primary">{professional.availableDays}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-border/50">
                  <span className="text-text-muted flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-primary" />
                    Department
                  </span>
                  <span className="font-semibold text-text-primary">{professional.department}</span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-text-muted flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    Patient Records
                  </span>
                  <span className="font-semibold text-text-primary">HIPAA Encrypted</span>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  to={ROUTES.CONTACT}
                  variant="primary"
                  size="sm"
                  className="w-full justify-center text-xs font-semibold"
                >
                  Schedule Consultation
                </Button>
              </div>
            </div>
          </div>

          {/* Profile Header Details Column */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="primary" dot>
                {professional.department}
              </Badge>
              <Badge variant="outline">
                Board-Certified Clinician
              </Badge>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#075C49] tracking-tight leading-[1.15]">
              {professional.name}
            </h1>

            <div className="space-y-1">
              <p className="text-base font-semibold text-primary">
                {professional.role}
              </p>
              <p className="text-sm text-text-muted">
                {professional.specialty}
              </p>
            </div>

            <div className="inline-block p-2.5 rounded-healix-md bg-background border border-border/80 text-xs font-mono text-text-secondary">
              {professional.credentials}
            </div>

            <p className="text-text-secondary text-base sm:text-lg leading-relaxed pt-2">
              {professional.shortBio}
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Button
                to={ROUTES.CONTACT}
                variant="primary"
                size="md"
                className="inline-flex items-center gap-2 shadow-soft-sm"
              >
                <span>Request Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
              <a
                href="#services"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-healix-md border border-border bg-background text-sm font-semibold text-text-primary hover:border-primary/40 hover:text-primary transition-colors"
              >
                <span>Supervised Programs</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
