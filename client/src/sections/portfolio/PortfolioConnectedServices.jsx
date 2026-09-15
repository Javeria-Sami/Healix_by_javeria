import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/cards/Card.jsx';
import { SERVICES } from '../../data/services.js';
import { ArrowRight, Stethoscope } from 'lucide-react';

export function PortfolioConnectedServices({ serviceSlugs }) {
  if (!serviceSlugs || serviceSlugs.length === 0) return null;

  const connectedServices = SERVICES.filter((s) => serviceSlugs.includes(s.slug));

  if (connectedServices.length === 0) return null;

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <Stethoscope className="w-5 h-5 text-primary" />
        <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#075A46]">
          Connected Clinical Services
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {connectedServices.map((service) => (
          <Card
            key={service.id}
            className="p-5 border border-border bg-surface hover:border-primary/40 hover:shadow-soft-sm transition-all flex flex-col justify-between"
          >
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                {service.category}
              </span>
              <h3 className="font-heading text-sm font-bold text-[#075A46] leading-snug">
                {service.title}
              </h3>
              <p className="text-xs text-text-secondary line-clamp-2">
                {service.shortDescription || service.description}
              </p>
            </div>

            <div className="pt-4 border-t border-border/40 mt-4">
              <Link
                to={`/services/${service.slug}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary-dark transition-colors"
              >
                <span>Service Details</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
