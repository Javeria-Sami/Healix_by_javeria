import React from 'react';
import { Sparkles } from 'lucide-react';

export function ResourcesCTA() {
  return (
    <section className="pt-8 pb-16 md:pt-12 md:pb-24">
      <div className="bg-[#075C49] border border-[#0C6F58]/40 rounded-3xl p-8 sm:p-12 lg:p-16 text-white text-center space-y-6 relative overflow-hidden shadow-xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-white text-xs font-semibold border border-white/20">
          <Sparkles className="w-3.5 h-3.5 text-[#8FD21F]" />
          <span>Physician-Guided Preventative Medicine</span>
        </div>

        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold max-w-3xl mx-auto tracking-tight leading-tight text-white">
          Translate Clinical Research Into Personal Healthspan Action
        </h2>

        <p className="text-[#DCE8E3] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Schedule a comprehensive preventative diagnostic evaluation with our interdisciplinary medical directors.
        </p>
      </div>
    </section>
  );
}
