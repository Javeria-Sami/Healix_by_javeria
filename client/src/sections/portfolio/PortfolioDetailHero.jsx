import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from '../../components/common/Breadcrumb.jsx';
import { Badge } from '../../components/common/Badge.jsx';
import { Button } from '../../components/common/Button.jsx';
import { ROUTES } from '../../constants/routes.js';
import { Building2, Calendar, Stethoscope, ArrowRight, ShieldCheck } from 'lucide-react';

export function PortfolioDetailHero({ project }) {
  const breadcrumbItems = [
    { label: 'Home', href: ROUTES.HOME },
    { label: 'Portfolio', href: ROUTES.PORTFOLIO },
    { label: project.title, active: true },
  ];

  return (
    <section className="relative pt-8 pb-12 md:pt-12 md:pb-16 bg-gradient-to-b from-surface via-background to-background border-b border-border/40">
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <div className="max-w-4xl space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="primary" dot>
            {project.category}
          </Badge>
          <div className="flex items-center gap-1.5 text-xs text-text-muted font-medium">
            <Calendar className="w-3.5 h-3.5" />
            <span>{project.year}</span>
          </div>
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#075C49] tracking-tight leading-[1.2]">
          {project.title}
        </h1>

        <p className="text-text-secondary text-base sm:text-lg lg:text-xl leading-relaxed">
          {project.tagline || project.summary}
        </p>

        {/* Project Meta Bar */}
        <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-border/60">
          <div className="p-3.5 rounded-healix-md bg-surface border border-border">
            <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider block mb-1">
              Client Profile
            </span>
            <span className="text-xs font-bold text-[#075C49] flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              {project.clientType}
            </span>
          </div>

          <div className="p-3.5 rounded-healix-md bg-surface border border-border">
            <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider block mb-1">
              Clinical Discipline
            </span>
            <span className="text-xs font-bold text-[#075C49] flex items-center gap-1.5">
              <Stethoscope className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              {project.category}
            </span>
          </div>

          <div className="p-3.5 rounded-healix-md bg-surface border border-border">
            <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider block mb-1">
              Governance Protocol
            </span>
            <span className="text-xs font-bold text-[#075C49] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              Board-Certified Oversight
            </span>
          </div>
        </div>
      </div>

      {/* Featured Primary Visual Container */}
      <div className="mt-10 aspect-[21/9] rounded-healix-2xl overflow-hidden bg-secondary border border-border shadow-soft-md">
        <img
          src={project.image}
          alt={`Visual documentation for ${project.title}`}
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
