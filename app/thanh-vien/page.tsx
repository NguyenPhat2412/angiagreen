"use client";

import { useEffect, useState } from "react";
import { HowItWorksSection } from "@/components/pages/thanh-vien/HowItWorksSection/HowItWorksSection";
import { MemberBenefitsSection } from "@/components/pages/thanh-vien/MemberBenefitsSection/MemberBenefitsSection";
import { MembershipCtaSection } from "@/components/pages/thanh-vien/MembershipCtaSection/MembershipCtaSection";
import { MembershipFaqSection } from "@/components/pages/thanh-vien/MembershipFaqSection/MembershipFaqSection";
import { MembershipHeroSection } from "@/components/pages/thanh-vien/MembershipHeroSection/MembershipHeroSection";
import { MembershipLevelsSection } from "@/components/pages/thanh-vien/MembershipLevelsSection/MembershipLevelsSection";
import { useLanguage } from "@/context/language-context";
import { membershipServices } from "@/services/membershipApi";
import type { MembershipLevel } from "@/interface/types";

export default function MembershipPage() {
  const { t } = useLanguage();
  const [membershipLevels, setMembershipLevels] = useState<MembershipLevel[]>([]);

  useEffect(() => {
    membershipServices.getLevels().then(setMembershipLevels).catch(() => setMembershipLevels([]));
  }, []);

  return (
    <main className="min-h-screen bg-muted/30">
      <MembershipHeroSection homeLabel={t("home")} />
      <MemberBenefitsSection />
      <MembershipLevelsSection membershipLevels={membershipLevels} />
      <HowItWorksSection />
      <MembershipFaqSection />
      <MembershipCtaSection />
    </main>
  );
}
