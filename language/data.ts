import type {
    Category,
    Product,
    MembershipLevel,
    MembershipPackage,
    Doctor,
    Article,
    Notification,
} from "../interface/types";
import { vietnamese } from "./vietnamese";
import { english } from "./english";
import { chinese } from "./chinese";

export const categories: Category[] = [
    {
        id: "duoc-lieu",
        name: {
            vi: "Dược liệu đóng hộp",
            en: "Packaged Herbs",
            zh: "盒装草药",
        },
        slug: "duoc-lieu-dong-hop",
        icon: "Package",
        description: {
            vi: "Các loại dược liệu quý được đóng gói cẩn thận",
            en: "Carefully packaged precious herbs",
            zh: "精心包装的珍贵草药",
        },
    },
    {
        id: "thuc-pham-sach",
        name: {
            vi: "Bún / Miến / Thực phẩm sạch",
            en: "Noodles / Clean Food",
            zh: "粉丝/清洁食品",
        },
        slug: "thuc-pham-sach",
        icon: "Wheat",
        description: {
            vi: "Thực phẩm sạch từ nguồn nguyên liệu tự nhiên",
            en: "Clean food from natural ingredients",
            zh: "天然原料的清洁食品",
        },
    },
    {
        id: "tra-thao-duoc",
        name: { vi: "Trà thảo dược", en: "Herbal Tea", zh: "草药茶" },
        slug: "tra-thao-duoc",
        icon: "Coffee",
        description: {
            vi: "Các loại trà từ dược liệu thiên nhiên tốt cho sức khỏe",
            en: "Natural herbal teas for health",
            zh: "天然草药茶，有益健康",
        },
    },
    {
        id: "bot-vien-nang",
        name: {
            vi: "Bột / Viên nang / Nước uống",
            en: "Powder / Capsules / Drinks",
            zh: "粉末/胶囊/饮料",
        },
        slug: "bot-vien-nang",
        icon: "Pill",
        description: {
            vi: "Sản phẩm tiện lợi, dễ sử dụng hàng ngày",
            en: "Convenient products for daily use",
            zh: "方便日常使用的产品",
        },
    },
    {
        id: "bai-thuoc",
        name: { vi: "Bài thuốc dân gian", en: "Folk Remedies", zh: "民间药方" },
        slug: "bai-thuoc-dan-gian",
        icon: "BookOpen",
        description: {
            vi: "Kiến thức y học cổ truyền được biên soạn",
            en: "Compiled traditional medicine knowledge",
            zh: "整理的传统医学知识",
        },
    },
    {
        id: "thao-duoc-kho",
        name: { vi: "Dược liệu khô", en: "Dried Herbs", zh: "干草药" },
        slug: "duoc-lieu-kho",
        icon: "Leaf",
        description: {
            vi: "Các loại thảo dược khô truyền thống, dùng sắc hoặc pha trà",
            en: "Traditional dried herbs for brewing or decoction",
            zh: "用于泡茶或煎煮的传统干草药",
        },
    },
];

