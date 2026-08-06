"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";

interface LoginFormData {
  email: string;
  password: string;
}

const inputClass =
  "mt-2 w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#1565C0] focus:bg-white";

export default function LoginPage() {
  const router = useRouter();
  const { loginadmin } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      console.log({ data });

      const user = await loginadmin(data.email, data.password);
      console.log({ user });

      router.replace(user.role === "admin" ? "/admin" : "/");
    } catch {
      setError("root", { message: "Login failed. Please check your credentials and try again." });
    }
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
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">Login</h1>
            {errors.root && <p className="mt-3 text-sm text-[#d14343]">{errors.root.message}</p>}
          </div>

          <form className="space-y-2" onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Email */}
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
                className={inputClass}
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                })}
                className={inputClass}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div className="mt-3 text-right text-sm">
              <Link
                href="/forgot-password"
                className="font-semibold text-[#1565C0] hover:text-[#0D47A1]"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-md bg-[#1565C0] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0D47A1] disabled:opacity-60"
            >
              {isSubmitting ? "Logging in…" : "Login"}
            </button>
          </form>

          {/* Google SSO */}
          <div className="mt-8 border-t border-slate-200 pt-6 text-center">
            <p className="text-sm text-slate-500">Or continue with</p>
            <button
              type="button"
              className="mt-4 inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-white"
            >
              <Image
                src="/google.png"
                alt="Google logo"
                width={20}
                height={20}
                className="h-5 w-5"
              />
              Continue with Google
            </button>
          </div>

          <div className="mt-6 flex items-center justify-center gap-1 text-sm text-slate-500">
            <span>Don&apos;t have an account?</span>
            <Link href="/signup" className="font-semibold text-[#1565C0] hover:text-[#0D47A1]">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
