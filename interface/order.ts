import { Address } from './user';

export interface CartItem {
  productId: string;
  quantity: number;
  attributes?: Record<string, string>;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  productImage: string;
  finalPrice: number;
  totalPrice: number;
  selectedAttributes?: Record<string, string>;
  createdAt: string;
  
  // Backward compatibility fields
  price?: number; 
  image?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled';
  totalAmount: number;
  shippingFee: number;
  discount?: number;
  paymentMethod: 'cod' | 'bank' | 'vnpay';
  shippingAddress: Address;
  createdAt: string;
  note?: string;

  // Backward compatibility fields
  paymentProvider?: 'cod' | 'bank' | 'vnpay';
  paymentStatus?: 'unpaid' | 'pending' | 'paid' | 'failed' | 'refunded';
  transactionNo?: string;
  paidAt?: string;
}

export interface OrderStatusHistory {
  id: string;
  orderId: string;
  previousStatus?: string;
  newStatus: string;
  changedBy: string;
  note?: string;
  createdAt: string;
}
