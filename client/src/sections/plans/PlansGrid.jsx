import React from 'react';
import { PageContainer } from '../../layouts/PageContainer.jsx';
import { Card } from '../../components/cards/Card.jsx';
import { Badge } from '../../components/common/Badge.jsx';
import { Button } from '../../components/common/Button.jsx';
import { ROUTES } from '../../constants/routes.js';
import { CheckCircle2, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export function PlansGrid({ plans, annualBilling }) {
  return (
    <section 
      id="plans-grid" 
      aria-label="Care Membership Tiers" 
      className="py-16 md:py-24 bg-background border-b border-border/40"
    >
      <PageContainer>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => {
            const isRecommended = plan.isRecommended;

            return (
              <Card
                key={plan.id}
                variant={isRecommended ? 'elevated' : 'default'}
                className={`flex flex-col justify-between relative transition-all duration-300 p-8 sm:p-10 border ${
                  isRecommended 
                    ? 'border-primary ring-2 ring-primary/20 shadow-soft-lg bg-surface' 
                    : 'border-border/80 bg-surface'
                }`}
              >
                {/* Recommended Tag */}
                {isRecommended && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-primary text-white text-[11px] font-bold uppercase tracking-wider shadow-soft-sm flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Most Recommended</span>
                  </div>
                )}

                <div>
                  {/* Tier & Title */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <Badge variant={isRecommended ? 'primary' : 'secondary'} className="text-xs font-semibold">
                      {plan.tier}
                    </Badge>
                  </div>

                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#075B43] mb-2">
                    {plan.name}
                  </h2>

                  <p className="text-xs text-text-secondary leading-relaxed mb-6">
                    {plan.tagline}
                  </p>

                  {/* Price Block */}
                  <div className="py-6 border-y border-border/60 mb-6 space-y-1">
                    <div className="font-heading text-3xl sm:text-4xl font-extrabold text-[#075B43]">
                      {annualBilling ? plan.priceAnnual : plan.priceMonthly}
                    </div>
                    <p className="text-xs text-text-muted">
                      {plan.billingPeriod}
                    </p>
                  </div>

                  {/* Target Profile */}
                  <div className="mb-6 p-3 rounded-healix-md bg-background border border-border/60 text-xs text-text-secondary leading-relaxed">
                    <span className="font-semibold text-text-primary block mb-0.5">Designed For:</span>
                    {plan.targetAudience}
                  </div>

                  {/* Included Features List */}
                  <div className="space-y-3 mb-8">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted block mb-1">
                      Program Inclusions
                    </span>
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-text-secondary">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="leading-tight">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <div className="pt-6 border-t border-border/60 mt-auto">
                  <Button
                    to={`${ROUTES.CONTACT}?plan=${encodeURIComponent(plan.name)}&type=Longevity%20Membership%20%26%20Plans`}
                    variant={isRecommended ? 'primary' : 'secondary'}
                    size="lg"
                    className="w-full justify-center text-sm font-semibold shadow-soft-sm inline-flex items-center gap-2"
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </PageContainer>
    </section>
  );
}
