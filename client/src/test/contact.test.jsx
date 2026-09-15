import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { ContactPage } from '../pages/ContactPage.jsx';

import { ContactFAQ } from '../sections/index.js';

const routerFuture = { v7_startTransition: true, v7_relativeSplatPath: true };

describe('Contact Experience Tests (Phase 15)', () => {
  describe('ContactPage Composition & Layout', () => {
    it('renders hero with semantic heading and breadcrumbs', () => {
      render(
        <MemoryRouter future={routerFuture}>
          <ContactPage />
        </MemoryRouter>
      );

      expect(
        screen.getByRole('heading', { level: 1, name: /Connect with Our Clinical Concierge Team/i })
      ).toBeInTheDocument();
      expect(screen.getByText(/Consultation & Care Inquiries/i)).toBeInTheDocument();
    });

    it('renders direct clinical communication channels with semantic links', () => {
      render(
        <MemoryRouter future={routerFuture}>
          <ContactPage />
        </MemoryRouter>
      );

      expect(screen.getByRole('heading', { name: /Direct Clinical Channels/i })).toBeInTheDocument();

      const mailLink = screen.getByRole('link', { name: /care@healixhealth.com/i });
      expect(mailLink).toHaveAttribute('href', 'mailto:care@healixhealth.com');

      const phoneLink = screen.getByRole('link', { name: /\+1 \(800\) 555-HEAL/i });
      expect(phoneLink).toHaveAttribute('href', 'tel:+18005554325');

      expect(screen.getByText(/450 Medical Plaza Way, Suite 800/i)).toBeInTheDocument();
      expect(screen.getByText(/Monday – Friday: 8:00 AM – 6:00 PM PST/i)).toBeInTheDocument();
    });

    it('renders medical privacy notice', () => {
      render(
        <MemoryRouter future={routerFuture}>
          <ContactPage />
        </MemoryRouter>
      );

      expect(screen.getByText(/Medical Communication & Privacy Notice/i)).toBeInTheDocument();
      expect(screen.getByText(/do not include protected health information \(PHI\)/i)).toBeInTheDocument();
    });

    it('renders supportive contact FAQ section component', () => {
      render(
        <MemoryRouter future={routerFuture}>
          <ContactFAQ />
        </MemoryRouter>
      );

      expect(screen.getByRole('heading', { name: /Frequently Asked Inquiries/i })).toBeInTheDocument();
      expect(screen.getByText(/How soon can I expect a response to my consultation request\?/i)).toBeInTheDocument();
    });
  });

  describe('Contact Form Validation & Submission', () => {
    it('validates required fields on submission attempt', async () => {
      render(
        <MemoryRouter future={routerFuture}>
          <ContactPage />
        </MemoryRouter>
      );

      const submitBtn = screen.getByRole('button', { name: /Submit Consultation Request/i });
      fireEvent.click(submitBtn);

      expect(await screen.findByText(/Please enter your full name\./i)).toBeInTheDocument();
      expect(screen.getByText(/Please enter your email address\./i)).toBeInTheDocument();
    });

    it('validates email format in real-time or on blur', () => {
      render(
        <MemoryRouter future={routerFuture}>
          <ContactPage />
        </MemoryRouter>
      );

      const emailInput = screen.getByLabelText(/Email Address/i);
      fireEvent.change(emailInput, { target: { value: 'invalid-email-address' } });
      fireEvent.blur(emailInput);

      expect(screen.getByText(/Please provide a valid email address\./i)).toBeInTheDocument();
    });

    it('submits form successfully with valid inputs and displays confirmation', async () => {
      render(
        <MemoryRouter future={routerFuture}>
          <ContactPage />
        </MemoryRouter>
      );

      fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Eleanor Vance' } });
      fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'eleanor.vance@example.com' } });
      fireEvent.change(screen.getByLabelText(/Telephone Number/i), { target: { value: '+15551234567' } });
      fireEvent.change(screen.getByLabelText(/Clinical or Consultation Inquiries/i), {
        target: { value: 'I would like to schedule a comprehensive preventative cardiac evaluation.' },
      });

      const submitBtn = screen.getByRole('button', { name: /Submit Consultation Request/i });
      fireEvent.click(submitBtn);

      expect(await screen.findByRole('heading', { name: /Consultation Inquiry Received/i })).toBeInTheDocument();
      expect(screen.getByText(/within 1 business day/i)).toBeInTheDocument();

      // Reset button restores form
      const resetBtn = screen.getByRole('button', { name: /Submit Another Inquiry/i });
      fireEvent.click(resetBtn);

      expect(screen.getByRole('heading', { name: /Request Consultation/i })).toBeInTheDocument();
    });
  });

  describe('Contextual Prefill', () => {
    it('prefills service selection from URL query parameters', () => {
      render(
        <MemoryRouter initialEntries={['/contact?service=cardiovascular']} future={routerFuture}>
          <ContactPage />
        </MemoryRouter>
      );

      const select = screen.getByLabelText(/Inquiry Topic \/ Service/i);
      expect(select.value).toBe('cardiovascular');
    });

    it('prefills plan inquiry from plan query parameter', () => {
      render(
        <MemoryRouter initialEntries={['/contact?plan=Longevity%20Architecture']} future={routerFuture}>
          <ContactPage />
        </MemoryRouter>
      );

      const select = screen.getByLabelText(/Inquiry Topic \/ Service/i);
      expect(select.value).toBe('care-plans');

      const message = screen.getByLabelText(/Clinical or Consultation Inquiries/i);
      expect(message.value).toContain('Longevity Architecture');
    });
  });
});
