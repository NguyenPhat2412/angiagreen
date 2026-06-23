"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Check, Crown, Phone, ShieldCheck } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import { localizedText } from "@/components/pages/shared/contentHelpers";
import { getContentIcon } from "@/components/pages/shared/contentIconMap";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/language/data";
import { useLanguage } from "@/context/language-context";
import { useAuth } from "@/context/auth-context";
import { membershipServices } from "@/services/membershipApi";
import { contentServices } from "@/services/contentApi";
import type { ContentPage, MembershipPackage } from "@/interface/types";

export default function MembershipPackageDetailPage() {
  const params = useParams();
  const { language } = useLanguage();
  const { isLoggedIn } = useAuth();
  const [packages, setPackages] = useState<MembershipPackage[]>([]);
  const [page, setPage] = useState<ContentPage | null>();
  const packageId = Array.isArray(params.id) ? params.id[0] : params.id;

  useEffect(() => {
    let isMounted = true;

    const loadPage = async () => {
      try {
        const [nextPackages, nextPage] = await Promise.all([
          membershipServices.getPackages(),
          contentServices.getPage("marketing.membership-package-detail"),
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

  const packageDetail = useMemo(
    () => packages.find((item) => item.id === packageId),
    [packageId, packages],
  );

  if (!packageDetail) {
    return <main className="min-h-screen bg-muted/30" />;
  }

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: "Gói thành viên", href: "/goi-thanh-vien" },
            { label: packageDetail.name[language] },
          ]}
        />

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_420px]">
          <Card className="overflow-hidden">
            <div className="relative h-72 md:h-96">
              <Image
                src={packageDetail.image}
                alt={packageDetail.name[language]}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-sm">
                  <Crown className="h-4 w-4" />
                  Combo thành viên
                </div>
                <h1 className="text-3xl font-bold md:text-4xl">{packageDetail.name[language]}</h1>
                <p className="mt-3 max-w-2xl text-white/85">{packageDetail.description[language]}</p>
              </div>
            </div>
          </Card>

          <Card className="h-fit">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Chi phí gói</p>
              <p className="mt-1 text-3xl font-bold text-primary">{formatPrice(packageDetail.price)}</p>
              <div className="mt-6 space-y-3">
                {packageDetail.benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-3 rounded-lg bg-primary/5 p-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm">{benefit[language]}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 grid gap-3">
                <Button asChild>
                  <Link href={isLoggedIn ? `/goi-thanh-vien/thanh-toan?id=${packageDetail.id}` : `/dang-ky?redirect=/goi-thanh-vien/thanh-toan?id=${packageDetail.id}`}>Đăng ký gói</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/tu-van">
                    <Phone className="mr-2 h-4 w-4" />
                    Tư vấn chọn gói
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {(page?.cards ?? []).length > 0 && (
          <section className="mt-10 grid gap-6 md:grid-cols-3">
            {(page?.cards ?? []).map((item) => {
              const CardIcon = getContentIcon(item.icon) || ShieldCheck;
              const title = localizedText(item.title, language);

              return (
                <Card key={title}>
                  <CardContent className="p-6">
                    <CardIcon className="mb-4 h-9 w-9 text-primary" />
                    <h2 className="font-semibold">{title}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {localizedText(item.text, language)}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </section>
        )}
      </div>
    </main>
  );
}
