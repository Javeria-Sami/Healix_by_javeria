import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/common/Button.jsx';
import { ROUTES } from '../../constants/routes.js';
import { ArrowRight, Sparkles, PhoneCall } from 'lucide-react';

export function FaqCTA() {
  return (
    <section className="pt-8 pb-16 md:pt-12 md:pb-24">
      <div className="bg-gradient-to-r from-primary/95 to-primary-dark rounded-healix-2xl p-8 sm:p-12 lg:p-16 text-white text-center space-y-6 relative overflow-hidden shadow-soft-lg">
        <div 
          className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none" 
          aria-hidden="true" 
        />
        <div 
          className="absolute -bottom-24 -left-24 w-72 h-72 bg-accent/20 rounded-full blur-2xl pointer-events-none" 
          aria-hidden="true" 
        />

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-sm border border-white/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Patient-Centered Communication</span>
        </div>

        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold max-w-3xl mx-auto tracking-tight leading-tight">
          Ready to Begin Your Proactive Healthcare Journey?
        </h2>

        <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Schedule an initial consultation with our board-certified physicians or explore our membership tiers.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to={ROUTES.CONTACT}>
            <Button
              variant="primary"
              size="lg"
              className="hover:bg-white hover:text-[#075C49] w-full sm:w-auto"
            >
              <span>Schedule Initial Consultation</span>
              <ArrowRight className="w-4 h-4 ml-2 text-[#075C49]" />
            </Button>
          </Link>
          <Link to={ROUTES.PLANS}>
            <Button
              variant="ghost"
              size="lg"
              className="text-white border border-white/30 hover:bg-white/10 w-full sm:w-auto rounded-full"
            >
              <PhoneCall className="w-4 h-4 mr-2" />
              <span>Compare Membership Plans</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
