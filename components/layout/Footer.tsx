'use client'

import { useState } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { useLanguage } from '@/context/language-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Youtube,
  Send,
  Gift,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'

export default function Footer() {
  const { t, language } = useLanguage()
  const [email, setEmail] = useState('')
  const [showWelcome, setShowWelcome] = useState(false)
  const [subscribedEmail, setSubscribedEmail] = useState('')

  const aboutLinks = [
    { label: { vi: 'Giới thiệu', en: 'About Us', zh: '关于我们' }, href: '/gioi-thieu' },
    { label: { vi: 'Tầm nhìn & Sứ mệnh', en: 'Vision & Mission', zh: '愿景与使命' }, href: '/gioi-thieu#vision' },
    { label: { vi: 'Hệ sinh thái AN GIA GREEN', en: 'AN GIA GREEN Ecosystem', zh: 'AN GIA GREEN 生态系统' }, href: '/gioi-thieu#ecosystem' },
    { label: { vi: 'Đội ngũ chuyên gia', en: 'Expert Team', zh: '专家团队' }, href: '/tu-van-y-si' },
    { label: { vi: 'Tuyển dụng', en: 'Careers', zh: '招聘' }, href: '/tuyen-dung' },
  ]

  const policyLinks = [
    { label: { vi: 'Chính sách bảo mật', en: 'Privacy Policy', zh: '隐私政策' }, href: '/chinh-sach/bao-mat' },
    { label: { vi: 'Điều khoản sử dụng', en: 'Terms of Use', zh: '使用条款' }, href: '/chinh-sach/dieu-khoan' },
    { label: { vi: 'Chính sách đổi trả', en: 'Return Policy', zh: '退换政策' }, href: '/chinh-sach/doi-tra' },
    { label: { vi: 'Chính sách vận chuyển', en: 'Shipping Policy', zh: '配送政策' }, href: '/chinh-sach/van-chuyen' },
    { label: { vi: 'Phương thức thanh toán', en: 'Payment Methods', zh: '支付方式' }, href: '/chinh-sach/thanh-toan' },
  ]

  const supportLinks = [
    { label: { vi: 'Hướng dẫn mua hàng', en: 'Shopping Guide', zh: '购物指南' }, href: '/ho-tro/huong-dan-mua-hang' },
    { label: { vi: 'Theo dõi đơn hàng', en: 'Track Order', zh: '订单追蹤' }, href: '/tai-khoan/don-hang' },
    { label: { vi: 'Câu hỏi thường gặp', en: 'FAQ', zh: '常见问题' }, href: '/ho-tro/faq' },
    { label: { vi: 'Liên hệ hỗ trợ', en: 'Contact Support', zh: '联系支持' }, href: '/lien-he' },
  ]

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      toast.error(
        language === 'vi' 
          ? 'Vui lòng nhập email hợp lệ.' 
          : language === 'en' 
          ? 'Please enter a valid email.' 
          : '请输入有效的电子邮件。'
      )
      return
    }
    setSubscribedEmail(email)
    setShowWelcome(true)
    toast.success(
      language === 'vi' 
        ? 'Đăng ký nhận tin thành công! Cảm ơn bạn.' 
        : language === 'en' 
        ? 'Subscribed successfully! Thank you.' 
        : '订阅成功！谢谢您。'
    )
    setEmail('')
  }

  return (
    <footer className="bg-[#2F7D32] text-white">
      {/* Main footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                <span className="text-[#2F7D32] font-bold text-xl">AG</span>
              </div>
              <div>
                <h2 className="font-bold text-xl">AN GIA GREEN</h2>
                <p className="text-sm text-white/80">Sống xanh, sống lành, sống chủ động</p>
              </div>
            </Link>
            
            <p className="text-sm text-white/90 mb-6 leading-relaxed">
              {language === 'vi' && 'AN GIA GREEN - Hệ sinh thái chăm sóc sức khỏe từ dược liệu sạch và nông sản chất lượng. Kết hợp giá trị truyền thống với quy trình hiện đại.'}
              {language === 'en' && 'AN GIA GREEN - Healthcare ecosystem from clean herbs and quality agricultural products. Combining traditional values with modern processes.'}
              {language === 'zh' && 'AN GIA GREEN - 来自清洁草药和优质农产品的健康护理生态系统。将传统价值与现代工艺相结合。'}
            </p>

            {/* Newsletter */}
            <div className="mb-6">
              <p className="font-medium mb-2">{t('newsletter')}</p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('newsletterPlaceholder')}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 flex-1"
                />
                <Button type="submit" className="bg-[#4FAE4E] hover:bg-[#7BC96F] text-white">
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>

            {/* Social links */}
            <div className="flex gap-3">
              <a
                href="https://facebook.com/angiagreen.mock"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Facebook Link"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com/angiagreen.mock"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="YouTube Link"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://zalo.me/0987654321"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Zalo Link"
              >
                <span className="text-xs font-bold">Zalo</span>
              </a>
            </div>
          </div>

          {/* About column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('aboutUs')}</h3>
            <ul className="space-y-2">
              {aboutLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {link.label[language]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('policies')}</h3>
            <ul className="space-y-2">
              {policyLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {link.label[language]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('contactInfo')}</h3>
            <ul className="space-y-3 font-sans">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#7BC96F] shrink-0 mt-0.5" />
                <span className="text-sm text-white/80">
                  123 Nguyễn Văn Linh, Q.7, TP. Hồ Chí Minh
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#7BC96F] shrink-0" />
                <span className="text-sm text-white/80">1900 1234</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#7BC96F] shrink-0" />
                <span className="text-sm text-white/80">info@angiagreen.vn</span>
              </li>
            </ul>

            {/* App download */}
            <div className="mt-6">
              <p className="text-sm font-medium mb-2">
                {language === 'vi' && 'Tải ứng dụng'}
                {language === 'en' && 'Download App'}
                {language === 'zh' && '下载应用'}
              </p>
              <div className="flex gap-2">
                <a
                  href="https://www.apple.com/app-store/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 rounded-lg px-3 py-2 text-xs transition-colors"
                >
                  App Store
                </a>
                <a
                  href="https://play.google.com/store"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 rounded-lg px-3 py-2 text-xs transition-colors"
                >
                  Google Play
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/70">
            <p>
              © 2024 AN GIA GREEN. {language === 'vi' && 'Bảo lưu mọi quyền.'}{language === 'en' && 'All rights reserved.'}{language === 'zh' && '版权所有。'}
            </p>
            <div className="flex items-center gap-4">
              <span>GPKD: 0123456789</span>
              <span>•</span>
              <span>
                {language === 'vi' && 'Cấp ngày: 01/01/2024'}
                {language === 'en' && 'Issued: 01/01/2024'}
                {language === 'zh' && '签发日期: 01/01/2024'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Subscription Dialog */}
      <Dialog open={showWelcome} onOpenChange={setShowWelcome}>
        <DialogContent className="max-w-md bg-white text-slate-800 rounded-2xl border border-emerald-500/20 shadow-2xl p-6">
          <DialogHeader className="flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2 shadow-inner">
              <Gift className="w-8 h-8 animate-bounce text-emerald-600" />
            </div>
            <DialogTitle className="text-xl font-bold text-[#2F7D32]">
              {t('welcomeTitle')}
            </DialogTitle>
            <DialogDescription className="text-sm mt-1 text-slate-500 font-sans">
              {language === 'vi' && `Hệ thống đã gửi thư xác nhận đến: ${subscribedEmail}`}
              {language === 'en' && `We have sent a verification email to: ${subscribedEmail}`}
              {language === 'zh' && `系统已向您发送确认邮件：${subscribedEmail}`}
            </DialogDescription>
          </DialogHeader>

          <div className="my-4 bg-emerald-50/50 rounded-xl p-4 border border-emerald-100 font-sans">
            <p className="text-sm leading-relaxed text-slate-700">
              {t('welcomeText')}
            </p>
            <div className="mt-4 flex flex-col items-center bg-white p-3 rounded-lg border border-dashed border-emerald-300">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">{t('discountCode')}</span>
              <span className="text-2xl font-black text-[#2F7D32] tracking-widest mt-1">AGGREEN10</span>
            </div>
          </div>

          <DialogFooter className="sm:justify-center">
            <Button 
              onClick={() => setShowWelcome(false)} 
              className="bg-[#2F7D32] hover:bg-[#1E5620] text-white rounded-full px-6 py-2 w-full font-semibold transition-all shadow-md"
            >
              {t('startBrowsing')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </footer>
  )
}
