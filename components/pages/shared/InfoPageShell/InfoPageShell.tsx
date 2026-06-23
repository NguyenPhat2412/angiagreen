"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface InfoPageShellProps {
  actions?: Array<{
    href: string;
    label: string;
    variant?: "default" | "outline" | "secondary";
  }>;
  badge?: string;
  breadcrumbs: Array<{ label: string; href?: string }>;
  children: ReactNode;
  description: string;
  highlights?: Array<{ label: string; value: string }>;
  icon?: LucideIcon;
  title: string;
  imageUrl?: string;
}

export function InfoPageShell({
  actions = [],
  badge,
  breadcrumbs,
  children,
  description,
  highlights = [],
  icon: Icon,
  title,
  imageUrl,
}: InfoPageShellProps) {
  return (
    <main className="min-h-screen bg-muted/30">
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-14">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbs} />
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-center">
            <div className="max-w-3xl">
              {badge && (
                <span className="mb-4 inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  {badge}
                </span>
              )}
              <h1 className="text-3xl font-bold tracking-tight md:text-5xl">{title}</h1>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {description}
              </p>
              {actions.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-3">
                  {actions.map((action) => (
                    <Button key={action.href + action.label} variant={action.variant} asChild>
                      <Link href={action.href}>
                        {action.label}
                        {action.variant !== "outline" && <ArrowRight className="ml-2 h-4 w-4" />}
                      </Link>
                    </Button>
                  ))}
                </div>
              )}
            </div>

            <Card className="border-primary/10 bg-card/90 shadow-sm">
              <CardContent className="p-6">
                {Icon && (
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                )}
                <div className="grid gap-4">
                  {highlights.map((item) => (
                    <div key={item.label} className="rounded-lg border bg-background p-4">
                      <p className="text-2xl font-bold text-primary">{item.value}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{item.label}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10">
        {imageUrl && (
          <div className="relative w-full h-[240px] sm:h-[320px] md:h-[380px] rounded-2xl overflow-hidden mb-8 shadow-md border border-primary/10">
            <img src={imageUrl} alt={title} className="object-cover w-full h-full" />
          </div>
        )}
        {children}
      </div>
    </main>
  );
}
