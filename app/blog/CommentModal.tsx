"use client";

import { useState, useRef } from "react";
import { X, Trash2 } from "lucide-react";
import { useAddComment, useDeleteComment } from "@/lib/hooks";

interface CommentModalProps {
  blogId: number;
  commentsList: any[];
  onClose: () => void;
}

export default function CommentModal({ blogId, commentsList = [], onClose }: CommentModalProps) {
  const [commentText, setCommentText] = useState("");
  const [activeDeleteId, setActiveDeleteId] = useState<number | null>(null);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);

  const addCommentMutation = useAddComment();
  const deleteCommentMutation = useDeleteComment();

  const handleCreateComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      await addCommentMutation.mutateAsync({ blogId, text: commentText });
      setCommentText("");
    } catch (err) {
      console.error(err);
    }
  };

  // Safe long press mechanics for mobile touch/mouse events
  const startPress = (commentId: number) => {
    longPressTimer.current = setTimeout(() => {
      setActiveDeleteId(commentId);
    }, 700); // 700ms threshold for long press activation
  };

  const endPress = () => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
  };

  const confirmDelete = async (commentId: number) => {
    if (confirm("Delete this comment permanently?")) {
      try {
        await deleteCommentMutation.mutateAsync(commentId);
        setActiveDeleteId(null);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[28px] border border-slate-100 bg-white p-5 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-semibold text-slate-900">
            Comments ({commentsList.length})
          </h3>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-50 hover:text-slate-600"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Comments List View */}
        <div className="my-4 max-h-[260px] space-y-3 overflow-y-auto pr-1">
          {commentsList.length > 0 ? (
            commentsList.map((c: any) => (
              <div
                key={c.comment_id}
                onMouseDown={() => startPress(c.comment_id)}
                onMouseUp={endPress}
                onMouseLeave={endPress}
                onTouchStart={() => startPress(c.comment_id)}
                onTouchEnd={endPress}
                className="relative select-none rounded-2xl bg-slate-50 p-3 transition hover:bg-slate-100 cursor-pointer"
                title="Long press to manage"
              >
                <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                  <span className="font-medium text-slate-500">User #{c.user_id}</span>
                  <span>{new Date(c.comment_date).toLocaleDateString()}</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">{c.comment_text}</p>

                {/* Contextual Delete Popover Action */}
                {activeDeleteId === c.comment_id && (
                  <div className="absolute inset-0 flex items-center justify-between rounded-2xl bg-red-500/90 px-4 animate-in fade-in duration-100">
                    <span className="text-xs font-medium text-white">Remove comment?</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => confirmDelete(c.comment_id)}
                        className="rounded-lg bg-white p-1 text-red-600 shadow-sm"
                      >
                        <Trash2 size={14} />
                      </button>
                      <button
                        onClick={() => setActiveDeleteId(null)}
                        className="rounded-lg bg-red-700 px-2 py-1 text-[10px] font-semibold text-white"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="py-6 text-center text-xs text-slate-400">
              No responses yet. Start the conversation!
            </p>
          )}
        </div>

        {/* Dynamic Form input bar */}
        <form onSubmit={handleCreateComment} className="flex gap-2">
          <input
            type="text"
            placeholder="Write an open comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none transition focus:border-[#1565C0] focus:bg-white"
          />
          <button
            type="submit"
            disabled={addCommentMutation.isPending}
            className="rounded-xl bg-[#1565C0] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0D47A1] transition disabled:opacity-50"
          >
            {addCommentMutation.isPending ? "Sending" : "Post"}
          </button>
        </form>
      </div>
    </div>
  );
}
