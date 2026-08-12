"use client";

import { useState, useEffect, useRef } from "react";
import { IMAGE_BASE_URL } from "@/components/pathConfig";
import { useBlogListing, useDeleteBlog } from "@/lib/hooks";
import { MoreVertical, Edit2, Trash2, X, Power } from "lucide-react";
import CreateBlogForm from "./CreateBlogForm";

interface BlogListProps {
  setActiveTab: (tab: "create" | "view") => void;
  onBlogsLoadedCount?: (count: number) => void;
}

export default function BlogList({ onBlogsLoadedCount }: BlogListProps) {
  const { data, isLoading, error } = useBlogListing(1, 10);
  const deleteBlogMutation = useDeleteBlog();

  const [activeDropdownId, setActiveDropdownId] = useState<number | null>(null);
  const [editingBlog, setEditingBlog] = useState<any | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const blogs = data?.data || [];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdownId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Communicate count up to parent main shell dynamically
  useEffect(() => {
    if (onBlogsLoadedCount && !isLoading && !error) {
      onBlogsLoadedCount(blogs.length);
    }
  }, [blogs.length, isLoading, error, onBlogsLoadedCount]);

  const handleDelete = async (blogId: number) => {
    setActiveDropdownId(null);
    if (confirm("Are you sure you want to delete this blog post?")) {
      try {
        await deleteBlogMutation.mutateAsync(blogId);
      } catch (err) {
        console.error("Failed to delete post:", err);
      }
    }
  };

  const handleToggleActivate = async (blog: any) => {
    setActiveDropdownId(null);
    const newStatus = blog.blog_status === 1 ? 0 : 1;
    console.log(`Toggling status for blog #${blog.blog_id} to ${newStatus}`);
    // Connect your activate/deactivate hook or API call here when ready
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
              className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:border-slate-200"
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
                  {blog.blog_content || blog.blog_text || blog.content}
                </p>
              </div>

              {/* Bottom Actions Bar */}
              <div className="relative flex items-center justify-between pt-2 border-t border-slate-200/60">
                <span className="text-xs text-slate-400">ID: #{blog.blog_id}</span>

                {/* Dropdown Menu Trigger Button */}
                <button
                  type="button"
                  onClick={() =>
                    setActiveDropdownId(activeDropdownId === blog.blog_id ? null : blog.blog_id)
                  }
                  className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-200/70 transition"
                >
                  <MoreVertical size={16} />
                </button>

                {/* Popover / Dropdown Menu */}
                {activeDropdownId === blog.blog_id && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 bottom-9 z-20 w-40 rounded-2xl border border-slate-100 bg-white p-1.5 shadow-xl animate-in fade-in zoom-in-95 duration-100"
                  >
                    {/* Activate/Deactivate Option */}
                    <button
                      type="button"
                      onClick={() => handleToggleActivate(blog)}
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
                    >
                      <Power
                        size={14}
                        className={blog.blog_status === 1 ? "text-amber-500" : "text-emerald-500"}
                      />
                      {blog.blog_status === 1 ? "Deactivate" : "Activate"}
                    </button>

                    {/* Edit Option */}
                    <button
                      type="button"
                      onClick={() => {
                        setActiveDropdownId(null);
                        setEditingBlog(blog);
                        console.log({ Blog: blog });

                        // setActiveTab("create");
                      }}
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
                    >
                      <Edit2 size={14} className="text-blue-600" />
                      Edit
                    </button>

                    {/* Delete Option */}
                    <button
                      type="button"
                      onClick={() => handleDelete(blog.blog_id)}
                      disabled={deleteBlogMutation.isPending}
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition disabled:opacity-50"
                    >
                      <Trash2 size={14} />
                      {deleteBlogMutation.isPending ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed border-slate-200 rounded-2xl">
          <p className="text-sm text-slate-400">No blog posts found.</p>
        </div>
      )}

      {/* Edit Blog Modal Wrapper */}
      {editingBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm mt-5 overflow-y-scroll">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150 mt-10">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-semibold text-slate-900">
                Edit Blog Post #{editingBlog.blog_id}
              </h3>
              <button
                onClick={() => setEditingBlog(null)}
                className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Reuses the exact CreateBlogForm UI inside the Edit Modal */}
            <CreateBlogForm
              initialData={{
                blog_id: editingBlog.blog_id,
                blog_text: editingBlog.blog_text || editingBlog.blog_content || editingBlog.content,
                blog_image: editingBlog.blog_image
                  ? `${IMAGE_BASE_URL}/${editingBlog.blog_image}`
                  : null,
              }}
              onSuccess={() => setEditingBlog(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
