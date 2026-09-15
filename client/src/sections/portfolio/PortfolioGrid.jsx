import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/cards/Card.jsx';
import { Badge } from '../../components/common/Badge.jsx';
import { Button } from '../../components/common/Button.jsx';
import { EmptyState } from '../../components/common/EmptyState.jsx';
import { ArrowRight, CheckCircle2, Building2, Calendar, FolderSearch } from 'lucide-react';

export function PortfolioGrid({ projects, onResetFilters }) {
  if (!projects || projects.length === 0) {
    return (
      <EmptyState
        icon={FolderSearch}
        title="No Case Studies Found"
        description="We couldn't find any case studies matching your selected category and search criteria."
        action={
          <Button variant="primary" size="sm" onClick={onResetFilters}>
            Reset All Filters
          </Button>
        }
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {projects.map((project) => (
        <Card
          key={project.id}
          className="flex flex-col justify-between overflow-hidden border border-border hover:border-primary/40 hover:shadow-soft-md transition-all duration-300 group"
        >
          <div>
            {/* Visual Header */}
            <div className="relative aspect-[16/9] w-full bg-secondary overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
              />
              <div className="absolute top-3 left-3">
                <Badge variant="primary">
                  {project.category}
                </Badge>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between text-xs text-text-muted">
                <div className="flex items-center gap-1.5 truncate max-w-[70%]">
                  <Building2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span className="truncate">{project.clientType}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{project.year}</span>
                </div>
              </div>

              <h3 className="font-heading text-xl font-bold text-[#075B43] group-hover:text-primary transition-colors leading-snug">
                <Link to={`/portfolio/${project.slug}`}>
                  {project.title}
                </Link>
              </h3>

              <p className="text-xs text-text-secondary leading-relaxed line-clamp-3">
                {project.summary}
              </p>

              {/* Key Outcomes */}
              <div className="space-y-1.5 pt-2">
                {project.outcomes.slice(0, 2).map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs font-medium text-text-primary">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card Footer */}
          <div className="p-6 sm:p-8 pt-0 border-t border-border/40 mt-auto flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {project.tags.slice(0, 2).map((tag, idx) => (
                <span key={idx} className="text-[10px] bg-secondary text-text-muted px-2 py-0.5 rounded font-mono">
                  #{tag}
                </span>
              ))}
            </div>

            <Link
              to={`/portfolio/${project.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-dark transition-colors"
            >
              <span>View Case Study</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </Card>
      ))}
    </div>
  );
}
