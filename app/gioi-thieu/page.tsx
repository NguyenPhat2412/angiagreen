"use client";

import { Award, Leaf, Shield, Users } from "lucide-react";
import { AboutCtaSection } from "@/components/pages/gioi-thieu/AboutCtaSection/AboutCtaSection";
import { AboutHeroSection } from "@/components/pages/gioi-thieu/AboutHeroSection/AboutHeroSection";
import { AboutStatsSection } from "@/components/pages/gioi-thieu/AboutStatsSection/AboutStatsSection";
import { CertificationsSection } from "@/components/pages/gioi-thieu/CertificationsSection/CertificationsSection";
import { CoreValuesSection } from "@/components/pages/gioi-thieu/CoreValuesSection/CoreValuesSection";
import { MissionVisionSection } from "@/components/pages/gioi-thieu/MissionVisionSection/MissionVisionSection";
import { TimelineSection } from "@/components/pages/gioi-thieu/TimelineSection/TimelineSection";
import { useLanguage } from "@/context/language-context";
import type { Language } from "@/interface/types";

const stats: Array<{ value: string; label: Record<Language, string> }> = [
  { value: "10+", label: { vi: "Năm kinh nghiệm", en: "Years of experience", zh: "年经验" } },
  { value: "50+", label: { vi: "Sản phẩm", en: "Products", zh: "产品" } },
  { value: "100K+", label: { vi: "Khách hàng", en: "Customers", zh: "客户" } },
  { value: "20+", label: { vi: "Chuyên gia", en: "Experts", zh: "专家" } },
];

const values = [
  {
    icon: Leaf,
    title: { vi: "Tự nhiên - Sạch", en: "Natural - Clean", zh: "天然 - 纯净" },
    description: {
      vi: "100% nguyên liệu tự nhiên, không hóa chất độc hại, đảm bảo an toàn cho sức khỏe",
      en: "100% natural ingredients, no harmful chemicals, safe for health",
      zh: "100% 天然原料，无有害化学成分，保障健康安全",
    },
  },
  {
    icon: Shield,
    title: { vi: "Chất lượng", en: "Quality", zh: "品质" },
    description: {
      vi: "Quy trình sản xuất hiện đại, kiểm soát chất lượng nghiêm ngặt từ nguyên liệu đến thành phẩm",
      en: "Modern production process with strict quality control from raw materials to finished goods",
      zh: "现代化生产流程，从原料到成品均严格把控质量",
    },
  },
  {
    icon: Users,
    title: { vi: "Đồng hành", en: "Companionship", zh: "同行" },
    description: {
      vi: "Đội ngũ chuyên gia, y sĩ tư vấn tận tâm, đồng hành cùng khách hàng trong hành trình chăm sóc sức khỏe",
      en: "Dedicated experts and practitioners accompanying customers in their health journey",
      zh: "由专业顾问与医师团队陪伴客户走好健康管理之路",
    },
  },
  {
    icon: Award,
    title: { vi: "Uy tín", en: "Trust", zh: "信誉" },
    description: {
      vi: "Được hàng ngàn khách hàng tin tưởng, chứng nhận chất lượng từ các cơ quan uy tín",
      en: "Trusted by thousands of customers and certified by reputable organizations",
      zh: "获得众多客户信赖，并通过权威机构质量认证",
    },
  },
];

