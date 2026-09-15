import React from 'react';
import { useLocation } from 'react-router-dom';
import { PageContainer } from '../layouts/PageContainer.jsx';
import { Breadcrumb } from '../components/common/Breadcrumb.jsx';
import { SEO } from '../components/common/SEO.jsx';
import { generateBreadcrumbSchema } from '../utils/structuredData.js';
import { ROUTES } from '../constants/routes.js';
import { Shield } from 'lucide-react';

export function LegalPage({ type = 'privacy' }) {
  const location = useLocation();

  const titles = {
    '/privacy': 'Privacy Policy & Data Protection Disclosures',
    '/terms': 'Terms of Healthcare Service',
    '/cookies': 'Cookie & Digital Tracking Policy',
  };

  const currentTitle = titles[location.pathname] || 'Legal Information';

  const breadcrumbItems = [
    { label: 'Home', href: ROUTES.HOME },
    { label: 'Legal Policies', active: true },
  ];

  return (
    <div className="py-8 md:py-16 bg-background min-h-[70vh]">
      <SEO
        title={`${currentTitle} — Healix Healthcare`}
        description="Review Healix terms of service, patient data security safeguards, privacy disclosures, and digital policies."
        canonicalUrl={location.pathname}
        structuredData={[
          generateBreadcrumbSchema([
            { label: 'Home', href: '/' },
            { label: currentTitle }
          ])
        ]}
      />
      <PageContainer>
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="mb-4">
            <Breadcrumb items={breadcrumbItems} />
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-healix-md bg-primary-light text-primary flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-text-muted">Regulatory & Compliance</div>
              <h1 className="font-heading text-3xl font-extrabold text-text-primary">{currentTitle}</h1>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-healix-xl p-8 sm:p-10 space-y-6 text-sm text-text-secondary leading-relaxed">
            <p className="font-medium text-text-primary">
              Last Updated: January 15, 2026
            </p>

            <h2 className="font-heading text-lg font-bold text-text-primary pt-2">1. Health Information Privacy & Safeguards</h2>
            <p>
              Healix maintains rigorous administrative, physical, and technical safeguards for user information. As a public web platform, general inquiries are intended for introductory coordination; enrolled patients communicate and access clinical data through isolated, secure portal environments.
            </p>

            <h2 className="font-heading text-lg font-bold text-text-primary pt-2">2. Digital Telehealth & Service Scope</h2>
            <p>
              Informational materials and diagnostic screening summaries provided through this platform do not constitute emergency medical advice. If you are experiencing a medical emergency, call 911 immediately.
            </p>

            <h2 className="font-heading text-lg font-bold text-text-primary pt-2">3. Data Security & Storage</h2>
            <p>
              All patient portal communications, consultation requests, and clinical notes are transmitted via TLS 1.3 encryption and stored within dedicated, audited healthcare cloud infrastructure.
            </p>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
