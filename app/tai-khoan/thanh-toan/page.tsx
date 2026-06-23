"use client";

import { useEffect, useState } from "react";
import { CreditCard, Landmark, Plus, Truck } from "lucide-react";
import { AccountFeaturePage } from "@/components/pages/shared/AccountFeaturePage/AccountFeaturePage";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/auth-context";
import type { PaymentMethod } from "@/interface/types";
import { userServices } from "@/services/userApi";
import { useLanguage } from "@/context/language-context";

const paymentMethodIcons = {
  cod: Truck,
  bank: Landmark,
  card: CreditCard,
  wallet: CreditCard,
};

export default function AccountPaymentMethodsPage() {
  const { isLoggedIn } = useAuth();
  const { t } = useLanguage();
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadPaymentMethods = async () => {
      if (!isLoggedIn) {
        return;
      }

      try {
        const nextMethods = await userServices.getMyPaymentMethods();

        if (isMounted) {
          setMethods(nextMethods);
          setIsLoaded(true);
        }
      } catch {
        if (isMounted) {
          setMethods([]);
          setIsLoaded(true);
        }
      }
    };

    loadPaymentMethods();

    return () => {
      isMounted = false;
    };
  }, [isLoggedIn]);

  return (
    <AccountFeaturePage
      description="Quản lý các phương thức thanh toán được sử dụng khi đặt hàng."
      icon={CreditCard}
      title="Phương thức thanh toán"
    >
      {methods.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-3">
          {methods.map((method) => {
            const MethodIcon = paymentMethodIcons[method.type];

            return (
              <Card key={method.id}>
                <CardContent className="p-6">
                  <MethodIcon className="mb-4 h-10 w-10 text-primary" />
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="font-semibold">{method.label}</h2>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {[method.provider, method.last4 ? `**** ${method.last4}` : ""]
                          .filter(Boolean)
                          .join(" - ") || "Phương thức thanh toán đã lưu"}
                      </p>
                    </div>
                    {method.isDefault && (
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                        Mặc định
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="p-10 text-center">
            <CreditCard className="mx-auto mb-4 h-14 w-14 text-muted-foreground" />
            <h2 className="text-xl font-semibold">
              {isLoaded ? "Chưa có phương thức thanh toán" : t("loadingPayment")}
            </h2>
            <p className="mt-2 text-muted-foreground">
              Các phương thức thanh toán đã lưu sẽ được quản lý thông qua backend tài khoản.
            </p>
            <Button className="mt-6" disabled>
              <Plus className="mr-2 h-4 w-4" />
              Thêm phương thức
            </Button>
          </CardContent>
        </Card>
      )}
    </AccountFeaturePage>
  );
}
