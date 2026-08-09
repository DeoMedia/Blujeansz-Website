import culturalTrendsImg from "figma:asset/4aecbee8a189baff930e50f717faae7e8b83d167.png";
import youthCultureImg from "figma:asset/7596ecbc56e3575e3a2807cc40cb6f0cc322d09f.png";
import scalingBrandsImg from "figma:asset/fa9308f9c3dcf7a42bd52f0eff4aa6a702a8890f.png";

import { editorialArticles, type EditorialArticle } from "./editorial.generated";
import { parseContentBlocks, type ContentBlock } from "../types/content";

/**
 * Reading layer over the generated editorial content.
 *
 * This is the interim source for the public Insights pages: the articles are
 * already modelled exactly as the CMS stores them (validated content blocks,
 * slugs, categories, publish dates), so swapping this module for the API is a
 * change of data source, not of shape.
 */

export const CATEGORY_NAMES: Record<string, string> = {
  "cultural-intelligence": "Cultural Intelligence",
  "african-markets": "African Markets",
  "brand-growth": "Brand Growth",
  "youth-influence": "Youth & Influence",
  "global-local": "Global × Local",
};

/**
 * The Figma export only ever included artwork for the first three articles.
 * The rest render a designed fallback rather than a broken or borrowed image.
 */
const ARTICLE_IMAGES: Record<string, string> = {
  "the-cultural-shifts-redefining-african-global-brands-in-2026": culturalTrendsImg,
  "youth-culture-africa-s-most-underrated-growth-lever": youthCultureImg,
  "why-most-african-brands-struggle-to-scale-globally": scalingBrandsImg,
};

export interface Article {
  title: string;
  slug: string;
  excerpt: string;
  categorySlug: string;
  categoryName: string;
  readTime: string;
  publishedAt: Date | null;
  displayDate: string;
  featured: boolean;
  image: string | null;
  blocks: ContentBlock[];
}

function toArticle(source: EditorialArticle): Article {
  const publishedAt = source.publishedAt ? new Date(source.publishedAt) : null;

  return {
    title: source.title,
    slug: source.slug,
    excerpt: source.excerpt,
    categorySlug: source.categorySlug,
    categoryName: CATEGORY_NAMES[source.categorySlug] ?? source.categorySlug,
    readTime: `${source.readTimeMinutes} min read`,
    publishedAt,
    displayDate: publishedAt
      ? publishedAt.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "",
    featured: source.featured,
    image: ARTICLE_IMAGES[source.slug] ?? null,
    // Run through the same validator the API responses use, so this path and
    // the database path cannot diverge in what they consider renderable.
    blocks: parseContentBlocks(source.blocks),
  };
}

const allArticles = editorialArticles.map(toArticle);

/**
 * Public listing. Mirrors the database rule exactly: published, and only once
 * the publish date has actually passed. The four articles scheduled for
 * September–December 2026 stay hidden until their date arrives.
 */
export function getPublishedArticles(): Article[] {
  const now = Date.now();

  return allArticles
    .filter((article, index) => {
      const source = editorialArticles[index];
      return (
        source.status === "published" &&
        article.publishedAt !== null &&
        article.publishedAt.getTime() <= now
      );
    })
    .sort((a, b) => (b.publishedAt?.getTime() ?? 0) - (a.publishedAt?.getTime() ?? 0));
}

export function getFeaturedArticles(): Article[] {
  return getPublishedArticles().filter((article) => article.featured);
}

export function getArticleBySlug(slug: string): Article | null {
  return getPublishedArticles().find((article) => article.slug === slug) ?? null;
}

/** Same-category first, topped up with the most recent others. */
export function getRelatedArticles(current: Article, limit = 3): Article[] {
  const others = getPublishedArticles().filter((article) => article.slug !== current.slug);
  const sameCategory = others.filter((a) => a.categorySlug === current.categorySlug);

  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);

  const seen = new Set(sameCategory.map((a) => a.slug));
  const filler = others.filter((a) => !seen.has(a.slug));

  return [...sameCategory, ...filler].slice(0, limit);
}

/**
 * The three original article routes used different slugs. Keeping them alive
 * means any link already shared or indexed still resolves.
 */
export const LEGACY_SLUG_REDIRECTS: Record<string, string> = {
  "cultural-trends-2026": "the-cultural-shifts-redefining-african-global-brands-in-2026",
  "youth-culture-growth-lever": "youth-culture-africa-s-most-underrated-growth-lever",
  "scaling-african-brands": "why-most-african-brands-struggle-to-scale-globally",
};
