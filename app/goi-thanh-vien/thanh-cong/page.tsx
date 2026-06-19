'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useLanguage } from '@/lib/language-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2, ShieldCheck, Phone, ArrowRight, Copy, QrCode } from 'lucide-react'
import { formatPrice } from '@/lib/data'
import { toast } from 'sonner'

function MembershipSuccessContent() {
  const { language } = useLanguage()
  const searchParams = useSearchParams()

  const orderId = searchParams.get('id') || `MEM-${Date.now().toString().slice(-8)}`
  const method = searchParams.get('method')
  const amountStr = searchParams.get('amount')
  const amount = amountStr ? Number(amountStr) : 0

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} ${language === 'vi' ? 'đã sao chép!' : 'copied!'}`)
  }

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-4 py-12">
      <Card className="max-w-2xl w-full">
        <CardContent className="p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-[#EAF6E8] flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-[#4FAE4E]" />
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-2">
            {language === 'vi' && 'Đăng ký hội viên thành công!'}
            {language === 'en' && 'Registered Membership Successfully!'}
            {language === 'zh' && '会员包注册成功！'}
          </h1>

          <p className="text-muted-foreground mb-6">
            {language === 'vi' && 'Cảm ơn bạn đã lựa chọn đồng hành cùng AN GIA GREEN. Yêu cầu kích hoạt gói hội viên đang được xử lý.'}
            {language === 'en' && 'Thank you for choosing AN GIA GREEN. Your membership activation is being processed.'}
            {language === 'zh' && '感谢您选择与AN GIA GREEN同行。会员包激活请求正在处理中。'}
          </p>

          <div className="bg-secondary rounded-lg p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between text-left">
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                {language === 'vi' ? 'Mã đăng ký' : 'Registration ID'}
              </p>
              <p className="text-xl font-bold text-[#4FAE4E]">{orderId}</p>
            </div>
            {amount > 0 && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  {language === 'vi' ? 'Phí dịch vụ' : 'Service fee'}
                </p>
                <p className="text-xl font-bold text-[#E53935]">{formatPrice(amount)}</p>
              </div>
            )}
          </div>

          {/* QR Code section for Personal QR method */}
          {method === 'bank' && amount > 0 && (
            <Card className="mb-8 border-[#4FAE4E]/20 bg-[#4FAE4E]/5 overflow-hidden">
              <CardContent className="p-6 flex flex-col items-center">
                <div className="flex items-center gap-2 text-[#4FAE4E] font-semibold mb-4">
                  <QrCode className="w-5 h-5" />
                  <span>
                    {language === 'vi' ? 'Thanh toán qua Mã QR cá nhân' : 'Pay via Personal QR Code'}
                  </span>
                </div>

                <div className="relative w-64 h-64 bg-white p-3 rounded-lg shadow-sm border border-border flex items-center justify-center mb-4">
                  <Image
                    src={`https://img.vietqr.io/image/vietcombank-0123456789-compact2.png?amount=${amount}&addInfo=${orderId}&accountName=CONG%20TY%20AN%20GIA%20GREEN`}
                    alt="VietQR Code"
                    width={240}
                    height={240}
                    className="object-contain"
                    priority
                  />
                </div>

                <p className="text-xs text-muted-foreground text-center mb-6 max-w-md">
                  {language === 'vi' ? (
                    'Mở ứng dụng ngân hàng quét mã QR trên để thanh toán kích hoạt hội viên ngay lập tức.'
                  ) : (
                    'Scan the QR code above with your banking app to activate your membership package immediately.'
                  )}
                </p>

                {/* Manual info */}
                <div className="w-full text-left space-y-3 bg-white p-4 rounded-lg border border-border text-sm">
                  <div className="flex justify-between items-center py-1 border-b border-dashed border-border">
                    <span className="text-muted-foreground">{language === 'vi' ? 'Ngân hàng:' : 'Bank:'}</span>
                    <span className="font-semibold">Vietcombank</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-dashed border-border">
                    <span className="text-muted-foreground">{language === 'vi' ? 'Số tài khoản:' : 'Account No:'}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold">0123456789</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-[#4FAE4E]" onClick={() => handleCopy('0123456789', 'Số tài khoản')}>
                        <Copy className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-dashed border-border">
                    <span className="text-muted-foreground">{language === 'vi' ? 'Tên thụ hưởng:' : 'Beneficiary:'}</span>
                    <span className="font-semibold">CONG TY AN GIA GREEN</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-muted-foreground">{language === 'vi' ? 'Nội dung CK:' : 'Transfer Message:'}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold text-primary">{orderId}</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-[#4FAE4E]" onClick={() => handleCopy(orderId, 'Nội dung chuyển khoản')}>
                        <Copy className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-3 mb-8 text-left bg-[#F9F9F9] p-4 rounded-lg">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <ShieldCheck className="w-5 h-5 text-[#4FAE4E] shrink-0" />
              <span>
                {language === 'vi' ? (
                  method === 'cod' ? 'Thẻ hội viên cứng và quà tặng sẽ được giao trong 2-5 ngày làm việc. Bạn sẽ thanh toán khi nhận.' : 'Hệ thống sẽ cập nhật trạng thái tài khoản của bạn ngay khi nhận được thanh toán.'
                ) : (
                  'System will update your account permissions and tier as soon as payment is confirmed.'
                )}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Phone className="w-5 h-5 text-[#4FAE4E] shrink-0" />
              <span>
                {language === 'vi' && 'Hotline hỗ trợ hội viên: 1900 1234'}
                {language === 'en' && 'VIP Support hotline: 1900 1234'}
                {language === 'zh' && '会员支持热线: 1900 1234'}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/tai-khoan" className="flex-1">
              <Button variant="outline" className="w-full">
                {language === 'vi' ? 'Trang cá nhân' : 'My Account'}
              </Button>
            </Link>
            <Link href="/" className="flex-1">
              <Button className="w-full bg-[#4FAE4E] hover:bg-[#2F7D32] text-white">
                {language === 'vi' ? 'Quay lại Trang chủ' : 'Back to Home'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function MembershipSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-secondary" />}>
      <MembershipSuccessContent />
    </Suspense>
  )
}
