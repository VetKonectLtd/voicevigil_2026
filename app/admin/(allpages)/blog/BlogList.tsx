"use client";

import { IMAGE_BASE_URL } from "@/components/pathConfig";
import { useBlogListing, useDeleteBlog } from "@/lib/hooks"; // Adjust path layout if needed
import { useEffect } from "react";

interface BlogListProps {
  onBlogsLoadedCount?: (count: number) => void;
}

export default function BlogList({ onBlogsLoadedCount }: BlogListProps) {
  const { data, isLoading, error } = useBlogListing(1, 10);
  const deleteBlogMutation = useDeleteBlog();

  const blogs = data?.data || [];

  // Communicates count up to parent main shell dynamically
  useEffect(() => {
    if (onBlogsLoadedCount && !isLoading && !error) {
      onBlogsLoadedCount(blogs.length);
    }
  }, [blogs.length, isLoading, error, onBlogsLoadedCount]);

  const handleDelete = async (blogId: number) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      try {
        await deleteBlogMutation.mutateAsync(blogId);
      } catch (err) {
        console.error("Failed to delete post:", err);
      }
    }
  };

  return (
    <div className="mt-6">
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700 text-sm">
          Failed to load blogs: {(error as Error).message}
        </div>
      )}

      {isLoading ? (
        <p className="text-center py-8 text-sm text-slate-400">Loading blog directory...</p>
      ) : blogs.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {blogs.map((blog: any) => (
            <div
              key={blog.blog_id}
              className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:border-slate-200"
            >
              <div>
                <div
                  className="h-32 w-full rounded-xl bg-slate-200 object-cover mb-3 flex items-center justify-center text-xs text-slate-400 bg-cover bg-center"
                  style={{
                    backgroundImage: blog.blog_image
                      ? `url(${IMAGE_BASE_URL}/${blog.blog_image})`
                      : "none",
                  }}
                >
                  {!blog.blog_image && "No Image Preview"}
                </div>
                <p className="text-sm text-slate-700 line-clamp-3 mb-4">
                  {blog.blog_content || blog.content}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                <span className="text-xs text-slate-400">ID: #{blog.blog_id}</span>
                <button
                  onClick={() => handleDelete(blog.blog_id)}
                  disabled={deleteBlogMutation.isPending}
                  className="rounded-xl bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                >
                  {deleteBlogMutation.isPending ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed border-slate-200 rounded-2xl">
          <p className="text-sm text-slate-400">No blog posts found.</p>
        </div>
      )}
    </div>
  );
}
