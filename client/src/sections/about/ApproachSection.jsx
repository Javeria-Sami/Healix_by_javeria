import React from 'react';
import { Container } from '../../components/common/Container.jsx';
import { SectionHeading } from '../../components/common/SectionHeading.jsx';
import { Layers, Stethoscope, Compass, ArrowRight } from 'lucide-react';
import { Button } from '../../components/common/Button.jsx';
import { ROUTES } from '../../constants/routes.js';

export function ApproachSection() {
  const pillars = [
    {
      step: 'Pillar 01',
      title: 'High-Dimensional Diagnostics',
      desc: 'We look far beyond basic cholesterol and routine blood counts. Our panels examine ApoB, inflammatory cascades (hs-CRP, Homocysteine), hormone regulation, and metabolic flexibility to reveal sub-clinical risk patterns.',
      icon: Layers,
    },
    {
      step: 'Pillar 02',
      title: 'Physician-Guided Translation',
      desc: 'Complex biometric data is meaningless without experienced clinical interpretation. Your dedicated physician translates complex lab results into clear, contextualized longevity roadmaps.',
      icon: Stethoscope,
    },
    {
      step: 'Pillar 03',
      title: 'Longitudinal Care Evolution',
      desc: 'Health is dynamic, not static. Through regular biomarker re-assessments and ongoing physician messaging, we refine your clinical interventions as your lifestyle and age markers progress.',
      icon: Compass,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background" aria-labelledby="approach-heading">
      <Container>
        <SectionHeading
          badge="Clinical Methodology"
          title="The Healix Preventative Care Standard"
          subtitle="How our three-pillar clinical approach bridges multi-omic diagnostic precision with compassionate human healthcare."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-left">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-surface border border-border rounded-healix-2xl p-8 flex flex-col justify-between shadow-soft-sm hover:border-primary/40 hover:shadow-soft-md transition-all duration-200"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-primary bg-primary-light/50 px-2.5 py-1 rounded">
                      {pillar.step}
                    </span>
                    <div className="w-10 h-10 rounded-healix-md bg-primary-light text-primary flex items-center justify-center">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                  </div>

                  <h3 className="font-heading font-bold text-xl text-[#075A46] pt-2">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Button to={ROUTES.SERVICES} variant="outline" size="md" iconTrailing={ArrowRight}>
            Explore Diagnostic Specializations
          </Button>
        </div>
      </Container>
    </section>
  );
}
