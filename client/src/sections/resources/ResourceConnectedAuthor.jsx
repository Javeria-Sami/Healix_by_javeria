import React from 'react';
import { Link } from 'react-router-dom';
import { PROFESSIONALS } from '../../data/professionals.js';
import { ArrowRight, Stethoscope } from 'lucide-react';

export function ResourceConnectedAuthor({ authorSlug, authorName, authorRole }) {
  const professional = PROFESSIONALS.find((p) => p.slug === authorSlug);

  return (
    <section className="max-w-3xl mx-auto pt-8 border-t border-neutral-100">
      <div className="p-6 sm:p-7 rounded-2xl border border-neutral-200/80 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-2xs hover:border-[#D8E7E0] transition-all">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-13 h-13 rounded-full bg-[#EAF4EF] border border-[#D8E7E0] text-[#075A46] flex items-center justify-center flex-shrink-0 text-xl font-bold overflow-hidden">
            {professional?.image ? (
              <img
                src={professional.image}
                alt={authorName}
                className="w-full h-full rounded-full object-cover"
                loading="lazy"
              />
            ) : (
              <Stethoscope className="w-6 h-6 stroke-[2]" />
            )}
          </div>
          <div className="space-y-0.5 text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#075A46]">
              Article Author & Clinical Lead
            </span>
            <h3 className="font-heading text-base sm:text-lg font-bold text-[#075A46]">
              {authorName}
            </h3>
            <p className="text-xs text-neutral-500">
              {authorRole || professional?.role || 'Medical Specialist'}
            </p>
          </div>
        </div>

        {authorSlug && (
          <Link
            to={`/professionals/${authorSlug}`}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-neutral-200 hover:border-[#075A46] text-neutral-800 hover:text-[#075A46] text-xs font-bold transition-colors w-full sm:w-auto"
          >
            <span>View Physician Bio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </section>
  );
}

