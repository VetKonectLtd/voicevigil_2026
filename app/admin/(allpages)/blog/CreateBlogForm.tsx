"use client";

import { useEffect, useState } from "react";
import { useCreateBlog, useUpdateBlog } from "@/lib/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import imageCompression from "browser-image-compression";

interface BlogPostFormData {
  blog_text: string;
  blog_image?: FileList | null;
  blog_status: number;
  remove_image: boolean;
}

interface CreateBlogFormProps {
  initialData?: {
    blog_id?: number;
    blog_text?: string;
    blog_image?: string | null;
    blog_status?: number;
  };
  onSuccess?: () => void;
}

// Convert a remote Image URL into a Base64 string
const urlToBase64 = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Failed to convert image URL to base64:", error);
    return "";
  }
};

// Fallback HTML5 Canvas compressor
const compressImageToCanvasBase64 = (
  file: File,
  maxWidth = 1024,
  maxHeight = 1024,
  quality = 0.6,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Failed to get canvas context"));

        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

export default function CreateBlogForm({ initialData, onSuccess }: CreateBlogFormProps) {
  const isEditMode = Boolean(initialData?.blog_id);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.blog_image || null);
  const [existingBase64, setExistingBase64] = useState<string>("");
  const [isCompressing, setIsCompressing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BlogPostFormData>({
    defaultValues: {
      blog_text: initialData?.blog_text || "",
      blog_status: initialData?.blog_status ?? 1,
      remove_image: false,
    },
  });

  const removeImageChecked = watch("remove_image");

  const createBlogMutation = useCreateBlog();
  const updateBlogMutation = useUpdateBlog();

  // If initialData contains an Image URL, convert it to Base64 automatically
  useEffect(() => {
    if (initialData) {
      setValue("blog_text", initialData.blog_text || "");
      setValue("blog_status", initialData.blog_status ?? 1);

      if (initialData.blog_image) {
        setImagePreview(initialData.blog_image);

        if (initialData.blog_image.startsWith("http")) {
          urlToBase64(initialData.blog_image).then((base64) => {
            setExistingBase64(base64);
          });
        } else {
          setExistingBase64(initialData.blog_image);
        }
      }
    }
  }, [initialData, setValue]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("remove_image", false); // Uncheck remove image if a new one is selected
    } else {
      setImagePreview(initialData?.blog_image || null);
    }
  };

  const onSubmit = async (formData: BlogPostFormData) => {
    try {
      const file = formData.blog_image?.[0] || null;
      let finalBase64Image: string | null = null;

      // 1. If user checked "remove_image", set empty image string
      if (formData.remove_image) {
        finalBase64Image = null;
      }
      // 2. If user uploaded a new file, compress and encode it
      else if (file) {
        setIsCompressing(true);
        try {
          const options = {
            maxSizeMB: 0.05,
            maxWidthOrHeight: 600,
            useWebWorker: true,
            fileType: "image/jpeg",
            initialQuality: 0.4,
          };
          const compressedFile = await imageCompression(file, options);
          finalBase64Image = await imageCompression.getDataUrlFromFile(compressedFile);
        } catch (compErr) {
          console.warn("browser-image-compression fallback used:", compErr);
          finalBase64Image = await compressImageToCanvasBase64(file, 600, 600, 0.4);
        } finally {
          setIsCompressing(false);
        }
      }
      // 3. Keep converted Base64 from existing image
      else if (isEditMode) {
        finalBase64Image = existingBase64;
      }

      const payload = {
        ...(isEditMode && { blog_id: initialData?.blog_id }),
        blog_text: formData.blog_text,
        blog_image: finalBase64Image,
        blog_status: Number(formData.blog_status),
        remove_image: formData.remove_image,
      };

      console.log(`${isEditMode ? "Updating" : "Submitting"} blog payload:`, payload);

      let response;
      if (isEditMode) {
        response = await updateBlogMutation.mutateAsync(payload);
      } else {
        response = await createBlogMutation.mutateAsync(payload);
      }

      console.log("Raw Server Response:", response);

      if (
        response?.status === false ||
        response?.status === 0 ||
        response?.error ||
        response?.success === false
      ) {
        throw new Error(response?.message || response?.error || "Server rejected the submission.");
      }

      toast.success(
        isEditMode ? "Blog post updated successfully!" : "Blog post published successfully!",
      );

      if (!isEditMode) {
        reset();
        setImagePreview(null);
      }

      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      console.error("Failed to save blog post:", err);
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to save blog post. Please try again.";

      toast.error(errorMessage);
    } finally {
      setIsCompressing(false);
    }
  };

  const isLoading =
    isSubmitting || createBlogMutation.isPending || updateBlogMutation.isPending || isCompressing;

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Image Box Container */}
        <div className="space-y-2">
          <label className="relative block h-40 cursor-pointer overflow-hidden rounded-[24px] border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500 transition hover:bg-slate-100">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={removeImageChecked}
              {...register("blog_image", {
                onChange: handleImageChange,
              })}
            />
            {imagePreview && !removeImageChecked ? (
              <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-2">
                <p className="font-medium">{removeImageChecked ? "Image removed" : "Add image"}</p>
                <span className="text-xs text-slate-400">
                  {removeImageChecked
                    ? "Uncheck remove box to upload new image"
                    : "Click to upload an image (optional)"}
                </span>
              </div>
            )}
          </label>

          {/* Remove Image Checkbox (only when image exists or in edit mode) */}
          {/* {(imagePreview || isEditMode) && (
            <label className="flex items-center gap-2 px-1 text-xs text-slate-600 cursor-pointer select-none">
              <input
                type="checkbox"
                {...register("remove_image")}
                className="h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-500"
              />
              Remove existing image
            </label>
          )} */}
        </div>

        {/* Status Option (Publish vs Draft) */}
        {isEditMode && (
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">Post Status</label>
            <select
              {...register("blog_status", { valueAsNumber: true })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#1565C0] focus:bg-white"
            >
              <option value={1}>Publish (Visible)</option>
              <option value={0}>Draft (Hidden)</option>
            </select>
          </div>
        )}

        {/* Editor Textarea */}
        <div>
          <textarea
            rows={5}
            placeholder="Type in the post content..."
            {...register("blog_text", {
              required: "Post content is required",
              minLength: {
                value: 10,
                message: "Post must be at least 10 characters long",
              },
            })}
            className="w-full rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 outline-none transition focus:border-[#1565C0] focus:bg-white"
          />
          {errors.blog_text && (
            <p className="mt-1 text-xs text-red-500">{errors.blog_text.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-2xl bg-[#1565C0] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0D47A1] disabled:opacity-60"
        >
          {isCompressing
            ? "Compressing image..."
            : isLoading
              ? "Saving..."
              : isEditMode
                ? "Update Post"
                : "Post"}
        </button>
      </form>
    </div>
  );
}
