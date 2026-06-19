"use client";

import { Bell, Globe, Settings, Shield } from "lucide-react";
import { AccountFeaturePage } from "@/components/pages/shared/AccountFeaturePage/AccountFeaturePage";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

const settings = [
  {
    icon: Bell,
    title: "Nhận thông báo",
    text: "Cập nhật đơn hàng, lịch hẹn và ưu đãi mới.",
  },
  {
    icon: Globe,
    title: "Ngôn ngữ hiển thị",
    text: "Đang sử dụng bộ chuyển ngôn ngữ trên header.",
  },
  {
    icon: Shield,
    title: "Bảo mật tài khoản",
    text: "Nên cập nhật mật khẩu định kỳ để bảo vệ tài khoản.",
  },
];

export default function AccountSettingsPage() {
  return (
    <AccountFeaturePage
      description="Quản lý các tùy chọn cá nhân hóa và bảo mật tài khoản."
      icon={Settings}
      title="Cài đặt"
    >
      <div className="grid gap-4">
        {settings.map((setting, index) => (
          <Card key={setting.title}>
            <CardContent className="flex items-center justify-between gap-4 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <setting.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-semibold">{setting.title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{setting.text}</p>
                </div>
              </div>
              <Switch defaultChecked={index === 0} disabled={index !== 0} />
            </CardContent>
          </Card>
        ))}
      </div>
    </AccountFeaturePage>
  );
}
