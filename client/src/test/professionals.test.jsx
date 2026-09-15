import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ProfessionalsPage } from '../pages/ProfessionalsPage.jsx';
import { ProfessionalDetailPage } from '../pages/ProfessionalDetailPage.jsx';
import { PROFESSIONALS, PROFESSIONAL_DEPARTMENTS } from '../data/professionals.js';
import { SERVICES } from '../data/services.js';
import { ROUTES } from '../constants/routes.js';

const routerFuture = { v7_startTransition: true, v7_relativeSplatPath: true };

describe('Phase 10 Professionals Experience Tests', () => {
  describe('Professionals Data Integrity', () => {
    it('contains valid and unique IDs and slugs for all clinicians', () => {
      const ids = PROFESSIONALS.map((p) => p.id);
      const slugs = PROFESSIONALS.map((p) => p.slug);

      expect(new Set(ids).size).toBe(PROFESSIONALS.length);
      expect(new Set(slugs).size).toBe(PROFESSIONALS.length);
    });

    it('ensures each professional has complete clinical data fields', () => {
      PROFESSIONALS.forEach((prof) => {
        expect(prof.id).toBeDefined();
        expect(prof.slug).toBeTruthy();
        expect(prof.name).toBeTruthy();
        expect(prof.role).toBeTruthy();
        expect(prof.department).toBeTruthy();
        expect(prof.specialty).toBeTruthy();
        expect(prof.credentials).toBeTruthy();
        expect(prof.shortBio).toBeTruthy();
        expect(prof.bio).toBeTruthy();
        expect(prof.philosophy).toBeTruthy();
        expect(typeof prof.experienceYears).toBe('number');
        expect(Array.isArray(prof.focusAreas)).toBe(true);
        expect(prof.focusAreas.length).toBeGreaterThan(0);
        expect(Array.isArray(prof.qualifications)).toBe(true);
        expect(prof.qualifications.length).toBeGreaterThan(0);
        expect(Array.isArray(prof.serviceSlugs)).toBe(true);
        expect(prof.serviceSlugs.length).toBeGreaterThan(0);
      });
    });

    it('ensures all connected serviceSlugs point to real existing services', () => {
      const validServiceSlugs = SERVICES.map((s) => s.slug);
      PROFESSIONALS.forEach((prof) => {
        prof.serviceSlugs.forEach((slug) => {
          expect(validServiceSlugs).toContain(slug);
        });
      });
    });
  });

  describe('Professionals Overview Page (/professionals)', () => {
    beforeEach(() => {
      render(
        <MemoryRouter initialEntries={['/professionals']} future={routerFuture}>
          <ProfessionalsPage />
        </MemoryRouter>
      );
    });

    it('renders single semantic H1 and hero indicators', () => {
      const headings = screen.getAllByRole('heading', { level: 1 });
      expect(headings).toHaveLength(1);
      expect(headings[0]).toHaveTextContent(/Meet the Physicians & Specialists Behind Healix/i);
    });

    it('renders interactive department filter tabs with counts', () => {
      const tablist = screen.getByRole('tablist', { name: /filter medical team by clinical department/i });
      expect(tablist).toBeInTheDocument();

      PROFESSIONAL_DEPARTMENTS.forEach((dept) => {
        expect(screen.getByRole('tab', { name: new RegExp(dept, 'i') })).toBeInTheDocument();
      });
    });

    it('renders all clinician cards with names and specialties', () => {
      expect(screen.getByRole('heading', { name: /Dr. Elena Vance, MD/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Dr. Marcus Chen, MD/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Dr. Sophia Patel, DO/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Dr. Alexander Wright, MD, PhD/i })).toBeInTheDocument();
    });

    it('filters clinicians when a department tab is selected', () => {
      const cardioTab = screen.getByRole('tab', { name: /Cardiovascular Medicine/i });
      fireEvent.click(cardioTab);

      expect(screen.getByRole('heading', { name: /Dr. Elena Vance, MD/i })).toBeInTheDocument();
      expect(screen.queryByRole('heading', { name: /Dr. Marcus Chen, MD/i })).not.toBeInTheDocument();
    });

    it('renders clinical governance standards and conversion CTA', () => {
      expect(screen.getByText(/Our Clinical Governance & Quality Standards/i)).toBeInTheDocument();
      expect(screen.getByText(/Board-Certified Excellence/i)).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Consult with Our Board-Certified/i })).toBeInTheDocument();
    });
  });

  describe('Professional Detail Page (/professionals/:slug)', () => {
    it('renders complete physician profile details for a valid slug', async () => {
      render(
        <MemoryRouter initialEntries={['/professionals/dr-elena-vance']} future={routerFuture}>
          <Routes>
            <Route path="/professionals/:slug" element={<ProfessionalDetailPage />} />
          </Routes>
        </MemoryRouter>
      );

      // Wait for loading to finish
      await waitFor(() => {
        expect(screen.queryByText(/Loading Physician Profile/i)).not.toBeInTheDocument();
      });

      // Semantic H1
      const headings = screen.getAllByRole('heading', { level: 1 });
      expect(headings).toHaveLength(1);
      expect(headings[0]).toHaveTextContent(/Dr. Elena Vance, MD/i);

      // Consultation snapshot card
      expect(screen.getByText(/Consultation Logistics/i)).toBeInTheDocument();

      // Biography and philosophy
      expect(screen.getByText(/Physician Background & Stewardship/i)).toBeInTheDocument();
      expect(screen.getByText(/Philosophy of Care/i)).toBeInTheDocument();

      // Clinical focus and qualifications
      expect(screen.getByText(/Clinical Focus & Sub-Specialties/i)).toBeInTheDocument();
      expect(screen.getByText(/Qualifications & Credentials/i)).toBeInTheDocument();

      // Supervised clinical services
      expect(screen.getByText(/Supervised Programs/i)).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Cardiovascular Diagnostics/i })).toBeInTheDocument();

      // Related colleagues & CTAs
      expect(screen.getByText(/Clinical Colleagues & Specialists/i)).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Consult Directly with/i })).toBeInTheDocument();
    });

    it('renders graceful 404 EmptyState for an invalid clinician slug', async () => {
      render(
        <MemoryRouter initialEntries={['/professionals/unknown-non-existent-clinician']} future={routerFuture}>
          <Routes>
            <Route path="/professionals/:slug" element={<ProfessionalDetailPage />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText(/Physician Profile Not Found/i)).toBeInTheDocument();
      });

      expect(screen.getByText(/Explore Medical Team/i)).toBeInTheDocument();
    });
  });
});
