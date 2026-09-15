import React from 'react';
import { Link } from 'react-router-dom';
import { PROFESSIONALS } from '../../data/professionals.js';
import { ROUTES } from '../../constants/routes.js';
import { Container } from '../../components/common/Container.jsx';
import { SectionHeading } from '../../components/common/SectionHeading.jsx';
import { Button } from '../../components/common/Button.jsx';
import { Badge } from '../../components/common/Badge.jsx';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/cards/Card.jsx';
import { ArrowRight, Calendar, UserCheck } from 'lucide-react';

export function TeamSection() {
  return (
    <section className="py-16 md:py-24 bg-surface border-y border-border" aria-labelledby="team-heading">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeading
            badge="Medical Specialists"
            title="Clinical Leadership & Advisory"
            subtitle="Our clinical team comprises board-certified physicians specializing in preventative cardiology, metabolic endocrinology, and longevity medicine."
            align="left"
            className="mb-0"
          />
          <div className="flex-shrink-0">
            <Button to={ROUTES.PROFESSIONALS} variant="outline" size="md" iconTrailing={ArrowRight}>
              View All Credentials
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROFESSIONALS.map((doctor) => (
            <Card
              key={doctor.id}
              variant="elevated"
              hoverEffect
              className="flex flex-col justify-between text-left h-full group bg-background"
            >
              <div>
                <div className="relative h-64 overflow-hidden rounded-t-healix-xl bg-surface-muted">
                  <img
                    src={doctor.avatar}
                    alt={`${doctor.name} - ${doctor.specialty}`}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge variant="success" size="sm" dot>
                      Board Certified
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-lg">
                    <Link
                      to={`/professionals/${doctor.slug}`}
                      className="hover:text-primary transition-colors focus:outline-none focus-visible:underline"
                    >
                      {doctor.name}
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-primary font-medium text-xs">
                    {doctor.specialty}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3 pt-0">
                  <p className="text-xs text-text-secondary line-clamp-2">
                    {doctor.bio}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {doctor.focusAreas.slice(0, 3).map((focus, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-healix-sm bg-surface-muted text-text-secondary text-[11px]"
                      >
                        {focus}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </div>

              <CardFooter className="pt-4 border-t border-border flex items-center justify-between text-xs">
                <span className="text-text-muted flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                  <span>{doctor.availableDays}</span>
                </span>
                <Link
                  to={`/professionals/${doctor.slug}`}
                  className="inline-flex items-center gap-1 font-semibold text-primary hover:text-primary-dark transition-colors"
                >
                  <span>Full Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
