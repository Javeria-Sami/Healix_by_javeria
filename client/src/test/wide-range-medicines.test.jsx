import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { WideRangeMedicinesSection } from '../sections/home/WideRangeMedicinesSection.jsx';
import { HomePage } from '../pages/HomePage.jsx';
import { PharmacyProvider } from '../context/PharmacyContext.jsx';

const routerFuture = { v7_startTransition: true, v7_relativeSplatPath: true };

describe('Section 4 — Wide Range of Medicines / Pharmacy Discovery Experience', () => {
  it('renders section landmark with PHARMACY eyebrow, semantic H2 heading, and supporting copy', () => {
    render(
      <MemoryRouter initialEntries={['/']} future={routerFuture}>
        <PharmacyProvider>
          <WideRangeMedicinesSection />
        </PharmacyProvider>
      </MemoryRouter>
    );

    const section = screen.getByRole('region', { name: /wide range of medicines/i });
    expect(section).toBeInTheDocument();

    expect(screen.getByText('PHARMACY')).toBeInTheDocument();

    const h2 = screen.getByRole('heading', { level: 2, name: /wide range of medicines/i });
    expect(h2).toBeInTheDocument();

    expect(
      screen.getByText(/Explore genuine medicines and everyday health essentials from trusted brands/i)
    ).toBeInTheDocument();
  });

  it('renders category navigation tabs and filters products on click', () => {
    render(
      <MemoryRouter initialEntries={['/']} future={routerFuture}>
        <PharmacyProvider>
          <WideRangeMedicinesSection />
        </PharmacyProvider>
      </MemoryRouter>
    );

    const allTab = screen.getByRole('tab', { name: /all/i });
    const painTab = screen.getByRole('tab', { name: /pain relief/i });
    const coldTab = screen.getByRole('tab', { name: /cold & flu/i });

    expect(allTab).toHaveAttribute('aria-selected', 'true');
    expect(painTab).toBeInTheDocument();
    expect(coldTab).toBeInTheDocument();

    // Click on Pain Relief category tab
    fireEvent.click(painTab);
    expect(painTab).toHaveAttribute('aria-selected', 'true');
    expect(allTab).toHaveAttribute('aria-selected', 'false');
  });

  it('renders featured product and secondary product cards with authentic prices in Rs.', () => {
    render(
      <MemoryRouter initialEntries={['/']} future={routerFuture}>
        <PharmacyProvider>
          <WideRangeMedicinesSection />
        </PharmacyProvider>
      </MemoryRouter>
    );

    // Featured Product: Benclin
    expect(screen.getByRole('heading', { level: 3, name: /benclin/i })).toBeInTheDocument();
    expect(screen.getByText(/rs\.\s*496/i)).toBeInTheDocument();

    // Secondary Grid Products
    expect(screen.getByRole('heading', { level: 3, name: /citanew/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /alp/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /brufen/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /arinac forte/i })).toBeInTheDocument();
  });

  it('provides accessible Add to Cart button that provides immediate visual feedback', () => {
    render(
      <MemoryRouter initialEntries={['/']} future={routerFuture}>
        <PharmacyProvider>
          <WideRangeMedicinesSection />
        </PharmacyProvider>
      </MemoryRouter>
    );

    const addBtns = screen.getAllByRole('button', { name: /add .* to cart/i });
    expect(addBtns.length).toBeGreaterThan(0);

    // Click Add to Cart on the first item
    fireEvent.click(addBtns[0]);
    expect(screen.getByText(/added ✓/i)).toBeInTheDocument();
  });

  it('renders link to View Online Pharmacy catalog', () => {
    render(
      <MemoryRouter initialEntries={['/']} future={routerFuture}>
        <PharmacyProvider>
          <WideRangeMedicinesSection />
        </PharmacyProvider>
      </MemoryRouter>
    );

    const links = screen.getAllByRole('link', { name: /view online pharmacy/i });
    expect(links.length).toBeGreaterThan(0);
    expect(links[0]).toHaveAttribute('href', '/pharmacy');
  });

  it('renders seamlessly as Section 4 on the HomePage composition', () => {
    render(
      <MemoryRouter initialEntries={['/']} future={routerFuture}>
        <PharmacyProvider>
          <HomePage />
        </PharmacyProvider>
      </MemoryRouter>
    );

    // Section 1: Hero
    expect(screen.getByRole('region', { name: /featured healthcare promotions/i })).toBeInTheDocument();

    // Section 2: Pharmacy Services
    expect(screen.getByRole('region', { name: /pharmacy services/i })).toBeInTheDocument();

    // Section 3: Our Mission
    expect(screen.getByRole('region', { name: /our mission — why healix/i })).toBeInTheDocument();

    // Section 4: Wide Range of Medicines
    expect(screen.getByRole('region', { name: /wide range of medicines/i })).toBeInTheDocument();
  });
});
