import React from 'react';
import { PageContainer } from '../../layouts/PageContainer.jsx';
import { Badge } from '../../components/common/Badge.jsx';
import { Button } from '../../components/common/Button.jsx';
import { ShieldCheck, CheckCircle2, ArrowRight, HeartPulse, Activity, Zap } from 'lucide-react';

export function FeaturedService({ service }) {
  if (!service) return null;

  return (
    <section className="py-16 md:py-24 bg-surface border-y border-border/60 relative overflow-hidden">
      <div 
        className="absolute -top-32 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" 
        aria-hidden="true" 
      />

      <PageContainer>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Editorial Information */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2">
              <Badge variant="primary" dot>
                Flagship Protocol
              </Badge>
              <Badge variant="outline">
                {service.category}
              </Badge>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#075B43] tracking-tight">
              {service.title}
            </h2>

            <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
              Our flagship preventive care protocol integrates over 60 biomarker metrics with resting cardiorespiratory 
              analytics and a dedicated physician review. Designed for individuals seeking an uncompromised biological baseline.
            </p>

            {/* Key Inclusions Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {service.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-healix-md bg-background border border-border/60">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-xs font-medium text-text-primary">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Button
                to={`/services/${service.slug}`}
                variant="primary"
                size="md"
                className="inline-flex items-center gap-2 shadow-soft-sm"
              >
                <span>Explore Full Program</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                to="/contact"
                variant="outline"
                size="md"
              >
                <span>Request Consultation</span>
              </Button>
            </div>
          </div>

          {/* Right Column: Editorial Biometric & Clinical Snapshot Card */}
          <div className="lg:col-span-5">
            <div className="bg-background border border-border/80 rounded-healix-xl p-6 sm:p-8 shadow-soft-md space-y-6 relative">
              <div className="flex items-center justify-between border-b border-border/60 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-healix-md bg-primary-light text-primary flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#075B43]">Clinical Assessment Profile</h3>
                    <p className="text-[11px] text-text-muted">Multi-System Longevity Screen</p>
                  </div>
                </div>
                <Badge variant="secondary" className="text-[10px]">
                  {service.duration}
                </Badge>
              </div>

              {/* Assessment Metrics Breakdown */}
              <div className="space-y-4">
                <div className="p-3.5 rounded-healix-md bg-surface border border-border/60 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-text-primary flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-primary" />
                      Comprehensive Metabolic Panel
                    </span>
                    <span className="text-primary font-mono text-[11px]">60+ Markers</span>
                  </div>
                  <p className="text-[11px] text-text-secondary">
                    Glucose variability, lipid fractionation, hepatic profiling, and high-sensitivity inflammatory assays.
                  </p>
                </div>

                <div className="p-3.5 rounded-healix-md bg-surface border border-border/60 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-text-primary flex items-center gap-1.5">
                      <HeartPulse className="w-3.5 h-3.5 text-accent" />
                      Cardiorespiratory Baseline
                    </span>
                    <span className="text-accent font-mono text-[11px]">12-Lead ECG</span>
                  </div>
                  <p className="text-[11px] text-text-secondary">
                    Resting autonomic balance, arterial compliance analysis, and HRV spectral mapping.
                  </p>
                </div>

                <div className="p-3.5 rounded-healix-md bg-surface border border-border/60 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-text-primary flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-status-success" />
                      Physician Action Plan
                    </span>
                    <span className="text-status-success font-mono text-[11px]">Personalized</span>
                  </div>
                  <p className="text-[11px] text-text-secondary">
                    Evidence-based nutritional, pharmacological, and physical lifestyle recommendations.
                  </p>
                </div>
              </div>

              <div className="pt-2 text-center">
                <span className="text-[11px] text-text-muted">
                  Conducted by Board-Certified Preventive Physicians
                </span>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
