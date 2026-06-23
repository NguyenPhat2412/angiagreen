import { Language } from './common';

export interface Article {
  id: string;
  title: Record<Language, string>;
  slug: string;
  excerpt: Record<Language, string>;
  content?: Record<Language, string>;
  image: string;
  category: string;
  tags?: string[];
  publishedAt: string;
  author?: string;
}
