import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PlansPage } from '../pages/PlansPage.jsx';
import { PLANS, COMPARISON_FEATURES, PLANS_FAQS } from '../data/plans.js';
import { SERVICES } from '../data/services.js';

const routerFuture = { v7_startTransition: true, v7_relativeSplatPath: true };

describe('Phase 11 Plans / Pricing Experience Tests', () => {
  describe('Plans Data Integrity', () => {
    it('contains unique IDs and valid slugs for all care plans', () => {
      const ids = PLANS.map((p) => p.id);
      const slugs = PLANS.map((p) => p.slug);

      expect(new Set(ids).size).toBe(PLANS.length);
      expect(new Set(slugs).size).toBe(PLANS.length);
    });

    it('ensures each plan has complete pricing and clinical inclusion fields', () => {
      PLANS.forEach((plan) => {
        expect(plan.id).toBeDefined();
        expect(plan.slug).toBeTruthy();
        expect(plan.name).toBeTruthy();
        expect(plan.tier).toBeTruthy();
        expect(plan.tagline).toBeTruthy();
        expect(plan.description).toBeTruthy();
        expect(plan.priceMonthly).toBeTruthy();
        expect(plan.priceAnnual).toBeTruthy();
        expect(plan.billingPeriod).toBeTruthy();
        expect(plan.targetAudience).toBeTruthy();
        expect(Array.isArray(plan.features)).toBe(true);
        expect(plan.features.length).toBeGreaterThan(0);
        expect(Array.isArray(plan.inclusions)).toBe(true);
        expect(plan.inclusions.length).toBeGreaterThan(0);
        expect(Array.isArray(plan.serviceSlugs)).toBe(true);
      });
    });

    it('ensures all connected serviceSlugs map to valid services', () => {
      const allServiceSlugs = SERVICES.map((s) => s.slug);
      PLANS.forEach((plan) => {
        plan.serviceSlugs.forEach((slug) => {
          expect(allServiceSlugs).toContain(slug);
        });
      });
    });

    it('ensures comparison matrix contains well-formed categories and features', () => {
      expect(COMPARISON_FEATURES.length).toBeGreaterThan(0);
      COMPARISON_FEATURES.forEach((group) => {
        expect(group.category).toBeTruthy();
        expect(Array.isArray(group.items)).toBe(true);
        expect(group.items.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Plans Page Composition (/plans)', () => {
    beforeEach(() => {
      render(
        <MemoryRouter initialEntries={['/plans']} future={routerFuture}>
          <PlansPage />
        </MemoryRouter>
      );
    });

    it('renders single semantic H1 and breadcrumbs', () => {
      const headings = screen.getAllByRole('heading', { level: 1 });
      expect(headings).toHaveLength(1);
      expect(headings[0]).toHaveTextContent(/Transparent, Predictable Preventative Healthcare/i);

      expect(screen.getByRole('link', { name: /Home/i })).toBeInTheDocument();
      expect(screen.getByText('Care Plans')).toBeInTheDocument();
    });

    it('renders all 3 membership tiers with names and descriptions', () => {
      expect(screen.getByRole('heading', { name: 'Essential Care' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Professional Health' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Executive & Enterprise' })).toBeInTheDocument();

      // Recommended badge
      expect(screen.getAllByText(/Most Recommended/i).length).toBeGreaterThan(0);
    });

    it('toggles billing frequency between Annual and Monthly and updates prices', () => {
      const toggle = screen.getByRole('switch', { name: /toggle between monthly and annual billing/i });
      expect(toggle).toBeInTheDocument();

      // Default is annual
      expect(screen.getByText('[CLIENT PRICE: $890]')).toBeInTheDocument();
      expect(screen.getByText('[CLIENT PRICE: $1,890]')).toBeInTheDocument();

      // Click to switch to Monthly
      fireEvent.click(toggle);

      expect(screen.getByText('[CLIENT PRICE: $89]')).toBeInTheDocument();
      expect(screen.getByText('[CLIENT PRICE: $189]')).toBeInTheDocument();
    });

    it('renders plan CTAs linking to contact with plan slug query parameter', () => {
      const essentialLink = screen.getByRole('link', { name: /Choose Essential Care/i });
      expect(essentialLink.getAttribute('href')).toContain('/contact?plan=');

      const proLink = screen.getByRole('link', { name: /Choose Professional Care/i });
      expect(proLink.getAttribute('href')).toContain('/contact?plan=');

      const enterpriseLink = screen.getByRole('link', { name: /Contact for Enterprise Plan/i });
      expect(enterpriseLink.getAttribute('href')).toContain('/contact?plan=');
    });

    it('renders comparison matrix table with accessibility attributes', () => {
      expect(screen.getByRole('table')).toBeInTheDocument();
      expect(screen.getByText(/Diagnostic & Biomarker Screenings/i)).toBeInTheDocument();
      expect(screen.getByText(/Comprehensive Annual Biomarker Panel/i)).toBeInTheDocument();
    });

    it('renders 4-step onboarding continuum in How It Works', () => {
      expect(screen.getByText(/How Membership Care Works/i)).toBeInTheDocument();
      expect(screen.getByText(/Select Your Tier/i)).toBeInTheDocument();
      expect(screen.getByText(/Baseline Diagnostic Audit/i)).toBeInTheDocument();
      expect(screen.getByText(/Physician Strategy/i)).toBeInTheDocument();
      expect(screen.getByText(/Proactive Continuity/i)).toBeInTheDocument();
    });

    it('renders patient transparency assurances and billing standards', () => {
      expect(screen.getByText(/Clear, Predictable Billing Standards/i)).toBeInTheDocument();
      expect(screen.getByText(/Zero Hidden Charges/i)).toBeInTheDocument();
      expect(screen.getByText(/HSA & FSA Eligible/i)).toBeInTheDocument();
      expect(screen.getAllByText(/30-Day Satisfaction Window/i).length).toBeGreaterThan(0);
    });

    it('renders membership FAQs accordion and closing CTA', () => {
      expect(screen.getByText(/Membership & Pricing FAQs/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Are Healix care memberships covered by commercial health insurance/i })).toBeInTheDocument();

      expect(screen.getByRole('heading', { name: /Invest in Your Healthspan with/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Schedule Intake Consultation/i }).getAttribute('href')).toContain('/contact');
    });
  });
});
