import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { AboutCopy } from "@/components/pages/gioi-thieu/types";

interface AboutCtaSectionProps {
  copy: AboutCopy;
}

export function AboutCtaSection({ copy }: AboutCtaSectionProps) {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {copy.ctaTitle}
        </h2>
        <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
          {copy.ctaDescription}
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button size="lg" variant="secondary" asChild>
            <Link href="/san-pham">{copy.exploreProducts}</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            asChild
          >
            <Link href="/tu-van">{copy.bookConsultation}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
