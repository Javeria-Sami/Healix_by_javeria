import React from 'react';
import { useSEO } from '../../hooks/useSEO.js';

/**
 * SEO Component: Declarative component wrapper around useSEO hook.
 */
export function SEO({
  title,
  description,
  canonicalPath,
  canonicalUrl,
  ogImage,
  ogType,
  noIndex,
  structuredData,
}) {
  useSEO({
    title,
    description,
    canonicalPath,
    canonicalUrl,
    ogImage,
    ogType,
    noIndex,
    structuredData,
  });

  return null;
}
