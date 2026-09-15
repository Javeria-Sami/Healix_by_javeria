import { useEffect } from 'react';

const BASE_URL = 'https://healix.health';

/**
 * Custom hook to dynamically manage document head metadata, Open Graph, Twitter cards, and Schema.org JSON-LD scripts.
 */
export function useSEO({
  title,
  description,
  canonicalPath = '',
  canonicalUrl = '',
  ogImage = '/favicon.svg',
  ogType = 'website',
  noIndex = false,
  structuredData,
}) {
  useEffect(() => {
    // 1. Page Title
    const formattedTitle = title
      ? `${title} | Healix Healthcare`
      : 'Healix — Premium Healthcare & Digital Medical Innovation';
    document.title = formattedTitle;

    // Helper to update or create meta tag
    const setMetaTag = (attributeName, attributeValue, content) => {
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content || '');
    };

    // 2. Meta Description
    const defaultDesc =
      'Healix is a modern, human-centered healthcare brand delivering exceptional medical solutions, patient-focused digital experiences, and healthcare innovation.';
    setMetaTag('name', 'description', description || defaultDesc);

    // 3. Robots Directive
    setMetaTag('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow');

    // 4. Canonical URL
    const targetPath = canonicalPath || canonicalUrl || '';
    const resolvedCanonical = targetPath.startsWith('http')
      ? targetPath
      : targetPath
        ? `${BASE_URL}${targetPath.startsWith('/') ? '' : '/'}${targetPath}`
        : BASE_URL;

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', resolvedCanonical);

    // 5. Open Graph Metadata
    setMetaTag('property', 'og:title', formattedTitle);
    setMetaTag('property', 'og:description', description || defaultDesc);
    setMetaTag('property', 'og:url', resolvedCanonical);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:site_name', 'Healix Healthcare');
    setMetaTag('property', 'og:image', ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`);

    // 6. Twitter Card Metadata
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', formattedTitle);
    setMetaTag('name', 'twitter:description', description || defaultDesc);
    setMetaTag('name', 'twitter:image', ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`);

    // 7. Structured Data (JSON-LD)
    let jsonLdScript = document.querySelector('script[data-seo="true"]');
    if (structuredData) {
      if (!jsonLdScript) {
        jsonLdScript = document.createElement('script');
        jsonLdScript.setAttribute('type', 'application/ld+json');
        jsonLdScript.setAttribute('data-seo', 'true');
        document.head.appendChild(jsonLdScript);
      }
      jsonLdScript.textContent = JSON.stringify(structuredData);
    } else if (jsonLdScript) {
      jsonLdScript.remove();
    }

    return () => {
      // Cleanup custom structured data script on unmount
      const script = document.querySelector('script[data-seo="true"]');
      if (script) {
        script.remove();
      }
    };
  }, [
    title,
    description,
    canonicalPath,
    canonicalUrl,
    ogImage,
    ogType,
    noIndex,
    structuredData,
  ]);
}
