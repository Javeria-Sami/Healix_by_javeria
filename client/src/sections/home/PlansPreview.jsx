import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PLANS } from '../../data/plans.js';
import { ROUTES } from '../../constants/routes.js';
import { Container } from '../../components/common/Container.jsx';
import { SectionHeading } from '../../components/common/SectionHeading.jsx';
import { Button } from '../../components/common/Button.jsx';
import { Badge } from '../../components/common/Badge.jsx';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/cards/Card.jsx';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import clsx from 'clsx';

export function PlansPreview() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section className="py-16 md:py-24 bg-background" aria-labelledby="plans-preview-heading">
      <Container>
        <SectionHeading
          badge="Care Memberships"
          title="Transparent, Predictable Healthcare Plans"
          subtitle="Choose the preventative care tier that aligns with your health goals, from baseline annual wellness to executive concierge oversight."
          align="center"
        />

        {/* Billing Cycle Toggle */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <span className={clsx('text-xs font-semibold', !isAnnual ? 'text-text-primary' : 'text-text-muted')}>
            Monthly Billing
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={isAnnual}
            aria-label="Toggle between monthly and annual billing"
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-12 h-6 rounded-full bg-surface border border-border p-0.5 relative transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <div
              className={clsx(
                'w-5 h-5 rounded-full bg-primary transition-transform duration-200',
                isAnnual ? 'translate-x-6' : 'translate-x-0'
              )}
            />
          </button>
          <span className={clsx('text-xs font-semibold flex items-center gap-1.5', isAnnual ? 'text-text-primary' : 'text-text-muted')}>
            <span>Annual Billing</span>
            <Badge variant="success" size="sm">Save 15%</Badge>
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PLANS.map((plan) => {
            const displayPrice = isAnnual ? plan.priceAnnual : plan.priceMonthly;
            return (
              <Card
                key={plan.id}
                variant={plan.isPopular ? 'elevated' : 'default'}
                className={clsx(
                  'flex flex-col justify-between text-left relative h-full',
                  plan.isPopular && 'border-primary shadow-soft-xl ring-1 ring-primary'
                )}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="primary" size="sm" icon={Sparkles}>
                      Most Popular Tier
                    </Badge>
                  </div>
                )}

                <div>
                  <CardHeader className="pt-2">
                    <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">
                      {plan.tier}
                    </div>
                    <CardTitle className="text-2xl">
                      {plan.name}
                    </CardTitle>
                    <CardDescription className="mt-2 min-h-[40px]">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>

                  <div className="px-6 py-4 bg-surface-muted/60 border-y border-border my-2">
                    <div className="font-heading font-extrabold text-2xl text-[#075B43]">
                      {displayPrice}
                    </div>
                    <p className="text-[11px] text-text-muted mt-0.5">
                      {plan.billingPeriod}
                    </p>
                  </div>

                  <CardContent className="space-y-4 pt-4">
                    <p className="text-xs font-bold text-[#075B43]">Plan Highlights:</p>
                    <ul className="space-y-2.5 text-xs text-text-secondary">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </div>

                <CardFooter className="pt-6 border-t border-border mt-6">
                  <Button
                    to={`${ROUTES.CONTACT}?plan=${encodeURIComponent(plan.name)}&type=Longevity%20Membership%20%26%20Plans`}
                    variant={plan.isPopular ? 'primary' : 'outline'}
                    size="md"
                    className="w-full justify-center"
                  >
                    {plan.ctaText}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Button to={ROUTES.PLANS} variant="ghost" size="md" iconTrailing={ArrowRight}>
            Compare Full Membership Features on Plans Page
          </Button>
        </div>
      </Container>
    </section>
  );
}
