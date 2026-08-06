"use client";

import { useForm } from "react-hook-form";

interface BlogPostFormData {
  content: string;
}

export default function CreateBlogForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<BlogPostFormData>();

  const onSubmit = async (formData: BlogPostFormData) => {
    // TODO: Connect to creation endpoint when available
    console.log("Post data to submit:", formData);
    reset();
  };

  return (
    <div className="mt-6">
      {isSubmitSuccessful && (
        <p className="mb-4 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
          Blog post published successfully!
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Image Box Placeholder */}
        <div className="h-40 rounded-[24px] border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
          <div className="flex h-full flex-col items-center justify-center gap-2">
            <p className="font-medium">Add image</p>
            <span className="text-xs text-slate-400">No image added yet</span>
          </div>
        </div>

        {/* Editor Textarea */}
        <div>
          <textarea
            rows={6}
            placeholder="Type in the post content..."
            {...register("content", {
              required: "Post content is required",
              minLength: { value: 10, message: "Post must be at least 10 characters long" },
            })}
            className="w-full rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 outline-none transition focus:border-[#1565C0] focus:bg-white"
          />
          {errors.content && <p className="mt-1 text-xs text-red-500">{errors.content.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-2xl bg-[#1565C0] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0D47A1] disabled:opacity-60"
        >
          {isSubmitting ? "Posting…" : "Post"}
        </button>
      </form>
    </div>
  );
}
