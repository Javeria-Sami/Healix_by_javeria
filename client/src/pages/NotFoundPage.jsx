import React from 'react';
import { PageContainer } from '../layouts/PageContainer.jsx';
import { Button } from '../components/common/Button.jsx';
import { SEO } from '../components/common/SEO.jsx';
import { ROUTES } from '../constants/routes.js';
import { Compass, ArrowRight, Home } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="py-24 md:py-32 flex items-center justify-center">
      <SEO
        title="404 — Page Not Found | Healix Healthcare"
        description="The requested page could not be located."
        noIndex={true}
      />
      <PageContainer>
        <div className="max-w-lg mx-auto text-center space-y-6 bg-surface border border-border rounded-healix-xl p-10 shadow-soft-sm">
          <div className="w-16 h-16 rounded-2xl bg-primary-light text-primary flex items-center justify-center mx-auto">
            <Compass className="w-8 h-8 animate-spin-slow" />
          </div>

          <div className="space-y-2">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-primary">Error 404</div>
            <h1 className="font-heading text-3xl font-extrabold text-[#075A46]">
              Page Not Located
            </h1>
            <p className="text-sm text-text-secondary leading-relaxed">
              The clinical resource, service page, or document you requested could not be found. It may have been relocated or updated.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              to={ROUTES.HOME}
              variant="primary"
              size="md"
              iconLeading={Home}
              className="w-full sm:w-auto"
            >
              Back to Homepage
            </Button>

            <Button
              to={ROUTES.SERVICES}
              variant="secondary"
              size="md"
              iconTrailing={ArrowRight}
              className="w-full sm:w-auto"
            >
              Explore Services
            </Button>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
