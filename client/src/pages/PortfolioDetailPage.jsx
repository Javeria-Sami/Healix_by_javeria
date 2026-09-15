import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageContainer } from '../layouts/PageContainer.jsx';
import { dataService } from '../services/dataService.js';
import { ROUTES } from '../constants/routes.js';
import { Button } from '../components/common/Button.jsx';
import { Card } from '../components/cards/Card.jsx';
import { EmptyState } from '../components/common/EmptyState.jsx';
import {
  PortfolioDetailHero,
  PortfolioCaseNarrative,
  PortfolioOutcomes,
  PortfolioConnectedServices,
  RelatedProjects,
  PortfolioDetailCTA,
} from '../sections/index.js';
import { SEO } from '../components/common/SEO.jsx';
import { generateBreadcrumbSchema } from '../utils/structuredData.js';
import {
  AlertCircle,
  Building2,
  Calendar,
  Stethoscope,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Share2,
} from 'lucide-react';

export function PortfolioDetailPage() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProject() {
      setLoading(true);
      try {
        const data = await dataService.getProjectBySlug(slug);
        setProject(data);
      } catch (err) {
        console.error('Failed to load project details:', err);
        setProject(null);
      } finally {
        setLoading(false);
      }
    }
    loadProject();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="py-24 text-center min-h-[60vh] flex items-center justify-center">
        <PageContainer>
          <div className="animate-pulse space-y-6 max-w-xl mx-auto">
            <div className="h-6 bg-border/60 rounded w-1/4 mx-auto" />
            <div className="h-12 bg-border/80 rounded w-3/4 mx-auto" />
            <div className="h-32 bg-border/40 rounded-healix-xl" />
          </div>
        </PageContainer>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="py-24 min-h-[60vh] flex items-center">
        <SEO
          title="Case Study Not Found"
          description="The requested case study could not be located."
          noIndex={true}
        />
        <PageContainer>
          <EmptyState
            icon={AlertCircle}
            title="Case Study Not Found"
            description={`We could not locate the case study requested ("${slug}"). It may have been relocated or updated.`}
            action={
              <Link to={ROUTES.PORTFOLIO}>
                <Button variant="primary" size="sm">
                  Return to Case Studies
                </Button>
              </Link>
            }
          />
        </PageContainer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <SEO
        title={`${project.title} — Clinical Case Study`}
        description={project.summary}
        canonicalUrl={`/portfolio/${project.slug}`}
        ogType="article"
        structuredData={[
          generateBreadcrumbSchema([
            { label: 'Home', href: '/' },
            { label: 'Clinical Portfolio', href: '/portfolio' },
            { label: project.title }
          ])
        ]}
      />

      {/* 1. Project Detail Hero & Header Visual */}
      <PortfolioDetailHero project={project} />

      <PageContainer className="py-12 md:py-16 space-y-16">
        {/* 2. Main Narrative & Strategic Overview Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Case Narrative & Outcomes */}
          <div className="lg:col-span-8 space-y-12">
            <PortfolioCaseNarrative project={project} />
            <PortfolioOutcomes outcomes={project.outcomes} />
          </div>

          {/* Strategic Overview & Action Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="p-6 border border-border bg-surface space-y-6 sticky top-24">
              <h3 className="font-heading text-base font-bold text-text-primary border-b border-border/60 pb-3">
                Initiative Architecture
              </h3>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-text-muted block mb-1">Partner Organization</span>
                  <div className="flex items-center gap-2 font-semibold text-text-primary">
                    <Building2 className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{project.clientType}</span>
                  </div>
                </div>

                <div className="border-t border-border/40 pt-3">
                  <span className="text-text-muted block mb-1">Implementation Period</span>
                  <div className="flex items-center gap-2 font-semibold text-text-primary">
                    <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{project.year}</span>
                  </div>
                </div>

                <div className="border-t border-border/40 pt-3">
                  <span className="text-text-muted block mb-1">Clinical Specialization</span>
                  <div className="flex items-center gap-2 font-semibold text-text-primary">
                    <Stethoscope className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{project.category}</span>
                  </div>
                </div>

                <div className="border-t border-border/40 pt-3">
                  <span className="text-text-muted block mb-2">Focus Tags</span>
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-secondary text-text-muted px-2 py-0.5 rounded font-mono"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-border space-y-3">
                <Link to={ROUTES.CONTACT} className="block w-full">
                  <Button variant="primary" size="md" className="w-full">
                    <span>Discuss Similar Initiative</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </Link>

                <div className="flex items-center justify-center gap-2 text-[11px] text-text-muted text-center pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span>HIPAA-Compliant Diagnostic Protocol</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* 3. Connected Clinical Services */}
        <PortfolioConnectedServices serviceSlugs={project.serviceSlugs} />

        {/* 4. Cross-Portfolio Navigation / Related Projects */}
        <RelatedProjects
          currentProjectId={project.id}
          relatedProjectIds={project.relatedProjectIds}
        />

        {/* 5. Bottom Detail CTA */}
        <PortfolioDetailCTA />
      </PageContainer>
    </div>
  );
}
