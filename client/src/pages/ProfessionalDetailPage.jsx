import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageContainer } from '../layouts/PageContainer.jsx';
import { dataService } from '../services/dataService.js';
import { ROUTES } from '../constants/routes.js';
import { Loader } from '../components/common/Loader.jsx';
import { EmptyState } from '../components/common/EmptyState.jsx';
import { Button } from '../components/common/Button.jsx';
import { 
  ProfessionalProfileHero,
  ProfessionalBiography,
  ProfessionalExpertise,
  ProfessionalServices,
  RelatedProfessionals,
  ProfessionalDetailCTA
} from '../sections/index.js';
import { SEO } from '../components/common/SEO.jsx';
import { generatePhysicianSchema, generateBreadcrumbSchema } from '../utils/structuredData.js';
import { ArrowLeft } from 'lucide-react';

export function ProfessionalDetailPage() {
  const { slug } = useParams();
  const [professional, setProfessional] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadProf() {
      setLoading(true);
      try {
        const data = await dataService.getProfessionalBySlug(slug);
        if (isMounted) {
          setProfessional(data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setProfessional(null);
          setLoading(false);
        }
      }
    }

    loadProf();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="py-32 flex items-center justify-center bg-background min-h-[60vh]">
        <Loader size="lg" text="Loading Physician Profile..." />
      </div>
    );
  }

  if (!professional) {
    return (
      <div className="py-24 bg-background min-h-[60vh] flex items-center">
        <SEO
          title="Physician Profile Not Found"
          description="The requested physician profile could not be located."
          noIndex={true}
        />
        <PageContainer>
          <div className="max-w-md mx-auto">
            <EmptyState
              title="Physician Profile Not Found"
              description={`The requested clinician profile ("${slug}") could not be located or may have been updated.`}
              actionLabel="Return to Medical Team"
              onAction={() => {}}
            />
            <div className="mt-4 text-center">
              <Button
                to={ROUTES.PROFESSIONALS}
                variant="primary"
                size="md"
                className="inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Explore Medical Team</span>
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
        title={`${professional.name} — ${professional.role}`}
        description={professional.bio || `${professional.name} is a ${professional.role} at Healix specializing in ${professional.specialty}.`}
        canonicalUrl={`/professionals/${professional.slug}`}
        ogType="profile"
        structuredData={[
          generatePhysicianSchema(professional),
          generateBreadcrumbSchema([
            { label: 'Home', href: '/' },
            { label: 'Clinical Faculty', href: '/professionals' },
            { label: professional.name }
          ])
        ]}
      />

      {/* 1. Hero & Consultation Logistics */}
      <ProfessionalProfileHero professional={professional} />

      {/* 2. Physician Biography & Philosophy */}
      <ProfessionalBiography 
        bio={professional.bio} 
        philosophy={professional.philosophy} 
      />

      {/* 3. Clinical Focus & Credentials */}
      <ProfessionalExpertise 
        focusAreas={professional.focusAreas} 
        qualifications={professional.qualifications} 
      />

      {/* 4. Supervised Programs & Services */}
      <ProfessionalServices serviceSlugs={professional.serviceSlugs} />

      {/* 5. Multidisciplinary Colleagues */}
      <RelatedProfessionals 
        currentId={professional.id} 
        relatedIds={professional.relatedProfessionalIds} 
      />

      {/* 6. Consultation Action CTA */}
      <ProfessionalDetailCTA professionalName={professional.name} />
    </div>
  );
}
