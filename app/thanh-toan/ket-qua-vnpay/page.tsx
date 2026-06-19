'use client'

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useLanguage } from '@/lib/language-context'
import { paymentServices } from '@/services/paymentApi'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2, XCircle, Loader2, Package, Phone, ArrowRight } from 'lucide-react'
import { formatPrice } from '@/lib/data'

function VNPayResultContent() {
  const { language } = useLanguage()
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
        if (!res.success) {
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
              {language === 'vi' ? 'Đang xác thực giao dịch...' : 'Verifying transaction...'}
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
                {language === 'vi' && 'Thanh toán thành công!'}
                {language === 'en' && 'Payment Successful!'}
                {language === 'zh' && '支付成功！'}
              </h1>

              <p className="text-muted-foreground mb-6">
                {language === 'vi' && 'Đơn hàng của bạn đã được thanh toán trực tuyến thành công qua cổng VNPay.'}
                {language === 'en' && 'Your order has been successfully paid online via VNPay.'}
                {language === 'zh' && '您的订单已通过VNPay成功在线支付。'}
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
                {language === 'vi' ? 'Mã giao dịch / Đơn hàng' : 'Transaction / Order ID'}
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
              <Package className="w-5 h-5 text-[#4FAE4E] shrink-0" />
              <span>
                {success
                  ? (language === 'vi' ? 'Đơn hàng sẽ được shipper giao trong 2-5 ngày làm việc.' : 'Order will be delivered in 2-5 business days.')
                  : (language === 'vi' ? 'Bạn có thể thử thanh toán lại hoặc chọn hình thức khác.' : 'You can try again or choose another method.')}
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
                <Link href="/tai-khoan/don-hang" className="flex-1">
                  <Button variant="outline" className="w-full">
                    {language === 'vi' ? 'Theo dõi đơn hàng' : 'Track Order'}
                  </Button>
                </Link>
                <Link href="/san-pham" className="flex-1">
                  <Button className="w-full bg-[#4FAE4E] hover:bg-[#2F7D32] text-white">
                    {language === 'vi' ? 'Tiếp tục mua sắm' : 'Continue Shopping'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/gio-hang" className="flex-1">
                  <Button variant="outline" className="w-full">
                    {language === 'vi' ? 'Quay lại giỏ hàng' : 'Back to Cart'}
                  </Button>
                </Link>
                <Link href="/thanh-toan" className="flex-1">
                  <Button className="w-full bg-[#4FAE4E] hover:bg-[#2F7D32] text-white">
                    {language === 'vi' ? 'Thử lại thanh toán' : 'Retry Payment'}
                  </Button>
                </Link>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function VNPayResultPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-secondary" />}>
      <VNPayResultContent />
    </Suspense>
  )
}
