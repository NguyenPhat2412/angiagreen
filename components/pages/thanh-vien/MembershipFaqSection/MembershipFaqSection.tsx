import { Card, CardContent } from "@/components/ui/card";

const faqs = [
  {
    q: "Làm sao để trở thành thành viên?",
    a: "Bạn chỉ cần đăng ký tài khoản trên website hoặc ứng dụng An Gia Green là đã trở thành thành viên cấp Member.",
  },
  {
    q: "Điểm thưởng có hạn sử dụng không?",
    a: "Điểm thưởng có hiệu lực trong vòng 12 tháng kể từ ngày tích lũy. Bạn có thể theo dõi điểm trong phần tài khoản.",
  },
  {
    q: "Làm sao để nâng cấp hạng thành viên?",
    a: "Hạng thành viên được nâng cấp dựa trên tổng chi tiêu trong 12 tháng. Khi đạt mức chi tiêu của hạng mới, bạn sẽ được tự động nâng cấp.",
  },
  {
    q: "Tôi có mất quyền lợi khi không mua hàng lâu ngày?",
    a: "Hạng thành viên sẽ được đánh giá lại mỗi 12 tháng. Nếu không đạt mức chi tiêu tối thiểu, hạng sẽ được điều chỉnh tương ứng.",
  },
];

export function MembershipFaqSection() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Câu hỏi thường gặp</h2>
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <CardContent className="p-5">
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
