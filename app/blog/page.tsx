"use client";

import { useBlogs } from "@/lib/hooks";
import PostCard from "./PostCard";

export default function BlogPage() {
  const { data, isLoading, error } = useBlogs(1, 10);

  if (error) {
    return (
      <div className="mx-auto my-12 max-w-md rounded-2xl border border-red-100 bg-red-50 p-4 text-center text-sm text-red-600">
        Error mounting feeds: {(error as Error).message}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white px-4 py-10 sm:px-5 sm:py-14">
      <div className="mx-auto w-[85vw] max-w-[1100px]">
        {isLoading ? (
          <div className="flex flex-col gap-6 items-center py-20 text-sm text-slate-400">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-[#1565C0]" />
            Fetching current global bulletins...
          </div>
        ) : (
          <div className="flex flex-col gap-10 sm:gap-12">
            {data?.data?.map((post: any) => (
              <PostCard key={post.blog_id} post={post} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
