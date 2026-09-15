import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/cards/Card.jsx';
import { Badge } from '../../components/common/Badge.jsx';
import { Button } from '../../components/common/Button.jsx';
import { EmptyState } from '../../components/common/EmptyState.jsx';
import { ArrowRight, Clock, Calendar, User, BookOpen } from 'lucide-react';

export function ResourcesGrid({ articles, onResetFilters }) {
  if (!articles || articles.length === 0) {
    return (
      <EmptyState
        icon={BookOpen}
        title="No Articles Located"
        description="We could not find any resources matching your selected category and search criteria."
        action={
          <Button variant="primary" size="sm" onClick={onResetFilters}>
            Reset All Filters
          </Button>
        }
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article) => (
        <Card
          key={article.id}
          className="flex flex-col justify-between overflow-hidden border border-border hover:border-primary/40 hover:shadow-soft-md transition-all duration-300 group"
        >
          <div>
            {/* Visual Header */}
            <div className="relative aspect-[16/10] w-full bg-secondary overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
              />
              <div className="absolute top-3 left-3">
                <Badge variant="primary">
                  {article.category}
                </Badge>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between text-xs text-text-muted">
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span>{article.readTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{article.publishedDate}</span>
                </div>
              </div>

              <h3 className="font-heading text-lg font-bold text-text-primary group-hover:text-primary transition-colors leading-snug line-clamp-2">
                <Link to={`/resources/${article.slug}`}>
                  {article.title}
                </Link>
              </h3>

              <p className="text-xs text-text-secondary leading-relaxed line-clamp-3">
                {article.excerpt}
              </p>
            </div>
          </div>

          {/* Card Footer */}
          <div className="p-6 pt-0 border-t border-border/40 mt-auto flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-text-muted font-medium truncate max-w-[60%]">
              <User className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              <span className="truncate">{article.author}</span>
            </div>

            <Link
              to={`/resources/${article.slug}`}
              className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary-dark transition-colors flex-shrink-0"
            >
              <span>Read Article</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </Card>
      ))}
    </div>
  );
}
