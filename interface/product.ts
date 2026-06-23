import { Language } from './common';

export interface Category {
  id: string;
  name: Record<Language, string>;
  slug: string;
  icon: string;
  description: Record<Language, string>;
}

export interface ProductTraceabilityTimelineItem {
  date: string;
  event: Record<Language, string>;
}

export interface ProductTraceability {
  qrCode: string;
  batch: string;
  productionDate: string;
  expiryDate: string;
  region: string;
  timeline: ProductTraceabilityTimelineItem[];
}

export interface Product {
  id: string;
  name: Record<Language, string>;
  slug: string;
  categoryId: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  images?: string[];
  description: Record<Language, string>;
  shortDescription?: Record<Language, string>;
  benefits?: Record<Language, string[]>;
  usage?: Record<Language, string>;
  attributes?: Record<string, string>;
  origin?: string;
  certifications?: string[];
  rating?: number;
  soldCount?: number;
  inStock?: boolean;
  traceability?: ProductTraceability;
}

export interface Inventory {
  id: string;
  productId: string;
  sku: string;
  quantityInStock: number;
  quantityReserved: number;
  warehouseLocation?: string;
  lastRestocked: string;
}

export interface Review {
  id: string;
  userId: string;
  productId: string;
  orderId?: string;
  ratingScore: number;
  rating?: number; // Backward compatibility
  comment?: string;
  images?: string[];
  reply?: string;
  createdAt: string;
}
