import React from 'react';
import { ResourcesDisclaimer } from './ResourcesDisclaimer.jsx';
import { CheckCircle2, Sparkles } from 'lucide-react';

export function ResourceContentBody({ article }) {
  return (
    <article className="max-w-3xl mx-auto space-y-10">
      {/* 1. Key Takeaways Callout Box */}
      {article.keyTakeaways && article.keyTakeaways.length > 0 && (
        <div className="p-5 sm:p-6 bg-[#F1F8F4] rounded-2xl border border-[#DCEBE4] space-y-3.5 shadow-2xs">
          <div className="flex items-center gap-2 text-[#075B43] font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4 flex-shrink-0" />
            <h2 className="font-heading">
              Key Clinical Takeaways
            </h2>
          </div>
          <div className="space-y-2.5">
            {article.keyTakeaways.map((takeaway, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-800 font-medium leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-[#075B43] flex-shrink-0 mt-0.5" />
                <span>{takeaway}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Structured Article Sections */}
      {article.sections && article.sections.length > 0 ? (
        <div className="space-y-8 text-neutral-700 leading-relaxed font-body">
          {article.sections.map((section, idx) => (
            <div key={idx} className="space-y-3">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight leading-snug">
                {section.heading}
              </h2>
              <p className="text-base sm:text-[17px] leading-[1.8] text-neutral-700">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-base sm:text-[17px] leading-[1.8] text-neutral-700 font-body space-y-4">
          <p>{article.content || article.summary}</p>
        </div>
      )}

      {/* 3. Tags */}
      {article.tags && article.tags.length > 0 && (
        <div className="pt-6 border-t border-neutral-100 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-neutral-400 mr-1 uppercase tracking-wider">Topics:</span>
          {article.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-xs bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full font-medium"
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

