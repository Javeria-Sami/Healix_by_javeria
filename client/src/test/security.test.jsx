import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

import { ContactForm } from '../sections/contact/ContactForm.jsx';
import { ContactPrivacyNotice } from '../sections/contact/ContactPrivacyNotice.jsx';
import { contactService } from '../services/contactService.js';
import { request, ApiError } from '../services/api.js';

describe('Phase 21 — Security, Privacy & Production Hardening Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Form Security & Data Minimization', () => {
    it('verifies that the Contact form contains only minimized general inquiry fields', () => {
      render(
        <MemoryRouter>
          <ContactForm />
        </MemoryRouter>
      );

      // Verify legitimate general inquiry fields exist
      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/telephone number/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/inquiry topic/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/clinical or consultation inquiries/i)).toBeInTheDocument();

      // Verify no sensitive PHI fields exist (Data Minimization)
      expect(screen.queryByLabelText(/social security/i)).not.toBeInTheDocument();
      expect(screen.queryByLabelText(/date of birth/i)).not.toBeInTheDocument();
      expect(screen.queryByLabelText(/medical history/i)).not.toBeInTheDocument();
      expect(screen.queryByLabelText(/credit card/i)).not.toBeInTheDocument();
      expect(screen.queryByLabelText(/upload medical records/i)).not.toBeInTheDocument();
    });

    it('enforces client-side validation and prevents submission with invalid email', async () => {
      const submitSpy = vi.spyOn(contactService, 'submitInquiry');

      render(
        <MemoryRouter>
          <ContactForm />
        </MemoryRouter>
      );

      fireEvent.change(screen.getByLabelText(/full name/i), {
        target: { value: 'Dr. John Doe' },
      });
      fireEvent.change(screen.getByLabelText(/email address/i), {
        target: { value: 'invalid-email-format' },
      });
      fireEvent.change(screen.getByLabelText(/clinical or consultation inquiries/i), {
        target: { value: 'Valid message content of sufficient length.' },
      });

      const submitButton = screen.getByRole('button', { name: /submit consultation request/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/please provide a valid email address/i)).toBeInTheDocument();
      });

      expect(submitSpy).not.toHaveBeenCalled();
    });

    it('contains an anti-spam honeypot input hidden from normal accessibility trees', () => {
      const { container } = render(
        <MemoryRouter>
          <ContactForm />
        </MemoryRouter>
      );

      const honeypotInput = container.querySelector('input[name="honeypot"]');
      expect(honeypotInput).not.toBeNull();
      const honeypotWrapper = honeypotInput.closest('div');
      expect(honeypotWrapper).toHaveClass('hidden');
      expect(honeypotWrapper).toHaveAttribute('aria-hidden', 'true');
    });

    it('blocks submission when honeypot trap field is populated by bots', async () => {
      const submitSpy = vi.spyOn(contactService, 'submitInquiry');

      const { container } = render(
        <MemoryRouter>
          <ContactForm />
        </MemoryRouter>
      );

      fireEvent.change(screen.getByLabelText(/full name/i), {
        target: { value: 'Automated Spammer' },
      });
      fireEvent.change(screen.getByLabelText(/email address/i), {
        target: { value: 'spammer@example.com' },
      });
      fireEvent.change(screen.getByLabelText(/clinical or consultation inquiries/i), {
        target: { value: 'Buy cheap pharmaceuticals online now!' },
      });

      // Bot fills out hidden honeypot
      const honeypotInput = container.querySelector('input[name="honeypot"]');
      fireEvent.change(honeypotInput, {
        target: { value: 'http://spam-affiliate.com' },
      });

      const submitButton = screen.getByRole('button', { name: /submit consultation request/i });
      fireEvent.click(submitButton);

      expect(submitSpy).not.toHaveBeenCalled();
    });
  });

  describe('Medical Privacy Notice & Microcopy Safeguards', () => {
    it('displays explicit guidance warning users not to submit sensitive health records', () => {
      render(
        <MemoryRouter>
          <ContactPrivacyNotice />
        </MemoryRouter>
      );

      expect(screen.getByText(/medical communication & privacy notice/i)).toBeInTheDocument();
      expect(
        screen.getByText(/please do not include protected health information \(phi\)/i)
      ).toBeInTheDocument();
    });
  });

  describe('API Client Error Handling & Status Normalization', () => {
    it('normalizes HTTP 400 and 429 errors into structured ApiError instances', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 429,
        headers: {
          get: (header) => (header === 'content-type' ? 'application/json' : null),
        },
        json: async () => ({
          success: false,
          error: { message: 'Rate limit exceeded.', statusCode: 429 },
        }),
      });

      await expect(request('/contact', { method: 'POST' })).rejects.toThrow(ApiError);
    });
  });
});
