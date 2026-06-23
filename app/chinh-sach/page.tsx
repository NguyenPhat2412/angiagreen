"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText } from "lucide-react";
import { InfoPageShell } from "@/components/pages/shared/InfoPageShell/InfoPageShell";
import { localizedText } from "@/components/pages/shared/contentHelpers";
import { getContentIcon } from "@/components/pages/shared/contentIconMap";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/language-context";
import { contentServices } from "@/services/contentApi";
import type { ContentPage } from "@/interface/types";

const policySlugFromKey = (key: string) => key.replace("policy.", "");

export default function PoliciesIndexPage() {
  const { language, t } = useLanguage();
  const [policies, setPolicies] = useState<ContentPage[]>([]);

  useEffect(() => {
    let isMounted = true;

    const loadPolicies = async () => {
      try {
        const nextPolicies = await contentServices.getPolicies();

        if (isMounted) {
          setPolicies(nextPolicies);
        }
      } catch {
        if (isMounted) {
          setPolicies([]);
        }
      }
    };

    loadPolicies();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <InfoPageShell
      badge="Policy Center"
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Chính sách" },
      ]}
      description="Trung tâm chính sách giúp khách hàng tra cứu nhanh các quy định về bảo mật, điều khoản, đổi trả, vận chuyển và thanh toán."
      highlights={[
        { label: "Nhóm chính sách", value: `${policies.length}` },
        { label: "Kênh hỗ trợ", value: "24/7" },
      ]}
      icon={FileText}
      title="Trung tâm chính sách"
      actions={[{ href: "/lien-he", label: "Liên hệ hỗ trợ" }]}
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {policies.map((policy) => {
          const Icon = getContentIcon(policy.icon);
          const slug = policySlugFromKey(policy.key);

          return (
            <Link key={slug} href={`/chinh-sach/${slug}`}>
              <Card className="h-full transition-shadow hover:shadow-lg">
                <CardContent className="p-6">
                  <Icon className="mb-4 h-10 w-10 text-primary" />
                  <h2 className="text-lg font-semibold">
                    {localizedText(policy.title, language)}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                    {localizedText(policy.description, language)}
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {policies.length === 0 && (
        <Card>
          <CardContent className="p-10 text-center text-muted-foreground">
            {t("loadingPolicy")}
          </CardContent>
        </Card>
      )}
    </InfoPageShell>
  );
}
