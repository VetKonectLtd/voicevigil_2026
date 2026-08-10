"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";

import { blueBtn, blueOutlineBtn, orangeBtn } from "@/lib/data";

type HeroType = {
  setPartnerModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const images = [
  "/hero/img5.png",
  "/hero/img4.png",
  "/hero/img1.png",
  "/hero/img2.png",
  "/hero/img3.png",
];

// Per-offset styling — offset = index - activeIndex
const CARD_STYLES: Record<
  number,
  { x: number; y: number; rotate: number; scale: number; z: number; overlay: number }
> = {
  "-2": { x: -230, y: 26, rotate: -18, scale: 0.82, z: 10, overlay: 0.55 },
  "-1": { x: -125, y: 10, rotate: -9, scale: 0.92, z: 20, overlay: 0.28 },
  "0": { x: 0, y: 0, rotate: 0, scale: 1, z: 30, overlay: 0 },
  "1": { x: 125, y: 10, rotate: 9, scale: 0.92, z: 20, overlay: 0.28 },
  "2": { x: 230, y: 26, rotate: 18, scale: 0.82, z: 10, overlay: 0.55 },
};

export default function Hero({ setPartnerModalOpen }: HeroType) {
  const [activeIndex, setActiveIndex] = useState(2); // Center image initially
  const touchStartX = useRef<number | null>(null);

  const goTo = (index: number) => {
    const clamped = Math.max(0, Math.min(images.length - 1, index));
    setActiveIndex(clamped);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) return;
    touchStartX.current = touch.clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touch = e.changedTouches[0];
    if (!touch) {
      touchStartX.current = null;
      return;
    }
    const deltaX = touch.clientX - touchStartX.current;
    if (Math.abs(deltaX) > 40) {
      goTo(activeIndex + (deltaX < 0 ? 1 : -1));
    }
    touchStartX.current = null;
  };

  const getCardStyle = (index: number): React.CSSProperties => {
    const diff = index - activeIndex;
    const style = CARD_STYLES[diff] ?? {
      x: diff > 0 ? 320 : -320,
      y: 30,
      rotate: diff > 0 ? 24 : -24,
      scale: 0.7,
      z: 1,
      overlay: 0.7,
    };

    return {
      transform: `translate(-50%, 0) translate(${style.x}px, ${style.y}px) rotate(${style.rotate}deg) scale(${style.scale})`,
      zIndex: style.z,
      transition: "transform 0.45s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.45s ease",
      pointerEvents: diff === 0 ? "none" : "auto",
    };
  };

  return (
    <section className="fade-up px-5 py-12 text-center sm:px-10 sm:py-16 md:py-20">
      <div className="mx-auto max-w-[760px]">
        {/* Headline */}
        <h1 className="mb-5 text-[22px] font-bold leading-[1.25] text-[#1A1A2E] sm:text-[28px] md:text-[34px]">
          Amplifying <span className="text-[#1565C0]">Antimicrobial Resistance</span> Awareness
          <br className="hidden sm:inline" /> through{" "}
          <span className="text-[#FF6D00]">Local Languages</span>
        </h1>

        {/* Description Body */}
        <p className="mx-auto mb-10 max-w-[640px] text-sm leading-relaxed text-[#444] sm:text-base">
          We train young leaders and community champions to translate antimicrobial resistance
          education into local languages, empowering communities across Africa to use antibiotics
          responsibly and safeguard the future of human and animal health.
        </p>

        {/* Fan Gallery Stack */}
        <div
          className="relative mx-auto mb-6 h-[210px] w-full max-w-[720px] sm:h-[260px] md:h-[300px]"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => goTo(index)}
              style={getCardStyle(index)}
              aria-label={`Go to slide ${index + 1}`}
              className="absolute left-1/2 top-0 h-[180px] w-[220px] overflow-hidden rounded-2xl shadow-lg sm:h-[220px] sm:w-[270px] md:h-[260px] md:w-[320px]"
            >
              <Image
                src={src}
                alt={`VoiceVigil activity slide ${index + 1}`}
                fill
                sizes="(max-width: 768px) 60vw, 320px"
                className="object-cover"
                priority={index === activeIndex}
              />
              {/* Whiteout fade for background cards */}
              {index !== activeIndex && (
                <div
                  className="absolute inset-0 bg-white transition-opacity duration-300"
                  style={{ opacity: CARD_STYLES[index - activeIndex]?.overlay ?? 0.7 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Custom Carousel Navigation Dots */}
        <div className="mb-10 mt-8 flex items-center justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full outline-none transition-all duration-300 ${
                activeIndex === i ? "w-6 bg-[#1565C0]" : "w-2 bg-[#D5D8E2] hover:bg-slate-400"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Action Callouts */}
        {/* Action Callouts */}
        <div className="mx-auto flex w-full max-w-[420px] flex-col items-stretch gap-3 pt-2 sm:max-w-none sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
          <button className={`${orangeBtn} w-full justify-center sm:w-auto`}>
            Access Resources
          </button>
          <button className={`${blueOutlineBtn} w-full justify-center sm:w-auto`}>
            Become a Language Champion
          </button>
          <button
            className={`${blueBtn} w-full justify-center sm:w-auto`}
            onClick={() => setPartnerModalOpen(true)}
          >
            Partner With Us
          </button>
        </div>
      </div>
    </section>
  );
}
