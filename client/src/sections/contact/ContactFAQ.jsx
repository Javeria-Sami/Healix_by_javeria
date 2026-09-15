import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/cards/Card.jsx';
import { ROUTES } from '../../constants/routes.js';
import { HelpCircle, ArrowRight } from 'lucide-react';

const CONTACT_FAQS = [
  {
    q: 'How soon can I expect a response to my consultation request?',
    a: 'Our clinical intake coordinators review submissions during business hours and respond within one business day via your preferred contact channel.',
  },
  {
    q: 'Can I request an appointment with a specific physician?',
    a: 'Yes. You may specify your preferred clinician (such as Dr. Elena Vance or Dr. Marcus Chen) in your message notes or during your intake phone call.',
  },
  {
    q: 'Are introductory phone consultations complimentary?',
    a: 'Yes. Our clinical care coordinators provide an initial 15-minute introductory call to understand your health objectives and help you select the appropriate diagnostic assessment or membership tier.',
  },
];

export function ContactFAQ() {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-primary" />
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-text-primary">
            Frequently Asked Inquiries
          </h2>
        </div>
        <Link to={ROUTES.FAQ} className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
          <span>View All FAQs</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CONTACT_FAQS.map((item, idx) => (
          <Card key={idx} className="p-6 border border-border bg-surface space-y-2">
            <h3 className="font-heading text-sm font-bold text-text-primary leading-snug">
              {item.q}
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              {item.a}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
