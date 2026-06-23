'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useLanguage } from '@/context/language-context'
import { categoryServices } from '@/services/categoryApi'
import { productServices } from '@/services/productApi'
import { ProductCard } from '@/components/ProductCard'
import { Breadcrumb } from '@/components/Breadcrumb'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, SlidersHorizontal, Grid3X3, LayoutList } from 'lucide-react'
import type { Category, Product } from '@/interface/types'

function ProductsContent() {
  const { language, t } = useLanguage()
  const searchParams = useSearchParams()
  const categorySlug = searchParams.get('category')

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(categorySlug || 'all')
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    Promise.all([productServices.getAll(), categoryServices.getAll()])
      .then(([nextProducts, nextCategories]) => {
        setProducts(nextProducts)
        setCategories(nextCategories)
      })
      .catch(() => {
        setProducts([])
        setCategories([])
      })
  }, [])

  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Filter by category
    if (selectedCategory && selectedCategory !== 'all') {
      const category = categories.find((c) => c.slug === selectedCategory)
      if (category) {
        result = result.filter((p) => p.categoryId === category.id)
      }
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.name[language].toLowerCase().includes(query) ||
          p.description[language].toLowerCase().includes(query)
      )
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'popular':
        result.sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0))
        break
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      default:
        break
    }

    return result
  }, [products, categories, selectedCategory, searchQuery, sortBy, language])

  const breadcrumbItems = [
    { label: t('products') },
  ]

  return (
    <div className="min-h-screen bg-secondary">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} className="mb-6" />

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="bg-card rounded-xl shadow-sm p-4 sticky top-24">
              <h3 className="font-semibold mb-4">{t('categories')}</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-[#4FAE4E] text-white'
                        : 'hover:bg-[#EAF6E8]'
                    }`}
                  >
                    {language === 'vi' ? 'Tất cả sản phẩm' : language === 'en' ? 'All Products' : '所有产品'}
                  </button>
                </li>
                {categories.map((category) => (
                  <li key={category.id}>
                    <button
                      onClick={() => setSelectedCategory(category.slug)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === category.slug
                          ? 'bg-[#4FAE4E] text-white'
                          : 'hover:bg-[#EAF6E8]'
                      }`}
                    >
                      {category.name[language]}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1">
            {/* Filters bar */}
            <div className="bg-card rounded-xl shadow-sm p-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <Input
                    type="text"
                    placeholder={t('search')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                </div>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">
                      {language === 'vi' ? 'Mới nhất' : language === 'en' ? 'Newest' : '最新'}
                    </SelectItem>
                    <SelectItem value="popular">
                      {language === 'vi' ? 'Phổ biến' : language === 'en' ? 'Popular' : '热门'}
                    </SelectItem>
                    <SelectItem value="price-asc">
                      {language === 'vi' ? 'Giá thấp đến cao' : language === 'en' ? 'Price: Low to High' : '价格从低到高'}
                    </SelectItem>
                    <SelectItem value="price-desc">
                      {language === 'vi' ? 'Giá cao đến thấp' : language === 'en' ? 'Price: High to Low' : '价格从高到低'}
                    </SelectItem>
                    <SelectItem value="rating">
                      {language === 'vi' ? 'Đánh giá cao' : language === 'en' ? 'Highest Rated' : '评分最高'}
                    </SelectItem>
                  </SelectContent>
                </Select>

                {/* View mode */}
                <div className="hidden sm:flex items-center gap-1 bg-secondary rounded-lg p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="icon"
                    className={viewMode === 'grid' ? 'bg-[#4FAE4E] hover:bg-[#2F7D32]' : ''}
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="icon"
                    className={viewMode === 'list' ? 'bg-[#4FAE4E] hover:bg-[#2F7D32]' : ''}
                    onClick={() => setViewMode('list')}
                  >
                    <LayoutList className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Results count */}
            <p className="text-sm text-muted-foreground mb-4">
              {language === 'vi' && `Hiển thị ${filteredProducts.length} sản phẩm`}
              {language === 'en' && `Showing ${filteredProducts.length} products`}
              {language === 'zh' && `显示 ${filteredProducts.length} 个产品`}
            </p>

            {/* Products grid */}
            {filteredProducts.length > 0 ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'
                    : 'space-y-4'
                }
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {language === 'vi' && 'Không tìm thấy sản phẩm phù hợp'}
                  {language === 'en' && 'No products found'}
                  {language === 'zh' && '没有找到产品'}
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-secondary" />}>
      <ProductsContent />
    </Suspense>
  )
}