export const products: Product[] = [
    // 1. Trà cà gai leo
    {
  id: 'tra-ca-gai-leo',
  name: {
    vi: 'Trà cà gai leo thượng hạng',
    en: 'Premium Solanum Procumbens Tea',
    zh: '优质刺茄茶'
  },
  slug: 'tra-ca-gai-leo',
  categoryId: 'tra-thao-duoc',
  price: 120000,
  originalPrice: 150000,
  discount: 20,
  image: '/san-pham/tra-ca-gai-leo/01.png',
  images: [
    '/san-pham/tra-ca-gai-leo/01.png',
    '/san-pham/tra-ca-gai-leo/02.png',
    '/san-pham/tra-ca-gai-leo/03-01.png',
    '/san-pham/tra-ca-gai-leo/03.png',
  ],
  description: {
    vi: `
🌿 **Giới thiệu sản phẩm**

Trà cà gai leo là một trong những dược liệu quý của y học cổ truyền Việt Nam, được sử dụng từ hàng trăm năm nay trong các bài thuốc hỗ trợ điều trị bệnh về gan. Sản phẩm được chế biến từ cây cà gai leo (Solanum procumbens) trồng tại vùng dược liệu sạch, thu hái đúng thời điểm, giữ trọn dược tính tự nhiên.

---

🧪 **Thành phần dược tính**

Cà gai leo chứa nhiều hoạt chất sinh học quan trọng như:
- Glycoalkaloid: giúp ức chế virus viêm gan và ngăn xơ gan phát triển
- Flavonoid: chống oxy hóa mạnh, bảo vệ tế bào gan
- Alkaloid & Saponin: hỗ trợ giải độc, tăng cường miễn dịch :contentReference[oaicite:0]{index=0}  

---

💪 **Công dụng nổi bật**

- Hỗ trợ giải độc gan, giảm men gan hiệu quả  
- Hỗ trợ điều trị viêm gan B, xơ gan  
- Giảm tác hại của rượu bia, phục hồi chức năng gan  
- Giúp cải thiện triệu chứng vàng da, mẩn ngứa do gan yếu  
- Tăng cường sức đề kháng và chống oxy hóa :contentReference[oaicite:1]{index=1}  

---

🌱 **Nguồn gốc & quy trình sản xuất**

- Trồng tại vùng dược liệu Quảng Nam – đất sạch, không hóa chất  
- Thu hái thủ công khi cây đạt hàm lượng hoạt chất cao nhất  
- Sấy lạnh giữ nguyên dược tính  
- Đóng gói tiêu chuẩn an toàn thực phẩm  

---

🍵 **Hướng dẫn sử dụng**

- Dùng 10–20g trà mỗi ngày  
- Hãm với 500–700ml nước sôi trong 10 phút  
- Có thể uống thay nước lọc hàng ngày  

---

⚠️ **Lưu ý**

- Không dùng cho phụ nữ mang thai  
- Người đang điều trị bệnh nên tham khảo ý kiến bác sĩ  
- Không phải là thuốc và không thay thế thuốc chữa bệnh  

---

✨ **Điểm khác biệt của sản phẩm**

- 100% nguyên chất, không pha tạp  
- Truy xuất nguồn gốc rõ ràng  
- Đạt tiêu chuẩn dược liệu sạch  
- Được kiểm định chất lượng trước khi phân phối  

👉 Đây là lựa chọn lý tưởng cho người:
- Uống rượu bia thường xuyên  
- Men gan cao  
- Muốn detox gan tự nhiên  
`,
    en: `
🌿 Premium herbal tea made from Solanum procumbens, traditionally used for liver health support.

🧪 Rich in Glycoalkaloids, Flavonoids and Saponins that help detoxify liver and improve immune function.

💪 Key benefits:
- Liver detox & enzyme reduction
- Supports hepatitis B treatment
- Anti-oxidant & immune boosting
- Reduces alcohol damage

🌱 Sourced from clean farms in Vietnam and processed with modern drying technology.

🍵 Usage: Brew 10–20g with hot water daily.

⚠️ Not a medicine. Consult healthcare professionals if needed.
`,
    zh: `
🌿 由越南刺茄制成的天然草药茶，传统用于护肝。

🧪 富含生物碱、黄酮和皂苷，具有抗氧化和护肝作用。

💪 功效：
- 肝脏排毒
- 降低肝酶
- 改善免疫系统
- 减少酒精损伤

🌱 来自越南天然种植区，现代工艺加工。

🍵 使用方法：每日冲泡饮用。
`
  },
  shortDescription: {
    vi: 'Giải độc gan, giảm men gan, hỗ trợ viêm gan',
    en: 'Liver detox and support',
    zh: '护肝排毒'
  },
  origin: 'Quảng Nam, Việt Nam',
  certifications: ['Organic', 'ISO 22000', 'HACCP'],
  rating: 4.8,
  soldCount: 3200,
  inStock: true,
  benefits: {
    vi: ['Giải độc gan', 'Giảm men gan', 'Chống oxy hóa'],
    en: ['Detox', 'Liver support', 'Antioxidant'],
    zh: ['排毒', '护肝', '抗氧化']
  },
  usage: {
    vi: 'Hãm 10–20g với nước sôi, uống hàng ngày',
    en: 'Brew with hot water daily',
    zh: '每日冲泡饮用'
  },
  traceability: {
    qrCode: 'AGG-CGL-001',
    batch: 'LOT2024-CGL',
    productionDate: '2024-02-01',
    expiryDate: '2026-02-01',
    region: 'Quảng Nam',
    timeline: [
      { date: '2023-10-01', event: { vi: 'Gieo trồng', en: 'Planting', zh: '种植' } },
      { date: '2024-01-10', event: { vi: 'Thu hoạch', en: 'Harvest', zh: '收获' } },
      { date: '2024-01-20', event: { vi: 'Sấy lạnh', en: 'Drying', zh: '干燥' } },
      { date: '2024-02-01', event: { vi: 'Đóng gói', en: 'Packaging', zh: '包装' } },
    ],
  },
},

    // 2. Chè dây
{
    id: 'che-day',
    name: {
      vi: 'Chè dây rừng tự nhiên',
      en: 'Wild Ampelopsis Tea',
      zh: '野生藤茶'
    },
    slug: 'che-day',
    categoryId: 'tra-thao-duoc',
    price: 100000,
    originalPrice: 130000,
    discount: 23,
    image: '/san-pham/che-day/01.png',
    images: [
      '/san-pham/che-day/01.png',
      '/san-pham/che-day/02.png',
      '/san-pham/che-day/03.png',
    ],
    description: {
      vi: `
🌿 **Giới thiệu sản phẩm**

Chè dây là loại thảo dược mọc tự nhiên ở vùng núi cao, từ lâu đã được người dân Tây Bắc sử dụng như một loại trà thảo mộc giúp làm dịu cảm giác khó chịu ở dạ dày. Sản phẩm được tuyển chọn từ phần thân và lá non của cây chè dây, làm sạch, sấy khô ở nhiệt độ phù hợp để giữ mùi thơm dịu và vị ngọt hậu đặc trưng.

---

🧪 **Thành phần và đặc tính nổi bật**

Theo các tài liệu phổ biến về dược liệu, chè dây thường được nhắc đến với nhóm hoạt chất như flavonoid, tanin và một số hợp chất chống oxy hóa tự nhiên. Nhờ đó, loại trà này thường được dùng trong các bài trà hỗ trợ làm dịu niêm mạc dạ dày, giảm cảm giác nóng rát và giúp cơ thể thanh nhiệt.

---

💪 **Công dụng phổ biến**

- Hỗ trợ làm dịu cảm giác khó chịu ở dạ dày  
- Hỗ trợ người hay bị đầy hơi, ợ chua, nóng rát vùng thượng vị  
- Góp phần thanh nhiệt, giảm cảm giác nóng trong  
- Thích hợp dùng như trà thảo mộc hằng ngày cho người ăn uống thất thường  

---

🌱 **Nguồn gốc & quy trình**

- Thu hái tại vùng núi cao Lào Cai  
- Chọn lọc cành lá đạt độ trưởng thành phù hợp  
- Làm sạch và sấy khô để giữ hương vị tự nhiên  
- Đóng gói kín, hạn chế ẩm mốc, giữ trà thơm lâu  

---

🍵 **Hướng dẫn sử dụng**

- Dùng 10–15g trà cho 600–800ml nước nóng  
- Hãm trong 10–15 phút rồi dùng khi còn ấm  
- Có thể dùng 1–2 lần mỗi ngày  
- Nên dùng sau bữa ăn hoặc theo thói quen trà thảo mộc cá nhân  

---

⚠️ **Lưu ý**

- Không nên uống quá đặc hoặc quá nhiều trong ngày  
- Người huyết áp thấp, phụ nữ mang thai hoặc người đang điều trị bệnh lý dạ dày nên hỏi ý kiến chuyên môn trước khi dùng thường xuyên  
- Đây là sản phẩm trà thảo mộc hỗ trợ, không phải thuốc  

---

✨ **Điểm phù hợp**

Sản phẩm phù hợp với người thích các loại trà thảo mộc dịu nhẹ, muốn bổ sung thêm lựa chọn hỗ trợ tiêu hóa và chăm sóc dạ dày trong sinh hoạt hằng ngày.
      `,
      en: `
🌿 **Product Overview**

Wild Ampelopsis tea is a traditional herbal tea commonly used in mountainous regions as a gentle daily tea for stomach comfort. The product is made from carefully selected stems and leaves, cleaned and dried to preserve its natural aroma and mild aftertaste.

🧪 **Natural characteristics**

This herb is often associated with flavonoids, tannins and antioxidant compounds in public herbal references, making it a popular herbal tea for digestive comfort.

💪 **Commonly used for**

- Supporting stomach comfort  
- Helping reduce bloating and sour belching discomfort  
- Supporting body cooling in traditional herbal use  
- Suitable as a daily herbal tea  

🍵 **Usage**

Brew 10–15g with 600–800ml hot water for 10–15 minutes. Drink warm, 1–2 times daily.

⚠️ **Note**

This is a herbal tea product for supportive use, not a medicine.
      `,
      zh: `
🌿 **产品介绍**

野生藤茶是一种常见的传统草本茶，常被用作日常饮用的温和养胃茶。产品选用优质枝叶，清洗后低温干燥，以保留自然香气和回甘口感。

🧪 **成分特点**

公开草药资料中，藤茶常与黄酮、单宁及天然抗氧化成分相关联，因此常被作为日常草本养护茶饮。

💪 **常见用途**

- 日常胃部舒适支持  
- 缓解腹胀、反酸不适  
- 传统上用于清热  
- 适合作为日常草本茶  

🍵 **饮用方法**

每次取10–15克，用600–800毫升热水冲泡10–15分钟，温饮，每日1–2次。

⚠️ **注意**

本品为草本茶饮，不是药物。
      `,
    },
    shortDescription: {
      vi: 'Trà thảo mộc hỗ trợ dạ dày, thanh nhiệt, dễ uống hằng ngày',
      en: 'Herbal tea for stomach comfort and daily digestive support',
      zh: '温和养胃的日常草本茶'
    },
    origin: 'Lào Cai, Việt Nam',
    certifications: ['HACCP', 'ISO 22000'],
    rating: 4.6,
    soldCount: 1500,
    inStock: true,
    benefits: {
      vi: ['Hỗ trợ dạ dày', 'Giảm cảm giác đầy hơi', 'Thanh nhiệt nhẹ'],
      en: ['Stomach comfort', 'Digestive support', 'Gentle body-cooling tea'],
      zh: ['养胃支持', '帮助消化', '温和清热']
    },
    usage: {
      vi: 'Hãm 10–15g với 600–800ml nước nóng trong 10–15 phút, dùng 1–2 lần/ngày',
      en: 'Brew 10–15g with 600–800ml hot water for 10–15 minutes',
      zh: '每次10–15克，热水冲泡10–15分钟'
    },
    traceability: {
      qrCode: 'AGG-CD-002',
      batch: 'LOT2026-CD',
      productionDate: '2026-02-10',
      expiryDate: '2028-02-10',
      region: 'Sa Pa, Lào Cai',
      timeline: [
        { date: '2025-11-20', event: { vi: 'Khảo sát vùng nguyên liệu', en: 'Raw material area inspection', zh: '原料产区检查' } },
        { date: '2025-12-18', event: { vi: 'Thu hái chè dây', en: 'Harvesting', zh: '采收' } },
        { date: '2025-12-22', event: { vi: 'Làm sạch và phân loại', en: 'Cleaning and sorting', zh: '清洗分级' } },
        { date: '2026-01-05', event: { vi: 'Sấy khô', en: 'Drying', zh: '干燥' } },
        { date: '2026-02-10', event: { vi: 'Đóng gói và kiểm tra lô', en: 'Packaging and lot check', zh: '包装与批次检测' } },
      ],
    },
  },

  {
    id: 'che-vang',
    name: {
      vi: 'Chè vằng tuyển chọn',
      en: 'Premium Vang Herbal Tea',
      zh: '精选藤黄茶'
    },
    slug: 'che-vang',
    categoryId: 'tra-thao-duoc',
    price: 110000,
    originalPrice: 140000,
    discount: 21,
    image: '/san-pham/che-vang/01.png',
    images: [
      '/san-pham/che-vang/01.png',
      '/san-pham/che-vang/02.png',
      '/san-pham/che-vang/03.png',
      '/san-pham/che-vang/04.png',
    ],
    description: {
      vi: `
🌿 **Giới thiệu sản phẩm**

Chè vằng là một trong những thảo dược quen thuộc trong dân gian Việt Nam, đặc biệt thường được nhắc đến trong các bài nước uống dành cho phụ nữ sau sinh. Phần cành và lá được sơ chế sạch, sấy khô, tạo nên trà có vị hơi đắng nhẹ, hậu thảo mộc rõ nét và dễ kết hợp trong chế độ chăm sóc cơ thể hằng ngày.

---

🧪 **Thành phần nổi bật**

Theo tài liệu dược liệu phổ biến, chè vằng thường được ghi nhận có chứa flavonoid, alcaloid và một số hợp chất nhựa thực vật. Trong thực hành dân gian, chè vằng thường được dùng ở dạng trà để hỗ trợ thanh nhiệt, dùng sau sinh và phối hợp trong các bài trà thảo mộc.

---

💪 **Công dụng phổ biến**

- Thường được dùng trong chế độ chăm sóc sau sinh  
- Hỗ trợ cảm giác cơ thể nhẹ hơn khi dùng như trà thảo mộc  
- Góp phần thanh nhiệt và hỗ trợ tiêu hóa nhẹ  
- Phù hợp với người muốn dùng trà thảo mộc có vị đậm, hậu rõ  

---

🌱 **Nguồn gốc & chế biến**

- Nguyên liệu tuyển chọn từ vùng trồng tại Nghệ An  
- Thu hái cành, lá đạt độ già phù hợp  
- Làm sạch, thái ngắn và sấy khô  
- Đóng gói theo lô để dễ truy xuất nguồn gốc  

---

🍵 **Hướng dẫn sử dụng**

- Dùng 10–20g chè vằng hãm với 700ml nước nóng  
- Có thể đun nhẹ hoặc hãm trong bình giữ nhiệt  
- Dùng 1–2 lần/ngày tùy nhu cầu  

---

⚠️ **Lưu ý**

- Người có cơ địa nhạy cảm nên dùng lượng nhỏ trước  
- Không nên lạm dụng hoặc dùng thay hoàn toàn nước lọc trong thời gian dài  
- Nếu đang mang thai, cho con bú hoặc có vấn đề sức khỏe đặc biệt, nên hỏi ý kiến chuyên môn  
- Sản phẩm không phải thuốc  

---

✨ **Điểm phù hợp**

Phù hợp cho người thích các loại trà thảo dược truyền thống và muốn bổ sung một loại trà thường được dân gian dùng trong chăm sóc cơ thể sau sinh và sinh hoạt hằng ngày.
      `,
      en: `
🌿 **Product Overview**

Vang tea is a traditional Vietnamese herbal tea commonly mentioned in postpartum care routines and daily herbal use. It has a mildly bitter taste with a distinct herbal finish.

🧪 **Natural profile**

Public herbal references often mention flavonoids, alkaloids and resin-like compounds in this herb.

💪 **Commonly used for**

- Traditional postpartum-support tea routines  
- Gentle body-cooling herbal use  
- Light digestive support  
- Daily herbal tea drinking  

🍵 **Usage**

Brew 10–20g with about 700ml of hot water. Drink warm once or twice daily.

⚠️ **Note**

Supportive herbal tea only, not a medicine.
      `,
      zh: `
🌿 **产品介绍**

藤黄茶是越南传统草本茶之一，民间常用于产后调理及日常草本饮用。茶汤略带微苦，草本回味明显。

🧪 **成分特点**

公开资料中常提到其含有黄酮、生物碱及树脂样成分。

💪 **常见用途**

- 传统产后调理茶饮  
- 温和清热  
- 轻度消化支持  
- 适合作为日常草本茶  

🍵 **饮用方法**

每次10–20克，以约700毫升热水冲泡或小火煮饮。

⚠️ **注意**

本品为草本茶饮，不是药物。
      `,
    },
    shortDescription: {
      vi: 'Trà thảo mộc truyền thống, thường dùng trong chăm sóc cơ thể sau sinh',
      en: 'Traditional herbal tea often used in postpartum-support routines',
      zh: '传统草本茶，常见于产后调理'
    },
    origin: 'Nghệ An, Việt Nam',
    certifications: ['HACCP', 'Organic'],
    rating: 4.7,
    soldCount: 1600,
    inStock: true,
    benefits: {
      vi: ['Trà thảo mộc sau sinh', 'Thanh nhiệt nhẹ', 'Dùng hằng ngày'],
      en: ['Postpartum-support tea', 'Gentle herbal care', 'Daily use'],
      zh: ['产后调理茶', '温和草本养护', '日常饮用']
    },
    usage: {
      vi: 'Hãm hoặc đun 10–20g với khoảng 700ml nước, dùng 1–2 lần/ngày',
      en: 'Brew or simmer 10–20g with about 700ml water',
      zh: '10–20克，加约700毫升热水冲泡或煮饮'
    },
    traceability: {
      qrCode: 'AGG-CV-003',
      batch: 'LOT2026-CV',
      productionDate: '2026-01-28',
      expiryDate: '2028-01-28',
      region: 'Nghĩa Đàn, Nghệ An',
      timeline: [
        { date: '2025-10-15', event: { vi: 'Chăm sóc vùng nguyên liệu', en: 'Raw material area maintenance', zh: '原料基地养护' } },
        { date: '2025-12-12', event: { vi: 'Thu hoạch cành lá', en: 'Harvesting branches and leaves', zh: '采收枝叶' } },
        { date: '2025-12-18', event: { vi: 'Làm sạch và cắt đoạn', en: 'Cleaning and cutting', zh: '清洗切段' } },
        { date: '2026-01-06', event: { vi: 'Sấy và ổn định độ ẩm', en: 'Drying and moisture stabilization', zh: '干燥与含水率稳定' } },
        { date: '2026-01-28', event: { vi: 'Đóng gói thành phẩm', en: 'Final packaging', zh: '成品包装' } },
      ],
    },
  },

  {
    id: 'tra-co-xuoc',
    name: {
      vi: 'Trà cỏ xước thảo mộc',
      en: 'Achyranthes Herbal Tea',
      zh: '牛膝草本茶'
    },
    slug: 'tra-co-xuoc',
    categoryId: 'tra-thao-duoc',
    price: 95000,
    originalPrice: 120000,
    discount: 21,
    image: '/san-pham/tra-co-xuoc/01.png',
    images: [
      '/san-pham/tra-co-xuoc/01.png',
      '/san-pham/tra-co-xuoc/02.png',
      '/san-pham/tra-co-xuoc/03.png',
      '/san-pham/tra-co-xuoc/04.png',
    ],
    description: {
      vi: `
🌿 **Giới thiệu sản phẩm**

Cỏ xước, còn thường được liên hệ với nhóm dược liệu ngưu tất trong các bài thuốc dân gian, là loại thảo mộc quen thuộc trong y học cổ truyền. Trà cỏ xước được phát triển theo hướng dễ dùng hơn cho người hiện đại: nguyên liệu sạch, cắt đoạn, sấy khô và đóng gói để tiện hãm trà.

---

🧪 **Đặc tính thảo dược**

Trong các tài liệu phổ biến về Đông y, cỏ xước/ngưu tất thường được nhắc tới trong các bài dùng cho xương khớp, gân cơ và lưu thông khí huyết. Vì vậy, dạng trà thảo mộc này thường phù hợp với nhóm người thích các sản phẩm hỗ trợ chăm sóc cơ thể hằng ngày theo hướng tự nhiên.

---

💪 **Công dụng phổ biến**

- Hỗ trợ chăm sóc xương khớp trong sinh hoạt hằng ngày  
- Thích hợp cho người thường xuyên vận động hoặc hay mỏi cơ  
- Dùng như trà thảo mộc hỗ trợ lưu thông và làm cơ thể nhẹ hơn  
- Có thể kết hợp trong chế độ sống lành mạnh, vận động điều độ  

---

🌱 **Nguồn gốc & chế biến**

- Thu hái tại vùng nguyên liệu Hà Nam  
- Chọn phần thân cành phù hợp để làm trà  
- Làm sạch, thái khúc và sấy khô  
- Kiểm tra độ ẩm trước khi đóng gói  

---

🍵 **Hướng dẫn sử dụng**

- Dùng 10–15g với 600ml nước nóng  
- Hãm 10–15 phút hoặc đun nhẹ 5–7 phút  
- Dùng 1 lần/ngày hoặc theo nhu cầu trà thảo mộc  

---

⚠️ **Lưu ý**

- Không dùng quá đậm trong lần đầu nếu cơ địa nhạy cảm  
- Người có bệnh nền, phụ nữ mang thai hoặc đang dùng thuốc nên tham khảo ý kiến chuyên môn  
- Đây là trà hỗ trợ, không thay thế thuốc điều trị  

---

✨ **Điểm phù hợp**

Dành cho người ưu tiên lối sống thiên về thảo mộc truyền thống, muốn bổ sung một lựa chọn trà hỗ trợ chăm sóc cơ xương khớp trong nhịp sống hiện đại.
      `,
      en: `
🌿 **Product Overview**

Achyranthes herbal tea is inspired by traditional herbal uses associated with joint comfort, muscle relaxation and circulation support. It is processed into an easy-to-brew daily herbal tea format.

💪 **Commonly used for**

- Daily herbal support for joint and muscle comfort  
- Suitable for active lifestyles  
- Traditional circulation-support herbal tea  

🍵 **Usage**

Brew 10–15g with 600ml hot water for 10–15 minutes.

⚠️ **Note**

Supportive herbal tea only, not a medicine.
      `,
      zh: `
🌿 **产品介绍**

牛膝草本茶源于传统草药应用理念，常与关节舒适、肌肉放松及循环支持相关联，现做成更适合现代人日常冲泡的草本茶形式。

💪 **常见用途**

- 日常关节与肌肉养护  
- 适合活动量较大的人群  
- 传统循环支持草本茶  

🍵 **饮用方法**

每次10–15克，以600毫升热水冲泡10–15分钟。

⚠️ **注意**

本品为草本茶饮，不是药物。
      `,
    },
    shortDescription: {
      vi: 'Trà thảo mộc hỗ trợ chăm sóc xương khớp và cơ thể hằng ngày',
      en: 'Herbal tea for daily joint and body support',
      zh: '日常关节与身体养护草本茶'
    },
    origin: 'Hà Nam, Việt Nam',
    certifications: ['HACCP'],
    rating: 4.5,
    soldCount: 980,
    inStock: true,
    benefits: {
      vi: ['Hỗ trợ cơ xương khớp', 'Phù hợp người vận động', 'Trà thảo mộc hằng ngày'],
      en: ['Joint support', 'Active-lifestyle tea', 'Daily herbal use'],
      zh: ['关节支持', '适合活跃人群', '日常草本饮用']
    },
    usage: {
      vi: 'Hãm 10–15g với 600ml nước nóng trong 10–15 phút',
      en: 'Brew 10–15g with 600ml hot water',
      zh: '10–15克，以600毫升热水冲泡'
    },
    traceability: {
      qrCode: 'AGG-CX-004',
      batch: 'LOT2026-CX',
      productionDate: '2026-02-03',
      expiryDate: '2028-02-03',
      region: 'Duy Tiên, Hà Nam',
      timeline: [
        { date: '2025-10-28', event: { vi: 'Chuẩn bị vùng trồng', en: 'Field preparation', zh: '种植区准备' } },
        { date: '2025-12-08', event: { vi: 'Thu hái nguyên liệu', en: 'Harvesting', zh: '采收原料' } },
        { date: '2025-12-15', event: { vi: 'Làm sạch và cắt khúc', en: 'Cleaning and cutting', zh: '清洗切段' } },
        { date: '2026-01-10', event: { vi: 'Sấy khô', en: 'Drying', zh: '干燥' } },
        { date: '2026-02-03', event: { vi: 'Đóng gói', en: 'Packaging', zh: '包装' } },
      ],
    },
  },

  {
    id: 'tra-day-thia-canh',
    name: {
      vi: 'Trà dây thìa canh',
      en: 'Gymnema Herbal Tea',
      zh: '匙羹藤草本茶'
    },
    slug: 'tra-day-thia-canh',
    categoryId: 'tra-thao-duoc',
    price: 130000,
    originalPrice: 160000,
    discount: 19,
    image: '/san-pham/tra-day-thia-canh/01.png',
    images: [
      '/san-pham/tra-day-thia-canh/01.png',
      '/san-pham/tra-day-thia-canh/02.png',
      '/san-pham/tra-day-thia-canh/03.png',
    ],
    description: {
      vi: `
🌿 **Giới thiệu sản phẩm**

Dây thìa canh là một trong những dược liệu được nhiều người biết đến khi nhắc đến nhóm trà thảo mộc dành cho người quan tâm đến đường huyết và chế độ ăn uống. Trà được làm từ phần lá và thân non đã qua sơ chế, giúp thuận tiện hơn cho việc sử dụng hằng ngày.

---

🧪 **Đặc tính nổi bật**

Các tài liệu phổ biến về dược liệu thường nhắc đến dây thìa canh trong nhóm thảo mộc hỗ trợ kiểm soát hấp thu đường và được dùng trong các chế độ chăm sóc dành cho người cần theo dõi đường huyết. Vì vậy, đây là dòng trà thường được quan tâm trong nhóm sản phẩm chăm sóc sức khỏe chủ động.

---

💪 **Công dụng phổ biến**

- Hỗ trợ chế độ sinh hoạt dành cho người quan tâm đến đường huyết  
- Phù hợp với người ăn ngọt, ăn uống thất thường hoặc cần kiểm soát khẩu phần  
- Dùng như trà thảo mộc trong lối sống lành mạnh, kết hợp vận động và dinh dưỡng cân bằng  
- Có thể dùng như một lựa chọn trà ít ngọt, dễ duy trì đều đặn  

---

🌱 **Nguồn gốc & quy trình**

- Nguyên liệu tuyển chọn từ vùng Hòa Bình  
- Thu hái lá và dây non đúng giai đoạn  
- Làm sạch, sấy khô và cắt đoạn  
- Kiểm tra độ ẩm, tạp chất trước khi đóng gói  

---

🍵 **Hướng dẫn sử dụng**

- Dùng 10–15g với 500–700ml nước nóng  
- Hãm 10 phút hoặc đun nhẹ 5 phút  
- Dùng 1–2 lần/ngày, tốt nhất theo lịch cố định  

---

⚠️ **Lưu ý**

- Người đang dùng thuốc điều chỉnh đường huyết nên theo dõi cơ thể và hỏi ý kiến chuyên môn trước khi dùng đều  
- Không thay thế chế độ ăn, vận động và điều trị theo chỉ định  
- Không phải thuốc  

---

✨ **Điểm phù hợp**

Phù hợp với người đang xây dựng lối sống lành mạnh, muốn bổ sung trà thảo mộc vào chế độ chăm sóc sức khỏe hằng ngày.
      `,
      en: `
🌿 **Product Overview**

Gymnema herbal tea is commonly associated with herbal routines for people who pay attention to blood sugar management and balanced eating habits. It is prepared into an easy daily tea format.

💪 **Commonly used for**

- Herbal support in blood sugar-conscious lifestyles  
- Suitable for people managing sweet intake and meal routines  
- Works best alongside diet and exercise habits  

🍵 **Usage**

Brew 10–15g with 500–700ml hot water for about 10 minutes.

⚠️ **Note**

Supportive herbal tea only, not a substitute for medical treatment.
      `,
      zh: `
🌿 **产品介绍**

匙羹藤草本茶常被用于关注血糖管理与饮食控制的人群的日常草本饮用方案中，适合现代健康生活方式。

💪 **常见用途**

- 关注血糖人群的日常草本支持  
- 适合控制甜食摄入和规律饮食者  
- 需配合饮食与运动习惯使用  

🍵 **饮用方法**

每次10–15克，以500–700毫升热水冲泡约10分钟。

⚠️ **注意**

本品为草本茶饮，不替代正规治疗。
      `,
    },
    shortDescription: {
      vi: 'Trà thảo mộc cho người quan tâm đến đường huyết và lối sống lành mạnh',
      en: 'Herbal tea for blood sugar-conscious lifestyles',
      zh: '关注血糖管理的草本茶'
    },
    origin: 'Hòa Bình, Việt Nam',
    certifications: ['ISO 22000', 'HACCP'],
    rating: 4.8,
    soldCount: 2100,
    inStock: true,
    benefits: {
      vi: ['Hỗ trợ lối sống kiểm soát đường huyết', 'Dễ dùng hằng ngày', 'Phù hợp chế độ ăn lành mạnh'],
      en: ['Blood sugar-conscious support', 'Daily herbal use', 'Healthy lifestyle fit'],
      zh: ['血糖管理支持', '适合日常饮用', '配合健康生活方式']
    },
    usage: {
      vi: 'Hãm 10–15g với 500–700ml nước nóng, dùng 1–2 lần/ngày',
      en: 'Brew 10–15g with 500–700ml hot water',
      zh: '10–15克，以500–700毫升热水冲泡'
    },
    traceability: {
      qrCode: 'AGG-DTC-005',
      batch: 'LOT2026-DTC',
      productionDate: '2026-02-14',
      expiryDate: '2028-02-14',
      region: 'Lương Sơn, Hòa Bình',
      timeline: [
        { date: '2025-11-02', event: { vi: 'Kiểm tra vùng nguyên liệu', en: 'Material area inspection', zh: '原料产区检查' } },
        { date: '2025-12-20', event: { vi: 'Thu hái lá và dây non', en: 'Harvesting leaves and vines', zh: '采收叶与嫩藤' } },
        { date: '2025-12-28', event: { vi: 'Làm sạch và phân loại', en: 'Cleaning and sorting', zh: '清洗分级' } },
        { date: '2026-01-18', event: { vi: 'Sấy khô', en: 'Drying', zh: '干燥' } },
        { date: '2026-02-14', event: { vi: 'Đóng gói thành phẩm', en: 'Final packaging', zh: '成品包装' } },
      ],
    },
  },

  {
    id: 'tra-dinh-lang',
    name: {
      vi: 'Trà đinh lăng',
      en: 'Polyscias Herbal Tea',
      zh: '丁楠草本茶'
    },
    slug: 'tra-dinh-lang',
    categoryId: 'tra-thao-duoc',
    price: 90000,
    originalPrice: 120000,
    discount: 25,
    image: '/san-pham/tra-dinh-lang/01.png',
    images: [
      '/san-pham/tra-dinh-lang/01.png',
      '/san-pham/tra-dinh-lang/02.png',
      '/san-pham/tra-dinh-lang/03-1.png',
      '/san-pham/tra-dinh-lang/03.png',
      '/san-pham/tra-dinh-lang/04.png',
      '/san-pham/tra-dinh-lang/05.png',
    ],
    description: {
      vi: `
🌿 **Giới thiệu sản phẩm**

Đinh lăng từ lâu được nhiều người gọi là “nhân sâm của người Việt” trong cách nói dân gian. Trà đinh lăng được làm từ nguyên liệu tuyển chọn, thiên về định hướng trà thảo mộc bồi bổ nhẹ, phù hợp với nhịp sống hiện đại, đặc biệt với người làm việc căng thẳng hoặc muốn bổ sung một loại trà dịu cơ thể.

---

🧪 **Thành phần tự nhiên**

Theo các tài liệu phổ biến, đinh lăng có thể chứa saponin cùng một số acid amin, vitamin và hợp chất thực vật khác. Những đặc tính này khiến đinh lăng thường được dùng trong các bài trà hoặc món ngâm dành cho người cần bồi bổ và phục hồi thể lực.

---

💪 **Công dụng phổ biến**

- Hỗ trợ bồi bổ cơ thể theo hướng thảo mộc  
- Phù hợp với người thường xuyên mệt mỏi, căng thẳng  
- Có thể dùng như trà thư giãn nhẹ vào buổi tối hoặc sau giờ làm việc  
- Thích hợp trong chế độ sống cân bằng giữa nghỉ ngơi và vận động  

---

🌱 **Nguồn gốc & chế biến**

- Nguyên liệu từ vùng trồng Nam Định  
- Tuyển chọn lá hoặc rễ chế biến trà theo từng dòng sản phẩm  
- Làm sạch, thái mỏng, sấy khô  
- Bảo quản kín để giữ hương thơm thảo mộc  

---

🍵 **Hướng dẫn sử dụng**

- Dùng 10–15g với 600–700ml nước nóng  
- Hãm trong 10–15 phút  
- Có thể dùng 1 lần/ngày hoặc chia 2 lần  

---

⚠️ **Lưu ý**

- Không nên dùng quá đặc hoặc quá nhiều  
- Người nhạy cảm với thảo dược, phụ nữ mang thai hoặc đang điều trị bệnh nên tham khảo ý kiến chuyên môn  
- Trà thảo mộc không thay thế chế độ nghỉ ngơi, dinh dưỡng hay điều trị  

---

✨ **Điểm phù hợp**

Phù hợp với người muốn một loại trà thảo mộc có cảm giác bồi bổ nhẹ, dễ đưa vào thói quen chăm sóc sức khỏe hằng ngày.
      `,
      en: `
🌿 **Product Overview**

Polyscias herbal tea is inspired by traditional Vietnamese herbal use associated with gentle body nourishment, relaxation and recovery support. It is suitable for daily herbal tea routines.

🧪 **Natural profile**

Public references often mention saponins, amino acids and natural plant compounds in Polyscias.

💪 **Commonly used for**

- Gentle body nourishment  
- Daily stress-relief herbal routine  
- Suitable for people with busy lifestyles  

🍵 **Usage**

Brew 10–15g with 600–700ml hot water for 10–15 minutes.

⚠️ **Note**

This is supportive herbal tea, not a medicine.
      `,
      zh: `
🌿 **产品介绍**

丁楠草本茶源于越南传统草本应用理念，常与温和滋养、舒缓放松及体力恢复支持相关联，适合作为日常草本茶饮。

🧪 **成分特点**

公开资料中常提及丁楠含有皂苷、氨基酸及多种植物天然成分。

💪 **常见用途**

- 温和滋养身体  
- 日常放松与舒缓  
- 适合工作节奏快的人群  

🍵 **饮用方法**

每次10–15克，以600–700毫升热水冲泡10–15分钟。

⚠️ **注意**

本品为草本茶饮，不是药物。
      `,
    },
    shortDescription: {
      vi: 'Trà thảo mộc bồi bổ nhẹ, phù hợp người hay mệt mỏi và căng thẳng',
      en: 'Gentle nourishing herbal tea for busy and stressed lifestyles',
      zh: '适合忙碌人群的温和滋养草本茶'
    },
    origin: 'Nam Định, Việt Nam',
    certifications: ['Organic', 'HACCP'],
    rating: 4.5,
    soldCount: 1200,
    inStock: true,
    benefits: {
      vi: ['Bồi bổ nhẹ', 'Hỗ trợ thư giãn', 'Dùng hằng ngày'],
      en: ['Gentle nourishment', 'Relaxation support', 'Daily use'],
      zh: ['温和滋养', '舒缓放松', '适合日常饮用']
    },
    usage: {
      vi: 'Hãm 10–15g với 600–700ml nước nóng trong 10–15 phút',
      en: 'Brew 10–15g with 600–700ml hot water',
      zh: '10–15克，以600–700毫升热水冲泡'
    },
    traceability: {
      qrCode: 'AGG-DL-006',
      batch: 'LOT2026-DL',
      productionDate: '2026-01-20',
      expiryDate: '2028-01-20',
      region: 'Vụ Bản, Nam Định',
      timeline: [
        { date: '2025-09-22', event: { vi: 'Chăm sóc vùng trồng', en: 'Cultivation maintenance', zh: '种植维护' } },
        { date: '2025-12-02', event: { vi: 'Thu nguyên liệu', en: 'Harvesting materials', zh: '采收原料' } },
        { date: '2025-12-10', event: { vi: 'Làm sạch và thái mỏng', en: 'Cleaning and slicing', zh: '清洗切片' } },
        { date: '2026-01-05', event: { vi: 'Sấy khô', en: 'Drying', zh: '干燥' } },
        { date: '2026-01-20', event: { vi: 'Đóng gói thành phẩm', en: 'Final packaging', zh: '成品包装' } },
      ],
    },
  },

  {
    id: 'tra-giao-co-lam',
    name: {
      vi: 'Trà giảo cổ lam',
      en: 'Jiaogulan Herbal Tea',
      zh: '绞股蓝草本茶'
    },
    slug: 'tra-giao-co-lam',
    categoryId: 'tra-thao-duoc',
    price: 140000,
    originalPrice: 180000,
    discount: 22,
    image: '/san-pham/tra-giao-co-lam/01.png',
    images: [
      '/san-pham/tra-giao-co-lam/01.png',
      '/san-pham/tra-giao-co-lam/02.png',
      '/san-pham/tra-giao-co-lam/03%20t.png',
      '/san-pham/tra-giao-co-lam/03.png',
    ],
    description: {
      vi: `
🌿 **Giới thiệu sản phẩm**

Giảo cổ lam là loại trà thảo dược được nhiều người biết đến trong nhóm trà chăm sóc tim mạch và chuyển hóa. Với vị hơi đắng nhẹ, hậu ngọt thanh, sản phẩm phù hợp cho người thích trà thảo mộc có cảm giác “sạch vị” và dễ đưa vào thói quen dùng mỗi ngày.

---

🧪 **Đặc tính nổi bật**

Trong các tài liệu phổ biến, giảo cổ lam thường được nhắc đến với flavonoid và nhóm hợp chất saponin thực vật. Nhờ vậy, loại trà này thường được quan tâm trong nhóm người muốn duy trì chế độ sống lành mạnh, chú ý đến mỡ máu, huyết áp và sức khỏe tim mạch nói chung.

---

💪 **Công dụng phổ biến**

- Hỗ trợ lối sống quan tâm đến tim mạch và chuyển hóa  
- Thích hợp cho người muốn dùng trà thảo mộc ít ngọt, hậu thanh  
- Có thể kết hợp trong chế độ ăn và vận động lành mạnh  
- Phù hợp với người làm việc nhiều, ít vận động, muốn cân bằng thói quen sinh hoạt  

---

🌱 **Nguồn gốc & quy trình**

- Nguyên liệu từ vùng núi cao Lào Cai  
- Thu hái phần thân lá đạt chất lượng  
- Làm sạch, sấy khô và đóng gói kín  
- Kiểm tra cảm quan và độ ẩm trước khi xuất lô  

---

🍵 **Hướng dẫn sử dụng**

- Dùng 10–15g với 700ml nước nóng  
- Hãm 10 phút hoặc đun nhẹ 5 phút  
- Dùng 1–2 lần/ngày  

---

⚠️ **Lưu ý**

- Người huyết áp thấp hoặc đang dùng thuốc liên quan huyết áp nên thận trọng khi dùng đều  
- Không thay thế chế độ dinh dưỡng, vận động hoặc điều trị chuyên môn  
- Sản phẩm không phải thuốc  

---

✨ **Điểm phù hợp**

Thích hợp cho người đang hướng tới lối sống cân bằng, ưu tiên trà thảo mộc dùng lâu dài trong chăm sóc sức khỏe chủ động.
      `,
      en: `
🌿 **Product Overview**

Jiaogulan herbal tea is widely known as a wellness-oriented herbal tea associated with heart-conscious and metabolic-friendly lifestyles. It has a lightly bitter yet clean finish.

🧪 **Natural profile**

Public references often mention flavonoids and saponin-like plant compounds in jiaogulan.

💪 **Commonly used for**

- Wellness routines focused on heart and metabolic balance  
- Daily herbal tea for people with sedentary lifestyles  
- Fits healthy diet and exercise routines  

🍵 **Usage**

Brew 10–15g with 700ml hot water for about 10 minutes.

⚠️ **Note**

Supportive herbal tea only, not a medicine.
      `,
      zh: `
🌿 **产品介绍**

绞股蓝草本茶常被视为偏向心血管与代谢平衡管理的健康型草本茶，口感微苦回甘，适合长期日常饮用。

🧪 **成分特点**

公开资料中常提到其含有黄酮及皂苷类植物成分。

💪 **常见用途**

- 关注心血管与代谢平衡的人群  
- 久坐少动人群的日常草本饮品  
- 可配合健康饮食与运动习惯  

🍵 **饮用方法**

每次10–15克，以700毫升热水冲泡约10分钟。

⚠️ **注意**

本品为草本茶饮，不是药物。
      `,
    },
    shortDescription: {
      vi: 'Trà thảo mộc cho người quan tâm đến tim mạch, chuyển hóa và lối sống cân bằng',
      en: 'Herbal tea for heart-conscious and balanced lifestyles',
      zh: '关注心血管与代谢平衡的草本茶'
    },
    origin: 'Lào Cai, Việt Nam',
    certifications: ['HACCP', 'ISO 22000'],
    rating: 4.8,
    soldCount: 1700,
    inStock: true,
    benefits: {
      vi: ['Hỗ trợ lối sống tim mạch', 'Hậu vị thanh', 'Phù hợp dùng lâu dài'],
      en: ['Heart-conscious support', 'Clean herbal finish', 'Long-term daily use'],
      zh: ['心血管关注支持', '口感清爽', '适合长期饮用']
    },
    usage: {
      vi: 'Hãm 10–15g với 700ml nước nóng, dùng 1–2 lần/ngày',
      en: 'Brew 10–15g with 700ml hot water',
      zh: '10–15克，以700毫升热水冲泡'
    },
    traceability: {
      qrCode: 'AGG-GCL-007',
      batch: 'LOT2026-GCL',
      productionDate: '2026-02-08',
      expiryDate: '2028-02-08',
      region: 'Bắc Hà, Lào Cai',
      timeline: [
        { date: '2025-10-12', event: { vi: 'Chăm sóc vùng trồng', en: 'Cultivation maintenance', zh: '种植维护' } },
        { date: '2025-12-16', event: { vi: 'Thu hoạch thân lá', en: 'Harvesting stems and leaves', zh: '采收茎叶' } },
        { date: '2025-12-24', event: { vi: 'Làm sạch', en: 'Cleaning', zh: '清洗' } },
        { date: '2026-01-12', event: { vi: 'Sấy và ổn định', en: 'Drying and stabilization', zh: '干燥与稳定处理' } },
        { date: '2026-02-08', event: { vi: 'Đóng gói', en: 'Packaging', zh: '包装' } },
      ],
    },
  },

  {
    id: 'tra-nhan-tran',
    name: {
      vi: 'Trà nhân trần',
      en: 'Adenosma Herbal Tea',
      zh: '茵陈草本茶'
    },
    slug: 'tra-nhan-tran',
    categoryId: 'tra-thao-duoc',
    price: 80000,
    originalPrice: 100000,
    discount: 20,
    image: '/san-pham/tra-nhan-tran/01.png',
    images: [
      '/san-pham/tra-nhan-tran/01.png',
      '/san-pham/tra-nhan-tran/02.png',
      '/san-pham/tra-nhan-tran/03-1.png',
      '/san-pham/tra-nhan-tran/03.png',
    ],
    description: {
      vi: `
🌿 **Giới thiệu sản phẩm**

Nhân trần là loại trà rất quen thuộc trong đời sống người Việt, thường được nhắc đến khi nói về các loại nước uống thanh nhiệt. Trà nhân trần có hương thơm thảo mộc dịu, vị nhẹ, phù hợp với nhu cầu uống hằng ngày của nhiều đối tượng.

---

🧪 **Đặc tính nổi bật**

Theo các tài liệu công khai, nhân trần thường được biết đến với vai trò thanh nhiệt, lợi mật, hỗ trợ chức năng gan và tiêu hóa. Trong một số nguồn còn nhắc đến các hợp chất như coumarin dẫn xuất có liên quan tới tác dụng lợi mật trong nghiên cứu và sử dụng truyền thống.

---

💪 **Công dụng phổ biến**

- Hỗ trợ thanh nhiệt và cảm giác mát cơ thể  
- Phù hợp với người thường xuyên ăn đồ dầu mỡ hoặc cảm thấy nóng trong  
- Dùng như trà thảo mộc hỗ trợ gan và tiêu hóa theo cách dùng dân gian phổ biến  
- Thích hợp vào những ngày thời tiết nóng hoặc sau bữa ăn nhiều đạm béo  

---

🌱 **Nguồn gốc & chế biến**

- Thu hái tại vùng nguyên liệu Quảng Ngãi  
- Chọn nguyên liệu sạch, mùi thơm rõ  
- Phơi/sấy khô ở mức phù hợp để giữ hương thảo mộc  
- Đóng gói kín để hạn chế ẩm  

---

🍵 **Hướng dẫn sử dụng**

- Dùng 10–15g với 700ml nước nóng  
- Hãm 10 phút hoặc nấu nhẹ 5–7 phút  
- Dùng khi còn ấm hoặc để nguội tùy khẩu vị  

---

⚠️ **Lưu ý**

- Không nên xem đây là đồ uống “uống càng nhiều càng tốt”  
- Người có bệnh gan, mật hoặc đang dùng thuốc nên hỏi ý kiến chuyên môn khi dùng thường xuyên  
- Đây là trà thảo mộc hỗ trợ, không phải thuốc  

---

✨ **Điểm phù hợp**

Phù hợp với người muốn tìm một loại trà thảo mộc quen thuộc, dễ uống, thiên về thanh nhiệt và hỗ trợ sinh hoạt hằng ngày.
      `,
      en: `
🌿 **Product Overview**

Adenosma herbal tea is a familiar Vietnamese herbal tea often used as a body-cooling tea in daily life. It has a gentle herbal aroma and a mild taste.

🧪 **Natural profile**

Public references often associate this herb with traditional uses related to body-cooling, bile support, liver-support routines and digestive comfort.

💪 **Commonly used for**

- Gentle body-cooling tea  
- Herbal support for heavy or greasy-meal days  
- Daily liver-conscious herbal tea routines  

🍵 **Usage**

Brew 10–15g with 700ml hot water for about 10 minutes.

⚠️ **Note**

Supportive herbal tea only, not a medicine.
      `,
      zh: `
🌿 **产品介绍**

茵陈草本茶是越南日常生活中非常常见的草本饮品，常用于清热类日常饮用，香气温和，口感清淡。

🧪 **成分特点**

公开资料中，茵陈常与清热、利胆、护肝及消化支持等传统用途相关联。

💪 **常见用途**

- 温和清热  
- 油腻饮食后的草本饮品  
- 日常护肝型草本茶  

🍵 **饮用方法**

每次10–15克，以700毫升热水冲泡约10分钟。

⚠️ **注意**

本品为草本茶饮，不是药物。
      `,
    },
    shortDescription: {
      vi: 'Trà thảo mộc thanh nhiệt, dễ uống, phù hợp dùng hằng ngày',
      en: 'Gentle body-cooling herbal tea for daily use',
      zh: '适合日常饮用的清热草本茶'
    },
    origin: 'Quảng Ngãi, Việt Nam',
    certifications: ['Organic', 'HACCP'],
    rating: 4.6,
    soldCount: 1300,
    inStock: true,
    benefits: {
      vi: ['Thanh nhiệt', 'Hỗ trợ tiêu hóa', 'Trà quen thuộc hằng ngày'],
      en: ['Body-cooling support', 'Digestive comfort', 'Daily herbal tea'],
      zh: ['清热支持', '帮助消化', '日常草本饮品']
    },
    usage: {
      vi: 'Hãm 10–15g với 700ml nước nóng hoặc nấu nhẹ 5–7 phút',
      en: 'Brew 10–15g with 700ml hot water',
      zh: '10–15克，以700毫升热水冲泡或小火煮'
    },
    traceability: {
      qrCode: 'AGG-NT-008',
      batch: 'LOT2026-NT',
      productionDate: '2026-01-25',
      expiryDate: '2028-01-25',
      region: 'Mộ Đức, Quảng Ngãi',
      timeline: [
        { date: '2025-10-06', event: { vi: 'Theo dõi vùng nguyên liệu', en: 'Raw material monitoring', zh: '原料基地监测' } },
        { date: '2025-12-05', event: { vi: 'Thu hái nhân trần', en: 'Harvesting', zh: '采收' } },
        { date: '2025-12-14', event: { vi: 'Phân loại nguyên liệu', en: 'Material sorting', zh: '原料分级' } },
        { date: '2026-01-02', event: { vi: 'Sấy khô', en: 'Drying', zh: '干燥' } },
        { date: '2026-01-25', event: { vi: 'Đóng gói và truy xuất lô', en: 'Packaging and lot coding', zh: '包装与批次编码' } },
      ],
    },
  },

  {
    id: 'tra-tia-to',
    name: {
      vi: 'Trà tía tô',
      en: 'Perilla Herbal Tea',
      zh: '紫苏草本茶'
    },
    slug: 'tra-tia-to',
    categoryId: 'tra-thao-duoc',
    price: 70000,
    originalPrice: 90000,
    discount: 22,
    image: '/san-pham/tra-tia-to/Tra%20Tia%20To.png',
    images: [
      '/san-pham/tra-tia-to/Tra%20Tia%20To.png',
      '/san-pham/tra-tia-to/02.png',
      '/san-pham/tra-tia-to/03-1.png',
      '/san-pham/tra-tia-to/03.png',
    ],
    description: {
      vi: `
🌿 **Giới thiệu sản phẩm**

Tía tô là loại lá gia vị quen thuộc trong bữa ăn Việt, đồng thời cũng là một thảo dược được dùng rộng rãi trong dân gian. Khi được chế biến thành trà, tía tô mang hương thơm ấm, dễ chịu, phù hợp với người thích các loại trà thảo mộc dùng trong mùa lạnh hoặc khi cơ thể mệt mỏi nhẹ.

---

🧪 **Đặc tính nổi bật**

Các tài liệu phổ biến thường nhắc đến lá tía tô với đặc tính cay ấm, thường dùng trong các bài dân gian liên quan đến giải cảm, hỗ trợ tiêu hóa, làm dịu họng và chăm sóc hô hấp nhẹ. Một số nguồn cũng đề cập đến polyphenol, flavonoid và tinh dầu tự nhiên trong lá tía tô.

---

💪 **Công dụng phổ biến**

- Dùng như trà thảo mộc ấm cơ thể  
- Phù hợp khi thời tiết chuyển lạnh hoặc cơ thể hơi mệt  
- Hỗ trợ cảm giác dễ chịu ở cổ họng và tiêu hóa nhẹ  
- Thích hợp với người thích vị trà thơm đặc trưng, dễ uống  

---

🌱 **Nguồn gốc & chế biến**

- Lá tía tô tuyển chọn từ vùng trồng Hà Nội  
- Thu hái lá khỏe, thơm  
- Rửa sạch, sấy khô ở nhiệt độ phù hợp  
- Đóng gói kín để giữ mùi tinh dầu tự nhiên  

---

🍵 **Hướng dẫn sử dụng**

- Dùng 8–12g với 500–600ml nước nóng  
- Hãm 8–10 phút  
- Dùng 1–2 lần/ngày  

---

⚠️ **Lưu ý**

- Không nên uống quá đặc khi bụng quá đói  
- Người có cơ địa nhạy cảm hoặc đang điều trị bệnh lý nên hỏi ý kiến chuyên môn nếu dùng thường xuyên  
- Sản phẩm không phải thuốc  

---

✨ **Điểm phù hợp**

Phù hợp cho người thích trà thảo mộc mùi thơm ấm, muốn thêm một lựa chọn trà dùng linh hoạt trong sinh hoạt hằng ngày.
      `,
      en: `
🌿 **Product Overview**

Perilla herbal tea is made from a familiar culinary herb widely used in traditional daily care. It has a warm aromatic profile and is ideal for people who enjoy comforting herbal teas.

🧪 **Natural profile**

Public references often describe perilla leaves as warming herbs traditionally used in colds, mild digestive discomfort and throat-soothing routines.

💪 **Commonly used for**

- Warming daily herbal tea  
- Seasonal herbal comfort  
- Gentle throat and digestive support  

🍵 **Usage**

Brew 8–12g with 500–600ml hot water for 8–10 minutes.

⚠️ **Note**

Supportive herbal tea only, not a medicine.
      `,
      zh: `
🌿 **产品介绍**

紫苏草本茶由常见的紫苏叶制成，这种植物既是日常食材，也是传统民间常用草本。茶香温暖，适合喜欢舒适型草本茶的人群。

🧪 **成分特点**

公开资料常将紫苏叶与温性、日常感冒调理、轻度消化支持和咽喉舒缓等传统用途联系在一起。

💪 **常见用途**

- 温暖型日常草本茶  
- 季节变化时的草本舒适饮品  
- 轻度咽喉与消化支持  

🍵 **饮用方法**

每次8–12克，以500–600毫升热水冲泡8–10分钟。

⚠️ **注意**

本品为草本茶饮，不是药物。
      `,
    },
    shortDescription: {
      vi: 'Trà thảo mộc thơm ấm, phù hợp dùng khi thời tiết lạnh hoặc cơ thể mệt nhẹ',
      en: 'Warm aromatic herbal tea for daily comfort',
      zh: '温暖芳香的日常草本茶'
    },
    origin: 'Hà Nội, Việt Nam',
    certifications: ['HACCP'],
    rating: 4.5,
    soldCount: 960,
    inStock: true,
    benefits: {
      vi: ['Hương thơm ấm', 'Dễ dùng mùa lạnh', 'Hỗ trợ họng và tiêu hóa nhẹ'],
      en: ['Warm aroma', 'Seasonal comfort tea', 'Gentle throat support'],
      zh: ['温暖香气', '适合季节变化时饮用', '轻度咽喉支持']
    },
    usage: {
      vi: 'Hãm 8–12g với 500–600ml nước nóng trong 8–10 phút',
      en: 'Brew 8–12g with 500–600ml hot water',
      zh: '8–12克，以500–600毫升热水冲泡'
    },
    traceability: {
      qrCode: 'AGG-TTT-009',
      batch: 'LOT2026-TTT',
      productionDate: '2026-02-01',
      expiryDate: '2028-02-01',
      region: 'Gia Lâm, Hà Nội',
      timeline: [
        { date: '2025-11-08', event: { vi: 'Chăm sóc vùng lá nguyên liệu', en: 'Leaf cultivation maintenance', zh: '叶片原料基地养护' } },
        { date: '2025-12-26', event: { vi: 'Thu hoạch lá', en: 'Leaf harvesting', zh: '采叶' } },
        { date: '2025-12-30', event: { vi: 'Rửa sạch và tuyển chọn', en: 'Cleaning and selection', zh: '清洗筛选' } },
        { date: '2026-01-14', event: { vi: 'Sấy nhẹ giữ hương', en: 'Gentle drying to preserve aroma', zh: '低温干燥保香' } },
        { date: '2026-02-01', event: { vi: 'Đóng gói', en: 'Packaging', zh: '包装' } },
      ],
    },
  },

  {
    id: 'tra-voi',
    name: {
      vi: 'Trà vối truyền thống',
      en: 'Traditional Voi Leaf Tea',
      zh: '传统越南野叶茶'
    },
    slug: 'tra-voi',
    categoryId: 'tra-thao-duoc',
    price: 60000,
    originalPrice: 80000,
    discount: 25,
    image: '/san-pham/tra-voi/01.png',
    images: [
      '/san-pham/tra-voi/01.png',
      '/san-pham/tra-voi/02-1.png',
      '/san-pham/tra-voi/02.png',
      '/san-pham/tra-voi/03.png',
      '/san-pham/tra-voi/04.png',
    ],
    description: {
      vi: `
🌿 **Giới thiệu sản phẩm**

Trà vối là thức uống truyền thống quen thuộc của nhiều gia đình Việt Nam, đặc biệt ở miền Bắc và miền Trung. Lá hoặc nụ vối sau khi sơ chế và làm khô tạo nên thức uống có mùi thơm dịu, vị dễ uống, phù hợp dùng hằng ngày.

---

🧪 **Đặc tính nổi bật**

Trong các nguồn phổ biến về sức khỏe, lá và nụ vối thường được nhắc đến ở khía cạnh hỗ trợ tiêu hóa, thanh nhiệt và dùng như một loại nước uống thảo mộc sau bữa ăn. Một số nguồn cũng đề cập tanin, tinh dầu, flavonoid hoặc polyphenol như những nhóm hợp chất thường gặp khi nói về trà vối.

---

💪 **Công dụng phổ biến**

- Hỗ trợ tiêu hóa sau bữa ăn  
- Phù hợp với người hay đầy bụng, chướng nhẹ sau ăn  
- Dùng như trà thảo mộc thanh nhiệt hằng ngày  
- Có thể dùng như thức uống gia đình thay đổi khẩu vị so với trà xanh thông thường  

---

🌱 **Nguồn gốc & chế biến**

- Nguyên liệu từ vùng Thanh Hóa  
- Thu hái lá hoặc nụ vối đúng giai đoạn  
- Làm sạch, vò nhẹ và sấy khô  
- Kiểm soát độ ẩm và mùi thơm trước khi đóng gói  

---

🍵 **Hướng dẫn sử dụng**

- Dùng 10–15g với 700ml nước nóng  
- Hãm 10–15 phút hoặc đun nhẹ  
- Dùng sau bữa ăn hoặc trong ngày  

---

⚠️ **Lưu ý**

- Không nên uống quá đặc khi bụng đói  
- Người có vấn đề tiêu hóa đặc biệt hoặc đang điều trị bệnh nên cân nhắc hỏi ý kiến chuyên môn  
- Sản phẩm không phải thuốc  

---

✨ **Điểm phù hợp**

Đây là loại trà rất phù hợp cho nhu cầu dùng hằng ngày, đặc biệt với người thích hương vị truyền thống Việt Nam và các loại trà nhẹ, dễ uống.
      `,
      en: `
🌿 **Product Overview**

Voi leaf tea is a traditional Vietnamese herbal drink made from leaves or buds, known for its mild taste and suitability as a family-friendly daily tea.

🧪 **Natural profile**

Public health references often associate voi leaves and buds with digestive support, body-cooling use and post-meal herbal tea routines.

💪 **Commonly used for**

- Digestive comfort after meals  
- Daily body-cooling herbal tea  
- Gentle family-style herbal drink  

🍵 **Usage**

Brew 10–15g with 700ml hot water for 10–15 minutes.

⚠️ **Note**

Supportive herbal tea only, not a medicine.
      `,
      zh: `
🌿 **产品介绍**

越南野叶茶是越南家庭中常见的传统饮品，可由叶片或花蕾制成，口感温和，适合作为家用日常茶饮。

🧪 **成分特点**

公开健康资料中，野叶或其花蕾常与消化支持、清热及餐后草本饮用习惯相关联。

💪 **常见用途**

- 餐后消化支持  
- 日常清热草本茶  
- 适合家庭长期饮用  

🍵 **饮用方法**

每次10–15克，以700毫升热水冲泡10–15分钟。

⚠️ **注意**

本品为草本茶饮，不是药物。
      `,
    },
    shortDescription: {
      vi: 'Thức uống thảo mộc truyền thống, hỗ trợ tiêu hóa và phù hợp dùng hằng ngày',
      en: 'Traditional herbal tea for daily digestive comfort',
      zh: '适合日常饮用的传统消化型草本茶'
    },
    origin: 'Thanh Hóa, Việt Nam',
    certifications: ['HACCP'],
    rating: 4.6,
    soldCount: 2000,
    inStock: true,
    benefits: {
      vi: ['Hỗ trợ tiêu hóa', 'Dùng sau bữa ăn', 'Trà gia đình dễ uống'],
      en: ['Digestive comfort', 'After-meal tea', 'Easy daily drinking'],
      zh: ['帮助消化', '适合餐后饮用', '家庭日常茶饮']
    },
    usage: {
      vi: 'Hãm 10–15g với 700ml nước nóng, dùng sau bữa ăn hoặc trong ngày',
      en: 'Brew 10–15g with 700ml hot water',
      zh: '10–15克，以700毫升热水冲泡'
    },
    traceability: {
      qrCode: 'AGG-TV-010',
      batch: 'LOT2026-TV',
      productionDate: '2026-02-06',
      expiryDate: '2028-02-06',
      region: 'Thọ Xuân, Thanh Hóa',
      timeline: [
        { date: '2025-10-18', event: { vi: 'Theo dõi vùng vối nguyên liệu', en: 'Raw material grove monitoring', zh: '原料林地监测' } },
        { date: '2025-12-10', event: { vi: 'Thu hái lá/nụ vối', en: 'Harvesting leaves/buds', zh: '采收叶片/花蕾' } },
        { date: '2025-12-18', event: { vi: 'Làm sạch và vò nhẹ', en: 'Cleaning and light rolling', zh: '清洗轻揉' } },
        { date: '2026-01-09', event: { vi: 'Sấy khô', en: 'Drying', zh: '干燥' } },
        { date: '2026-02-06', event: { vi: 'Đóng gói thành phẩm', en: 'Final packaging', zh: '成品包装' } },
      ],
    },
  },
    {
        id: "dong-trung-ha-thao",
        name: {
            vi: "Đông trùng hạ thảo nguyên con",
            en: "Cordyceps Whole",
            zh: "冬虫夏草",
        },
        slug: "dong-trung-ha-thao",
        categoryId: "duoc-lieu",
        price: 2500000,
        originalPrice: 3000000,
        discount: 17,
        image: "https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop",
        ],
        description: {
            vi: "Đông trùng hạ thảo nguyên con được nuôi trồng tại Việt Nam theo quy trình hiện đại, đảm bảo chất lượng và an toàn.",
            en: "Whole cordyceps cultivated in Vietnam using modern processes, ensuring quality and safety.",
            zh: "越南现代化种植的冬虫夏草，保证质量和安全。",
        },
        shortDescription: {
            vi: "Hỗ trợ tăng cường sức khỏe, bồi bổ cơ thể",
            en: "Supports health enhancement and body nourishment",
            zh: "支持健康增强和身体滋养",
        },
        origin: "Lâm Đồng, Việt Nam",
        certifications: ["HACCP", "ISO 22000", "Organic"],
        rating: 4.8,
        soldCount: 1250,
        inStock: true,
        traceability: {
            qrCode: "AGG-DTHT-001",
            batch: "LOT2024-001",
            productionDate: "2024-01-15",
            expiryDate: "2026-01-15",
            region: "Đà Lạt, Lâm Đồng",
            timeline: [
                {
                    date: "2023-10-01",
                    event: {
                        vi: "Gieo trồng giống",
                        en: "Seeding",
                        zh: "播种",
                    },
                },
                {
                    date: "2023-12-15",
                    event: { vi: "Thu hoạch", en: "Harvest", zh: "收获" },
                },
                {
                    date: "2024-01-05",
                    event: {
                        vi: "Sơ chế và đóng gói",
                        en: "Processing and packaging",
                        zh: "加工包装",
                    },
                },
                {
                    date: "2024-01-15",
                    event: {
                        vi: "Kiểm định chất lượng",
                        en: "Quality testing",
                        zh: "质量检测",
                    },
                },
            ],
        },
    },
    {
        id: "nhan-sam-thai-lat",
        name: { vi: "Nhân sâm thái lát", en: "Sliced Ginseng", zh: "切片人参" },
        slug: "nhan-sam-thai-lat",
        categoryId: "duoc-lieu",
        price: 1800000,
        originalPrice: 2200000,
        discount: 18,
        image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&h=400&fit=crop",
        description: {
            vi: "Nhân sâm Hàn Quốc được thái lát mỏng, tiện sử dụng, dễ bảo quản.",
            en: "Korean ginseng thinly sliced for convenient use and easy storage.",
            zh: "韩国人参切成薄片，方便使用，易于保存。",
        },
        origin: "Hàn Quốc",
        rating: 4.9,
        soldCount: 890,
        inStock: true,
    },
    {
        id: "tra-gung-mat-ong",
        name: {
            vi: "Trà gừng mật ong",
            en: "Ginger Honey Tea",
            zh: "生姜蜂蜜茶",
        },
        slug: "tra-gung-mat-ong",
        categoryId: "tra-thao-duoc",
        price: 150000,
        originalPrice: 180000,
        discount: 17,
        image: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=400&h=400&fit=crop",
        description: {
            vi: "Trà gừng mật ong tự nhiên, hỗ trợ giữ ấm cơ thể, tốt cho tiêu hóa.",
            en: "Natural ginger honey tea, helps keep body warm, good for digestion.",
            zh: "天然生姜蜂蜜茶，有助于保暖身体，有益消化。",
        },
        origin: "Hưng Yên, Việt Nam",
        rating: 4.7,
        soldCount: 2150,
        inStock: true,
    },
    {
        id: "bot-can-tay",
        name: {
            vi: "Bột cần tây nguyên chất",
            en: "Pure Celery Powder",
            zh: "纯芹菜粉",
        },
        slug: "bot-can-tay",
        categoryId: "bot-vien-nang",
        price: 250000,
        originalPrice: 300000,
        discount: 17,
        image: "https://images.unsplash.com/photo-1628773822503-930a7eaecf80?w=400&h=400&fit=crop",
        description: {
            vi: "Bột cần tây nguyên chất, không chất bảo quản, hỗ trợ thanh lọc cơ thể.",
            en: "Pure celery powder, no preservatives, supports body detoxification.",
            zh: "纯芹菜粉，无防腐剂，支持身体排毒。",
        },
        origin: "Đà Lạt, Việt Nam",
        rating: 4.6,
        soldCount: 1780,
        inStock: true,
    },
    {
        id: "vien-thao-duoc",
        name: {
            vi: "Viên thảo dược hỗ trợ giấc ngủ",
            en: "Sleep Support Herbal Capsules",
            zh: "睡眠支持草药胶囊",
        },
        slug: "vien-thao-duoc-giac-ngu",
        categoryId: "bot-vien-nang",
        price: 350000,
        originalPrice: 420000,
        discount: 17,
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop",
        description: {
            vi: "Viên thảo dược từ thiên nhiên, hỗ trợ cải thiện chất lượng giấc ngủ.",
            en: "Natural herbal capsules, support improving sleep quality.",
            zh: "天然草药胶囊，支持改善睡眠质量。",
        },
        origin: "Việt Nam",
        rating: 4.5,
        soldCount: 950,
        inStock: true,
    },
    {
        id: "bun-gao-lut",
        name: {
            vi: "Bún gạo lứt sạch",
            en: "Clean Brown Rice Noodles",
            zh: "清洁糙米粉",
        },
        slug: "bun-gao-lut",
        categoryId: "thuc-pham-sach",
        price: 45000,
        originalPrice: 55000,
        discount: 18,
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=400&fit=crop",
        description: {
            vi: "Bún gạo lứt 100% từ gạo lứt hữu cơ, giàu chất xơ, tốt cho sức khỏe.",
            en: "100% organic brown rice noodles, rich in fiber, good for health.",
            zh: "100%有机糙米粉，富含纤维，有益健康。",
        },
        origin: "Thái Bình, Việt Nam",
        rating: 4.8,
        soldCount: 3200,
        inStock: true,
    },
    {
        id: "mien-dong",
        name: {
            vi: "Miến dong nguyên chất",
            en: "Pure Canna Noodles",
            zh: "纯美人蕉粉丝",
        },
        slug: "mien-dong",
        categoryId: "thuc-pham-sach",
        price: 55000,
        originalPrice: 65000,
        discount: 15,
        image: "https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&h=400&fit=crop",
        description: {
            vi: "Miến dong làm từ củ dong riềng tự nhiên, không hóa chất.",
            en: "Canna noodles made from natural canna roots, no chemicals.",
            zh: "由天然美人蕉根制成的粉丝，无化学物质。",
        },
        origin: "Bắc Kạn, Việt Nam",
        rating: 4.7,
        soldCount: 2800,
        inStock: true,
    },
    {
        id: "ngu-coc-dinh-duong",
        name: {
            vi: "Ngũ cốc dinh dưỡng 5 loại hạt",
            en: "5-Grain Nutritional Cereal",
            zh: "五谷营养麦片",
        },
        slug: "ngu-coc-dinh-duong",
        categoryId: "thuc-pham-sach",
        price: 180000,
        originalPrice: 220000,
        discount: 18,
        image: "https://images.unsplash.com/photo-1517093728432-a0440f8d45af?w=400&h=400&fit=crop",
        description: {
            vi: "Ngũ cốc từ 5 loại hạt quý: yến mạch, hạt chia, hạt điều, hạt óc chó, hạt macca.",
            en: "Cereal from 5 precious grains: oats, chia, cashew, walnut, macadamia.",
            zh: "五种珍贵谷物麦片：燕麦、奇亚籽、腰果、核桃、夏威夷果。",
        },
        origin: "Việt Nam",
        rating: 4.9,
        soldCount: 1560,
        inStock: true,
    },
    {
        id: "tra-atiso",
        name: {
            vi: "Trà Atiso Đà Lạt",
            en: "Dalat Artichoke Tea",
            zh: "大叻朝鲜蓟茶",
        },
        slug: "tra-atiso",
        categoryId: "tra-thao-duoc",
        price: 120000,
        originalPrice: 150000,
        discount: 20,
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop",
        description: {
            vi: "Trà Atiso Đà Lạt, hỗ trợ thanh nhiệt, mát gan, tốt cho tiêu hóa.",
            en: "Dalat artichoke tea, supports cooling, liver health, good digestion.",
            zh: "大叻朝鲜蓟茶，支持清热、护肝、促进消化。",
        },
        origin: "Đà Lạt, Việt Nam",
        rating: 4.6,
        soldCount: 2340,
        inStock: true,
    },
    {
        id: "mat-ong-rung",
        name: {
            vi: "Mật ong rừng nguyên chất",
            en: "Pure Wild Honey",
            zh: "纯野生蜂蜜",
        },
        slug: "mat-ong-rung",
        categoryId: "duoc-lieu",
        price: 450000,
        originalPrice: 550000,
        discount: 18,
        image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop",
        description: {
            vi: "Mật ong rừng nguyên chất từ Tây Nguyên, không pha trộn, giàu dinh dưỡng.",
            en: "Pure wild honey from Central Highlands, no additives, rich in nutrients.",
            zh: "来自中部高地的纯野生蜂蜜，无添加剂，营养丰富。",
        },
        origin: "Tây Nguyên, Việt Nam",
        rating: 4.9,
        soldCount: 1890,
        inStock: true,
    },
];

