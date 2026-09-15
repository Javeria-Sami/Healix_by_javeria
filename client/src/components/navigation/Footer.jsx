import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes.js';
import { Container } from '../common/Container.jsx';
import { ShieldCheck, ArrowUpRight, HeartPulse, Clock, MapPin, Mail, Phone } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#075C49] text-white border-t border-[#0C6F58] mt-auto pt-16 pb-12 transition-colors">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#0C6F58]">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              to={ROUTES.HOME}
              className="inline-flex items-center rounded-xl group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8FD21F]"
              aria-label="Healix Healthcare Homepage"
            >
              <img
                src="/images/healix_logo.png"
                alt="Healix - Health Made Simpler"
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-102 rounded-xl"
              />
              <span className="sr-only">Healix</span>
            </Link>
            <p className="text-[#DCE8E3] text-sm leading-relaxed max-w-sm">
              Healix is a human-centered healthcare platform dedicated to making everyday health simple, trustworthy, and accessible.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#B7D9CA] pt-1">
              <ShieldCheck className="w-4 h-4 text-[#8FD21F] flex-shrink-0" aria-hidden="true" />
              <span>100% Genuine Medicines • Certified Diagnostic Labs</span>
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-white mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm text-[#DCE8E3]">
              <li>
                <Link to={ROUTES.ABOUT} className="hover:text-white transition-colors">About Healix</Link>
              </li>
              <li>
                <Link to={ROUTES.SERVICES} className="hover:text-white transition-colors">Clinical Services</Link>
              </li>
              <li>
                <Link to={ROUTES.PROFESSIONALS} className="hover:text-white transition-colors">Medical Specialists</Link>
              </li>
              <li>
                <Link to={ROUTES.PLANS} className="hover:text-white transition-colors">Preventative Care Plans</Link>
              </li>
              <li>
                <Link to={ROUTES.PHARMACY} className="hover:text-white transition-colors">Online Pharmacy</Link>
              </li>
            </ul>
          </div>

          {/* Resources & Support */}
          <div>
            <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-white mb-4">
              Support
            </h3>
            <ul className="space-y-2.5 text-sm text-[#DCE8E3]">
              <li>
                <Link to={ROUTES.FAQ} className="hover:text-white transition-colors">Frequently Asked Questions</Link>
              </li>
              <li>
                <Link to={ROUTES.CONTACT} className="hover:text-white transition-colors">Pharmacy Franchise</Link>
              </li>
              <li>
                <Link to={ROUTES.CONTACT} className="hover:text-white transition-colors">Customer Care</Link>
              </li>
              <li>
                <Link to={ROUTES.PHARMACY_CART} className="hover:text-white transition-colors">My Cart</Link>
              </li>
            </ul>
          </div>

          {/* Care Hours & Contact */}
          <div>
            <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-white mb-4">
              Care &amp; Delivery
            </h3>
            <div className="space-y-2.5 text-sm text-[#DCE8E3]">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#8FD21F] flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p><span className="font-medium text-white">Mon – Sun:</span> 24/7 Support</p>
                  <p className="text-xs text-[#B7D9CA]">Doorstep Delivery Available</p>
                </div>
              </div>
              <div className="pt-2 text-xs text-[#B7D9CA] space-y-1.5">
                <p className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#8FD21F]" aria-hidden="true" />
                  <a href="mailto:admissions@healix.health" className="text-white hover:underline">admissions@healix.health</a>
                </p>
                <p className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#8FD21F]" aria-hidden="true" />
                  <a href="tel:+18004325491" className="text-white hover:underline">+1 (800) 432-5491</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Legal Links & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#B7D9CA]">
          <div>
            &copy; {currentYear} Healix Healthcare Group. All rights reserved. Genuine health, delivered simply.
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <Link to={ROUTES.PRIVACY} className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to={ROUTES.TERMS} className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to={ROUTES.COOKIES} className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
