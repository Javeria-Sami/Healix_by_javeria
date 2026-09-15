import React from 'react';
import { Container } from '../../components/common/Container.jsx';
import { SectionHeading } from '../../components/common/SectionHeading.jsx';
import { Target, Zap, Shield, Users } from 'lucide-react';

export function ImpactSection() {
  const pillars = [
    {
      icon: Target,
      title: 'Proactive Risk Interception',
      desc: 'Detect sub-clinical metabolic and arterial anomalies years before standard symptoms manifest.',
    },
    {
      icon: Zap,
      title: 'Rapid Diagnostic Turnaround',
      desc: 'Direct access to point-of-care screening results and unified digital health telemetry without weeks of waiting.',
    },
    {
      icon: Users,
      title: 'Dedicated Physician Accessibility',
      desc: 'Form a long-term partnership with certified physicians who know your full medical history and biology.',
    },
    {
      icon: Shield,
      title: 'Continuous Care Continuity',
      desc: 'Quarterly biomarker re-evaluations to measure progress, adapt protocols, and ensure sustained health longevity.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-surface border-y border-border" aria-labelledby="impact-heading">
      <Container>
        <SectionHeading
          badge="Measurable Clinical Value"
          title="Engineered for Long-Term Healthspan"
          subtitle="Our preventative clinical model bridges high-tech diagnostic precision with high-touch human care."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 bg-background border border-border rounded-healix-xl text-left space-y-3 shadow-soft-sm hover:border-primary/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-healix-md bg-primary-light text-primary flex items-center justify-center">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="font-heading font-bold text-base text-[#075B43]">
                  {pillar.title}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