export const membershipPackages: MembershipPackage[] = [
    {
        id: "basic",
        name: { vi: "Gói dùng thử", en: "Trial Package", zh: "试用套餐" },
        price: 15000,
        description: {
            vi: "Trải nghiệm quyền lợi thành viên cơ bản",
            en: "Experience basic membership benefits",
            zh: "体验基本会员权益",
        },
        benefits: [
            {
                vi: "Voucher giảm 10% đơn hàng đầu tiên",
                en: "10% off first order voucher",
                zh: "首单10%折扣券",
            },
            {
                vi: "Tài liệu sức khỏe miễn phí",
                en: "Free health documents",
                zh: "免费健康资料",
            },
            {
                vi: "Newsletter chăm sóc sức khỏe",
                en: "Health care newsletter",
                zh: "健康护理通讯",
            },
        ],
        image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=400&h=300&fit=crop",
    },
    {
        id: "standard",
        name: { vi: "Gói tiêu chuẩn", en: "Standard Package", zh: "标准套餐" },
        price: 299000,
        description: {
            vi: "Combo trà thảo dược + tư vấn online",
            en: "Herbal tea combo + online consultation",
            zh: "草药茶套餐 + 在线咨询",
        },
        benefits: [
            {
                vi: "Combo 3 loại trà thảo dược",
                en: "3 types of herbal tea combo",
                zh: "3种草药茶套餐",
            },
            {
                vi: "1 buổi tư vấn online với y sĩ",
                en: "1 online consultation with practitioner",
                zh: "1次在线医师咨询",
            },
            {
                vi: "Giảm 15% tất cả sản phẩm",
                en: "15% off all products",
                zh: "所有产品15%折扣",
            },
            {
                vi: "Ebook cẩm nang sức khỏe",
                en: "Health handbook ebook",
                zh: "健康手册电子书",
            },
        ],
        image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop",
        featured: true,
    },
    {
        id: "family",
        name: { vi: "Gói gia đình", en: "Family Package", zh: "家庭套餐" },
        price: 999000,
        description: {
            vi: "Combo chăm sóc sức khỏe cho cả gia đình",
            en: "Health care combo for the whole family",
            zh: "全家健康护理套餐",
        },
        benefits: [
            {
                vi: "Combo sản phẩm cho 4 người",
                en: "Product combo for 4 people",
                zh: "4人产品套餐",
            },
            {
                vi: "3 buổi tư vấn online",
                en: "3 online consultations",
                zh: "3次在线咨询",
            },
            {
                vi: "Giảm 20% tất cả sản phẩm",
                en: "20% off all products",
                zh: "所有产品20%折扣",
            },
            { vi: "Tích điểm x2", en: "Double points", zh: "双倍积分" },
            { vi: "Quà tặng sinh nhật", en: "Birthday gift", zh: "生日礼物" },
        ],
        image: "https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?w=400&h=300&fit=crop",
    },
    {
        id: "vip",
        name: { vi: "Gói VIP", en: "VIP Package", zh: "VIP套餐" },
        price: 3000000,
        description: {
            vi: "Quyền lợi cao cấp dành cho thành viên VIP",
            en: "Premium benefits for VIP members",
            zh: "VIP会员高级权益",
        },
        benefits: [
            {
                vi: "Tư vấn định kỳ hàng tháng",
                en: "Monthly regular consultation",
                zh: "每月定期咨询",
            },
            {
                vi: "Giảm 30% tất cả sản phẩm",
                en: "30% off all products",
                zh: "所有产品30%折扣",
            },
            {
                vi: "Miễn phí vận chuyển trọn đời",
                en: "Free lifetime shipping",
                zh: "终身免运费",
            },
            {
                vi: "Quà tặng VIP hàng quý",
                en: "Quarterly VIP gifts",
                zh: "季度VIP礼物",
            },
            {
                vi: "Ưu tiên đặt lịch y sĩ",
                en: "Priority practitioner booking",
                zh: "优先预约医师",
            },
            {
                vi: "Tham gia sự kiện độc quyền",
                en: "Exclusive event access",
                zh: "专属活动参与",
            },
        ],
        image: "https://images.unsplash.com/photo-1557425955-df376b5903c8?w=400&h=300&fit=crop",
    },
];

