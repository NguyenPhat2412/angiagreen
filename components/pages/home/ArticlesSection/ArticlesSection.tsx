'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/context/language-context'
import { articleServices } from '@/services/articleApi'
import { SectionHeading } from '@/components/ui/section-heading'
import { ArticleCard } from '@/components/ArticleCard'
import { articles as mockArticles } from '@/language/data'
import type { Article } from '@/interface/types'

export function ArticlesSection() {
  const { t } = useLanguage()
  const [articles, setArticles] = useState<Article[]>(mockArticles)

  useEffect(() => {
    articleServices.getAll().then(setArticles).catch(() => setArticles(mockArticles))
  }, [])

  const folkRemedies = articles.filter((a) => a.category === 'bai-thuoc')

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeading
          title={t('folkRemediesSection')}
          viewAllLink="/bai-thuoc-dan-gian"
          viewAllText={t('viewAll')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {folkRemedies.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  )
}
