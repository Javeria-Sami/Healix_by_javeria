import React from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../../data/projects.js';
import { ROUTES } from '../../constants/routes.js';
import { Container } from '../../components/common/Container.jsx';
import { SectionHeading } from '../../components/common/SectionHeading.jsx';
import { Button } from '../../components/common/Button.jsx';
import { Badge } from '../../components/common/Badge.jsx';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/cards/Card.jsx';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export function PortfolioPreview() {
  return (
    <section className="py-16 md:py-24 bg-surface border-y border-border" aria-labelledby="portfolio-preview-heading">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeading
            badge="Clinical Case Studies"
            title="Demonstrated Healthcare Impact"
            subtitle="Explore how Healix preventative programs transform corporate workforce wellness and modernized clinical practice outcomes."
            align="left"
            className="mb-0"
          />
          <div className="flex-shrink-0">
            <Button to={ROUTES.PORTFOLIO} variant="outline" size="md" iconTrailing={ArrowRight}>
              View All Case Studies
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PROJECTS.map((project) => (
            <Card
              key={project.id}
              variant="elevated"
              hoverEffect
              className="flex flex-col justify-between text-left h-full group"
            >
              <div>
                <div className="relative h-60 overflow-hidden rounded-t-healix-xl bg-surface-muted">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="primary" size="sm">
                      {project.category}
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <div className="text-xs font-semibold text-primary mb-1">
                    {project.clientType}
                  </div>
                  <CardTitle className="text-xl">
                    <Link
                      to={`/portfolio/${project.slug}`}
                      className="hover:text-primary transition-colors focus:outline-none focus-visible:underline"
                    >
                      {project.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {project.summary}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3 pt-0">
                  <div className="bg-surface-muted p-4 rounded-healix-md space-y-2 text-xs">
                    <p className="font-semibold text-text-primary">Verified Outcomes:</p>
                    <ul className="space-y-1.5 text-text-secondary">
                      {project.outcomes.slice(0, 2).map((outcome, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </div>

              <CardFooter className="pt-4 border-t border-border flex items-center justify-between text-xs">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="text-[10px] text-text-muted bg-surface-muted px-2 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/portfolio/${project.slug}`}
                  className="inline-flex items-center gap-1 font-semibold text-primary hover:text-primary-dark transition-colors"
                >
                  <span>Read Case Study</span>
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