export const membershipLevels: MembershipLevel[] = [
    {
        id: "member",
        level: "member",
        minSpent: 0,
        discount: 0,
        pointMultiplier: 1,
        freeShipping: false,
        prioritySupport: false,
        exclusiveOffers: false,
    },
    {
        id: "silver",
        level: "silver",
        minSpent: 2000000,
        discount: 5,
        pointMultiplier: 1.2,
        freeShipping: false,
        prioritySupport: false,
        exclusiveOffers: false,
    },
    {
        id: "gold",
        level: "gold",
        minSpent: 5000000,
        discount: 10,
        pointMultiplier: 1.5,
        freeShipping: true,
        prioritySupport: false,
        exclusiveOffers: true,
    },
    {
        id: "platinum",
        level: "platinum",
        minSpent: 10000000,
        discount: 15,
        pointMultiplier: 2,
        freeShipping: true,
        prioritySupport: true,
        exclusiveOffers: true,
    },
    {
        id: "diamond",
        level: "diamond",
        minSpent: 20000000,
        discount: 20,
        pointMultiplier: 3,
        freeShipping: true,
        prioritySupport: true,
        exclusiveOffers: true,
    },
];

export const doctors: Doctor[] = [
    {
        id: "dr-nguyen",
        name: "Ths.Bs Nguyễn Văn An",
        title: { vi: "Thạc sĩ Bác sĩ", en: "Master Doctor", zh: "医学硕士" },
        specialty: {
            vi: "Y học cổ truyền",
            en: "Traditional Medicine",
            zh: "传统医学",
        },
        experience: 15,
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop",
        consultationType: ["online", "offline"],
        consultationTypes: ["online", "offline"],
        nextAvailable: "09:00 - 25/04/2024",
        rating: 4.9,
    },
    {
        id: "dr-tran",
        name: "Bs.CKII Trần Thị Bình",
        title: {
            vi: "Bác sĩ Chuyên khoa II",
            en: "Specialist Doctor II",
            zh: "专科医师II",
        },
        specialty: {
            vi: "Dinh dưỡng lâm sàng",
            en: "Clinical Nutrition",
            zh: "临床营养",
        },
        experience: 12,
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop",
        consultationType: ["online"],
        consultationTypes: ["online"],
        nextAvailable: "14:00 - 25/04/2024",
        rating: 4.8,
    },
    {
        id: "dr-le",
        name: "Lương y Lê Văn Cường",
        title: { vi: "Lương y", en: "Herbalist", zh: "中医师" },
        specialty: {
            vi: "Dược liệu và bài thuốc dân gian",
            en: "Herbs and Folk Remedies",
            zh: "草药和民间药方",
        },
        experience: 25,
        image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&h=300&fit=crop",
        consultationType: ["online", "offline"],
        consultationTypes: ["online", "offline"],
        nextAvailable: "08:30 - 26/04/2024",
        rating: 5.0,
    },
    {
        id: "dr-pham",
        name: "Ths.Bs Phạm Minh Đức",
        title: { vi: "Thạc sĩ Bác sĩ", en: "Master Doctor", zh: "医学硕士" },
        specialty: {
            vi: "Châm cứu và vật lý trị liệu",
            en: "Acupuncture and Physiotherapy",
            zh: "针灸和理疗",
        },
        experience: 18,
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&h=300&fit=crop",
        consultationType: ["offline"],
        consultationTypes: ["offline"],
        nextAvailable: "10:00 - 26/04/2024",
        rating: 4.7,
    },
    {
        id: "dr-hoang",
        name: "Bs.CKI Hoàng Thị Mai",
        title: {
            vi: "Bác sĩ Chuyên khoa I",
            en: "Specialist Doctor I",
            zh: "专科医师I",
        },
        specialty: {
            vi: "Nội tiết và chuyển hóa",
            en: "Endocrinology and Metabolism",
            zh: "内分泌与代谢",
        },
        experience: 10,
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=300&fit=crop",
        consultationType: ["online", "offline"],
        consultationTypes: ["online", "offline"],
        nextAvailable: "15:30 - 25/04/2024",
        rating: 4.8,
    },
    {
        id: "dr-vu",
        name: "PGS.TS Vũ Đình Nam",
        title: {
            vi: "Phó Giáo sư Tiến sĩ",
            en: "Associate Professor PhD",
            zh: "副教授博士",
        },
        specialty: {
            vi: "Nghiên cứu dược liệu",
            en: "Medicinal Plant Research",
            zh: "药用植物研究",
        },
        experience: 30,
        image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop",
        consultationType: ["online"],
        consultationTypes: ["online"],
        nextAvailable: "09:00 - 27/04/2024",
        rating: 5.0,
    },
];

