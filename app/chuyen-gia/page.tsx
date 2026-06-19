"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { doctorServices } from "@/services/doctorApi";
import { DoctorsCtaSection } from "@/components/pages/chuyen-gia/DoctorsCtaSection/DoctorsCtaSection";
import { DoctorsGridSection } from "@/components/pages/chuyen-gia/DoctorsGridSection/DoctorsGridSection";
import { DoctorsHeroSection } from "@/components/pages/chuyen-gia/DoctorsHeroSection/DoctorsHeroSection";
import { ExpertStatsSection } from "@/components/pages/chuyen-gia/ExpertStatsSection/ExpertStatsSection";
import { WhyChooseExpertsSection } from "@/components/pages/chuyen-gia/WhyChooseExpertsSection/WhyChooseExpertsSection";
import type { Doctor } from "@/lib/types";

export default function DoctorsPage() {
  const { language, t } = useLanguage();
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    doctorServices.getAll().then(setDoctors).catch(() => setDoctors([]));
  }, []);

  return (
    <main className="min-h-screen bg-muted/30">
      <DoctorsHeroSection homeLabel={t("home")} />
      <ExpertStatsSection />
      <DoctorsGridSection doctors={doctors} language={language} />
      <WhyChooseExpertsSection />
      <DoctorsCtaSection />
    </main>
  );
}
