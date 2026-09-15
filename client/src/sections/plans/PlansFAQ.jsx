import React from 'react';
import { PageContainer } from '../../layouts/PageContainer.jsx';
import { SectionHeading } from '../../components/common/SectionHeading.jsx';
import { Accordion } from '../../components/ui/Accordion.jsx';
import { PLANS_FAQS } from '../../data/plans.js';

export function PlansFAQ() {
  const accordionItems = PLANS_FAQS.map((faq) => ({
    id: faq.id,
    title: faq.question,
    content: (
      <div className="text-sm text-text-secondary leading-relaxed space-y-2">
        <p>{faq.answer}</p>
      </div>
    ),
  }));

  return (
    <section className="py-16 md:py-24 bg-background border-b border-border/40">
      <PageContainer>
        <div className="max-w-3xl mx-auto">
          <SectionHeading
            badge="Common Questions"
            title="Membership & Pricing FAQs"
            subtitle="Understand billing intervals, insurance superbills, plan upgrades, and corporate executive options."
            align="center"
            className="mb-12"
          />

          <Accordion items={accordionItems} allowMultiple={false} />
        </div>
      </PageContainer>
    </section>
  );
}
