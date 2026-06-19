import Image from "next/image";
import Link from "next/link";
import { Phone, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Doctor, Language } from "@/lib/types";

interface DoctorsGridSectionProps {
  doctors: Doctor[];
  language: Language;
}

export function DoctorsGridSection({ doctors, language }: DoctorsGridSectionProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {doctors.map((doctor) => (
            <Card key={doctor.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="relative h-64">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-semibold text-white">{doctor.name}</h3>
                  <p className="text-white/80 text-sm">{doctor.specialty[language]}</p>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(doctor.rating ?? 0)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{doctor.rating ?? "N/A"}</span>
                  <span className="text-sm text-muted-foreground">
                    ({doctor.experience}+ nam kinh nghiem)
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {doctor.title[language]} - {doctor.specialty[language]}
                </p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {[doctor.specialty[language], ...doctor.consultationType].slice(0, 3).map((exp, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {exp === "online" ? "Online" : exp === "offline" ? "Tai phong kham" : exp}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1" asChild>
                    <Link href="/tu-van">Dat lich tu van</Link>
                  </Button>
                  <Button size="sm" variant="outline">
                    <Phone className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
