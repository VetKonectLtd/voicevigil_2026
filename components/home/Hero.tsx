import { blueBtn, blueOutlineBtn, orangeBtn } from "@/lib/data";
import React from "react";

type HeroType = {
  setPartnerModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const Hero = ({ setPartnerModalOpen }: HeroType) => {
  return (
    <>
      <section className="fade-up px-5 py-12 text-center sm:px-10 sm:py-16 md:py-20">
        <div className="mx-auto max-w-[760px]">
          <h1 className="mb-5 text-[20px] font-bold leading-[1.25] text-[#1A1A2E] md:text-[30px]">
            Amplifying <span className="text-[#1565C0]">Antimicrobial Resistance</span> Awareness
            <br />
            through <span className="text-[#FF6D00]">Local Languages</span>
          </h1>
          <p className="mx-auto mb-8 max-w-[620px] text-base text-[#444]">
            We train young leaders and community champions to translate antimicrobial resistance
            education into local languages, empowering communities across Africa to use antibiotics
            responsibly and safeguard the future of human and animal health.
          </p>

          {/* Phone mockup */}
          <div className="mx-auto mb-8 w-full max-w-[650px]">
            <div className="relative h-[190px]">
              <div className="absolute left-[6%] top-7 h-[122px] w-[39%] -rotate-[14deg] rounded-xl bg-[#ECECEC]" />
              <div className="absolute left-[22%] top-2 h-[132px] w-[30%] -rotate-[7deg] rounded-xl bg-[#ECECEC]" />
              <div className="absolute right-[22%] top-2 h-[132px] w-[30%] rotate-[7deg] rounded-xl bg-[#ECECEC]" />
              <div className="absolute right-[6%] top-7 h-[122px] w-[39%] rotate-[14deg] rounded-xl bg-[#ECECEC]" />
              <div className="absolute left-1/2 top-0 h-[136px] w-[34%] -translate-x-1/2 rounded-2xl bg-[#CFCFD2] shadow-[0_4px_10px_rgba(0,0,0,0.08)]" />
            </div>
            <div className="mt-1 flex justify-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#D5D8E2]" />
              <span className="h-2 w-2 rounded-full bg-[#1565C0]" />
              <span className="h-2 w-2 rounded-full bg-[#D5D8E2]" />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button className={orangeBtn}>Access Resources</button>
            <button className={blueOutlineBtn}>Become a Language Champion</button>
            <button className={blueBtn} onClick={() => setPartnerModalOpen(true)}>
              Partner With Us
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
