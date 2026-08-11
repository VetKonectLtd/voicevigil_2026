import { API_KEY, apiClient } from "./client";
import type { BlogPayload, BlogResponse } from "@/types";

export const blogApi = {
  getBlogs: (payload: BlogPayload) =>
    apiClient<BlogResponse>("/vigil_blog_content.php", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};

// Add these to your adminApi / client definitions file
export const blogCommentsApi = {
  getComment: (blogId: number, page: number, limit: number) =>
    apiClient<any>("/vigil_comments.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY ?? "",
      },
      body: JSON.stringify({ blog_id: blogId, page, limit }),
    }),

  addComment: (blogId: number, commentText: string, userId: string, token: string) =>
    apiClient<any>("/vigil_post_comment.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY ?? "",
        Authorization: `Bearer ${token}`,
        "User-Id": userId,
      },
      body: JSON.stringify({ blog_id: blogId, comment_text: commentText }),
    }),

  deleteComment: (commentId: number, userId: string, token: string) =>
    apiClient<any>("/vigil_delete_comment.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY ?? "",
        Authorization: `Bearer ${token}`,
        "User-Id": userId,
      },
      body: JSON.stringify({ comment_id: commentId }),
    }),
};
