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
import { useLanguage } from "@/context/language-context";
import { membershipPackages as mockMembershipPackages } from "@/language/data";
import { mockPageContents } from "@/language/pageContent";
import { membershipServices } from "@/services/membershipApi";
import { contentServices } from "@/services/contentApi";
import type { ContentPage, MembershipPackage } from "@/interface/types";

export default function MembershipPackagesPage() {
  const { language, t } = useLanguage();
  const [packages, setPackages] = useState<MembershipPackage[]>(mockMembershipPackages);
  const [page, setPage] = useState<ContentPage | null>(
    mockPageContents["marketing.membership-packages"] ?? null,
  );

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
          setPackages(mockMembershipPackages);
          setPage(mockPageContents["marketing.membership-packages"] ?? null);
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
      imageUrl={page?.imageUrl}
      breadcrumbs={[
        { label: t("home"), href: "/" },
        { label: t("membershipCombo") },
      ]}
      description={
        page
          ? localizedText(page.description, language)
          : language === "en"
          ? "Choose a health care package based on your needs, combining herbal products, shopping discounts, and periodic consultations."
          : language === "zh"
          ? "根据您的需求选择健康护理套餐，结合草药产品、购物优惠和定期咨询。"
          : "Lựa chọn gói chăm sóc sức khỏe theo nhu cầu, kết hợp sản phẩm thảo dược, ưu đãi mua sắm và tư vấn định kỳ."
      }
      highlights={
        page
          ? mapContentHighlights(page.highlights, language)
          : [
              { label: language === "en" ? "Flexible Packages" : language === "zh" ? "灵活套餐" : "Gói linh hoạt", value: "4+" },
              { label: language === "en" ? "Max Discount" : language === "zh" ? "最大优惠" : "Ưu đãi tối đa", value: "15%" },
            ]
      }
      icon={Icon}
      title={page ? localizedText(page.title, language) : t("membershipCombo")}
      actions={
        page?.actions?.length
          ? mapContentActions(page.actions, language)
          : [
              { href: "/thanh-vien", label: language === "en" ? "View Levels" : language === "zh" ? "查看等级" : "Xem cấp bậc", variant: "outline" },
              { href: "/tu-van", label: language === "en" ? "Need Advice" : language === "zh" ? "需要咨询" : "Cần tư vấn" },
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
          <h2 className="text-2xl font-bold">{t("comboList")}</h2>
          <p className="mt-2 text-muted-foreground">
            {t("comboListSub")}
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
