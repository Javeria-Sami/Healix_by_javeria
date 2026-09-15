import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Navbar, MobileMenu, Footer, Breadcrumb } from '../components';
import { RootLayout } from '../layouts/RootLayout.jsx';
import { PharmacyProvider } from '../context/PharmacyContext.jsx';

const routerFuture = { v7_startTransition: true, v7_relativeSplatPath: true };

describe('Healix Navigation & Header Architecture Tests', () => {
  describe('Global Navbar Component', () => {
    it('renders brand logo linking to homepage with accessible label and no separate home link', () => {
      render(
        <MemoryRouter initialEntries={['/']} future={routerFuture}>
          <PharmacyProvider>
            <Navbar />
          </PharmacyProvider>
        </MemoryRouter>
      );

      const logo = screen.getByRole('link', { name: /healix healthcare homepage/i });
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('href', '/');

      // Verify no separate 'Home' text link exists in the header
      expect(screen.queryByRole('link', { name: /^home$/i })).toBeNull();
    });

    it('renders primary navigation items (About, Pharmacy, Services, Insights, Contact)', () => {
      render(
        <MemoryRouter initialEntries={['/']} future={routerFuture}>
          <PharmacyProvider>
            <Navbar />
          </PharmacyProvider>
        </MemoryRouter>
      );

      const nav = screen.getByRole('navigation', { name: /primary navigation/i });
      expect(nav).toBeInTheDocument();

      expect(screen.getByRole('link', { name: /^about$/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /^pharmacy$/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /^services$/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /^insights$/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /^contact$/i })).toBeInTheDocument();
    });

    it('renders Pharmacy as a direct navigation link to /pharmacy without a dropdown menu', () => {
      render(
        <MemoryRouter initialEntries={['/']} future={routerFuture}>
          <PharmacyProvider>
            <Navbar />
          </PharmacyProvider>
        </MemoryRouter>
      );

      const pharmacyLink = screen.getByRole('link', { name: /^pharmacy$/i });
      expect(pharmacyLink).toBeInTheDocument();
      expect(pharmacyLink).toHaveAttribute('href', '/pharmacy');

      // Verify dropdown trigger button is no longer present
      expect(screen.queryByRole('button', { name: /pharmacy categories menu/i })).toBeNull();
    });

    it('renders prominent Search and Cart link in header', () => {
      render(
        <MemoryRouter initialEntries={['/']} future={routerFuture}>
          <PharmacyProvider>
            <Navbar />
          </PharmacyProvider>
        </MemoryRouter>
      );

      const searchInput = screen.getByRole('combobox', { name: /search medicines, lab tests and health information/i });
      expect(searchInput).toBeInTheDocument();

      const cartBtns = screen.getAllByRole('link', { name: /pharmacy cart/i });
      expect(cartBtns.length).toBeGreaterThanOrEqual(1);
      expect(cartBtns[0]).toHaveAttribute('href', '/pharmacy/cart');
    });

    it('does NOT contain any login, signup, or account buttons (Account-Free Architecture)', () => {
      render(
        <MemoryRouter initialEntries={['/']} future={routerFuture}>
          <PharmacyProvider>
            <Navbar />
          </PharmacyProvider>
        </MemoryRouter>
      );

      expect(screen.queryByRole('link', { name: /sign in|login|sign up|register|account|profile/i })).toBeNull();
      expect(screen.queryByRole('button', { name: /sign in|login|sign up|register|account|profile/i })).toBeNull();
    });
  });

  describe('Mobile Menu Component', () => {
    it('renders dialog and primary navigation items when open without home link', () => {
      const handleClose = vi.fn();
      render(
        <MemoryRouter initialEntries={['/']} future={routerFuture}>
          <PharmacyProvider>
            <MobileMenu isOpen={true} onClose={handleClose} />
          </PharmacyProvider>
        </MemoryRouter>
      );

      const dialog = screen.getByRole('dialog', { name: /mobile navigation/i });
      expect(dialog).toBeInTheDocument();
      expect(dialog).toHaveAttribute('aria-modal', 'true');

      expect(screen.queryByRole('link', { name: /^home$/i })).toBeNull();
      expect(screen.getByRole('link', { name: /^about$/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /pharmacy/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /^services$/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /^insights$/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /^contact$/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /pharmacy cart/i })).toBeInTheDocument();
    });

    it('closes mobile menu when Escape key is pressed', () => {
      const handleClose = vi.fn();
      render(
        <MemoryRouter initialEntries={['/']} future={routerFuture}>
          <PharmacyProvider>
            <MobileMenu isOpen={true} onClose={handleClose} />
          </PharmacyProvider>
        </MemoryRouter>
      );

      fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('closes mobile menu when a navigation link is clicked', () => {
      const handleClose = vi.fn();
      render(
        <MemoryRouter initialEntries={['/']} future={routerFuture}>
          <PharmacyProvider>
            <MobileMenu isOpen={true} onClose={handleClose} />
          </PharmacyProvider>
        </MemoryRouter>
      );

      const aboutLink = screen.getByRole('link', { name: /^about$/i });
      fireEvent.click(aboutLink);
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Global Footer Component', () => {
    it('renders structured healthcare information and compliance notes', () => {
      render(
        <MemoryRouter initialEntries={['/']} future={routerFuture}>
          <Footer />
        </MemoryRouter>
      );

      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
      expect(screen.getByText(/healix healthcare group/i)).toBeInTheDocument();
      expect(screen.getByText(/admissions@healix.health/i)).toBeInTheDocument();
    });

    it('renders essential compliance and legal links in footer', () => {
      render(
        <MemoryRouter initialEntries={['/']} future={routerFuture}>
          <Footer />
        </MemoryRouter>
      );

      expect(screen.getByRole('link', { name: /privacy policy/i })).toHaveAttribute('href', '/privacy');
      expect(screen.getByRole('link', { name: /terms of service/i })).toHaveAttribute('href', '/terms');
      expect(screen.getByRole('link', { name: /cookie policy/i })).toHaveAttribute('href', '/cookies');
    });
  });

  describe('Breadcrumb Component', () => {
    it('renders skip link for keyboard navigation compliance', () => {
      render(
        <MemoryRouter initialEntries={['/']} future={routerFuture}>
          <RootLayout />
        </MemoryRouter>
      );

      const skipLink = screen.getByRole('link', { name: /skip to main content/i });
      expect(skipLink).toBeInTheDocument();
      expect(skipLink).toHaveAttribute('href', '#main-content');
    });

    it('renders correct hierarchy for nested paths', () => {
      const items = [
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Preventive Care' },
      ];

      render(
        <MemoryRouter future={routerFuture}>
          <Breadcrumb items={items} />
        </MemoryRouter>
      );

      const nav = screen.getByRole('navigation', { name: /breadcrumb/i });
      expect(nav).toBeInTheDocument();

      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(2);
      expect(links[0]).toHaveTextContent('Home');
      expect(links[1]).toHaveTextContent('Services');

      const current = screen.getByText('Preventive Care');
      expect(current).toHaveAttribute('aria-current', 'page');
    });
  });
});
