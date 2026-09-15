import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageContainer } from '../layouts/PageContainer.jsx';
import { dataService } from '../services/dataService.js';
import { ROUTES } from '../constants/routes.js';
import { Loader } from '../components/common/Loader.jsx';
import { EmptyState } from '../components/common/EmptyState.jsx';
import { Button } from '../components/common/Button.jsx';
import { 
  ServiceDetailHero,
  ServiceInclusions,
  ServiceAudience,
  ServicePathway,
  ServiceBenefits,
  RelatedServices,
  ServiceDetailFAQ,
  ServiceDetailCTA
} from '../sections/index.js';
import { SEO } from '../components/common/SEO.jsx';
import { generateServiceSchema, generateBreadcrumbSchema } from '../utils/structuredData.js';
import { AlertCircle, ArrowLeft } from 'lucide-react';

export function ServiceDetailPage() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadService() {
      setLoading(true);
      try {
        const data = await dataService.getServiceBySlug(slug);
        if (isMounted) {
          setService(data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setService(null);
          setLoading(false);
        }
      }
    }

    loadService();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="py-32 flex items-center justify-center bg-background min-h-[60vh]">
        <Loader size="lg" text="Loading Clinical Service..." />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="py-24 bg-background min-h-[60vh] flex items-center">
        <SEO
          title="Clinical Service Not Found"
          description="The requested clinical specialization could not be located."
          noIndex={true}
        />
        <PageContainer>
          <div className="max-w-md mx-auto">
            <EmptyState
              title="Clinical Service Not Found"
              description={`The requested service specialization ("${slug}") could not be located or may have been relocated.`}
              actionLabel="Return to All Services"
              onAction={() => {}}
            />
            <div className="mt-4 text-center">
              <Button
                to={ROUTES.SERVICES}
                variant="primary"
                size="md"
                className="inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Explore All Services</span>
              </Button>
            </div>
          </div>
        </PageContainer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <SEO
        title={`${service.title} — Clinical Specialization`}
        description={service.shortDescription || service.description}
        canonicalUrl={`/services/${service.slug}`}
        ogType="article"
        structuredData={[
          generateServiceSchema(service),
          generateBreadcrumbSchema([
            { label: 'Home', href: '/' },
            { label: 'Clinical Services', href: '/services' },
            { label: service.title }
          ])
        ]}
      />

      {/* 1. Detail Hero & Overview */}
      <ServiceDetailHero service={service} />

      {/* 2. Clinical Inclusions */}
      <ServiceInclusions inclusions={service.inclusions} />

      {/* 3. Candidate Suitability & Audience */}
      <ServiceAudience audience={service.targetAudience} />

      {/* 4. 4-Step Clinical Journey */}
      <ServicePathway process={service.process} />

      {/* 5. Evidence-Based Benefits */}
      <ServiceBenefits benefits={service.benefits} />

      {/* 6. Service-Specific FAQs */}
      <ServiceDetailFAQ faqs={service.faqs} />

      {/* 7. Related Clinical Specializations */}
      <RelatedServices currentSlug={service.slug} relatedSlugs={service.relatedServices} />

      {/* 8. Conversion CTA */}
      <ServiceDetailCTA serviceTitle={service.title} />
    </div>
  );
}
