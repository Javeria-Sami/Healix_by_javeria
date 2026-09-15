import React from 'react';
import { PageContainer } from '../../layouts/PageContainer.jsx';
import { SectionHeading } from '../../components/common/SectionHeading.jsx';
import { Card } from '../../components/cards/Card.jsx';
import { Award, Users, BookOpen, HeartHandshake } from 'lucide-react';

const STANDARDS = [
  {
    icon: Award,
    title: 'Board-Certified Excellence',
    description: 'Every physician and clinical specialist at Healix holds active board certifications and fellowship credentials in their respective sub-specialties.',
  },
  {
    icon: Users,
    title: 'Interdisciplinary Synthesis',
    description: 'Complex patient cases and multi-biomarker profiles are reviewed collaboratively across cardiology, endocrinology, and genomic disciplines.',
  },
  {
    icon: BookOpen,
    title: 'Evidence-Grounded Medicine',
    description: 'All diagnostic recommendations and longevity roadmaps are grounded in peer-reviewed clinical research rather than unverified lifestyle trends.',
  },
  {
    icon: HeartHandshake,
    title: 'Dedicated Physician Stewardship',
    description: 'Our clinicians prioritize unhurried consultation time, ensuring patients fully understand their health trajectory and action plans.',
  },
];

export function ProfessionalsStandards() {
  return (
    <section className="py-16 md:py-24 bg-surface border-b border-border/40">
      <PageContainer>
        <SectionHeading
          badge="Clinical Governance"
          title="Our Clinical Governance & Quality Standards"
          subtitle="How our medical leadership upholds rigorous diagnostic accuracy, ethical clinical practices, and patient-centered continuity."
          align="center"
          className="mb-14"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STANDARDS.map((std, idx) => {
            const Icon = std.icon;
            return (
              <Card
                key={idx}
                variant="default"
                hoverEffect
                className="p-6 bg-background flex flex-col justify-between border-border/70"
              >
                <div>
                  <div className="w-10 h-10 rounded-healix-md bg-primary-light text-primary flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="font-heading text-base font-bold text-[#075A46] mb-2">
                    {std.title}
                  </h3>

                  <p className="text-xs text-text-secondary leading-relaxed">
                    {std.description}
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
