import { Address } from './user';

export interface Shipping {
  id: string;
  orderId: string;
  carrierName?: string;
  trackingCode?: string;
  shippingFee: number;
  receiverName: string;
  receiverPhone: string;
  shippingAddress: Address;
  status: 'pending' | 'created' | 'picked_up' | 'shipping' | 'delivered' | 'failed' | 'returned' | 'cancelled';
  estimatedDeliveryDate?: string;
  deliveredAt?: string;
  failedReason?: string;
  note?: string;
  createdAt: string;
  updatedAt?: string;
}

// Support alias for Delivery if needed
export type Delivery = Shipping;
