import { Heart, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { AboutCopy } from "@/components/pages/gioi-thieu/types";

interface MissionVisionSectionProps {
  copy: AboutCopy;
}

export function MissionVisionSection({ copy }: MissionVisionSectionProps) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          <Card className="bg-primary/5 border-none">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">{copy.mission}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {copy.missionDescription}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-accent/5 border-none">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-2xl font-bold mb-4">{copy.vision}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {copy.visionDescription}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
