/**
 * URL utility functions for Megawe
 * Provides slug generation and URL formatting functions
 */

/**
 * Create a URL-friendly slug from text
 */
export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
}

/**
 * Create job slug with ID format: {slug}-{id}
 */
export function createJobSlug(title: string, company: string, id: string): string {
  const combined = `${title} at ${company}`;
  const slug = createSlug(combined);
  return `${slug}-${id}`;
}

/**
 * Create job URL from database slug and ID
 */
export function createJobUrlFromDbSlug(dbSlug: string, id: string): string {
  return `${dbSlug}-${id}`;
}

/**
 * Create employer slug with ID format: {slug}-{id}
 */
export function createEmployerSlug(name: string, id: string): string {
  const slug = createSlug(name);
  return `${slug}-${id}`;
}

/**
 * Generate job URL with slug format
 */
export function getJobUrl(title: string, company: string, id: string): string {
  const slug = createJobSlug(title, company, id);
  return `/jobs/${slug}`;
}

/**
 * Generate job URL from database slug
 */
export function getJobUrlFromDb(dbSlug: string, id: string): string {
  const fullSlug = createJobUrlFromDbSlug(dbSlug, id);
  return `/jobs/${fullSlug}`;
}

/**
 * Generate job URL from job object (uses slug from API if available)
 */
export function getJobUrlFromJob(job: {
  id: string;
  seo?: {
    slug?: string;
    fallback?: {
      title?: string;
      company?: string;
    };
  };
  title?: string;
  company?: string;
}): string {
  if (job.seo?.slug) {
    return getJobUrlFromDb(job.seo.slug, job.id);
  }
  // Fallback to creating slug from title and company (with type safety)
  const title = job.seo?.fallback?.title || job.title || '';
  const company = job.seo?.fallback?.company || job.company || '';
  return getJobUrl(title, company, job.id);
}

/**
 * Generate employer URL with slug format
 */
export function getEmployerUrl(name: string, id: string): string {
  const slug = createEmployerSlug(name, id);
  return `/employers/${slug}`;
}

/**
 * Extract ID from slug format (last part after hyphen)
 */
export function extractIdFromSlug(slug: string): string {
  const parts = slug.split('-');
  return parts[parts.length - 1];
}

/**
 * Generate full megawe.net URL
 */
export function getFullMegaweUrl(path: string): string {
  return `https://megawe.net${path}`;
}