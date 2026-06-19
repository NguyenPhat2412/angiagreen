import Breadcrumb from "@/components/Breadcrumb";

interface DoctorsHeroSectionProps {
  homeLabel: string;
}

export function DoctorsHeroSection({ homeLabel }: DoctorsHeroSectionProps) {
  return (
    <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-16">
      <div className="container mx-auto px-4">
        <Breadcrumb
          items={[
            { label: homeLabel, href: "/" },
            { label: "Chuyen gia", href: "/chuyen-gia" },
          ]}
        />
        <div className="mt-6 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Doi ngu chuyen gia y te
          </h1>
          <p className="text-lg text-muted-foreground">
            Gap go doi ngu y si, duoc si giau kinh nghiem, san sang tu van va dong
            hanh cung ban trong hanh trinh cham soc suc khoe
          </p>
        </div>
      </div>
    </section>
  );
}
