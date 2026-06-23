"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BriefcaseBusiness, Mail, MapPin } from "lucide-react";
import { InfoPageShell } from "@/components/pages/shared/InfoPageShell/InfoPageShell";
import {
  localizedText,
  mapContentActions,
  mapContentHighlights,
} from "@/components/pages/shared/contentHelpers";
import { getContentIcon } from "@/components/pages/shared/contentIconMap";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/language-context";
import { contentServices } from "@/services/contentApi";
import type { ContentPage } from "@/interface/types";

export default function CareersPage() {
  const { language } = useLanguage();
  const [page, setPage] = useState<ContentPage | null>();

  useEffect(() => {
    let isMounted = true;

    const loadPage = async () => {
      try {
        const nextPage = await contentServices.getCareers();

        if (isMounted) {
          setPage(nextPage);
        }
      } catch {
        if (isMounted) {
          setPage(null);
        }
      }
    };

    loadPage();

    return () => {
      isMounted = false;
    };
  }, []);

  const Icon = page ? getContentIcon(page.icon) : BriefcaseBusiness;
  const jobs = page?.jobs ?? [];

  return (
    <InfoPageShell
      badge={page?.badge || "Careers"}
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Tuyển dụng" },
      ]}
      description={
        page
          ? localizedText(page.description, language)
          : "Gia nhập An Gia Green để cùng xây dựng hệ sinh thái dược liệu sạch, thương mại bền vững và chăm sóc sức khỏe chủ động."
      }
      highlights={
        page
          ? mapContentHighlights(page.highlights, language)
          : [
              { label: "Vị trí mở", value: `${jobs.length}` },
              { label: "Giá trị cốt lõi", value: "3" },
            ]
      }
      icon={Icon}
      title={page ? localizedText(page.title, language) : "Tuyển dụng"}
      actions={
        page?.actions?.length
          ? mapContentActions(page.actions, language)
          : [
              { href: "mailto:info@angiagreen.vn", label: "Gửi CV" },
              { href: "/lien-he", label: "Liên hệ nhân sự", variant: "outline" },
            ]
      }
    >
      <div className="grid gap-6 md:grid-cols-3">
        {(page?.cards ?? []).map((item) => {
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
        <h2 className="mb-6 text-2xl font-bold">Vị trí đang tuyển</h2>
        <div className="grid gap-4">
          {jobs.map((job) => (
            <Card key={localizedText(job.title, language)}>
              <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-semibold">{localizedText(job.title, language)}</h3>
                  <div className="mt-2 flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {localizedText(job.location, language)}
                    </span>
                    <span>{job.type}</span>
                  </div>
                </div>
                <Button variant="outline" asChild>
                  <Link href={`mailto:${job.applyEmail || "info@angiagreen.vn"}`}>
                    <Mail className="mr-2 h-4 w-4" />
                    Ứng tuyển
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {page === null && (
          <Card>
            <CardContent className="p-10 text-center text-muted-foreground">
              Chưa tải được dữ liệu tuyển dụng từ backend.
            </CardContent>
          </Card>
        )}
      </section>
    </InfoPageShell>
  );
}
