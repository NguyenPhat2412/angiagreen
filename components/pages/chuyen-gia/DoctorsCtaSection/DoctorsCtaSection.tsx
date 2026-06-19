import Link from "next/link";
import { Button } from "@/components/ui/button";

export function DoctorsCtaSection() {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ban can tu van?</h2>
        <p className="text-xl text-primary-foreground/80 mb-8">
          Dat lich ngay de duoc chuyen gia tu van mien phi
        </p>
        <Button size="lg" variant="secondary" asChild>
          <Link href="/tu-van">Dat lich tu van</Link>
        </Button>
      </div>
    </section>
  );
}
