"use client";

import { useState } from "react";
import { Loader2, Save, User } from "lucide-react";
import { AccountFeaturePage } from "@/components/pages/shared/AccountFeaturePage/AccountFeaturePage";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth-context";
import { userServices } from "@/services/userApi";

export default function AccountProfilePage() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <AccountFeaturePage
      description="Quản lý thông tin cơ bản dùng cho đơn hàng, tư vấn và chương trình thành viên."
      icon={User}
      title="Thông tin cá nhân"
    >
      <Card>
        <CardContent className="p-6">
          <form
            className="grid gap-5"
            onSubmit={async (event) => {
              event.preventDefault();
              setIsSaving(true);
              setMessage("");
              try {
                await userServices.updateMe({ name, phone });
                setMessage("Đã lưu thông tin. Tải lại trang nếu bạn muốn đồng bộ ngay cache hiện tại.");
              } catch (error) {
                setMessage(error instanceof Error ? error.message : "Lưu thông tin thất bại.");
              } finally {
                setIsSaving(false);
              }
            }}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Họ tên</Label>
                <Input id="name" value={name} onChange={(event) => setName(event.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input id="phone" value={phone} onChange={(event) => setPhone(event.target.value)} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Email</Label>
                <Input value={user?.email ?? ""} disabled />
              </div>
            </div>
            {message && <p className="text-sm text-muted-foreground">{message}</p>}
            <Button type="submit" className="w-fit" disabled={isSaving}>
              {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Lưu thay đổi
            </Button>
          </form>
        </CardContent>
      </Card>
    </AccountFeaturePage>
  );
}
