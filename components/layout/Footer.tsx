'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Youtube,
  Send,
} from 'lucide-react'

export default function Footer() {
  const { t, language } = useLanguage()

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
    { label: { vi: 'Theo dõi đơn hàng', en: 'Track Order', zh: '订单追踪' }, href: '/tai-khoan/don-hang' },
    { label: { vi: 'Câu hỏi thường gặp', en: 'FAQ', zh: '常见问题' }, href: '/ho-tro/faq' },
    { label: { vi: 'Liên hệ hỗ trợ', en: 'Contact Support', zh: '联系支持' }, href: '/lien-he' },
  ]

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
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder={t('newsletterPlaceholder')}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 flex-1"
                />
                <Button className="bg-[#4FAE4E] hover:bg-[#7BC96F] text-white">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://zalo.me"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
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
            <ul className="space-y-3">
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
                <div className="bg-white/10 hover:bg-white/20 rounded-lg px-3 py-2 text-xs cursor-pointer transition-colors">
                  App Store
                </div>
                <div className="bg-white/10 hover:bg-white/20 rounded-lg px-3 py-2 text-xs cursor-pointer transition-colors">
                  Google Play
                </div>
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
    </footer>
  )
}
