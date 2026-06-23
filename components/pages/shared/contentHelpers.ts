import type { ContentAction, ContentHighlight, Language } from "@/interface/types";

type LocalizedValue = Partial<Record<Language, string>> | undefined;

// Chon ngon ngu hien tai, fallback ve tieng Viet de UI luon co noi dung.
export const localizedText = (value: LocalizedValue, language: Language) =>
  value?.[language] || value?.vi || "";

export const mapContentHighlights = (
  highlights: ContentHighlight[] | undefined,
  language: Language
) =>
  (highlights ?? []).map((item) => ({
    label: localizedText(item.label, language),
    value: item.value,
  }));

export const mapContentActions = (actions: ContentAction[] | undefined, language: Language) =>
  (actions ?? []).map((action) => ({
    href: action.href,
    label: localizedText(action.label, language),
    variant: action.variant,
  }));
