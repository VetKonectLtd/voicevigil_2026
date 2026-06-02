'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function Navbar() {
  const pathname = usePathname()
  const { user } = useAuth()

  const linkClass = (path: string) =>
    pathname === path
      ? 'text-[#1565C0]'
      : 'transition-colors hover:text-[#1565C0]'

  return (
    <nav className="sticky overflow-hidden top-0 z-[100] flex h-16 items-center justify-between border-b border-[#E0E5EF] bg-white px-10 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      <Link href="/" className="flex items-center gap-2 text-[1.25rem] font-bold">
        <Image
          src="/voicevigil.png"
          alt="VoiceVigil logo"
          width={180}
          height={70}
          className="block h-[34px] w-auto max-w-[180px] object-contain md:h-[70px]"
        />
      </Link>

      <div className="flex items-center gap-7 text-[0.95rem] font-medium text-[#1A1A2E]">
        <Link href="/blog" className={linkClass('/blog')}>
          Blog
        </Link>

        {user?.role === 'admin' && (
          <Link
            href="/admin"
            className={
              pathname.startsWith('/admin')
                ? 'text-[#1565C0]'
                : 'transition-colors hover:text-[#1565C0]'
            }
          >
            Admin
          </Link>
        )}

        <Link href="/login" className={linkClass('/login')}>
          Login
        </Link>

        <Link
          href="/#partner"
          className="px-[18px] py-1.5 text-black transition-all hover:text-[#1565C0]"
        >
          Partner with us
        </Link>
      </div>
    </nav>
  )
}
