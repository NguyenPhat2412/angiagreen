'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { BellRing, X, ArrowRight, Sparkles, ShoppingBag, Gift } from 'lucide-react'
import { useLanguage } from '@/context/language-context'
import { useAuth } from '@/context/auth-context'
import { notificationServices } from '@/services/notificationApi'
import { notifications } from '@/language/data'

interface ToastData {
  id: string
  title: Record<'vi' | 'en' | 'zh', string>
  content: Record<'vi' | 'en' | 'zh', string>
  type: 'order' | 'appointment' | 'promotion' | 'system'
  actionUrl: string
  badge: Record<'vi' | 'en' | 'zh', string>
}

const MOCK_NOTIFICATIONS: ToastData[] = notifications.map((n) => ({
  id: n.id,
  title: n.title as any,
  content: n.content as any,
  type: n.type,
  actionUrl: n.type === 'order' 
    ? '/tai-khoan/don-hang' 
    : n.type === 'appointment' 
    ? '/tai-khoan' 
    : n.type === 'promotion'
    ? '/san-pham'
    : '/thanh-vien',
  badge: {
    vi: n.type === 'order' ? 'Đơn hàng' : n.type === 'appointment' ? 'Lịch hẹn' : n.type === 'promotion' ? 'Ưu đãi đặc quyền' : 'Hội viên An Gia',
    en: n.type === 'order' ? 'Order' : n.type === 'appointment' ? 'Appointment' : n.type === 'promotion' ? 'Exclusive Offer' : 'Membership Club',
    zh: n.type === 'order' ? '订单' : n.type === 'appointment' ? '预约' : n.type === 'promotion' ? '专属优惠' : '安家会员',
  }
}))

export function DynamicNotificationToast() {
  const { language } = useLanguage()
  const { isLoggedIn } = useAuth()
  const [toast, setToast] = useState<ToastData | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isRendered, setIsRendered] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined = undefined
    let autoCloseTimer: NodeJS.Timeout | undefined = undefined

    const loadNotification = async () => {
      try {
        if (isLoggedIn) {
          const list = await notificationServices.getMy() as any
          const unreads = Array.isArray(list) 
            ? list.filter((n: any) => !n.isRead) 
            : list.items?.filter((n: any) => !n.isRead) || []

          if (unreads.length > 0) {
            // Sort by newest first
            unreads.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            const latest = unreads[0]
            
            // Map to ToastData
            setToast({
              id: latest.id,
              title: latest.title as any,
              content: latest.content as any,
              type: latest.type,
              actionUrl: latest.type === 'order' 
                ? '/tai-khoan/don-hang' 
                : latest.type === 'appointment' 
                ? '/tai-khoan' 
                : '/tai-khoan/thong-bao',
              badge: {
                vi: latest.type === 'order' ? 'Đơn hàng' : latest.type === 'appointment' ? 'Lịch hẹn' : latest.type === 'promotion' ? 'Khuyến mãi' : 'Hệ thống',
                en: latest.type === 'order' ? 'Order' : latest.type === 'appointment' ? 'Appointment' : latest.type === 'promotion' ? 'Promo' : 'System',
                zh: latest.type === 'order' ? '订单' : latest.type === 'appointment' ? '预约' : latest.type === 'promotion' ? '优惠' : '系统',
              }
            })
            
            // Trigger animation after 2.5s
            timer = setTimeout(() => {
              setIsRendered(true)
              setTimeout(() => setIsVisible(true), 50)
            }, 2500)
            return
          }
        }
      } catch (err) {
        console.error('Error fetching real notifications:', err)
      }

      // Fallback: Show a mock notification after 4s delay to showcase the feature
      timer = setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * MOCK_NOTIFICATIONS.length)
        setToast(MOCK_NOTIFICATIONS[randomIndex])
        setIsRendered(true)
        setTimeout(() => setIsVisible(true), 50)
      }, 4000)
    }

    loadNotification()

    return () => {
      if (timer) clearTimeout(timer)
      if (autoCloseTimer) clearTimeout(autoCloseTimer)
    }
  }, [isLoggedIn])

  // Handle auto close
  useEffect(() => {
    if (isVisible) {
      const autoCloseTimer = setTimeout(() => {
        handleDismiss()
      }, 9000) // Auto-hide after 9 seconds

      return () => clearTimeout(autoCloseTimer)
    }
  }, [isVisible])

  const handleDismiss = () => {
    setIsVisible(false)
    setTimeout(() => {
      setIsRendered(false)
      setToast(null)
    }, 400) // Wait for slide out animation
  }

  const handleActionClick = () => {
    if (toast && isLoggedIn && !toast.id.startsWith('mock-')) {
      // Mark as read in the background
      notificationServices.markRead(toast.id).catch(() => {})
    }
    handleDismiss()
  }

  if (!isRendered || !toast) return null

  const getIcon = () => {
    switch (toast.type) {
      case 'order':
        return <ShoppingBag className="h-5 w-5 text-[#E67E22]" />
      case 'promotion':
        return <Gift className="h-5 w-5 text-[#E74C3C]" />
      default:
        return <Sparkles className="h-5 w-5 text-[#F1C40F]" />
    }
  }

  return (
    <div
      className={`fixed right-3 z-[60] w-[calc(100vw-1.5rem)] max-w-sm rounded-xl border border-white/20 bg-gradient-to-r from-[#194D33] via-[#2E7D32] to-[#43A047] p-4 text-white shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur transition-all duration-500 ease-out md:right-6 ${
        isVisible 
          ? 'translate-x-0 opacity-100 top-28 md:top-32' 
          : 'translate-x-full opacity-0 top-24'
      }`}
    >
      {/* Light sweep effect */}
      <div className="absolute inset-0 w-full h-full overflow-hidden rounded-xl pointer-events-none">
        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/10 opacity-40 animate-[sweep_6s_infinite]" />
      </div>

      <button
        type="button"
        onClick={handleDismiss}
        className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white/80 transition-all hover:bg-white/25 hover:text-white"
        aria-label="Close notification"
      >
        <X className="h-3.5 w-3.5" />
      </button>

      <div className="flex gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/95 shadow-md">
          <div className="relative">
            <BellRing className="notice-bell h-5 w-5 origin-top text-[#2E7D32]" />
            <span className="absolute -top-1.5 -right-1.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </span>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            {getIcon()}
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#E8FFD1]">
              {toast.badge[language as keyof typeof toast.badge] || toast.badge.vi}
            </span>
          </div>
          <p className="mt-1 text-sm font-semibold leading-5 text-white">
            {toast.title[language as keyof typeof toast.title] || toast.title.vi}
          </p>
          <p className="mt-0.5 text-xs leading-4 text-white/85 line-clamp-2">
            {toast.content[language as keyof typeof toast.content] || toast.content.vi}
          </p>

          <div className="mt-3 flex justify-end">
            <Link
              href={toast.actionUrl}
              onClick={handleActionClick}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#E8FFD1] hover:underline"
            >
              {language === 'vi' ? 'Xem chi tiết' : language === 'en' ? 'View details' : '查看详情'}
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
