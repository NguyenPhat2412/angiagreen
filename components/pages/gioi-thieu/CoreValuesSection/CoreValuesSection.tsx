import { Card, CardContent } from "@/components/ui/card";
import type { Language } from "@/interface/types";
import type { AboutCopy, AboutValue } from "@/components/pages/gioi-thieu/types";

interface CoreValuesSectionProps {
  copy: AboutCopy;
  language: Language;
  values: AboutValue[];
}

export function CoreValuesSection({ copy, language, values }: CoreValuesSectionProps) {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{copy.coreValues}</h2>
          <p className="text-lg text-muted-foreground">
            {copy.coreValuesDescription}
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title[language]}</h3>
                <p className="text-muted-foreground text-sm">{value.description[language]}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
