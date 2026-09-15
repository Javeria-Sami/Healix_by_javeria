import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../../components/common/Badge.jsx';
import { Button } from '../../components/common/Button.jsx';
import { ArrowRight, Clock, Calendar, Sparkles, User, CheckCircle2 } from 'lucide-react';

export function FeaturedResource({ article }) {
  if (!article) return null;

  return (
    <div className="relative bg-surface border-2 border-primary/20 rounded-healix-2xl overflow-hidden shadow-soft-lg hover:border-primary/40 transition-all duration-300">
      <div className="absolute top-4 right-4 z-10">
        <Badge variant="primary" dot>
          <Sparkles className="w-3 h-3 mr-1 inline" />
          Featured Clinical Review
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Editorial Visual */}
        <div className="lg:col-span-6 relative aspect-[16/10] lg:aspect-auto min-h-[300px] lg:min-h-[400px] bg-secondary overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
          <div className="absolute bottom-4 left-4 right-4 lg:hidden text-white">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-light">
              {article.category}
            </span>
            <h2 className="text-lg font-bold font-heading">{article.title}</h2>
          </div>
        </div>

        {/* Narrative & Excerpt */}
        <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="hidden lg:flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-primary px-2.5 py-1 rounded bg-primary-light">
                {article.category}
              </span>
              <div className="flex items-center gap-1 text-xs text-text-muted">
                <Clock className="w-3.5 h-3.5" />
                <span>{article.readTime}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-text-muted">
              <div className="flex items-center gap-1.5 font-semibold text-text-primary">
                <User className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                <span>{article.author}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{article.publishedDate}</span>
              </div>
            </div>

            <h2 className="hidden lg:block font-heading text-2xl lg:text-3xl font-extrabold text-text-primary leading-snug">
              {article.title}
            </h2>

            <p className="text-sm text-text-secondary leading-relaxed">
              {article.summary || article.excerpt}
            </p>

            {/* Key Takeaways */}
            {article.keyTakeaways && article.keyTakeaways.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-border/40">
                <span className="text-xs font-semibold text-text-primary uppercase tracking-wide">
                  Clinical Highlights
                </span>
                {article.keyTakeaways.slice(0, 2).map((takeaway, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-text-secondary font-medium">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1.5">
              {article.tags.slice(0, 3).map((tag, idx) => (
                <span key={idx} className="text-[11px] bg-secondary text-text-muted px-2 py-0.5 rounded font-mono">
                  #{tag}
                </span>
              ))}
            </div>

            <Link to={`/resources/${article.slug}`}>
              <Button variant="primary" size="sm" className="w-full sm:w-auto">
                <span>Read Full Review</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
