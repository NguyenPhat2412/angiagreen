import { MembershipLevelId } from './membership';

export interface Address {
  id: string;
  name: string;
  detailAddress?: string;
  address?: string; // Backward compatibility for existing code
  phone: string;
  city: string;
  district: string;
  ward: string;
  isDefault?: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'cod' | 'bank' | 'card' | 'wallet';
  label: string;
  provider?: string;
  last4?: string;
  isDefault?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  membershipLevel?: MembershipLevelId;
  points?: number;
  addresses?: Address[];
  favoriteProductIds?: string[]; // Kept for backward compatibility
  paymentMethods?: PaymentMethod[]; // Kept for backward compatibility
}

export interface UserRole {
  id: string;
  userId: string;
  roleId: string;
  status: 'active' | 'inactive';
  assignedBy?: string;
  assignedAt: string;
  revokedBy?: string;
  revokedAt?: string;
  note?: string;
}
