import Image from "next/image";
import React from "react";

const PoweredBy = () => {
  return (
    <>
      <section className="px-5 py-8 text-center sm:px-10 bg-blue-50">
        <p className="mb-12 text-[15px] font-bold uppercase text-[#000000] md:text-[20px]">
          Powered By
        </p>
        <div className="flex flex-wrap items-center justify-center gap-16 sm:gap-12">
          <div className="rounded-xl bg-[#D9D9D959] p-3">
            <Image
              src="/trinity.png"
              alt="Trinity"
              width={103.04}
              height={79.8272}
              className="h-32 w-auto object-contain"
            />
          </div>
          <Image
            src="/vetkonect.png"
            alt="VetKonect"
            width={96}
            height={110.4}
            className="h-32 w-auto object-contain"
          />

          <Image
            src="/voicevigil.png"
            alt="VoiceVigil"
            width={128}
            height={70.08}
            className="h-32 w-auto object-contain"
          />
        </div>
      </section>
    </>
  );
};

export default PoweredBy;
