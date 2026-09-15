import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { PrimaryServicesSection, PHARMACY_SERVICES } from '../sections/home/PrimaryServicesSection.jsx';
import { HomePage } from '../pages/HomePage.jsx';
import { PharmacyProvider } from '../context/PharmacyContext.jsx';

const routerFuture = { v7_startTransition: true, v7_relativeSplatPath: true };

describe('Section 2 — Simple Pharmacy Care, Built Around You / Pharmacy Services', () => {
  it('renders section landmark with semantic H2 heading, eyebrow and reassuring description', () => {
    render(
      <MemoryRouter initialEntries={['/']} future={routerFuture}>
        <PharmacyProvider>
          <PrimaryServicesSection />
        </PharmacyProvider>
      </MemoryRouter>
    );

    const section = screen.getByRole('region', { name: /pharmacy services/i });
    expect(section).toBeInTheDocument();

    expect(screen.getByText(/pharmacy services/i)).toBeInTheDocument();

    const h2 = screen.getByRole('heading', { level: 2, name: /simple pharmacy care,\s*built around you/i });
    expect(h2).toBeInTheDocument();

    expect(
      screen.getByText(/trusted medicines, clear guidance, and convenient support when you need it\./i)
    ).toBeInTheDocument();
  });

  it('renders all 4 concise pharmacy service items with numbers, titles, and descriptions', () => {
    render(
      <MemoryRouter initialEntries={['/']} future={routerFuture}>
        <PharmacyProvider>
          <PrimaryServicesSection />
        </PharmacyProvider>
      </MemoryRouter>
    );

    expect(PHARMACY_SERVICES).toHaveLength(4);

    // 01 Prescription Medicines
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /prescription medicines/i })).toBeInTheDocument();
    expect(screen.getByText(/verified medicines with trusted pharmacist support\./i)).toBeInTheDocument();

    // 02 Everyday Health
    expect(screen.getByText('02')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /everyday health/i })).toBeInTheDocument();
    expect(screen.getByText(/otc medicines, vitamins, and essential wellness products\./i)).toBeInTheDocument();

    // 03 Pharmacist Guidance
    expect(screen.getByText('03')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /pharmacist guidance/i })).toBeInTheDocument();
    expect(screen.getByText(/clear, practical advice for safer medication use\./i)).toBeInTheDocument();

    // 04 Easy Ordering
    expect(screen.getByText('04')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /easy ordering/i })).toBeInTheDocument();
    expect(screen.getByText(/simple ordering with convenient doorstep delivery\./i)).toBeInTheDocument();
  });

  it('renders primary CTA button and service card navigation links connecting to valid destinations', () => {
    render(
      <MemoryRouter initialEntries={['/']} future={routerFuture}>
        <PharmacyProvider>
          <PrimaryServicesSection />
        </PharmacyProvider>
      </MemoryRouter>
    );

    // Primary CTA
    const primaryCta = screen.getByRole('link', { name: /explore pharmacy/i });
    expect(primaryCta).toHaveAttribute('href', '/pharmacy');

    // Service card links
    const prescriptionCard = screen.getByRole('link', { name: /prescription medicines/i });
    expect(prescriptionCard).toHaveAttribute('href', '/pharmacy/prescription');

    const everydayHealthCard = screen.getByRole('link', { name: /everyday health/i });
    expect(everydayHealthCard).toHaveAttribute('href', '/pharmacy/categories');

    const guidanceCard = screen.getByRole('link', { name: /pharmacist guidance/i });
    expect(guidanceCard).toHaveAttribute('href', '/contact');

    const easyOrderingCard = screen.getByRole('link', { name: /easy ordering/i });
    expect(easyOrderingCard).toHaveAttribute('href', '/pharmacy/medicines');
  });

  it('renders standalone PrimaryServicesSection component with required sections', () => {
    render(
      <MemoryRouter initialEntries={['/']} future={routerFuture}>
        <PharmacyProvider>
          <PrimaryServicesSection />
        </PharmacyProvider>
      </MemoryRouter>
    );

    expect(screen.getByRole('region', { name: /pharmacy services/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /simple pharmacy care,\s*built around you/i })).toBeInTheDocument();
  });
});

