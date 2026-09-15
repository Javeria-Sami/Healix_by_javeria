import React from 'react';
import { Link } from 'react-router-dom';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../../components/ui/Accordion.jsx';
import { Badge } from '../../components/common/Badge.jsx';
import { Button } from '../../components/common/Button.jsx';
import { EmptyState } from '../../components/common/EmptyState.jsx';
import { HelpCircle, ArrowRight } from 'lucide-react';

export function FaqAccordionList({ faqs, onResetFilters }) {
  if (!faqs || faqs.length === 0) {
    return (
      <EmptyState
        icon={HelpCircle}
        title="No Questions Located"
        description="We could not locate any frequently asked questions matching your search and category filter."
        action={
          <Button variant="primary" size="sm" onClick={onResetFilters}>
            Reset All Filters
          </Button>
        }
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <Accordion type="single" defaultValue={faqs[0]?.id}>
        {faqs.map((faq) => (
          <AccordionItem key={faq.id} value={faq.id} className="bg-surface border border-border">
            <AccordionTrigger className="text-left font-heading font-bold text-base sm:text-lg text-text-primary">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-left">
                <span>{faq.question}</span>
              </div>
            </AccordionTrigger>

            <AccordionContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="primary" size="sm">
                    {faq.category}
                  </Badge>
                </div>

                <p className="text-sm text-text-secondary leading-relaxed">
                  {faq.answer}
                </p>

                {faq.relatedLink && (
                  <div className="pt-3 border-t border-border/40">
                    <Link
                      to={faq.relatedLink.url}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-dark transition-colors"
                    >
                      <span>{faq.relatedLink.text}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
