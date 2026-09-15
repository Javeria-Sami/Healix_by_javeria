import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/cards/Card.jsx';
import { Button } from '../../components/common/Button.jsx';
import { ROUTES } from '../../constants/routes.js';
import { MessageSquare, Stethoscope, ArrowRight } from 'lucide-react';

export function FaqQuickContact() {
  return (
    <section className="max-w-3xl mx-auto pt-6">
      <Card className="p-8 sm:p-10 border border-border bg-surface text-center space-y-4 shadow-soft-sm">
        <div className="w-12 h-12 rounded-full bg-primary-light text-primary flex items-center justify-center mx-auto">
          <MessageSquare className="w-6 h-6" />
        </div>

        <div className="space-y-1">
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-text-primary">
            Still Have a Specific Clinical or Care Question?
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary max-w-lg mx-auto leading-relaxed">
            Our clinical concierge and care coordination team is available to discuss your specific medical requirements, 
            diagnostic panel selections, or corporate health initiatives.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to={ROUTES.CONTACT}>
            <Button variant="primary" size="md">
              <MessageSquare className="w-4 h-4 mr-1.5" />
              <span>Contact Clinical Concierge</span>
            </Button>
          </Link>
          <Link to={ROUTES.SERVICES}>
            <Button variant="outline" size="md">
              <Stethoscope className="w-4 h-4 mr-1.5" />
              <span>Explore Diagnostic Services</span>
            </Button>
          </Link>
        </div>
      </Card>
    </section>
  );
}
