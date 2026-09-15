import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/common/Button.jsx';
import { ROUTES } from '../../constants/routes.js';
import { ArrowRight, Sparkles, PhoneCall } from 'lucide-react';

export function PortfolioCTA() {
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
          <span>Custom Healthcare Deployment</span>
        </div>

        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold max-w-3xl mx-auto tracking-tight leading-tight">
          Ready to Modernize Health Outcomes for Your Organization?
        </h2>

        <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Partner with Healix clinical directors to design, pilot, and deploy proactive preventative screenings and corporate health programs.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to={ROUTES.CONTACT}>
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-primary hover:bg-neutral-100 font-bold shadow-soft-md w-full sm:w-auto"
            >
              <span>Initiate Clinical Consultation</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link to={ROUTES.SERVICES}>
            <Button
              variant="ghost"
              size="lg"
              className="text-white border border-white/30 hover:bg-white/10 w-full sm:w-auto"
            >
              <PhoneCall className="w-4 h-4 mr-2" />
              <span>Explore Diagnostic Services</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
