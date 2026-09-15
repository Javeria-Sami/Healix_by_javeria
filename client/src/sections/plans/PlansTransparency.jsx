import React from 'react';
import { PageContainer } from '../../layouts/PageContainer.jsx';
import { SectionHeading } from '../../components/common/SectionHeading.jsx';
import { Card } from '../../components/cards/Card.jsx';
import { ShieldCheck, FileCheck, Award } from 'lucide-react';

const ASSURANCES = [
  {
    icon: ShieldCheck,
    title: 'Zero Hidden Charges',
    description: 'All diagnostic panels, scheduled doctor visits, and portal messaging are included in your clear, predictable membership fee. No surprise facility fees.',
  },
  {
    icon: FileCheck,
    title: 'HSA & FSA Eligible',
    description: 'Most diagnostic laboratory tests and clinical consultations qualify for tax-advantaged Health Savings and Flexible Spending Accounts with itemized receipts.',
  },
  {
    icon: Award,
    title: '30-Day Satisfaction Window',
    description: 'We stand behind our clinical stewardship. If Healix is not the right fit for your healthcare needs within the first 30 days, we provide a prorated refund.',
  },
];

export function PlansTransparency() {
  return (
    <section className="py-16 md:py-24 bg-surface border-b border-border/40">
      <PageContainer>
        <SectionHeading
          badge="Patient Transparency"
          title="Clear, Predictable Billing Standards"
          subtitle="We eliminate medical billing confusion with upfront fees, itemized reimbursement receipts, and direct physician access."
          align="center"
          className="mb-14"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ASSURANCES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card
                key={idx}
                variant="default"
                hoverEffect
                className="p-6 sm:p-8 bg-background flex flex-col justify-between border-border/70"
              >
                <div>
                  <div className="w-10 h-10 rounded-healix-md bg-primary-light text-primary flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="font-heading text-lg font-bold text-[#075B43] mb-3">
                    {item.title}
                  </h3>

                  <p className="text-sm text-text-secondary leading-relaxed">
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