export const articles: Article[] = [
    {
        id: "bai-thuoc-cam-cum",
        title: {
            vi: "Bài thuốc dân gian hỗ trợ phòng cảm cúm mùa đông",
            en: "Folk remedies to support winter flu prevention",
            zh: "支持预防冬季流感的民间药方",
        },
        slug: "bai-thuoc-cam-cum-mua-dong",
        excerpt: {
            vi: "Tham khảo các bài thuốc từ gừng, mật ong, tỏi được kinh nghiệm dân gian ghi nhận hỗ trợ phòng ngừa cảm cúm.",
            en: "Reference folk remedies from ginger, honey, garlic recorded to support flu prevention.",
            zh: "参考记录的生姜、蜂蜜、大蒜民间药方，支持预防流感。",
        },
        image: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=600&h=400&fit=crop",
        category: "bai-thuoc",
        tags: ["cảm cúm", "mùa đông", "gừng", "mật ong"],
        publishedAt: "2024-04-15",
        author: "Lương y Lê Văn Cường",
    },
    {
        id: "thanh-nhiet-mat-gan",
        title: {
            vi: "Các loại trà thảo dược hỗ trợ thanh nhiệt, mát gan",
            en: "Herbal teas to support cooling and liver health",
            zh: "支持清热护肝的草药茶",
        },
        slug: "tra-thao-duoc-thanh-nhiet-mat-gan",
        excerpt: {
            vi: "Khám phá các loại trà từ Atiso, râu ngô, diệp hạ châu được nhiều người tin dùng để hỗ trợ sức khỏe gan.",
            en: "Discover teas from artichoke, corn silk, phyllanthus trusted by many to support liver health.",
            zh: "发现朝鲜蓟、玉米须、叶下珠茶，被许多人信赖支持肝脏健康。",
        },
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&h=400&fit=crop",
        category: "bai-thuoc",
        tags: ["thanh nhiệt", "mát gan", "trà thảo dược"],
        publishedAt: "2024-04-10",
        author: "Ths.Bs Nguyễn Văn An",
    },
    {
        id: "ngu-coc-buoi-sang",
        title: {
            vi: "Lợi ích của ngũ cốc dinh dưỡng cho bữa sáng",
            en: "Benefits of nutritional cereals for breakfast",
            zh: "营养麦片早餐的好处",
        },
        slug: "loi-ich-ngu-coc-dinh-duong",
        excerpt: {
            vi: "Tìm hiểu vì sao ngũ cốc từ các loại hạt được khuyến nghị cho bữa sáng lành mạnh.",
            en: "Learn why grain cereals are recommended for a healthy breakfast.",
            zh: "了解为什么谷物麦片被推荐作为健康早餐。",
        },
        image: "https://images.unsplash.com/photo-1517093728432-a0440f8d45af?w=600&h=400&fit=crop",
        category: "dinh-duong",
        tags: ["ngũ cốc", "bữa sáng", "dinh dưỡng"],
        publishedAt: "2024-04-05",
        author: "Bs.CKII Trần Thị Bình",
    },
    {
        id: "dong-trung-ha-thao",
        title: {
            vi: "Đông trùng hạ thảo: Nguồn gốc và cách sử dụng",
            en: "Cordyceps: Origin and usage methods",
            zh: "冬虫夏草：起源与使用方法",
        },
        slug: "dong-trung-ha-thao-nguon-goc-cach-su-dung",
        excerpt: {
            vi: "Tìm hiểu về đông trùng hạ thảo, dược liệu quý được nghiên cứu về tiềm năng hỗ trợ sức khỏe.",
            en: "Learn about cordyceps, a precious herb researched for potential health support.",
            zh: "了解冬虫夏草，这种珍贵草药因其潜在的健康支持作用而被研究。",
        },
        image: "https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?w=600&h=400&fit=crop",
        category: "duoc-lieu",
        tags: ["đông trùng hạ thảo", "dược liệu", "bổ dưỡng"],
        publishedAt: "2024-04-01",
        author: "PGS.TS Vũ Đình Nam",
    },
];


