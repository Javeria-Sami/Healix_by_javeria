import React from 'react';
import { PageContainer } from '../layouts/PageContainer.jsx';
import {
  ContactHero,
  ContactInfoCards,
  ContactForm,
  ContactPrivacyNotice,
} from '../sections/index.js';
import { SEO } from '../components/common/SEO.jsx';
import { generateBreadcrumbSchema } from '../utils/structuredData.js';

export function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <SEO
        title="Contact Healix — Clinical Admissions & Concierge Inquiries"
        description="Connect with our clinical intake team, schedule a comprehensive health consultation, or visit our primary medical centers in Boston and New York."
        canonicalUrl="/contact"
        structuredData={[
          generateBreadcrumbSchema([
            { label: 'Home', href: '/' },
            { label: 'Contact & Admissions' }
          ])
        ]}
      />

      {/* 1. Hero Header */}
      <ContactHero />

      <PageContainer className="py-12 md:py-16 space-y-16">
        {/* 2. Main Contact Grid (Direct Channels + Form) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left / Information & Privacy Notice */}
          <div className="lg:col-span-5 space-y-6">
            <ContactInfoCards />
            <ContactPrivacyNotice />
          </div>

          {/* Right / Interactive Consultation Request Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
