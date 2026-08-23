import Image from "next/image";
import React from "react";

const SubLogos = () => {
  return (
    <div>
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
    </div>
  );
};

export default SubLogos;
