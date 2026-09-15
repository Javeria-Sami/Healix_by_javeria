import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../../layouts/PageContainer.jsx';
import { Card } from '../../components/cards/Card.jsx';
import { Badge } from '../../components/common/Badge.jsx';
import { Button } from '../../components/common/Button.jsx';
import { EmptyState } from '../../components/common/EmptyState.jsx';
import { 
  ShieldCheck, 
  HeartPulse, 
  Activity, 
  Apple, 
  ArrowRight, 
  Clock, 
  Calendar,
  CheckCircle2,
  Stethoscope
} from 'lucide-react';

const ICON_MAP = {
  ShieldCheck,
  HeartPulse,
  Activity,
  Apple,
};

export function ServicesGrid({ services, activeCategory, onResetFilter }) {
  if (services.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-background">
        <PageContainer>
          <EmptyState
            title="No Services in this Specialization"
            description={`We currently do not have services categorized under "${activeCategory}". Try viewing all services.`}
            actionLabel="View All Services"
            onAction={onResetFilter}
          />
        </PageContainer>
      </section>
    );
  }

  return (
    <section 
      id="services-grid" 
      aria-label="Clinical Services List" 
      className="py-16 md:py-24 bg-background"
    >
      <PageContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = ICON_MAP[service.icon] || Stethoscope;

            return (
              <Card
                key={service.id}
                variant="default"
                hoverEffect
                className="flex flex-col justify-between border-border/80 group"
              >
                <div>
                  {/* Top Header: Icon & Category */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="w-12 h-12 rounded-healix-md bg-primary-light text-primary flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap justify-end">
                      <Badge variant="secondary">
                        {service.category}
                      </Badge>
                      {service.badge && (
                        <Badge variant={service.badge === 'Flagship' ? 'primary' : 'outline'}>
                          {service.badge}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h2 className="font-heading text-xl font-bold text-[#075C49] mb-2.5 group-hover:text-primary transition-colors">
                    <Link to={`/services/${service.slug}`} className="focus:outline-none focus-visible:underline">
                      {service.title}
                    </Link>
                  </h2>
                  <p className="text-text-secondary text-sm leading-relaxed mb-6 line-clamp-2">
                    {service.tagline}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2 mb-8 pt-2 border-t border-border/40">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted block mb-1">
                      Program Highlights
                    </span>
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-text-secondary">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Strip */}
                <div className="pt-5 border-t border-border/60 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-text-muted">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    <span>{service.duration}</span>
                  </div>

                  <Button
                    to={`/services/${service.slug}`}
                    variant="ghost"
                    size="sm"
                    className="group-hover:translate-x-1 transition-transform p-0 hover:bg-transparent text-primary hover:text-primary-dark font-semibold text-xs inline-flex items-center gap-1"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </PageContainer>
    </section>
  );
}
