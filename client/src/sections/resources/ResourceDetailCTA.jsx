import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/common/Button.jsx';
import { ROUTES } from '../../constants/routes.js';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export function ResourceDetailCTA() {
  return (
    <section className="max-w-3xl mx-auto pt-8 pb-12 border-t border-border/60">
      <div className="bg-surface border border-border rounded-healix-2xl p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-soft-sm">
        <div className="space-y-2 text-center sm:text-left">
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-text-primary">
            Have Questions on These Clinical Markers?
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary max-w-xl">
            Schedule a personalized diagnostic consultation to review your personal blood biomarkers with our preventative medical team.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link to={ROUTES.RESOURCES}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              <span>All Resources</span>
            </Button>
          </Link>
          <Link to={`${ROUTES.CONTACT}?type=Clinical%20Services%20Consultation`}>
            <Button variant="primary" size="sm">
              <span>Schedule Clinical Review</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
