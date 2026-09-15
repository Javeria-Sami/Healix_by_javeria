import React from 'react';
import { ROUTES } from '../../constants/routes.js';
import { Container } from '../../components/common/Container.jsx';
import { Badge } from '../../components/common/Badge.jsx';
import { Button } from '../../components/common/Button.jsx';
import { Sparkles, ArrowRight, Dna, Activity, Stethoscope, CheckCircle2, Shield } from 'lucide-react';

export function FeaturedSolution() {
  const diagnosticPillars = [
    {
      title: 'Advanced Genomic & Cellular Profiling',
      desc: 'Deep molecular screening targeting biological age markers and sub-clinical predisposition indicators.',
    },
    {
      title: 'Real-Time Cardiovascular Risk Mapping',
      desc: 'High-resolution calcium scoring, endothelial analysis, and continuous wearable rhythm telemetry.',
    },
    {
      title: 'Dedicated Physician Care Navigation',
      desc: 'Quarterly multi-specialist reviews and actionable, evidence-based healthspan protocols.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-surface border-y border-border" aria-labelledby="featured-solution-heading">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Diagnostic Roadmap */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative bg-background border border-border rounded-healix-2xl p-6 sm:p-8 shadow-soft-lg">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center gap-2.5">
                  <Dna className="w-5 h-5 text-primary" aria-hidden="true" />
                  <span className="font-heading font-bold text-sm text-[#075C49]">
                    Healix Longevity Roadmap
                  </span>
                </div>
                <Badge variant="primary" size="sm">
                  Flagship Protocol
                </Badge>
              </div>

              {/* Assessment Timeline / Roadmap Nodes */}
              <div className="py-6 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold text-xs flex-shrink-0">
                    01
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-xs text-[#075C49]">
                      Baseline Cellular & Metabolic Audit
                    </h4>
                    <p className="text-xs text-text-secondary mt-0.5">
                      120+ clinical biomarkers evaluating inflammation, hormones, and nutrient uptake.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold text-xs flex-shrink-0">
                    02
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-xs text-[#075C49]">
                      Cardiovascular Imaging & Rhythm Telemetry
                    </h4>
                    <p className="text-xs text-text-secondary mt-0.5">
                      Non-invasive arterial ultrasound, VO2 max analysis, and real-time biometric tracking.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold text-xs flex-shrink-0">
                    03
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-xs text-[#075C49]">
                      Physician-Led Longevity Blueprint
                    </h4>
                    <p className="text-xs text-text-secondary mt-0.5">
                      Personalized therapeutic roadmap with scheduled quarterly clinical checkpoints.
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust Footer */}
              <div className="pt-4 border-t border-border flex items-center justify-between text-xs text-text-muted">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-primary" aria-hidden="true" />
                  HIPAA-Protected Protocol
                </span>
                <span className="font-semibold text-primary">Physician Supervised</span>
              </div>
            </div>
          </div>

          {/* Right Column: Description & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-left order-1 lg:order-2">
            <Badge variant="primary" size="md" icon={Sparkles}>
              Flagship Clinical Offering
            </Badge>

            <h2 id="featured-solution-heading" className="font-heading text-3xl sm:text-4xl font-extrabold text-[#075C49] leading-tight">
              The Longitudinal <br />
              <span className="font-editorial italic font-normal text-primary">Longevity Assessment</span>
            </h2>

            <p className="font-body text-base text-text-secondary leading-relaxed">
              Standard checkups only capture disease after symptoms occur. Our Longitudinal Longevity Assessment identifies early metabolic, cardiovascular, and cellular vulnerabilities years before they manifest, giving you the power of prevention.
            </p>

            <div className="space-y-4 pt-2">
              {diagnosticPillars.map((pillar, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h4 className="font-heading font-bold text-sm text-[#075C49]">{pillar.title}</h4>
                    <p className="text-xs text-text-secondary mt-0.5">{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button to={ROUTES.CONTACT} variant="primary" size="md" iconTrailing={ArrowRight}>
                Schedule Assessment
              </Button>
              <Button to={ROUTES.SERVICES} variant="outline" size="md">
                Learn About Diagnostics
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
