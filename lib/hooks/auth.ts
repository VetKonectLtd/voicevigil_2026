import { useMutation } from '@tanstack/react-query'
import { authApi } from '@/lib/api/auth'
import type {
  RegisterPayload,
  LoginPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
} from '@/types'

export const useRegisterUser = () =>
  useMutation({
    mutationFn: (payload: RegisterPayload) => authApi.register(payload),
  })

export const useLoginUser = () =>
  useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
  })

export const useForgotPassword = () =>
  useMutation({
    mutationFn: (payload: ForgotPasswordPayload) =>
      authApi.forgotPassword(payload),
  })

export const useResetPassword = () =>
  useMutation({
    mutationFn: (payload: ResetPasswordPayload) =>
      authApi.resetPassword(payload),
  })
