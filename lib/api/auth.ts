import { apiClient } from "./client";
import type {
  RegisterPayload,
  RegisterResponse,
  LoginPayload,
  LoginResponse,
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  ResetPasswordPayload,
} from "@/types";

export const authApi = {
  register: (payload: RegisterPayload) =>
    apiClient<RegisterResponse>("/vigil_registration.php", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  login: (payload: LoginPayload) =>
    apiClient<LoginResponse>("/vigil_login.php", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  logout: (payload: LoginPayload) =>
    apiClient<LoginResponse>("/vigil_logout.php", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  forgotPassword: (payload: ForgotPasswordPayload) =>
    apiClient<ForgotPasswordResponse>("/forgot-password.php", {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "a8f91c2b4e9d7f6a1c0b3d5e8f9a1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8",
      },
      method: "POST",
      body: JSON.stringify(payload),
    }),

  resetPassword: (payload: ResetPasswordPayload) =>
    apiClient<{ message: string }>("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  loginadmin: (payload: LoginPayload) =>
    apiClient<LoginResponse>("/vigil_admin_login.php", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};
