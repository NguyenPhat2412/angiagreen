export type Language = 'vi' | 'en' | 'zh'

export interface PaginatedResponse<T> {
  items: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface Category {
  id: string
  name: Record<Language, string>
  slug: string
  icon: string
  description?: Record<Language, string>
}

export interface Product {
  id: string
  name: Record<Language, string>
  slug: string
  categoryId: string
  price: number
  originalPrice?: number
  discount?: number
  image: string
  images?: string[]
  description: Record<Language, string>
  shortDescription?: Record<Language, string>
  benefits?: Record<Language, string[]>
  usage?: Record<Language, string>
  attributes?: Record<string, string>
  origin?: string
  certifications?: string[]
  rating?: number
  soldCount?: number
  inStock?: boolean
  traceability?: {
    qrCode: string
    batch: string
    productionDate: string
    expiryDate: string
    region: string
    timeline: Array<{
      date: string
      event: Record<Language, string>
    }>
  }
}

export interface MembershipPackage {
  id: string
  name: Record<Language, string>
  price: number
  description: Record<Language, string>
  benefits: Array<Record<Language, string>>
  image: string
  featured?: boolean
}

export type MembershipLevelId = 'member' | 'silver' | 'gold' | 'platinum' | 'diamond'

export interface MembershipLevel {
  id: MembershipLevelId
  level: MembershipLevelId
  minSpent: number
  discount: number
  pointMultiplier: number
  freeShipping: boolean
  prioritySupport: boolean
  exclusiveOffers: boolean
}

export interface Doctor {
  id: string
  name: string
  title: Record<Language, string>
  specialty: Record<Language, string>
  experience: number
  image: string
  consultationType: ('online' | 'offline')[]
  nextAvailable?: string
  rating?: number
}

export interface Article {
  id: string
  title: Record<Language, string>
  slug: string
  excerpt: Record<Language, string>
  content?: Record<Language, string>
  image: string
  category: string
  tags?: string[]
  publishedAt: string
  author?: string
}

export interface CartItem {
  productId: string
  quantity: number
  attributes?: Record<string, string>
}

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  membershipLevel?: MembershipLevelId
  points?: number
  addresses?: Address[]
  favoriteProductIds?: string[]
  paymentMethods?: PaymentMethod[]
}

export interface Address {
  id: string
  name: string
  phone: string
  address: string
  city: string
  district: string
  ward: string
  isDefault?: boolean
}

export interface PaymentMethod {
  id: string
  type: 'cod' | 'bank' | 'card' | 'wallet'
  label: string
  provider?: string
  last4?: string
  isDefault?: boolean
}

export interface ContentHighlight {
  label: Record<Language, string>
  value: string
}

export interface ContentAction {
  label: Record<Language, string>
  href: string
  variant?: 'default' | 'outline' | 'secondary'
}

export interface ContentSection {
  heading: Record<Language, string>
  body?: Record<Language, string>
  icon?: string
  items?: Array<Record<Language, string>>
}

export interface ContentCard {
  title: Record<Language, string>
  text: Record<Language, string>
  icon?: string
}

export interface ContentFaq {
  question: Record<Language, string>
  answer: Record<Language, string>
}

export interface ContentJob {
  title: Record<Language, string>
  location: Record<Language, string>
  type: string
  applyEmail?: string
}

export interface ContentPage {
  key: string
  group: 'policy' | 'support' | 'career' | 'marketing'
  title: Record<Language, string>
  description: Record<Language, string>
  badge?: string
  icon?: string
  order?: number
  highlights?: ContentHighlight[]
  actions?: ContentAction[]
  sections?: ContentSection[]
  cards?: ContentCard[]
  faqs?: ContentFaq[]
  jobs?: ContentJob[]
}

export interface Order {
  id: string
  userId: string
  items: Array<{
    productId: string
    productName: string
    quantity: number
    price: number
    image: string
  }>
  status: 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled'
  totalAmount: number
  shippingFee: number
  discount?: number
  paymentMethod: 'cod' | 'bank' | 'vnpay'
  paymentProvider?: 'cod' | 'bank' | 'vnpay'
  paymentStatus?: 'unpaid' | 'pending' | 'paid' | 'failed' | 'refunded'
  transactionNo?: string
  paidAt?: string
  shippingAddress: Address
  createdAt: string
  note?: string
}

export interface Appointment {
  id: string
  userId: string
  doctorId?: string
  doctorName?: string
  date: string
  time: string
  type: 'online' | 'offline' | 'phone' | 'video' | 'chat'
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  topic?: string
  contactName?: string
  contactPhone?: string
  contactEmail?: string
  note?: string
}

export interface Notification {
  id: string
  userId: string
  title: Record<Language, string>
  content: Record<Language, string>
  type: 'order' | 'appointment' | 'promotion' | 'system'
  relatedId?: string
  isRead: boolean
  createdAt: string
}

export interface Review {
  id: string
  userId: string
  productId: string
  rating: number
  comment?: string
  createdAt: string
}

export interface MembershipOrder {
  id: string
  userId: string
  packageId: string
  packageName: Record<Language, string>
  price: number
  status: 'pending' | 'completed' | 'cancelled'
  paymentMethod: 'cod' | 'bank' | 'vnpay'
  paymentProvider?: 'cod' | 'bank' | 'vnpay'
  paymentStatus?: 'unpaid' | 'pending' | 'paid' | 'failed' | 'refunded'
  transactionNo?: string
  paidAt?: string
  shippingAddress?: Address
  note?: string
  createdAt: string
}
