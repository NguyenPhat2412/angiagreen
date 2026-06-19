import Link from "next/link";
import { Button } from "@/components/ui/button";

export function MembershipCtaSection() {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Tham gia ngay hom nay!</h2>
        <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
          Dang ky thanh vien va bat dau tan huong hang loat uu dai hap dan tu An Gia
          Green
        </p>
        <Button size="lg" variant="secondary" asChild>
          <Link href="/dang-ky">Dang ky mien phi</Link>
        </Button>
      </div>
    </section>
  );
}
