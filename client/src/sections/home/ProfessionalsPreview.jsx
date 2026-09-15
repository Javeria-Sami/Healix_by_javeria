import React from 'react';
import { Link } from 'react-router-dom';
import { PROFESSIONALS } from '../../data/professionals.js';
import { ROUTES } from '../../constants/routes.js';
import { Container } from '../../components/common/Container.jsx';
import { SectionHeading } from '../../components/common/SectionHeading.jsx';
import { Button } from '../../components/common/Button.jsx';
import { Badge } from '../../components/common/Badge.jsx';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/cards/Card.jsx';
import { ArrowRight, UserCheck, Calendar } from 'lucide-react';

export function ProfessionalsPreview() {
  return (
    <section className="py-16 md:py-24 bg-background" aria-labelledby="professionals-preview-heading">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeading
            badge="Medical Leadership"
            title="Guided by Board-Certified Specialists"
            subtitle="Meet our preventative physicians dedicated to proactive diagnostics and personalized longevity roadmaps."
            align="left"
            className="mb-0"
          />
          <div className="flex-shrink-0">
            <Button to={ROUTES.PROFESSIONALS} variant="outline" size="md" iconTrailing={ArrowRight}>
              Meet the Full Team
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROFESSIONALS.map((doctor) => (
            <Card
              key={doctor.id}
              variant="elevated"
              hoverEffect
              className="flex flex-col justify-between text-left h-full group"
            >
              <div>
                {/* Doctor Avatar / Image Preview */}
                <div className="relative h-64 overflow-hidden rounded-t-healix-xl bg-surface-muted">
                  <img
                    src={doctor.avatar}
                    alt={`${doctor.name} - ${doctor.specialty}`}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge variant="success" size="sm" dot>
                      Verified Specialist
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
                  <div className="flex flex-wrap gap-1.5">
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
                  <span>View Bio</span>
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