const milestones = [
  {
    year: "2014",
    title: { vi: "Thành lập", en: "Founded", zh: "成立" },
    description: {
      vi: "An Gia Green được thành lập với sứ mệnh mang dược liệu sạch đến mọi nhà",
      en: "An Gia Green was founded with the mission of bringing clean herbal products to every home",
      zh: "An Gia Green 成立，使命是把洁净草本产品带到每个家庭",
    },
  },
  {
    year: "2016",
    title: { vi: "Mở rộng vùng nguyên liệu", en: "Expanded source regions", zh: "扩大原料基地" },
    description: {
      vi: "Hợp tác với các vùng trồng dược liệu sạch tại Lâm Đồng, Kon Tum",
      en: "Partnered with clean herb-growing regions in Lam Dong and Kon Tum",
      zh: "与林同、昆嵩等洁净草本种植区建立合作",
    },
  },
  {
    year: "2018",
    title: { vi: "Nhà máy đạt chuẩn GMP", en: "GMP facility", zh: "GMP 标准工厂" },
    description: {
      vi: "Khánh thành nhà máy sản xuất đạt chuẩn GMP-WHO",
      en: "Opened a GMP-WHO certified manufacturing facility",
      zh: "投产符合 GMP-WHO 标准的生产工厂",
    },
  },
  {
    year: "2020",
    title: { vi: "Ra mắt hệ thống trực tuyến", en: "Online platform launch", zh: "上线数字平台" },
    description: {
      vi: "Ứng dụng công nghệ số hóa trong bán hàng và tư vấn",
      en: "Applied digital technology to commerce and consultation services",
      zh: "将数字化技术应用于销售与咨询服务",
    },
  },
  {
    year: "2022",
    title: { vi: "50+ sản phẩm", en: "50+ products", zh: "50+ 产品" },
    description: {
      vi: "Phát triển thành công hơn 50 sản phẩm từ dược liệu sạch",
      en: "Successfully developed more than 50 clean-herb products",
      zh: "成功开发 50 多款洁净草本产品",
    },
  },
  {
    year: "2024",
    title: { vi: "100.000 khách hàng", en: "100,000 customers", zh: "100,000 客户" },
    description: {
      vi: "Cán mốc 100.000 khách hàng tin dùng trên toàn quốc",
      en: "Reached 100,000 trusted customers nationwide",
      zh: "全国信赖客户突破 100,000 人",
    },
  },
];

const certifications: Record<Language, string[]> = {
  vi: [
    "Chứng nhận GMP-WHO",
    "Chứng nhận ISO 9001:2015",
    "Chứng nhận HACCP",
    "Chứng nhận VietGAP",
  ],
  en: [
    "GMP-WHO Certification",
    "ISO 9001:2015 Certification",
    "HACCP Certification",
    "VietGAP Certification",
  ],
  zh: [
    "GMP-WHO 认证",
    "ISO 9001:2015 认证",
    "HACCP 认证",
    "VietGAP 认证",
  ],
};

