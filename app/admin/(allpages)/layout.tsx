'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutGrid, Users, FileText, Share2, User, LogOut } from 'lucide-react'
import { useAuth, RequireAdmin } from '@/context/AuthContext'

const navItems = [
  { label: 'Dashboard', to: '/admin', icon: LayoutGrid },
  { label: 'Registered users', to: '/admin/users', icon: Users },
  { label: 'Blog', to: '/admin/blog', icon: FileText },
  { label: 'Partner list', to: '/admin/partners', icon: Share2 },
  { label: 'Profile', to: '/admin/profile', icon: User },
]

function AdminSidebar() {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.replace('/login')
  }

  return (
    <aside className="w-full max-w-[260px] rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
      <div className="mb-10 flex items-center gap-3">
        <Image src="/voicevigil.png" alt="VoiceVigil" width={40} height={40} className="h-10 w-auto" />
        <span className="text-lg font-semibold text-slate-900">VoiceVigil</span>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive =
            item.to === '/admin' ? pathname === '/admin' : pathname.startsWith(item.to)

          return (
            <Link
              key={item.to}
              href={item.to}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                isActive
                  ? 'bg-[#EFF5FF] text-[#1565C0]'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="mt-12 border-t border-slate-200 pt-5">
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-2xl bg-[#EFF5FF] px-4 py-3 text-sm font-semibold text-[#1C3B82] transition hover:bg-[#E5ECFF]"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>

      {user && (
        <div className="mt-8 rounded-2xl bg-[#F8FAFF] px-4 py-4 text-sm text-slate-600">
          <p className="font-medium text-slate-900">Signed in as</p>
          <p className="truncate">{user.email}</p>
          <p className="mt-1 text-xs text-slate-500">Admin access</p>
        </div>
      )}
    </aside>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()

  return (
    <RequireAdmin>
      <div className="min-h-screen bg-[#F7F8FB]">
        <div className="mx-auto flex min-h-screen max-w-[1400px] gap-6 px-4 py-6 sm:px-6 lg:px-8">
          <AdminSidebar />

          <section className="flex-1">
            {/* Top header bar */}
            <div className="mb-6 flex items-center justify-between rounded-[32px] bg-white px-6 py-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
              <div>
                <h1 className="text-2xl font-semibold text-slate-900">Admin Section</h1>
                <p className="mt-1 text-sm text-slate-500">
                  Manage users, blog posts, partners, and your profile.
                </p>
              </div>
              <div className="inline-flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-[#1565C0] text-white font-semibold">
                  A
                </div>
                <div className="text-right text-sm">
                  <p className="font-semibold text-slate-900">Admin</p>
                  <p className="text-slate-500">{user?.email}</p>
                </div>
              </div>
            </div>

            {children}
          </section>
        </div>
      </div>
    </RequireAdmin>
  )
}
