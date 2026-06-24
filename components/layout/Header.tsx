'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/context/language-context'
import { useCart } from '@/context/cart-context'
import { useAuth } from '@/context/auth-context'
import { categories as mockCategories, formatPrice, products as mockProducts } from '@/language/data'
import { categoryServices } from '@/services/categoryApi'
import { productServices } from '@/services/productApi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Search,
  Phone,
  Download,
  User,
  ShoppingCart,
  Menu,
  ChevronDown,
  X,
  Package,
  Wheat,
  Coffee,
  Pill,
  BookOpen,
  Sparkles,
  Crown,
  Calendar,
  Globe,
  Trash2,
} from 'lucide-react'
import type { Category, Language, Product } from '@/interface/types'

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

const navItems = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/gioi-thieu' },
  { key: 'products', href: '/san-pham' },
  { key: 'membershipCombo', href: '/goi-thanh-vien' },
  { key: 'folkRemedies', href: '/bai-thuoc-dan-gian' },
  { key: 'consultDoctor', href: '/tu-van-y-si' },
  { key: 'news', href: '/tin-tuc' },
  { key: 'contact', href: '/lien-he' },
]

export default function Header() {
  const { language, setLanguage, t } = useLanguage()
  const { items, getItemCount, getTotal, removeItem } = useCart()
  const { hasSession, isLoggedIn } = useAuth()
  const [showCategories, setShowCategories] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showLangDropdown, setShowLangDropdown] = useState(false)
  const [categories, setCategories] = useState<Category[]>(mockCategories)
  const [products, setProducts] = useState<Product[]>(mockProducts)

  useEffect(() => {
    Promise.all([categoryServices.getAll(), productServices.getAll()])
      .then(([nextCategories, nextProducts]) => {
        setCategories(nextCategories)
        setProducts(nextProducts)
      })
      .catch(() => {
        setCategories(mockCategories)
        setProducts(mockProducts)
      })
  }, [])

  const cartPreviewItems = items
    .map((item) => {
      const product = products.find((p) => p.id === item.productId)
      return product ? { ...item, product } : null
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)

  const languages: { code: Language; label: string }[] = [
    { code: 'vi', label: 'VI' },
    { code: 'en', label: 'EN' },
    { code: 'zh', label: 'ZH' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-card shadow-sm">
      {/* Top bar - Row 1 */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="relative w-10 h-10 overflow-hidden rounded-full bg-white ring-1 ring-[#4FAE4E]/25">
                <Image
                  src="/3956976912911290196.jpg"
                  alt="AN GIA GREEN"
                  fill
                  className="object-cover"
                  sizes="40px"
                  priority
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-lg text-[#2F7D32]">AN GIA GREEN</h1>
                <p className="text-xs text-muted-foreground">Sống xanh, sống lành</p>
              </div>
            </Link>

            {/* Search bar */}
            <div className="flex-1 max-w-xl hidden md:block">
              <div className="relative">
                <Input
                  type="text"
                  placeholder={t('search')}
                  className="w-full pl-4 pr-10 h-10 bg-secondary border-border"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-0 top-0 h-10 w-10 text-[#2F7D32] hover:bg-[#4FAE4E] hover:text-white"
                >
                  <Search className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Hotline */}
              <div className="hidden lg:flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-[#4FAE4E]" />
                <div>
                  <p className="text-xs text-muted-foreground">{t('hotline')}</p>
                  <p className="font-semibold text-[#2F7D32]">1900 1234</p>
                </div>
              </div>

              {/* Customer care app */}
              <Button
                variant="outline"
                size="sm"
                className="hidden xl:flex items-center gap-2 border-[#4FAE4E] text-[#2F7D32] hover:bg-[#4FAE4E] hover:text-white"
              >
                <Download className="w-4 h-4" />
                <span className="text-xs">{t('customerCare')}</span>
              </Button>

              {/* Login */}
              <Link href={isLoggedIn || hasSession ? "/tai-khoan" : "/dang-nhap"}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground hover:bg-[#4FAE4E] hover:text-white"
                >
                  <User className="w-5 h-5" />
                </Button>
              </Link>

              {/* Cart */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative text-foreground hover:bg-[#4FAE4E] hover:text-white"
                    aria-label={t('cart')}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {getItemCount() > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#E53935] text-white text-xs rounded-full flex items-center justify-center">
                        {getItemCount()}
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-96 max-w-[calc(100vw-2rem)] p-0">
                  <div className="border-b border-border px-4 py-3">
                    <p className="font-semibold">{t('yourCart')}</p>
                    <p className="text-xs text-muted-foreground">{getItemCount()} {language === 'vi' ? 'sản phẩm' : language === 'en' ? 'items' : '件商品'}</p>
                  </div>

                  {cartPreviewItems.length > 0 ? (
                    <>
                      <div className="max-h-80 overflow-y-auto p-2">
                        {cartPreviewItems.map((item) => (
                          <div key={item.productId} className="flex gap-3 rounded-lg p-2 hover:bg-[#EAF6E8]">
                            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-secondary">
                              <Image
                                src={item.product.image}
                                alt={item.product.name[language]}
                                fill
                                className="object-cover"
                                sizes="56px"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="line-clamp-2 text-sm font-medium">{item.product.name[language]}</p>
                              <p className="mt-1 text-xs text-muted-foreground">
                                {item.quantity} x {formatPrice(item.product.price)}
                              </p>
                            </div>
                            <button
                              type="button"
                              className="h-8 w-8 rounded-md text-muted-foreground hover:bg-white hover:text-destructive"
                              onClick={() => removeItem(item.productId)}
                              aria-label="Xóa khỏi giỏ hàng"
                            >
                              <Trash2 className="mx-auto h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-3 border-t border-border p-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{t('subtotal')}</span>
                          <span className="font-semibold text-[#E53935]">{formatPrice(getTotal())}</span>
                        </div>
                        <Button asChild className="w-full bg-[#4FAE4E] text-white hover:bg-[#2F7D32]">
                          <Link href="/gio-hang">{language === 'vi' ? 'Xem chi tiết giỏ hàng' : language === 'en' ? 'View cart details' : '查看购物车详情'}</Link>
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="p-6 text-center">
                      <ShoppingCart className="mx-auto mb-3 h-10 w-10 text-muted-foreground/60" />
                      <p className="mb-4 text-sm text-muted-foreground">{t('emptyCart')}</p>
                      <Button asChild className="bg-[#4FAE4E] text-white hover:bg-[#2F7D32]">
                        <Link href="/san-pham">{t('continueShopping')}</Link>
                      </Button>
                    </div>
                  )}
                </PopoverContent>
              </Popover>

              {/* Language switcher */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1 text-foreground hover:bg-[#4FAE4E] hover:text-white"
                  onClick={() => setShowLangDropdown(!showLangDropdown)}
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-sm font-medium">{language.toUpperCase()}</span>
                  <ChevronDown className="w-3 h-3" />
                </Button>
                {showLangDropdown && (
                  <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-lg py-1 min-w-[80px]">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        className={`w-full px-4 py-2 text-sm text-left hover:bg-secondary ${
                          language === lang.code ? 'text-[#4FAE4E] font-medium' : ''
                        }`}
                        onClick={() => {
                          setLanguage(lang.code)
                          setShowLangDropdown(false)
                        }}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation bar - Row 2 */}
      <div className="hidden lg:block bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6 h-12">
            {/* Categories button */}
            <div className="relative">
              <Button
                variant="ghost"
                className="flex items-center gap-2 h-12 px-4 font-medium text-[#2F7D32] hover:bg-[#4FAE4E] hover:text-white"
                onClick={() => setShowCategories(!showCategories)}
              >
                <Menu className="w-5 h-5" />
                <span>{t('categories')}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showCategories ? 'rotate-180' : ''}`} />
              </Button>

              {/* Categories dropdown */}
              {showCategories && (
                <div className="absolute left-0 top-full bg-card border border-border rounded-lg shadow-xl py-2 w-72 z-50">
                  {categories.map((category) => {
                    const Icon = iconMap[category.icon] || Package
                    return (
                      <Link
                        key={category.id}
                        href={`/san-pham?category=${category.slug}`}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-[#EAF6E8] hover:text-[#2F7D32] transition-colors"
                        onClick={() => setShowCategories(false)}
                      >
                        <Icon className="w-5 h-5 text-[#4FAE4E]" />
                        <span className="text-sm">{category.name[language]}</span>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Main navigation */}
            <nav className="flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-[#4FAE4E] hover:text-white transition-colors"
                >
                  {t(item.key)}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {showMobileMenu && (
        <div className="lg:hidden bg-card border-b border-border">
          <div className="container mx-auto px-4 py-4">
            {/* Mobile search */}
            <div className="relative mb-4">
              <Input
                type="text"
                placeholder={t('search')}
                className="w-full pl-4 pr-10 h-10 bg-secondary"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-0 top-0 h-10 w-10 text-[#4FAE4E]"
              >
                <Search className="w-5 h-5" />
              </Button>
            </div>

            {/* Mobile nav */}
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="px-3 py-3 text-sm font-medium text-foreground hover:text-[#4FAE4E] hover:bg-[#EAF6E8] rounded-lg transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  {t(item.key)}
                </Link>
              ))}
            </nav>

            {/* Mobile categories */}
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs font-medium text-muted-foreground mb-2 px-3">{t('categories')}</p>
              <div className="grid grid-cols-2 gap-2">
                {categories.slice(0, 6).map((category) => {
                  const Icon = iconMap[category.icon] || Package
                  return (
                    <Link
                      key={category.id}
                      href={`/san-pham?category=${category.slug}`}
                      className="flex items-center gap-2 px-3 py-2 text-xs hover:bg-[#EAF6E8] rounded-lg transition-colors"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      <Icon className="w-4 h-4 text-[#4FAE4E]" />
                      <span className="truncate">{category.name[language]}</span>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Mobile hotline */}
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2 px-3">
                <Phone className="w-4 h-4 text-[#4FAE4E]" />
                <span className="text-sm font-semibold text-[#2F7D32]">1900 1234</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
