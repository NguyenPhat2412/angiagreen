"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAuth } from "@/context/auth-context";
import { useLanguage } from "@/context/language-context";

const loginCopy = {
  vi: {
    subtitle: "Đăng nhập để quản lý đơn hàng và tích lũy điểm thưởng",
    invalidCredentials: "Email hoặc mật khẩu không chính xác",
    genericError: "Có lỗi xảy ra. Vui lòng thử lại.",
    password: "Mật khẩu",
    forgotPassword: "Quên mật khẩu?",
    passwordPlaceholder: "Nhập mật khẩu",
    processing: "Đang xử lý...",
    or: "Hoặc",
    noAccount: "Chưa có tài khoản?",
  },
  en: {
    subtitle: "Sign in to manage orders and collect reward points",
    invalidCredentials: "Email or password is incorrect",
    genericError: "Something went wrong. Please try again.",
    password: "Password",
    forgotPassword: "Forgot password?",
    passwordPlaceholder: "Enter password",
    processing: "Processing...",
    or: "Or",
    noAccount: "Don't have an account?",
  },
  zh: {
    subtitle: "登录以管理订单并累积积分",
    invalidCredentials: "邮箱或密码不正确",
    genericError: "发生错误，请重试。",
    password: "密码",
    forgotPassword: "忘记密码？",
    passwordPlaceholder: "请输入密码",
    processing: "处理中...",
    or: "或",
    noAccount: "还没有账号？",
  },
};

export default function LoginPage() {
  const router = useRouter();
  const { login, loginWithSso } = useAuth();
  const { language, t } = useLanguage();
  const copy = loginCopy[language];
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ssoProvider, setSsoProvider] = useState<"google" | "facebook" | null>(null);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        router.push("/tai-khoan");
      } else {
        setError(copy.invalidCredentials);
      }
    } catch {
      setError(copy.genericError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSsoLogin = async (provider: "google" | "facebook") => {
    setSsoProvider(provider);
    setError("");

    try {
      const success = await loginWithSso(provider);
      if (success) {
        router.push("/tai-khoan");
      } else {
        setError(copy.genericError);
      }
    } catch {
      setError(copy.genericError);
    } finally {
      setSsoProvider(null);
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
              <span className="text-2xl font-bold text-primary">
                AN GIA GREEN
              </span>
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">{t("login")}</h1>
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
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  className="pl-10"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">{copy.password}</Label>
                <Link
                  href="/quen-mat-khau"
                  className="text-sm text-primary hover:underline"
                >
                  {copy.forgotPassword}
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={copy.passwordPlaceholder}
                  className="pl-10 pr-10"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {copy.processing}
                </>
              ) : (
                t("login")
              )}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">
                  {copy.or}
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                type="button"
                disabled={Boolean(ssoProvider)}
                onClick={() => handleSsoLogin("google")}
              >
                {ssoProvider === "google" ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                )}
                Google
              </Button>
              <Button
                variant="outline"
                type="button"
                disabled={Boolean(ssoProvider)}
                onClick={() => handleSsoLogin("facebook")}
              >
                {ssoProvider === "facebook" ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                )}
                Facebook
              </Button>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {copy.noAccount}{" "}
            <Link
              href="/dang-ky"
              className="text-primary font-medium hover:underline"
            >
              {t("register")}
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
