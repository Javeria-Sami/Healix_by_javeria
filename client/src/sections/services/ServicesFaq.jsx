import React from 'react';
import { PageContainer } from '../../layouts/PageContainer.jsx';
import { SectionHeading } from '../../components/common/SectionHeading.jsx';
import { Accordion } from '../../components/ui/Accordion.jsx';
import { FAQS } from '../../data/faqs.js';

export function ServicesFaq() {
  // Filter FAQs relevant to clinical services, consultations, and preparation
  const serviceFaqs = FAQS.slice(0, 4).map((faq) => ({
    id: faq.id,
    title: faq.question,
    content: (
      <div className="text-sm text-text-secondary leading-relaxed space-y-2">
        <p>{faq.answer}</p>
      </div>
    ),
  }));

  return (
    <section className="py-16 md:py-24 bg-surface border-b border-border/40">
      <PageContainer>
        <div className="max-w-3xl mx-auto">
          <SectionHeading
            badge="Common Questions"
            title="Frequently Asked Questions"
            subtitle="Understand how our clinical assessments, testing protocols, and physician consultations work."
            align="center"
            className="mb-12"
          />

          <Accordion items={serviceFaqs} allowMultiple={false} />
        </div>
      </PageContainer>
    </section>
  );
}
