import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

import { AppRoutes } from '../routes/AppRoutes.jsx';
import { CardMedia } from '../components/cards/Card.jsx';
import { HeroSection } from '../sections/home/HeroSection.jsx';
import { ResourcesGrid } from '../sections/resources/ResourcesGrid.jsx';
import { ARTICLES } from '../data/articles.js';

describe('Phase 19 — Performance Optimization & Core Web Vitals Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Route Code Splitting & Dynamic Imports', () => {
    it('renders HomePage asynchronously via dynamic import and Suspense boundary', async () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <AppRoutes />
        </MemoryRouter>
      );

      // Verify that the async HomePage resolves and displays the primary H1
      await waitFor(
        () => {
          expect(
            screen.getByRole('heading', { level: 1, name: /reliable medicines|healthcare/i })
          ).toBeInTheDocument();
        },
        { timeout: 4000 }
      );
    });

    it('renders ContactPage asynchronously on /contact route navigation', async () => {
      render(
        <MemoryRouter initialEntries={['/contact']}>
          <AppRoutes />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(
          screen.getByRole('heading', { level: 1, name: /connect with our clinical concierge team/i })
        ).toBeInTheDocument();
      });
    });
  });

  describe('Cumulative Layout Shift (CLS) Safeguards & Media Constraints', () => {
    it('renders CardMedia with explicit aspect-ratio container to prevent layout shifting', () => {
      const { container } = render(
        <CardMedia
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d"
          alt="Clinical Diagnostics"
          aspectRatio="aspect-[16/9]"
        />
      );

      const mediaWrapper = container.firstChild;
      expect(mediaWrapper).toHaveClass('aspect-[16/9]');
      expect(mediaWrapper).toHaveClass('overflow-hidden');

      const img = screen.getByRole('img', { name: /clinical diagnostics/i });
      expect(img).toHaveAttribute('loading', 'lazy');
      expect(img).toHaveClass('object-cover');
    });

    it('renders image cards in ResourcesGrid with lazy loading enabled', () => {
      render(
        <MemoryRouter>
          <ResourcesGrid articles={ARTICLES.slice(0, 3)} />
        </MemoryRouter>
      );

      const images = screen.getAllByRole('img');
      expect(images.length).toBeGreaterThan(0);
      images.forEach((img) => {
        expect(img).toHaveAttribute('loading', 'lazy');
      });
    });
  });

  describe('Largest Contentful Paint (LCP) DOM Prioritization', () => {
    it('renders HeroSection with high-priority semantic DOM hierarchy and no blocking overlays', () => {
      render(
        <MemoryRouter>
          <HeroSection />
        </MemoryRouter>
      );

      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toBeInTheDocument();
      expect(h1).toHaveClass('font-extrabold');

      // Verify actionable discovery CTAs are rendered above the fold
      const orderMedCta = screen.getByRole('link', { name: /order medicines/i });
      expect(orderMedCta).toBeInTheDocument();
      expect(orderMedCta).toHaveAttribute('href', '/pharmacy');
    });
  });
});
