"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/language-context";
import { productServices } from "@/services/productApi";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { products as mockProducts } from "@/language/data";
import type { Product } from "@/interface/types";

interface ProductsSectionProps {
  title: string;
  categoryIds?: string[];
  productIds?: string[];
  tabs?: Array<{ id: string; label: Record<"vi" | "en" | "zh", string> }>;
  maxProducts?: number;
  viewAllLink?: string;
}

export function ProductsSection({
  title,
  categoryIds,
  productIds,
  tabs,
  maxProducts = 10,
  viewAllLink = "/san-pham",
}: ProductsSectionProps) {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState(tabs?.[0]?.id || "");
  const [products, setProducts] = useState<Product[]>(mockProducts);

  useEffect(() => {
    productServices.getAll().then(setProducts).catch(() => setProducts(mockProducts));
  }, []);

  const filteredProducts =
    productIds && productIds.length > 0
      ? productIds
          .map((id) => products.find((product) => product.id === id))
          .filter(
            (product): product is NonNullable<typeof product> =>
              product !== undefined,
          )
          .slice(0, maxProducts)
      : products
          .filter((product) => {
            if (categoryIds && categoryIds.length > 0) {
              return categoryIds.includes(product.categoryId);
            }
            return true;
          })
          .slice(0, maxProducts);

  const displayProducts = tabs
    ? filteredProducts.filter((p) => !activeTab || p.categoryId === activeTab)
    : filteredProducts;

  return (
    <section className="py-12 bg-secondary">
      <div className="container mx-auto px-4">
        <SectionHeading
          title={title}
          viewAllLink={viewAllLink}
          viewAllText={t("viewAll")}
        />

        {/* Tabs */}
        {tabs && (
          <div className="flex flex-wrap gap-2 mb-6">
            <Button
              variant={activeTab === "" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("")}
              className={
                activeTab === "" ? "bg-[#4FAE4E] hover:bg-[#2F7D32]" : ""
              }
            >
              {language === "vi"
                ? "Tất cả"
                : language === "en"
                  ? "All"
                  : "全部"}
            </Button>
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                className={
                  activeTab === tab.id ? "bg-[#4FAE4E] hover:bg-[#2F7D32]" : ""
                }
              >
                {tab.label[language]}
              </Button>
            ))}
          </div>
        )}

        {/* Products grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {displayProducts.length === 0 && (
          <p className="text-center text-muted mt-8">{t("noProducts")}</p>
        )}
      </div>
    </section>
  );
}
