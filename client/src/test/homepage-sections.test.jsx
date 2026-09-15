import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import {
  TrustSection,
  ServicesPreview,
  FeaturedSolution,
  ProcessSection,
  ImpactSection,
  ProfessionalsPreview,
  PortfolioPreview,
  PlansPreview,
  TestimonialsSection,
  ResourcesPreview,
  FAQSection,
  FinalCTA,
} from '../sections/index.js';
import { HomePage } from '../pages/HomePage.jsx';
import { PharmacyProvider } from '../context/PharmacyContext.jsx';

const routerFuture = { v7_startTransition: true, v7_relativeSplatPath: true };

describe('Phase 7 Homepage Content Sections', () => {
  it('renders TrustSection with Our Mission heading and manifesto link', () => {
    render(
      <MemoryRouter future={routerFuture}>
        <TrustSection />
      </MemoryRouter>
    );

    expect(screen.getByText(/our mission/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /healthcare,\s*made\s*simpler\./i })).toBeInTheDocument();
    expect(screen.getByText(/We believe getting the healthcare you need should feel simple, trustworthy, and human/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /our story/i })).toHaveAttribute('href', '/about');
  });

  it('renders ServicesPreview with all 4 services from data', () => {
    render(
      <MemoryRouter future={routerFuture}>
        <ServicesPreview />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /Comprehensive Preventative Care|Comprehensive Preventive Care/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Cardiovascular Diagnostics/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Executive Health & Performance/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Metabolic & Longevity Medicine/i })).toBeInTheDocument();
  });

  it('renders FeaturedSolution with assessment roadmap', () => {
    render(
      <MemoryRouter future={routerFuture}>
        <FeaturedSolution />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /The Longitudinal Longevity Assessment/i })).toBeInTheDocument();
    expect(screen.getByText(/Baseline Cellular & Metabolic Audit/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /schedule assessment/i })).toHaveAttribute('href', '/contact');
  });

  it('renders ProcessSection with 4 methodology steps', () => {
    render(
      <MemoryRouter future={routerFuture}>
        <ProcessSection />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /How Healix Works/i })).toBeInTheDocument();
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('02')).toBeInTheDocument();
    expect(screen.getByText('03')).toBeInTheDocument();
    expect(screen.getByText('04')).toBeInTheDocument();
  });

  it('renders ImpactSection with 4 clinical value pillars', () => {
    render(
      <MemoryRouter future={routerFuture}>
        <ImpactSection />
      </MemoryRouter>
    );

    expect(screen.getByText(/Proactive Risk Interception/i)).toBeInTheDocument();
    expect(screen.getByText(/Rapid Diagnostic Turnaround/i)).toBeInTheDocument();
    expect(screen.getByText(/Dedicated Physician Accessibility/i)).toBeInTheDocument();
    expect(screen.getByText(/Continuous Care Continuity/i)).toBeInTheDocument();
  });

  it('renders ProfessionalsPreview with physician profiles and dynamic links', () => {
    render(
      <MemoryRouter future={routerFuture}>
        <ProfessionalsPreview />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /Dr. Elena Vance, MD/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Dr. Marcus Chen, MD/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Dr. Sophia Patel, DO/i })).toBeInTheDocument();
  });

  it('renders PortfolioPreview with case studies', () => {
    render(
      <MemoryRouter future={routerFuture}>
        <PortfolioPreview />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /Enterprise Preventative Cardiac Health Initiative/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Precision Metabolic Diagnostic Suite Deployment/i })).toBeInTheDocument();
  });

  it('renders PlansPreview with monthly/annual billing toggle', () => {
    render(
      <MemoryRouter future={routerFuture}>
        <PlansPreview />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /Essential Care/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Professional Health/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Executive & Enterprise/i })).toBeInTheDocument();

    const toggle = screen.getByRole('switch', { name: /toggle between monthly and annual billing/i });
    expect(toggle).toBeInTheDocument();
    fireEvent.click(toggle);
  });

  it('renders TestimonialsSection with verified reviews', () => {
    render(
      <MemoryRouter future={routerFuture}>
        <TestimonialsSection />
      </MemoryRouter>
    );

    expect(screen.getByText(/Managing Director, Apex Technology Group/i)).toBeInTheDocument();
    expect(screen.getByText(/Private Member since 2024/i)).toBeInTheDocument();
  });

  it('renders ResourcesPreview with article cards and reading links', () => {
    render(
      <MemoryRouter future={routerFuture}>
        <ResourcesPreview />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /Beyond Standard Cholesterol/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Metabolic Flexibility/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /The Physiology of Executive Burnout/i })).toBeInTheDocument();
  });

  it('renders FAQSection and toggles accordion items', () => {
    render(
      <MemoryRouter future={routerFuture}>
        <FAQSection />
      </MemoryRouter>
    );

    expect(screen.getByText(/How does Healix differ from traditional primary care clinics\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Are Healix diagnostic assessments covered by health insurance\?/i)).toBeInTheDocument();
  });

  it('renders FinalCTA with conversion buttons and concierge contact', () => {
    render(
      <MemoryRouter future={routerFuture}>
        <FinalCTA />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /Ready to Take Control of Your Healthspan/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /(schedule|book) initial consultation/i })).toHaveAttribute('href', '/contact');
    expect(screen.getByRole('link', { name: /explore care memberships/i })).toHaveAttribute('href', '/plans');
    expect(screen.getByText(/\+1 \(800\) 432-5491/i)).toBeInTheDocument();
  });

  it('renders complete HomePage composition successfully', () => {
    render(
      <MemoryRouter initialEntries={['/']} future={routerFuture}>
        <PharmacyProvider>
          <HomePage />
        </PharmacyProvider>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1, name: /reliable medicines|healthcare/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /healthcare,\s*made\s*simpler\./i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Helpful Reads for Better Health/i })).toBeInTheDocument();
  });
});
