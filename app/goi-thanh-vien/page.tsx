"use client";

import { useEffect, useState } from "react";
import { Crown } from "lucide-react";
import { MembershipCard } from "@/components/MembershipCard";
import { InfoPageShell } from "@/components/pages/shared/InfoPageShell/InfoPageShell";
import {
  localizedText,
  mapContentActions,
  mapContentHighlights,
} from "@/components/pages/shared/contentHelpers";
import { getContentIcon } from "@/components/pages/shared/contentIconMap";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/lib/language-context";
import { membershipServices } from "@/services/membershipApi";
import { contentServices } from "@/services/contentApi";
import type { ContentPage, MembershipPackage } from "@/lib/types";

export default function MembershipPackagesPage() {
  const { language } = useLanguage();
  const [packages, setPackages] = useState<MembershipPackage[]>([]);
  const [page, setPage] = useState<ContentPage | null>();

  useEffect(() => {
    let isMounted = true;

    const loadPage = async () => {
      try {
        const [nextPackages, nextPage] = await Promise.all([
          membershipServices.getPackages(),
          contentServices.getPage("marketing.membership-packages"),
        ]);

        if (isMounted) {
          setPackages(nextPackages);
          setPage(nextPage);
        }
      } catch {
        if (isMounted) {
          setPackages([]);
          setPage(null);
        }
      }
    };

    loadPage();

    return () => {
      isMounted = false;
    };
  }, []);

  const Icon = page ? getContentIcon(page.icon) : Crown;
  const cards = page?.cards ?? [];

  return (
    <InfoPageShell
      badge={page?.badge || "Membership Combo"}
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Gói thành viên" },
      ]}
      description={
        page
          ? localizedText(page.description, language)
          : "Lựa chọn gói chăm sóc sức khỏe theo nhu cầu, kết hợp sản phẩm thảo dược, ưu đãi mua sắm và tư vấn định kỳ."
      }
      highlights={
        page
          ? mapContentHighlights(page.highlights, language)
          : [
              { label: "Gói linh hoạt", value: "4+" },
              { label: "Ưu đãi tối đa", value: "15%" },
            ]
      }
      icon={Icon}
      title={page ? localizedText(page.title, language) : "Combo thành viên An Gia Green"}
      actions={
        page?.actions?.length
          ? mapContentActions(page.actions, language)
          : [
              { href: "/thanh-vien", label: "Xem cấp bậc", variant: "outline" },
              { href: "/tu-van", label: "Cần tư vấn" },
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
          <h2 className="text-2xl font-bold">Danh sách combo</h2>
          <p className="mt-2 text-muted-foreground">
            Chọn gói phù hợp với nhu cầu của cá nhân hoặc gia đình.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {packages.map((item) => (
            <MembershipCard key={item.id} package_={item} />
          ))}
        </div>
      </section>
    </InfoPageShell>
  );
}
