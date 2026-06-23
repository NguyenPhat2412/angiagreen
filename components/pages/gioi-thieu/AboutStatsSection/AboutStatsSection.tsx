import type { Language } from "@/interface/types";
import type { AboutStat } from "@/components/pages/gioi-thieu/types";

interface AboutStatsSectionProps {
  language: Language;
  stats: AboutStat[];
}

export function AboutStatsSection({ language, stats }: AboutStatsSectionProps) {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</p>
              <p className="text-primary-foreground/80">{stat.label[language]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
