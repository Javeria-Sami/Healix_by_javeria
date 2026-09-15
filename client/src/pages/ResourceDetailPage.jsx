import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageContainer } from '../layouts/PageContainer.jsx';
import { dataService } from '../services/dataService.js';
import { ROUTES } from '../constants/routes.js';
import { Button } from '../components/common/Button.jsx';
import { EmptyState } from '../components/common/EmptyState.jsx';
import {
  ResourceDetailHero,
  ResourceContentBody,
  ResourceDetailCTA,
} from '../sections/index.js';
import { SEO } from '../components/common/SEO.jsx';
import { generateArticleSchema, generateBreadcrumbSchema } from '../utils/structuredData.js';
import { AlertCircle } from 'lucide-react';

export function ResourceDetailPage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticle() {
      setLoading(true);
      try {
        const data = await dataService.getArticleBySlug(slug);
        setArticle(data);
      } catch (err) {
        console.error('Failed to load article details:', err);
        setArticle(null);
      } finally {
        setLoading(false);
      }
    }
    loadArticle();
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

  if (!article) {
    return (
      <div className="py-24 min-h-[60vh] flex items-center">
        <SEO
          title="Article Not Located"
          description="The requested medical article could not be located."
          noIndex={true}
        />
        <PageContainer>
          <EmptyState
            icon={AlertCircle}
            title="Article Not Located"
            description={`We could not locate the requested article ("${slug}"). It may have been updated or relocated.`}
            action={
              <Link to={ROUTES.RESOURCES}>
                <Button variant="primary" size="sm">
                  Return to Resources
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
        title={`${article.title} — Clinical Insights`}
        description={article.excerpt || article.summary}
        canonicalUrl={`/resources/${article.slug}`}
        ogType="article"
        structuredData={[
          generateArticleSchema(article),
          generateBreadcrumbSchema([
            { label: 'Home', href: '/' },
            { label: 'Clinical Insights & Blog', href: '/resources' },
            { label: article.title }
          ])
        ]}
      />

      {/* 1. Article Hero & Header Visual */}
      <ResourceDetailHero article={article} />

      <PageContainer className="py-12 md:py-16 space-y-12">
        {/* 2. Main Article Content */}
        <ResourceContentBody article={article} />

        {/* 3. Contextual Conversion CTA */}
        <ResourceDetailCTA />
      </PageContainer>
    </div>
  );
}
