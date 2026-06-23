"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Lock, User } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/auth-context";
import { useLanguage } from "@/context/language-context";

interface AccountFeaturePageProps {
  action?: {
    href: string;
    label: string;
  };
  children?: ReactNode;
  description: string;
  icon: LucideIcon;
  title: string;
}

export function AccountFeaturePage({
  action,
  children,
  description,
  icon: Icon,
  title,
}: AccountFeaturePageProps) {
  const { isLoggedIn, user } = useAuth();
  const { t } = useLanguage();

  if (!isLoggedIn || !user) {
    return (
      <main className="min-h-screen bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb
            items={[
              { label: t("home"), href: "/" },
              { label: "Tài khoản", href: "/tai-khoan" },
              { label: title },
            ]}
          />
          <Card className="mx-auto mt-8 max-w-xl">
            <CardContent className="p-8 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold">Cần đăng nhập</h1>
              <p className="mt-3 text-muted-foreground">
                Vui lòng đăng nhập để xem và quản lý nội dung tài khoản của bạn.
              </p>
              <Button className="mt-6" asChild>
                <Link href="/dang-nhap">Đăng nhập</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: t("home"), href: "/" },
            { label: "Tài khoản", href: "/tai-khoan" },
            { label: title },
          ]}
        />

        <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
          <Card className="h-fit">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-7 w-7 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-semibold">{user.name}</p>
                  <p className="truncate text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <div className="mt-6 grid gap-2">
                {[
                  ["Thông tin", "/tai-khoan/thong-tin"],
                  ["Đơn hàng", "/tai-khoan/don-hang"],
                  ["Yêu thích", "/tai-khoan/yeu-thich"],
                  ["Địa chỉ", "/tai-khoan/dia-chi"],
                  ["Thanh toán", "/tai-khoan/thanh-toan"],
                  ["Thông báo", "/tai-khoan/thong-bao"],
                  ["Cài đặt", "/tai-khoan/cai-dat"],
                ].map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <div>
            <div className="mb-6 flex flex-col gap-4 rounded-xl bg-card p-6 shadow-sm md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{title}</h1>
                  <p className="mt-1 text-muted-foreground">{description}</p>
                </div>
              </div>
              {action && (
                <Button asChild>
                  <Link href={action.href}>{action.label}</Link>
                </Button>
              )}
            </div>
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
