import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { AppRoutes } from '../routes/AppRoutes.jsx';

const routerFuture = { v7_startTransition: true, v7_relativeSplatPath: true };

describe('Healix Routing & Design System Architecture Tests', () => {
  it('renders HomePage successfully on default route', async () => {
    render(
      <MemoryRouter initialEntries={['/']} future={routerFuture}>
        <AppRoutes />
      </MemoryRouter>
    );

    await waitFor(
      () => {
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Reliable Medicines|Healthcare/i);
      },
      { timeout: 4000 }
    );
    expect(screen.getByRole('heading', { name: /Healthcare,\s*Made Simpler/i })).toBeInTheDocument();
  });

  it('renders AboutPage successfully on /about', async () => {
    render(
      <MemoryRouter initialEntries={['/about']} future={routerFuture}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(await screen.findByRole('heading', { name: /Dedicated to Proactive/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Our Mission/i })).toBeInTheDocument();
  });

  it('renders ServicesPage successfully on /services', async () => {
    render(
      <MemoryRouter initialEntries={['/services']} future={routerFuture}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(await screen.findByRole('heading', { level: 1, name: /Proactive Healthcare/i }, { timeout: 4000 })).toBeInTheDocument();
  });

  it('renders ServiceDetailPage successfully on dynamic slug /services/preventive-health-screenings', async () => {
    render(
      <MemoryRouter initialEntries={['/services/preventive-health-screenings']} future={routerFuture}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(await screen.findByRole('heading', { level: 1, name: /Comprehensive Preventive Care/i })).toBeInTheDocument();
    expect(screen.getByText(/What This Service Includes/i)).toBeInTheDocument();
  });

  it('renders ProfessionalsPage successfully on /professionals', async () => {
    render(
      <MemoryRouter initialEntries={['/professionals']} future={routerFuture}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(await screen.findByRole('heading', { name: /Meet the Physicians & Specialists Behind Healix/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Dr. Elena Vance, MD/i })).toBeInTheDocument();
  });

  it('renders ProfessionalDetailPage successfully on dynamic slug /professionals/dr-elena-vance', async () => {
    render(
      <MemoryRouter initialEntries={['/professionals/dr-elena-vance']} future={routerFuture}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(await screen.findByRole('heading', { level: 1, name: /Dr. Elena Vance, MD/i })).toBeInTheDocument();
    expect(screen.getByText(/Physician Background & Stewardship/i)).toBeInTheDocument();
  });

  it('renders PlansPage successfully on /plans', async () => {
    render(
      <MemoryRouter initialEntries={['/plans']} future={routerFuture}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(await screen.findByRole('heading', { name: /Transparent, Predictable/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Essential Care' })).toBeInTheDocument();
  });

  it('renders PortfolioPage successfully on /portfolio', async () => {
    render(
      <MemoryRouter initialEntries={['/portfolio']} future={routerFuture}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(await screen.findByRole('heading', { name: /Clinical Deployments & Healthcare Case Studies/i })).toBeInTheDocument();
  });

  it('renders PortfolioDetailPage successfully on dynamic slug /portfolio/rapid-cardiac-risk-screening-initiative', async () => {
    render(
      <MemoryRouter initialEntries={['/portfolio/rapid-cardiac-risk-screening-initiative']} future={routerFuture}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(await screen.findByRole('heading', { level: 1, name: /Enterprise Preventative Cardiac Health Initiative/i })).toBeInTheDocument();
    expect(screen.getByText(/The Healthcare & Diagnostic Challenge/i)).toBeInTheDocument();
  });

  it('renders ResourcesPage successfully on /resources', async () => {
    render(
      <MemoryRouter initialEntries={['/resources']} future={routerFuture}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(await screen.findByRole('heading', { name: /Physician Perspectives on/i })).toBeInTheDocument();
  });

  it('renders ResourceDetailPage successfully on dynamic slug /resources/understanding-preventative-cardiovascular-markers', async () => {
    render(
      <MemoryRouter initialEntries={['/resources/understanding-preventative-cardiovascular-markers']} future={routerFuture}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(await screen.findByRole('heading', { level: 1, name: /Beyond Standard Cholesterol/i })).toBeInTheDocument();
    expect(screen.getByText(/Key Clinical Takeaways/i)).toBeInTheDocument();
  });

  it('renders FaqPage successfully on /faq', async () => {
    render(
      <MemoryRouter initialEntries={['/faq']} future={routerFuture}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(await screen.findByRole('heading', { name: /Frequently Asked Questions/i })).toBeInTheDocument();
  });

  it('renders ContactPage successfully on /contact', async () => {
    render(
      <MemoryRouter initialEntries={['/contact']} future={routerFuture}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(await screen.findByRole('heading', { name: /Request Consultation/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
  });

  it('renders DesignSystemPage successfully on /design-system', async () => {
    render(
      <MemoryRouter initialEntries={['/design-system']} future={routerFuture}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(await screen.findByRole('heading', { name: /Core Component System/i })).toBeInTheDocument();
    expect(screen.getByText(/Internal Engineering Showcase/i)).toBeInTheDocument();
  });

  it('renders 404 NotFoundPage on invalid routes', async () => {
    render(
      <MemoryRouter initialEntries={['/non-existent-invalid-path']} future={routerFuture}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(await screen.findByRole('heading', { name: /Page Not Located/i })).toBeInTheDocument();
    expect(screen.getByText(/Error 404/i)).toBeInTheDocument();
  });
});
