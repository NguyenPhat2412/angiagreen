"use client";

import { useEffect, useState } from "react";
import { Bell, CheckCheck } from "lucide-react";
import { AccountFeaturePage } from "@/components/pages/shared/AccountFeaturePage/AccountFeaturePage";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/auth-context";
import { useLanguage } from "@/context/language-context";
import { notificationServices } from "@/services/notificationApi";
import type { Notification } from "@/interface/types";

export default function AccountNotificationsPage() {
  const { isLoggedIn } = useAuth();
  const { language } = useLanguage();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    notificationServices.getMy().then(setNotifications).catch(() => setNotifications([]));
  }, [isLoggedIn]);

  return (
    <AccountFeaturePage
      description="Cập nhật thông báo về đơn hàng, lịch hẹn, ưu đãi và hệ thống."
      icon={Bell}
      title="Thông báo"
    >
      {notifications.length > 0 ? (
        <div className="grid gap-4">
          {notifications.map((notification) => (
            <Card key={notification.id} className={notification.isRead ? "" : "border-primary/40 bg-primary/5"}>
              <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-start md:justify-between">
                <div>
                  <h2 className="font-semibold">{notification.title[language]}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{notification.content[language]}</p>
                  <p className="mt-3 text-xs text-muted-foreground">
                    {new Date(notification.createdAt).toLocaleString("vi-VN")}
                  </p>
                </div>
                {!notification.isRead && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={async () => {
                      await notificationServices.markRead(notification.id);
                      setNotifications((current) =>
                        current.map((item) =>
                          item.id === notification.id ? { ...item, isRead: true } : item,
                        ),
                      );
                    }}
                  >
                    <CheckCheck className="mr-2 h-4 w-4" />
                    Đã đọc
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-10 text-center">
            <Bell className="mx-auto mb-4 h-14 w-14 text-muted-foreground" />
            <h2 className="text-xl font-semibold">Chưa có thông báo</h2>
            <p className="mt-2 text-muted-foreground">
              Các cập nhật về đơn hàng và lịch hẹn sẽ xuất hiện tại đây.
            </p>
          </CardContent>
        </Card>
      )}
    </AccountFeaturePage>
  );
}
