import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../../layouts/PageContainer.jsx';
import { Card } from '../../components/cards/Card.jsx';
import { Badge } from '../../components/common/Badge.jsx';
import { Button } from '../../components/common/Button.jsx';
import { EmptyState } from '../../components/common/EmptyState.jsx';
import { ArrowRight, Calendar, Stethoscope, CheckCircle2 } from 'lucide-react';

export function ProfessionalsGrid({ professionals, activeDepartment, onResetFilter }) {
  if (professionals.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-background">
        <PageContainer>
          <EmptyState
            title="No Clinicians in this Specialty"
            description={`We currently do not have clinicians listed under "${activeDepartment}". Try viewing all specialties.`}
            actionLabel="View All Specialties"
            onAction={onResetFilter}
          />
        </PageContainer>
      </section>
    );
  }

  return (
    <section 
      id="professionals-grid" 
      aria-label="Medical Leadership List" 
      className="py-16 md:py-24 bg-background"
    >
      <PageContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {professionals.map((prof) => (
            <Card
              key={prof.id}
              variant="default"
              hoverEffect
              className="flex flex-col justify-between overflow-hidden group border-border/80 p-0"
            >
              <div>
                {/* Avatar with Department & Experience Badges */}
                <div className="aspect-[4/3] w-full bg-secondary overflow-hidden relative">
                  <img
                    src={prof.avatar}
                    alt={prof.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="backdrop-blur-md bg-surface/90 text-[10px] font-semibold">
                      {prof.department}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3 bg-surface/90 backdrop-blur-md text-[10px] font-semibold text-text-primary px-2.5 py-1 rounded-full border border-border">
                    {prof.experienceYears}+ Yrs Exp
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="font-heading text-lg font-bold text-text-primary mb-1 group-hover:text-primary transition-colors">
                    <Link to={`/professionals/${prof.slug}`} className="focus:outline-none focus-visible:underline">
                      {prof.name}
                    </Link>
                  </h2>
                  <p className="text-xs font-semibold text-primary mb-1">
                    {prof.role}
                  </p>
                  <p className="text-[11px] text-text-muted mb-4">
                    {prof.specialty}
                  </p>

                  <p className="text-xs text-text-secondary leading-relaxed line-clamp-2 mb-4">
                    {prof.shortBio}
                  </p>

                  {/* Focus Area Tags */}
                  <div className="space-y-1.5 pt-3 border-t border-border/40">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted block mb-1">
                      Clinical Focus
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {prof.focusAreas.slice(0, 2).map((area, idx) => (
                        <span 
                          key={idx} 
                          className="text-[10px] px-2 py-0.5 rounded-healix-sm bg-secondary text-text-secondary font-medium line-clamp-1"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 pt-0 mt-auto">
                <div className="pt-4 border-t border-border/60 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-text-muted flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-primary" /> 
                    {prof.availableDays}
                  </span>

                  <Button
                    to={`/professionals/${prof.slug}`}
                    variant="ghost"
                    size="sm"
                    className="group-hover:translate-x-1 transition-transform p-0 hover:bg-transparent text-primary hover:text-primary-dark font-semibold text-xs inline-flex items-center gap-1"
                  >
                    <span>View Bio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
