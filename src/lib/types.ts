export type NewsCategory = 'general' | 'technology' | 'health' | 'business' | 'sports' | 'entertainment';

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content?: string;
  url: string;
  imageUrl: string | null;
  source: string;
  publishedAt: string;
  category: NewsCategory;
}

export interface BookmarkRecord {
  id: string;
  user_id: string;
  news_title: string;
  news_url: string;
  news_description: string | null;
  news_image_url: string | null;
  news_source: string | null;
  category: string;
  created_at: string;
}

export const CATEGORIES: { value: NewsCategory; label: string }[] = [
  { value: 'general', label: 'Top Stories' },
  { value: 'technology', label: 'Technology' },
  { value: 'health', label: 'Health' },
  { value: 'business', label: 'Business' },
  { value: 'sports', label: 'Sports' },
  { value: 'entertainment', label: 'Entertainment' },
];

export const categoryColorMap: Record<NewsCategory, string> = {
  technology: 'bg-category-tech',
  health: 'bg-category-health',
  business: 'bg-category-business',
  sports: 'bg-category-sports',
  entertainment: 'bg-category-entertainment',
  general: 'bg-category-general',
};
