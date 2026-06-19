import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { MembershipLevel } from "@/lib/types";

const levelColors: Record<MembershipLevel["level"], string> = {
  member: "from-zinc-400 to-zinc-600",
  silver: "from-slate-300 to-slate-500",
  gold: "from-yellow-400 to-yellow-600",
  platinum: "from-purple-400 to-purple-600",
  diamond: "from-cyan-300 to-cyan-500",
};

const levelNames: Record<MembershipLevel["level"], string> = {
  member: "Thanh vien",
  silver: "Bac",
  gold: "Vang",
  platinum: "Bach kim",
  diamond: "Kim cuong",
};

interface MembershipLevelsSectionProps {
  membershipLevels: MembershipLevel[];
}

export function MembershipLevelsSection({ membershipLevels }: MembershipLevelsSectionProps) {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Cac cap bac thanh vien</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Mua sam cang nhieu, uu dai cang lon. Nang cap hang thanh vien de nhan nhieu
          quyen loi hon
        </p>
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          {membershipLevels.map((level) => (
            <Card
              key={level.id}
              className={`relative overflow-hidden ${
                level.level === "gold" ? "ring-2 ring-primary scale-105" : ""
              }`}
            >
              {level.level === "gold" && (
                <Badge className="absolute top-3 right-3 bg-primary">Pho bien</Badge>
              )}
              <CardHeader className="pb-2">
                <div
                  className={`w-full h-2 rounded-full bg-gradient-to-r ${
                    levelColors[level.level]
                  } mb-4`}
                />
                <CardTitle className="text-center">
                  <span className="text-lg">{levelNames[level.level]}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  {level.minSpent > 0
                    ? `Tu ${(level.minSpent / 1000000).toFixed(0)} trieu`
                    : "Moi thanh vien"}
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>Giam {level.discount}% don hang</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>x{level.pointMultiplier} diem thuong</span>
                  </div>
                  {level.freeShipping && (
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Mien phi ship</span>
                    </div>
                  )}
                  {level.prioritySupport && (
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Tu van uu tien</span>
                    </div>
                  )}
                  {level.exclusiveOffers && (
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Uu dai doc quyen</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
