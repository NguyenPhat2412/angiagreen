import { Award, Calendar, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function WhyChooseExpertsSection() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Tai sao chon chuyen gia An Gia Green?
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="text-center">
            <CardContent className="p-6">
              <Award className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Chuyen mon cao</h3>
              <p className="text-sm text-muted-foreground">
                Doi ngu duoc dao tao bai ban, co chung chi hanh nghe va kinh nghiem
                thuc te
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Tan tam tu van</h3>
              <p className="text-sm text-muted-foreground">
                Luon lang nghe va tu van tan tinh, dua ra phuong an phu hop voi tung
                nguoi
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Lich hen linh hoat</h3>
              <p className="text-sm text-muted-foreground">
                Ho tro tu van qua nhieu hinh thuc: dien thoai, video call, chat truc
                tuyen
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
