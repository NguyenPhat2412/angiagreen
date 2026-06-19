"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Mail, Lock, User, Phone, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/language-context";

const registerCopy = {
  vi: {
    subtitle: "Tạo tài khoản để nhận nhiều ưu đãi hấp dẫn",
    requirements: ["Ít nhất 8 ký tự", "Chứa chữ hoa", "Chứa chữ thường", "Chứa số"],
    passwordMismatch: "Mật khẩu xác nhận không khớp",
    acceptTermsError: "Vui lòng đồng ý với điều khoản sử dụng",
    registerFailed: "Đăng ký thất bại. Vui lòng thử lại.",
    genericError: "Có lỗi xảy ra. Vui lòng thử lại.",
    fullName: "Họ và tên",
    fullNamePlaceholder: "Nguyễn Văn A",
    phone: "Số điện thoại",
    password: "Mật khẩu",
    passwordPlaceholder: "Nhập mật khẩu",
    confirmPassword: "Xác nhận mật khẩu",
    confirmPasswordPlaceholder: "Nhập lại mật khẩu",
    agreePrefix: "Tôi đồng ý với",
    terms: "Điều khoản sử dụng",
    and: "và",
    privacy: "Chính sách bảo mật",
    processing: "Đang xử lý...",
    hasAccount: "Đã có tài khoản?",
  },
  en: {
    subtitle: "Create an account to receive exclusive offers",
    requirements: ["At least 8 characters", "Contains uppercase letter", "Contains lowercase letter", "Contains number"],
    passwordMismatch: "Password confirmation does not match",
    acceptTermsError: "Please agree to the terms of use",
    registerFailed: "Registration failed. Please try again.",
    genericError: "Something went wrong. Please try again.",
    fullName: "Full name",
    fullNamePlaceholder: "Nguyen Van A",
    phone: "Phone number",
    password: "Password",
    passwordPlaceholder: "Enter password",
    confirmPassword: "Confirm password",
    confirmPasswordPlaceholder: "Enter password again",
    agreePrefix: "I agree to the",
    terms: "Terms of use",
    and: "and",
    privacy: "Privacy policy",
    processing: "Processing...",
    hasAccount: "Already have an account?",
  },
  zh: {
    subtitle: "创建账号以获取更多优惠",
    requirements: ["至少8个字符", "包含大写字母", "包含小写字母", "包含数字"],
    passwordMismatch: "两次输入的密码不一致",
    acceptTermsError: "请同意使用条款",
    registerFailed: "注册失败，请重试。",
    genericError: "发生错误，请重试。",
    fullName: "姓名",
    fullNamePlaceholder: "Nguyen Van A",
    phone: "电话号码",
    password: "密码",
    passwordPlaceholder: "请输入密码",
    confirmPassword: "确认密码",
    confirmPasswordPlaceholder: "请再次输入密码",
    agreePrefix: "我同意",
    terms: "使用条款",
    and: "和",
    privacy: "隐私政策",
    processing: "处理中...",
    hasAccount: "已有账号？",
  },
};

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const { language, t } = useLanguage();
  const copy = registerCopy[language];
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const passwordRequirements = [
    { text: copy.requirements[0], met: formData.password.length >= 8 },
    { text: copy.requirements[1], met: /[A-Z]/.test(formData.password) },
    { text: copy.requirements[2], met: /[a-z]/.test(formData.password) },
    { text: copy.requirements[3], met: /[0-9]/.test(formData.password) },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError(copy.passwordMismatch);
      return;
    }

    if (!agreeTerms) {
      setError(copy.acceptTermsError);
      return;
    }

    setIsLoading(true);

    try {
      const success = await register(
        formData.name,
        formData.email,
        formData.phone,
        formData.password
      );
      if (success) {
        router.push("/tai-khoan");
      } else {
        setError(copy.registerFailed);
      }
    } catch {
      setError(copy.genericError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-muted/30 flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <Link href="/" className="inline-block mx-auto mb-4">
            <div className="flex items-center justify-center gap-2">
              <div className="relative w-12 h-12 overflow-hidden rounded-full bg-white ring-1 ring-primary/25">
                <Image
                  src="/3956976912911290196.jpg"
                  alt="AN GIA GREEN"
                  fill
                  className="object-cover"
                  sizes="48px"
                  priority
                />
              </div>
              <span className="text-2xl font-bold text-primary">AN GIA GREEN</span>
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">{t("register")}</h1>
          <p className="text-muted-foreground">{copy.subtitle}</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">{copy.fullName}</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder={copy.fullNamePlaceholder}
                  className="pl-10"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  className="pl-10"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">{copy.phone}</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="0901234567"
                  className="pl-10"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{copy.password}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={copy.passwordPlaceholder}
                  className="pl-10 pr-10"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {formData.password && (
                <div className="grid grid-cols-2 gap-1 mt-2">
                  {passwordRequirements.map((req, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-1 text-xs ${
                        req.met ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      <Check className={`h-3 w-3 ${req.met ? "opacity-100" : "opacity-30"}`} />
                      {req.text}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{copy.confirmPassword}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder={copy.confirmPasswordPlaceholder}
                  className="pl-10 pr-10"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={agreeTerms}
                onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground leading-tight">
                {copy.agreePrefix}{" "}
                <Link href="/dieu-khoan" className="text-primary hover:underline">
                  {copy.terms}
                </Link>{" "}
                {copy.and}{" "}
                <Link href="/chinh-sach" className="text-primary hover:underline">
                  {copy.privacy}
                </Link>
              </label>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {copy.processing}
                </>
              ) : (
                t("register")
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {copy.hasAccount}{" "}
            <Link href="/dang-nhap" className="text-primary font-medium hover:underline">
              {t("login")}
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
