import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import type { AboutCopy } from "@/components/pages/gioi-thieu/types";

interface AboutHeroSectionProps {
  aboutLabel: string;
  copy: AboutCopy;
  homeLabel: string;
}

export function AboutHeroSection({ aboutLabel, copy, homeLabel }: AboutHeroSectionProps) {
  return (
    <section className="relative bg-primary/5 py-20">
      <div className="container mx-auto px-4">
        <Breadcrumb
          items={[
            { label: homeLabel, href: "/" },
            { label: aboutLabel, href: "/gioi-thieu" },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center mt-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              {copy.heroTitle}
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {copy.heroDescription}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="/san-pham">
                  {copy.exploreProducts}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/lien-he">{copy.contactConsulting}</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <Image
              src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800"
              alt={copy.teamAlt}
              width={600}
              height={500}
              className="rounded-2xl shadow-xl object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-lg">
              <p className="text-3xl font-bold text-primary">10+</p>
              <p className="text-muted-foreground">{copy.yearsTogether}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
