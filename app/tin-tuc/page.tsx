"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowRight, Search, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/language-context";
import { articleServices } from "@/services/articleApi";
import Breadcrumb from "@/components/Breadcrumb";
import type { Article } from "@/interface/types";

const categories = [
  { id: "all", label: { vi: "Tất cả", en: "All", zh: "全部" }, count: 24 },
  { id: "suc-khoe", label: { vi: "Sức khỏe", en: "Health", zh: "健康" }, count: 12 },
  { id: "dinh-duong", label: { vi: "Dinh dưỡng", en: "Nutrition", zh: "营养" }, count: 8 },
  { id: "lam-dep", label: { vi: "Làm đẹp", en: "Beauty", zh: "美容" }, count: 4 },
  { id: "khuyen-mai", label: { vi: "Khuyến mãi", en: "Promotion", zh: "促销" }, count: 6 },
];

const tags = [
  { id: "thao-duoc", label: { vi: "Thảo dược", en: "Herbs", zh: "草药" } },
  { id: "giac-ngu", label: { vi: "Giấc ngủ", en: "Sleep", zh: "睡眠" } },
  { id: "tim-mach", label: { vi: "Tim mạch", en: "Cardiovascular", zh: "心血管" } },
  { id: "de-khang", label: { vi: "Tăng đề kháng", en: "Immunity", zh: "免疫力" } },
  { id: "giam-can", label: { vi: "Giảm cân", en: "Weight Loss", zh: "减肥" } },
  { id: "da-lieu", label: { vi: "Da liễu", en: "Dermatology", zh: "皮肤科" } },
  { id: "xuong-khop", label: { vi: "Xương khớp", en: "Bones & Joints", zh: "骨骼与关节" } },
  { id: "tieu-hoa", label: { vi: "Tiêu hóa", en: "Digestive", zh: "消化" } },
];

export default function NewsPage() {
  const { language, t } = useLanguage();
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    articleServices.getAll().then(setArticles).catch(() => setArticles([]));
  }, []);

  const featuredArticle = articles[0];
  const recentArticles = articles.slice(1);

  if (!featuredArticle) {
    return <main className="min-h-screen bg-muted/30" />;
  }

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: t("home"), href: "/" },
            { label: t("news"), href: "/tin-tuc" },
          ]}
        />

        <div className="mt-6 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{t("newsTitle")}</h1>
          <p className="text-muted-foreground">
            {t("newsSubtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Article */}
            <Card className="overflow-hidden mb-8">
              <div className="grid md:grid-cols-2">
                <div className="relative h-64 md:h-auto">
                  <Image
                    src={featuredArticle.image}
                    alt={featuredArticle.title[language]}
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-primary">{t("featured")}</Badge>
                </div>
                <CardContent className="p-6 flex flex-col justify-center">
                  <Badge variant="outline" className="w-fit mb-3">
                    {featuredArticle.category}
                  </Badge>
                  <h2 className="text-2xl font-bold mb-3 hover:text-primary transition-colors">
                    <Link href={`/tin-tuc/${featuredArticle.slug}`}>
                      {featuredArticle.title[language]}
                    </Link>
                  </h2>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {featuredArticle.excerpt[language]}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {featuredArticle.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(featuredArticle.publishedAt).toLocaleDateString("vi-VN")}
                    </div>
                  </div>
                  <Button asChild className="w-fit">
                    <Link href={`/tin-tuc/${featuredArticle.slug}`}>
                      {t("readMore")}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </div>
            </Card>

            {/* Article Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {recentArticles.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={article.image}
                      alt={article.title[language]}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-5">
                    <Badge variant="outline" className="mb-3">
                      {article.category}
                    </Badge>
                    <h3 className="font-semibold mb-2 line-clamp-2 hover:text-primary transition-colors">
                      <Link href={`/tin-tuc/${article.slug}`}>{article.title[language]}</Link>
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {article.excerpt[language]}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(article.publishedAt).toLocaleDateString("vi-VN")}
                      </div>
                      <span>5 {t("minRead")}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-8">
              <Button variant="outline" disabled>
                {t("prev")}
              </Button>
              <Button variant="outline" className="bg-primary text-primary-foreground">
                1
              </Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">{t("next")}</Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <Card>
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder={t("searchArticle")} className="pl-10" />
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  {t("categoryTitle")}
                </h3>
                <div className="space-y-2">
                  {categories.map((cat, index) => (
                    <Link
                      key={index}
                      href={`/tin-tuc?category=${cat.id}`}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors"
                    >
                      <span>{cat.label[language]}</span>
                      <Badge variant="secondary">{cat.count}</Badge>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">{t("popularTags")}</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {tag.label[language]}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Newsletter */}
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{t("newsSubscribeTitle")}</h3>
                <p className="text-sm text-primary-foreground/80 mb-4">
                  {t("newsSubscribeDesc")}
                </p>
                <Input
                  placeholder={t("yourEmail")}
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 mb-3"
                />
                <Button variant="secondary" className="w-full">
                  {t("subscribeButton")}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
