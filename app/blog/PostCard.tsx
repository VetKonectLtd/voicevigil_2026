"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, MessageCircle, ThumbsUp, Share2 } from "lucide-react";
import CommentModal from "./CommentModal";
import { IMAGE_BASE_URL } from "@/components/pathConfig";

export default function PostCard({ post }: { post: any }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const contentText = post.blog_text || "";
  const shouldTruncate = contentText.length > 240;

  const displayedText = isExpanded
    ? contentText
    : `${contentText.slice(0, 240)}${shouldTruncate ? "..." : ""}`;

  return (
    <article className="rounded-[18px] border border-[#E8EDF5] bg-white p-3 shadow-[0_4px_18px_rgba(15,23,42,0.06)] transition-shadow hover:shadow-[0_12px_30px_rgba(21,101,192,0.12)] sm:p-4">
      {/* Top Media Block */}
      <div className="relative overflow-hidden rounded-[14px] bg-[#F8FAFC]">
        <div className="relative h-[220px] w-full md:h-[320px]">
          {post.blog_image ? (
            <Image
              src={`${IMAGE_BASE_URL}/${post.blog_image}`}
              alt={`Vigil Blog ${post.blog_id}`}
              fill
              priority
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-100">
              <span className="text-xs font-medium text-slate-400">No Content Banner Attached</span>
            </div>
          )}
        </div>
      </div>

      {/* Counter Indicators Panel Row */}
      <div className="flex flex-wrap items-center justify-end gap-5 px-2 py-3.5 text-[0.68rem] text-[#8A93A4]">
        <span className="inline-flex items-center gap-1.5">
          <Eye size={12} /> {post.views ?? 0} Views
        </span>
        <button
          onClick={() => setShowComments(true)}
          className="inline-flex items-center gap-1.5 transition text-[#8A93A4] hover:text-[#1565C0]"
        >
          <MessageCircle size={12} /> {post.comments_data?.length ?? 0} Comments
        </button>
        <span className="inline-flex items-center gap-1.5">
          <ThumbsUp size={12} /> {post.likes ?? 0} Likes
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Share2 size={12} /> Share
        </span>
      </div>

      {/* Main Content Layout Block */}
      <div className="border-t border-[#EDF1F6] px-2 pb-2 pt-4 sm:px-3">
        <p className="text-[0.84rem] leading-[1.85] text-[#444B59] whitespace-pre-line">
          {displayedText}{" "}
          {shouldTruncate && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="ml-1 font-semibold text-[#1565C0] hover:text-[#0D47A1] hover:underline transition"
            >
              {isExpanded ? "See less" : "See more"}
            </button>
          )}
        </p>
      </div>

      {/* Modal Overlay Viewport Mount */}
      {showComments && (
        <CommentModal
          blogId={post.blog_id}
          commentsList={post.comments_data}
          onClose={() => setShowComments(false)}
        />
      )}
    </article>
  );
}
