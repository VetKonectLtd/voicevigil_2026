"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { X, HelpCircle } from "lucide-react";
import { useSubmitPartnership } from "@/lib/hooks";

interface PartnershipFormData {
  fullname: string;
  email: string;
  contact: string;
  propose: string;
}

interface PartnershipModalProps {
  onClose: () => void;
}

export default function PartnershipModal({ onClose }: PartnershipModalProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const mutation = useSubmitPartnership();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PartnershipFormData>();

  const onSubmit = async (formData: PartnershipFormData) => {
    try {
      const response = await mutation.mutateAsync(formData);
      if (response.status || response.message === "send successful") {
        alert("Partnership proposal submitted successfully!");
        reset();
        onClose();
      } else {
        alert(response.message || "Submission failed. Please check details.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
      {/* Reduced outer width, rounded corners, padding, and vertical margins */}
      <div className="relative w-full max-w-md rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_20px_50px_rgba(15,23,42,0.12)] animate-in fade-in zoom-in-95 duration-150 my-6">
        {/* Compact Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition"
        >
          <X size={16} />
        </button>

        {/* Scaled down header title */}
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold text-slate-900">Partner</h2>
        </div>

        {/* Tighter grid alignment spacing */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5" noValidate>
          {/* Full Name */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">Full name</label>
            <input
              type="text"
              {...register("fullname", { required: "Full name is required" })}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 outline-none transition focus:border-[#0F766E] shadow-sm"
            />
            {errors.fullname && (
              <p className="mt-0.5 text-[10px] text-red-500">{errors.fullname.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email structure" },
              })}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 outline-none transition focus:border-[#0F766E] shadow-sm"
            />
            {errors.email && (
              <p className="mt-0.5 text-[10px] text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Contact */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">Contact</label>
            <input
              type="text"
              placeholder="+234..."
              {...register("contact", { required: "Contact parameter is required" })}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 outline-none transition focus:border-[#0F766E] shadow-sm"
            />
            {errors.contact && (
              <p className="mt-0.5 text-[10px] text-red-500">{errors.contact.message}</p>
            )}
          </div>

          {/* Proposed Area of Partnership */}
          <div className="relative">
            <div className="flex items-center gap-1 mb-1">
              <label className="text-[11px] font-semibold text-slate-700">
                Proposed Area of Partnership
              </label>
              <button
                type="button"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onClick={() => setShowTooltip(!showTooltip)}
                className="text-slate-400 hover:text-slate-600 transition outline-none"
              >
                <HelpCircle size={12} />
              </button>
            </div>

            {/* Reduced rows from 4 to 3 */}
            <textarea
              rows={3}
              {...register("propose", { required: "Please outline your proposal details" })}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 outline-none transition focus:border-[#0F766E] shadow-sm resize-none"
            />
            {errors.propose && (
              <p className="mt-0.5 text-[10px] text-red-500">{errors.propose.message}</p>
            )}

            {/* Compact Tooltip Text Box */}
            {showTooltip && (
              <div className="absolute left-1/2 md:left-auto md:right-0 bottom-full mb-1.5 z-10 w-64 -translate-x-1/2 md:translate-x-0 rounded-xl border border-slate-100 bg-white p-3 shadow-xl transition-all duration-200">
                <p className="text-[10px] leading-relaxed text-slate-600 font-medium">
                  Kindly outline the specific areas where you can collaborate with the Voice Vigil
                  project, highlighting how your expertise and experience can contribute to its
                  goals.
                </p>
              </div>
            )}
          </div>

          {/* Compact Submit Button */}
          <div className="flex justify-center pt-1">
            <button
              type="submit"
              disabled={mutation.isPending}
              className="rounded-full bg-[#0B6623] px-8 py-2 text-xs font-semibold text-white shadow-md transition hover:bg-[#074D1A] disabled:opacity-50"
            >
              {mutation.isPending ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
