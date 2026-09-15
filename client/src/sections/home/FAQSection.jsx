import React from 'react';
import { Link } from 'react-router-dom';
import { FAQS } from '../../data/faqs.js';
import { ROUTES } from '../../constants/routes.js';
import { Container } from '../../components/common/Container.jsx';
import { SectionHeading } from '../../components/common/SectionHeading.jsx';
import { Button } from '../../components/common/Button.jsx';
import Accordion, { AccordionItem, AccordionTrigger, AccordionContent } from '../../components/ui/Accordion.jsx';
import { ArrowRight, HelpCircle } from 'lucide-react';

export function FAQSection() {
  return (
    <section className="py-16 md:py-24 bg-surface border-y border-border" aria-labelledby="faq-heading">
      <Container>
        <div className="max-w-3xl mx-auto">
          <SectionHeading
            badge="Common Questions"
            title="Frequently Asked Questions"
            subtitle="Answers to patient inquiries regarding preventative diagnostics, physician access, care plans, and health insurance."
            align="center"
          />

          <div className="mt-10">
            <Accordion type="single" defaultValue={FAQS[0]?.id}>
              {FAQS.filter((f) => f.isPriority).map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="bg-background">
                  <AccordionTrigger className="text-sm sm:text-base font-bold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                      {faq.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-text-secondary">
            <span>Have a specific clinical or billing question?</span>
            <Button to={ROUTES.FAQ} variant="outline" size="sm" iconTrailing={ArrowRight}>
              Visit Full FAQ Center
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
