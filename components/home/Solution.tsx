import { champActions } from "@/lib/data";
import React from "react";

const Solution = () => {
  return (
    <>
      <section className="bg-[#CCDCFF1A] px-5 py-12 text-center sm:px-10 md:py-[72px]">
        <h2 className="mx-auto mb-10 max-w-[540px] text-[1.7rem] font-bold leading-[1.15] text-[#242A35] md:text-[2rem]">
          <span className="text-[#1565C0]">Our Solution:</span> The Voice Vigil Language Champion
          Initiative
        </h2>

        <div className="mx-auto mb-12 grid max-w-[920px] items-center gap-10 text-left md:grid-cols-[1.05fr_0.95fr] md:gap-14">
          <div className="max-w-[430px] justify-self-start">
            <p className="text-[1rem] leading-[1.9] text-[#343B47]">
              Voice Vigil empowers young leaders and community members to become AMR Language
              Champions, trusted advocates trained to translate antimicrobial resistance education
              into local languages and culturally relevant messages.
            </p>
          </div>
          <div className="relative mx-auto h-[210px] w-full max-w-[300px]">
            <div className="absolute left-0 top-0 h-[140px] w-[68%] rounded-2xl bg-[#D8D8D8]" />
            <div className="absolute bottom-0 right-0 h-[140px] w-[68%] rounded-2xl bg-[#D8D8D8]" />
          </div>
        </div>

        <p className="mb-12 text-[0.95rem] font-medium text-[#2A2F39]">~Our Language Champions:</p>

        <div className="mx-auto grid max-w-[860px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6 lg:gap-x-8 lg:gap-y-6">
          {champActions.map((action, index) => {
            const posClass =
              index === 3
                ? "lg:col-start-2 lg:col-span-2"
                : index === 4
                  ? "lg:col-start-4 lg:col-span-2"
                  : "lg:col-span-2";
            return (
              <div
                key={action.text}
                className={`flex min-h-[100px] items-center justify-center rounded-[14px] border border-[#B9CCFF] bg-white px-10 py-10 text-center text-[0.76rem] leading-[1.35] text-[#333B47] ${posClass}`}
              >
                <p>{action.text}</p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Solution;
