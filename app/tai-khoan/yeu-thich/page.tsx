"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { AccountFeaturePage } from "@/components/pages/shared/AccountFeaturePage/AccountFeaturePage";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";
import type { Product } from "@/lib/types";
import { userServices } from "@/services/userApi";

export default function AccountFavoritesPage() {
  const { isLoggedIn } = useAuth();
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadFavorites = async () => {
      if (!isLoggedIn) {
        return;
      }

      try {
        const nextFavorites = await userServices.getMyFavorites();

        if (isMounted) {
          setFavorites(nextFavorites);
          setIsLoaded(true);
        }
      } catch {
        if (isMounted) {
          setFavorites([]);
          setIsLoaded(true);
        }
      }
    };

    loadFavorites();

    return () => {
      isMounted = false;
    };
  }, [isLoggedIn]);

  return (
    <AccountFeaturePage
      action={{ href: "/san-pham", label: "Khám phá sản phẩm" }}
      description="Lưu lại những sản phẩm bạn quan tâm để xem lại và mua nhanh hơn trong các lần sau."
      icon={Heart}
      title="Sản phẩm yêu thích"
    >
      {favorites.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-10 text-center">
            <Heart className="mx-auto mb-4 h-14 w-14 text-muted-foreground" />
            <h2 className="text-xl font-semibold">
              {isLoaded ? "Danh sách yêu thích đang trống" : "Đang tải danh sách yêu thích"}
            </h2>
            <p className="mt-2 text-muted-foreground">
              Sản phẩm bạn lưu từ backend sẽ hiển thị tại đây để mua lại nhanh hơn.
            </p>
            <Button className="mt-6" asChild>
              <Link href="/san-pham">Xem sản phẩm</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </AccountFeaturePage>
  );
}
