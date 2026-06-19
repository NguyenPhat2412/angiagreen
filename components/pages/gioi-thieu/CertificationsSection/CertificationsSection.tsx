import { CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { AboutCopy } from "@/components/pages/gioi-thieu/types";

interface CertificationsSectionProps {
  certifications: string[];
  copy: AboutCopy;
}

export function CertificationsSection({ certifications, copy }: CertificationsSectionProps) {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{copy.certificationsTitle}</h2>
          <p className="text-lg text-muted-foreground">
            {copy.certificationsDescription}
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold">{cert}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
