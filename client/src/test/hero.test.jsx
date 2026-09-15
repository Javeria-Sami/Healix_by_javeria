import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { HeroSection } from '../sections/home/HeroSection.jsx';
import { HomePage } from '../pages/HomePage.jsx';
import { Navbar } from '../components/navigation/Navbar.jsx';
import { LocationSelector } from '../components/navigation/LocationSelector.jsx';
import { PharmacyProvider } from '../context/PharmacyContext.jsx';

const routerFuture = { v7_startTransition: true, v7_relativeSplatPath: true };

describe('Section 1 — Header & Primary Healthcare Discovery Promotional Hero Experience', () => {
  it('renders exactly one semantic H1 heading on HomePage', () => {
    render(
      <MemoryRouter initialEntries={['/']} future={routerFuture}>
        <PharmacyProvider>
          <HeroSection />
        </PharmacyProvider>
      </MemoryRouter>
    );

    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(/Reliable Medicines/i);
    expect(headings[0]).toHaveTextContent(/for a Healthier You/i);
  });

  it('renders category eyebrow and micro-features for active slide', () => {
    render(
      <MemoryRouter initialEntries={['/']} future={routerFuture}>
        <PharmacyProvider>
          <HeroSection />
        </PharmacyProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/PHARMACY/i)).toBeInTheDocument();
    expect(screen.getByText(/Genuine Products/i)).toBeInTheDocument();
    expect(screen.getByText(/Convenient Delivery/i)).toBeInTheDocument();
    expect(screen.getByText(/Care for Every Family/i)).toBeInTheDocument();
  });

  it('renders primary CTA for active slide and navigates to proper destination', () => {
    render(
      <MemoryRouter initialEntries={['/']} future={routerFuture}>
        <PharmacyProvider>
          <HeroSection />
        </PharmacyProvider>
      </MemoryRouter>
    );

    const orderMedLink = screen.getByRole('link', { name: /order medicines now/i });
    expect(orderMedLink).toBeInTheDocument();
    expect(orderMedLink).toHaveAttribute('href', '/pharmacy');
  });

  it('renders active slide hero banner image', () => {
    render(
      <MemoryRouter initialEntries={['/']} future={routerFuture}>
        <PharmacyProvider>
          <HeroSection />
        </PharmacyProvider>
      </MemoryRouter>
    );

    const imgs = screen.getAllByRole('img');
    expect(imgs.length).toBeGreaterThanOrEqual(1);
    expect(imgs[0]).toHaveAttribute('src', '/images/hero_subject_1.png');
  });

  it('allows navigating between promotional carousel slides via circular controls and indicators', () => {
    render(
      <MemoryRouter initialEntries={['/']} future={routerFuture}>
        <PharmacyProvider>
          <HeroSection />
        </PharmacyProvider>
      </MemoryRouter>
    );

    const nextBtn = screen.getByRole('button', { name: /next promotional slide/i });
    const prevBtn = screen.getByRole('button', { name: /previous promotional slide/i });

    // Move to next slide (Slide 2: Lab Tests)
    act(() => {
      fireEvent.click(nextBtn);
    });

    expect(screen.getByRole('link', { name: /book a lab test now/i })).toBeInTheDocument();

    // Move back to previous slide (Slide 1: Pharmacy)
    act(() => {
      fireEvent.click(prevBtn);
    });

    expect(screen.getByRole('link', { name: /order medicines now/i })).toBeInTheDocument();

    // Click tab 3 (Slide 3: Your Health Partner)
    const tab3 = screen.getByRole('tab', { name: /slide 3: your health partner/i });
    act(() => {
      fireEvent.click(tab3);
    });

    expect(screen.getByRole('link', { name: /explore healix/i })).toBeInTheDocument();
  });

  it('renders LocationSelector and allows city selection with persistence', () => {
    render(
      <MemoryRouter initialEntries={['/']} future={routerFuture}>
        <PharmacyProvider>
          <LocationSelector />
        </PharmacyProvider>
      </MemoryRouter>
    );

    const locationTrigger = screen.getByRole('button', { name: /deliver to/i });
    expect(locationTrigger).toBeInTheDocument();

    // Open selector dialog
    act(() => {
      fireEvent.click(locationTrigger);
    });

    expect(screen.getByRole('dialog', { name: /select delivery city/i })).toBeInTheDocument();
    const karachiOptions = screen.getAllByRole('button', { name: /karachi/i });
    expect(karachiOptions.length).toBeGreaterThan(0);

    // Select Karachi
    act(() => {
      fireEvent.click(karachiOptions[0]);
    });

    expect(screen.getByText(/Karachi/i)).toBeInTheDocument();
  });

  it('verifies Header has brand mark linking to / with NO Home link and NO account/login items', () => {
    render(
      <MemoryRouter initialEntries={['/']} future={routerFuture}>
        <PharmacyProvider>
          <Navbar />
        </PharmacyProvider>
      </MemoryRouter>
    );

    // Brand mark navigates to /
    const logoLink = screen.getByLabelText(/healix healthcare homepage/i);
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');

    // No "Home" navigation link text
    expect(screen.queryByRole('link', { name: /^home$/i })).not.toBeInTheDocument();

    // No account, sign in, or sign up
    expect(screen.queryByRole('link', { name: /sign in|sign up|login|register|my account|profile/i })).not.toBeInTheDocument();
  });

  it('renders complete Section 1 seamlessly within HomePage composition', () => {
    render(
      <MemoryRouter initialEntries={['/']} future={routerFuture}>
        <PharmacyProvider>
          <HomePage />
        </PharmacyProvider>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1, name: /Reliable Medicines\s*for a Healthier You/i })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: /featured healthcare promotions/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Wide Range of Medicines/i })).toBeInTheDocument();
  });
});
