import { Language } from './common';

export interface ContentHighlight {
  label: Record<Language, string>;
  value: string;
}

export interface ContentAction {
  label: Record<Language, string>;
  href: string;
  variant?: 'default' | 'outline' | 'secondary';
}

export interface ContentSection {
  heading: Record<Language, string>;
  body?: Record<Language, string>;
  icon?: string;
  items?: Array<Record<Language, string>>;
}

export interface ContentCard {
  title: Record<Language, string>;
  text: Record<Language, string>;
  icon?: string;
}

export interface ContentFaq {
  question: Record<Language, string>;
  answer: Record<Language, string>;
}

export interface ContentJob {
  title: Record<Language, string>;
  location: Record<Language, string>;
  type: string;
  applyEmail?: string;
}

export interface ContentPage {
  key: string;
  group: 'policy' | 'support' | 'career' | 'marketing';
  title: Record<Language, string>;
  description: Record<Language, string>;
  badge?: string;
  icon?: string;
  order?: number;
  highlights?: ContentHighlight[];
  actions?: ContentAction[];
  sections?: ContentSection[];
  cards?: ContentCard[];
  faqs?: ContentFaq[];
  jobs?: ContentJob[];
  imageUrl?: string;
}
