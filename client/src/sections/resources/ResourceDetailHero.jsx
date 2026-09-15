import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from '../../components/common/Breadcrumb.jsx';
import { ROUTES } from '../../constants/routes.js';
import { Clock, Calendar, User, ArrowLeft } from 'lucide-react';

export function ResourceDetailHero({ article }) {
  const breadcrumbItems = [
    { label: 'Home', href: ROUTES.HOME },
    { label: 'Insights', href: ROUTES.RESOURCES },
    { label: article.title, active: true },
  ];

  return (
    <section className="relative pt-8 pb-10 sm:pt-10 sm:pb-12 bg-white border-b border-neutral-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation / Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Article Meta Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#F1F8F4] text-[#075B43] border border-[#DCEBE4] tracking-wide">
              {article.category}
            </span>
            <span className="text-neutral-300">•</span>
            <div className="flex items-center gap-1.5 text-neutral-500 font-medium">
              <Clock className="w-3.5 h-3.5 text-[#075B43]" />
              <span>{article.readTime}</span>
            </div>
            <span className="text-neutral-300">•</span>
            <div className="flex items-center gap-1.5 text-neutral-500 font-medium">
              <Calendar className="w-3.5 h-3.5 text-[#075B43]" />
              <span>{article.publishedDate}</span>
            </div>
          </div>

          <h1 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#075B43] tracking-tight leading-[1.18]">
            {article.title}
          </h1>

          {article.excerpt && (
            <p className="text-neutral-600 text-base sm:text-lg leading-relaxed max-w-3xl font-body">
              {article.excerpt}
            </p>
          )}

          {/* Author Strip */}
          <div className="pt-4 flex items-center justify-between gap-4 border-t border-neutral-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F1F8F4] border border-[#DCEBE4] text-[#075B43] flex items-center justify-center font-bold text-sm flex-shrink-0">
                <User className="w-5 h-5 stroke-[2]" />
              </div>
              <div>
                <div className="font-bold text-sm text-[#075B43]">
                  {article.authorSlug ? (
                    <Link to={`/professionals/${article.authorSlug}`} className="hover:text-[#0D7657] transition-colors">
                      {article.author}
                    </Link>
                  ) : (
                    article.author
                  )}
                </div>
                <div className="text-xs text-neutral-500">{article.authorRole || 'Clinical Specialist'}</div>
              </div>
            </div>

            <Link
              to={ROUTES.RESOURCES}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#075B43] hover:text-[#064C38] px-3 py-1.5 rounded-xl hover:bg-[#F1F8F4] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Articles</span>
            </Link>
          </div>
        </div>

        {/* Featured Visual */}
        {article.image && (
          <div className="mt-8 aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200/80 shadow-xs">
            <img
              src={article.image}
              alt={`Featured visual for ${article.title}`}
              className="w-full h-full object-cover select-none"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </section>
  );
}

