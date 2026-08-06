"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Music2 } from "lucide-react";
import { SiFacebook, SiInstagram } from "@icons-pack/react-simple-icons";

const quickLinks = [
  { label: "Problems", href: "#" },
  { label: "Our solutions", href: "#" },
  { label: "Future of Antibiotics", href: "#" },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="border-t border-[#ececec] bg-[#fbfbfb] px-6 py-10 sm:px-10 md:px-14 md:py-12">
      <div className="mx-auto grid max-w-[1120px] gap-10 md:grid-cols-[1.7fr_1fr_1fr] md:gap-16">
        {/* Brand + newsletter */}
        <div className="flex flex-col items-start">
          <Link href="/" className="inline-flex flex-col items-start gap-1">
            <Image
              src="/voicevigil.png"
              alt="VoiceVigil logo"
              width={120}
              height={40}
              className="h-10 w-auto object-contain"
            />
            <span className="text-[13px] font-semibold leading-none tracking-[-0.02em] text-[#1657c0]">
              Voice<span className="text-[#f68b1f]">Vigil</span>
            </span>
          </Link>

          <p className="mt-7 text-[13px] text-[#2f2f2f]">Enter your email to receive newsletter</p>

          <div className="mt-4 flex w-full max-w-[248px] items-center rounded-full border border-[#d9d9d9] bg-white p-1 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
            <input
              type="email"
              placeholder="example@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-9 flex-1 rounded-full border-0 bg-transparent px-5 text-[11px] text-[#555] outline-none placeholder:text-[#8a8a8a]"
            />
            <button
              type="button"
              className="inline-flex h-8 items-center gap-1.5 rounded-full bg-[#6d6d72] px-4 text-[11px] font-medium text-white transition-colors hover:bg-[#5f5f64]"
            >
              <ArrowRight size={12} strokeWidth={2.5} />
              <span>Submit</span>
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-[14px] font-medium text-[#1657c0]">Quick Links</h4>
          <ul className="mt-5 space-y-4 text-[13px] text-[#444]">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="transition-colors hover:text-[#1657c0]">
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <Link href="/blog" className="transition-colors hover:text-[#1657c0]">
                Blogs
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-[14px] font-medium text-[#1657c0]">Contact us</h4>
          <a
            href="mailto:Voicevigil@gmail.com"
            className="mt-5 block text-[13px] text-[#555] transition-colors hover:text-[#1657c0]"
          >
            Voicevigil@gmail.com
          </a>
          <div className="mt-4 flex items-center gap-2.5 text-[#1657c0]">
            <a
              href="#"
              aria-label="Facebook"
              className="inline-flex h-4 w-4 items-center justify-center rounded-full transition-opacity hover:opacity-80"
            >
              <SiFacebook size={14} fill="currentColor" strokeWidth={1.8} />
            </a>
            <a
              href="#"
              aria-label="X"
              className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-current text-[9px] font-semibold leading-none transition-opacity hover:opacity-80"
            >
              X
            </a>
            <a
              href="#"
              aria-label="TikTok"
              className="inline-flex h-4 w-4 items-center justify-center rounded-full transition-opacity hover:opacity-80"
            >
              <Music2 size={14} strokeWidth={2.1} />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="inline-flex h-4 w-4 items-center justify-center rounded-full transition-opacity hover:opacity-80"
            >
              <SiInstagram size={14} strokeWidth={2} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
