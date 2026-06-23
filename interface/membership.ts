import { Language } from './common';
import { Address } from './user';

export type MembershipLevelId = 'member' | 'silver' | 'gold' | 'platinum' | 'diamond';

export interface MembershipLevel {
  id: MembershipLevelId;
  level: MembershipLevelId;
  minSpent: number;
  discount: number;
  pointMultiplier: number;
  freeShipping: boolean;
  prioritySupport: boolean;
  exclusiveOffers?: boolean;
}

export interface MembershipPackage {
  id: string;
  name: Record<Language, string>;
  price: number;
  description: Record<Language, string>;
  benefits: Array<Record<Language, string>>;
  image: string;
  featured?: boolean;
}

export interface MembershipSubscription {
  id: string;
  userId: string;
  packageId: string;
  packageName: string;
  price: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'cancelled' | 'pending_payment';
}

export interface MembershipOrder {
  id: string;
  userId: string;
  packageId: string;
  packageName: Record<Language, string>;
  price: number;
  status: 'pending' | 'completed' | 'cancelled';
  paymentMethod: 'cod' | 'bank' | 'vnpay';
  paymentProvider?: 'cod' | 'bank' | 'vnpay';
  paymentStatus?: 'unpaid' | 'pending' | 'paid' | 'failed' | 'refunded';
  transactionNo?: string;
  paidAt?: string;
  shippingAddress?: Address;
  note?: string;
  createdAt: string;
}
