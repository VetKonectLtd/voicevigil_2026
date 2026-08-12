import { API_KEY, apiClient } from "./client";
import type {
  RegisteredUsersResponse,
  PartnerRequestsResponse,
  UserListinApiResponse,
} from "@/types";

export const adminApi = {
  getRegisteredUsers: () => apiClient<RegisteredUsersResponse>("/admin/users"),

  getPartnerRequests: () => apiClient<PartnerRequestsResponse>("/admin/partners"),

  getUsersListing: (page: number, limit: number, userId: string, token: string) =>
    apiClient<UserListinApiResponse>("/vigil_admin_user_registration.php", {
      method: "POST",
      headers: {
        "user-id": userId,
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-API-KEY": API_KEY ?? "",
      },
      body: JSON.stringify({ page, limit }),
    }),

  getPartnerListing: (page: number, limit: number, userId: string, token: string) =>
    apiClient<any>("/vigil_admin_partnership.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY ?? "",
        Authorization: `Bearer ${token}`,
        "user-id": userId,
      },
      body: JSON.stringify({ page, limit }),
    }),

  getBlogListing: (page: number, limit: number, userId: string, token: string) =>
    apiClient<any>("/vigil_admin_blog.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY ?? "",
        Authorization: `Bearer ${token}`,
        "user-id": userId,
      },
      body: JSON.stringify({ page, limit }),
    }),

  createBlogListing: (data: any, userId: string, token: string) => {
    const blog_image = data.blog_image as string;
    const blog_text = data.blog_text as string;

    return apiClient<any>("/vigil_blog_post.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY ?? "",
        Authorization: `Bearer ${token}`,
        "user-id": userId,
      },
      body: JSON.stringify({ blog_image, blog_text, blog_status: 0 }),
    });
  },

  updateBlogListing: (data: any, userId: string, token: string) => {
    const blog_image = data.blog_image as string;
    const blog_text = data.blog_text as string;
    const blog_id = data.blog_id as number;
    const blog_status = data.blog_status as number;
    const remove_image = data.removed_image;

    return apiClient<any>("/vigil_blog_editing.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY ?? "",
        Authorization: `Bearer ${token}`,
        "user-id": userId,
      },
      body: JSON.stringify({ blog_image, blog_text, blog_status, remove_image, blog_id }),
    });
  },

  deleteBlog: (blogId: number, userId: string, token: string) =>
    apiClient<any>("/vigil_admin_delete_blog.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY ?? "",
        Authorization: `Bearer ${token}`,
        "user-id": userId,
      },
      body: JSON.stringify({ blog_id: blogId }),
    }),
};
