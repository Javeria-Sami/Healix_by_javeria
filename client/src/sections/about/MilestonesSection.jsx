import React from 'react';
import { Container } from '../../components/common/Container.jsx';
import { SectionHeading } from '../../components/common/SectionHeading.jsx';
import { Calendar, CheckCircle2 } from 'lucide-react';

export function MilestonesSection() {
  const milestones = [
    {
      year: '2023',
      title: 'Founding & Clinical Protocol Architecture',
      description: 'Healix was established by physician specialists to pioneer comprehensive preventative care models and high-dimensional biomarker screening.',
    },
    {
      year: '2024',
      title: 'Advanced Diagnostic Telemetry Launch',
      description: 'Integrated continuous wearable tracking, non-invasive cardiac imaging suites, and encrypted digital patient health records.',
    },
    {
      year: '2025',
      title: 'Corporate Executive Health Expansion',
      description: 'Deployed enterprise preventative health initiatives across major technology organizations and multi-location clinical partners.',
    },
    {
      year: '2026',
      title: 'Comprehensive Longevity Institute',
      description: 'Expanded specialized programs in metabolic medicine, cellular aging mitigation, and personalized healthspan roadmaps.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background" aria-labelledby="milestones-heading">
      <Container>
        <SectionHeading
          badge="Institutional Evolution"
          title="Milestones in Preventative Healthcare"
          subtitle="A timeline of our clinical growth, technological innovations, and expanding commitment to patient longevity."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 text-left">
          {milestones.map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-surface border border-border rounded-healix-xl space-y-3 relative shadow-soft-sm hover:border-primary/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-heading font-extrabold text-2xl text-primary font-mono">
                  {item.year}
                </span>
                <div className="w-8 h-8 rounded-full bg-primary-light text-primary flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                </div>
              </div>

              <h3 className="font-heading font-bold text-base text-[#075A46] pt-1">
                {item.title}
              </h3>

              <p className="text-xs text-text-secondary leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
