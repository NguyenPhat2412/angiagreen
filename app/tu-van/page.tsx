"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Video,
  MessageCircle,
  Star,
  CheckCircle,
  Loader2,
  Award,
  Stethoscope,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/language-context";
import { appointmentServices } from "@/services/appointmentApi";
import { doctorServices } from "@/services/doctorApi";
import Breadcrumb from "@/components/Breadcrumb";
import type { Doctor } from "@/lib/types";

const consultationTypes = [
  {
    id: "phone",
    icon: Phone,
    title: "Tu van qua dien thoai",
    description: "Nhan cuoc goi tu van tu chuyen gia",
    duration: "15-30 phut",
  },
  {
    id: "video",
    icon: Video,
    title: "Tu van qua video call",
    description: "Gap truc tiep chuyen gia qua video",
    duration: "20-45 phut",
  },
  {
    id: "chat",
    icon: MessageCircle,
    title: "Tu van qua chat",
    description: "Nhan tin trao doi voi chuyen gia",
    duration: "Khong gioi han",
  },
];

const timeSlots = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

const healthTopics = [
  "Suc khoe tim mach",
  "He tieu hoa",
  "Xuong khop",
  "Than kinh - giac ngu",
  "Tang de khang",
  "Lam dep - da lieu",
  "Suc khoe nam gioi",
  "Suc khoe phu nu",
  "Khac",
];

