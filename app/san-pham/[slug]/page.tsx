'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/context/language-context'
import { useCart } from '@/context/cart-context'
import { formatPrice } from '@/language/data'
import { categoryServices } from '@/services/categoryApi'
import { productServices } from '@/services/productApi'
import { ProductCard } from '@/components/ProductCard'
import { Breadcrumb } from '@/components/Breadcrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Minus,
  Plus,
  Truck,
  Shield,
  Phone,
  QrCode,
  MapPin,
  Calendar,
  CheckCircle2,
  Award,
  Leaf,
  Clock,
  Users,
  Package,
  FileCheck,
  Building,
  Headphones,
} from 'lucide-react'
import type { Category, Product } from '@/interface/types'

export default function ProductDetailPage() {
  const { slug } = useParams()
  const router = useRouter()
  const { language } = useLanguage()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [product, setProduct] = useState<Product | null>()
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  const productSlug = Array.isArray(slug) ? slug[0] : slug

  useEffect(() => {
    if (!productSlug) {
      return
    }

    Promise.all([
      productServices.getBySlug(productSlug),
      productServices.getAll(),
      categoryServices.getAll(),
    ])
      .then(([nextProduct, nextProducts, nextCategories]) => {
        setProduct(nextProduct)
        setProducts(nextProducts)
        setCategories(nextCategories)
      })
      .catch(() => setProduct(null))
  }, [productSlug])

  const t = {
    products: { vi: 'Sản phẩm', en: 'Products', zh: '产品' },
    sold: { vi: 'Đã bán', en: 'Sold', zh: '已售' },
    origin: { vi: 'Xuất xứ', en: 'Origin', zh: '产地' },
    quantity: { vi: 'Số lượng', en: 'Quantity', zh: '数量' },
    inStock: { vi: 'Còn hàng', en: 'In Stock', zh: '有货' },
    outOfStock: { vi: 'Hết hàng', en: 'Out of Stock', zh: '缺货' },
    addToCart: { vi: 'Thêm vào giỏ', en: 'Add to Cart', zh: '加入购物车' },
    buyNow: { vi: 'Mua ngay', en: 'Buy Now', zh: '立即购买' },
    buyWholesale: { vi: 'Mua sỉ', en: 'Wholesale', zh: '批发' },
    wishlist: { vi: 'Yêu thích', en: 'Wishlist', zh: '收藏' },
    share: { vi: 'Chia sẻ', en: 'Share', zh: '分享' },
    fastDelivery: { vi: 'Giao hàng nhanh', en: 'Fast Delivery', zh: '快速送货' },
    qualityAssured: { vi: 'Đảm bảo chất lượng', en: 'Quality Assured', zh: '质量保证' },
    support247: { vi: 'Hỗ trợ 24/7', en: '24/7 Support', zh: '24/7支持' },
    traceability: { vi: 'Truy xuất nguồn gốc', en: 'Traceability', zh: '可追溯性' },
    productionProcess: { vi: 'Quy trình sản xuất', en: 'Production Process', zh: '生产流程' },
    batchCode: { vi: 'Mã lô hàng', en: 'Batch Code', zh: '批次代码' },
    sourceRegion: { vi: 'Vùng nguyên liệu', en: 'Source Region', zh: '原料产地' },
    productionDate: { vi: 'Ngày sản xuất', en: 'Production Date', zh: '生产日期' },
    expiryDate: { vi: 'Hạn sử dụng', en: 'Expiry Date', zh: '有效期至' },
    description: { vi: 'Mô tả', en: 'Description', zh: '描述' },
    ingredients: { vi: 'Thành phần', en: 'Ingredients', zh: '成分' },
    usage: { vi: 'Hướng dẫn sử dụng', en: 'Usage Guide', zh: '使用指南' },
    originProcess: { vi: 'Nguồn gốc & Quy trình', en: 'Origin & Process', zh: '来源与工艺' },
    reviews: { vi: 'Đánh giá', en: 'Reviews', zh: '评价' },
    relatedProducts: { vi: 'Sản phẩm liên quan', en: 'Related Products', zh: '相关产品' },
    notFound: { vi: 'Không tìm thấy sản phẩm', en: 'Product not found', zh: '未找到产品' },
    noReviews: { vi: 'Chưa có đánh giá nào cho sản phẩm này', en: 'No reviews yet for this product', zh: '该产品暂无评价' },
    qrOrigin: { vi: 'QR Nguồn gốc', en: 'QR Origin', zh: '二维码来源' },
    qrProcess: { vi: 'QR Quy trình', en: 'QR Process', zh: '二维码流程' },
    scanToView: { vi: 'Quét để xem chi tiết', en: 'Scan to view details', zh: '扫描查看详情' },
    certifications: { vi: 'Chứng nhận kiểm định', en: 'Certifications', zh: '认证' },
    qualityCommitment: { vi: 'Cam kết chất lượng', en: 'Quality Commitment', zh: '质量承诺' },
    shippingPolicy: { vi: 'Chính sách giao hàng', en: 'Shipping Policy', zh: '配送政策' },
    supportCenter: { vi: 'Hỗ trợ tư vấn', en: 'Support Center', zh: '咨询支持' },
    distributionArea: { vi: 'Khu vực phân phối', en: 'Distribution Area', zh: '配送区域' },
    nationwide: { vi: 'Toàn quốc', en: 'Nationwide', zh: '全国' },
    specifications: { vi: 'Quy cách đóng gói', en: 'Specifications', zh: '规格' },
  }

  const getText = (key: keyof typeof t) => t[key][language]

  if (product === undefined) {
    return <div className="min-h-screen bg-secondary" />
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <p className="text-muted-foreground">{getText('notFound')}</p>
      </div>
    )
  }

  const category = categories.find((c) => c.id === product.categoryId)
  const images = product.images || [product.image]
  const relatedProducts = products.filter((p) => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 4)
  const fallbackBenefits = [
    {
      vi: 'Tăng cường sức đề kháng, nâng cao hệ miễn dịch',
      en: 'Boost immunity and resistance',
      zh: '增强免疫力',
    },
    {
      vi: 'Hỗ trợ phục hồi sức khỏe sau ốm, phẫu thuật',
      en: 'Support recovery after illness or surgery',
      zh: '支持病后或术后恢复',
    },
    {
      vi: 'Giảm mệt mỏi, tăng năng lượng',
      en: 'Reduce fatigue, increase energy',
      zh: '缓解疲劳，增加能量',
    },
    {
      vi: 'Làm chậm quá trình lão hóa',
      en: 'Slow down aging process',
      zh: '延缓衰老过程',
    },
  ]
  const productBenefits = product.benefits?.[language] ?? fallbackBenefits.map((item) => item[language])

  const breadcrumbItems = [
    { label: getText('products'), href: '/san-pham' },
    { label: category?.name[language] || '', href: `/san-pham?category=${category?.slug}` },
    { label: product.name[language] },
  ]

  const handleAddToCart = () => {
    addItem(product.id, quantity)
  }

  const handleBuyNow = () => {
    router.push(`/thanh-toan?product=${product.id}&quantity=${quantity}`)
  }

  // Mock data for ingredients
  const ingredients = [
    { vi: 'Đông trùng hạ thảo tự nhiên (Cordyceps sinensis)', en: 'Natural Cordyceps sinensis', zh: '天然冬虫夏草' },
    { vi: 'Chiết xuất nhân sâm Hàn Quốc', en: 'Korean Ginseng Extract', zh: '韩国人参提取物' },
    { vi: 'Vitamin B1, B2, B6, B12', en: 'Vitamin B1, B2, B6, B12', zh: '维生素B1、B2、B6、B12' },
    { vi: 'Kẽm hữu cơ', en: 'Organic Zinc', zh: '有机锌' },
    { vi: 'Selen hữu cơ', en: 'Organic Selenium', zh: '有机硒' },
  ]

  // Quality commitments
  const commitments = [
    { icon: Leaf, text: { vi: '100% nguyên liệu tự nhiên', en: '100% natural ingredients', zh: '100%天然成分' } },
    { icon: FileCheck, text: { vi: 'Đạt chuẩn GMP-WHO', en: 'GMP-WHO certified', zh: 'GMP-WHO认证' } },
    { icon: Shield, text: { vi: 'Cam kết hoàn tiền nếu hàng giả', en: 'Money back if counterfeit', zh: '假一赔十' } },
    { icon: Award, text: { vi: 'Hàng chính hãng 100%', en: '100% authentic', zh: '100%正品' } },
  ]

  return (
    <div className="min-h-screen bg-secondary">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} className="mb-6" />

        {/* Main product section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12 items-start">
          {/* Image gallery - Left column */}
          <div className="lg:col-span-1 self-start">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-card mb-4">
              <Image
                src={images[selectedImage]}
                alt={product.name[language]}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
                priority
              />
              {product.discount && (
                <div className="absolute top-4 left-4 bg-destructive text-white text-sm font-bold px-3 py-1 rounded">
                  -{product.discount}%
                </div>
              )}
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    selectedImage === index ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <Image src={image} alt="" fill className="object-cover" sizes="64px" />
                </button>
              ))}
            </div>
          </div>

          {/* Product info - Middle column */}
          <div className="lg:col-span-1 self-start">
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-3">
              {product.name[language]}
            </h1>

            {/* Rating and sold */}
            <div className="flex items-center gap-4 mb-4">
              {product.rating && (
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating!) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-1">({product.rating})</span>
                </div>
              )}
              {product.soldCount && (
                <span className="text-sm text-muted-foreground">
                  | {getText('sold')} {product.soldCount.toLocaleString()}+
                </span>
              )}
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-primary/10 to-transparent p-4 rounded-lg mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-destructive">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.discount && (
                  <span className="bg-destructive text-white text-xs px-2 py-0.5 rounded">
                    -{product.discount}%
                  </span>
                )}
              </div>
            </div>

            {/* Short description */}
            {product.shortDescription && (
              <p className="text-muted-foreground mb-4 leading-relaxed">{product.shortDescription[language]}</p>
            )}

            {/* Attributes / Specifications */}
            <div className="space-y-3 mb-4 pb-4 border-b border-border">
              {product.attributes && Object.entries(product.attributes).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground w-32">{key}:</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground w-32">{getText('specifications')}:</span>
                <span className="font-medium">Hộp 30 viên x 500mg</span>
              </div>
            </div>

            {/* Origin */}
            {product.origin && (
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm">{getText('origin')}: <strong>{product.origin}</strong></span>
              </div>
            )}

            {/* Distribution area */}
            <div className="flex items-center gap-2 mb-4">
              <Truck className="w-4 h-4 text-primary" />
              <span className="text-sm">{getText('distributionArea')}: <strong>{getText('nationwide')}</strong></span>
            </div>

            {/* Certifications */}
            {product.certifications && (
              <div className="flex flex-wrap gap-2 mb-6">
                {product.certifications.map((cert, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs px-2.5 py-1 rounded-full"
                  >
                    <Award className="w-3 h-3" />
                    {cert}
                  </span>
                ))}
              </div>
            )}

            {/* Quantity selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium">{getText('quantity')}:</span>
              <div className="flex items-center border border-border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <span className="text-sm text-primary font-medium">
                {product.inStock !== false ? getText('inStock') : getText('outOfStock')}
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 border-primary text-primary hover:bg-primary/10"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {getText('addToCart')}
                </Button>
                <Button className="flex-1 bg-primary hover:bg-primary/90 text-white" onClick={handleBuyNow}>
                  {getText('buyNow')}
                </Button>
              </div>
              <Button variant="outline" className="w-full border-amber-500 text-amber-600 hover:bg-amber-50">
                <Users className="w-4 h-4 mr-2" />
                {getText('buyWholesale')}
              </Button>
            </div>

            {/* Quick actions */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                <Heart className="w-4 h-4 mr-2" />
                {getText('wishlist')}
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                <Share2 className="w-4 h-4 mr-2" />
                {getText('share')}
              </Button>
            </div>
          </div>

          {/* Sidebar - Right column */}
          <div className="lg:col-span-1 lg:row-span-2 space-y-4 self-start">
            {/* QR Traceability Card */}
            <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <QrCode className="w-5 h-5 text-primary" />
                  {getText('traceability')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* QR Codes */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="bg-white p-3 rounded-lg border border-border inline-block mb-2">
                      <div className="w-20 h-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMSAyMSI+PHBhdGggZmlsbD0iIzJGN0QzMiIgZD0iTTEgMWg3djdIMVYxem0xIDFoMXYxSDJ2LTF6bTEgMGgxdjFIM3YtMXptMSAwaDJ2MUg0di0xem0xIDFoMXYxSDV2LTF6bTEgMGgxdjFINnYtMXptLTQgMWgxdjFIMnYtMXptMiAwaDFWNUg0VjR6bTEgMGgxdjFINXYtMXptMSAwaDFWNUg2VjR6bS00IDFoMXYxSDJ2LTF6bTEgMGgxdjFIM3YtMXptMiAwaDFWNkg1VjV6bTEgMGgxdjFINnYtMXpNMTMgMWg3djdoLTdWMXptMSAxaDF2MWgtMXYtMXptMSAwaDFWM2gtMVYyem0xIDBoMlYzaC0yVjJ6bTEgMWgxdjFoLTF2LTF6bTEgMGgxdjFoLTF2LTF6bS00IDFoMXYxaC0xdi0xem0yIDBoMVY1aC0xVjR6bTEgMGgxdjFoLTF2LTF6bTEgMGgxVjVoLTFWNHptLTQgMWgxdjFoLTF2LTF6bTEgMGgxdjFoLTF2LTF6bTIgMGgxVjZoLTFWNXptMSAwaDFWNmgtMVY1ek0xIDEzaDd2N0gxdi03em0xIDFoMXYxSDJ2LTF6bTEgMGgxdjFIM3YtMXptMSAwaDJ2MUg0di0xem0xIDFoMXYxSDV2LTF6bTEgMGgxdjFINnYtMXptLTQgMWgxdjFIMnYtMXptMiAwaDFWMTdINFYxNnptMSAwaDFWMTdINVYxNnptMSAwaDFWMTdINlYxNnptLTQgMWgxdjFIMnYtMXptMSAwaDFWMThIM1YxN3ptMiAwaDFWMThINVYxN3ptMSAwaDFWMThINlYxN3ptMy02aDFWOUg5Vjd6bTAgMmgxdjFIOXYtMXptMCAwaDFWMTBIOVY5em0wIDJoMXYxSDl2LTF6bTAgMmgxVjE0SDlWMTN6bTEgMGgydjFoLTJ2LTF6bTIgMGgxVjE0aC0xVjEzem0xIDBoMVYxNGgtMVYxM3ptMSAwaDFWMTRoLTFWMTN6bTEgMGgxVjE0aC0xVjEzem0xIDBoMXYxaC0xdi0xem0xIDBoMVYxNGgtMVYxM3ptLTcgMmgxdjFIOXYtMXptMSAwaDFWMTZoLTFWMTV6bTEgMGgxdjFoLTF2LTF6bTEgMGgxVjE2aC0xVjE1em0yIDBoMnYxaC0ydi0xem0yIDBoMXYxaC0xdi0xem0tNSAyaDFWMThIOXYtMXptMSAwaDFWMThoLTFWMTd6bTEgMGgxdjFoLTF2LTF6bTIgMGgxVjE4aC0xVjE3em0xIDBoMXYxaC0xdi0xem0xIDBoMVYxOGgtMVYxN3ptMSAwaDFWMThIMTdWMTd6bTMgMGgxVjE4aC0xVjE3em0tOSAyaDFWMjBIOXYtMXptMSAwaDFWMjBoLTFWMTl6bTIgMGgxVjIwaC0xVjE5em0xIDBoMVYyMGgtMVYxOXptMiAwaDJ2MWgtMnYtMXptMiAwaDFWMjBoLTFWMTl6bTEgMGgxdjFoLTF2LTF6bTEgMGgxVjIwaC0xVjE5eiIvPjwvc3ZnPg==')] bg-contain" />
                    </div>
                    <p className="text-xs font-medium text-primary">{getText('qrOrigin')}</p>
                    <p className="text-xs text-muted-foreground">{getText('scanToView')}</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-white p-3 rounded-lg border border-border inline-block mb-2">
                      <div className="w-20 h-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMSAyMSI+PHBhdGggZmlsbD0iIzFBNzNFOCIgZD0iTTEgMWg3djdIMVYxem0xIDFoMXYxSDJ2LTF6bTEgMGgxdjFIM3YtMXptMSAwaDJ2MUg0di0xem0xIDFoMXYxSDV2LTF6bTEgMGgxdjFINnYtMXptLTQgMWgxdjFIMnYtMXptMiAwaDFWNUg0VjR6bTEgMGgxdjFINXYtMXptMSAwaDFWNUg2VjR6bS00IDFoMXYxSDJ2LTF6bTEgMGgxdjFIM3YtMXptMiAwaDFWNkg1VjV6bTEgMGgxdjFINnYtMXpNMTMgMWg3djdoLTdWMXptMSAxaDF2MWgtMXYtMXptMSAwaDFWM2gtMVYyem0xIDBoMlYzaC0yVjJ6bTEgMWgxdjFoLTF2LTF6bTEgMGgxdjFoLTF2LTF6bS00IDFoMXYxaC0xdi0xem0yIDBoMVY1aC0xVjR6bTEgMGgxdjFoLTF2LTF6bTEgMGgxVjVoLTFWNHptLTQgMWgxdjFoLTF2LTF6bTEgMGgxdjFoLTF2LTF6bTIgMGgxVjZoLTFWNXptMSAwaDFWNmgtMVY1ek0xIDEzaDd2N0gxdi03em0xIDFoMXYxSDJ2LTF6bTEgMGgxdjFIM3YtMXptMSAwaDJ2MUg0di0xem0xIDFoMXYxSDV2LTF6bTEgMGgxdjFINnYtMXptLTQgMWgxdjFIMnYtMXptMiAwaDFWMTdINFYxNnptMSAwaDFWMTdINVYxNnptMSAwaDFWMTdINlYxNnptLTQgMWgxdjFIMnYtMXptMSAwaDFWMThIM1YxN3ptMiAwaDFWMThINVYxN3ptMSAwaDFWMThINlYxN3ptMy02aDFWOUg5Vjd6bTAgMmgxdjFIOXYtMXptMCAwaDFWMTBIOVY5em0wIDJoMXYxSDl2LTF6bTAgMmgxVjE0SDlWMTN6bTEgMGgydjFoLTJ2LTF6bTIgMGgxVjE0aC0xVjEzem0xIDBoMVYxNGgtMVYxM3ptMSAwaDFWMTRoLTFWMTN6bTEgMGgxVjE0aC0xVjEzem0xIDBoMXYxaC0xdi0xem0xIDBoMVYxNGgtMVYxM3ptLTcgMmgxdjFIOXYtMXptMSAwaDFWMTZoLTFWMTV6bTEgMGgxdjFoLTF2LTF6bTEgMGgxVjE2aC0xVjE1em0yIDBoMnYxaC0ydi0xem0yIDBoMXYxaC0xdi0xem0tNSAyaDFWMThIOXYtMXptMSAwaDFWMThoLTFWMTd6bTEgMGgxdjFoLTF2LTF6bTIgMGgxVjE4aC0xVjE3em0xIDBoMXYxaC0xdi0xem0xIDBoMVYxOGgtMVYxN3ptMSAwaDFWMThIMTdWMTd6bTMgMGgxVjE4aC0xVjE3em0tOSAyaDFWMjBIOXYtMXptMSAwaDFWMjBoLTFWMTl6bTIgMGgxVjIwaC0xVjE5em0xIDBoMVYyMGgtMVYxOXptMiAwaDJ2MWgtMnYtMXptMiAwaDFWMjBoLTFWMTl6bTEgMGgxdjFoLTF2LTF6bTEgMGgxVjIwaC0xVjE5eiIvPjwvc3ZnPg==')] bg-contain" />
                    </div>
                    <p className="text-xs font-medium text-blue-600">{getText('qrProcess')}</p>
                    <p className="text-xs text-muted-foreground">{getText('scanToView')}</p>
                  </div>
                </div>

                {/* Traceability info */}
                {product.traceability && (
                  <div className="space-y-2 text-sm border-t border-border pt-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{getText('batchCode')}:</span>
                      <span className="font-mono font-medium">{product.traceability.batch}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{getText('sourceRegion')}:</span>
                      <span className="font-medium">{product.traceability.region}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{getText('productionDate')}:</span>
                      <span className="font-medium">{new Date(product.traceability.productionDate).toLocaleDateString('vi-VN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{getText('expiryDate')}:</span>
                      <span className="font-medium">{new Date(product.traceability.expiryDate).toLocaleDateString('vi-VN')}</span>
                    </div>
                  </div>
                )}

                {/* Timeline */}
                {product.traceability && (
                  <div className="border-t border-border pt-4">
                    <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      {getText('productionProcess')}
                    </h4>
                    <div className="relative pl-4 space-y-3">
                      <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-primary/30" />
                      {product.traceability.timeline.map((item, index) => (
                        <div key={index} className="relative flex gap-3">
                          <div className="absolute -left-4 w-3 h-3 rounded-full bg-primary border-2 border-white shadow-sm" />
                          <div>
                            <p className="text-xs text-muted-foreground">{new Date(item.date).toLocaleDateString('vi-VN')}</p>
                            <p className="text-sm font-medium">{item.event[language]}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Certifications */}
                <div className="border-t border-border pt-4">
                  <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-primary" />
                    {getText('certifications')}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {(product.certifications || ['ISO 22000', 'GMP', 'HACCP']).map((cert, i) => (
                      <span key={i} className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quality Commitment */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Shield className="w-5 h-5 text-primary" />
                  {getText('qualityCommitment')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {commitments.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <item.icon className="w-4 h-4 text-primary shrink-0" />
                      <span>{item.text[language]}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Shipping Policy */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Truck className="w-5 h-5 text-primary" />
                  {getText('shippingPolicy')}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  {language === 'vi' ? 'Miễn phí vận chuyển đơn hàng từ 500.000đ' : 'Free shipping for orders over 500,000đ'}
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  {language === 'vi' ? 'Giao hàng nhanh trong 24h (nội thành)' : 'Fast delivery within 24h (inner city)'}
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  {language === 'vi' ? 'Đổi trả trong 7 ngày' : '7-day return policy'}
                </p>
              </CardContent>
            </Card>

            {/* Support */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Headphones className="w-5 h-5 text-primary" />
                  {getText('supportCenter')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    <strong>Hotline:</strong> 1800-xxxx (miễn phí)
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    {language === 'vi' ? '8:00 - 22:00, T2 - CN' : '8:00 AM - 10:00 PM, Mon - Sun'}
                  </p>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3 border-primary text-primary hover:bg-primary/10">
                  <Link href="/tu-van" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {language === 'vi' ? 'Đặt lịch tư vấn' : 'Book Consultation'}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          {/* Tabs */}
          <Tabs defaultValue="description" className="lg:col-span-2">
          <TabsList className="w-full justify-start bg-card border-b border-border rounded-none h-auto p-0 flex-wrap">
            <TabsTrigger
              value="description"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none px-4 py-3"
            >
              {getText('description')}
            </TabsTrigger>
            <TabsTrigger
              value="ingredients"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none px-4 py-3"
            >
              {getText('ingredients')}
            </TabsTrigger>
            <TabsTrigger
              value="usage"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none px-4 py-3"
            >
              {getText('usage')}
            </TabsTrigger>
            <TabsTrigger
              value="origin"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none px-4 py-3"
            >
              {getText('originProcess')}
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none px-4 py-3"
            >
              {getText('reviews')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="bg-card rounded-b-xl p-6">
            <div className="prose prose-sm max-w-none text-muted-foreground">
              <p className="leading-relaxed">{product.description[language]}</p>
              <h4 className="text-foreground font-semibold mt-6 mb-3">
                {language === 'vi' ? 'Công dụng chính:' : 'Main Benefits:'}
              </h4>
              <ul className="space-y-2">
                {productBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="ingredients" className="bg-card rounded-b-xl p-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">
                {language === 'vi' ? 'Thành phần chính:' : 'Main Ingredients:'}
              </h4>
              <div className="grid gap-3">
                {ingredients.map((ing, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Leaf className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground">{ing[language]}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                {language === 'vi' 
                  ? '* Sản phẩm không phải là thuốc, không có tác dụng thay thế thuốc chữa bệnh.' 
                  : '* This product is not a medicine and does not replace medical treatment.'}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="usage" className="bg-card rounded-b-xl p-6">
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg mb-3">
                  {language === 'vi' ? 'Cách sử dụng:' : 'How to Use:'}
                </h4>
                {product.usage ? (
                  <p className="text-muted-foreground leading-relaxed">{product.usage[language]}</p>
                ) : (
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm shrink-0">1</span>
                      <span>{language === 'vi' ? 'Uống 2 viên/lần, 2 lần/ngày sau bữa ăn' : 'Take 2 capsules twice daily after meals'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm shrink-0">2</span>
                      <span>{language === 'vi' ? 'Uống với nước ấm để tăng hiệu quả hấp thu' : 'Take with warm water for better absorption'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm shrink-0">3</span>
                      <span>{language === 'vi' ? 'Sử dụng đều đặn trong 2-3 tháng để có kết quả tốt nhất' : 'Use regularly for 2-3 months for best results'}</span>
                    </li>
                  </ul>
                )}
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-3">
                  {language === 'vi' ? 'Lưu ý bảo quản:' : 'Storage Instructions:'}
                </h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>{language === 'vi' ? 'Bảo quản nơi khô ráo, thoáng mát' : 'Store in a dry, cool place'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>{language === 'vi' ? 'Tránh ánh nắng trực tiếp' : 'Avoid direct sunlight'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>{language === 'vi' ? 'Để xa tầm tay trẻ em' : 'Keep out of reach of children'}</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="origin" className="bg-card rounded-b-xl p-6">
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    {language === 'vi' ? 'Vùng nguyên liệu' : 'Source Region'}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {language === 'vi' 
                      ? 'Nguyên liệu được thu hoạch từ vùng núi cao Sapa, Lào Cai - nơi có khí hậu mát mẻ quanh năm, không khí trong lành và đất đai màu mỡ, tạo điều kiện lý tưởng cho các loại thảo dược phát triển với hàm lượng dưỡng chất cao nhất.'
                      : 'Ingredients are harvested from the highlands of Sapa, Lao Cai - where the cool year-round climate, fresh air and fertile soil create ideal conditions for herbs to grow with the highest nutrient content.'}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Building className="w-5 h-5 text-primary" />
                    {language === 'vi' ? 'Nhà máy sản xuất' : 'Manufacturing Facility'}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {language === 'vi'
                      ? 'Sản phẩm được sản xuất tại nhà máy đạt chuẩn GMP-WHO với dây chuyền công nghệ hiện đại từ Châu Âu, đảm bảo vệ sinh an toàn thực phẩm và chất lượng sản phẩm đồng nhất.'
                      : 'Products are manufactured at a GMP-WHO certified facility with modern European technology, ensuring food safety and consistent product quality.'}
                  </p>
                </div>
              </div>

              {/* Production process timeline */}
              {product.traceability && (
                <div className="mt-8">
                  <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    {getText('productionProcess')}
                  </h4>
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/30" />
                    <div className="space-y-6">
                      {product.traceability.timeline.map((item, index) => (
                        <div key={index} className="relative flex gap-4 pl-10">
                          <div className="absolute left-2 w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </div>
                          <div className="bg-secondary p-4 rounded-lg flex-1">
                            <p className="text-sm text-muted-foreground mb-1">
                              {new Date(item.date).toLocaleDateString('vi-VN')}
                            </p>
                            <p className="font-medium">{item.event[language]}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="bg-card rounded-b-xl p-6">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground mb-4">{getText('noReviews')}</p>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                {language === 'vi' ? 'Viết đánh giá đầu tiên' : 'Write the first review'}
              </Button>
            </div>
          </TabsContent>

        </Tabs>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-6">{getText('relatedProducts')}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
