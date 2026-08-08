import culturalTrendsImg from "figma:asset/4aecbee8a189baff930e50f717faae7e8b83d167.png";
import youthCultureImg from "figma:asset/7596ecbc56e3575e3a2807cc40cb6f0cc322d09f.png";
import scalingBrandsImg from "figma:asset/fa9308f9c3dcf7a42bd52f0eff4aa6a702a8890f.png";

export interface Insight {
  id: number;
  slug: string;
  image: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  featured: boolean;
  // Date as a sortable value for ordering (YYYY-MM-DD format)
  sortDate: string;
}

// Centralized insights data - add new articles here and they'll automatically appear on both pages
export const insights: Insight[] = [
  {
    id: 3,
    slug: "scaling-african-brands",
    image: scalingBrandsImg,
    category: "Growth",
    title: "Why Most African Brands Struggle to Scale Globally",
    excerpt: "Scaling globally isn't just about expansion—it's about positioning. Discover why identity confusion holds brands back and how to scale strategically.",
    date: "March 5, 2026",
    sortDate: "2026-03-05",
    readTime: "5 min read",
    featured: true,
  },
  {
    id: 2,
    slug: "youth-culture-growth-lever",
    image: youthCultureImg,
    category: "Culture",
    title: "Why Youth Culture Is the Most Underrated Growth Lever in Africa",
    excerpt: "Most brands say they target youth, but very few actually understand them. Learn why youth culture is the engine of growth in Africa.",
    date: "February 5, 2026",
    sortDate: "2026-02-05",
    readTime: "5 min read",
    featured: true,
  },
  {
    id: 1,
    slug: "cultural-trends-2026",
    image: culturalTrendsImg,
    category: "Strategy",
    title: "The 2026 Cultural Trends Shaping African & Global Brands",
    excerpt: "Culture is no longer a layer on top of marketing—it is the strategy. Discover how culture moves, evolves, and influences consumer behavior in 2026.",
    date: "January 8, 2026",
    sortDate: "2026-01-08",
    readTime: "6 min read",
    featured: true,
  },
];

// Helper function to get insights sorted by date (newest first)
export function getInsightsByDate(limit?: number): Insight[] {
  const sorted = [...insights].sort((a, b) => {
    return new Date(b.sortDate).getTime() - new Date(a.sortDate).getTime();
  });
  
  return limit ? sorted.slice(0, limit) : sorted;
}

// Helper function to get featured insights
export function getFeaturedInsights(): Insight[] {
  return insights.filter((insight) => insight.featured);
}