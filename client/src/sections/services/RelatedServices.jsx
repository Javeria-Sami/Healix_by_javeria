import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../../layouts/PageContainer.jsx';
import { SectionHeading } from '../../components/common/SectionHeading.jsx';
import { Card } from '../../components/cards/Card.jsx';
import { Badge } from '../../components/common/Badge.jsx';
import { ArrowRight, Clock } from 'lucide-react';
import { SERVICES } from '../../data/services.js';

export function RelatedServices({ currentSlug, relatedSlugs = [] }) {
  // Find related services by slug, fallback to other services if list empty
  let related = SERVICES.filter((s) => relatedSlugs.includes(s.slug) && s.slug !== currentSlug);
  
  if (related.length === 0) {
    related = SERVICES.filter((s) => s.slug !== currentSlug).slice(0, 3);
  }

  if (related.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-background border-b border-border/40">
      <PageContainer>
        <SectionHeading
          badge="Complementary Care"
          title="Related Clinical Specializations"
          subtitle="Explore other targeted diagnostic and longevity programs designed to complement this protocol."
          align="left"
          className="mb-12 max-w-3xl"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {related.map((service) => (
            <Card
              key={service.id}
              variant="default"
              hoverEffect
              className="p-6 flex flex-col justify-between group border-border/70"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary">
                    {service.category}
                  </Badge>
                  {service.badge && (
                    <Badge variant="outline" className="text-[10px]">
                      {service.badge}
                    </Badge>
                  )}
                </div>

                <h3 className="font-heading text-lg font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">
                  <Link to={`/services/${service.slug}`} className="focus:outline-none focus-visible:underline">
                    {service.title}
                  </Link>
                </h3>

                <p className="text-xs text-text-secondary leading-relaxed mb-6 line-clamp-2">
                  {service.tagline}
                </p>
              </div>

              <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                <span className="text-xs text-text-muted flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  {service.duration}
                </span>

                <Link
                  to={`/services/${service.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-dark transition-colors"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
