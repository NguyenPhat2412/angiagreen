import { Language } from './common';

export interface Notification {
  id: string;
  userId: string;
  title: Record<Language, string>;
  content: Record<Language, string>;
  type: 'order' | 'appointment' | 'promotion' | 'system';
  relatedId?: string;
  isRead: boolean;
  createdAt: string;
  readAt?: string;
}
