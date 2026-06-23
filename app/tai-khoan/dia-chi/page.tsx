"use client";

import { useEffect, useState } from "react";
import { MapPin, Plus } from "lucide-react";
import { AccountFeaturePage } from "@/components/pages/shared/AccountFeaturePage/AccountFeaturePage";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/auth-context";
import type { Address } from "@/interface/types";
import { userServices } from "@/services/userApi";
import { useLanguage } from "@/context/language-context";

export default function AccountAddressesPage() {
  const { isLoggedIn } = useAuth();
  const { t } = useLanguage();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadAddresses = async () => {
      if (!isLoggedIn) {
        return;
      }

      try {
        const nextAddresses = await userServices.getMyAddresses();

        if (isMounted) {
          setAddresses(nextAddresses);
          setIsLoaded(true);
        }
      } catch {
        if (isMounted) {
          setAddresses([]);
          setIsLoaded(true);
        }
      }
    };

    loadAddresses();

    return () => {
      isMounted = false;
    };
  }, [isLoggedIn]);

  return (
    <AccountFeaturePage
      description="Quản lý địa chỉ giao hàng mặc định và các địa chỉ thường dùng."
      icon={MapPin}
      title="Địa chỉ giao hàng"
    >
      {addresses.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {addresses.map((address) => (
            <Card key={address.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-semibold">{address.name}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{address.phone}</p>
                  </div>
                  {address.isDefault && <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">Mặc định</span>}
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  {address.address}, {address.ward}, {address.district}, {address.city}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-10 text-center">
            <MapPin className="mx-auto mb-4 h-14 w-14 text-muted-foreground" />
            <h2 className="text-xl font-semibold">
              {isLoaded ? "Chưa có địa chỉ" : t("loadingAddress")}
            </h2>
            <p className="mt-2 text-muted-foreground">
              Địa chỉ giao hàng sẽ được đọc và cập nhật qua backend tài khoản.
            </p>
            <Button className="mt-6" disabled>
              <Plus className="mr-2 h-4 w-4" />
              Thêm địa chỉ
            </Button>
          </CardContent>
        </Card>
      )}
    </AccountFeaturePage>
  );
}
