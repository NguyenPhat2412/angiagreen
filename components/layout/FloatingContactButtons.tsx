'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/context/language-context'
import {
  MessageCircle,
  Phone,
  MapPin,
  Calendar,
  ChevronUp,
  X,
  Bot,
  MessageSquare,
} from 'lucide-react'

export default function FloatingContactButtons() {
  const { language } = useLanguage()
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const buttons = [
    {
      id: 'ai-chat',
      icon: Bot,
      label: { vi: 'Chat AI', en: 'AI Chat', zh: 'AI聊天' },
      color: 'bg-gradient-to-r from-[#4FAE4E] to-[#7BC96F]',
      href: '#',
    },
    {
      id: 'zalo',
      icon: MessageSquare,
      label: { vi: 'Zalo', en: 'Zalo', zh: 'Zalo' },
      color: 'bg-blue-500',
      href: 'https://zalo.me/',
    },
    {
      id: 'hotline',
      icon: Phone,
      label: { vi: 'Hotline', en: 'Hotline', zh: '热线' },
      color: 'bg-[#E53935]',
      href: 'tel:19001234',
    },
    {
      id: 'messenger',
      icon: MessageCircle,
      label: { vi: 'Messenger', en: 'Messenger', zh: 'Messenger' },
      color: 'bg-gradient-to-r from-blue-500 to-purple-500',
      href: 'https://m.me/',
    },
    {
      id: 'location',
      icon: MapPin,
      label: { vi: 'Địa chỉ', en: 'Address', zh: '地址' },
      color: 'bg-orange-500',
      href: '/lien-he#map',
    },
    {
      id: 'booking',
      icon: Calendar,
      label: { vi: 'Đặt lịch', en: 'Book', zh: '预约' },
      color: 'bg-[#2F7D32]',
      href: '/tu-van-y-si',
    },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-12 h-12 rounded-full bg-[#4FAE4E] text-white shadow-lg hover:bg-[#2F7D32] transition-all duration-300 flex items-center justify-center hover:scale-110"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}

      {/* Expanded buttons */}
      <div
        className={`flex flex-col gap-2 transition-all duration-300 ${
          isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {buttons.map((button) => {
          const Icon = button.icon
          return (
            <Link
              key={button.id}
              href={button.href}
              className={`flex items-center gap-3 ${button.color} text-white rounded-full shadow-lg hover:scale-105 transition-all duration-200 group`}
            >
              <span className="hidden group-hover:block bg-white text-foreground text-sm px-3 py-1 rounded-full shadow-md whitespace-nowrap mr-1">
                {button.label[language]}
              </span>
              <div className="w-12 h-12 rounded-full flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
            </Link>
          )
        })}
      </div>

      {/* Main toggle button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          isExpanded
            ? 'bg-foreground text-background rotate-45'
            : 'bg-[#4FAE4E] text-white animate-pulse'
        }`}
        aria-label={isExpanded ? 'Close contact menu' : 'Open contact menu'}
      >
        {isExpanded ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  )
}
