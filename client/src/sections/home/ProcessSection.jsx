import React from 'react';
import { Container } from '../../components/common/Container.jsx';
import { SectionHeading } from '../../components/common/SectionHeading.jsx';
import { Stethoscope, ClipboardCheck, LineChart, ShieldCheck } from 'lucide-react';

export function ProcessSection() {
  const steps = [
    {
      number: '01',
      title: 'Biomarker Intake & Profiling',
      description: 'Comprehensive blood panels, cardiovascular screenings, and metabolic mapping completed with concierge ease.',
      icon: ClipboardCheck,
    },
    {
      number: '02',
      title: 'Physician Review & Synthesis',
      description: 'Our multi-disciplinary medical team reviews diagnostic data to identify root vulnerabilities and biological longevity markers.',
      icon: Stethoscope,
    },
    {
      number: '03',
      title: 'Personalized Longevity Blueprint',
      description: 'Receive an actionable health roadmap including targeted clinical interventions, lifestyle metrics, and medical protocols.',
      icon: LineChart,
    },
    {
      number: '04',
      title: 'Continuous Tracking & Support',
      description: 'Quarterly biomarker re-evaluations, same-day physician communication, and proactive adjustments as your health evolves.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background" aria-labelledby="process-heading">
      <Container>
        <SectionHeading
          badge="Care Methodology"
          title="How Healix Works"
          subtitle="A systematic, physician-guided pathway from baseline diagnostic discovery to sustained lifelong vitality."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="bg-surface border border-border rounded-healix-xl p-6 sm:p-8 text-left relative flex flex-col justify-between shadow-soft-sm hover:shadow-soft-md hover:border-primary/40 transition-all duration-200 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-heading font-extrabold text-2xl text-primary/80 group-hover:text-primary transition-colors">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-healix-md bg-primary-light text-primary flex items-center justify-center">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                  </div>

                  <h3 className="font-heading font-bold text-base text-[#075B43] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
