"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CheckCircle2, KeyRound, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/context/language-context";
import { authServices } from "@/services/authApi";
import type { Language } from "@/interface/types";

type ResetStep = "email" | "otp" | "success";

const resetHint =
  "Nếu email tồn tại trong hệ thống, chúng tôi sẽ gửi mã OTP để khôi phục mật khẩu.";

const otpErrorCopy: Record<Language, { cooldown: string; sendFailed: string; resetFailed: string }> = {
  vi: {
    cooldown: "Vui lòng chờ trước khi yêu cầu mã OTP mới.",
    sendFailed: "Không thể gửi OTP.",
    resetFailed: "Không thể đặt lại mật khẩu.",
  },
  en: {
    cooldown: "Please wait before requesting another OTP.",
    sendFailed: "Unable to send OTP.",
    resetFailed: "Unable to reset password.",
  },
  zh: {
    cooldown: "请稍候再请求新的 OTP 验证码。",
    sendFailed: "无法发送 OTP 验证码。",
    resetFailed: "无法重置密码。",
  },
};

const translateOtpError = (message: string, language: Language) => {
  if (message.toLowerCase().includes("please wait before requesting another otp")) {
    return otpErrorCopy[language].cooldown;
  }

  return message;
};

export default function ForgotPasswordPage() {
  const { language } = useLanguage();
  const [step, setStep] = useState<ResetStep>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (cooldown <= 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setCooldown((current) => Math.max(current - 1, 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [cooldown]);

  const requestOtp = async (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    if (!email.trim()) {
      setError("Vui lòng nhập email.");
      return;
    }

    setError("");
    setMessage("");
    setIsSubmitting(true);

    try {
      const response = await authServices.forgotPassword({ email: email.trim() });
      setStep("otp");
      setCooldown(response.resendAfter ?? 30);
      setMessage(resetHint);
    } catch (requestError) {
      const message =
        requestError instanceof Error ? requestError.message : otpErrorCopy[language].sendFailed;
      setError(translateOtpError(message, language));
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetPassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password.length < 6) {
      setError("Mật khẩu mới phải có ít nhất 6 ký tự.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    setError("");
    setMessage("");
    setIsSubmitting(true);

    try {
      await authServices.resetPassword({
        email: email.trim(),
        otp: otp.trim(),
        password,
      });
      setStep("success");
    } catch (requestError) {
      const message =
        requestError instanceof Error ? requestError.message : otpErrorCopy[language].resetFailed;
      setError(translateOtpError(message, language));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Link href="/" className="mx-auto mb-4 inline-flex items-center gap-2">
            <div className="relative h-12 w-12 overflow-hidden rounded-full bg-white ring-1 ring-primary/25">
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
          </Link>
          <h1 className="text-2xl font-bold">Quên mật khẩu</h1>
          <p className="text-muted-foreground">
            Nhập email tài khoản để nhận mã OTP đặt lại mật khẩu.
          </p>
        </CardHeader>
        <CardContent>
          {step === "email" && (
            <form onSubmit={requestOtp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="email@example.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Gửi mã OTP
              </Button>
              <Button variant="ghost" className="w-full" asChild>
                <Link href="/dang-nhap">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Quay lại đăng nhập
                </Link>
              </Button>
            </form>
          )}

          {step === "otp" && (
            <form onSubmit={resetPassword} className="space-y-4">
              <div className="rounded-lg bg-primary/10 p-4 text-sm text-primary">
                {message || resetHint}
              </div>

              <div className="space-y-2">
                <Label htmlFor="otp">Mã OTP</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="otp"
                    inputMode="numeric"
                    maxLength={6}
                    required
                    value={otp}
                    onChange={(event) => setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="123456"
                    className="pl-10 tracking-[0.35em]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu mới</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Tối thiểu 6 ký tự"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Nhập lại mật khẩu</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <Button type="submit" className="w-full" disabled={isSubmitting || otp.length !== 6}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Đặt lại mật khẩu
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                disabled={isSubmitting || cooldown > 0}
                onClick={() => requestOtp()}
              >
                {cooldown > 0 ? `Gửi lại sau ${cooldown}s` : "Gửi lại OTP"}
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => {
                  setStep("email");
                  setError("");
                }}
              >
                Đổi email
              </Button>
            </form>
          )}

          {step === "success" && (
            <div className="text-center">
              <CheckCircle2 className="mx-auto mb-4 h-14 w-14 text-primary" />
              <h2 className="font-semibold">Đã đặt lại mật khẩu</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Bạn có thể đăng nhập bằng mật khẩu mới vừa tạo.
              </p>
              <Button className="mt-6 w-full" asChild>
                <Link href="/dang-nhap">Quay lại đăng nhập</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
