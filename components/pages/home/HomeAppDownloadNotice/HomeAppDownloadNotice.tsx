'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { BellRing, Download, X } from 'lucide-react'
import { useLanguage } from '@/context/language-context'

const APP_DOWNLOAD_LINK = 'https://play.google.com/store/apps'

export function HomeAppDownloadNotice() {
  const { language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [isRendered, setIsRendered] = useState(false)

  useEffect(() => {
    // Slide in after 1.5s
    const timer = setTimeout(() => {
      setIsRendered(true)
      const visibleTimer = setTimeout(() => {
        setIsVisible(true)
      }, 50)
      return () => clearTimeout(visibleTimer)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  // Auto hide after 12 seconds
  useEffect(() => {
    if (isVisible) {
      const autoCloseTimer = setTimeout(() => {
        handleDismiss()
      }, 12000)
      return () => clearTimeout(autoCloseTimer)
    }
  }, [isVisible])

  const handleDismiss = () => {
    setIsVisible(false)
    // Unmount after animation finishes (400ms)
    setTimeout(() => {
      setIsRendered(false)
    }, 400)
  }

  if (!isRendered) return null

  const copy = {
    badge: {
      vi: 'Tải app',
      en: 'Get the app',
      zh: '下载应用',
    },
    title: {
      vi: 'Tải App chăm sóc sức khỏe cá nhân để theo dõi tư vấn mỗi ngày.',
      en: 'Download the personal health app to follow daily consultations.',
      zh: '下载个人健康应用，随时查看每日咨询。',
    },
    action: {
      vi: 'Tải ứng dụng',
      en: 'Download App',
      zh: '下载应用',
    },
  }

  return (
    <div
      className={`fixed right-3 z-[60] w-[calc(100vw-1.5rem)] max-w-md rounded-xl border border-[#D9F2A1]/50 bg-gradient-to-r from-[#287d39] via-[#339d41] to-[#4FAE4E] p-3 text-white shadow-2xl backdrop-blur transition-all duration-500 ease-out md:right-6 ${
        isVisible 
          ? 'translate-x-0 opacity-100 top-12 md:top-14' 
          : 'translate-x-full opacity-0 top-8'
      }`}
    >
      {/* Light sweep effect */}
      <div className="absolute inset-0 w-full h-full overflow-hidden rounded-xl pointer-events-none">
        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/10 opacity-40 animate-[sweep_6s_infinite]" />
      </div>

      <button
        type="button"
        onClick={handleDismiss}
        className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-white/80 transition-all hover:bg-white/25 hover:text-white"
        aria-label="Close app download notice"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="flex items-center gap-3 pr-8">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/95 shadow-lg relative">
          <div className="relative">
            <BellRing className="notice-bell h-6 w-6 origin-top text-[#287d39]" />
            <span className="absolute -top-1.5 -right-1.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </span>
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#E8FFD1]">
            {copy.badge[language]}
          </p>
          <p className="mt-1 text-sm font-medium leading-5 text-white">
            {copy.title[language]}
          </p>
        </div>
        <Link
          href={APP_DOWNLOAD_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-semibold text-[#1F5B27] transition-colors hover:bg-[#F3FFE6]"
        >
          <Download className="h-3.5 w-3.5" />
          {copy.action[language]}
        </Link>
      </div>
    </div>
  )
}
