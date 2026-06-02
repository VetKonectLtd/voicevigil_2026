'use client'

import { useForm } from 'react-hook-form'

interface BlogPostFormData {
  content: string
}

export default function BlogAdminPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<BlogPostFormData>()

  const onSubmit = async (data: BlogPostFormData) => {
    // TODO: wire up to blog API
    console.log('Post submitted:', data)
    reset()
  }

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Blog</h2>
          <p className="mt-1 text-sm text-slate-500">Create a blog post</p>
        </div>
      </div>

      {isSubmitSuccessful && (
        <p className="mt-4 rounded-md bg-green-50 px-4 py-3 text-sm text-green-700">
          Blog post published successfully!
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4" noValidate>
        {/* Image upload placeholder */}
        <div className="h-40 rounded-[24px] border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
          <div className="flex h-full flex-col items-center justify-center gap-2">
            <p>Add image</p>
            <span className="text-xs text-slate-400">No image added yet</span>
          </div>
        </div>

        {/* Post content */}
        <div>
          <textarea
            rows={6}
            placeholder="Type in the post"
            {...register('content', {
              required: 'Post content is required',
              minLength: { value: 10, message: 'Post must be at least 10 characters long' },
            })}
            className="w-full rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 outline-none transition focus:border-[#1565C0] focus:bg-white"
          />
          {errors.content && (
            <p className="mt-1 text-xs text-red-500">{errors.content.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-2xl bg-[#1565C0] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0D47A1] disabled:opacity-60"
        >
          {isSubmitting ? 'Posting…' : 'Post'}
        </button>
      </form>
    </div>
  )
}
