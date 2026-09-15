import React from 'react';
import { SEO } from '../components/common/SEO.jsx';
import { generateBreadcrumbSchema } from '../utils/structuredData.js';
import { 
  ModernPharmacyCare,
  ServicesFaq 
} from '../sections/index.js';

export function ServicesPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
  ];

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <SEO
        title="Modern Pharmacy Care & Proactive Healthcare Services"
        description="Explore Healix's modern pharmacy care and clinical services: prescription refilling, clinical consultations, doorstep delivery, wellness essentials, and ongoing medication support."
        canonicalPath="/services"
        structuredData={generateBreadcrumbSchema(breadcrumbs)}
      />

      {/* 1. Modern Pharmacy Care (Integrated Left-Aligned Breadcrumb + Primary Header + 2-Card Grid) */}
      <ModernPharmacyCare />

      {/* 2. Frequently Asked Questions */}
      <ServicesFaq />
    </div>
  );
}


