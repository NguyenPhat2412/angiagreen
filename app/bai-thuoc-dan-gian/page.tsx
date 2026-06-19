"use client";

import { useEffect, useMemo, useState } from "react";
import { BookOpen, Search } from "lucide-react";
import { ArticleCard } from "@/components/ArticleCard";
import { InfoPageShell } from "@/components/pages/shared/InfoPageShell/InfoPageShell";
import {
  localizedText,
  mapContentActions,
  mapContentHighlights,
} from "@/components/pages/shared/contentHelpers";
import { getContentIcon } from "@/components/pages/shared/contentIconMap";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/lib/language-context";
import type { Article, ContentPage } from "@/lib/types";
import { articleServices } from "@/services/articleApi";
import { contentServices } from "@/services/contentApi";

export default function FolkRemediesPage() {
  const { language } = useLanguage();
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState<ContentPage | null>();
  const [search, setSearch] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadPage = async () => {
      try {
        const [nextArticles, nextPage] = await Promise.all([
          articleServices.getAll(),
          contentServices.getPage("marketing.folk-remedies"),
        ]);

        if (isMounted) {
          setArticles(nextArticles);
          setPage(nextPage);
        }
      } catch {
        if (isMounted) {
          setArticles([]);
          setPage(null);
        }
      }
    };

    loadPage();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredArticles = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    const remedyArticles = articles.filter((article) => {
      const category = article.category.toLowerCase();
      const tags = article.tags?.join(" ").toLowerCase() ?? "";
      return category.includes("bai") || category.includes("thuoc") || tags.includes("thao duoc");
    });
    const source = remedyArticles.length > 0 ? remedyArticles : articles;

    if (!normalizedSearch) {
      return source;
    }

    return source.filter((article) =>
      [
        localizedText(article.title, language),
        localizedText(article.excerpt, language),
        article.category,
        ...(article.tags ?? []),
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedSearch),
    );
  }, [articles, language, search]);

  const Icon = page ? getContentIcon(page.icon) : BookOpen;
  const highlights = page ? mapContentHighlights(page.highlights, language) : [];
  const cards = page?.cards ?? [];

  return (
    <InfoPageShell
      badge={page?.badge || "Folk Remedies"}
      breadcrumbs={[
        { label: "Trang chủ", href: "/" },
        { label: "Bài thuốc dân gian" },
      ]}
      description={
        page
          ? localizedText(page.description, language)
          : "Tổng hợp kiến thức thảo dược và bài thuốc dân gian được biên soạn theo hướng dễ đọc, dễ áp dụng và luôn khuyến nghị tham vấn chuyên gia khi cần."
      }
      highlights={[
        { label: highlights[0]?.label || "Bài viết tham khảo", value: `${filteredArticles.length}` },
        ...(highlights.length > 1 ? highlights.slice(1) : [{ label: "Chủ đề sức khỏe", value: "8+" }]),
      ]}
      icon={Icon}
      title={page ? localizedText(page.title, language) : "Bài thuốc dân gian"}
      actions={
        page?.actions?.length
          ? mapContentActions(page.actions, language)
          : [
              { href: "/tu-van", label: "Hỏi chuyên gia" },
              { href: "/tin-tuc", label: "Tin tức sức khỏe", variant: "outline" },
            ]
      }
    >
      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((item) => {
          const CardIcon = getContentIcon(item.icon);
          const title = localizedText(item.title, language);

          return (
            <Card key={title}>
              <CardContent className="p-6">
                <CardIcon className="mb-4 h-10 w-10 text-primary" />
                <h2 className="font-semibold">{title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {localizedText(item.text, language)}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <section className="mt-10">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Thư viện bài viết</h2>
            <p className="mt-2 text-muted-foreground">Tìm theo tên bài viết, công dụng hoặc tag thảo dược.</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Tìm bài thuốc..."
              className="pl-10"
            />
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </InfoPageShell>
  );
}
