"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, ShoppingCart } from "lucide-react";
import { InfoPageShell } from "@/components/pages/shared/InfoPageShell/InfoPageShell";
import {
  localizedText,
  mapContentActions,
  mapContentHighlights,
} from "@/components/pages/shared/contentHelpers";
import { getContentIcon } from "@/components/pages/shared/contentIconMap";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/lib/language-context";
import { contentServices } from "@/services/contentApi";
import type { ContentPage } from "@/lib/types";

export default function ShoppingGuidePage() {
  const { language } = useLanguage();
  const [page, setPage] = useState<ContentPage | null>();

  useEffect(() => {
    let isMounted = true;

    const loadPage = async () => {
      try {
        const nextPage = await contentServices.getSupportPage("shopping-guide");

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

  const Icon = page ? getContentIcon(page.icon) : ShoppingCart;
  const steps = page?.cards ?? [];

  return (
    <InfoPageShell
      badge={page?.badge || "Support"}
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Hỗ trợ", href: "/ho-tro/faq" },
        { label: "Hướng dẫn mua hàng" },
      ]}
      description={
        page
          ? localizedText(page.description, language)
          : "Hướng dẫn các bước mua sản phẩm trên website An Gia Green, từ chọn sản phẩm đến theo dõi đơn hàng."
      }
      highlights={
        page
          ? mapContentHighlights(page.highlights, language)
          : [
              { label: "Bước mua hàng", value: "4" },
              { label: "Hỗ trợ hotline", value: "1900" },
            ]
      }
      icon={Icon}
      title={page ? localizedText(page.title, language) : "Hướng dẫn mua hàng"}
      actions={
        page?.actions?.length
          ? mapContentActions(page.actions, language)
          : [
              { href: "/san-pham", label: "Mua sắm ngay" },
              { href: "/lien-he", label: "Cần hỗ trợ", variant: "outline" },
            ]
      }
    >
      <div className="grid gap-6 md:grid-cols-2">
        {steps.map((step) => {
          const StepIcon = getContentIcon(step.icon);
          const title = localizedText(step.title, language);

          return (
            <Card key={title}>
              <CardContent className="p-6">
                <StepIcon className="mb-4 h-10 w-10 text-primary" />
                <h2 className="text-lg font-semibold">{title}</h2>
                <p className="mt-2 text-muted-foreground">
                  {localizedText(step.text, language)}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {page === null && (
        <Card>
          <CardContent className="p-10 text-center text-muted-foreground">
            Chưa tải được hướng dẫn mua hàng từ backend.
          </CardContent>
        </Card>
      )}

      <Card className="mt-8 bg-primary text-primary-foreground">
        <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-bold">Đã sẵn sàng đặt hàng?</h2>
            <p className="mt-1 text-primary-foreground/80">
              Khám phá các sản phẩm thảo dược và thực phẩm sạch đang có sẵn.
            </p>
          </div>
          <Button variant="secondary" asChild>
            <Link href="/san-pham">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Xem sản phẩm
            </Link>
          </Button>
        </CardContent>
      </Card>
    </InfoPageShell>
  );
}
