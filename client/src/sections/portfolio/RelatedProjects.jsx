import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/cards/Card.jsx';
import { Badge } from '../../components/common/Badge.jsx';
import { PROJECTS } from '../../data/projects.js';
import { ArrowRight, FolderKanban } from 'lucide-react';

export function RelatedProjects({ currentProjectId, relatedProjectIds }) {
  let related = [];
  if (relatedProjectIds && relatedProjectIds.length > 0) {
    related = PROJECTS.filter((p) => relatedProjectIds.includes(p.id) && p.id !== currentProjectId);
  } else {
    related = PROJECTS.filter((p) => p.id !== currentProjectId).slice(0, 2);
  }

  if (related.length === 0) return null;

  return (
    <section className="space-y-6 pt-6 border-t border-border/40">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FolderKanban className="w-5 h-5 text-primary" />
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#075A46]">
            Related Case Studies
          </h2>
        </div>
        <Link
          to="/portfolio"
          className="text-xs font-semibold text-primary hover:underline"
        >
          View All Case Studies
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {related.map((item) => (
          <Card
            key={item.id}
            className="p-6 border border-border bg-surface hover:border-primary/40 hover:shadow-soft-sm transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="primary">{item.category}</Badge>
                <span className="text-xs text-text-muted">{item.year}</span>
              </div>
              <h3 className="font-heading text-lg font-bold text-[#075A46] leading-snug">
                <Link to={`/portfolio/${item.slug}`} className="hover:text-primary transition-colors">
                  {item.title}
                </Link>
              </h3>
              <p className="text-xs text-text-secondary line-clamp-2">
                {item.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-border/40 mt-4 flex items-center justify-between">
              <span className="text-[11px] text-text-muted">{item.clientType}</span>
              <Link
                to={`/portfolio/${item.slug}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary-dark transition-colors"
              >
                <span>Read Case Study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
