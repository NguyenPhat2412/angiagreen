import { ContentPage } from "@/interface/types";

export const mockPageContents: Record<string, ContentPage> = {
  "marketing.membership-packages": {
    key: "marketing.membership-packages",
    group: "marketing",
    badge: "Membership Combo",
    icon: "Crown",
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=400&fit=crop",
    title: {
      vi: "Combo thành viên An Gia Green",
      en: "An Gia Green Membership Combo",
      zh: "安家绿色会员套餐",
    },
    description: {
      vi: "Lựa chọn gói chăm sóc sức khỏe theo nhu cầu, kết hợp sản phẩm thảo dược, ưu đãi mua sắm và tư vấn định kỳ.",
      en: "Choose a health care package based on your needs, combining herbal products, shopping discounts, and periodic consultations.",
      zh: "根据您的需求选择健康护理套餐，结合草药产品、购物优惠和定期咨询。",
    },
    highlights: [
      {
        label: {
          vi: "Gói linh hoạt",
          en: "Flexible Packages",
          zh: "灵活套餐",
        },
        value: "4+",
      },
      {
        label: {
          vi: "Ưu đãi tối đa",
          en: "Max Discount",
          zh: "最大优惠",
        },
        value: "15%",
      },
    ],
    actions: [
      {
        href: "/thanh-vien",
        label: {
          vi: "Xem cấp bậc",
          en: "View Levels",
          zh: "查看等级",
        },
        variant: "outline",
      },
      {
        href: "/tu-van",
        label: {
          vi: "Cần tư vấn",
          en: "Need Advice",
          zh: "需要咨询",
        },
      },
    ],
    cards: [
      {
        title: {
          vi: "Chăm sóc chủ động",
          en: "Proactive Care",
          zh: "主动护理",
        },
        text: {
          vi: "Định kỳ theo dõi sức khỏe cùng đội ngũ y sĩ có chuyên môn.",
          en: "Periodic health tracking with qualified medical professionals.",
          zh: "与合格的医疗专业人员定期进行健康跟踪。",
        },
        icon: "Crown",
      },
      {
        title: {
          vi: "Dược liệu sạch",
          en: "Clean Herbs",
          zh: "清洁草药",
        },
        text: {
          vi: "Kết hợp các sản phẩm thảo dược, trà, thực phẩm bảo vệ sức khỏe đạt chuẩn.",
          en: "Combining standard herbal products, teas, and health foods.",
          zh: "结合标准草药产品、茶和健康食品。",
        },
        icon: "Coffee",
      },
      {
        title: {
          vi: "Ưu đãi độc quyền",
          en: "Exclusive Deals",
          zh: "独家优惠",
        },
        text: {
          vi: "Giảm giá mua sắm trực tiếp và miễn phí vận chuyển cho hội viên.",
          en: "Direct shopping discounts and free shipping for members.",
          zh: "会员可享受直接购物折扣和免费送货。",
        },
        icon: "Package",
      },
    ],
  },
  "marketing.folk-remedies": {
    key: "marketing.folk-remedies",
    group: "marketing",
    badge: "Folk Remedies",
    icon: "BookOpen",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=400&fit=crop",
    title: {
      vi: "Bài thuốc dân gian",
      en: "Folk Remedies",
      zh: "民间药方",
    },
    description: {
      vi: "Tổng hợp kiến thức thảo dược và bài thuốc dân gian được biên soạn theo hướng dễ đọc, dễ áp dụng và luôn khuyến nghị tham vấn chuyên gia khi cần.",
      en: "Compilation of herbal knowledge and folk remedies compiled to be easy to read, easy to apply, and always recommended to consult experts when needed.",
      zh: "汇编草药知识和民间药方，易于阅读、易于应用，并始终建议在需要时咨询专家。",
    },
    highlights: [
      {
        label: {
          vi: "Bài viết tham khảo",
          en: "Articles",
          zh: "参考文章",
        },
        value: "12+",
      },
      {
        label: {
          vi: "Chủ đề sức khỏe",
          en: "Health Topics",
          zh: "健康主题",
        },
        value: "8+",
      },
    ],
    actions: [
      {
        href: "/tu-van",
        label: {
          vi: "Hỏi chuyên gia",
          en: "Ask Expert",
          zh: "咨询专家",
        },
      },
      {
        href: "/tin-tuc",
        label: {
          vi: "Tin tức sức khỏe",
          en: "Health News",
          zh: "健康新闻",
        },
        variant: "outline",
      },
    ],
    cards: [
      {
        title: {
          vi: "Thảo dược tự nhiên",
          en: "Natural Herbs",
          zh: "天然草药",
        },
        text: {
          vi: "Sử dụng nguồn dược liệu thiên nhiên lành tính và có xuất xứ rõ ràng.",
          en: "Using benign natural herbs with clear origins.",
          zh: "使用来源明确且温和的天然草药。",
        },
        icon: "Leaf",
      },
      {
        title: {
          vi: "Bảo tồn giá trị cổ truyền",
          en: "Preserving Traditions",
          zh: "传承传统价值",
        },
        text: {
          vi: "Ghi chép và kế thừa các bài thuốc cổ truyền có giá trị lịch sử cao.",
          en: "Recording and inheriting traditional remedies with high historical value.",
          zh: "记录和继承具有高历史价值的传统药方。",
        },
        icon: "BookOpen",
      },
      {
        title: {
          vi: "Tham vấn an toàn",
          en: "Safe Consultation",
          zh: "安全咨询",
        },
        text: {
          vi: "Khuyên dùng an toàn, luôn tham khảo ý kiến y sĩ trước khi áp dụng.",
          en: "Always consult with qualified medical professionals before application.",
          zh: "建议安全使用，在使用前务必咨询医师意见。",
        },
        icon: "ShieldCheck",
      },
    ],
  },
  "marketing.medical-consultants": {
    key: "marketing.medical-consultants",
    group: "marketing",
    badge: "Medical Consultation",
    icon: "Stethoscope",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=400&fit=crop",
    title: {
      vi: "Tư vấn cùng y sĩ",
      en: "Consult with Doctor",
      zh: "咨询医师",
    },
    description: {
      vi: "Kết nối với đội ngũ y sĩ, dược sĩ và chuyên gia chăm sóc sức khỏe để được hướng dẫn dùng sản phẩm và đặt lịch tư vấn phù hợp.",
      en: "Connect with a team of doctors, pharmacists, and healthcare experts for product usage guidance and booking suitable consultations.",
      zh: "联系医生、药剂师和医疗保健专家团队，获取产品使用指导并预约合适的咨询。",
    },
    highlights: [
      {
        label: {
          vi: "Chuyên gia hiện có",
          en: "Available Experts",
          zh: "现有专家",
        },
        value: "6+",
      },
      {
        label: {
          vi: "Hình thức tư vấn",
          en: "Consultation Types",
          zh: "咨询形式",
        },
        value: "3",
      },
    ],
    actions: [
      {
        href: "/tu-van",
        label: {
          vi: "Đặt lịch tư vấn",
          en: "Book Consultation",
          zh: "预约咨询",
        },
      },
      {
        href: "/chuyen-gia",
        label: {
          vi: "Xem đội ngũ",
          en: "View Team",
          zh: "查看团队",
        },
        variant: "outline",
      },
    ],
    cards: [
      {
        title: {
          vi: "Đội ngũ chuyên nghiệp",
          en: "Professional Team",
          zh: "专业团队",
        },
        text: {
          vi: "Các y sĩ, dược sĩ giàu kinh nghiệm và tận tâm vì sức khỏe của bạn.",
          en: "Experienced doctors and pharmacists dedicated to your health.",
          zh: "经验丰富且致力于为您健康服务的医师和药剂师团队。",
        },
        icon: "Users",
      },
      {
        title: {
          vi: "Hỗ trợ trực tuyến",
          en: "Online Support",
          zh: "在线支持",
        },
        text: {
          vi: "Kết nối trực tuyến nhanh chóng qua chat hoặc cuộc gọi tiện lợi.",
          en: "Quick online connection via chat or convenient calls.",
          zh: "通过聊天或便捷的电话快速进行在线连接。",
        },
        icon: "MessageCircle",
      },
      {
        title: {
          vi: "Đặt lịch chủ động",
          en: "Proactive Booking",
          zh: "主动预约",
        },
        text: {
          vi: "Chủ động lựa chọn khung giờ và y sĩ phù hợp với lịch trình của bạn.",
          en: "Choose the time slot and doctor that best fit your schedule.",
          zh: "主动选择适合您日程安排的时间段和医师。",
        },
        icon: "CalendarCheck",
      },
    ],
  },
};
