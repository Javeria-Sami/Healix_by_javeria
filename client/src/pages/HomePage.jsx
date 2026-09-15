import React from 'react';
import { SEO } from '../components/common/SEO.jsx';
import { generateOrganizationSchema, generateWebSiteSchema } from '../utils/structuredData.js';
import {
  HeroSection,
  PrimaryServicesSection,
  TrustSection,
  WideRangeMedicinesSection,
  HealthArticlesSection,
} from '../sections/index.js';

export function HomePage() {
  const homeStructuredData = {
    '@context': 'https://schema.org',
    '@graph': [generateOrganizationSchema(), generateWebSiteSchema()],
  };

  return (
    <div className="w-full">
      <SEO
        title="Human-Centered Healthcare, Reimagined for Longevity"
        description="Healix unites advanced diagnostic precision with dedicated physician partnerships to detect health risks early, protect vitality, and extend your healthspan."
        canonicalPath="/"
        structuredData={homeStructuredData}
      />
      {/* 01: Homepage Hero Experience */}
      <HeroSection />

      {/* 02: Our Services / How Can We Help You? */}
      <PrimaryServicesSection />

      {/* 03: Mission / Brand Purpose */}
      <TrustSection />

      {/* 04: Wide Range of Medicines / Pharmacy Discovery */}
      <WideRangeMedicinesSection />

      {/* 05: Health Articles / News & Articles */}
      <HealthArticlesSection />
    </div>
  );
}
