"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/lib/language-context";
import { articleServices } from "@/services/articleApi";
import type { Article } from "@/lib/types";

export default function ArticleDetailPage() {
  const params = useParams();
  const { language } = useLanguage();
  const [article, setArticle] = useState<Article | null>();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  useEffect(() => {
    if (!slug) {
      return;
    }

    articleServices.getBySlug(slug).then(setArticle).catch(() => setArticle(null));
  }, [slug]);

  if (article === undefined) {
    return <main className="min-h-screen bg-muted/30" />;
  }

  if (!article) {
    return (
      <main className="min-h-screen bg-muted/30">
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-muted-foreground">Khong tim thay bai viet.</p>
          <Button className="mt-4" asChild>
            <Link href="/tin-tuc">Quay lai tin tuc</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: "Tin tuc", href: "/tin-tuc" },
            { label: article.title[language] },
          ]}
        />

        <article className="mx-auto mt-8 max-w-4xl">
          <Card className="overflow-hidden">
            <div className="relative h-72 md:h-[420px]">
              <Image
                src={article.image}
                alt={article.title[language]}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 900px"
                priority
              />
            </div>
            <CardContent className="p-6 md:p-8">
              <Badge variant="outline">{article.category}</Badge>
              <h1 className="mt-4 text-3xl font-bold md:text-4xl">{article.title[language]}</h1>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                {article.author && (
                  <span className="inline-flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {article.author}
                  </span>
                )}
                <span className="inline-flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(article.publishedAt).toLocaleDateString("vi-VN")}
                </span>
              </div>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                {article.excerpt[language]}
              </p>
              <div className="mt-8 whitespace-pre-line leading-8 text-foreground">
                {article.content?.[language] || article.excerpt[language]}
              </div>
            </CardContent>
          </Card>
        </article>
      </div>
    </main>
  );
}
