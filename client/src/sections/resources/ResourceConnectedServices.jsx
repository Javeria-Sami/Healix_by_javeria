import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../../data/services.js';
import { ArrowRight, Stethoscope } from 'lucide-react';

export function ResourceConnectedServices({ serviceSlugs }) {
  if (!serviceSlugs || serviceSlugs.length === 0) return null;

  const connectedServices = SERVICES.filter((s) => serviceSlugs.includes(s.slug));
  if (connectedServices.length === 0) return null;

  return (
    <section className="max-w-3xl mx-auto space-y-5 pt-8 border-t border-neutral-100">
      <div className="flex items-center gap-2">
        <Stethoscope className="w-5 h-5 text-[#075B43]" />
        <h2 className="font-heading text-lg sm:text-xl font-bold text-[#075B43]">
          Related Diagnostic Services & Programs
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {connectedServices.map((service) => (
          <div
            key={service.id}
            className="p-5 rounded-2xl border border-neutral-200/80 bg-white hover:border-[#075B43]/40 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div className="space-y-1.5 text-left">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#F1F8F4] text-[#075B43] text-[10px] font-bold uppercase tracking-wider">
                {service.category}
              </span>
              <h3 className="font-heading text-sm font-bold text-[#075B43] leading-snug">
                {service.title}
              </h3>
              <p className="text-xs text-neutral-500 line-clamp-2">
                {service.shortDescription || service.description}
              </p>
            </div>

            <div className="pt-3 border-t border-neutral-100 mt-4 text-left">
              <Link
                to={`/services/${service.slug}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#075B43] hover:text-[#064C38] transition-colors"
              >
                <span>Service Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

