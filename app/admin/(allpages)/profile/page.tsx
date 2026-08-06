'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface ProfileFormData {
  firstName: string
  lastName: string
  email: string
}

interface PasswordFormData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

const inputClass =
  'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#1565C0] focus:bg-white disabled:bg-slate-50 disabled:text-slate-400'

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [showPasswordForm, setShowPasswordForm] = useState(false)

  const profileForm = useForm<ProfileFormData>({
    defaultValues: { firstName: 'Bello', lastName: 'Adenola', email: 'belloadenola@gmail.com' },
  })

  const passwordForm = useForm<PasswordFormData>()
  const newPassword = passwordForm.watch('newPassword')

  const onProfileSubmit = async (data: ProfileFormData) => {
    // TODO: wire to profile update API
    console.log('Profile update:', data)
    setIsEditing(false)
  }

  const onPasswordSubmit = async (data: PasswordFormData) => {
    // TODO: wire to change password API
    console.log('Password change:', data)
    passwordForm.reset()
    setShowPasswordForm(false)
  }

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Profile</h2>
          <p className="mt-1 text-sm text-slate-500">Manage your admin information</p>
        </div>
        <button
          type="button"
          onClick={() => setIsEditing((v) => !v)}
          className="rounded-2xl bg-[#E7F4FF] px-4 py-2 text-sm font-semibold text-[#1565C0] transition hover:bg-[#D7E9FF]"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {/* Profile settings */}
        <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
          <p className="font-semibold text-slate-900">Profile Settings</p>
          <p className="mt-2 text-sm text-slate-500">Manage your personal information and preferences.</p>

          <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="mt-6 grid gap-4" noValidate>
            <div>
              <input
                {...profileForm.register('firstName', { required: 'First name is required' })}
                disabled={!isEditing}
                placeholder="First Name"
                className={inputClass}
              />
              {profileForm.formState.errors.firstName && (
                <p className="mt-1 text-xs text-red-500">{profileForm.formState.errors.firstName.message}</p>
              )}
            </div>
            <div>
              <input
                {...profileForm.register('lastName', { required: 'Last name is required' })}
                disabled={!isEditing}
                placeholder="Last Name"
                className={inputClass}
              />
              {profileForm.formState.errors.lastName && (
                <p className="mt-1 text-xs text-red-500">{profileForm.formState.errors.lastName.message}</p>
              )}
            </div>

            {isEditing && (
              <button
                type="submit"
                disabled={profileForm.formState.isSubmitting}
                className="rounded-2xl bg-[#1565C0] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0D47A1] disabled:opacity-60"
              >
                {profileForm.formState.isSubmitting ? 'Saving…' : 'Save changes'}
              </button>
            )}
          </form>
        </div>

        {/* Contact info & password */}
        <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
          <p className="font-semibold text-slate-900">Contact Information</p>
          <p className="mt-2 text-sm text-slate-500">Personal details for the admin account.</p>

          <div className="mt-6 grid gap-4">
            <input
              {...profileForm.register('email')}
              disabled={!isEditing}
              placeholder="Email Address"
              className={inputClass}
            />

            {!showPasswordForm ? (
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900">
                <div className="flex items-center justify-between">
                  <span>Password</span>
                  <button
                    type="button"
                    onClick={() => setShowPasswordForm(true)}
                    className="text-sm font-semibold text-[#EA4335]"
                  >
                    Change Password
                  </button>
                </div>
                <div className="mt-3 h-10 rounded-2xl bg-slate-100" />
              </div>
            ) : (
              <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-3" noValidate>
                <input
                  type="password"
                  placeholder="Current Password"
                  {...passwordForm.register('currentPassword', { required: 'Required' })}
                  className={inputClass}
                />
                <input
                  type="password"
                  placeholder="New Password"
                  {...passwordForm.register('newPassword', {
                    required: 'Required',
                    minLength: { value: 8, message: 'Min 8 characters' },
                  })}
                  className={inputClass}
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  {...passwordForm.register('confirmPassword', {
                    required: 'Required',
                    validate: (v) => v === newPassword || 'Passwords do not match',
                  })}
                  className={inputClass}
                />
                {Object.values(passwordForm.formState.errors).map((e) =>
                  e?.message ? (
                    <p key={e.message} className="text-xs text-red-500">{e.message}</p>
                  ) : null,
                )}
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={passwordForm.formState.isSubmitting}
                    className="flex-1 rounded-2xl bg-[#1565C0] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0D47A1] disabled:opacity-60"
                  >
                    {passwordForm.formState.isSubmitting ? 'Saving…' : 'Save'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPasswordForm(false)}
                    className="flex-1 rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Delete account */}
      <div className="mt-6 rounded-[28px] border border-slate-200 bg-white p-6">
        <h3 className="font-semibold text-slate-900">My Account</h3>
        <p className="mt-2 text-sm text-slate-500">Permanently delete your admin account.</p>
        <button className="mt-4 rounded-2xl border border-[#EA4335] px-4 py-3 text-sm font-semibold text-[#EA4335] transition hover:bg-[#FDE8E6]">
          Delete account
        </button>
      </div>
    </div>
  )
}
