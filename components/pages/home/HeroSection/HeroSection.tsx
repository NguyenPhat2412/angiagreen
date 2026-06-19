'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/lib/language-context'
import { categoryServices } from '@/services/categoryApi'
import { Button } from '@/components/ui/button'
import {
  ChevronRight,
  ChevronLeft,
  Package,
  Wheat,
  Coffee,
  Pill,
  BookOpen,
  Sparkles,
  Crown,
  Calendar,
} from 'lucide-react'
import type { Category } from '@/lib/types'

const iconMap: Record<string, React.ElementType> = {
  Package,
  Wheat,
  Coffee,
  Pill,
  BookOpen,
  Sparkles,
  Crown,
  Calendar,
}

const bannerSlides = [
  {
    image: '/banner/3139801075847031161.jpg',
    title: { vi: 'Dược liệu sạch – Chăm sóc sức khỏe chủ động', en: 'Clean Herbs – Proactive Health Care', zh: '清洁草药 – 主动健康护理' },
    subtitle: { vi: 'Nguồn gốc minh bạch – Quy trình hiện đại – Giá trị truyền thống', en: 'Transparent Origin – Modern Process – Traditional Values', zh: '透明来源 – 现代工艺 – 传统价值' },
  },
  {
    image: '/banner/3264442604936445021.jpg',
    title: { vi: 'Trà thảo dược thiên nhiên', en: 'Natural Herbal Tea', zh: '天然草药茶' },
    subtitle: { vi: 'Thanh nhiệt, bổ dưỡng, tốt cho sức khỏe mỗi ngày', en: 'Cooling, nourishing, good for daily health', zh: '清热、滋补、有益日常健康' },
  },
  {
    image: '/banner/4389357394744504804.jpg',
    title: { vi: 'Thực phẩm sạch từ nông trại', en: 'Clean Food from Farms', zh: '来自农场的清洁食品' },
    subtitle: { vi: 'Từ vùng nguyên liệu đến bàn ăn gia đình', en: 'From raw material regions to family tables', zh: '从原料产地到家庭餐桌' },
  },
]

export function HeroSection() {
  const { language, t } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    categoryServices.getAll().then(setCategories).catch(() => setCategories([]))
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length)

  return (
    <section className="bg-secondary py-4 lg:py-6">
      <div className="container mx-auto px-4">
        <div className="flex gap-4">
          {/* Category sidebar - desktop only */}
          <div className="hidden lg:block w-64 shrink-0">
            <div className="bg-card rounded-xl shadow-sm overflow-hidden">
              <div className="bg-[#4FAE4E] text-white px-4 py-3 font-semibold">
                {t('categories')}
              </div>
              <nav className="py-2">
                {categories.map((category) => {
                  const Icon = iconMap[category.icon] || Package
                  return (
                    <Link
                      key={category.id}
                      href={`/san-pham?category=${category.slug}`}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#EAF6E8] transition-colors group"
                    >
                      <Icon className="w-5 h-5 text-[#4FAE4E] group-hover:text-[#2F7D32]" />
                      <span className="text-sm text-foreground group-hover:text-[#2F7D32]">
                        {category.name[language]}
                      </span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Banner slider */}
          <div className="flex-1">
            <div className="relative rounded-xl overflow-hidden aspect-[21/9] lg:aspect-[2.4/1]">
              {bannerSlides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Image
                    src={slide.image}
                    alt={slide.title[language]}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    sizes="(max-width: 1024px) 100vw, calc(100vw - 300px)"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
                  <div className="absolute inset-0 flex items-center">
                    <div className="px-8 lg:px-12 max-w-xl">
                      <h2 className="text-2xl lg:text-4xl font-bold text-white mb-3 text-balance">
                        {slide.title[language]}
                      </h2>
                      <p className="text-white/90 mb-6 text-sm lg:text-base">
                        {slide.subtitle[language]}
                      </p>
                      <div className="flex gap-3">
                        <Link href="/san-pham">
                          <Button className="bg-[#4FAE4E] hover:bg-[#2F7D32] text-white">
                            {t('viewProducts')}
                          </Button>
                        </Link>
                        <Link href="/tu-van-y-si">
                          <Button variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-[#2F7D32]">
                            {t('bookConsultation')}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Navigation arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {bannerSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      index === currentSlide ? 'bg-white' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
