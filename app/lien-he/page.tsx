"use client";

import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/context/language-context";
import Breadcrumb from "@/components/Breadcrumb";

const contactInfo = [
  {
    icon: MapPin,
    title: { vi: "Địa chỉ", en: "Address", zh: "地址" },
    details: {
      vi: ["123 Nguyễn Huệ, Quận 1", "TP. Hồ Chí Minh, Việt Nam"],
      en: ["123 Nguyen Hue, District 1", "Ho Chi Minh City, Vietnam"],
      zh: ["阮惠街123号，第一区", "胡志明市，越南"],
    },
  },
  {
    icon: Phone,
    title: { vi: "Điện thoại", en: "Phone", zh: "电话" },
    details: {
      vi: ["Hotline: 1800 1234", "Tư vấn: 0901 234 567"],
      en: ["Hotline: 1800 1234", "Consultation: 0901 234 567"],
      zh: ["热线：1800 1234", "咨询：0901 234 567"],
    },
  },
  {
    icon: Mail,
    title: { vi: "Email", en: "Email", zh: "电子邮箱" },
    details: {
      vi: ["info@angiagreen.vn", "support@angiagreen.vn"],
      en: ["info@angiagreen.vn", "support@angiagreen.vn"],
      zh: ["info@angiagreen.vn", "support@angiagreen.vn"],
    },
  },
  {
    icon: Clock,
    title: { vi: "Giờ làm việc", en: "Working Hours", zh: "工作时间" },
    details: {
      vi: ["Thứ 2 - Thứ 6: 8:00 - 18:00", "Thứ 7 - CN: 8:00 - 12:00"],
      en: ["Mon - Fri: 8:00 - 18:00", "Sat - Sun: 8:00 - 12:00"],
      zh: ["周一 - 周五: 8:00 - 18:00", "周六 - 周日: 8:00 - 12:00"],
    },
  },
];

const subjects = [
  { id: "product", label: { vi: "Tư vấn sản phẩm", en: "Product Consultation", zh: "产品咨询" } },
  { id: "order", label: { vi: "Hỗ trợ đơn hàng", en: "Order Support", zh: "订单支持" } },
  { id: "feedback", label: { vi: "Góp ý dịch vụ", en: "Service Feedback", zh: "服务反馈" } },
  { id: "cooperate", label: { vi: "Hợp tác kinh doanh", en: "Business Cooperation", zh: "商务合作" } },
  { id: "other", label: { vi: "Khác", en: "Other", zh: "其他" } },
];

export default function ContactPage() {
  const { language, t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: t("home"), href: "/" },
            { label: t("contact"), href: "/lien-he" },
          ]}
        />

        <div className="mt-6 mb-8 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t("contactTitle")}</h1>
          <p className="text-lg text-muted-foreground">
            {t("contactSubtitle")}
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {contactInfo.map((info, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{info.title[language]}</h3>
                {info.details[language].map((detail, i) => (
                  <p key={i} className="text-sm text-muted-foreground">
                    {detail}
                  </p>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                {t("sendMessageTitle")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t("thankYouContact")}</h3>
                  <p className="text-muted-foreground mb-4">
                    {t("contactSuccessDesc")}
                  </p>
                  <Button onClick={() => setIsSubmitted(false)}>{t("sendAnotherMessage")}</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t("fullNameLabel")}</Label>
                      <Input
                        id="name"
                        placeholder="Nguyen Van A"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t("phoneLabel")}</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="0901234567"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">{t("emailLabel")}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">{t("subjectLabel")}</Label>
                    <Select
                      value={formData.subject}
                      onValueChange={(value) =>
                        setFormData({ ...formData, subject: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t("selectSubject")} />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject.id} value={subject.id}>
                            {subject.label[language]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{t("messageLabel")}</Label>
                    <Textarea
                      id="message"
                      placeholder={t("messagePlaceholder")}
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t("sendingButton")}
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        {t("sendMessageButton")}
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Map */}
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                {t("storeLocation")}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative h-[400px] bg-muted">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4946681135!2d106.69929!3d10.7756587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4670702e31%3A0xa5777fb3853c3c36!2zMTIzIMSQLiBOZ3V54buFbiBIdeG7hywgQuG6v24gTmdow6ksIFF14bqtbiAxLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1635000000000!5m2!1svi!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="An Gia Green Location"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-8">{t("faqTitle")}</h2>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {[
              {
                q: t("faq1Q"),
                a: t("faq1A"),
              },
              {
                q: t("faq2Q"),
                a: t("faq2A"),
              },
              {
                q: t("faq3Q"),
                a: t("faq3A"),
              },
              {
                q: t("faq4Q"),
                a: t("faq4A"),
              },
            ].map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-5">
                  <h3 className="font-semibold mb-2">{faq.q}</h3>
                  <p className="text-sm text-muted-foreground">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
