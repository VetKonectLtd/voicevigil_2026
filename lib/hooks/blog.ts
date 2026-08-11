import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { blogApi, blogCommentsApi } from "@/lib/api/blog";
import { useAuth } from "@/context/AuthContext";

export const useBlogs = (page = 1, limit = 10) =>
  useQuery({
    queryKey: ["blogs", page, limit],
    queryFn: () =>
      blogApi.getBlogs({
        page,
        limit,
      }),
  });

export const useAddComment = () => {
  const { user, token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ blogId, text }: { blogId: number; text: string }) => {
      // 1. Runtime guard check
      if (!user?.id || !token) {
        throw new Error("You must be authenticated to post a comment.");
      }

      // 2. Safe execution pass
      return blogCommentsApi.addComment(blogId, text, user.id, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};

export const useGetComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      blogId,
      page = 1,
      limit = 10,
    }: {
      blogId: number;
      page: number;
      limit: number;
    }) => {
      return blogCommentsApi.getComment(blogId, page, limit);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};

export const useDeleteComment = () => {
  const { user, token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: number) => blogCommentsApi.deleteComment(commentId, user!.id, token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};
