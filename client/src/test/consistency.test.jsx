import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect } from 'vitest';

import { HomePage } from '../pages/HomePage.jsx';
import { AboutPage } from '../pages/AboutPage.jsx';
import { ServicesPage } from '../pages/ServicesPage.jsx';
import { ProfessionalsPage } from '../pages/ProfessionalsPage.jsx';
import { PlansPage } from '../pages/PlansPage.jsx';
import { PortfolioPage } from '../pages/PortfolioPage.jsx';
import { ResourcesPage } from '../pages/ResourcesPage.jsx';
import { FaqPage } from '../pages/FaqPage.jsx';
import { ContactPage } from '../pages/ContactPage.jsx';
import { NotFoundPage } from '../pages/NotFoundPage.jsx';
import { LegalPage } from '../pages/LegalPage.jsx';
import { Navbar } from '../components/navigation/Navbar.jsx';
import { Footer } from '../components/navigation/Footer.jsx';
import { Breadcrumb } from '../components/common/Breadcrumb.jsx';
import { EmptyState } from '../components/common/EmptyState.jsx';
import { Button } from '../components/common/Button.jsx';
import { ROUTES, NAV_LINKS } from '../constants/routes.js';

describe('Phase 17 — Global UX Refinement & Cross-Page Consistency Tests', () => {
  describe('Cross-Page Breadcrumb Architecture', () => {
    const pagesWithBreadcrumbs = [
      { name: 'AboutPage', element: <AboutPage />, initialEntry: ROUTES.ABOUT },
      { name: 'ServicesPage', element: <ServicesPage />, initialEntry: ROUTES.SERVICES },
      { name: 'ProfessionalsPage', element: <ProfessionalsPage />, initialEntry: ROUTES.PROFESSIONALS },
      { name: 'PlansPage', element: <PlansPage />, initialEntry: ROUTES.PLANS },
      { name: 'PortfolioPage', element: <PortfolioPage />, initialEntry: ROUTES.PORTFOLIO },
      { name: 'ResourcesPage', element: <ResourcesPage />, initialEntry: ROUTES.RESOURCES },
      { name: 'FaqPage', element: <FaqPage />, initialEntry: ROUTES.FAQ },
      { name: 'ContactPage', element: <ContactPage />, initialEntry: ROUTES.CONTACT },
      { name: 'LegalPage', element: <LegalPage />, initialEntry: ROUTES.PRIVACY },
    ];

    pagesWithBreadcrumbs.forEach(({ name, element, initialEntry }) => {
      it(`renders accessible breadcrumb trail on ${name}`, () => {
        render(
          <MemoryRouter initialEntries={[initialEntry]}>
            {element}
          </MemoryRouter>
        );

        const breadcrumbs = screen.getAllByRole('navigation', { name: /breadcrumb/i });
        expect(breadcrumbs.length).toBeGreaterThan(0);
        expect(screen.getAllByRole('link', { name: /^Home$/i }).length).toBeGreaterThan(0);
      });
    });
  });

  describe('Hero Hierarchy & Semantic Heading Integrity', () => {
    const pagesToAudit = [
      { name: 'HomePage', element: <HomePage />, path: ROUTES.HOME },
      { name: 'AboutPage', element: <AboutPage />, path: ROUTES.ABOUT },
      { name: 'ServicesPage', element: <ServicesPage />, path: ROUTES.SERVICES },
      { name: 'ProfessionalsPage', element: <ProfessionalsPage />, path: ROUTES.PROFESSIONALS },
      { name: 'PlansPage', element: <PlansPage />, path: ROUTES.PLANS },
      { name: 'PortfolioPage', element: <PortfolioPage />, path: ROUTES.PORTFOLIO },
      { name: 'ResourcesPage', element: <ResourcesPage />, path: ROUTES.RESOURCES },
      { name: 'FaqPage', element: <FaqPage />, path: ROUTES.FAQ },
      { name: 'ContactPage', element: <ContactPage />, path: ROUTES.CONTACT },
      { name: 'NotFoundPage', element: <NotFoundPage />, path: '/unknown-route' },
      { name: 'LegalPage', element: <LegalPage />, path: ROUTES.PRIVACY },
    ];

    pagesToAudit.forEach(({ name, element, path }) => {
      it(`verifies exactly one semantic H1 heading on ${name}`, () => {
        render(
          <MemoryRouter initialEntries={[path]}>
            {element}
          </MemoryRouter>
        );

        const h1s = screen.getAllByRole('heading', { level: 1 });
        expect(h1s).toHaveLength(1);
        expect(h1s[0]).toBeVisible();
      });
    });
  });

  describe('Unified Button Primitives & Interactive States', () => {
    it('renders Button component with correct variant classes', () => {
      const { container } = render(
        <MemoryRouter>
          <Button variant="primary">Primary Action</Button>
          <Button variant="secondary">Secondary Action</Button>
          <Button variant="outline">Outline Action</Button>
          <Button variant="ghost">Ghost Action</Button>
        </MemoryRouter>
      );

      expect(screen.getByRole('button', { name: /Primary Action/i })).toHaveClass('bg-primary');
      expect(screen.getByRole('button', { name: /Secondary Action/i })).toHaveClass('bg-secondary');
      expect(screen.getByRole('button', { name: /Outline Action/i })).toHaveClass('border');
      expect(screen.getByRole('button', { name: /Ghost Action/i })).toHaveClass('bg-transparent');
    });

    it('renders unified Button component on NotFoundPage (404 recovery)', () => {
      render(
        <MemoryRouter initialEntries={['/invalid-url']}>
          <NotFoundPage />
        </MemoryRouter>
      );

      const homeBtn = screen.getByRole('link', { name: /Back to Homepage/i });
      expect(homeBtn).toBeInTheDocument();
      expect(homeBtn).toHaveAttribute('href', ROUTES.HOME);

      const servicesBtn = screen.getByRole('link', { name: /Explore Services/i });
      expect(servicesBtn).toBeInTheDocument();
      expect(servicesBtn).toHaveAttribute('href', ROUTES.SERVICES);
    });
  });

  describe('Standardized EmptyState Component', () => {
    it('renders EmptyState with structured title, description, and action button', () => {
      render(
        <MemoryRouter>
          <EmptyState
            title="No Case Studies Found"
            description="No items match your active filters."
            action={<Button variant="primary">Reset Filters</Button>}
          />
        </MemoryRouter>
      );

      expect(screen.getByRole('heading', { name: /No Case Studies Found/i })).toBeInTheDocument();
      expect(screen.getByText(/No items match your active filters/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Reset Filters/i })).toBeInTheDocument();
    });
  });

  describe('Cross-Page Navigation Integrity', () => {
    it('verifies all Navbar links match defined application routes', () => {
      render(
        <MemoryRouter initialEntries={[ROUTES.HOME]}>
          <Navbar isMobileOpen={false} onToggleMobile={() => {}} />
        </MemoryRouter>
      );

      expect(screen.getByRole('link', { name: /healix.*home/i })).toHaveAttribute('href', ROUTES.HOME);
      expect(screen.getByRole('link', { name: /^about$/i })).toHaveAttribute('href', ROUTES.ABOUT);
      expect(screen.getByRole('link', { name: /^pharmacy$/i })).toHaveAttribute('href', ROUTES.PHARMACY);
      expect(screen.getByRole('link', { name: /^services$/i })).toHaveAttribute('href', ROUTES.SERVICES);
      expect(screen.getByRole('link', { name: /^insights$/i })).toHaveAttribute('href', ROUTES.INSIGHTS);
      expect(screen.getByRole('link', { name: /^contact$/i })).toHaveAttribute('href', ROUTES.CONTACT);
    });

    it('verifies Footer contains working links to all major areas and legal policies', () => {
      render(
        <MemoryRouter initialEntries={[ROUTES.HOME]}>
          <Footer />
        </MemoryRouter>
      );

      expect(screen.getByRole('link', { name: /About Healix/i })).toHaveAttribute('href', ROUTES.ABOUT);
      expect(screen.getByRole('link', { name: /Clinical Services/i })).toHaveAttribute('href', ROUTES.SERVICES);
      expect(screen.getByRole('link', { name: /Medical Specialists/i })).toHaveAttribute('href', ROUTES.PROFESSIONALS);
      expect(screen.getByRole('link', { name: /Preventative Care Plans/i })).toHaveAttribute('href', ROUTES.PLANS);
      expect(screen.getByRole('link', { name: /Privacy Policy/i })).toHaveAttribute('href', ROUTES.PRIVACY);
      expect(screen.getByRole('link', { name: /Terms of Service/i })).toHaveAttribute('href', ROUTES.TERMS);
      expect(screen.getByRole('link', { name: /Cookie Policy/i })).toHaveAttribute('href', ROUTES.COOKIES);
    });
  });
});
