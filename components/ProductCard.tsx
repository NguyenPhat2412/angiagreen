'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/lib/language-context'
import { useCart } from '@/lib/cart-context'
import { formatPrice } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ShoppingCart, Star } from 'lucide-react'
import type { Product } from '@/lib/types'

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className = '' }: ProductCardProps) {
  const { language, t } = useLanguage()
  const { addItem } = useCart()

  return (
    <Card className={`group overflow-hidden hover:shadow-lg transition-shadow duration-300 ${className}`}>
      <Link href={`/san-pham/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <Image
            src={product.image}
            alt={product.name[language]}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {product.discount && (
            <div className="absolute top-2 left-2 bg-[#E53935] text-white text-xs font-bold px-2 py-1 rounded">
              -{product.discount}%
            </div>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/san-pham/${product.slug}`}>
          <h3 className="font-medium text-foreground line-clamp-2 mb-2 hover:text-[#4FAE4E] transition-colors min-h-[2.5rem]">
            {product.name[language]}
          </h3>
        </Link>

        {/* Rating and sold count */}
        {(product.rating || product.soldCount) && (
          <div className="flex items-center gap-3 mb-2 text-sm text-muted-foreground">
            {product.rating && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{product.rating}</span>
              </div>
            )}
            {product.soldCount && (
              <span>{t('sold')} {product.soldCount.toLocaleString()}</span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-lg font-bold text-[#E53935]">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Add to cart button */}
        <Button
          variant="outline"
          size="sm"
          className="w-full border-[#4FAE4E] text-[#4FAE4E] hover:bg-[#4FAE4E] hover:text-white transition-colors"
          onClick={(e) => {
            e.preventDefault()
            addItem(product.id)
          }}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {t('addToCart')}
        </Button>
      </CardContent>
    </Card>
  )
}
