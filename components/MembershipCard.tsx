'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/context/language-context'
import { formatPrice } from '@/language/data'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Check, Crown } from 'lucide-react'
import type { MembershipPackage } from '@/interface/types'

interface MembershipCardProps {
  package_: MembershipPackage
  className?: string
}

export function MembershipCard({ package_, className = '' }: MembershipCardProps) {
  const { language, t } = useLanguage()

  return (
    <Card
      className={`group overflow-hidden hover:shadow-xl transition-all duration-300 ${
        package_.featured ? 'ring-2 ring-[#4FAE4E] scale-[1.02]' : ''
      } ${className}`}
    >
      <div className="relative h-40 overflow-hidden">
        <Image
          src={package_.image}
          alt={package_.name[language]}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {package_.featured && (
          <div className="absolute top-3 right-3 bg-[#4FAE4E] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <Crown className="w-3 h-3" />
            HOT
          </div>
        )}
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="font-bold text-lg text-white">{package_.name[language]}</h3>
        </div>
      </div>

      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground mb-4 min-h-[2.5rem]">
          {package_.description[language]}
        </p>

        {/* Benefits */}
        <ul className="space-y-2 mb-4">
          {package_.benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <Check className="w-4 h-4 text-[#4FAE4E] shrink-0 mt-0.5" />
              <span>{benefit[language]}</span>
            </li>
          ))}
        </ul>

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground">
              {language === 'vi' ? 'Chỉ từ' : language === 'en' ? 'Only' : '仅'}
            </p>
            <p className="text-xl font-bold text-[#4FAE4E]">{formatPrice(package_.price)}</p>
          </div>
          <Link href={`/goi-thanh-vien/${package_.id}`}>
            <Button
              className={`${
                package_.featured
                  ? 'bg-[#4FAE4E] hover:bg-[#2F7D32] text-white'
                  : 'bg-secondary hover:bg-[#EAF6E8] text-[#4FAE4E]'
              }`}
            >
              {t('viewDetail')}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
