import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header.jsx';
import { Footer } from './Footer.jsx';
import { ScrollToTop } from '../components/common/ScrollToTop.jsx';

export function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-text-primary antialiased">
      {/* Accessible skip link for keyboard users */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* Scroll restoration */}
      <ScrollToTop />

      {/* Global Navigation Header */}
      <Header />

      {/* Main Content Area */}
      <main id="main-content" className="flex-grow focus:outline-none" tabIndex={-1}>
        <Outlet />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
