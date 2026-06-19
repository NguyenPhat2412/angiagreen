'use client'

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useLanguage } from '@/lib/language-context'
import { useCart } from '@/lib/cart-context'
import { useAuth } from '@/lib/auth-context'
import { formatPrice } from '@/lib/data'
import { orderServices } from '@/services/orderApi'
import { productServices } from '@/services/productApi'
import { Breadcrumb } from '@/components/Breadcrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Shield,
  Phone,
  Truck,
  CreditCard,
  Building2,
  Banknote,
  Copy,
} from 'lucide-react'
import type { Order, Product } from '@/lib/types'

function CheckoutContent() {
  const { language, t } = useLanguage()
  const { items, clearCart } = useCart()
  const { refreshOrders } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const directProductId = searchParams.get('product')
  const directQuantity = Math.max(1, Number(searchParams.get('quantity')) || 1)

  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    district: '',
    ward: '',
    address: '',
    note: '',
  })

  useEffect(() => {
    const ids = directProductId ? [directProductId] : items.map((item) => item.productId)

    productServices.getByIds(ids)
      .then(setProducts)
      .catch(() => setProducts([]))
  }, [directProductId, items])

  const cartProducts = items.map((item) => {
    const product = products.find((p) => p.id === item.productId)
    return { ...item, product }
  }).filter((item) => item.product)

  const directProduct = directProductId ? products.find((p) => p.id === directProductId) : undefined
  const checkoutProducts = directProduct
    ? [{ productId: directProduct.id, quantity: directQuantity, product: directProduct }]
    : cartProducts

  const subtotal = checkoutProducts.reduce(
    (sum, item) => sum + (item.product?.price ?? 0) * item.quantity,
    0
  )
  const shippingFee = subtotal > 500000 ? 0 : 30000
  const total = subtotal + shippingFee

  const breadcrumbItems = [
    ...(directProduct ? [] : [{ label: t('cart'), href: '/gio-hang' }]),
    { label: t('checkout') },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await orderServices.create({
        items: checkoutProducts.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        shippingAddress: {
          id: `checkout-${Date.now()}`,
          name: formData.fullName,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          district: formData.district,
          ward: formData.ward,
        },
        paymentMethod: paymentMethod as Order['paymentMethod'],
        note: formData.note,
        returnUrl: `${window.location.origin}/thanh-toan/ket-qua-vnpay`,
      })

      if (!directProduct) {
        clearCart()
      }

      await refreshOrders()

      if (paymentMethod === 'vnpay' && response.paymentUrl) {
        window.location.href = response.paymentUrl
      } else if (paymentMethod === 'bank') {
        router.push(`/thanh-toan/thanh-cong?id=${response.id}&method=bank&amount=${response.totalAmount}`)
      } else {
        router.push(`/thanh-toan/thanh-cong?id=${response.id}`)
      }
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Order submission failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (checkoutProducts.length === 0) {
    return (
      <div className="min-h-screen bg-secondary">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumb items={breadcrumbItems} className="mb-6" />
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-4">
              {language === 'vi' && 'Giỏ hàng trống, vui lòng thêm sản phẩm trước khi thanh toán'}
              {language === 'en' && 'Cart is empty, please add products before checkout'}
              {language === 'zh' && '购物车为空，请在结账前添加商品'}
            </p>
            <Link href="/san-pham">
              <Button className="bg-[#4FAE4E] hover:bg-[#2F7D32] text-white">
                {t('continueShopping')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-secondary">
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} className="mb-6" />

        <h1 className="text-2xl font-bold text-foreground mb-6">{t('checkout')}</h1>
        {error && (
          <div className="mb-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Shipping info */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-[#4FAE4E]" />
                    {t('shippingInfo')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">
                      {language === 'vi' ? 'Họ và tên *' : language === 'en' ? 'Full name *' : '姓名 *'}
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      {language === 'vi' ? 'Số điện thoại *' : language === 'en' ? 'Phone number *' : '电话号码 *'}
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="email">{t('email')}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">
                      {language === 'vi' ? 'Tỉnh/Thành phố *' : language === 'en' ? 'City *' : '城市 *'}
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="district">
                      {language === 'vi' ? 'Quận/Huyện *' : language === 'en' ? 'District *' : '区/县 *'}
                    </Label>
                    <Input
                      id="district"
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ward">
                      {language === 'vi' ? 'Phường/Xã *' : language === 'en' ? 'Ward *' : '乡/镇 *'}
                    </Label>
                    <Input
                      id="ward"
                      name="ward"
                      value={formData.ward}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">
                      {language === 'vi' ? 'Địa chỉ chi tiết *' : language === 'en' ? 'Detailed address *' : '详细地址 *'}
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="note">
                      {language === 'vi' ? 'Ghi chú đơn hàng' : language === 'en' ? 'Order note' : '订单备注'}
                    </Label>
                    <Textarea
                      id="note"
                      name="note"
                      value={formData.note}
                      onChange={handleInputChange}
                      placeholder={language === 'vi' ? 'Ghi chú về đơn hàng, thời gian giao hàng...' : language === 'en' ? 'Notes about the order, delivery time...' : '关于订单、交货时间的备注...'}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-[#4FAE4E]" />
                    {t('paymentMethod')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                    <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-secondary transition-colors cursor-pointer">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="flex items-center gap-3 cursor-pointer flex-1">
                        <Banknote className="w-5 h-5 text-[#4FAE4E]" />
                        <div>
                          <p className="font-medium">
                            {language === 'vi' ? 'Thanh toán qua Shipper (COD)' : t('cod')}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {language === 'vi' && 'Thanh toán bằng tiền mặt khi nhận hàng'}
                            {language === 'en' && 'Pay with cash when receiving'}
                            {language === 'zh' && '收货时现金支付'}
                          </p>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-secondary transition-colors cursor-pointer">
                      <RadioGroupItem value="bank" id="bank" />
                      <Label htmlFor="bank" className="flex items-center gap-3 cursor-pointer flex-1">
                        <Building2 className="w-5 h-5 text-[#4FAE4E]" />
                        <div>
                          <p className="font-medium">
                            {language === 'vi' ? 'Mã QR cá nhân (Chuyển khoản)' : t('bankTransfer')}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {language === 'vi' && 'Quét mã QR ngân hàng để chuyển khoản ngay'}
                            {language === 'en' && 'Transfer via bank account / QR Code'}
                            {language === 'zh' && '通过银行账户/二维码转账'}
                          </p>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-secondary transition-colors cursor-pointer">
                      <RadioGroupItem value="vnpay" id="vnpay" />
                      <Label htmlFor="vnpay" className="flex items-center gap-3 cursor-pointer flex-1">
                        <CreditCard className="w-5 h-5 text-[#4FAE4E]" />
                        <div>
                          <p className="font-medium">{t('vnpay')}</p>
                          <p className="text-sm text-muted-foreground">
                            {language === 'vi' && 'Thanh toán trực tuyến qua VNPay'}
                            {language === 'en' && 'Online payment via VNPay'}
                            {language === 'zh' && '通过VNPay在线支付'}
                          </p>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>

                  {/* Bank info */}
                  {paymentMethod === 'bank' && (
                    <div className="mt-4 p-4 bg-secondary rounded-lg">
                      <h4 className="font-medium mb-3">
                        {language === 'vi' ? 'Thông tin chuyển khoản:' : language === 'en' ? 'Bank transfer info:' : '转账信息:'}
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            {language === 'vi' ? 'Ngân hàng:' : language === 'en' ? 'Bank:' : '银行:'}
                          </span>
                          <span className="font-medium">Vietcombank</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">
                            {language === 'vi' ? 'Số tài khoản:' : language === 'en' ? 'Account number:' : '账号:'}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">0123456789</span>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            {language === 'vi' ? 'Chủ tài khoản:' : language === 'en' ? 'Account holder:' : '账户持有人:'}
                          </span>
                          <span className="font-medium">CONG TY AN GIA GREEN</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            {language === 'vi' ? 'Nội dung:' : language === 'en' ? 'Content:' : '内容:'}
                          </span>
                          <span className="font-medium">[SĐT] + [Họ tên]</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Order summary */}
            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>
                    {language === 'vi' ? 'Đơn hàng của bạn' : language === 'en' ? 'Your Order' : '您的订单'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Products */}
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {checkoutProducts.map((item) => (
                      <div key={item.productId} className="flex gap-3">
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-secondary shrink-0">
                          <Image
                            src={item.product!.image}
                            alt={item.product!.name[language]}
                            fill
                            className="object-cover"
                            sizes="56px"
                          />
                          <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#4FAE4E] text-white text-xs rounded-full flex items-center justify-center">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium line-clamp-2">{item.product!.name[language]}</p>
                          <p className="text-sm text-[#E53935]">{formatPrice(item.product!.price * item.quantity)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t('subtotal')}</span>
                      <span className="font-medium">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t('shippingFee')}</span>
                      <span className="font-medium">
                        {shippingFee === 0 ? (
                          <span className="text-[#4FAE4E]">
                            {language === 'vi' ? 'Miễn phí' : language === 'en' ? 'Free' : '免费'}
                          </span>
                        ) : (
                          formatPrice(shippingFee)
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between">
                      <span className="font-semibold">{t('total')}</span>
                      <span className="text-xl font-bold text-[#E53935]">{formatPrice(total)}</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#4FAE4E] hover:bg-[#2F7D32] text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      language === 'vi' ? 'Đang xử lý...' : language === 'en' ? 'Processing...' : '处理中...'
                    ) : (
                      t('placeOrder')
                    )}
                  </Button>

                  {/* Trust badges */}
                  <div className="pt-4 border-t border-border space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Shield className="w-4 h-4 text-[#4FAE4E]" />
                      <span>{language === 'vi' ? 'Thanh toán an toàn & bảo mật' : language === 'en' ? 'Safe & secure payment' : '安全支付'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Phone className="w-4 h-4 text-[#4FAE4E]" />
                      <span>{language === 'vi' ? 'Hỗ trợ: 1900 1234' : language === 'en' ? 'Support: 1900 1234' : '支持: 1900 1234'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-secondary" />}>
      <CheckoutContent />
    </Suspense>
  )
}
