"use client";

import { useState, useRef, useEffect } from "react";
import { X, Trash2 } from "lucide-react";
import { useAddComment, useDeleteComment, useGetComment } from "@/lib/hooks";

interface CommentModalProps {
  blogId: number;
  onClose: () => void;
}

export default function CommentModal({ blogId, onClose }: CommentModalProps) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<any[]>([]);
  const [activeDeleteId, setActiveDeleteId] = useState<number | null>(null);

  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const commentsEndRef = useRef<HTMLDivElement | null>(null);

  const addCommentMutation = useAddComment();
  const getComments = useGetComment();
  const deleteCommentMutation = useDeleteComment();

  const scrollToBottom = () => {
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getComments.mutateAsync({
          blogId,
          page: 1,
          limit: 10,
        });

        if (response?.data) {
          setComments((prev) => {
            const combined = [...prev, ...response.data];
            const uniqueComments = Array.from(
              new Map(combined.map((comment) => [comment.comment_id, comment])).values(),
            );
            return uniqueComments;
          });
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [blogId]);

  useEffect(() => {
    if (comments.length > 0) {
      scrollToBottom();
    }
  }, [comments.length]);

  const handleCreateComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!commentText.trim()) return;

    try {
      const response = await addCommentMutation.mutateAsync({
        blogId,
        text: commentText,
      });

      setCommentText("");

      if (response?.data) {
        setComments((prev) => {
          const newComment = response.data;

          if (prev.some((comment) => comment.comment_id === newComment.comment_id)) {
            return prev;
          }

          return [...prev, newComment];
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const startPress = (commentId: number) => {
    longPressTimer.current = setTimeout(() => {
      setActiveDeleteId(commentId);
    }, 700);
  };

  const endPress = () => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
  };

  const confirmDelete = async (commentId: number) => {
    if (!confirm("Delete this comment permanently?")) return;

    try {
      await deleteCommentMutation.mutateAsync(commentId);
      setComments((prev) => prev.filter((comment) => comment.comment_id !== commentId));
      setActiveDeleteId(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150 border border-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
          <h3 className="text-base font-semibold text-slate-800">
            Comments ({comments.length ?? 0})
          </h3>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Main Cards Section matching photo style */}
        <div className="my-2 max-h-[360px] space-y-4 overflow-y-auto pr-1">
          {comments.length > 0 ? (
            comments.map((c: any) => {
              const fullName = `${c.first_name ?? ""} ${c.last_name ?? ""}`.trim() || "Anonymous";
              const initials = fullName.slice(0, 2).toUpperCase();

              return (
                <div
                  key={`${c.comment_id}`}
                  onTouchStart={() => startPress(c.comment_id)}
                  onTouchEnd={endPress}
                  className="group relative rounded-2xl bg-[#f4f4f6] p-4 transition-all hover:bg-[#eaeaea]"
                >
                  {/* Top Bar: User details & Timestamp pill */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      {c.avatar_url ? (
                        <img
                          src={c.avatar_url}
                          alt={fullName}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-[11px] font-bold text-white">
                          {initials}
                        </div>
                      )}
                      <span className="text-xs font-bold text-slate-900">{fullName}</span>
                    </div>

                    <span className="rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-medium text-slate-500 shadow-sm">
                      {new Date(c.comment_date).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Comment Body */}
                  <p className="text-xs text-slate-600 leading-relaxed pl-1 mb-2">
                    {c.comment_text}
                  </p>

                  {/* Actions Section */}
                  <div className="flex justify-end gap-1.5 pt-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        confirmDelete(c.comment_id);
                      }}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm transition hover:bg-red-50 hover:text-red-600 md:opacity-0 md:group-hover:opacity-100"
                      title="Delete comment"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>

                  {/* Contextual Mobile Long Press Delete Confirmation Overlay */}
                  {activeDeleteId === c.comment_id && (
                    <div className="absolute inset-0 flex items-center justify-between rounded-2xl bg-red-500/95 px-5 animate-in fade-in duration-100 z-10">
                      <span className="text-xs font-medium text-white">Delete this comment?</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => confirmDelete(c.comment_id)}
                          className="rounded-lg bg-white p-1.5 text-red-600 shadow-sm hover:bg-slate-50"
                        >
                          <Trash2 size={14} />
                        </button>
                        <button
                          onClick={() => setActiveDeleteId(null)}
                          className="rounded-lg bg-red-700 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-red-800"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p className="py-8 text-center text-xs text-slate-400">
              No comments yet. Start the conversation!
            </p>
          )}
          <div ref={commentsEndRef} />
        </div>

        {/* Form Bar */}
        <form
          onSubmit={handleCreateComment}
          className="flex gap-2 mt-4 pt-2 border-t border-slate-100"
        >
          <input
            type="text"
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="flex-1 rounded-xl border border-slate-200 bg-[#f4f4f6] px-3.5 py-2.5 text-xs text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
          />
          <button
            type="submit"
            disabled={addCommentMutation.isPending}
            className="rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white hover:bg-slate-800 transition disabled:opacity-50"
          >
            {addCommentMutation.isPending ? "Posting..." : "Post"}
          </button>
        </form>
      </div>
    </div>
  );
}
