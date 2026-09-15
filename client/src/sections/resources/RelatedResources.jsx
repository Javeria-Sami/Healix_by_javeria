import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/cards/Card.jsx';
import { Badge } from '../../components/common/Badge.jsx';
import { ARTICLES } from '../../data/articles.js';
import { ArrowRight, Clock, BookOpen } from 'lucide-react';

export function RelatedResources({ currentArticleId, relatedArticleIds }) {
  let related = [];
  if (relatedArticleIds && relatedArticleIds.length > 0) {
    related = ARTICLES.filter((a) => relatedArticleIds.includes(a.id) && a.id !== currentArticleId);
  } else {
    related = ARTICLES.filter((a) => a.id !== currentArticleId).slice(0, 2);
  }

  if (related.length === 0) return null;

  return (
    <section className="max-w-3xl mx-auto space-y-6 pt-6 border-t border-border/40">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-text-primary">
            Related Clinical Articles & Insights
          </h2>
        </div>
        <Link
          to="/resources"
          className="text-xs font-semibold text-primary hover:underline"
        >
          View All Resources
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {related.map((item) => (
          <Card
            key={item.id}
            className="p-6 border border-border bg-surface hover:border-primary/40 hover:shadow-soft-sm transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="primary">{item.category}</Badge>
                <span className="text-xs text-text-muted flex items-center gap-1">
                  <Clock className="w-3 h-3 text-primary" />
                  {item.readTime}
                </span>
              </div>
              <h3 className="font-heading text-base font-bold text-text-primary leading-snug">
                <Link to={`/resources/${item.slug}`} className="hover:text-primary transition-colors">
                  {item.title}
                </Link>
              </h3>
              <p className="text-xs text-text-secondary line-clamp-2">
                {item.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-border/40 mt-4 flex items-center justify-between">
              <span className="text-[11px] text-text-muted truncate max-w-[60%]">{item.author}</span>
              <Link
                to={`/resources/${item.slug}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary-dark transition-colors flex-shrink-0"
              >
                <span>Read Review</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
