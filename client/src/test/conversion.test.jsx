import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { HomePage } from '../pages/HomePage.jsx';
import { ServicesPage } from '../pages/ServicesPage.jsx';
import { ServiceDetailPage } from '../pages/ServiceDetailPage.jsx';
import { ProfessionalsPage } from '../pages/ProfessionalsPage.jsx';
import { ProfessionalDetailPage } from '../pages/ProfessionalDetailPage.jsx';
import { PlansPage } from '../pages/PlansPage.jsx';
import { PortfolioDetailPage } from '../pages/PortfolioDetailPage.jsx';
import { ResourceDetailPage } from '../pages/ResourceDetailPage.jsx';
import { FaqPage } from '../pages/FaqPage.jsx';
import { ContactPage } from '../pages/ContactPage.jsx';
import { Navbar } from '../components/navigation/Navbar.jsx';
import { MobileMenu } from '../components/navigation/MobileMenu.jsx';
import { Footer } from '../components/navigation/Footer.jsx';
import {
  trackConversionEvent,
  subscribeConversionAnalytics,
  clearConversionListeners,
  CONVERSION_CATEGORIES,
} from '../services/conversionAnalytics.js';
import { ROUTES } from '../constants/routes.js';

describe('Phase 16 — Conversion & Lead-Generation Experience Tests', () => {
  beforeEach(() => {
    clearConversionListeners();
  });

  describe('CTA Hierarchy & Navigation Conversion Touchpoints', () => {
    it('renders Navbar with clear primary CTA (Schedule Consultation) via actionSlot and triggers conversion event', () => {
      const listener = vi.fn();
      subscribeConversionAnalytics(listener);

      const handleCtaClick = () => {
        trackConversionEvent({
          category: CONVERSION_CATEGORIES.CTA_CLICK,
          action: 'click_navbar_cta',
          location: 'navbar',
          destination: ROUTES.CONTACT,
        });
      };

      render(
        <MemoryRouter initialEntries={[ROUTES.HOME]}>
          <Navbar
            isMobileOpen={false}
            onToggleMobile={() => {}}
            actionSlot={
              <a href={ROUTES.CONTACT} onClick={handleCtaClick}>
                Schedule Consultation
              </a>
            }
          />
        </MemoryRouter>
      );

      const navCta = screen.getByRole('link', { name: /Schedule Consultation/i });
      expect(navCta).toBeInTheDocument();
      expect(navCta).toHaveAttribute('href', ROUTES.CONTACT);

      fireEvent.click(navCta);
      expect(listener).toHaveBeenCalledWith(
        expect.objectContaining({
          category: CONVERSION_CATEGORIES.CTA_CLICK,
          action: 'click_navbar_cta',
          destination: ROUTES.CONTACT,
        })
      );
    });


    it('renders MobileMenu with authentic contact phone and Schedule Consultation CTA', () => {
      const listener = vi.fn();
      subscribeConversionAnalytics(listener);

      render(
        <MemoryRouter initialEntries={[ROUTES.HOME]}>
          <MobileMenu isOpen={true} onClose={() => {}} />
        </MemoryRouter>
      );

      const mobileCta = screen.getByRole('link', { name: /Schedule Consultation/i });
      expect(mobileCta).toBeInTheDocument();
      expect(mobileCta).toHaveAttribute('href', ROUTES.CONTACT);

      const phoneLink = screen.getByRole('link', { name: /\+1 \(800\) 432-5491/i });
      expect(phoneLink).toHaveAttribute('href', 'tel:+18004325491');

      fireEvent.click(mobileCta);
      expect(listener).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'click_mobile_menu_cta',
          destination: ROUTES.CONTACT,
        })
      );
    });

    it('renders Footer with authentic admissions email and verified clinical line', () => {
      render(
        <MemoryRouter initialEntries={[ROUTES.HOME]}>
          <Footer />
        </MemoryRouter>
      );

      const emailLink = screen.getByRole('link', { name: /admissions@healix\.health/i });
      expect(emailLink).toHaveAttribute('href', 'mailto:admissions@healix.health');

      const phoneLink = screen.getByRole('link', { name: /\+1 \(800\) 432-5491/i });
      expect(phoneLink).toHaveAttribute('href', 'tel:+18004325491');
    });
  });

  describe('Primary User Conversion Journeys', () => {
    it('Journey A: Service Detail CTA guides to Contact with contextual service query parameters', async () => {
      render(
        <MemoryRouter initialEntries={['/services/preventive-health-screenings']}>
          <Routes>
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
          </Routes>
        </MemoryRouter>
      );

      const requestConsultationLinks = await screen.findAllByRole('link', { name: /Request Consultation/i });
      expect(requestConsultationLinks.length).toBeGreaterThan(0);
      
      const bottomCtaLink = requestConsultationLinks[requestConsultationLinks.length - 1];
      expect(bottomCtaLink.getAttribute('href')).toContain('/contact?service=');
      expect(bottomCtaLink.getAttribute('href')).toContain('type=Clinical%20Services%20Consultation');
    });

    it('Journey B: Plans Tier CTAs carry contextual plan parameters into Contact', () => {
      render(
        <MemoryRouter initialEntries={[ROUTES.PLANS]}>
          <PlansPage />
        </MemoryRouter>
      );

      const planCta = screen.getByRole('link', { name: /Choose Essential Care/i });
      expect(planCta).toBeInTheDocument();
      expect(planCta.getAttribute('href')).toContain('/contact?plan=');
      expect(planCta.getAttribute('href')).toContain('type=Longevity%20Membership%20%26%20Plans');
    });

    it('Journey C: Clinician Profile CTA connects to Clinical Services Consultation', async () => {
      render(
        <MemoryRouter initialEntries={['/professionals/dr-elena-vance']}>
          <Routes>
            <Route path="/professionals/:slug" element={<ProfessionalDetailPage />} />
          </Routes>
        </MemoryRouter>
      );

      const consultBtns = await screen.findAllByRole('link', { name: /Schedule Consultation/i });
      expect(consultBtns.length).toBeGreaterThan(0);
      const bottomBtn = consultBtns[consultBtns.length - 1];
      expect(bottomBtn.getAttribute('href')).toContain('/contact?type=Clinical%20Services%20Consultation');
    });

    it('Journey D: Educational Article CTAs connect to related clinical review', async () => {
      render(
        <MemoryRouter initialEntries={['/resources/understanding-preventative-cardiovascular-markers']}>
          <Routes>
            <Route path="/resources/:slug" element={<ResourceDetailPage />} />
          </Routes>
        </MemoryRouter>
      );

      const reviewCta = await screen.findByRole('link', { name: /Schedule Clinical Review/i });
      expect(reviewCta).toBeInTheDocument();
      expect(reviewCta.getAttribute('href')).toContain('/contact?type=Clinical%20Services%20Consultation');
    });

    it('Journey E: FAQ Page provides supportive conversion paths and primary consultation CTA', () => {
      render(
        <MemoryRouter initialEntries={[ROUTES.FAQ]}>
          <FaqPage />
        </MemoryRouter>
      );

      const conciergeBtn = screen.getByRole('link', { name: /Contact Clinical Concierge/i });
      expect(conciergeBtn).toBeInTheDocument();
      expect(conciergeBtn).toHaveAttribute('href', ROUTES.CONTACT);

      const bottomFaqCta = screen.getByRole('link', { name: /Schedule Initial Consultation/i });
      expect(bottomFaqCta).toBeInTheDocument();
      expect(bottomFaqCta).toHaveAttribute('href', ROUTES.CONTACT);
    });

    it('Journey F: Portfolio Case Study CTA connects to Enterprise & Executive Health inquiry', async () => {
      render(
        <MemoryRouter initialEntries={['/portfolio/rapid-cardiac-risk-screening-initiative']}>
          <Routes>
            <Route path="/portfolio/:slug" element={<PortfolioDetailPage />} />
          </Routes>
        </MemoryRouter>
      );

      const initiativeCta = await screen.findByRole('link', { name: /Initiate Consultation/i });
      expect(initiativeCta).toBeInTheDocument();
      expect(initiativeCta.getAttribute('href')).toContain('/contact?type=Enterprise%20%26%20Executive%20Health');
    });
  });

  describe('Micro-Conversions & Friction Reduction', () => {
    it('supports billing frequency toggle on Plans page without page reloads', () => {
      render(
        <MemoryRouter initialEntries={[ROUTES.PLANS]}>
          <PlansPage />
        </MemoryRouter>
      );

      const billingSwitch = screen.getByRole('switch', { name: /Toggle between monthly and annual billing/i });
      expect(billingSwitch).toBeInTheDocument();

      // Check annual default price placeholder
      expect(screen.getByText(/CLIENT PRICE: \$890/i)).toBeInTheDocument();

      // Toggle to monthly
      fireEvent.click(billingSwitch);
      expect(screen.getByText(/CLIENT PRICE: \$89/i)).toBeInTheDocument();
    });
  });

  describe('Privacy-Safe Analytics Readiness & Zero-PHI Compliance', () => {
    it('strips all sensitive user input (PHI, message, email, phone) from conversion tracking events', () => {
      const listener = vi.fn();
      subscribeConversionAnalytics(listener);

      trackConversionEvent({
        category: CONVERSION_CATEGORIES.INQUIRY_INTENT,
        action: 'submit_contact_form',
        location: '/contact',
        destination: '/api/contact',
        metadata: {
          planName: 'Executive Longevity Protocol',
          inquiryType: 'Clinical Services Consultation',
          // Malicious / accidental PHI fields that must be scrubbed:
          email: 'patient@example.com',
          phone: '+15551234567',
          fullName: 'Jane Doe',
          message: 'Personal medical records and symptoms description',
          medicalHistory: 'Hypertension and cardiac surgery 2021',
        },
      });

      expect(listener).toHaveBeenCalledWith(
        expect.objectContaining({
          category: 'inquiry_intent',
          action: 'submit_contact_form',
          metadata: {
            planName: 'Executive Longevity Protocol',
            inquiryType: 'Clinical Services Consultation',
          },
        })
      );

      const trackedEvent = listener.mock.calls[0][0];
      expect(trackedEvent.metadata.email).toBeUndefined();
      expect(trackedEvent.metadata.phone).toBeUndefined();
      expect(trackedEvent.metadata.fullName).toBeUndefined();
      expect(trackedEvent.metadata.message).toBeUndefined();
      expect(trackedEvent.metadata.medicalHistory).toBeUndefined();
    });
  });
});
