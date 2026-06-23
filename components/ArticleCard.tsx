'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/context/language-context'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, User, ArrowRight } from 'lucide-react'
import type { Article } from '@/interface/types'

interface ArticleCardProps {
  article: Article
  variant?: 'default' | 'horizontal'
  className?: string
}

export function ArticleCard({ article, variant = 'default', className = '' }: ArticleCardProps) {
  const { language, t } = useLanguage()

  if (variant === 'horizontal') {
    return (
      <Card className={`group overflow-hidden hover:shadow-lg transition-shadow duration-300 ${className}`}>
        <Link href={`/tin-tuc/${article.slug}`} className="flex">
          <div className="relative w-40 h-32 shrink-0 overflow-hidden">
            <Image
              src={article.image}
              alt={article.title[language]}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="160px"
            />
          </div>
          <CardContent className="p-4 flex flex-col justify-center">
            <h3 className="font-medium text-foreground line-clamp-2 mb-2 group-hover:text-[#4FAE4E] transition-colors">
              {article.title[language]}
            </h3>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(article.publishedAt).toLocaleDateString('vi-VN')}
              </span>
            </div>
          </CardContent>
        </Link>
      </Card>
    )
  }

  return (
    <Card className={`group overflow-hidden hover:shadow-lg transition-shadow duration-300 ${className}`}>
      <Link href={`/tin-tuc/${article.slug}`}>
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={article.image}
            alt={article.title[language]}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {article.tags && article.tags[0] && (
            <span className="absolute top-3 left-3 bg-[#4FAE4E] text-white text-xs px-2 py-1 rounded">
              {article.tags[0]}
            </span>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/tin-tuc/${article.slug}`}>
          <h3 className="font-medium text-foreground line-clamp-2 mb-2 group-hover:text-[#4FAE4E] transition-colors min-h-[3rem]">
            {article.title[language]}
          </h3>
        </Link>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {article.excerpt[language]}
        </p>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            {article.author && (
              <span className="flex items-center gap-1">
                <User className="w-3 h-3" />
                {article.author}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(article.publishedAt).toLocaleDateString('vi-VN')}
            </span>
          </div>
          <Link
            href={`/tin-tuc/${article.slug}`}
            className="flex items-center gap-1 text-[#4FAE4E] hover:text-[#2F7D32] font-medium"
          >
            {t('readMore')}
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
