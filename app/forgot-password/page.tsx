"use client";

import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useForgotPassword } from "@/lib/hooks";

interface ForgotPasswordFormData {
  email: string;
}

export default function ForgotPasswordPage() {
  const { mutateAsync: forgotPassword, isSuccess, isError, error } = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>();

  const onSubmit = async (data: ForgotPasswordFormData) => {
    const password = await forgotPassword({ email: data.email });
    console.log({ forgotten_password: password });
  };

  return (
    <main className="min-h-screen bg-white px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6">
        <div className="p-8">
          {/* Logo */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
              <Image
                src="/voicevigil.png"
                alt="VoiceVigil logo"
                width={180}
                height={150}
                className="block h-[150px] w-auto max-w-[180px] object-contain"
              />
            </div>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">Forgot Password</h1>
            <p className="mt-2 text-sm text-slate-500">
              Enter your email address and we&apos;ll send you a link to reset your password.
            </p>
          </div>

          {isSuccess && (
            <p className="mb-4 rounded-md bg-green-50 px-4 py-3 text-sm text-green-700">
              Password reset link sent! Check your inbox.
            </p>
          )}
          {isError && (
            <p className="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
              {error instanceof Error
                ? error.message
                : "Failed to send reset email. Please try again."}
            </p>
          )}

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
              <input
                type="email"
                placeholder="Email address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
                className="w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#1565C0] focus:bg-white"
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isSuccess}
              className="w-full rounded-md bg-[#1565C0] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0D47A1] disabled:opacity-60"
            >
              {isSubmitting ? "Sending…" : "Send reset link"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-500">
            <p>
              Remembered your password?{" "}
              <Link href="/login" className="font-semibold text-[#1565C0] hover:text-[#0D47A1]">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
