import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import fs from 'fs';
import path from 'path';

import { AppRoutes } from '../routes/AppRoutes.jsx';
import { Navbar } from '../components/navigation/Navbar.jsx';
import { Footer } from '../components/navigation/Footer.jsx';

describe('Phase 22 — Production Deployment & Smoke Verification Suite', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.title = '';
  });

  describe('1. Static Deliverables & Crawler Assets Smoke Check', () => {
    it('verifies public favicon.svg exists and is non-empty', () => {
      const faviconPath = path.resolve(__dirname, '../../public/favicon.svg');
      expect(fs.existsSync(faviconPath)).toBe(true);
      const content = fs.readFileSync(faviconPath, 'utf8');
      expect(content).toContain('<svg');
    });

    it('verifies public robots.txt exists and specifies crawler rules', () => {
      const robotsPath = path.resolve(__dirname, '../../public/robots.txt');
      expect(fs.existsSync(robotsPath)).toBe(true);
      const content = fs.readFileSync(robotsPath, 'utf8');
      expect(content).toContain('User-agent: *');
      expect(content).toContain('Sitemap: https://healix.health/sitemap.xml');
    });

    it('verifies public sitemap.xml exists and specifies valid XML urlset', () => {
      const sitemapPath = path.resolve(__dirname, '../../public/sitemap.xml');
      expect(fs.existsSync(sitemapPath)).toBe(true);
      const content = fs.readFileSync(sitemapPath, 'utf8');
      expect(content).toContain('<urlset');
      expect(content).toContain('https://healix.health/');
    });
  });

  describe('2. Core Route Resolution & Deep Linking Smoke Tests', () => {
    it('renders / (HomePage) successfully', async () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <AppRoutes />
        </MemoryRouter>
      );

      await waitFor(
        () => {
          expect(
            screen.getByRole('heading', { level: 1, name: /reliable medicines|healthcare/i })
          ).toBeInTheDocument();
        },
        { timeout: 4000 }
      );
    });

    it('renders /about (AboutPage) successfully', async () => {
      render(
        <MemoryRouter initialEntries={['/about']}>
          <AppRoutes />
        </MemoryRouter>
      );

      await waitFor(
        () => {
          expect(
            screen.getByRole('heading', { level: 1, name: /human-centered medicine/i })
          ).toBeInTheDocument();
        },
        { timeout: 4000 }
      );
    });

    it('renders /services (ServicesPage) successfully', async () => {
      render(
        <MemoryRouter initialEntries={['/services']}>
          <AppRoutes />
        </MemoryRouter>
      );

      await waitFor(
        () => {
          expect(
            screen.getByRole('heading', { level: 1, name: /proactive healthcare/i })
          ).toBeInTheDocument();
        },
        { timeout: 4000 }
      );
    });

    it('renders /services/:slug (ServiceDetailPage) for valid slug', async () => {
      render(
        <MemoryRouter initialEntries={['/services/preventive-health-screenings']}>
          <AppRoutes />
        </MemoryRouter>
      );

      await waitFor(
        () => {
          expect(
            screen.getByRole('heading', { level: 1, name: /comprehensive preventive care/i })
          ).toBeInTheDocument();
        },
        { timeout: 4000 }
      );
    });

    it('renders /professionals (ProfessionalsPage) successfully', async () => {
      render(
        <MemoryRouter initialEntries={['/professionals']}>
          <AppRoutes />
        </MemoryRouter>
      );

      await waitFor(
        () => {
          expect(
            screen.getByRole('heading', { level: 1, name: /physicians & specialists/i })
          ).toBeInTheDocument();
        },
        { timeout: 4000 }
      );
    });

    it('renders /plans (PlansPage) successfully', async () => {
      render(
        <MemoryRouter initialEntries={['/plans']}>
          <AppRoutes />
        </MemoryRouter>
      );

      await waitFor(
        () => {
          expect(
            screen.getByRole('heading', { level: 1, name: /transparent.*preventative healthcare/i })
          ).toBeInTheDocument();
        },
        { timeout: 4000 }
      );
    });

    it('renders /contact (ContactPage) successfully', async () => {
      render(
        <MemoryRouter initialEntries={['/contact']}>
          <AppRoutes />
        </MemoryRouter>
      );

      await waitFor(
        () => {
          expect(
            screen.getByRole('heading', { level: 1, name: /connect with our.*clinical concierge team/i })
          ).toBeInTheDocument();
        },
        { timeout: 4000 }
      );
    });

    it('renders 404 NotFoundPage on unmapped routes with noindex directive', async () => {
      render(
        <MemoryRouter initialEntries={['/unmapped-clinical-route']}>
          <AppRoutes />
        </MemoryRouter>
      );

      await waitFor(
        () => {
          expect(
            screen.getByRole('heading', { level: 1, name: /page not located/i })
          ).toBeInTheDocument();
        },
        { timeout: 4000 }
      );

      await waitFor(() => {
        const robotsMeta = document.querySelector('meta[name="robots"]');
        expect(robotsMeta?.getAttribute('content')).toBe('noindex, nofollow');
      });
    });
  });

  describe('3. Production Application Shell & Landmark Verification', () => {
    it('renders navigation header with active links and logo brand mark', () => {
      render(
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      );

      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByRole('navigation', { name: /primary navigation/i })).toBeInTheDocument();
      expect(screen.getByText('Healix')).toBeInTheDocument();
    });

    it('renders global footer with regulatory notices and quick navigation links', () => {
      render(
        <MemoryRouter>
          <Footer />
        </MemoryRouter>
      );

      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
      expect(screen.getByText(/terms of service/i)).toBeInTheDocument();
      expect(screen.getByText(/privacy policy/i)).toBeInTheDocument();
    });
  });
});
