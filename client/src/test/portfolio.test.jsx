import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { PortfolioPage } from '../pages/PortfolioPage.jsx';
import { PortfolioDetailPage } from '../pages/PortfolioDetailPage.jsx';
import { PROJECTS, PROJECT_CATEGORIES } from '../data/projects.js';

const routerFuture = { v7_startTransition: true, v7_relativeSplatPath: true };

describe('Portfolio Experience & Case Studies Tests (Phase 12)', () => {
  describe('Data Integrity & Architecture', () => {
    it('contains valid and complete case studies data', () => {
      expect(PROJECTS.length).toBeGreaterThanOrEqual(4);

      PROJECTS.forEach((project) => {
        expect(project.id).toBeTruthy();
        expect(project.slug).toBeTruthy();
        expect(project.title).toBeTruthy();
        expect(project.category).toBeTruthy();
        expect(project.summary).toBeTruthy();
        expect(project.challenge).toBeTruthy();
        expect(project.approach).toBeTruthy();
        expect(project.solution).toBeTruthy();
        expect(Array.isArray(project.outcomes)).toBe(true);
        expect(project.outcomes.length).toBeGreaterThan(0);
        expect(Array.isArray(project.tags)).toBe(true);
        expect(Array.isArray(project.serviceSlugs)).toBe(true);
      });
    });

    it('contains all standard project categories', () => {
      expect(PROJECT_CATEGORIES).toContain('All Projects');
      expect(PROJECT_CATEGORIES).toContain('Corporate Healthcare');
      expect(PROJECT_CATEGORIES).toContain('Clinical Innovation');
      expect(PROJECT_CATEGORIES).toContain('Preventative Diagnostics');
      expect(PROJECT_CATEGORIES).toContain('Longevity Medicine');
    });
  });

  describe('PortfolioPage Component', () => {
    it('renders the portfolio hero with heading and breadcrumbs', () => {
      render(
        <MemoryRouter future={routerFuture}>
          <PortfolioPage />
        </MemoryRouter>
      );

      expect(
        screen.getByRole('heading', { level: 1, name: /Clinical Deployments & Healthcare Case Studies/i })
      ).toBeInTheDocument();
      expect(screen.getByText(/Enterprise Workforce Health/i)).toBeInTheDocument();
    });

    it('renders category filter tablist with accessible roles', () => {
      render(
        <MemoryRouter future={routerFuture}>
          <PortfolioPage />
        </MemoryRouter>
      );

      const tablist = screen.getByRole('tablist', { name: /Filter case studies by category/i });
      expect(tablist).toBeInTheDocument();

      const tabs = screen.getAllByRole('tab');
      expect(tabs.length).toBe(PROJECT_CATEGORIES.length);
    });

    it('filters case studies when a category tab is clicked', () => {
      render(
        <MemoryRouter future={routerFuture}>
          <PortfolioPage />
        </MemoryRouter>
      );

      const corporateTab = screen.getByRole('tab', { name: 'Corporate Healthcare' });
      fireEvent.click(corporateTab);

      expect(corporateTab).toHaveAttribute('aria-selected', 'true');
      expect(screen.getAllByText(/Enterprise Preventative Cardiac Health Initiative/i).length).toBeGreaterThan(0);
    });

    it('filters case studies in real-time via search input', () => {
      render(
        <MemoryRouter future={routerFuture}>
          <PortfolioPage />
        </MemoryRouter>
      );

      const searchInput = screen.getByPlaceholderText(/Search case studies/i);
      fireEvent.change(searchInput, { target: { value: 'Genomics' } });

      expect(screen.getByText(/Preventative Clinical Genomics Integration/i)).toBeInTheDocument();
    });

    it('shows empty state when no case studies match and can reset filters', () => {
      render(
        <MemoryRouter future={routerFuture}>
          <PortfolioPage />
        </MemoryRouter>
      );

      const searchInput = screen.getByPlaceholderText(/Search case studies/i);
      fireEvent.change(searchInput, { target: { value: 'XYZNonExistentCaseStudyQuery' } });

      expect(screen.getByText(/No Case Studies Found/i)).toBeInTheDocument();

      const resetBtn = screen.getByRole('button', { name: /Reset All Filters/i });
      fireEvent.click(resetBtn);

      expect(screen.getAllByText(/Enterprise Preventative Cardiac Health Initiative/i).length).toBeGreaterThan(0);
    });

    it('renders deployment capabilities section and CTA', () => {
      render(
        <MemoryRouter future={routerFuture}>
          <PortfolioPage />
        </MemoryRouter>
      );

      expect(screen.getByRole('heading', { name: /Healix Deployment Capabilities/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Ready to Modernize Health Outcomes for Your Organization\?/i })).toBeInTheDocument();
    });
  });

  describe('PortfolioDetailPage Component', () => {
    it('renders project detail view for valid slug', async () => {
      render(
        <MemoryRouter initialEntries={['/portfolio/rapid-cardiac-risk-screening-initiative']} future={routerFuture}>
          <Routes>
            <Route path="/portfolio/:slug" element={<PortfolioDetailPage />} />
          </Routes>
        </MemoryRouter>
      );

      expect(await screen.findByRole('heading', { level: 1, name: /Enterprise Preventative Cardiac Health Initiative/i })).toBeInTheDocument();
      expect(screen.getByText(/The Healthcare & Diagnostic Challenge/i)).toBeInTheDocument();
      expect(screen.getByText(/Healix Clinical & Engineering Approach/i)).toBeInTheDocument();
      expect(screen.getByText(/Deployed Clinical Solution & Architecture/i)).toBeInTheDocument();
      expect(screen.getByText(/Connected Clinical Services/i)).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Explore a Tailored Initiative for Your Team/i })).toBeInTheDocument();
    });

    it('renders 404 empty state for invalid slug', async () => {
      render(
        <MemoryRouter initialEntries={['/portfolio/invalid-non-existent-slug']} future={routerFuture}>
          <Routes>
            <Route path="/portfolio/:slug" element={<PortfolioDetailPage />} />
          </Routes>
        </MemoryRouter>
      );

      expect(await screen.findByText(/Case Study Not Found/i)).toBeInTheDocument();
    });
  });
});
