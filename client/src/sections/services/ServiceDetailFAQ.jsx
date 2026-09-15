import React from 'react';
import { PageContainer } from '../../layouts/PageContainer.jsx';
import { SectionHeading } from '../../components/common/SectionHeading.jsx';
import { Accordion } from '../../components/ui/Accordion.jsx';

export function ServiceDetailFAQ({ faqs = [] }) {
  if (!faqs || faqs.length === 0) return null;

  const accordionItems = faqs.map((faq, idx) => ({
    id: `service-faq-${idx}`,
    title: faq.question,
    content: (
      <div className="text-sm text-text-secondary leading-relaxed">
        <p>{faq.answer}</p>
      </div>
    ),
  }));

  return (
    <section className="py-16 md:py-24 bg-surface border-b border-border/40">
      <PageContainer>
        <div className="max-w-3xl mx-auto">
          <SectionHeading
            badge="Specific Questions"
            title="Service FAQs"
            subtitle="Common questions regarding preparation, clinical delivery, and post-consultation reports."
            align="center"
            className="mb-12"
          />

          <Accordion items={accordionItems} allowMultiple={false} />
        </div>
      </PageContainer>
    </section>
  );
}
