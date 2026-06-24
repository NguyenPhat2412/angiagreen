import { api } from "@/lib/apiClient";
import type { Language } from "@/interface/types";

export type NewsletterEmail = {
  body: string;
  createdAt: string;
  id: string;
  subject: string;
  to: string;
};

export type NewsletterSubscribeResponse = {
  email: string;
  message: Record<Language, string>;
  mockEmail: NewsletterEmail;
  ok: boolean;
};

const MOCK_STORAGE_KEY = "angiagreen_mock_newsletter_emails";

const welcomeSubject: Record<Language, string> = {
  vi: "AN GIA GREEN - Cẩm nang sức khỏe thảo dược",
  en: "AN GIA GREEN - Herbal health handbook",
  zh: "AN GIA GREEN - 草本健康指南",
};

const welcomeBody: Record<Language, string> = {
  vi: "Cảm ơn bạn đã đăng ký nhận tin AN GIA GREEN. Đây là email mock gửi cẩm nang chăm sóc sức khỏe, mã ưu đãi AGGREEN10 và các bài viết mới nhất.",
  en: "Thank you for subscribing to AN GIA GREEN. This mock email sends your health handbook, AGGREEN10 offer code, and latest articles.",
  zh: "感谢您订阅 AN GIA GREEN。此模拟邮件将发送健康指南、AGGREEN10 优惠码和最新文章。",
};

const successMessage: Record<Language, string> = {
  vi: "Đã gửi email chăm sóc sức khỏe tới hộp thư của bạn.",
  en: "We sent the health newsletter to your inbox.",
  zh: "我们已将健康资讯发送到您的邮箱。",
};

const saveMockEmail = (email: NewsletterEmail) => {
  if (typeof window === "undefined") {
    return;
  }

  const current = JSON.parse(localStorage.getItem(MOCK_STORAGE_KEY) || "[]") as NewsletterEmail[];
  localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify([email, ...current].slice(0, 50)));
};

const createMockEmail = (email: string, language: Language): NewsletterEmail => ({
  body: welcomeBody[language],
  createdAt: new Date().toISOString(),
  id: `newsletter-${Date.now()}`,
  subject: welcomeSubject[language],
  to: email,
});

export const newsletterServices = {
  subscribe: async (email: string, language: Language): Promise<NewsletterSubscribeResponse> => {
    const normalizedEmail = email.trim().toLowerCase();

    try {
      return await api.post<NewsletterSubscribeResponse>("/newsletter/subscribe", {
        email: normalizedEmail,
        language,
      });
    } catch {
      const mockEmail = createMockEmail(normalizedEmail, language);
      saveMockEmail(mockEmail);

      return {
        email: normalizedEmail,
        message: successMessage,
        mockEmail,
        ok: true,
      };
    }
  },
};
