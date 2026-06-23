'use client'

import { useLanguage } from '@/context/language-context'
import { HeroSection } from '@/components/pages/home/HeroSection/HeroSection'
import { SloganBanner } from '@/components/pages/home/SloganBanner/SloganBanner'
import { MembershipSection } from '@/components/pages/home/MembershipSection/MembershipSection'
import { ProductsSection } from '@/components/pages/home/ProductsSection/ProductsSection'
import { ArticlesSection } from '@/components/pages/home/ArticlesSection/ArticlesSection'
import { HerbalEssenceSection } from '@/components/pages/home/HerbalEssenceSection/HerbalEssenceSection'
import { HomeAppDownloadNotice } from '@/components/pages/home/HomeAppDownloadNotice/HomeAppDownloadNotice'
import { DoctorsSection } from '@/components/pages/home/DoctorsSection/DoctorsSection'
import { NewsSection } from '@/components/pages/home/NewsSection/NewsSection'
import { AboutSection } from '@/components/pages/home/AboutSection/AboutSection'

export default function HomePage() {
  const { language, t } = useLanguage()

  const cleanFoodTabs = [
    { id: 'thuc-pham-sach', label: { vi: 'Thực phẩm sạch', en: 'Clean Food', zh: '清洁食品' } },
    { id: 'duoc-lieu', label: { vi: 'Dược liệu đóng hộp', en: 'Packaged Herbs', zh: '盒装草药' } },
  ]
  const featuredHerbalProductIds = [
    'tra-ca-gai-leo',
    'che-day',
    'che-vang',
    'tra-co-xuoc',
    'tra-day-thia-canh',
    'tra-dinh-lang',
    'tra-giao-co-lam',
    'tra-nhan-tran',
    'tra-tia-to',
    'tra-voi',
  ]

  return (
    <div className="min-h-screen">
      <HomeAppDownloadNotice />

      {/* Hero Section with Banner and Category Menu */}
      <HeroSection />

      {/* Slogan Banner */}
      <SloganBanner />

      {/* Membership Packages */}
      <MembershipSection />

      {/* Featured herbal products */}
      <ProductsSection
        title={
          language === 'vi'
            ? 'Các sản phẩm trà thảo dược'
            : language === 'en'
              ? 'Featured Herbal Tea Products'
              : '款精选草本茶'
        }
        productIds={featuredHerbalProductIds}
        maxProducts={10}
        viewAllLink="/san-pham?category=tra-thao-duoc"
      />

      {/* Clean Food Products */}
      <ProductsSection
        title={t('cleanFood')}
        categoryIds={['thuc-pham-sach', 'duoc-lieu']}
        tabs={cleanFoodTabs}
        maxProducts={10}
        viewAllLink="/san-pham?category=thuc-pham-sach"
      />

      {/* Folk Remedies Articles */}
      <ArticlesSection />

      {/* Herbal Essence Videos */}
      <HerbalEssenceSection />

      {/* Doctors Section */}
      <DoctorsSection />

      {/* News Section */}
      <NewsSection />

      {/* About Section */}
      <AboutSection />
    </div>
  )
}
