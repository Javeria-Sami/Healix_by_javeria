import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes.js';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export function ResourceDetailCTA() {
  return (
    <section className="max-w-3xl mx-auto pt-8 pb-12 border-t border-neutral-100">
      <div className="bg-[#F5F8F6] border border-[#DCE8E3] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xs">
        <div className="space-y-1.5 text-center sm:text-left">
          <h2 className="font-heading text-lg sm:text-xl font-bold text-neutral-900">
            Have Questions on These Clinical Markers?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-xl">
            Schedule a personalized diagnostic consultation to review your personal blood biomarkers with our preventative medical team.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 flex-shrink-0">
          <Link
            to={ROUTES.RESOURCES}
            className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full border border-[#DCE8E3] bg-white hover:bg-[#F5F8F6] text-[#075C49] text-xs sm:text-sm font-bold transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Resources</span>
          </Link>
          <Link
            to={`${ROUTES.CONTACT}?type=Clinical%20Services%20Consultation`}
            className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-[#8FD21F] hover:bg-[#7CB919] text-[#10231E] text-xs sm:text-sm font-bold transition-all shadow-soft-sm hover:shadow-soft-md hover:-translate-y-0.5"
          >
            <span>Schedule Clinical Review</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#10231E]" />
          </Link>
        </div>
      </div>
    </section>
  );
}

