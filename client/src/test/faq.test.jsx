import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { FaqPage } from '../pages/FaqPage.jsx';
import { FAQSection } from '../sections/home/FAQSection.jsx';
import { FAQS, FAQ_CATEGORIES } from '../data/faqs.js';

const routerFuture = { v7_startTransition: true, v7_relativeSplatPath: true };

describe('FAQ Experience Tests (Phase 14)', () => {
  describe('Data Integrity & Architecture', () => {
    it('contains valid and complete FAQ items', () => {
      expect(FAQS.length).toBeGreaterThanOrEqual(10);

      FAQS.forEach((faq) => {
        expect(faq.id).toBeTruthy();
        expect(faq.question).toBeTruthy();
        expect(faq.answer).toBeTruthy();
        expect(faq.category).toBeTruthy();
        expect(Array.isArray(faq.tags)).toBe(true);
      });
    });

    it('contains all standard FAQ categories', () => {
      expect(FAQ_CATEGORIES).toContain('All Questions');
      expect(FAQ_CATEGORIES).toContain('General & Model');
      expect(FAQ_CATEGORIES).toContain('Services & Diagnostics');
      expect(FAQ_CATEGORIES).toContain('Care Plans & Billing');
      expect(FAQ_CATEGORIES).toContain('Physicians & Appointments');
      expect(FAQ_CATEGORIES).toContain('Privacy & Security');
    });
  });

  describe('FaqPage Component', () => {
    it('renders the FAQ hero with semantic heading and breadcrumbs', () => {
      render(
        <MemoryRouter future={routerFuture}>
          <FaqPage />
        </MemoryRouter>
      );

      expect(
        screen.getByRole('heading', { level: 1, name: /Frequently Asked Questions/i })
      ).toBeInTheDocument();
      expect(screen.getByText(/Clinical Protocols/i)).toBeInTheDocument();
      expect(screen.getByText(/HSA \/ FSA & Insurance/i)).toBeInTheDocument();
    });

    it('renders category filter tablist with accessible roles', () => {
      render(
        <MemoryRouter future={routerFuture}>
          <FaqPage />
        </MemoryRouter>
      );

      const tablist = screen.getByRole('tablist', { name: /Filter frequently asked questions by topic/i });
      expect(tablist).toBeInTheDocument();

      const tabs = screen.getAllByRole('tab');
      expect(tabs.length).toBe(FAQ_CATEGORIES.length);
    });

    it('expands and collapses accordion questions on click', () => {
      render(
        <MemoryRouter future={routerFuture}>
          <FaqPage />
        </MemoryRouter>
      );

      const questionBtn = screen.getByRole('button', {
        name: /Are Healix diagnostic assessments covered by health insurance\?/i,
      });
      expect(questionBtn).toBeInTheDocument();

      // Click to expand
      fireEvent.click(questionBtn);
      expect(questionBtn).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByText(/itemized superbills for patient-submitted claims/i)).toBeInTheDocument();

      // Click again to collapse
      fireEvent.click(questionBtn);
      expect(questionBtn).toHaveAttribute('aria-expanded', 'false');
    });

    it('filters FAQs when a category tab is clicked', () => {
      render(
        <MemoryRouter future={routerFuture}>
          <FaqPage />
        </MemoryRouter>
      );

      const privacyTab = screen.getByRole('tab', { name: 'Privacy & Security' });
      fireEvent.click(privacyTab);

      expect(privacyTab).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText(/How is patient medical privacy and health data protected\?/i)).toBeInTheDocument();
    });

    it('filters FAQs in real-time via search input', () => {
      render(
        <MemoryRouter future={routerFuture}>
          <FaqPage />
        </MemoryRouter>
      );

      const searchInput = screen.getByPlaceholderText(/Search questions & topics/i);
      fireEvent.change(searchInput, { target: { value: 'Genomics' } });

      expect(screen.getByText(/Are genetic testing and pharmacogenomics included in standard evaluations\?/i)).toBeInTheDocument();
    });

    it('shows empty state when no FAQs match and can reset filters', () => {
      render(
        <MemoryRouter future={routerFuture}>
          <FaqPage />
        </MemoryRouter>
      );

      const searchInput = screen.getByPlaceholderText(/Search questions & topics/i);
      fireEvent.change(searchInput, { target: { value: 'XYZNonExistentMedicalQuery789' } });

      expect(screen.getByText(/No Questions Located/i)).toBeInTheDocument();

      const resetBtn = screen.getByRole('button', { name: /Reset All Filters/i });
      fireEvent.click(resetBtn);

      expect(screen.getByText(/How does Healix differ from traditional primary care clinics\?/i)).toBeInTheDocument();
    });

    it('renders supportive quick contact card and bottom CTA', () => {
      render(
        <MemoryRouter future={routerFuture}>
          <FaqPage />
        </MemoryRouter>
      );

      expect(screen.getByRole('heading', { name: /Still Have a Specific Clinical or Care Question\?/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Ready to Begin Your Proactive Healthcare Journey\?/i })).toBeInTheDocument();
    });
  });

  describe('Homepage FAQ Integration', () => {
    it('renders homepage FAQ section without regression', () => {
      render(
        <MemoryRouter future={routerFuture}>
          <FAQSection />
        </MemoryRouter>
      );

      expect(screen.getByRole('heading', { name: /Frequently Asked Questions/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Visit Full FAQ Center/i })).toBeInTheDocument();
    });
  });
});
