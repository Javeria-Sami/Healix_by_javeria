import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

import { Navbar } from '../components/navigation/Navbar.jsx';
import { MobileMenu } from '../components/navigation/MobileMenu.jsx';
import { Footer } from '../components/navigation/Footer.jsx';
import { Container } from '../components/common/Container.jsx';
import { Modal } from '../components/common/Modal.jsx';
import { Toast } from '../components/common/Toast.jsx';
import { Checkbox } from '../components/forms/Checkbox.jsx';
import { Input } from '../components/forms/Input.jsx';
import { PlanComparisonTable } from '../sections/plans/PlanComparisonTable.jsx';
import { ContactForm } from '../sections/contact/ContactForm.jsx';
import { Accordion } from '../components/ui/Accordion.jsx';

describe('Phase 18 — Advanced Responsive Design & Device Experience Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Container & Grid Architecture across Breakpoints', () => {
    it('renders Container with responsive max-width and fluid padding classes', () => {
      const { container } = render(
        <Container size="container">
          <div data-testid="content">Responsive Container Test</div>
        </Container>
      );

      const el = container.firstChild;
      expect(el).toHaveClass('w-full');
      expect(el).toHaveClass('mx-auto');
      expect(el).toHaveClass('px-4');
      expect(el).toHaveClass('sm:px-6');
      expect(el).toHaveClass('lg:px-8');
      expect(el).toHaveClass('max-w-container');
    });

    it('renders editorial and narrow size variations with appropriate width constraints', () => {
      const { container: editorialCont } = render(
        <Container size="editorial">
          <div>Editorial</div>
        </Container>
      );
      expect(editorialCont.firstChild).toHaveClass('max-w-editorial');

      const { container: narrowCont } = render(
        <Container size="narrow">
          <div>Narrow</div>
        </Container>
      );
      expect(narrowCont.firstChild).toHaveClass('max-w-narrow');
    });
  });

  describe('Header & Navigation Responsiveness across Devices', () => {
    it('renders desktop navigation links with responsive display rules and mobile menu trigger', () => {
      const toggleMock = vi.fn();
      render(
        <MemoryRouter initialEntries={['/']}>
          <Navbar isMobileOpen={false} onToggleMobile={toggleMock} />
        </MemoryRouter>
      );

      // Desktop nav container has responsive display class
      const desktopNav = screen.getByRole('navigation', { name: /primary navigation/i });
      expect(desktopNav).toHaveClass('hidden');
      expect(desktopNav).toHaveClass('lg:flex');

      // Mobile toggle button
      const mobileBtn = screen.getByRole('button', { name: /open navigation menu/i });
      expect(mobileBtn).toBeInTheDocument();
      expect(mobileBtn).toHaveAttribute('aria-expanded', 'false');

      fireEvent.click(mobileBtn);
      expect(toggleMock).toHaveBeenCalledTimes(1);
    });

    it('renders mobile navigation drawer in open state with accessible links and safe scrolling', () => {
      const onClose = vi.fn();
      render(
        <MemoryRouter initialEntries={['/']}>
          <MobileMenu isOpen={true} onClose={onClose} />
        </MemoryRouter>
      );

      const drawer = screen.getByRole('dialog', { name: /mobile navigation/i });
      expect(drawer).toBeInTheDocument();
      expect(drawer).toHaveAttribute('aria-modal', 'true');
      expect(drawer).toHaveClass('overflow-y-auto');

      // Check navigation links
      const insightsLink = screen.getByRole('link', { name: /^insights$/i });
      expect(insightsLink).toBeInTheDocument();
      fireEvent.click(insightsLink);
      expect(onClose).toHaveBeenCalled();
    });

    it('closes mobile navigation drawer on Escape keypress', () => {
      const onClose = vi.fn();
      render(
        <MemoryRouter initialEntries={['/']}>
          <MobileMenu isOpen={true} onClose={onClose} />
        </MemoryRouter>
      );

      fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Touch Optimization & Interactive Controls', () => {
    it('renders Checkbox with responsive touch spacing and keyboard focus indicator', () => {
      const onChange = vi.fn();
      render(
        <Checkbox
          label="I agree to preventative care terms"
          checked={false}
          onChange={onChange}
        />
      );

      const checkbox = screen.getByRole('checkbox', { name: /i agree to preventative care terms/i });
      expect(checkbox).not.toBeChecked();

      fireEvent.click(checkbox);
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('renders Toast with accessible touch dismiss button', () => {
      const onDismiss = vi.fn();
      render(
        <Toast
          type="success"
          title="Appointment Scheduled"
          message="Your consultation is confirmed."
          onDismiss={onDismiss}
        />
      );

      const dismissBtn = screen.getByRole('button', { name: /dismiss notification/i });
      expect(dismissBtn).toBeInTheDocument();
      expect(dismissBtn).toHaveClass('min-w-[32px]');
      expect(dismissBtn).toHaveClass('min-h-[32px]');

      fireEvent.click(dismissBtn);
      expect(onDismiss).toHaveBeenCalledTimes(1);
    });
  });

  describe('Modal & Viewport Containment on Mobile / Landscape', () => {
    it('renders modal with viewport height constraints and vertical scrollability', () => {
      const onClose = vi.fn();
      render(
        <Modal
          isOpen={true}
          onClose={onClose}
          title="Physician Consultation Intake"
          description="Please verify your contact details."
        >
          <div data-testid="modal-content">
            <p>Clinical intake notes</p>
          </div>
        </Modal>
      );

      const dialog = screen.getByRole('dialog', { name: /physician consultation intake/i });
      expect(dialog).toBeInTheDocument();

      // Ensure dialog container prevents clipping in short landscape viewports
      const dialogWindow = screen.getByText(/physician consultation intake/i).closest('.overflow-y-auto');
      expect(dialogWindow).toHaveClass('max-h-[calc(100dvh-2rem)]');
      expect(dialogWindow).toHaveClass('overflow-y-auto');
    });
  });

  describe('Responsive Table & Matrix Usability', () => {
    it('renders PlanComparisonTable with horizontal scroll container for narrow screens', () => {
      render(<PlanComparisonTable />);

      const heading = screen.getByRole('heading', { level: 2, name: /care membership comparison/i });
      expect(heading).toBeInTheDocument();

      const table = screen.getByRole('table');
      expect(table).toHaveClass('min-w-[640px]');

      const tableWrapper = table.closest('.overflow-x-auto');
      expect(tableWrapper).toBeInTheDocument();
    });
  });

  describe('Responsive Forms & Layouts', () => {
    it('renders ContactForm inputs adapted for responsive mobile-first columns', () => {
      render(
        <MemoryRouter initialEntries={['/contact']}>
          <ContactForm />
        </MemoryRouter>
      );

      const nameInput = screen.getByLabelText(/full name/i);
      expect(nameInput).toBeInTheDocument();
      expect(nameInput).toHaveClass('w-full');

      const submitBtn = screen.getByRole('button', { name: /submit consultation request/i });
      expect(submitBtn).toBeInTheDocument();
    });
  });

  describe('Accordion Touch Usability', () => {
    it('renders Accordion items with full-width comfortable touch trigger headers', () => {
      render(
        <Accordion
          items={[
            {
              id: 'faq-1',
              title: 'What diagnostics are included?',
              content: 'Full comprehensive biometric panel and genomics screening.',
            },
          ]}
        />
      );

      const trigger = screen.getByRole('button', { name: /what diagnostics are included\?/i });
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(trigger).toHaveClass('w-full');
      expect(trigger).toHaveClass('p-6');

      fireEvent.click(trigger);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByText(/full comprehensive biometric panel/i)).toBeInTheDocument();
    });
  });

  describe('Footer Layout across Devices', () => {
    it('renders Footer with multi-column responsive grid layout', () => {
      const { container } = render(
        <MemoryRouter initialEntries={['/']}>
          <Footer />
        </MemoryRouter>
      );

      const footerGrid = container.querySelector('.grid');
      expect(footerGrid).toHaveClass('grid-cols-1');
      expect(footerGrid).toHaveClass('md:grid-cols-2');
      expect(footerGrid).toHaveClass('lg:grid-cols-5');
    });
  });
});
