"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Building, CalendarCheck, Clock, Star, Video } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/lib/language-context";
import { doctorServices } from "@/services/doctorApi";
import type { Doctor } from "@/lib/types";

export default function MedicalConsultantDetailPage() {
  const params = useParams();
  const { language } = useLanguage();
  const [doctor, setDoctor] = useState<Doctor | null>();
  const doctorId = Array.isArray(params.id) ? params.id[0] : params.id;

  useEffect(() => {
    if (!doctorId) {
      return;
    }

    doctorServices.getById(doctorId).then(setDoctor).catch(() => setDoctor(null));
  }, [doctorId]);

  if (doctor === undefined) {
    return <main className="min-h-screen bg-muted/30" />;
  }

  if (!doctor) {
    return (
      <main className="min-h-screen bg-muted/30">
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-muted-foreground">Không tìm thấy chuyên gia.</p>
          <Button className="mt-4" asChild>
            <Link href="/tu-van-y-si">Quay lại danh sách</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: "Tư vấn cùng y sĩ", href: "/tu-van-y-si" },
            { label: doctor.name },
          ]}
        />

        <div className="mt-8 grid gap-8 lg:grid-cols-[360px_1fr]">
          <Card className="h-fit overflow-hidden">
            <div className="relative aspect-square">
              <Image
                src={doctor.image}
                alt={doctor.name}
                fill
                className="object-cover"
                sizes="360px"
                priority
              />
            </div>
            <CardContent className="p-6">
              <Button className="w-full" asChild>
                <Link href={`/tu-van?doctorId=${doctor.id}`}>
                  <CalendarCheck className="mr-2 h-4 w-4" />
                  Đặt lịch tư vấn
                </Link>
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h1 className="text-3xl font-bold">{doctor.name}</h1>
                <p className="mt-2 text-primary">{doctor.title[language]}</p>
                <p className="mt-1 text-muted-foreground">{doctor.specialty[language]}</p>
                <div className="mt-5 flex flex-wrap gap-3 text-sm">
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-primary">
                    <Clock className="h-4 w-4" />
                    {doctor.experience}+ năm kinh nghiệm
                  </span>
                  {doctor.rating && (
                    <span className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1 text-yellow-700">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      {doctor.rating}
                    </span>
                  )}
                  {doctor.consultationType.includes("online") && (
                    <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-blue-600">
                      <Video className="h-4 w-4" />
                      Online
                    </span>
                  )}
                  {doctor.consultationType.includes("offline") && (
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-emerald-600">
                      <Building className="h-4 w-4" />
                      Tại phòng khám
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                { title: "Tư vấn sản phẩm", text: "Hướng dẫn lựa chọn sản phẩm phù hợp với thể trạng." },
                { title: "Theo dõi lịch hẹn", text: doctor.nextAvailable ? `Lịch gần nhất: ${doctor.nextAvailable}` : "Linh hoạt theo lịch đặt hẹn của khách hàng." },
                { title: "Đồng hành lâu dài", text: "Gợi ý lộ trình chăm sóc sức khỏe và cách sử dụng thảo dược an toàn." },
              ].map((item) => (
                <Card key={item.title}>
                  <CardContent className="p-5">
                    <h2 className="font-semibold">{item.title}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
