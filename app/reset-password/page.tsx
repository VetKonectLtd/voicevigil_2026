'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useResetPassword } from '@/lib/hooks'

interface ResetPasswordFormData {
  password: string
  confirmPassword: string
}

const inputClass =
  'mt-2 w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#1565C0] focus:bg-white'

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token') ?? ''

  const { mutateAsync: resetPassword, isSuccess, isError, error } = useResetPassword()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>()

  const password = watch('password')

  const onSubmit = async (data: ResetPasswordFormData) => {
    await resetPassword({ token, password: data.password })
  }

  return (
    <main className="min-h-screen bg-white px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6">
        <div className="p-8">
          {/* Logo */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
              <Image
                src="/voicevigil.png"
                alt="VoiceVigil logo"
                width={180}
                height={150}
                className="block h-[150px] w-auto max-w-[180px] object-contain"
              />
            </div>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">Reset Password</h1>
            <p className="mt-2 text-sm text-slate-500">Enter and confirm your new password.</p>
          </div>

          {isSuccess && (
            <p className="mb-4 rounded-md bg-green-50 px-4 py-3 text-sm text-green-700">
              Password reset successfully!{' '}
              <Link href="/login" className="font-semibold underline">
                Login now
              </Link>
            </p>
          )}
          {isError && (
            <p className="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
              {error instanceof Error ? error.message : 'Reset failed. The link may have expired.'}
            </p>
          )}

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* New password */}
            <div>
              <input
                type="password"
                placeholder="New Password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 8, message: 'Password must be at least 8 characters' },
                })}
                className={inputClass}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm password */}
            <div>
              <input
                type="password"
                placeholder="Re-enter Password"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) => value === password || 'Passwords do not match',
                })}
                className={inputClass}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isSuccess}
              className="mt-2 w-full rounded-md bg-[#1565C0] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0D47A1] disabled:opacity-60"
            >
              {isSubmitting ? 'Resetting…' : 'Reset Password'}
            </button>
          </form>

          <div className="mt-5 flex items-center gap-3 text-sm text-slate-400">
            <span className="h-px flex-1 bg-slate-200" />
            <span>OR</span>
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <p className="mt-5 text-center text-sm text-slate-500">
            Remembered your password?{' '}
            <Link href="/login" className="font-semibold text-[#1565C0] hover:text-[#0D47A1]">
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
