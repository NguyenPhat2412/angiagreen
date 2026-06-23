'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/context/language-context'
import { Button } from '@/components/ui/button'
import { ArrowRight, Leaf, Users, Globe, Heart } from 'lucide-react'

export function AboutSection() {
  const { language, t } = useLanguage()

  const values = [
    {
      icon: Leaf,
      title: { vi: 'Nguyên liệu sạch', en: 'Clean Ingredients', zh: '清洁原料' },
      desc: { vi: 'Vùng nguyên liệu được kiểm soát chặt chẽ', en: 'Strictly controlled raw material regions', zh: '严格控制的原料产地' },
    },
    {
      icon: Users,
      title: { vi: 'Đội ngũ chuyên gia', en: 'Expert Team', zh: '专家团队' },
      desc: { vi: 'Bác sĩ, y sĩ giàu kinh nghiệm', en: 'Experienced doctors and practitioners', zh: '经验丰富的医生和从业者' },
    },
    {
      icon: Globe,
      title: { vi: 'Quy trình hiện đại', en: 'Modern Process', zh: '现代工艺' },
      desc: { vi: 'Kết hợp truyền thống và công nghệ', en: 'Combining tradition and technology', zh: '传统与技术的结合' },
    },
    {
      icon: Heart,
      title: { vi: 'Cộng đồng', en: 'Community', zh: '社区' },
      desc: { vi: 'Lan tỏa lối sống lành mạnh', en: 'Spreading healthy lifestyle', zh: '传播健康生活方式' },
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-[#EAF6E8] to-[#F5F6F7]">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <span className="inline-block bg-[#4FAE4E] text-white text-sm px-4 py-1 rounded-full mb-4">
              {t('aboutSection')}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance">
              {language === 'vi' && 'Hệ sinh thái chăm sóc sức khỏe từ thiên nhiên'}
              {language === 'en' && 'Natural Healthcare Ecosystem'}
              {language === 'zh' && '天然健康护理生态系统'}
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {language === 'vi' && 'AN GIA GREEN mang khát vọng đóng góp cho một Việt Nam hùng cường bằng các giá trị chăm sóc sức khỏe bền vững. Chúng tôi kết hợp tri thức y học truyền thống với quy trình hiện đại, xây dựng vùng nguyên liệu minh bạch và phát triển hệ thống tư vấn chăm sóc sức khỏe toàn diện.'}
              {language === 'en' && 'AN GIA GREEN aspires to contribute to a stronger Vietnam through sustainable healthcare values. We combine traditional medical knowledge with modern processes, building transparent raw material regions and developing a comprehensive healthcare consultation system.'}
              {language === 'zh' && 'AN GIA GREEN 渴望通过可持续的医疗保健价值为更强大的越南做出贡献。我们将传统医学知识与现代工艺相结合，建设透明的原材料区域，并开发全面的医疗保健咨询系统。'}
            </p>

            {/* Values grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#4FAE4E]/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-[#4FAE4E]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-foreground">{value.title[language]}</h4>
                      <p className="text-xs text-muted-foreground">{value.desc[language]}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex gap-4">
              <Link href="/gioi-thieu">
                <Button className="bg-[#4FAE4E] hover:bg-[#2F7D32] text-white">
                  {t('learnMore')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/lien-he">
                <Button variant="outline" className="border-[#4FAE4E] text-[#4FAE4E] hover:bg-[#EAF6E8]">
                  {language === 'vi' ? 'Liên hệ hợp tác' : language === 'en' ? 'Contact Us' : '联系我们'}
                </Button>
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&h=800&fit=crop"
                alt="AN GIA GREEN"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-card rounded-xl shadow-lg p-4 max-w-[200px]">
              <p className="text-2xl font-bold text-[#4FAE4E]">10+</p>
              <p className="text-sm text-muted-foreground">
                {language === 'vi' ? 'Năm kinh nghiệm' : language === 'en' ? 'Years of Experience' : '年经验'}
              </p>
            </div>
            {/* Floating card 2 */}
            <div className="absolute -top-4 -right-4 bg-[#4FAE4E] text-white rounded-xl shadow-lg p-4">
              <p className="text-2xl font-bold">50K+</p>
              <p className="text-sm opacity-90">
                {language === 'vi' ? 'Khách hàng tin tưởng' : language === 'en' ? 'Trusted Customers' : '信任的客户'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
