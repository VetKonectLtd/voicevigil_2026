// ─── Generic wrapper ────────────────────────────────────────────────────────
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

// ─── Auth ───────────────────────────────────────────────────────────────────
export interface RegisterPayload {
  email: string
  password: string
  first_name: string
  last_name: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface ForgotPasswordPayload {
  email: string
}

export interface ResetPasswordPayload {
  token: string
  password: string
}

// ─── Partners ───────────────────────────────────────────────────────────────
export interface PartnerPayload {
  fullName: string
  email: string
  contact: string
  partnershipArea: string
}

// ─── Users ───────────────────────────────────────────────────────────────────
export interface UserRole {
  role: 'admin' | 'user'
}

export interface AuthUser {
  id: string
  email: string
  role: 'admin' | 'user'
}

// ─── API responses ───────────────────────────────────────────────────────────
export interface RegisterResponse {
  message: string
}

export interface LoginResponse {
  token: string
  user: AuthUser
}

export interface ForgotPasswordResponse {
  message: string
}

export interface PartnerResponse {
  message: string
}

export interface RegisteredUsersResponse {
  users: AuthUser[]
}

export interface PartnerRequestsResponse {
  partners: PartnerPayload[]
}