export const notifications: Notification[] = [
    {
        id: 'mock-promo-1',
        userId: 'user-1',
        title: {
            vi: 'Mã giảm giá GIAM20K đã sẵn sàng!',
            en: 'Voucher GIAM20K is ready!',
            zh: '折扣码 GIAM20K 已就绪！',
        },
        content: {
            vi: 'Nhận ngay giảm giá 20,000đ cho đơn hàng từ 150,000đ khi thanh toán.',
            en: 'Get 20,000 VND off for orders from 150,000 VND at checkout.',
            zh: '结账时订单满 150,000 VND 即可立减 20,000 VND。',
        },
        type: 'promotion',
        relatedId: 'GIAM20K',
        isRead: false,
        createdAt: '2026-06-22T00:00:00.000Z',
    },
    {
        id: 'mock-system-1',
        userId: 'user-1',
        title: {
            vi: 'Đặc quyền hạng thành viên mới',
            en: 'New Membership Privileges',
            zh: '新会员等级特权',
        },
        content: {
            vi: 'Nâng cấp chi tiêu tích điểm để nhận nhân hệ số điểm thưởng lên tới x2.0.',
            en: 'Upgrade spending to earn points with multipliers up to x2.0.',
            zh: '升级消费以获取积分，积分系数最高可翻 2.0 倍。',
        },
        type: 'system',
        isRead: false,
        createdAt: '2026-06-22T01:00:00.000Z',
    }
];

export const translations = {
    vi: vietnamese,
    en: english,
    zh: chinese,
};

export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(price);
};
