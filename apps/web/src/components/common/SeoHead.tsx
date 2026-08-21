import React, { useEffect } from 'react';

export interface SeoHeadProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'product' | 'article';
  jsonLdSchema?: Record<string, any>;
}

export const SeoHead: React.FC<SeoHeadProps> = ({
  title,
  description,
  canonicalUrl,
  ogImage = 'https://fincell.id/og-image.jpg',
  ogType = 'website',
  jsonLdSchema,
}) => {
  useEffect(() => {
    // 1. Update Document Title
    const fullTitle = `${title} — fincell.id`;
    document.title = fullTitle;

    // Helper to update meta tag
    const setMetaTag = (nameOrProperty: 'name' | 'property', attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${nameOrProperty}="${attrValue}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(nameOrProperty, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard Meta
    setMetaTag('name', 'description', description);

    // 3. OpenGraph
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:image', ogImage);
    if (canonicalUrl) {
      setMetaTag('property', 'og:url', canonicalUrl);
    }

    // 4. Canonical Link
    if (canonicalUrl) {
      let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonicalUrl);
    }

    // 5. JSON-LD Schema
    let scriptTag = document.querySelector('#json-ld-schema') as HTMLScriptElement;
    if (jsonLdSchema) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'json-ld-schema';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(jsonLdSchema);
    } else if (scriptTag) {
      scriptTag.remove();
    }

    return () => {
      // Clean up json-ld script when unmounting if needed
    };
  }, [title, description, canonicalUrl, ogImage, ogType, jsonLdSchema]);

  return null;
};
