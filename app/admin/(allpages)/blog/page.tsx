"use client";

import { useState } from "react";
import CreateBlogForm from "./CreateBlogForm"; // Update mapping context path based on your folder system
import BlogList from "./BlogList";

export default function BlogAdminPage() {
  const [activeTab, setActiveTab] = useState<"create" | "view">("create");
  const [blogCount, setBlogCount] = useState<number>(0);

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
      {/* Header & Tabs Controller */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Blog Management</h2>
          <p className="mt-1 text-sm text-slate-500">
            {activeTab === "create" ? "Publish a new update" : "Manage your existing posts"}
          </p>
        </div>

        <div className="flex rounded-2xl bg-slate-100 p-1 self-start sm:self-center">
          <button
            onClick={() => setActiveTab("create")}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              activeTab === "create"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Create Post
          </button>
          <button
            onClick={() => setActiveTab("view")}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              activeTab === "view"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            View Posts ({blogCount})
          </button>
        </div>
      </div>

      {/* Conditional UI Injection */}
      {activeTab === "create" ? <CreateBlogForm /> : <BlogList onBlogsLoadedCount={setBlogCount} />}
    </div>
  );
}
