import React from 'react';
import { SEO } from '../components/common/SEO.jsx';
import { generateBreadcrumbSchema } from '../utils/structuredData.js';
import {
  AboutHero,
  StorySection,
  MissionVision,
  AboutCTA,
} from '../sections/index.js';

export function AboutPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
  ];

  return (
    <div className="w-full">
      <SEO
        title="About Our Proactive Clinical Mission"
        description="Learn about Healix's mission, values, and our forward-looking platform connecting everyday health to proactive vitality."
        canonicalPath="/about"
        structuredData={generateBreadcrumbSchema(breadcrumbs)}
      />
      {/* 01: About Hero with Breadcrumbs */}
      <AboutHero />

      {/* 02: Brand Story & Founding Problem */}
      <StorySection />

      {/* 03: Mission & Vision Cards */}
      <MissionVision />

      {/* 04: Looking Ahead Banner */}
      <AboutCTA />
    </div>
  );
}
