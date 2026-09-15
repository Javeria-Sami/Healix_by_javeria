/**
 * Healix Structured Data Generators (Schema.org JSON-LD)
 * Provides valid, structured schemas for Search Engine Discoverability.
 */

const BASE_URL = 'https://healix.health';

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    '@id': `${BASE_URL}/#organization`,
    name: 'Healix Healthcare',
    legalName: 'Healix Healthcare Group LLC',
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/favicon.svg`,
      width: 512,
      height: 512,
    },
    description:
      'Healix is a human-centered healthcare institution dedicated to proactive clinical excellence, precision diagnostics, and personalized longevity medicine.',
    telephone: '+1-800-432-5491',
    email: 'admissions@healix.health',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '742 Evergreen Medical Parkway, Suite 500',
      addressLocality: 'Boston',
      addressRegion: 'MA',
      postalCode: '02115',
      addressCountry: 'US',
    },
    medicalSpecialty: [
      'Cardiovascular',
      'PreventativeCare',
      'Endocrine',
      'Genetics',
      'PublicHealth',
    ],
    knowsAbout: [
      'Cardiovascular Diagnostics',
      'Preventative Genomics',
      'Metabolic Health',
      'Longevity Medicine',
      'Executive Health Assessments',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+1-800-432-5491',
        contactType: 'admissions and concierge intake',
        areaServed: 'US',
        availableLanguage: ['English', 'Spanish'],
      },
    ],
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: BASE_URL,
    name: 'Healix Healthcare',
    publisher: {
      '@id': `${BASE_URL}/#organization`,
    },
  };
}

export function generateBreadcrumbSchema(items = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? `${BASE_URL}${item.href}` : undefined,
    })),
  };
}

export function generatePhysicianSchema(physician) {
  if (!physician) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: physician.name,
    jobTitle: physician.role,
    medicalSpecialty: physician.specialty,
    description: physician.bio || physician.summary,
    image: physician.image,
    worksFor: {
      '@id': `${BASE_URL}/#organization`,
    },
    url: `${BASE_URL}/professionals/${physician.slug}`,
  };
}

export function generateArticleSchema(article) {
  if (!article) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    headline: article.title,
    description: article.excerpt,
    image: article.image,
    datePublished: article.publishedDate,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@id': `${BASE_URL}/#organization`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/resources/${article.slug}`,
    },
  };
}

export function generateFAQSchema(faqList = []) {
  if (!faqList || faqList.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqList.map((faq) => ({
      '@type': 'Question',
      name: faq.question || faq.title,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer || faq.content,
      },
    })),
  };
}

export function generateServiceSchema(service) {
  if (!service) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: service.title,
    description: service.shortDescription || service.description,
    procedureType: 'https://schema.org/DiagnosticProcedure',
    url: `${BASE_URL}/services/${service.slug}`,
    provider: {
      '@id': `${BASE_URL}/#organization`,
    },
  };
}