const aboutCopy = {
  vi: {
    heroTitle: "AN GIA GREEN - Hệ sinh thái chăm sóc sức khỏe từ thiên nhiên",
    heroDescription:
      "Với sứ mệnh mang đến nguồn dược liệu sạch, an toàn cho mọi gia đình Việt, AN GIA GREEN không ngừng nỗ lực để xây dựng một hệ sinh thái chăm sóc sức khỏe toàn diện, kết hợp tinh hoa y học cổ truyền với công nghệ hiện đại.",
    exploreProducts: "Khám phá sản phẩm",
    contactConsulting: "Liên hệ tư vấn",
    yearsTogether: "Năm đồng hành",
    mission: "Sứ mệnh",
    missionDescription:
      "Mang đến nguồn dược liệu sạch, an toàn cho mọi gia đình Việt Nam. Chúng tôi cam kết đồng hành cùng bạn trong hành trình chăm sóc sức khỏe chủ động, từ phòng bệnh đến chăm sóc cơ thể bằng các sản phẩm tự nhiên, phù hợp.",
    vision: "Tầm nhìn",
    visionDescription:
      "Trở thành thương hiệu dược liệu sạch hàng đầu Việt Nam, xây dựng hệ sinh thái chăm sóc sức khỏe toàn diện, kết hợp y học cổ truyền và công nghệ hiện đại, phục vụ hàng triệu gia đình Việt.",
    coreValues: "Giá trị cốt lõi",
    coreValuesDescription: "Những giá trị định hướng mọi hoạt động của An Gia Green",
    journey: "Hành trình phát triển",
    journeyDescription: "Các cột mốc quan trọng trong sự phát triển của An Gia Green",
    certificationsTitle: "Chứng nhận chất lượng",
    certificationsDescription: "An Gia Green tự hào đạt được các chứng nhận chất lượng uy tín",
    ctaTitle: "Sẵn sàng đồng hành cùng bạn",
    ctaDescription:
      "Hãy để An Gia Green giúp bạn chăm sóc sức khỏe bản thân và gia đình bằng nguồn dược liệu sạch, an toàn.",
    bookConsultation: "Đặt lịch tư vấn",
    teamAlt: "Đội ngũ An Gia Green",
  },
  en: {
    heroTitle: "AN GIA GREEN - A natural health-care ecosystem",
    heroDescription:
      "With the mission of bringing clean and safe herbal ingredients to Vietnamese families, AN GIA GREEN continuously builds a comprehensive health-care ecosystem that blends traditional medicine values with modern technology.",
    exploreProducts: "Explore products",
    contactConsulting: "Contact for consultation",
    yearsTogether: "Years together",
    mission: "Mission",
    missionDescription:
      "Bring clean and safe herbal ingredients to every Vietnamese family. We are committed to accompanying you on a proactive health-care journey through natural and suitable products.",
    vision: "Vision",
    visionDescription:
      "Become a leading clean-herb brand in Vietnam, building a comprehensive health ecosystem that combines traditional medicine and modern technology for millions of families.",
    coreValues: "Core values",
    coreValuesDescription: "The values that guide every activity of An Gia Green",
    journey: "Growth journey",
    journeyDescription: "Important milestones in the development of An Gia Green",
    certificationsTitle: "Quality certifications",
    certificationsDescription: "An Gia Green is proud to achieve reputable quality certifications",
    ctaTitle: "Ready to accompany you",
    ctaDescription:
      "Let An Gia Green support you and your family with safe, clean herbal ingredients.",
    bookConsultation: "Book consultation",
    teamAlt: "An Gia Green team",
  },
  zh: {
    heroTitle: "AN GIA GREEN - 来自自然的健康护理生态系统",
    heroDescription:
      "AN GIA GREEN 致力于为越南家庭带来洁净、安全的草本原料，并持续建设一个融合传统医学价值与现代技术的全方位健康护理生态系统。",
    exploreProducts: "探索产品",
    contactConsulting: "联系咨询",
    yearsTogether: "同行年份",
    mission: "使命",
    missionDescription:
      "把洁净、安全的草本原料带给每一个越南家庭。我们承诺通过自然且合适的产品，陪伴您进行主动健康管理。",
    vision: "愿景",
    visionDescription:
      "成为越南领先的洁净草本品牌，打造融合传统医学与现代科技的综合健康生态系统，服务数百万家庭。",
    coreValues: "核心价值",
    coreValuesDescription: "指引 An Gia Green 一切行动的核心价值",
    journey: "发展历程",
    journeyDescription: "An Gia Green 发展过程中的重要里程碑",
    certificationsTitle: "质量认证",
    certificationsDescription: "An Gia Green 以获得多项权威质量认证为荣",
    ctaTitle: "准备与您同行",
    ctaDescription: "让 An Gia Green 用洁净、安全的草本原料守护您和家人的健康。",
    bookConsultation: "预约咨询",
    teamAlt: "An Gia Green 团队",
  },
};

export default function AboutPage() {
  const { language, t } = useLanguage();
  const copy = aboutCopy[language];

  return (
    <main className="min-h-screen">
      <AboutHeroSection aboutLabel={t("about")} copy={copy} homeLabel={t("home")} />
      <AboutStatsSection language={language} stats={stats} />
      <MissionVisionSection copy={copy} />
      <CoreValuesSection copy={copy} language={language} values={values} />
      <TimelineSection copy={copy} language={language} milestones={milestones} />
      <CertificationsSection certifications={certifications[language]} copy={copy} />
      <AboutCtaSection copy={copy} />
    </main>
  );
}
