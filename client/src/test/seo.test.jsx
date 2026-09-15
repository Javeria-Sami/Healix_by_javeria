import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import fs from 'fs';
import path from 'path';

import { SEO } from '../components/common/SEO.jsx';
import { AppRoutes } from '../routes/AppRoutes.jsx';
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateBreadcrumbSchema,
  generatePhysicianSchema,
  generateArticleSchema,
  generateFAQSchema,
  generateServiceSchema,
} from '../utils/structuredData.js';
import { PROFESSIONALS } from '../data/professionals.js';
import { ARTICLES } from '../data/articles.js';
import { SERVICES } from '../data/services.js';
import { FAQS } from '../data/faqs.js';

describe('Phase 20 — Advanced SEO & Search Visibility Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.title = '';
    const dynamicScripts = document.querySelectorAll('script[data-seo="true"]');
    dynamicScripts.forEach((el) => el.remove());
  });

  describe('Dynamic Document Title and Meta Management via <SEO />', () => {
    it('sets standard page title with branded suffix and meta description', () => {
      render(
        <SEO
          title="Executive Longevity Protocols"
          description="Comprehensive multi-system longevity diagnostics and biomarker tracking."
          canonicalPath="/services/longevity"
        />
      );

      expect(document.title).toBe('Executive Longevity Protocols | Healix Healthcare');

      const descMeta = document.querySelector('meta[name="description"]');
      expect(descMeta).not.toBeNull();
      expect(descMeta.getAttribute('content')).toBe(
        'Comprehensive multi-system longevity diagnostics and biomarker tracking.'
      );

      const canonicalLink = document.querySelector('link[rel="canonical"]');
      expect(canonicalLink).not.toBeNull();
      expect(canonicalLink.getAttribute('href')).toBe('https://healix.health/services/longevity');
    });

    it('manages robots meta directive correctly for indexable vs noIndex pages', () => {
      const { unmount } = render(
        <SEO
          title="Public Clinical Programs"
          description="Public overview."
          noIndex={false}
        />
      );

      let robotsMeta = document.querySelector('meta[name="robots"]');
      expect(robotsMeta.getAttribute('content')).toBe('index, follow');

      unmount();

      render(
        <SEO
          title="Internal Design System"
          description="Internal engineering UI playground."
          noIndex={true}
        />
      );

      robotsMeta = document.querySelector('meta[name="robots"]');
      expect(robotsMeta.getAttribute('content')).toBe('noindex, nofollow');
    });

    it('injects complete Open Graph and Twitter card social metadata', () => {
      render(
        <SEO
          title="Cardiovascular Genomics"
          description="Advanced genetic risk profiling for cardiovascular longevity."
          canonicalPath="/services/cardiovascular"
          ogImage="/images/cardio-og.jpg"
          ogType="article"
        />
      );

      // Open Graph assertions
      expect(document.querySelector('meta[property="og:title"]').getAttribute('content')).toBe(
        'Cardiovascular Genomics | Healix Healthcare'
      );
      expect(document.querySelector('meta[property="og:description"]').getAttribute('content')).toBe(
        'Advanced genetic risk profiling for cardiovascular longevity.'
      );
      expect(document.querySelector('meta[property="og:url"]').getAttribute('content')).toBe(
        'https://healix.health/services/cardiovascular'
      );
      expect(document.querySelector('meta[property="og:type"]').getAttribute('content')).toBe(
        'article'
      );
      expect(document.querySelector('meta[property="og:site_name"]').getAttribute('content')).toBe(
        'Healix Healthcare'
      );
      expect(document.querySelector('meta[property="og:image"]').getAttribute('content')).toBe(
        'https://healix.health/images/cardio-og.jpg'
      );

      // Twitter Cards assertions
      expect(document.querySelector('meta[name="twitter:card"]').getAttribute('content')).toBe(
        'summary_large_image'
      );
      expect(document.querySelector('meta[name="twitter:title"]').getAttribute('content')).toBe(
        'Cardiovascular Genomics | Healix Healthcare'
      );
      expect(document.querySelector('meta[name="twitter:description"]').getAttribute('content')).toBe(
        'Advanced genetic risk profiling for cardiovascular longevity.'
      );
      expect(document.querySelector('meta[name="twitter:image"]').getAttribute('content')).toBe(
        'https://healix.health/images/cardio-og.jpg'
      );
    });
  });

  describe('Schema.org JSON-LD Structured Data Generators', () => {
    it('generates compliant MedicalOrganization schema', () => {
      const orgSchema = generateOrganizationSchema();
      expect(orgSchema['@context']).toBe('https://schema.org');
      expect(orgSchema['@type']).toBe('MedicalOrganization');
      expect(orgSchema.name).toBe('Healix Healthcare');
      expect(orgSchema.url).toBe('https://healix.health');
      expect(orgSchema.address['@type']).toBe('PostalAddress');
      expect(orgSchema.medicalSpecialty).toContain('Cardiovascular');
      expect(orgSchema.medicalSpecialty).toContain('PreventativeCare');
      expect(orgSchema.contactPoint[0]['@type']).toBe('ContactPoint');
    });

    it('generates compliant WebSite schema', () => {
      const siteSchema = generateWebSiteSchema();
      expect(siteSchema['@context']).toBe('https://schema.org');
      expect(siteSchema['@type']).toBe('WebSite');
      expect(siteSchema.url).toBe('https://healix.health');
      expect(siteSchema.publisher['@id']).toBe('https://healix.health/#organization');
    });

    it('generates compliant BreadcrumbList schema with hierarchical positions', () => {
      const breadcrumbs = generateBreadcrumbSchema([
        { label: 'Home', href: '/' },
        { label: 'Clinical Services', href: '/services' },
        { label: 'Cardiovascular Risk Prevention' },
      ]);

      expect(breadcrumbs['@type']).toBe('BreadcrumbList');
      expect(breadcrumbs.itemListElement).toHaveLength(3);
      expect(breadcrumbs.itemListElement[0].position).toBe(1);
      expect(breadcrumbs.itemListElement[0].name).toBe('Home');
      expect(breadcrumbs.itemListElement[0].item).toBe('https://healix.health/');
      expect(breadcrumbs.itemListElement[2].position).toBe(3);
      expect(breadcrumbs.itemListElement[2].name).toBe('Cardiovascular Risk Prevention');
      expect(breadcrumbs.itemListElement[2].item).toBeUndefined();
    });

    it('generates compliant Physician schema for medical professionals', () => {
      const physician = PROFESSIONALS[0];
      const physicianSchema = generatePhysicianSchema(physician);

      expect(physicianSchema['@type']).toBe('Physician');
      expect(physicianSchema.name).toBe(physician.name);
      expect(physicianSchema.jobTitle).toBe(physician.role);
      expect(physicianSchema.medicalSpecialty).toBe(physician.specialty);
      expect(physicianSchema.worksFor['@id']).toBe('https://healix.health/#organization');
      expect(physicianSchema.url).toBe(`https://healix.health/professionals/${physician.slug}`);
    });

    it('generates compliant MedicalWebPage schema for clinical articles', () => {
      const article = ARTICLES[0];
      const articleSchema = generateArticleSchema(article);

      expect(articleSchema['@type']).toBe('MedicalWebPage');
      expect(articleSchema.headline).toBe(article.title);
      expect(articleSchema.author['@type']).toBe('Person');
      expect(articleSchema.author.name).toBe(article.author);
      expect(articleSchema.mainEntityOfPage['@id']).toBe(
        `https://healix.health/resources/${article.slug}`
      );
    });

    it('generates compliant FAQPage schema for patient inquiries', () => {
      const faqSchema = generateFAQSchema(FAQS.slice(0, 3));

      expect(faqSchema['@type']).toBe('FAQPage');
      expect(faqSchema.mainEntity).toHaveLength(3);
      expect(faqSchema.mainEntity[0]['@type']).toBe('Question');
      expect(faqSchema.mainEntity[0].name).toBe(FAQS[0].question);
      expect(faqSchema.mainEntity[0].acceptedAnswer['@type']).toBe('Answer');
      expect(faqSchema.mainEntity[0].acceptedAnswer.text).toBe(FAQS[0].answer);
    });

    it('generates compliant MedicalProcedure schema for specialized clinical programs', () => {
      const service = SERVICES[0];
      const serviceSchema = generateServiceSchema(service);

      expect(serviceSchema['@type']).toBe('MedicalProcedure');
      expect(serviceSchema.name).toBe(service.title);
      expect(serviceSchema.procedureType).toBe('https://schema.org/DiagnosticProcedure');
      expect(serviceSchema.url).toBe(`https://healix.health/services/${service.slug}`);
    });
  });

  describe('Dynamic JSON-LD Script Injection and Cleanup', () => {
    it('injects JSON-LD script tags into head and removes them upon component unmount', () => {
      const sampleSchema = {
        '@context': 'https://schema.org',
        '@type': 'MedicalWebPage',
        headline: 'Test Medical Insight',
      };

      const { unmount } = render(
        <SEO
          title="Medical Insight"
          description="Evidence-based review."
          structuredData={sampleSchema}
        />
      );

      let scripts = document.querySelectorAll('script[data-seo="true"]');
      expect(scripts.length).toBeGreaterThan(0);
      const injectedContent = JSON.parse(scripts[0].textContent);
      expect(injectedContent['@type']).toBe('MedicalWebPage');
      expect(injectedContent.headline).toBe('Test Medical Insight');

      unmount();

      scripts = document.querySelectorAll('script[data-seo="true"]');
      expect(scripts.length).toBe(0);
    });
  });

  describe('Crawler Configuration Files (robots.txt & sitemap.xml)', () => {
    it('verifies robots.txt exists and contains valid crawler directives', () => {
      const robotsPath = path.resolve(__dirname, '../../public/robots.txt');
      expect(fs.existsSync(robotsPath)).toBe(true);

      const robotsContent = fs.readFileSync(robotsPath, 'utf8');
      expect(robotsContent).toContain('User-agent: *');
      expect(robotsContent).toContain('Allow: /');
      expect(robotsContent).toContain('Disallow: /design-system');
      expect(robotsContent).toContain('Sitemap: https://healix.health/sitemap.xml');
    });

    it('verifies sitemap.xml exists and includes all primary routes and canonical URLs', () => {
      const sitemapPath = path.resolve(__dirname, '../../public/sitemap.xml');
      expect(fs.existsSync(sitemapPath)).toBe(true);

      const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
      expect(sitemapContent).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(sitemapContent).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

      // Core routes check
      expect(sitemapContent).toContain('<loc>https://healix.health/</loc>');
      expect(sitemapContent).toContain('<loc>https://healix.health/about</loc>');
      expect(sitemapContent).toContain('<loc>https://healix.health/services</loc>');
      expect(sitemapContent).toContain('<loc>https://healix.health/professionals</loc>');
      expect(sitemapContent).toContain('<loc>https://healix.health/plans</loc>');
      expect(sitemapContent).toContain('<loc>https://healix.health/portfolio</loc>');
      expect(sitemapContent).toContain('<loc>https://healix.health/resources</loc>');
      expect(sitemapContent).toContain('<loc>https://healix.health/faq</loc>');
      expect(sitemapContent).toContain('<loc>https://healix.health/contact</loc>');
      expect(sitemapContent).toContain('<loc>https://healix.health/privacy</loc>');
      expect(sitemapContent).toContain('<loc>https://healix.health/terms</loc>');
      expect(sitemapContent).toContain('<loc>https://healix.health/cookies</loc>');

      // Dynamic items check
      SERVICES.forEach((s) => {
        expect(sitemapContent).toContain(`<loc>https://healix.health/services/${s.slug}</loc>`);
      });
      PROFESSIONALS.forEach((p) => {
        expect(sitemapContent).toContain(`<loc>https://healix.health/professionals/${p.slug}</loc>`);
      });
      ARTICLES.forEach((a) => {
        expect(sitemapContent).toContain(`<loc>https://healix.health/resources/${a.slug}</loc>`);
      });
    });
  });

  describe('Route-level SEO Integration via AppRoutes', () => {
    it('updates document metadata when navigating to /about', async () => {
      render(
        <MemoryRouter initialEntries={['/about']}>
          <AppRoutes />
        </MemoryRouter>
      );

      await waitFor(
        () => {
          expect(document.title).toContain('About Our Proactive Clinical Mission');
        },
        { timeout: 4000 }
      );

      const canonicalLink = document.querySelector('link[rel="canonical"]');
      expect(canonicalLink.getAttribute('href')).toBe('https://healix.health/about');
    });

    it('updates document metadata when navigating to /plans', async () => {
      render(
        <MemoryRouter initialEntries={['/plans']}>
          <AppRoutes />
        </MemoryRouter>
      );

      await waitFor(
        () => {
          expect(document.title).toContain('Membership Plans & Preventative Care Tiers');
        },
        { timeout: 4000 }
      );

      const canonicalLink = document.querySelector('link[rel="canonical"]');
      expect(canonicalLink.getAttribute('href')).toBe('https://healix.health/plans');
    });

    it('updates document metadata when navigating to /faq', async () => {
      render(
        <MemoryRouter initialEntries={['/faq']}>
          <AppRoutes />
        </MemoryRouter>
      );

      await waitFor(
        () => {
          expect(document.title).toContain('Frequently Asked Questions & Patient Knowledge Base');
        },
        { timeout: 4000 }
      );

      const canonicalLink = document.querySelector('link[rel="canonical"]');
      expect(canonicalLink.getAttribute('href')).toBe('https://healix.health/faq');
    });

    it('applies noindex directive when landing on an unknown 404 route', async () => {
      render(
        <MemoryRouter initialEntries={['/non-existent-clinical-pathway']}>
          <AppRoutes />
        </MemoryRouter>
      );

      await waitFor(
        () => {
          expect(document.title).toContain('404 — Page Not Found');
        },
        { timeout: 4000 }
      );

      const robotsMeta = document.querySelector('meta[name="robots"]');
      expect(robotsMeta.getAttribute('content')).toBe('noindex, nofollow');
    });
  });
});
