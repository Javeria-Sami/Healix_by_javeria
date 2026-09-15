import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { ResourcesPage } from '../pages/ResourcesPage.jsx';
import { ResourceDetailPage } from '../pages/ResourceDetailPage.jsx';
import { ARTICLES, ARTICLE_CATEGORIES } from '../data/articles.js';

const routerFuture = { v7_startTransition: true, v7_relativeSplatPath: true };

describe('Resources & Blog Experience Tests (Phase 13)', () => {
  describe('Data Integrity & Architecture', () => {
    it('contains valid and complete article data', () => {
      expect(ARTICLES.length).toBeGreaterThanOrEqual(4);

      ARTICLES.forEach((article) => {
        expect(article.id).toBeTruthy();
        expect(article.slug).toBeTruthy();
        expect(article.title).toBeTruthy();
        expect(article.category).toBeTruthy();
        expect(article.readTime).toBeTruthy();
        expect(article.publishedDate).toBeTruthy();
        expect(article.author).toBeTruthy();
        expect(article.excerpt).toBeTruthy();
        expect(Array.isArray(article.tags)).toBe(true);
        expect(Array.isArray(article.serviceSlugs)).toBe(true);
      });
    });

    it('contains all standard resource categories', () => {
      expect(ARTICLE_CATEGORIES).toContain('All Resources');
      expect(ARTICLE_CATEGORIES).toContain('Cardiology');
      expect(ARTICLE_CATEGORIES).toContain('Metabolic Health');
      expect(ARTICLE_CATEGORIES).toContain('Executive Wellness');
      expect(ARTICLE_CATEGORIES).toContain('Genomics & Precision');
    });
  });

  describe('ResourcesPage Component', () => {
    it('renders the resources hero with semantic heading and breadcrumbs', () => {
      render(
        <MemoryRouter future={routerFuture}>
          <ResourcesPage />
        </MemoryRouter>
      );

      expect(
        screen.getByRole('heading', { level: 1, name: /Physician Perspectives on Preventative Longevity/i })
      ).toBeInTheDocument();
      expect(screen.getByText(/Medical Insights & Preventative Guides/i)).toBeInTheDocument();
    });

    it('renders category filter tablist with accessible roles', () => {
      render(
        <MemoryRouter future={routerFuture}>
          <ResourcesPage />
        </MemoryRouter>
      );

      const tablist = screen.getByRole('tablist', { name: /Filter resources by topic/i });
      expect(tablist).toBeInTheDocument();

      const tabs = screen.getAllByRole('tab');
      expect(tabs.length).toBe(ARTICLE_CATEGORIES.length);
    });

    it('filters articles when a category tab is clicked', () => {
      render(
        <MemoryRouter future={routerFuture}>
          <ResourcesPage />
        </MemoryRouter>
      );

      const metabolicTab = screen.getByRole('tab', { name: 'Metabolic Health' });
      fireEvent.click(metabolicTab);

      expect(metabolicTab).toHaveAttribute('aria-selected', 'true');
      expect(screen.getAllByText(/Metabolic Flexibility/i).length).toBeGreaterThan(0);
    });

    it('filters articles in real-time via search input', () => {
      render(
        <MemoryRouter future={routerFuture}>
          <ResourcesPage />
        </MemoryRouter>
      );

      const searchInput = screen.getByPlaceholderText(/Search resources & articles/i);
      fireEvent.change(searchInput, { target: { value: 'Genomics' } });

      expect(screen.getByText(/Clinical Genomics: Moving From Reactive Healthcare/i)).toBeInTheDocument();
    });

    it('shows empty state when no articles match and can reset filters', () => {
      render(
        <MemoryRouter future={routerFuture}>
          <ResourcesPage />
        </MemoryRouter>
      );

      const searchInput = screen.getByPlaceholderText(/Search resources & articles/i);
      fireEvent.change(searchInput, { target: { value: 'XYZNonExistentMedicalQuery123' } });

      expect(screen.getByText(/No Articles Located/i)).toBeInTheDocument();

      const resetBtn = screen.getByRole('button', { name: /Reset All Filters/i });
      fireEvent.click(resetBtn);

      expect(screen.getAllByText(/Beyond Standard Cholesterol/i).length).toBeGreaterThan(0);
    });

    it('renders the resources CTA', () => {
      render(
        <MemoryRouter future={routerFuture}>
          <ResourcesPage />
        </MemoryRouter>
      );

      expect(screen.getByRole('heading', { name: /Translate Clinical Research Into Personal Healthspan Action/i })).toBeInTheDocument();
    });
  });

  describe('ResourceDetailPage Component', () => {
    it('renders article detail view for valid slug with structured content', async () => {
      render(
        <MemoryRouter initialEntries={['/resources/understanding-preventative-cardiovascular-markers']} future={routerFuture}>
          <Routes>
            <Route path="/resources/:slug" element={<ResourceDetailPage />} />
          </Routes>
        </MemoryRouter>
      );

      expect(await screen.findByRole('heading', { level: 1, name: /Beyond Standard Cholesterol/i })).toBeInTheDocument();
      expect(screen.getByText(/Key Clinical Takeaways/i)).toBeInTheDocument();
      expect(screen.getByText(/The Limitations of Standard Fasting Lipid Panels/i)).toBeInTheDocument();
      expect(screen.getByText(/Article Author & Clinical Lead/i)).toBeInTheDocument();
      expect(screen.getByText(/Related Diagnostic Services & Programs/i)).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Have Questions on These Clinical Markers\?/i })).toBeInTheDocument();
    });

    it('renders 404 empty state for invalid slug', async () => {
      render(
        <MemoryRouter initialEntries={['/resources/invalid-non-existent-article-slug']} future={routerFuture}>
          <Routes>
            <Route path="/resources/:slug" element={<ResourceDetailPage />} />
          </Routes>
        </MemoryRouter>
      );

      expect(await screen.findByText(/Article Not Located/i)).toBeInTheDocument();
    });
  });
});
