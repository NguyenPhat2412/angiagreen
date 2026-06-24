"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/language-context";
import { membershipServices } from "@/services/membershipApi";
import { SectionHeading } from "@/components/ui/section-heading";
import { MembershipCard } from "@/components/MembershipCard";
import { membershipPackages as mockMembershipPackages } from "@/language/data";
import type { MembershipPackage } from "@/interface/types";

export function MembershipSection() {
  const { t } = useLanguage();
  const [membershipPackages, setMembershipPackages] = useState<MembershipPackage[]>(mockMembershipPackages);

  useEffect(() => {
    membershipServices.getPackages().then(setMembershipPackages).catch(() => setMembershipPackages(mockMembershipPackages));
  }, []);

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeading
          title={t("membershipPromo")}
          viewAllLink="/goi-thanh-vien"
          viewAllText={t("viewAll")}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {membershipPackages.map((pkg) => (
            <MembershipCard key={pkg.id} package_={pkg} />
          ))}
        </div>
      </div>
    </section>
  );
}
