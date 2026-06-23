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
import { useLanguage } from "@/context/language-context";
import type { Article, ContentPage } from "@/interface/types";
import { articleServices } from "@/services/articleApi";
import { contentServices } from "@/services/contentApi";

export default function FolkRemediesPage() {
  const { language, t } = useLanguage();
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
      imageUrl={page?.imageUrl}
      breadcrumbs={[
        { label: t("home"), href: "/" },
        { label: t("folkRemedies") },
      ]}
      description={
        page
          ? localizedText(page.description, language)
          : language === "en"
          ? "Compilation of herbal knowledge and folk remedies compiled to be easy to read, easy to apply, and always recommended to consult experts when needed."
          : language === "zh"
          ? "汇编草药知识和民间药方，易于阅读、易于应用，并始终建议在需要时咨询专家。"
          : "Tổng hợp kiến thức thảo dược và bài thuốc dân gian được biên soạn theo hướng dễ đọc, dễ áp dụng và luôn khuyến nghị tham vấn chuyên gia khi cần."
      }
      highlights={[
        { label: highlights[0]?.label || t("referenceArticles"), value: `${filteredArticles.length}` },
        ...(highlights.length > 1 ? highlights.slice(1) : [{ label: t("healthTopics"), value: "8+" }]),
      ]}
      icon={Icon}
      title={page ? localizedText(page.title, language) : t("folkRemedies")}
      actions={
        page?.actions?.length
          ? mapContentActions(page.actions, language)
          : [
              { href: "/tu-van", label: language === "en" ? "Ask Expert" : language === "zh" ? "咨询专家" : "Hỏi chuyên gia" },
              { href: "/tin-tuc", label: language === "en" ? "Health News" : language === "zh" ? "健康新闻" : "Tin tức sức khỏe", variant: "outline" },
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
            <h2 className="text-2xl font-bold">{t("articleLibrary")}</h2>
            <p className="mt-2 text-muted-foreground">{t("articleLibrarySub")}</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t("searchRemedy")}
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
