'use client'

import { useForm } from 'react-hook-form'
import { useSubmitPartnerForm } from '@/lib/hooks'
import type { PartnerPayload } from '@/types'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const inputClass =
  'mt-1 w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 outline-none transition focus:border-[#1565C0] focus:ring-1 focus:ring-[#1565C0]'

export default function PartnerFormModal({ isOpen, onClose }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PartnerPayload>()

  const { mutateAsync: submitPartnerForm, isSuccess, isError, error } = useSubmitPartnerForm()

  if (!isOpen) return null

  const onSubmit = async (data: PartnerPayload) => {
    await submitPartnerForm(data)
    reset()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800">Partner with us</h2>
          <button
            onClick={onClose}
            className="text-gray-500 transition hover:text-gray-700"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {isSuccess && (
          <p className="mt-4 text-sm text-green-600">
            Thank you for your interest! We will get back to you soon.
          </p>
        )}
        {isError && (
          <p className="mt-4 text-sm text-red-500">
            {error instanceof Error ? error.message : 'Failed to submit. Please try again.'}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4" noValidate>
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              {...register('fullName', { required: 'Full name is required' })}
              className={inputClass}
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-red-500">{errors.fullName.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email address',
                },
              })}
              className={inputClass}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contact
            </label>
            <input
              type="tel"
              {...register('contact', { required: 'Contact number is required' })}
              className={inputClass}
            />
            {errors.contact && (
              <p className="mt-1 text-xs text-red-500">{errors.contact.message}</p>
            )}
          </div>

          {/* Partnership Area */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Proposed Area of Partnership
            </label>
            <textarea
              {...register('partnershipArea', {
                required: 'Please describe your proposed area of partnership',
                minLength: { value: 20, message: 'Please provide more detail (min 20 characters)' },
              })}
              rows={4}
              placeholder="Kindly outline the specific areas where you can collaborate with the Voice Vigil project, highlighting how your expertise and experience can contribute to its goals."
              className={inputClass}
            />
            {errors.partnershipArea && (
              <p className="mt-1 text-xs text-red-500">{errors.partnershipArea.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700 disabled:opacity-60"
            >
              {isSubmitting ? 'Submitting…' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
