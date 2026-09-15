import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import {
  AboutHero,
  StorySection,
  MissionVision,
  ValuesGrid,
  ApproachSection,
  TeamSection,
  MilestonesSection,
  AboutTrustSection,
  AboutCTA,
} from '../sections/index.js';
import { AboutPage } from '../pages/AboutPage.jsx';

const routerFuture = { v7_startTransition: true, v7_relativeSplatPath: true };

describe('Phase 8 About Experience', () => {
  it('renders AboutHero with single semantic H1 and breadcrumbs', () => {
    render(
      <MemoryRouter future={routerFuture}>
        <AboutHero />
      </MemoryRouter>
    );

    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(/Dedicated to Proactive/i);
    expect(screen.getByText('About Healix')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /explore clinical programs/i })).toHaveAttribute('href', '/services');
  });

  it('renders StorySection with paradigm shift narrative', () => {
    render(
      <MemoryRouter future={routerFuture}>
        <StorySection />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /Why We Built Healix/i })).toBeInTheDocument();
    expect(screen.getByText(/Closing the Preventative Healthcare Gap/i)).toBeInTheDocument();
    expect(screen.getByText(/The Clinical Paradigm Shift/i)).toBeInTheDocument();
  });

  it('renders MissionVision with dedicated mission and vision headings', () => {
    render(
      <MemoryRouter future={routerFuture}>
        <MissionVision />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /Our Mission/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Our Vision/i })).toBeInTheDocument();
  });

  it('renders ValuesGrid with all 6 core clinical values', () => {
    render(
      <MemoryRouter future={routerFuture}>
        <ValuesGrid />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /Clinical Diagnostic Rigor/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Radical Transparency/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Dedicated Physician Stewardship/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Personalized Bio-Individuality/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Confidential Data Protection/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Holistic Healthspan Extension/i })).toBeInTheDocument();
  });

  it('renders ApproachSection with 3 clinical pillars', () => {
    render(
      <MemoryRouter future={routerFuture}>
        <ApproachSection />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /The Healix Preventative Care Standard/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /High-Dimensional Diagnostics/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Physician-Guided Translation/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Longitudinal Care Evolution/i })).toBeInTheDocument();
  });

  it('renders TeamSection with physicians and profile links', () => {
    render(
      <MemoryRouter future={routerFuture}>
        <TeamSection />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /Dr. Elena Vance, MD/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Dr. Marcus Chen, MD/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Dr. Sophia Patel, DO/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view all credentials/i })).toHaveAttribute('href', '/professionals');
  });

  it('renders MilestonesSection with chronological timeline', () => {
    render(
      <MemoryRouter future={routerFuture}>
        <MilestonesSection />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /Milestones in Preventative Healthcare/i })).toBeInTheDocument();
    expect(screen.getByText('2023')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
    expect(screen.getByText('2025')).toBeInTheDocument();
    expect(screen.getByText('2026')).toBeInTheDocument();
  });

  it('renders AboutTrustSection with institutional compliance items', () => {
    render(
      <MemoryRouter future={routerFuture}>
        <AboutTrustSection />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /Our Commitment to Clinical Trust & Compliance/i })).toBeInTheDocument();
    expect(screen.getByText(/HIPAA Compliant Data Architecture/i)).toBeInTheDocument();
    expect(screen.getByText(/ISO-27001 Security Alignment/i)).toBeInTheDocument();
  });

  it('renders AboutCTA with looking ahead banner and contact button', () => {
    render(
      <MemoryRouter future={routerFuture}>
        <AboutCTA />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /Connecting Everyday Health to Long-Term Vitality/i })).toBeInTheDocument();
    expect(screen.getByText(/Looking Ahead/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Get in Touch with Healix/i })).toHaveAttribute('href', '/contact');
  });

  it('renders complete AboutPage composition successfully', () => {
    render(
      <MemoryRouter initialEntries={['/about']} future={routerFuture}>
        <AboutPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1, name: /Dedicated to Proactive/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Our Mission/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Connecting Everyday Health to Long-Term Vitality/i })).toBeInTheDocument();
  });
});
