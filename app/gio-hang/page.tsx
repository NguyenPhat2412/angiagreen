'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/lib/language-context'
import { useCart } from '@/lib/cart-context'
import { formatPrice } from '@/lib/data'
import { productServices } from '@/services/productApi'
import { Breadcrumb } from '@/components/Breadcrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react'
import type { Product } from '@/lib/types'

export default function CartPage() {
  const { language, t } = useLanguage()
  const { items, updateQuantity, removeItem, clearCart } = useCart()
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    productServices.getByIds(items.map((item) => item.productId))
      .then(setProducts)
      .catch(() => setProducts([]))
  }, [items])

  const cartProducts = items.map((item) => {
    const product = products.find((p) => p.id === item.productId)
    return { ...item, product }
  }).filter((item) => item.product)

  const subtotal = cartProducts.reduce(
    (sum, item) => sum + (item.product?.price ?? 0) * item.quantity,
    0
  )
  const shippingFee = subtotal > 500000 ? 0 : 30000
  const total = subtotal + shippingFee

  const breadcrumbItems = [{ label: t('cart') }]

  if (cartProducts.length === 0) {
    return (
      <div className="min-h-screen bg-secondary">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumb items={breadcrumbItems} className="mb-6" />
          <div className="text-center py-20">
            <ShoppingBag className="w-24 h-24 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-foreground mb-2">{t('emptyCart')}</h2>
            <p className="text-muted-foreground mb-6">
              {language === 'vi' && 'Giỏ hàng của bạn chưa có sản phẩm nào'}
              {language === 'en' && 'Your cart has no items yet'}
              {language === 'zh' && '您的购物车还没有商品'}
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

        <h1 className="text-2xl font-bold text-foreground mb-6">{t('yourCart')}</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart items */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                <table className="w-full">
                  <thead className="bg-secondary">
                    <tr className="text-sm text-muted-foreground">
                      <th className="text-left p-4">
                        {language === 'vi' ? 'Sản phẩm' : language === 'en' ? 'Product' : '产品'}
                      </th>
                      <th className="text-center p-4 hidden sm:table-cell">
                        {language === 'vi' ? 'Giá' : language === 'en' ? 'Price' : '价格'}
                      </th>
                      <th className="text-center p-4">
                        {language === 'vi' ? 'Số lượng' : language === 'en' ? 'Quantity' : '数量'}
                      </th>
                      <th className="text-right p-4">
                        {language === 'vi' ? 'Tổng' : language === 'en' ? 'Total' : '小计'}
                      </th>
                      <th className="p-4 w-12"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {cartProducts.map((item) => (
                      <tr key={item.productId}>
                        <td className="p-4">
                          <div className="flex items-center gap-4">
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-secondary shrink-0">
                              <Image
                                src={item.product!.image}
                                alt={item.product!.name[language]}
                                fill
                                className="object-cover"
                                sizes="64px"
                              />
                            </div>
                            <div>
                              <Link
                                href={`/san-pham/${item.product!.slug}`}
                                className="font-medium text-foreground hover:text-[#4FAE4E] line-clamp-2"
                              >
                                {item.product!.name[language]}
                              </Link>
                              <p className="text-sm text-[#E53935] sm:hidden mt-1">
                                {formatPrice(item.product!.price)}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="text-center p-4 hidden sm:table-cell">
                          <span className="text-[#E53935] font-medium">
                            {formatPrice(item.product!.price)}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-center border border-border rounded-lg w-fit mx-auto">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </td>
                        <td className="text-right p-4">
                          <span className="font-medium text-[#E53935]">
                            {formatPrice(item.product!.price * item.quantity)}
                          </span>
                        </td>
                        <td className="p-4">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => removeItem(item.productId)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>

            <div className="flex justify-between mt-4">
              <Link href="/san-pham">
                <Button variant="outline">{t('continueShopping')}</Button>
              </Link>
              <Button variant="ghost" className="text-destructive" onClick={clearCart}>
                <Trash2 className="w-4 h-4 mr-2" />
                {language === 'vi' ? 'Xóa tất cả' : language === 'en' ? 'Clear all' : '清空购物车'}
              </Button>
            </div>
          </div>

          {/* Order summary */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>
                  {language === 'vi' ? 'Tóm tắt đơn hàng' : language === 'en' ? 'Order Summary' : '订单摘要'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Coupon */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder={language === 'vi' ? 'Mã giảm giá' : language === 'en' ? 'Discount code' : '折扣码'}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline">
                    {language === 'vi' ? 'Áp dụng' : language === 'en' ? 'Apply' : '应用'}
                  </Button>
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
                  {subtotal < 500000 && (
                    <p className="text-xs text-muted-foreground">
                      {language === 'vi' && `Mua thêm ${formatPrice(500000 - subtotal)} để được miễn phí vận chuyển`}
                      {language === 'en' && `Add ${formatPrice(500000 - subtotal)} more for free shipping`}
                      {language === 'zh' && `再购买 ${formatPrice(500000 - subtotal)} 即可免运费`}
                    </p>
                  )}
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between">
                    <span className="font-semibold">{t('total')}</span>
                    <span className="text-xl font-bold text-[#E53935]">{formatPrice(total)}</span>
                  </div>
                </div>

                <Link href="/thanh-toan" className="block">
                  <Button className="w-full bg-[#4FAE4E] hover:bg-[#2F7D32] text-white">
                    {t('checkout')}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>

                {/* Trust badges */}
                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground text-center">
                    {language === 'vi' && 'Thanh toán an toàn & bảo mật'}
                    {language === 'en' && 'Safe & secure checkout'}
                    {language === 'zh' && '安全结账'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
