import React from 'react';
import { PageContainer } from '../../layouts/PageContainer.jsx';
import { SectionHeading } from '../../components/common/SectionHeading.jsx';
import { Card } from '../../components/cards/Card.jsx';
import { FileText, Cpu, Stethoscope, LineChart } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    icon: FileText,
    title: 'Intake & Health Mapping',
    description: 'We capture your full medical history, family genetics, lifestyle patterns, and personal health goals through our secure digital portal.',
  },
  {
    number: '02',
    icon: Cpu,
    title: 'Diagnostic Precision',
    description: 'Comprehensive biomarker panels and non-invasive physiological testing performed at our modern clinical facility with zero wait times.',
  },
  {
    number: '03',
    icon: Stethoscope,
    title: 'Physician Synthesis',
    description: 'Specialists analyze lab data, diagnostic imaging, and risk vectors to synthesize a unified clinical interpretation.',
  },
  {
    number: '04',
    icon: LineChart,
    title: 'Personalized Roadmap',
    description: 'You receive a prioritized, physician-guided longevity strategy with quarterly surveillance checkpoints and care continuity.',
  },
];

export function ServicesProcess() {
  return (
    <section className="py-16 md:py-24 bg-background border-b border-border/40">
      <PageContainer>
        <SectionHeading
          badge="Clinical Methodology"
          title="The Healix Care Continuum"
          subtitle="From baseline diagnostics to physician-guided longevity, our four-stage protocol ensures rigorous clinical clarity."
          align="center"
          className="mb-14"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <Card
                key={step.number}
                variant="default"
                hoverEffect
                className="relative overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-2xl font-black text-primary/25">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-healix-md bg-primary-light text-primary flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-heading text-lg font-bold text-text-primary mb-2.5">
                    {step.title}
                  </h3>

                  <p className="text-xs text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </PageContainer>
    </section>
  );
}
