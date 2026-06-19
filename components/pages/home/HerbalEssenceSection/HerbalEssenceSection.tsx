'use client'

import { useState } from 'react'
import { PlayCircle } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

const videos = [
  {
    id: 'diep-ha-chau',
    youtubeId: 'nBFVPFxW5Eg',
    title: {
      vi: 'Diệp hạ châu và giá trị chăm sóc gan',
      en: 'Phyllanthus and liver care values',
      zh: '叶下珠与肝脏养护价值',
    },
  },
  {
    id: 'la-lot',
    youtubeId: '0SxtNB6zbvE',
    title: {
      vi: 'Lá lốt trong bài thuốc dân gian',
      en: 'Piper lolot in traditional remedies',
      zh: '蒌叶在民间草药中的应用',
    },
  },
  {
    id: 'tia-to',
    youtubeId: '9b6k5SgykIQ',
    title: {
      vi: 'Lá tía tô và lối sống lành mạnh',
      en: 'Perilla leaves and a healthy lifestyle',
      zh: '紫苏叶与健康生活方式',
    },
  },
]

export function HerbalEssenceSection() {
  const { language } = useLanguage()
  const [currentVideo, setCurrentVideo] = useState(0)

  const copy = {
    eyebrow: {
      vi: 'Tinh hoa nam dược',
      en: 'Southern herbal medicine',
      zh: '南药精华',
    },
    title: {
      vi: 'Nam dược Việt trong chăm sóc sức khỏe hằng ngày',
      en: 'Vietnamese herbal wisdom for everyday wellness',
      zh: '越南南药融入日常健康护理',
    },
    description: {
      vi: 'Từ những cây thuốc quen thuộc như diệp hạ châu, lá lốt, tía tô, nam dược lưu giữ kinh nghiệm chăm sóc sức khỏe của nhiều thế hệ. AN GIA GREEN trân trọng giá trị bản địa ấy và hướng đến cách ứng dụng thảo dược minh bạch, phù hợp với nhịp sống hiện đại.',
      en: 'From familiar herbs such as phyllanthus, piper lolot, and perilla, Southern herbal medicine preserves generations of wellness knowledge. AN GIA GREEN honors that local heritage and applies it with transparency for modern living.',
      zh: '从叶下珠、蒌叶、紫苏等常见草药中，南药承载着世代相传的健康养护经验。AN GIA GREEN 珍视这些本土价值，并以透明、现代的方式应用草本智慧。',
    },
    note: {
      vi: 'Chọn một video để khám phá thêm về các cây thuốc Việt.',
      en: 'Choose a video to learn more about Vietnamese medicinal herbs.',
      zh: '选择一个视频，进一步了解越南草药。',
    },
  }

  const activeVideo = videos[currentVideo]

  return (
    <section className="bg-secondary/35 py-12">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <div className="overflow-hidden rounded-xl bg-black shadow-xl">
            <div className="aspect-video">
              <iframe
                key={activeVideo.youtubeId}
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}`}
                title={activeVideo.title[language]}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>

          <div>
            <span className="mb-4 inline-flex items-center rounded-full bg-[#4FAE4E] px-4 py-1 text-sm font-medium text-white">
              {copy.eyebrow[language]}
            </span>
            <h2 className="mb-4 text-3xl font-bold text-foreground text-balance lg:text-4xl">
              {copy.title[language]}
            </h2>
            <p className="mb-6 leading-relaxed text-muted-foreground">
              {copy.description[language]}
            </p>
            {/* <p className="mb-4 text-sm font-medium text-foreground">
              {copy.note[language]}
            </p> */}

            <div className="space-y-3">
              {videos.map((video, index) => (
                <button
                  key={video.id}
                  onClick={() => setCurrentVideo(index)}
                  className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors ${
                    index === currentVideo
                      ? 'border-[#4FAE4E] bg-[#EAF6E8] text-[#2F7D32]'
                      : 'border-border bg-background text-foreground hover:border-[#4FAE4E]/50'
                  }`}
                  aria-label={`Go to video ${index + 1}`}
                >
                  <PlayCircle className="h-5 w-5 shrink-0 text-[#4FAE4E]" />
                  <span className="text-sm font-semibold">{video.title[language]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
