import React from 'react';
import { Card } from '../../components/cards/Card.jsx';
import { ResourcesDisclaimer } from './ResourcesDisclaimer.jsx';
import { CheckCircle2, Sparkles, BookOpen } from 'lucide-react';

export function ResourceContentBody({ article }) {
  return (
    <article className="max-w-3xl mx-auto space-y-10">
      {/* 1. Key Takeaways Callout Box */}
      {article.keyTakeaways && article.keyTakeaways.length > 0 && (
        <Card className="p-6 sm:p-8 bg-primary-light/40 border border-primary/20 space-y-4">
          <div className="flex items-center gap-2 text-primary font-bold text-sm">
            <Sparkles className="w-4 h-4 flex-shrink-0" />
            <h2 className="font-heading uppercase tracking-wider text-xs">
              Key Clinical Takeaways
            </h2>
          </div>
          <div className="space-y-2.5">
            {article.keyTakeaways.map((takeaway, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-text-primary font-medium">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>{takeaway}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* 2. Structured Article Sections */}
      {article.sections && article.sections.length > 0 ? (
        <div className="space-y-8 text-text-secondary leading-relaxed">
          {article.sections.map((section, idx) => (
            <div key={idx} className="space-y-3">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-text-primary">
                {section.heading}
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-text-secondary">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-sm sm:text-base text-text-secondary leading-relaxed space-y-4">
          <p>{article.content || article.summary}</p>
        </div>
      )}

      {/* 3. Tags */}
      {article.tags && article.tags.length > 0 && (
        <div className="pt-6 border-t border-border flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-text-muted mr-1">Tags:</span>
          {article.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-xs bg-secondary text-text-primary px-3 py-1 rounded-healix-pill font-mono"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* 4. Embedded Healthcare Disclaimer */}
      <ResourcesDisclaimer />
    </article>
  );
}