export default function ConsultationPage() {
  const { language, t } = useLanguage();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [formData, setFormData] = useState({
    consultationType: "phone",
    doctorId: "",
    date: "",
    time: "",
    topic: "",
    name: "",
    phone: "",
    email: "",
    description: "",
  });

  useEffect(() => {
    doctorServices.getAll().then(setDoctors).catch(() => setDoctors([]));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await appointmentServices.create({
        doctorId: formData.doctorId || undefined,
        date: formData.date,
        time: formData.time,
        type: formData.consultationType as "phone" | "video" | "chat",
        topic: formData.topic,
        contactName: formData.name,
        contactPhone: formData.phone,
        contactEmail: formData.email,
        note: formData.description,
      });
      setIsSubmitted(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Dat lich that bai");
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedDoctor = doctors.find((d) => d.id === formData.doctorId);

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Dat lich thanh cong!</h2>
              <p className="text-muted-foreground mb-6">
                Chung toi da nhan duoc yeu cau tu van cua ban. Doi ngu chuyen gia se lien
                he xac nhan lich hen trong vong 24 gio.
              </p>
              <div className="bg-muted/50 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-semibold mb-3">Thong tin lich hen:</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-muted-foreground">Hinh thuc:</span>{" "}
                    {consultationTypes.find((c) => c.id === formData.consultationType)?.title}
                  </p>
                  {selectedDoctor && (
                    <p>
                      <span className="text-muted-foreground">Chuyen gia:</span>{" "}
                      {selectedDoctor.name}
                    </p>
                  )}
                  <p>
                    <span className="text-muted-foreground">Ngay:</span> {formData.date}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Gio:</span> {formData.time}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Chu de:</span> {formData.topic}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 justify-center">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsSubmitted(false);
                    setStep(1);
                    setFormData({
                      consultationType: "phone",
                      doctorId: "",
                      date: "",
                      time: "",
                      topic: "",
                      name: "",
                      phone: "",
                      email: "",
                      description: "",
                    });
                  }}
                >
                  Dat lich moi
                </Button>
                <Button asChild>
                  <a href="/">Ve trang chu</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: t("home"), href: "/" },
            { label: t("consultation"), href: "/tu-van" },
          ]}
        />

        <div className="mt-6 mb-8 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Dat lich tu van</h1>
          <p className="text-lg text-muted-foreground">
            Duoc tu van truc tiep voi doi ngu y si, duoc si giau kinh nghiem ve cac van de
            suc khoe cua ban
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    s === step
                      ? "bg-primary text-primary-foreground"
                      : s < step
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {s < step ? <CheckCircle className="w-5 h-5" /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-20 h-1 mx-2 rounded ${
                      s < step ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="mb-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}
              {/* Step 1: Choose consultation type */}
              {step === 1 && (
                <div className="space-y-6">
                  <CardHeader className="p-0">
                    <CardTitle>Chon hinh thuc tu van</CardTitle>
                  </CardHeader>

                  <RadioGroup
                    value={formData.consultationType}
                    onValueChange={(value) =>
                      setFormData({ ...formData, consultationType: value })
                    }
                    className="grid sm:grid-cols-3 gap-4"
                  >
                    {consultationTypes.map((type) => (
                      <Label
                        key={type.id}
                        htmlFor={type.id}
                        className={`cursor-pointer border-2 rounded-xl p-4 transition-all ${
                          formData.consultationType === type.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <RadioGroupItem value={type.id} id={type.id} className="hidden" />
                        <type.icon className="w-8 h-8 text-primary mb-3" />
                        <h3 className="font-semibold mb-1">{type.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {type.description}
                        </p>
                        <Badge variant="secondary">{type.duration}</Badge>
                      </Label>
                    ))}
                  </RadioGroup>

                  <div className="space-y-4">
                    <Label>Chon chu de suc khoe</Label>
                    <Select
                      value={formData.topic}
                      onValueChange={(value) => setFormData({ ...formData, topic: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chon chu de ban quan tam" />
                      </SelectTrigger>
                      <SelectContent>
                        {healthTopics.map((topic) => (
                          <SelectItem key={topic} value={topic}>
                            {topic}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="button"
                      onClick={() => setStep(2)}
                      disabled={!formData.topic}
                    >
                      Tiep tuc
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Choose doctor and time */}
              {step === 2 && (
                <div className="space-y-6">
                  <CardHeader className="p-0">
                    <CardTitle>Chon chuyen gia va thoi gian</CardTitle>
                  </CardHeader>

                  <div>
                    <Label className="mb-3 block">Chon chuyen gia (khong bat buoc)</Label>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {doctors.slice(0, 4).map((doctor) => (
                        <div
                          key={doctor.id}
                          onClick={() => setFormData({ ...formData, doctorId: doctor.id })}
                          className={`cursor-pointer border-2 rounded-xl p-4 flex gap-4 transition-all ${
                            formData.doctorId === doctor.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <Image
                            src={doctor.image}
                            alt={doctor.name}
                            width={60}
                            height={60}
                            className="rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold">{doctor.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {doctor.specialty[language]}
                            </p>
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">{doctor.rating}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      className="mt-2"
                      onClick={() => setFormData({ ...formData, doctorId: "" })}
                    >
                      De he thong sap xep chuyen gia
                    </Button>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Chon ngay *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) =>
                          setFormData({ ...formData, date: e.target.value })
                        }
                        min={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Chon gio *</Label>
                      <Select
                        value={formData.time}
                        onValueChange={(value) =>
                          setFormData({ ...formData, time: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chon khung gio" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setStep(1)}>
                      Quay lai
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setStep(3)}
                      disabled={!formData.date || !formData.time}
                    >
                      Tiep tuc
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Fill personal info */}
              {step === 3 && (
                <div className="space-y-6">
                  <CardHeader className="p-0">
                    <CardTitle>Thong tin lien he</CardTitle>
                  </CardHeader>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Ho va ten *</Label>
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
                      <Label htmlFor="phone">So dien thoai *</Label>
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
                    <Label htmlFor="email">Email</Label>
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
                    <Label htmlFor="description">
                      Mo ta van de suc khoe (khong bat buoc)
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Mo ta chi tiet tinh trang suc khoe de chuyen gia co the chuan bi tot hon..."
                      rows={4}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                    />
                  </div>

                  {/* Summary */}
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-3">Xac nhan thong tin:</h4>
                    <div className="grid sm:grid-cols-2 gap-2 text-sm">
                      <p>
                        <span className="text-muted-foreground">Hinh thuc:</span>{" "}
                        {consultationTypes.find((c) => c.id === formData.consultationType)?.title}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Chu de:</span>{" "}
                        {formData.topic}
                      </p>
                      {selectedDoctor && (
                        <p>
                          <span className="text-muted-foreground">Chuyen gia:</span>{" "}
                          {selectedDoctor.name}
                        </p>
                      )}
                      <p>
                        <span className="text-muted-foreground">Ngay:</span> {formData.date}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Gio:</span> {formData.time}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setStep(2)}>
                      Quay lai
                    </Button>
                    <Button type="submit" disabled={isSubmitting || !formData.name || !formData.phone}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Dang xu ly...
                        </>
                      ) : (
                        "Xac nhan dat lich"
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Why choose us */}
        <div className="mt-12 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">
            Tai sao nen tu van tai An Gia Green?
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <Stethoscope className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Chuyen gia uy tin</h3>
                <p className="text-sm text-muted-foreground">
                  Doi ngu y si, duoc si voi hon 10 nam kinh nghiem
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Award className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Tu van mien phi</h3>
                <p className="text-sm text-muted-foreground">
                  Hoan toan mien phi, khong phat sinh chi phi an
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <User className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Bao mat thong tin</h3>
                <p className="text-sm text-muted-foreground">
                  Thong tin suc khoe duoc bao mat tuyet doi
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
