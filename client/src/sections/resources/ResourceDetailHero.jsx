import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from '../../components/common/Breadcrumb.jsx';
import { Badge } from '../../components/common/Badge.jsx';
import { ROUTES } from '../../constants/routes.js';
import { Clock, Calendar, User, ArrowLeft, Share2 } from 'lucide-react';

export function ResourceDetailHero({ article }) {
  const breadcrumbItems = [
    { label: 'Home', href: ROUTES.HOME },
    { label: 'Resources', href: ROUTES.RESOURCES },
    { label: article.title, active: true },
  ];

  return (
    <section className="relative pt-8 pb-10 md:pt-12 md:pb-14 bg-gradient-to-b from-surface via-background to-background border-b border-border/40">
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="primary" dot>
            {article.category}
          </Badge>
          <div className="flex items-center gap-1.5 text-xs text-text-muted font-medium">
            <Clock className="w-3.5 h-3.5 text-primary" />
            <span>{article.readTime}</span>
          </div>
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tracking-tight leading-[1.2]">
          {article.title}
        </h1>

        <p className="text-text-secondary text-base sm:text-lg lg:text-xl leading-relaxed">
          {article.excerpt}
        </p>

        {/* Article Author & Publication Strip */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-border/60 text-xs text-text-muted">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-text-primary">
                {article.authorSlug ? (
                  <Link to={`/professionals/${article.authorSlug}`} className="hover:text-primary transition-colors">
                    {article.author}
                  </Link>
                ) : (
                  article.author
                )}
              </div>
              <div className="text-[11px] text-text-muted">{article.authorRole || 'Clinical Specialist'}</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{article.publishedDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Article Image */}
      <div className="max-w-4xl mx-auto mt-8 aspect-[21/9] rounded-healix-2xl overflow-hidden bg-secondary border border-border shadow-soft-md">
        <img
          src={article.image}
          alt={`Featured visual for ${article.title}`}
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
