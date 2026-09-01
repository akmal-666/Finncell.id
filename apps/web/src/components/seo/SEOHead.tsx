import React, { useEffect } from 'react';
import type { SeoSchemaType } from '@fincell/shared';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  schemaType?: SeoSchemaType;
  schemaData?: Record<string, any>;
  siteName?: string;
}

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function setJsonLd(schema: object) {
  let el = document.getElementById('__json-ld__');
  if (!el) {
    el = document.createElement('script');
    (el as HTMLScriptElement).type = 'application/ld+json';
    el.id = '__json-ld__';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(schema, null, 2);
}

function buildSchema(
  schemaType: SeoSchemaType,
  schemaData?: Record<string, any>,
  title?: string,
  description?: string,
  ogImage?: string,
  canonical?: string,
  siteName?: string,
): object | null {
  const base: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    ...(schemaData || {}),
  };

  switch (schemaType) {
    case 'Organization':
      return { ...base, name: base.name || siteName, url: base.url || 'https://vincellid', logo: base.logo || ogImage };
    case 'LocalBusiness':
      return {
        ...base,
        '@type': 'LocalBusiness',
        name: base.name || siteName,
        url: 'https://vincellid',
        image: ogImage,
        priceRange: '$$',
        address: base.address || { '@type': 'PostalAddress', addressLocality: 'Jakarta', addressCountry: 'ID' },
      };
    case 'WebPage':
      return { ...base, name: title, description, url: canonical || 'https://vincellid' };
    case 'Product':
      return {
        ...base,
        name: base.name || title,
        description: base.description || description,
        image: base.image || ogImage,
        brand: { '@type': 'Brand', name: 'Apple' },
      };
    case 'Article':
      return {
        ...base,
        headline: title,
        description,
        image: ogImage,
        publisher: { '@type': 'Organization', name: siteName, logo: { '@type': 'ImageObject', url: ogImage } },
      };
    case 'FAQPage':
      return { ...base, mainEntity: base.mainEntity || [] };
    case 'BreadcrumbList':
      return { ...base, itemListElement: base.itemListElement || [] };
    default:
      return base;
  }
}

/**
 * SEOHead — sets <title>, <meta>, Open Graph, and JSON-LD via vanilla DOM.
 * No external dependencies required.
 */
export const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'vincellid — Toko iPhone & Apple Ecosystem Garansi Resmi',
  description = 'Beli iPhone 15, 14, 13 series bergaransi resmi Apple Indonesia. Trade-in instan dengan harga terbaik.',
  canonical,
  ogTitle,
  ogDescription,
  ogImage = 'https://vincellid/og-image.jpg',
  noIndex = false,
  noFollow = false,
  schemaType,
  schemaData,
  siteName = 'vincellid',
}) => {
  useEffect(() => {
    document.title = title;

    const robots = [noIndex ? 'noindex' : 'index', noFollow ? 'nofollow' : 'follow'].join(', ');
    setMeta('description', description);
    setMeta('robots', robots);

    if (canonical) setLink('canonical', canonical);

    // Open Graph
    setMeta('og:type', 'website', 'property');
    setMeta('og:site_name', siteName, 'property');
    setMeta('og:title', ogTitle || title, 'property');
    setMeta('og:description', ogDescription || description, 'property');
    setMeta('og:image', ogImage, 'property');
    if (canonical) setMeta('og:url', canonical, 'property');

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', ogTitle || title);
    setMeta('twitter:description', ogDescription || description);
    setMeta('twitter:image', ogImage);

    // JSON-LD Structured Data
    if (schemaType) {
      const schema = buildSchema(schemaType, schemaData, title, description, ogImage, canonical, siteName);
      if (schema) setJsonLd(schema);
    }
  }, [title, description, canonical, ogTitle, ogDescription, ogImage, noIndex, noFollow, schemaType, schemaData, siteName]);

  return null;
};
