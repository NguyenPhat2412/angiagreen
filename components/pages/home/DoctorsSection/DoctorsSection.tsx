'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/context/language-context'
import { doctorServices } from '@/services/doctorApi'
import { SectionHeading } from '@/components/ui/section-heading'
import { DoctorCard } from '@/components/DoctorCard'
import type { Doctor } from '@/interface/types'

export function DoctorsSection() {
  const { t } = useLanguage()
  const [doctors, setDoctors] = useState<Doctor[]>([])

  useEffect(() => {
    doctorServices.getAll().then(setDoctors).catch(() => setDoctors([]))
  }, [])

  return (
    <section className="py-12 bg-secondary">
      <div className="container mx-auto px-4">
        <SectionHeading
          title={t('consultDoctors')}
          viewAllLink="/tu-van-y-si"
          viewAllText={t('viewAll')}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </div>
    </section>
  )
}
