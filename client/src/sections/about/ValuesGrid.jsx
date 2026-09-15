import React from 'react';
import { Container } from '../../components/common/Container.jsx';
import { SectionHeading } from '../../components/common/SectionHeading.jsx';
import { Activity, ShieldCheck, HeartHandshake, Eye, Dna, Sparkles } from 'lucide-react';

export function ValuesGrid() {
  const values = [
    {
      icon: Activity,
      title: 'Clinical Diagnostic Rigor',
      description: 'We rely on multi-system biomarker panels, validated cardiovascular imaging, and evidence-based protocols to guide every clinical decision.',
    },
    {
      icon: Eye,
      title: 'Radical Transparency',
      description: 'Patients own their health data completely. We provide unencumbered access to raw lab metrics, physician reasoning, and itemized care roadmaps.',
    },
    {
      icon: HeartHandshake,
      title: 'Dedicated Physician Stewardship',
      description: 'Healthcare is a human relationship. We prioritize deep, unhurried consultations and long-term continuity with board-certified physicians.',
    },
    {
      icon: Dna,
      title: 'Personalized Bio-Individuality',
      description: 'No two biologies are identical. We tailor preventative interventions to each patient’s unique genetic predispositions, metabolism, and lifestyle.',
    },
    {
      icon: ShieldCheck,
      title: 'Confidential Data Protection',
      description: 'We uphold strict HIPAA standards and ISO-27001 certified encryption protocols to safeguard confidential patient health information.',
    },
    {
      icon: Sparkles,
      title: 'Holistic Healthspan Extension',
      description: 'We evaluate total wellness—optimizing cellular vitality, cardiovascular health, sleep architecture, and metabolic resilience for long-term healthspan.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-surface border-y border-border" aria-labelledby="values-heading">
      <Container>
        <SectionHeading
          badge="Guiding Principles"
          title="The Values That Shape Our Practice"
          subtitle="Every clinical assessment, consultation, and longevity protocol at Healix is grounded in these foundational commitments."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="p-8 bg-background border border-border rounded-healix-xl text-left space-y-4 shadow-soft-sm hover:border-primary/50 hover:shadow-soft-md transition-all duration-200 group"
              >
                <div className="w-12 h-12 rounded-healix-md bg-primary-light text-primary flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="font-heading font-bold text-lg text-[#075C49]">
                  {val.title}
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  {val.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
