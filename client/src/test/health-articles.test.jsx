import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { HealthArticlesSection, HEALTH_ARTICLES } from '../sections/home/HealthArticlesSection.jsx';
import { HomePage } from '../pages/HomePage.jsx';
import { PharmacyProvider } from '../context/PharmacyContext.jsx';

const routerFuture = { v7_startTransition: true, v7_relativeSplatPath: true };

describe('Section 5 — Health Articles / News & Articles Experience', () => {
  it('renders section landmark with HEALTH & WELLNESS eyebrow, semantic H2 heading, and description', () => {
    render(
      <MemoryRouter future={routerFuture}>
        <HealthArticlesSection />
      </MemoryRouter>
    );

    const section = screen.getByRole('region', { name: /helpful reads for better health/i });
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('id', 'health-articles');

    expect(screen.getByText(/health & wellness/i)).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: /helpful reads for better health/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/simple, reliable information for everyday health\./i)
    ).toBeInTheDocument();
  });

  it('renders exactly 3 minimal-text editorial article cards with short titles and dominant imagery', () => {
    render(
      <MemoryRouter future={routerFuture}>
        <HealthArticlesSection />
      </MemoryRouter>
    );

    const articleElements = screen.getAllByRole('article');
    expect(articleElements).toHaveLength(3);

    // Verify each article contains category, short title, and image without unnecessary metadata
    HEALTH_ARTICLES.forEach((item, index) => {
      const card = articleElements[index];
      expect(card).toHaveTextContent(item.category);
      expect(card).toHaveTextContent(item.title);
      const img = screen.getByAltText(item.imageAlt);
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', item.imageUrl);
    });
  });

  it('renders understated "View All Articles" link pointing to /resources', () => {
    render(
      <MemoryRouter future={routerFuture}>
        <HealthArticlesSection />
      </MemoryRouter>
    );

    const viewAllLink = screen.getByRole('link', { name: /view all articles/i });
    expect(viewAllLink).toBeInTheDocument();
    expect(viewAllLink).toHaveAttribute('href', '/resources');
  });

  it('renders seamlessly as Section 5 on the HomePage composition', () => {
    render(
      <MemoryRouter initialEntries={['/']} future={routerFuture}>
        <PharmacyProvider>
          <HomePage />
        </PharmacyProvider>
      </MemoryRouter>
    );

    // Verify all 4 home sections in sequence
    expect(screen.getByRole('heading', { level: 1, name: /reliable medicines/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /healthcare,\s*made\s*simpler\./i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /wide range of medicines/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /helpful reads for better health/i })).toBeInTheDocument();
  });
});
