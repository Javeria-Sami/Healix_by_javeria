import React from 'react';
import { Link } from 'react-router-dom';
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
    <section className="max-w-3xl mx-auto space-y-5 pt-8 border-t border-neutral-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#075B43]" />
          <h2 className="font-heading text-lg sm:text-xl font-bold text-[#075B43]">
            Related Clinical Articles & Insights
          </h2>
        </div>
        <Link
          to="/resources"
          className="text-xs font-bold text-[#075B43] hover:text-[#064C38] hover:underline"
        >
          View All Resources
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {related.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl border border-neutral-200/80 bg-white hover:border-[#075B43]/40 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div className="space-y-2 text-left">
              <div className="flex items-center justify-between text-xs">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#F1F8F4] text-[#075B43] text-[10px] font-bold uppercase tracking-wider">
                  {item.category}
                </span>
                <span className="text-xs text-neutral-500 flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#075B43]" />
                  {item.readTime}
                </span>
              </div>
              <h3 className="font-heading text-sm font-bold text-[#075B43] leading-snug line-clamp-2">
                <Link to={`/resources/${item.slug}`} className="hover:text-[#075B43] transition-colors">
                  {item.title}
                </Link>
              </h3>
            </div>

            <div className="pt-3 border-t border-neutral-100 mt-4 flex items-center justify-between text-left">
              <span className="text-[11px] text-neutral-500 truncate max-w-[60%] font-medium">{item.author}</span>
              <Link
                to={`/resources/${item.slug}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#075B43] hover:text-[#064C38] transition-colors flex-shrink-0"
              >
                <span>Read Review</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
