import type { LucideIcon } from "lucide-react";
import type { Language } from "@/interface/types";

export interface AboutCopy {
  heroTitle: string;
  heroDescription: string;
  exploreProducts: string;
  contactConsulting: string;
  yearsTogether: string;
  mission: string;
  missionDescription: string;
  vision: string;
  visionDescription: string;
  coreValues: string;
  coreValuesDescription: string;
  journey: string;
  journeyDescription: string;
  certificationsTitle: string;
  certificationsDescription: string;
  ctaTitle: string;
  ctaDescription: string;
  bookConsultation: string;
  teamAlt: string;
}

export interface AboutStat {
  value: string;
  label: Record<Language, string>;
}

export interface AboutValue {
  icon: LucideIcon;
  title: Record<Language, string>;
  description: Record<Language, string>;
}

export interface AboutMilestone {
  year: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
}
