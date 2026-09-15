import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../../data/services.js';
import { ROUTES } from '../../constants/routes.js';
import { Container } from '../../components/common/Container.jsx';
import { SectionHeading } from '../../components/common/SectionHeading.jsx';
import { Badge } from '../../components/common/Badge.jsx';
import { Button } from '../../components/common/Button.jsx';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/cards/Card.jsx';
import { ShieldCheck, HeartPulse, Activity, Apple, ArrowRight, Check } from 'lucide-react';

const iconMap = {
  ShieldCheck,
  HeartPulse,
  Activity,
  Apple,
};

export function ServicesPreview() {
  return (
    <section className="py-16 md:py-24 bg-background" aria-labelledby="services-preview-heading">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeading
            badge="Clinical Specializations"
            title="Comprehensive Care Tailored to Your Biology"
            subtitle="Explore our multi-disciplinary preventative programs designed to optimize cardiovascular vitality, metabolic resilience, and long-term healthspan."
            align="left"
            className="mb-0"
          />
          <div className="flex-shrink-0">
            <Button to={ROUTES.SERVICES} variant="outline" size="md" iconTrailing={ArrowRight}>
              View All Services
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.slice(0, 4).map((service) => {
            const IconComponent = iconMap[service.icon] || ShieldCheck;
            return (
              <Card
                key={service.id}
                variant="elevated"
                hoverEffect
                className="flex flex-col justify-between text-left h-full group"
              >
                <div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-healix-md bg-primary-light text-primary flex items-center justify-center group-hover:scale-105 transition-transform">
                        <IconComponent className="w-6 h-6" aria-hidden="true" />
                      </div>
                      <Badge variant="default" size="sm">
                        {service.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">
                      <Link to={`/services/${service.slug}`} className="hover:text-primary transition-colors focus:outline-none focus-visible:underline">
                        {service.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {service.tagline}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-3 pt-2">
                    <ul className="space-y-2 text-xs text-text-secondary">
                      {service.features.slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </div>

                <CardFooter className="pt-4 border-t border-border flex items-center justify-between text-xs">
                  <span className="text-text-muted font-medium">{service.duration}</span>
                  <Link
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1 font-semibold text-primary hover:text-primary-dark transition-colors"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
