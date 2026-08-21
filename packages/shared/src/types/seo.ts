export type SeoSchemaType =
  | 'Product'
  | 'Organization'
  | 'LocalBusiness'
  | 'BreadcrumbList'
  | 'FAQPage'
  | 'WebPage'
  | 'Article'
  | 'ItemList';

export type SeoIndexDirective = 'index' | 'noindex';
export type SeoFollowDirective = 'follow' | 'nofollow';

export interface SeoMetadata {
  id: string;
  entityType: 'page' | 'product' | 'category' | 'blog';
  entityId: string; // slug or id
  seoTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  indexDirective: SeoIndexDirective;
  followDirective: SeoFollowDirective;
  schemaType?: SeoSchemaType;
  updatedAt: string;
}

export interface GlobalSeoSettings {
  websiteName: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultOgImage: string;
  googleSearchConsoleToken?: string;
  googleAnalyticsId?: string;
  titleSeparator: string;
}

export interface SeoRedirect {
  id: string;
  source: string;
  target: string;
  type: '301' | '302';
  isActive: boolean;
  createdAt: string;
}

export interface SeoStats {
  indexedPages: number;
  clicks: number;
  impressions: number;
  averageCtr: number;
}
