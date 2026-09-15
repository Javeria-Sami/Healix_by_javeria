import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ServicesPage } from '../pages/ServicesPage.jsx';
import { ServiceDetailPage } from '../pages/ServiceDetailPage.jsx';
import { SERVICES, SERVICE_CATEGORIES } from '../data/services.js';
import { ROUTES } from '../constants/routes.js';

const routerFuture = { v7_startTransition: true, v7_relativeSplatPath: true };

describe('Phase 9 Services Experience Tests', () => {
  describe('Services Data Integrity', () => {
    it('contains valid and unique IDs and slugs for all services', () => {
      const ids = SERVICES.map((s) => s.id);
      const slugs = SERVICES.map((s) => s.slug);

      expect(new Set(ids).size).toBe(SERVICES.length);
      expect(new Set(slugs).size).toBe(SERVICES.length);
    });

    it('ensures each service has all required clinical fields', () => {
      SERVICES.forEach((service) => {
        expect(service.id).toBeDefined();
        expect(service.slug).toBeTruthy();
        expect(service.title).toBeTruthy();
        expect(service.category).toBeTruthy();
        expect(service.tagline).toBeTruthy();
        expect(service.description).toBeTruthy();
        expect(Array.isArray(service.features)).toBe(true);
        expect(service.features.length).toBeGreaterThan(0);
        expect(Array.isArray(service.inclusions)).toBe(true);
        expect(service.inclusions.length).toBeGreaterThan(0);
        expect(Array.isArray(service.targetAudience)).toBe(true);
        expect(service.targetAudience.length).toBeGreaterThan(0);
        expect(Array.isArray(service.process)).toBe(true);
        expect(service.process.length).toBe(4);
        expect(Array.isArray(service.benefits)).toBe(true);
        expect(service.benefits.length).toBeGreaterThan(0);
      });
    });

    it('ensures all related service slugs point to existing services', () => {
      const allSlugs = SERVICES.map((s) => s.slug);
      SERVICES.forEach((service) => {
        if (service.relatedServices) {
          service.relatedServices.forEach((relatedSlug) => {
            expect(allSlugs).toContain(relatedSlug);
          });
        }
      });
    });
  });

  describe('Services Overview Page (/services)', () => {
    beforeEach(() => {
      render(
        <MemoryRouter initialEntries={['/services']} future={routerFuture}>
          <ServicesPage />
        </MemoryRouter>
      );
    });

    it('renders single semantic H1 and left-aligned breadcrumb elements', () => {
      const headings = screen.getAllByRole('heading', { level: 1 });
      expect(headings).toHaveLength(1);
      expect(headings[0]).toHaveTextContent(/Modern Pharmacy Care/i);

      // Verify breadcrumb
      const nav = screen.getByRole('navigation', { name: /breadcrumb/i });
      expect(nav).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /^home$/i })).toHaveAttribute('href', '/');
      expect(screen.getByText(/^services$/i)).toHaveAttribute('aria-current', 'page');
    });

    it('renders Modern Pharmacy Care primary service section with both cards', () => {
      expect(screen.getByRole('region', { name: /modern pharmacy care/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 1, name: /modern pharmacy care/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3, name: /prescription care,\s*made simpler/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3, name: /what we offer/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /explore pharmacy services/i })).toBeInTheDocument();
    });

    it('renders services FAQ', () => {
      expect(screen.getByText(/Frequently Asked Questions/i)).toBeInTheDocument();
    });
  });

  describe('Service Detail Page (/services/:slug)', () => {
    it('renders complete service details for a valid slug', async () => {
      render(
        <MemoryRouter initialEntries={['/services/preventive-health-screenings']} future={routerFuture}>
          <Routes>
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
          </Routes>
        </MemoryRouter>
      );

      // Wait for loading to finish
      await waitFor(() => {
        expect(screen.queryByText(/Loading Clinical Service/i)).not.toBeInTheDocument();
      });

      // Semantic H1
      const headings = screen.getAllByRole('heading', { level: 1 });
      expect(headings).toHaveLength(1);
      expect(headings[0]).toHaveTextContent(/Comprehensive Preventive Care/i);

      // Inclusions section
      expect(screen.getByText(/What This Service Includes/i)).toBeInTheDocument();
      expect(screen.getByText(/Full Metabolic & Lipid Panel/i)).toBeInTheDocument();

      // Audience section
      expect(screen.getByText(/Who Is This Program Designed For\?/i)).toBeInTheDocument();
      expect(screen.getByText(/Proactive Longevity Seekers/i)).toBeInTheDocument();

      // Pathway section
      expect(screen.getByText(/The 4-Step Clinical Journey/i)).toBeInTheDocument();

      // Benefits section
      expect(screen.getByText(/Evidence-Based Clinical Benefits/i)).toBeInTheDocument();

      // FAQs & CTAs
      expect(screen.getByText(/Service FAQs/i)).toBeInTheDocument();
      expect(screen.getByText(/Related Clinical Specializations/i)).toBeInTheDocument();
      expect(screen.getByText(/Ready to Begin with/i)).toBeInTheDocument();
    });

    it('renders graceful 404 EmptyState for an invalid service slug', async () => {
      render(
        <MemoryRouter initialEntries={['/services/unknown-non-existent-service']} future={routerFuture}>
          <Routes>
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText(/Clinical Service Not Found/i)).toBeInTheDocument();
      });

      expect(screen.getByText(/Explore All Services/i)).toBeInTheDocument();
    });
  });
});
