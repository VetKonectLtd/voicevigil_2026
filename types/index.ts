// ─── Generic wrapper ────────────────────────────────────────────────────────
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// ─── Auth ───────────────────────────────────────────────────────────────────
export interface RegisterPayload {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  password: string;
}

// ─── Partners ───────────────────────────────────────────────────────────────
export interface PartnerPayload {
  fullName: string;
  email: string;
  contact: string;
  partnershipArea: string;
}

// ─── Users ───────────────────────────────────────────────────────────────────
export interface UserRole {
  role: "admin" | "user";
}

export interface AuthUser {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  role: "admin" | "user";
}

// ─── API responses ───────────────────────────────────────────────────────────
export interface RegisterResponse {
  message: string;
}

export interface LoginResponse {
  status: boolean;
  message: string;
  data: {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    u_type: number;
    token: string;
    expires: string;
  };
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface PartnerResponse {
  message: string;
}

export interface RegisteredUsersResponse {
  users: AuthUser[];
}

export interface PartnerRequestsResponse {
  partners: PartnerPayload[];
}

export interface Blog {
  blog_id: number;
  blog_text: string;
  blog_image: string;
  blog_status: number;
  blog_date: string;
}

export interface BlogResponse {
  status: boolean;
  message: string;
  current_page: number;
  per_page: number;
  total_records: number;
  total_pages: number;
  has_next_page: boolean;
  has_previous_page: boolean;
  next_page: number | null;
  previous_page: number | null;
  data: Blog[];
}

export interface BlogPayload {
  page: number;
  limit: number;
}

// Types matching your API documentation
interface User {
  first_name: string;
  last_name: string;
  u_email: string;
  reg_date: string;
}

interface PaginationInfo {
  current_page: number;
  per_page: number;
  total_records: number;
  total_pages: number;
  has_next_page: boolean;
  has_previous_page: boolean;
}

export interface UserListinApiResponse {
  status: boolean;
  message: string;
  pagination: PaginationInfo;
  data: User[];
}
