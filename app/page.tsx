"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PartnershipModal from "@/components/PartnershipModal";
import { smallBtn, testimonials } from "@/lib/data";
import Hero from "@/components/home/Hero";
// import PoweredBy from "@/components/home/poweredBy";
import ProblemSection from "@/components/home/ProblemSection";
import Solution from "@/components/home/Solution";
import PoweredBy from "@/components/home/PoweredBy";

export default function HomePage() {
  const [activeTestimony, setActiveTestimony] = useState(0);
  const [isPartnerModalOpen, setPartnerModalOpen] = useState(false);

  const prev = () => setActiveTestimony((p) => (p - 1 + testimonials.length) % testimonials.length);
  const next = () => setActiveTestimony((p) => (p + 1) % testimonials.length);

  return (
    <main>
      {/* Hero */}
      <Hero setPartnerModalOpen={setPartnerModalOpen} />

      {isPartnerModalOpen && <PartnershipModal onClose={() => setPartnerModalOpen(false)} />}

      {/* Powered By */}
      <PoweredBy />

      {/* Problem section */}
      <ProblemSection />

      {/* Solution */}
      <Solution />

      {/* Impact */}
      <section className="mx-auto max-w-[1100px] px-5 py-12 text-center sm:px-10 md:py-[72px]">
        <h2 className="mb-12 text-[1.55rem] font-bold leading-[1.25] md:text-[1.75rem]">
          Our <span className="text-[#1565C0]">Growing</span>{" "}
          <span className="text-[#FBA310]">Impact</span>
        </h2>
        <div className="relative left-1/2 right-1/2 w-full -translate-x-1/2">
          <Image
            src="/Impact.png"
            alt="Our growing impact"
            width={1100}
            height={500}
            className="h-auto w-full object-cover"
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#F5F7FA] px-5 py-12 text-center sm:px-10 md:py-[72px]">
        <h2 className="mb-12 text-[1.55rem] font-bold leading-[1.25] text-[#1f2937] md:text-[1.75rem]">
          Real <span className="text-[#1565C0]">Voices</span>, Real{" "}
          <span className="text-[#FBA310]">Change</span>
        </h2>

        <div className="mx-auto max-w-[720px] overflow-hidden px-1 pt-6">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${activeTestimony * 100}%)` }}
          >
            {testimonials.map((t) => (
              <article className="w-full shrink-0 px-2" key={t.name}>
                <div className="relative mx-auto flex max-w-[420px] flex-col items-center rounded-2xl border border-[#ECEEF2] bg-white px-6 pb-7 pt-9 shadow-[0_6px_18px_rgba(0,0,0,0.04)]">
                  {/* Optimized Avatar Container */}
                  <div className="absolute -top-5 z-10 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-[#39B96F] bg-[#E9FFF1] shadow-sm">
                    <Image
                      src={t.avatar}
                      alt={`${t.name}'s avatar`}
                      width={55}
                      height={55}
                      className="h-full w-full object-cover"
                      priority={activeTestimony === 0}
                    />
                  </div>

                  <p className="mb-5 text-center text-[0.76rem] leading-[1.6] text-[#5C6472]">
                    &quot;{t.quote}&quot;
                  </p>
                  <p className="text-[0.9rem] font-semibold text-[#2B3240]">{t.name}</p>
                  <p className="mt-1 text-[0.68rem] text-[#7B8493]">{t.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Pagination dots & navigation arrows below remain the same */}
        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              aria-label={`Go to testimony ${i + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${activeTestimony === i ? "bg-[#1F2937]" : "bg-[#D8DEE8]"}`}
              onClick={() => setActiveTestimony(i)}
              type="button"
            />
          ))}
        </div>

        <div className="mt-4 flex justify-center gap-3">
          <button
            onClick={prev}
            aria-label="Previous"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#A0A7B5] transition-colors hover:bg-[#F4F6FA]"
          >
            <ArrowLeft size={14} strokeWidth={2.2} />
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#6B7280] transition-colors hover:bg-[#F4F6FA]"
          >
            <ArrowRight size={14} strokeWidth={2.2} />
          </button>
        </div>
      </section>

      {/* Join section */}
      <section className="bg-white px-5 py-12 text-center sm:px-10 md:py-[72px]" id="partner">
        <h2 className="mb-3 text-[1.55rem] font-bold leading-[1.25] text-[#1F2937] md:text-[1.75rem]">
          Join the Movement to Protect Antibiotics
        </h2>
        <p className="mx-auto mb-8 max-w-[640px] text-[0.82rem] leading-[1.7] text-[#3F4754] md:text-[0.95rem]">
          Everyone has a role to play in safeguarding the future of antibiotics. You can join Voice
          Vigil as a Language Champion, partner with us, or support our mission to empower
          communities.
        </p>
        {/* <div className="mx-auto mb-8 h-[140px] w-full max-w-[960px] rounded-[8px] bg-[#D9D9D9] sm:h-[180px] md:h-[210px]" /> */}
        <div className="mx-auto mb-8 h-[160px] w-full max-w-[960px] rounded-[12px] bg-[#D9D9D9] sm:h-[180px] md:h-[210px] overflow-hidden">
          <img
            src="/movement.png"
            className="h-full w-full object-cover"
            alt="Join the Movement to Protect Antibiotics"
          />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 max-[600px]:flex-col">
          <button className={smallBtn("orange")}>Access Resources</button>
          <button className={smallBtn("blueOutline")}>Become a Language Champion</button>
          <button className={smallBtn("blue")} onClick={() => setPartnerModalOpen(true)}>
            Partner With Us
          </button>
          <button className={smallBtn("blue")}>Support the Project</button>
        </div>
      </section>

      {/* Partners */}
      <section className="mx-auto max-w-full bg-[#FBFBFB] px-5 py-12 text-center sm:px-10 md:py-[72px]">
        <h2 className="mx-auto mb-3 max-w-[760px] text-[1.55rem] font-bold leading-[1.2] text-[#1F2937] md:text-[1.9rem]">
          Our Partners and Supporters
        </h2>
        <p className="mx-auto mb-8 max-w-[690px] text-[0.78rem] leading-[1.7] text-[#3F4754] md:text-[0.92rem]">
          Voice Vigil collaborates with universities, Veterinary professionals, public health
          experts, and community organizations to expand access to AMR education.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-16 sm:gap-12">
          <Image
            src="/voicevigil.png"
            alt="VoiceVigil"
            width={128}
            height={128}
            className="h-32 w-auto object-contain"
          />
          <div className="rounded-xl bg-[#D9D9D959] p-3">
            <Image
              src="/trinity.png"
              alt="Trinity"
              width={128}
              height={128}
              className="h-32 w-auto object-contain"
            />
          </div>
          <Image
            src="/vetkonect.png"
            alt="VetKonect"
            width={128}
            height={128}
            className="h-32 w-auto object-contain"
          />
        </div>
      </section>

      {/* Future CTA */}
      <section className="bg-white px-5 py-12 text-center sm:px-10 md:py-[72px]">
        <h2 className="mx-auto mb-3 max-w-[760px] text-[1.55rem] font-bold leading-[1.2] text-[#1F2937] md:text-[1.9rem]">
          The Future of Antibiotics Depends on What We Do Today
        </h2>
        <p className="mx-auto mb-8 max-w-[690px] text-[0.78rem] leading-[1.7] text-[#3F4754] md:text-[0.92rem]">
          By empowering communities with knowledge in their own language, we can slow antimicrobial
          resistance and protect life-saving medicines for future generations.
        </p>
        {/* <div className="mx-auto mb-6 h-[140px] w-full max-w-[980px] rounded-[8px] bg-[#D9D9D9] sm:h-[180px] md:h-[220px]" /> */}
        <div className="mx-auto mb-8 h-[160px] w-full max-w-[960px] rounded-[12px] bg-[#D9D9D9] sm:h-[180px] md:h-[210px] overflow-hidden">
          <img
            src="/future.png"
            className="h-full w-full object-cover"
            alt="Join the Movement to Protect Antibiotics"
          />
        </div>
        <div className="flex justify-center gap-4 max-[600px]:flex-col max-[600px]:items-center">
          <button className={smallBtn("blueOutline")}>Contact Us</button>
          <button className={smallBtn("blue")}>Join Voice Vigil</button>
        </div>
      </section>
    </main>
  );
}
