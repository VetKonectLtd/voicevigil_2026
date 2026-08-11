"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useRegisterUser } from "@/lib/hooks";
import { useState } from "react";

interface SignUpFormData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const inputClass =
  "mt-2 w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#1565C0] focus:bg-white";

export default function SignUpPage() {
  const router = useRouter();
  const { mutateAsync: registerUser } = useRegisterUser();
  const [displayMsg, setDisplayMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>();

  const password = watch("password");

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const registeruser = await registerUser({
        email: data.email,
        password: data.password,
        first_name: data.first_name,
        last_name: data.last_name,
      });

      console.log({ registeruser });
      if (registeruser.status === true) {
        setDisplayMsg(registeruser.message);
      }
      // router.replace('/login')
    } catch (err) {
      setError("root", {
        message: err instanceof Error ? err.message : "Registration failed. Please try again.",
      });
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
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">Sign Up</h1>
          </div>

          {errors.root && <p className="mb-4 text-sm text-red-500">{errors.root.message}</p>}

          <form className="space-y-2" onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* First Name */}
            <div>
              <input
                type="text"
                placeholder="First Name"
                {...register("first_name", { required: "First name is required" })}
                className={inputClass}
              />
              {errors.first_name && (
                <p className="mt-1 text-xs text-red-500">{errors.first_name.message}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <input
                type="text"
                placeholder="Last Name"
                {...register("last_name", { required: "Last name is required" })}
                className={inputClass}
              />
              {errors.last_name && (
                <p className="mt-1 text-xs text-red-500">{errors.last_name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email Address"
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
                  minLength: { value: 8, message: "Password must be at least 8 characters" },
                })}
                className={inputClass}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) => value === password || "Passwords do not match",
                })}
                className={inputClass}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            {displayMsg && <p className="my-4 text-sm text-blue-500">{displayMsg}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full rounded-md bg-[#1565C0] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0D47A1] disabled:opacity-60"
            >
              {isSubmitting ? "Creating account…" : "Sign up"}
            </button>
          </form>

          {/* Google SSO */}
          <div className="mt-8 border-t border-slate-200 pt-6 text-center">
            <p className="text-sm text-slate-500">Or sign up with</p>
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

          <p className="mt-8 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-[#1565C0] hover:text-[#0D47A1]">
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
