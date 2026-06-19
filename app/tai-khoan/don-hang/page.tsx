"use client";

import Link from "next/link";
import Image from "next/image";
import { Package } from "lucide-react";
import { AccountFeaturePage } from "@/components/pages/shared/AccountFeaturePage/AccountFeaturePage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/lib/data";
import { useAuth } from "@/lib/auth-context";

const statusLabels = {
  pending: "Chờ xử lý",
  confirmed: "Đã xác nhận",
  shipping: "Đang giao",
  delivered: "Đã giao",
  cancelled: "Đã hủy",
};

export default function AccountOrdersPage() {
  const { orders } = useAuth();

  return (
    <AccountFeaturePage
      action={{ href: "/san-pham", label: "Tiếp tục mua sắm" }}
      description="Theo dõi trạng thái đơn hàng, sản phẩm đã đặt và tổng giá trị thanh toán."
      icon={Package}
      title="Đơn hàng của tôi"
    >
      {orders.length > 0 ? (
        <div className="grid gap-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardContent className="p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="font-semibold">{order.id}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                  <Badge>{statusLabels[order.status]}</Badge>
                </div>
                <div className="mt-5 grid gap-3">
                  {order.items.map((item) => (
                    <div key={item.productId} className="flex items-center gap-4 rounded-lg border p-3">
                      <Image
                        src={item.image}
                        alt={item.productName}
                        width={56}
                        height={56}
                        className="rounded-md object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">{item.productName}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.quantity} x {formatPrice(item.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex justify-end">
                  <p className="text-lg font-bold text-primary">{formatPrice(order.totalAmount)}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-10 text-center">
            <Package className="mx-auto mb-4 h-14 w-14 text-muted-foreground" />
            <h2 className="text-xl font-semibold">Chưa có đơn hàng</h2>
            <p className="mt-2 text-muted-foreground">Bắt đầu mua sắm để tạo đơn hàng đầu tiên.</p>
            <Button className="mt-6" asChild>
              <Link href="/san-pham">Xem sản phẩm</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </AccountFeaturePage>
  );
}
