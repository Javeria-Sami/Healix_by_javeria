import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../../layouts/PageContainer.jsx';
import { SectionHeading } from '../../components/common/SectionHeading.jsx';
import { Card } from '../../components/cards/Card.jsx';
import { Badge } from '../../components/common/Badge.jsx';
import { ArrowRight, Calendar } from 'lucide-react';
import { PROFESSIONALS } from '../../data/professionals.js';

export function RelatedProfessionals({ currentId, relatedIds = [] }) {
  let related = PROFESSIONALS.filter((p) => relatedIds.includes(p.id) && p.id !== currentId);

  if (related.length === 0) {
    related = PROFESSIONALS.filter((p) => p.id !== currentId).slice(0, 3);
  }

  if (related.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-surface border-b border-border/40">
      <PageContainer>
        <SectionHeading
          badge="Multidisciplinary Team"
          title="Clinical Colleagues & Specialists"
          subtitle="Explore other board-certified specialists collaborating within the Healix clinical network."
          align="left"
          className="mb-12 max-w-3xl"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {related.map((prof) => (
            <Card
              key={prof.id}
              variant="default"
              hoverEffect
              className="p-0 overflow-hidden flex flex-col justify-between group border-border/70 bg-background"
            >
              <div>
                <div className="aspect-[4/3] w-full bg-secondary overflow-hidden relative">
                  <img
                    src={prof.avatar}
                    alt={prof.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="backdrop-blur-md bg-surface/90 text-[10px]">
                      {prof.department}
                    </Badge>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-heading text-lg font-bold text-[#075C49] mb-1 group-hover:text-primary transition-colors">
                    <Link to={`/professionals/${prof.slug}`} className="focus:outline-none focus-visible:underline">
                      {prof.name}
                    </Link>
                  </h3>
                  <p className="text-xs font-semibold text-primary mb-2">{prof.role}</p>
                  <p className="text-xs text-text-secondary line-clamp-2">{prof.shortBio}</p>
                </div>
              </div>

              <div className="p-6 pt-0 mt-auto">
                <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                  <span className="text-xs text-text-muted flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    {prof.availableDays}
                  </span>

                  <Link
                    to={`/professionals/${prof.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-dark transition-colors"
                  >
                    <span>View Bio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
