import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { PrimaryServicesSection } from '../sections/home/PrimaryServicesSection.jsx';
import { HomePage } from '../pages/HomePage.jsx';
import { PharmacyProvider } from '../context/PharmacyContext.jsx';

const routerFuture = { v7_startTransition: true, v7_relativeSplatPath: true };

describe('Section 2 — How Can We Help You? / Our Services Experience', () => {
  it('renders section landmark with semantic H2 heading, eyebrow and description', () => {
    render(
      <MemoryRouter initialEntries={['/']} future={routerFuture}>
        <PharmacyProvider>
          <PrimaryServicesSection />
        </PharmacyProvider>
      </MemoryRouter>
    );

    const section = screen.getByRole('region', { name: /our services/i });
    expect(section).toBeInTheDocument();

    expect(screen.getByText(/our services/i)).toBeInTheDocument();

    const h2 = screen.getByRole('heading', { level: 2, name: /how can we help\s*you\?/i });
    expect(h2).toBeInTheDocument();

    expect(
      screen.getByText(/quick, reliable and convenient healthcare services — all in one place\./i)
    ).toBeInTheDocument();
  });

  it('renders both Pharmacy and Diagnostics service cards with authentic features and imagery', () => {
    render(
      <MemoryRouter initialEntries={['/']} future={routerFuture}>
        <PharmacyProvider>
          <PrimaryServicesSection />
        </PharmacyProvider>
      </MemoryRouter>
    );

    // Card 1: Pharmacy / Order Medicines
    expect(screen.getByText(/pharmacy/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /order medicines/i })).toBeInTheDocument();
    expect(screen.getByText(/get genuine medicines from trusted brands, delivered to your doorstep\./i)).toBeInTheDocument();
    expect(screen.getByText(/genuine products/i)).toBeInTheDocument();
    expect(screen.getByText(/fast delivery/i)).toBeInTheDocument();
    expect(screen.getByText(/care you can trust/i)).toBeInTheDocument();

    // Card 2: Diagnostics / Book Lab Tests
    expect(screen.getByText(/diagnostics/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /book lab tests/i })).toBeInTheDocument();
    expect(screen.getByText(/home-sampling & in-lab bookings at your convenience\./i)).toBeInTheDocument();
    expect(screen.getByText(/accurate results/i)).toBeInTheDocument();
    expect(screen.getByText(/home collection/i)).toBeInTheDocument();
    expect(screen.getByText(/easy scheduling/i)).toBeInTheDocument();
  });

  it('renders interactive CTA buttons linking to pharmacy and diagnostics', () => {
    render(
      <MemoryRouter initialEntries={['/']} future={routerFuture}>
        <PharmacyProvider>
          <PrimaryServicesSection />
        </PharmacyProvider>
      </MemoryRouter>
    );

    // Pharmacy CTA
    const orderBtn = screen.getByRole('link', { name: /order medicines/i });
    expect(orderBtn).toHaveAttribute('href', '/pharmacy');

    // Diagnostics CTA
    const labBtn = screen.getByRole('link', { name: /book a lab test/i });
    expect(labBtn).toHaveAttribute('href', '/lab-tests');
  });

  it('renders seamlessly as Section 2 directly following the Hero on HomePage', () => {
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
    expect(screen.getByRole('heading', { level: 2, name: /how can we help\s*you\?/i })).toBeInTheDocument();
  });
});
