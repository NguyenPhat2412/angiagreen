'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/context/language-context'
import { articleServices } from '@/services/articleApi'
import { SectionHeading } from '@/components/ui/section-heading'
import { ArticleCard } from '@/components/ArticleCard'
import type { Article } from '@/interface/types'

export function NewsSection() {
  const { t } = useLanguage()
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    articleServices.getAll().then(setArticles).catch(() => setArticles([]))
  }, [])

  const latestNews = articles.slice(0, 4)

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeading
          title={t('newsSection')}
          viewAllLink="/tin-tuc"
          viewAllText={t('viewAll')}
        />

        {latestNews.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Featured article */}
          <div className="lg:row-span-2">
            <ArticleCard article={latestNews[0]} className="h-full" />
          </div>

          {/* Other articles */}
          <div className="space-y-4">
            {latestNews.slice(1).map((article) => (
              <ArticleCard key={article.id} article={article} variant="horizontal" />
            ))}
          </div>
        </div>
        )}
      </div>
    </section>
  )
}
