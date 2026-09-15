import React, { useState } from 'react';
import { 
  PlansHero, 
  PlansGrid, 
  PlanComparisonTable, 
  PlansHowItWorks, 
  PlansTransparency, 
  PlansFAQ, 
  PlansCTA 
} from '../sections/index.js';
import { SEO } from '../components/common/SEO.jsx';
import { generateBreadcrumbSchema } from '../utils/structuredData.js';
import { PLANS } from '../data/plans.js';

export function PlansPage() {
  const [annualBilling, setAnnualBilling] = useState(true);

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <SEO
        title="Membership Plans & Preventative Care Tiers"
        description="Explore transparent, all-inclusive healthcare membership plans engineered for proactive longevity, executive screening, and continuous clinical oversight."
        canonicalUrl="/plans"
        structuredData={[
          generateBreadcrumbSchema([
            { label: 'Home', href: '/' },
            { label: 'Membership Plans' }
          ])
        ]}
      />

      {/* 1. Hero with Billing Switch */}
      <PlansHero 
        annualBilling={annualBilling} 
        onToggleBilling={() => setAnnualBilling((prev) => !prev)} 
      />

      {/* 2. Core Pricing & Membership Tiers */}
      <PlansGrid 
        plans={PLANS} 
        annualBilling={annualBilling} 
      />

      {/* 3. Detailed Comparison Matrix */}
      <PlanComparisonTable />

      {/* 4. 4-Step Membership Process */}
      <PlansHowItWorks />

      {/* 5. Patient Transparency & Billing Standards */}
      <PlansTransparency />

      {/* 6. Pricing & Billing FAQs */}
      <PlansFAQ />

      {/* 7. Actionable Closing CTA */}
      <PlansCTA />
    </div>
  );
}
