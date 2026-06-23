"use client";

import { useEffect, useState } from "react";
import { HelpCircle, Mail, Phone } from "lucide-react";
import { InfoPageShell } from "@/components/pages/shared/InfoPageShell/InfoPageShell";
import {
  localizedText,
  mapContentActions,
  mapContentHighlights,
} from "@/components/pages/shared/contentHelpers";
import { getContentIcon } from "@/components/pages/shared/contentIconMap";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/language-context";
import { contentServices } from "@/services/contentApi";
import type { ContentPage } from "@/interface/types";

export default function FaqPage() {
  const { language } = useLanguage();
  const [page, setPage] = useState<ContentPage | null>();

  useEffect(() => {
    let isMounted = true;

    const loadPage = async () => {
      try {
        const nextPage = await contentServices.getSupportPage("faq");

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

  const Icon = page ? getContentIcon(page.icon) : HelpCircle;
  const faqs = page?.faqs ?? [];

  return (
    <InfoPageShell
      badge={page?.badge || "FAQ"}
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Hỗ trợ" },
        { label: "Câu hỏi thường gặp" },
      ]}
      description={
        page
          ? localizedText(page.description, language)
          : "Các câu hỏi thường gặp về mua hàng, sản phẩm, thành viên, tư vấn và hỗ trợ sau bán."
      }
      highlights={
        page
          ? mapContentHighlights(page.highlights, language)
          : [
              { label: "Câu hỏi phổ biến", value: `${faqs.length}` },
              { label: "Kênh hỗ trợ", value: "2" },
            ]
      }
      icon={Icon}
      title={page ? localizedText(page.title, language) : "Câu hỏi thường gặp"}
      actions={
        page?.actions?.length
          ? mapContentActions(page.actions, language)
          : [
              { href: "/lien-he", label: "Gửi câu hỏi" },
              {
                href: "/ho-tro/huong-dan-mua-hang",
                label: "Hướng dẫn mua hàng",
                variant: "outline",
              },
            ]
      }
    >
      <div className="grid gap-4">
        {faqs.map((faq) => (
          <Card key={localizedText(faq.question, language)}>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold">
                {localizedText(faq.question, language)}
              </h2>
              <p className="mt-2 text-muted-foreground">
                {localizedText(faq.answer, language)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {page === null && (
        <Card>
          <CardContent className="p-10 text-center text-muted-foreground">
            Chưa tải được danh sách câu hỏi từ backend.
          </CardContent>
        </Card>
      )}

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <Phone className="mb-4 h-9 w-9 text-primary" />
            <h2 className="font-semibold">Hotline</h2>
            <p className="mt-2 text-muted-foreground">1900 1234 - Hỗ trợ nhanh trong giờ làm việc.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <Mail className="mb-4 h-9 w-9 text-primary" />
            <h2 className="font-semibold">Email</h2>
            <p className="mt-2 text-muted-foreground">info@angiagreen.vn - Gửi câu hỏi chi tiết.</p>
          </CardContent>
        </Card>
      </div>
    </InfoPageShell>
  );
}
