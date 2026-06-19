const steps = [
  {
    step: "1",
    title: "Đăng ký tài khoản",
    desc: "Tạo tài khoản miễn phí trên website hoặc ứng dụng",
  },
  {
    step: "2",
    title: "Mua sắm tích điểm",
    desc: "Mua sản phẩm để tích lũy điểm và nâng cấp hạng",
  },
  {
    step: "3",
    title: "Nâng cấp hạng",
    desc: "Đạt mức chi tiêu để lên hạng cao hơn",
  },
  {
    step: "4",
    title: "Tận hưởng ưu đãi",
    desc: "Nhận các quyền lợi theo cấp bậc thành viên",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Cách thức hoạt động</h2>
        <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {steps.map((item, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
