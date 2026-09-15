import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes.js';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export function ResourceDetailCTA() {
  return (
    <section className="max-w-3xl mx-auto pt-8 pb-12 border-t border-neutral-100">
      <div className="bg-[#F1F8F4] border border-[#DCEBE4] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xs">
        <div className="space-y-1.5 text-center sm:text-left">
          <h2 className="font-heading text-lg sm:text-xl font-bold text-[#075B43]">
            Have Questions on These Clinical Markers?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-xl">
            Schedule a personalized diagnostic consultation to review your personal blood biomarkers with our preventative medical team.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 flex-shrink-0">
          <Link
            to={ROUTES.RESOURCES}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-700 text-xs font-bold transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Resources</span>
          </Link>
          <Link
            to={`${ROUTES.CONTACT}?type=Clinical%20Services%20Consultation`}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#075B43] hover:bg-[#064C38] text-white text-xs font-bold transition-all shadow-xs hover:shadow-sm"
          >
            <span>Schedule Clinical Review</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

