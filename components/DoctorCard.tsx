'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/context/language-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Star, Video, Building, Clock } from 'lucide-react'
import type { Doctor } from '@/interface/types'

interface DoctorCardProps {
  doctor: Doctor
  className?: string
}

export function DoctorCard({ doctor, className = '' }: DoctorCardProps) {
  const { language, t } = useLanguage()

  return (
    <Card className={`group overflow-hidden hover:shadow-lg transition-shadow duration-300 ${className}`}>
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          {/* Avatar */}
          <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 ring-4 ring-[#EAF6E8]">
            <Image
              src={doctor.image}
              alt={doctor.name}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>

          {/* Name and title */}
          <h3 className="font-semibold text-foreground mb-1">{doctor.name}</h3>
          <p className="text-sm text-[#4FAE4E] mb-2">{doctor.title[language]}</p>
          <p className="text-sm text-muted-foreground mb-3">{doctor.specialty[language]}</p>

          {/* Experience and rating */}
          <div className="flex items-center gap-4 mb-4 text-sm">
            <span className="text-muted-foreground">
              {doctor.experience} {t('yearsExperience')}
            </span>
            {doctor.rating && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{doctor.rating}</span>
              </div>
            )}
          </div>

          {/* Consultation types */}
          <div className="flex items-center gap-2 mb-4">
            {doctor.consultationType.includes('online') && (
              <span className="flex items-center gap-1 bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs">
                <Video className="w-3 h-3" />
                {t('online')}
              </span>
            )}
            {doctor.consultationType.includes('offline') && (
              <span className="flex items-center gap-1 bg-green-50 text-green-600 px-2 py-1 rounded-full text-xs">
                <Building className="w-3 h-3" />
                {t('offline')}
              </span>
            )}
          </div>

          {/* Next available */}
          {doctor.nextAvailable && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
              <Clock className="w-3 h-3" />
              <span>{t('nextAvailable')}: {doctor.nextAvailable}</span>
            </div>
          )}

          {/* Book button */}
          <Link href={`/tu-van-y-si/${doctor.id}`} className="w-full">
            <Button className="w-full bg-[#4FAE4E] hover:bg-[#2F7D32] text-white">
              {t('bookNow')}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
