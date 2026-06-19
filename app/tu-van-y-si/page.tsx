"use client";

import { useEffect, useState } from "react";
import { Stethoscope } from "lucide-react";
import { DoctorCard } from "@/components/DoctorCard";
import { InfoPageShell } from "@/components/pages/shared/InfoPageShell/InfoPageShell";
import {
  localizedText,
  mapContentActions,
  mapContentHighlights,
} from "@/components/pages/shared/contentHelpers";
import { getContentIcon } from "@/components/pages/shared/contentIconMap";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/lib/language-context";
import { doctorServices } from "@/services/doctorApi";
import { contentServices } from "@/services/contentApi";
import type { ContentPage, Doctor } from "@/lib/types";

export default function MedicalConsultantsPage() {
  const { language } = useLanguage();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [page, setPage] = useState<ContentPage | null>();

  useEffect(() => {
    let isMounted = true;

    const loadPage = async () => {
      try {
        const [nextDoctors, nextPage] = await Promise.all([
          doctorServices.getAll(),
          contentServices.getPage("marketing.medical-consultants"),
        ]);

        if (isMounted) {
          setDoctors(nextDoctors);
          setPage(nextPage);
        }
      } catch {
        if (isMounted) {
          setDoctors([]);
          setPage(null);
        }
      }
    };

    loadPage();

    return () => {
      isMounted = false;
    };
  }, []);

  const Icon = page ? getContentIcon(page.icon) : Stethoscope;
  const highlights = page ? mapContentHighlights(page.highlights, language) : [];
  const cards = page?.cards ?? [];

  return (
    <InfoPageShell
      badge={page?.badge || "Medical Consultation"}
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Tư vấn cùng y sĩ" },
      ]}
      description={
        page
          ? localizedText(page.description, language)
          : "Kết nối với đội ngũ y sĩ, dược sĩ và chuyên gia chăm sóc sức khỏe để được hướng dẫn dùng sản phẩm và đặt lịch tư vấn phù hợp."
      }
      highlights={[
        { label: highlights[0]?.label || "Chuyên gia hiện có", value: `${doctors.length}` },
        ...(highlights.length > 1 ? highlights.slice(1) : [{ label: "Hình thức tư vấn", value: "3" }]),
      ]}
      icon={Icon}
      title={page ? localizedText(page.title, language) : "Tư vấn cùng y sĩ"}
      actions={
        page?.actions?.length
          ? mapContentActions(page.actions, language)
          : [
              { href: "/tu-van", label: "Đặt lịch tư vấn" },
              { href: "/chuyen-gia", label: "Xem đội ngũ", variant: "outline" },
            ]
      }
    >
      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((item) => {
          const CardIcon = getContentIcon(item.icon);
          const title = localizedText(item.title, language);

          return (
            <Card key={title}>
              <CardContent className="p-6">
                <CardIcon className="mb-4 h-10 w-10 text-primary" />
                <h2 className="font-semibold">{title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {localizedText(item.text, language)}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <section className="mt-10">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Đội ngũ tư vấn</h2>
          <p className="mt-2 text-muted-foreground">
            Chọn một chuyên gia để xem chi tiết và đặt lịch phù hợp.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </section>
    </InfoPageShell>
  );
}
