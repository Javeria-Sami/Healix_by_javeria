import React from 'react';
import { Card } from '../../components/cards/Card.jsx';
import { CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';

export function PortfolioOutcomes({ outcomes }) {
  if (!outcomes || outcomes.length === 0) return null;

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-primary" />
        <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#075C49]">
          Key Outcomes & Measurable Impact
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {outcomes.map((outcome, idx) => (
          <Card
            key={idx}
            className="p-5 border border-border/80 bg-surface hover:border-primary/40 transition-all flex items-start gap-3.5"
          >
            <div className="w-7 h-7 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0 mt-0.5">
              <CheckCircle2 className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold text-text-primary leading-snug">
                {outcome}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
