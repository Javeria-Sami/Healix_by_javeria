import React from 'react';
import { PageContainer } from '../../layouts/PageContainer.jsx';
import { SectionHeading } from '../../components/common/SectionHeading.jsx';
import { Card } from '../../components/cards/Card.jsx';
import { CheckSquare, Activity, Stethoscope, RefreshCw } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    icon: CheckSquare,
    title: 'Select Your Tier',
    description: 'Choose the care membership that matches your health objectives, whether foundational annual prevention or continuous biomarker monitoring.',
  },
  {
    step: '02',
    icon: Activity,
    title: 'Baseline Diagnostic Audit',
    description: 'Complete your comprehensive fasting biomarker panels, resting ECG, and metabolic baseline at our private clinical facility.',
  },
  {
    step: '03',
    icon: Stethoscope,
    title: 'Physician Strategy',
    description: 'Review findings with your dedicated physician during an unhurried consultation to establish a quantified healthspan roadmap.',
  },
  {
    step: '04',
    icon: RefreshCw,
    title: 'Proactive Continuity',
    description: 'Track ongoing biomarker trends, access your care concierge, and participate in scheduled quarterly reviews to calibrate your plan.',
  },
];

export function PlansHowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-background border-b border-border/40">
      <PageContainer>
        <SectionHeading
          badge="Care Experience"
          title="How Membership Care Works"
          subtitle="A structured, four-step clinical pathway ensuring continuous diagnostic precision and personalized healthcare stewardship."
          align="center"
          className="mb-14"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card
                key={idx}
                variant="default"
                hoverEffect
                className="p-6 flex flex-col justify-between border-border/70 relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-black text-primary/30">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-healix-md bg-primary-light text-primary flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-heading text-base font-bold text-[#075A46] mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-text-secondary leading-relaxed">
                    {item.description}
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
