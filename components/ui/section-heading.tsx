'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  viewAllLink?: string
  viewAllText?: string
  className?: string
}

export function SectionHeading({
  title,
  subtitle,
  viewAllLink,
  viewAllText = 'Xem tất cả',
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={`flex items-end justify-between mb-6 ${className}`}>
      <div>
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        {subtitle && (
          <p className="text-muted-foreground mt-1">{subtitle}</p>
        )}
      </div>
      {viewAllLink && (
        <Link
          href={viewAllLink}
          className="flex items-center gap-1 text-sm font-medium text-[#4FAE4E] hover:text-[#2F7D32] transition-colors"
        >
          {viewAllText}
          <ChevronRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  )
}
