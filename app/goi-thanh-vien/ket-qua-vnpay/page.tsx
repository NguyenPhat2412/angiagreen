'use client'

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useLanguage } from '@/lib/language-context'
import { useAuth } from '@/lib/auth-context'
import { paymentServices } from '@/services/paymentApi'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2, XCircle, Loader2, Phone, ArrowRight, Award } from 'lucide-react'
import { formatPrice } from '@/lib/data'

function MembershipVNPayResultContent() {
  const { language } = useLanguage()
  const { user } = useAuth()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState(false)
  const [order, setOrder] = useState<any>(null)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const params: Record<string, string> = {}
    searchParams.forEach((value, key) => {
      params[key] = value
    })

    if (Object.keys(params).length === 0) {
      setLoading(false)
      setErrorMessage('Không tìm thấy thông tin giao dịch.')
      return
    }

    paymentServices.verifyVNPay(params)
      .then((res) => {
        setSuccess(res.success)
        setOrder(res.order)
        if (res.success) {
          // Fetch updated user from backend to refresh membership status
          import('@/services/authApi').then(({ authServices }) => {
            authServices.me().then((freshUser) => {
              localStorage.setItem('angiagreen_user', JSON.stringify(freshUser))
              // Dispatch event to sync state across windows/tabs
              window.dispatchEvent(new Event('storage'))
              // Soft reload the page to refresh auth state
              window.location.reload()
            }).catch(() => {})
          })
        } else {
          setErrorMessage(
            language === 'vi'
              ? 'Giao dịch bị hủy hoặc không thành công.'
              : 'Transaction was cancelled or failed.'
          )
        }
      })
      .catch((err) => {
        setSuccess(false)
        setErrorMessage(err.message || 'Xác thực giao dịch thất bại.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [searchParams, language])

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center flex flex-col items-center">
            <Loader2 className="w-10 h-10 text-[#4FAE4E] animate-spin mb-4" />
            <p className="font-medium">
              {language === 'vi' ? 'Đang kích hoạt gói hội viên...' : 'Activating membership package...'}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {language === 'vi' ? 'Vui lòng không đóng trình duyệt.' : 'Please do not close your browser.'}
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const orderId = order?.id || searchParams.get('vnp_TxnRef') || ''
  const amountVnd = Number(searchParams.get('vnp_Amount')) / 100

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-4 py-12">
      <Card className="max-w-lg w-full">
        <CardContent className="p-8 text-center">
          {success ? (
            <>
              <div className="w-20 h-20 rounded-full bg-[#EAF6E8] flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-[#4FAE4E]" />
              </div>

              <h1 className="text-2xl font-bold text-foreground mb-2">
                {language === 'vi' && 'Kích hoạt hội viên thành công!'}
                {language === 'en' && 'Membership Activated Successfully!'}
                {language === 'zh' && '会员包激活成功！'}
              </h1>

              <p className="text-muted-foreground mb-6">
                {language === 'vi' && 'Cảm ơn bạn! Quyền lợi hội viên của bạn đã được kích hoạt trực tuyến thành công.'}
                {language === 'en' && 'Thank you! Your membership privileges have been activated successfully.'}
                {language === 'zh' && '谢谢！您的会员权益已成功在线激活。'}
              </p>
            </>
          ) : (
            <>
              <div className="w-20 h-20 rounded-full bg-[#FCE8E6] flex items-center justify-center mx-auto mb-6">
                <XCircle className="w-10 h-10 text-[#E53935]" />
              </div>

              <h1 className="text-2xl font-bold text-foreground mb-2">
                {language === 'vi' && 'Thanh toán thất bại!'}
                {language === 'en' && 'Payment Failed!'}
                {language === 'zh' && '支付失败！'}
              </h1>

              <p className="text-[#E53935] font-medium mb-6">{errorMessage}</p>
            </>
          )}

          <div className="bg-secondary rounded-lg p-4 mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between text-left">
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                {language === 'vi' ? 'Mã đăng ký hội viên' : 'Membership Order ID'}
              </p>
              <p className="text-base font-bold text-[#4FAE4E]">{orderId}</p>
            </div>
            {amountVnd > 0 && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  {language === 'vi' ? 'Số tiền thanh toán' : 'Amount paid'}
                </p>
                <p className="text-base font-bold text-[#E53935]">{formatPrice(amountVnd)}</p>
              </div>
            )}
          </div>

          <div className="space-y-3 mb-8 text-left bg-[#F9F9F9] p-4 rounded-lg">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Award className="w-5 h-5 text-[#4FAE4E] shrink-0" />
              <span>
                {success
                  ? (language === 'vi' ? 'Cấp độ hội viên mới của bạn đã sẵn sàng sử dụng.' : 'Your new membership tier is ready for use.')
                  : (language === 'vi' ? 'Đăng ký của bạn chưa được thanh toán. Vui lòng đăng ký lại.' : 'Your registration was not paid. Please register again.')}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Phone className="w-5 h-5 text-[#4FAE4E] shrink-0" />
              <span>
                {language === 'vi' && 'Hotline hỗ trợ: 1900 1234'}
                {language === 'en' && 'Support hotline: 1900 1234'}
                {language === 'zh' && '支持热线: 1900 1234'}
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            {success ? (
              <>
                <Link href="/tai-khoan" className="flex-1">
                  <Button variant="outline" className="w-full">
                    {language === 'vi' ? 'Xem tài khoản' : 'My Profile'}
                  </Button>
                </Link>
                <Link href="/" className="flex-1">
                  <Button className="w-full bg-[#4FAE4E] hover:bg-[#2F7D32] text-white">
                    {language === 'vi' ? 'Về trang chủ' : 'Back to Home'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/goi-thanh-vien" className="flex-1">
                  <Button variant="outline" className="w-full">
                    {language === 'vi' ? 'Xem các gói khác' : 'View packages'}
                  </Button>
                </Link>
                {order?.packageId && (
                  <Link href={`/goi-thanh-vien/thanh-toan?id=${order.packageId}`} className="flex-1">
                    <Button className="w-full bg-[#4FAE4E] hover:bg-[#2F7D32] text-white">
                      {language === 'vi' ? 'Thử thanh toán lại' : 'Retry Payment'}
                    </Button>
                  </Link>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function MembershipVNPayResultPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-secondary" />}>
      <MembershipVNPayResultContent />
    </Suspense>
  )
}
