import React from 'react';
import { Link } from 'react-router-dom';
import { ARTICLES } from '../../data/articles.js';
import { ROUTES } from '../../constants/routes.js';
import { Container } from '../../components/common/Container.jsx';
import { SectionHeading } from '../../components/common/SectionHeading.jsx';
import { Button } from '../../components/common/Button.jsx';
import { Badge } from '../../components/common/Badge.jsx';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/cards/Card.jsx';
import { ArrowRight, Clock, User } from 'lucide-react';

export function ResourcesPreview() {
  return (
    <section className="py-16 md:py-24 bg-background" aria-labelledby="resources-preview-heading">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeading
            badge="Medical Insights & Research"
            title="Evidence-Based Health Literacy"
            subtitle="Clinical perspectives and deep dives into cardiovascular diagnostics, metabolic medicine, and proactive lifestyle protocols."
            align="left"
            className="mb-0"
          />
          <div className="flex-shrink-0">
            <Button to={ROUTES.RESOURCES} variant="outline" size="md" iconTrailing={ArrowRight}>
              Explore All Articles
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((article) => (
            <Card
              key={article.id}
              variant="elevated"
              hoverEffect
              className="flex flex-col justify-between text-left h-full group"
            >
              <div>
                <div className="relative h-48 overflow-hidden rounded-t-healix-xl bg-surface-muted">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="primary" size="sm">
                      {article.category}
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <div className="flex items-center gap-3 text-xs text-text-muted mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                      <span>{article.readTime}</span>
                    </span>
                    <span>•</span>
                    <span>{article.publishedDate}</span>
                  </div>

                  <CardTitle className="text-lg line-clamp-2">
                    <Link
                      to={`/resources/${article.slug}`}
                      className="hover:text-primary transition-colors focus:outline-none focus-visible:underline"
                    >
                      {article.title}
                    </Link>
                  </CardTitle>

                  <CardDescription className="line-clamp-2 mt-2">
                    {article.excerpt}
                  </CardDescription>
                </CardHeader>
              </div>

              <CardFooter className="pt-4 border-t border-border flex items-center justify-between text-xs">
                <span className="text-text-muted flex items-center gap-1 font-medium">
                  <User className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                  <span>{article.author}</span>
                </span>
                <Link
                  to={`/resources/${article.slug}`}
                  className="inline-flex items-center gap-1 font-semibold text-primary hover:text-primary-dark transition-colors"
                >
                  <span>Read</span>
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
