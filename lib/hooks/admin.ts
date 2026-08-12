import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/lib/api/admin";
import { useAuth } from "@/context/AuthContext";

export const useGetRegisteredUsers = () =>
  useQuery({
    queryKey: ["registeredUsers"],
    queryFn: () => adminApi.getRegisteredUsers(),
  });

export const useGetPartnerRequests = () =>
  useQuery({
    queryKey: ["partnerRequests"],
    queryFn: () => adminApi.getPartnerRequests(),
  });

export const useUserListing = (page = 1, limit = 25, userId: string | null, token: string | null) =>
  useQuery({
    queryKey: ["userListings", page, limit, userId, token],
    queryFn: () => adminApi.getUsersListing(page, limit, userId!, token!),
    enabled: !!userId && !!token,
  });

export const usePartnerListing = (page = 1, limit = 25) => {
  const { user, token } = useAuth();

  return useQuery({
    queryKey: ["partnerListings", page, limit, user?.id, token],
    queryFn: () => adminApi.getPartnerListing(page, limit, user!.id, token!),
    enabled: !!user?.id && !!token,
  });
};

export const useBlogListing = (page = 1, limit = 10) => {
  const { user, token } = useAuth();

  return useQuery({
    queryKey: ["blogListings", page, limit, user?.id, token],
    queryFn: () => adminApi.getBlogListing(page, limit, user!.id, token!),
    enabled: !!user?.id && !!token,
  });
};

export const useDeleteBlog = () => {
  const { user, token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (blogId: number) => adminApi.deleteBlog(blogId, user!.id, token!),
    onSuccess: () => {
      // Automatically refreshes the UI blog list when a post is removed
      queryClient.invalidateQueries({ queryKey: ["blogListings"] });
    },
  });
};

export const useCreateBlog = () => {
  const { user, token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      // Ensures the API response is returned to mutateAsync
      return await adminApi.createBlogListing(data, user!.id, token!);
    },
    onSuccess: (data) => {
      console.log("Mutation onSuccess response:", data);
      queryClient.invalidateQueries({ queryKey: ["blogListings"] });
    },
    onError: (error) => {
      console.error("Mutation onError:", error);
    },
  });
};

export const useUpdateBlog = () => {
  const { user, token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      // Ensures the API response is returned to mutateAsync
      return await adminApi.updateBlogListing(data, user!.id, token!);
    },
    onSuccess: (data) => {
      console.log("Mutation onSuccess response:", data);
      queryClient.invalidateQueries({ queryKey: ["blogListings"] });
    },
    onError: (error) => {
      console.error("Mutation onError:", error);
    },
  });
};
