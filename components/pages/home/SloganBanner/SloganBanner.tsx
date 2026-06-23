'use client'

import { useLanguage } from '@/context/language-context'
import { Leaf, Shield, Heart, Award } from 'lucide-react'

export function SloganBanner() {
  const { t, language } = useLanguage()

  const features = [
    {
      icon: Leaf,
      text: { vi: 'Nguyên liệu sạch', en: 'Clean Ingredients', zh: '清洁原料' },
    },
    {
      icon: Shield,
      text: { vi: 'Nguồn gốc rõ ràng', en: 'Clear Origin', zh: '来源清晰' },
    },
    {
      icon: Heart,
      text: { vi: 'Chăm sóc tận tâm', en: 'Dedicated Care', zh: '用心护理' },
    },
    {
      icon: Award,
      text: { vi: 'Chất lượng đảm bảo', en: 'Quality Assured', zh: '质量保证' },
    },
  ]

  return (
    <section className="bg-gradient-to-r from-[#2F7D32] to-[#4FAE4E] py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Main slogan */}
          <p className="text-white font-bold text-lg lg:text-xl text-center lg:text-left">
            {t('slogan')}
          </p>

          {/* Features */}
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="flex items-center gap-2 text-white/90">
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{feature.text[language]}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
