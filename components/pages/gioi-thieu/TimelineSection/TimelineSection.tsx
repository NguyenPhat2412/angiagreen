import { Card, CardContent } from "@/components/ui/card";
import type { Language } from "@/lib/types";
import type { AboutCopy, AboutMilestone } from "@/components/pages/gioi-thieu/types";

interface TimelineSectionProps {
  copy: AboutCopy;
  language: Language;
  milestones: AboutMilestone[];
}

export function TimelineSection({ copy, language, milestones }: TimelineSectionProps) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{copy.journey}</h2>
          <p className="text-lg text-muted-foreground">
            {copy.journeyDescription}
          </p>
        </div>
        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 w-px h-full bg-border hidden md:block" />
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`flex items-center gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div
                  className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}
                >
                  <Card className="inline-block">
                    <CardContent className="p-6">
                      <p className="text-2xl font-bold text-primary mb-2">
                        {milestone.year}
                      </p>
                      <h3 className="text-lg font-semibold mb-2">{milestone.title[language]}</h3>
                      <p className="text-muted-foreground text-sm">
                        {milestone.description[language]}
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <div className="hidden md:flex w-4 h-4 bg-primary rounded-full relative z-10" />
                <div className="flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
