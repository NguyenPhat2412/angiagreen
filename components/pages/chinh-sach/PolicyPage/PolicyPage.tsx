"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText } from "lucide-react";
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

interface PolicyPageProps {
  slug: string;
}

const policySlugFromKey = (key: string) => key.replace("policy.", "");

export function PolicyPage({ slug }: PolicyPageProps) {
  const { language } = useLanguage();
  const [policy, setPolicy] = useState<ContentPage | null>();
  const [policies, setPolicies] = useState<ContentPage[]>([]);

  useEffect(() => {
    let isMounted = true;

    const loadPolicy = async () => {
      try {
        const [nextPolicy, nextPolicies] = await Promise.all([
          contentServices.getPolicy(slug),
          contentServices.getPolicies(),
        ]);

        if (isMounted) {
          setPolicy(nextPolicy);
          setPolicies(nextPolicies);
        }
      } catch {
        if (isMounted) {
          setPolicy(null);
          setPolicies([]);
        }
      }
    };

    loadPolicy();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (policy === undefined) {
    return <main className="min-h-screen bg-muted/30" />;
  }

  if (!policy) {
    return (
      <InfoPageShell
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Chính sách", href: "/chinh-sach" },
          { label: "Không tìm thấy" },
        ]}
        description="Trang chính sách này chưa được khai báo nội dung."
        icon={FileText}
        title="Chính sách chưa có nội dung"
        actions={[{ href: "/chinh-sach", label: "Xem danh sách chính sách" }]}
      >
        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground">
              Vui lòng quay lại danh sách chính sách hoặc liên hệ bộ phận hỗ trợ để được
              giải đáp.
            </p>
          </CardContent>
        </Card>
      </InfoPageShell>
    );
  }

  const Icon = getContentIcon(policy.icon);
  const title = localizedText(policy.title, language);

  return (
    <InfoPageShell
      badge={policy.badge || "Policy"}
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Chính sách", href: "/chinh-sach" },
        { label: title },
      ]}
      description={localizedText(policy.description, language)}
      highlights={mapContentHighlights(policy.highlights, language)}
      icon={Icon}
      title={title}
      actions={
        policy.actions?.length
          ? mapContentActions(policy.actions, language)
          : [
              { href: "/lien-he", label: "Liên hệ hỗ trợ" },
              { href: "/ho-tro/faq", label: "FAQ", variant: "outline" },
            ]
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <div className="space-y-6">
          {(policy.sections ?? []).map((section) => {
            const heading = localizedText(section.heading, language);

            return (
              <Card key={heading}>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold">{heading}</h2>
                  {section.body && (
                    <p className="mt-3 text-muted-foreground">
                      {localizedText(section.body, language)}
                    </p>
                  )}
                  <ul className="mt-4 space-y-3">
                    {(section.items ?? []).map((item) => {
                      const label = localizedText(item, language);

                      return (
                        <li key={label} className="flex gap-3 text-muted-foreground">
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                          <span>{label}</span>
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
              </Card>
            );
          })}

          {(policy.sections ?? []).length === 0 && (
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground">
                  Nội dung chi tiết đang được cập nhật từ hệ thống quản trị.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        <Card className="h-fit">
          <CardContent className="p-6">
            <h2 className="font-semibold">Các chính sách khác</h2>
            <div className="mt-4 grid gap-2">
              {policies.map((item) => (
                <Link
                  key={item.key}
                  href={`/chinh-sach/${policySlugFromKey(item.key)}`}
                  className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary"
                >
                  {localizedText(item.title, language)}
                </Link>
              ))}
            </div>
            <Button className="mt-5 w-full" variant="outline" asChild>
              <Link href="/chinh-sach">Tất cả chính sách</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </InfoPageShell>
  );
}
