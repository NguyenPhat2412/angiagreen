import Link from "next/link";
import { Crown } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";

interface MembershipHeroSectionProps {
  homeLabel: string;
}

export function MembershipHeroSection({ homeLabel }: MembershipHeroSectionProps) {
  return (
    <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <Breadcrumb
          items={[
            { label: homeLabel, href: "/" },
            { label: "Thanh vien", href: "/thanh-vien" },
          ]}
          className="text-primary-foreground/80 mb-8"
        />
        <div className="max-w-3xl mx-auto text-center">
          <Crown className="w-16 h-16 mx-auto mb-6 text-yellow-300" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Chuong trinh Thanh vien An Gia Green
          </h1>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Tro thanh thanh vien de tan huong hang loat uu dai hap dan va dong hanh
            cung An Gia Green trong hanh trinh cham soc suc khoe
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/dang-ky">Dang ky ngay</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <Link href="/dang-nhap">Da co tai khoan</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
