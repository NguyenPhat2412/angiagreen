import { Crown, Gift, HeartHandshake, Percent, Star, Truck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const benefits = [
  {
    icon: Percent,
    title: "Giảm giá độc quyền",
    description: "Nhận ưu đãi giảm giá lên đến 15% cho toàn bộ sản phẩm",
  },
  {
    icon: Gift,
    title: "Quà tặng sinh nhật",
    description: "Nhận quà tặng đặc biệt vào tháng sinh nhật của bạn",
  },
  {
    icon: Truck,
    title: "Miễn phí vận chuyển",
    description: "Miễn phí ship cho mọi đơn hàng từ cấp Vàng trở lên",
  },
  {
    icon: HeartHandshake,
    title: "Tư vấn ưu tiên",
    description: "Được ưu tiên tư vấn với chuyên gia hàng đầu",
  },
  {
    icon: Star,
    title: "Tích điểm đổi quà",
    description: "Tích lũy điểm và đổi quà trị giá lên đến 500.000đ",
  },
  {
    icon: Crown,
    title: "Sự kiện VIP",
    description: "Tham gia các sự kiện sức khỏe dành riêng cho thành viên",
  },
];

export function MemberBenefitsSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Quyền lợi thành viên</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Tham gia chương trình thành viên để nhận được nhiều ưu đãi độc quyền
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                  <benefit.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
