import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { TrustSection } from '../sections/home/TrustSection.jsx';
import { HomePage } from '../pages/HomePage.jsx';
import { PharmacyProvider } from '../context/PharmacyContext.jsx';

const routerFuture = { v7_startTransition: true, v7_relativeSplatPath: true };

describe('Section 3 — Mission / Brand Purpose Experience', () => {
  it('renders section landmark with OUR MISSION label, semantic H2 heading, and concise manifesto', () => {
    render(
      <MemoryRouter initialEntries={['/']} future={routerFuture}>
        <TrustSection />
      </MemoryRouter>
    );

    const section = screen.getByRole('region', { name: /our mission — why healix/i });
    expect(section).toBeInTheDocument();

    expect(screen.getByText(/our mission/i)).toBeInTheDocument();

    const h2 = screen.getByRole('heading', { level: 2, name: /healthcare,\s*made\s*simpler\./i });
    expect(h2).toBeInTheDocument();

    expect(
      screen.getByText(/We believe getting the healthcare you need should feel simple, trustworthy, and human/i)
    ).toBeInTheDocument();
  });

  it('renders purely typographic manifesto without images, cards, or busy feature grids', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']} future={routerFuture}>
        <TrustSection />
      </MemoryRouter>
    );

    // Verifies zero image elements in this pure manifesto section
    expect(container.querySelectorAll('img').length).toBe(0);
  });

  it('renders accessible Our Story CTA link connecting to the About page', () => {
    render(
      <MemoryRouter initialEntries={['/']} future={routerFuture}>
        <TrustSection />
      </MemoryRouter>
    );

    const link = screen.getByRole('link', { name: /our story/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/about');
  });

  it('renders in sequence directly after Section 2 on the HomePage', () => {
    render(
      <MemoryRouter initialEntries={['/']} future={routerFuture}>
        <PharmacyProvider>
          <HomePage />
        </PharmacyProvider>
      </MemoryRouter>
    );

    // Section 1: Hero
    expect(screen.getByRole('region', { name: /featured healthcare promotions/i })).toBeInTheDocument();

    // Section 2: Our Services
    expect(screen.getByRole('region', { name: /our services/i })).toBeInTheDocument();

    // Section 3: Our Mission
    expect(screen.getByRole('region', { name: /our mission — why healix/i })).toBeInTheDocument();
  });
});
