import React, { useState, useRef } from 'react';
import { Navbar } from '../components/navigation/Navbar.jsx';
import { MobileMenu } from '../components/navigation/MobileMenu.jsx';

export function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const triggerRef = useRef(null);

  const toggleMobile = () => {
    setIsMobileOpen((prev) => !prev);
  };

  const closeMobile = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      <Navbar
        isMobileOpen={isMobileOpen}
        onToggleMobile={toggleMobile}
        triggerRef={triggerRef}
      />
      <MobileMenu
        isOpen={isMobileOpen}
        onClose={closeMobile}
        triggerRef={triggerRef}
      />
    </>
  );
}
