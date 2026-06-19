'use client'

import { Suspense, useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useLanguage } from '@/lib/language-context'
import { useAuth } from '@/lib/auth-context'
import { formatPrice } from '@/lib/data'
import { membershipServices } from '@/services/membershipApi'
import { Breadcrumb } from '@/components/Breadcrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Shield,
  Phone,
  Crown,
  CreditCard,
  Building2,
  Banknote,
  Copy,
  Check,
} from 'lucide-react'
import type { MembershipPackage } from '@/lib/types'

function MembershipCheckoutContent() {
  const { language, t } = useLanguage()
  const { user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const packageId = searchParams.get('id')

  const [packages, setPackages] = useState<MembershipPackage[]>([])
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bank' | 'vnpay'>('vnpay')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [shipPhysicalCard, setShipPhysicalCard] = useState(false)
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    city: '',
    district: '',
    ward: '',
    address: '',
    note: '',
  })

  useEffect(() => {
    membershipServices.getPackages()
      .then(setPackages)
      .catch(() => setPackages([]))
  }, [])

  const selectedPackage = useMemo(
    () => packages.find((p) => p.id === packageId),
    [packageId, packages]
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    if (!selectedPackage) {
      setError('Membership package not found')
      setIsSubmitting(false)
      return
    }

    try {
      const payload: any = {
        packageId: selectedPackage.id,
        paymentMethod,
        note: formData.note,
      }

      if (shipPhysicalCard) {
        payload.shippingAddress = {
          name: formData.fullName,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          district: formData.district,
          ward: formData.ward,
        }
      }

      if (paymentMethod === 'vnpay') {
        payload.returnUrl = `${window.location.origin}/goi-thanh-vien/ket-qua-vnpay`
      }

      const response = await membershipServices.createOrder(payload)

      if (paymentMethod === 'vnpay' && response.paymentUrl) {
        window.location.href = response.paymentUrl
      } else if (paymentMethod === 'bank') {
        router.push(`/goi-thanh-vien/thanh-cong?id=${response.order.id}&method=bank&amount=${response.order.price}`)
      } else {
        router.push(`/goi-thanh-vien/thanh-cong?id=${response.order.id}`)
      }
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Registration failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!selectedPackage) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center p-4">
        <div className="text-center py-20">
          <p className="text-muted-foreground mb-4">
            {language === 'vi' ? 'Không tìm thấy thông tin gói hội viên' : 'Membership package details not found'}
          </p>
          <Link href="/goi-thanh-vien">
            <Button className="bg-[#4FAE4E] hover:bg-[#2F7D32] text-white">
              {language === 'vi' ? 'Xem danh sách gói' : 'View packages'}
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-secondary">
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb
          items={[
            { label: language === 'vi' ? 'Gói hội viên' : 'Membership packages', href: '/goi-thanh-vien' },
            { label: selectedPackage.name[language], href: `/goi-thanh-vien/${selectedPackage.id}` },
            { label: t('checkout') },
          ]}
          className="mb-6"
        />

        <h1 className="text-2xl font-bold text-foreground mb-6">
          {language === 'vi' ? 'Đăng ký gói hội viên' : 'Register membership package'}
        </h1>

        {error && (
          <div className="mb-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Profile/Contact info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[#4FAE4E]">
                    <Crown className="w-5 h-5" />
                    {language === 'vi' ? 'Thông tin đăng ký hội viên' : 'Membership registration details'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">
                        {language === 'vi' ? 'Họ và tên *' : 'Full name *'}
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
                        {language === 'vi' ? 'Số điện thoại liên hệ *' : 'Contact phone *'}
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
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox
                      id="shipPhysicalCard"
                      checked={shipPhysicalCard}
                      onCheckedChange={(checked) => setShipPhysicalCard(!!checked)}
                    />
                    <label
                      htmlFor="shipPhysicalCard"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-[#4FAE4E]"
                    >
                      {language === 'vi' ? 'Gửi kèm thẻ hội viên cứng & quà tặng về nhà' : 'Deliver physical membership card & gifts to my address'}
                    </label>
                  </div>

                  {shipPhysicalCard && (
                    <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-border border-dashed">
                      <div className="space-y-2">
                        <Label htmlFor="city">
                          {language === 'vi' ? 'Tỉnh/Thành phố *' : 'City *'}
                        </Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required={shipPhysicalCard}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="district">
                          {language === 'vi' ? 'Quận/Huyện *' : 'District *'}
                        </Label>
                        <Input
                          id="district"
                          name="district"
                          value={formData.district}
                          onChange={handleInputChange}
                          required={shipPhysicalCard}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ward">
                          {language === 'vi' ? 'Phường/Xã *' : 'Ward *'}
                        </Label>
                        <Input
                          id="ward"
                          name="ward"
                          value={formData.ward}
                          onChange={handleInputChange}
                          required={shipPhysicalCard}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">
                          {language === 'vi' ? 'Địa chỉ chi tiết *' : 'Detailed address *'}
                        </Label>
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required={shipPhysicalCard}
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="note">
                      {language === 'vi' ? 'Ghi chú đăng ký' : 'Registration note'}
                    </Label>
                    <Textarea
                      id="note"
                      name="note"
                      value={formData.note}
                      onChange={handleInputChange}
                      placeholder={language === 'vi' ? 'Ghi chú thêm...' : 'Additional notes...'}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Methods */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-[#4FAE4E]" />
                    {t('paymentMethod')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={(val: any) => setPaymentMethod(val)} className="space-y-3">
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

                    {shipPhysicalCard && (
                      <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-secondary transition-colors cursor-pointer">
                        <RadioGroupItem value="cod" id="cod" />
                        <Label htmlFor="cod" className="flex items-center gap-3 cursor-pointer flex-1">
                          <Banknote className="w-5 h-5 text-[#4FAE4E]" />
                          <div>
                            <p className="font-medium">
                              {language === 'vi' ? 'Thanh toán qua Shipper (COD)' : t('cod')}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {language === 'vi' && 'Thanh toán tiền mặt khi shipper giao thẻ hội viên'}
                              {language === 'en' && 'Pay cash on delivery of card'}
                              {language === 'zh' && '收货硬卡时现金支付'}
                            </p>
                          </div>
                        </Label>
                      </div>
                    )}
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
                              <Copy className="w-3.5 h-3.5" />
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

            {/* Package Summary */}
            <div>
              <Card className="sticky top-24 overflow-hidden border-[#4FAE4E]/20">
                <div className="relative h-36">
                  <Image
                    src={selectedPackage.image}
                    alt={selectedPackage.name[language]}
                    fill
                    className="object-cover"
                    sizes="320px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-xs bg-[#4FAE4E] px-2 py-0.5 rounded-full font-bold uppercase flex items-center gap-1 w-fit mb-1">
                      <Crown className="w-3 h-3" />
                      Combo
                    </span>
                    <h3 className="font-bold text-lg">{selectedPackage.name[language]}</h3>
                  </div>
                </div>

                <CardContent className="p-6 space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-2">
                      {language === 'vi' ? 'Quyền lợi nổi bật:' : 'Benefits included:'}
                    </p>
                    <ul className="space-y-2">
                      {selectedPackage.benefits.map((b, i) => (
                        <li key={i} className="flex gap-2 text-sm items-start">
                          <Check className="w-4 h-4 text-[#4FAE4E] shrink-0 mt-0.5" />
                          <span>{b[language]}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-muted-foreground">
                        {language === 'vi' ? 'Giá gói:' : 'Package price:'}
                      </span>
                      <span className="text-2xl font-bold text-[#E53935]">
                        {formatPrice(selectedPackage.price)}
                      </span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#4FAE4E] hover:bg-[#2F7D32] text-white py-6 text-base font-semibold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      language === 'vi' ? 'Đang xử lý...' : 'Processing...'
                    ) : (
                      language === 'vi' ? 'Đăng ký & Thanh toán' : 'Register & Pay'
                    )}
                  </Button>

                  <div className="pt-4 border-t border-border space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Shield className="w-4 h-4 text-[#4FAE4E]" />
                      <span>{language === 'vi' ? 'Giao dịch an toàn và bảo mật' : 'Secure and safe checkout'}</span>
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

export default function MembershipCheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-secondary" />}>
      <MembershipCheckoutContent />
    </Suspense>
  )
}
