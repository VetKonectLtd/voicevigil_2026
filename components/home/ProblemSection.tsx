import React from "react";

const ProblemSection = () => {
  return (
    <>
      <section className="mx-auto max-w-[1100px] px-5 py-12 text-center sm:px-10 md:py-[72px]">
        <h2 className="mx-auto mb-10 max-w-[700px] text-[20px] font-bold leading-[1.25] md:text-[27px]">
          <span className="text-[#1565C0]">
            Antimicrobial Resistance is <span className="text-[#FF6D00]">Rising</span>
          </span>
          , but Millions can&apos;t Access the Information they need in their{" "}
          <span className="text-[#1565C0]">Local Language</span>
        </h2>

        <div className="relative mx-auto mb-10 flex max-w-[980px] flex-col items-center gap-5 md:min-h-[250px] md:flex-row md:items-start md:justify-center md:gap-6">
          <div className="pointer-events-none absolute left-[23%] top-6 hidden h-10 w-16 rounded-t-full border-l border-t border-[#ECECEC] md:block" />
          <div className="pointer-events-none absolute right-[23%] top-6 hidden h-10 w-16 rounded-t-full border-r border-t border-[#ECECEC] md:block" />
          <div className="flex min-h-[120px] w-full max-w-[250px] items-center justify-center rounded-[18px] border border-[#B9CCFF] bg-white px-6 py-7 text-center text-[0.9rem] leading-[1.45] text-[#343434] md:mt-10">
            <p>
              Across many African communities, the problem is worsened by a critical barrier:
              language.
            </p>
          </div>
          <div className="flex min-h-[210px] w-full max-w-[430px] items-center justify-center rounded-[18px] border border-[#7A98FF] bg-white px-8 py-7 text-center text-[0.92rem] leading-[1.45] text-[#343434]">
            <p>
              Antimicrobial resistance (AMR) is one of the greatest threats to global health today.
              Misuse of antibiotics in humans and animals is accelerating resistance, making
              infection harder, and sometimes impossible to treat.
            </p>
          </div>
          <div className="flex min-h-[155px] w-full max-w-[285px] items-center justify-center rounded-[18px] border border-[#F4BB5E] bg-white px-6 py-7 text-center text-[0.9rem] leading-[1.45] text-[#343434] md:mt-10">
            <p>
              Most AMR education is only available in English or French while millions of farmers,
              pet owners, traders and families primarily speak local languages.
            </p>
          </div>
        </div>

        <p className="text-[15px] text-[#333333]">
          ~This is not just a <span className="text-[#4E9A51]">health</span>{" "}
          <span className="text-[#F5A623]">crisis</span>, it&apos;s a{" "}
          <span className="text-[#1565C0]">communication</span>{" "}
          <span className="text-[#F5A623]">crisis.</span>
        </p>
      </section>
    </>
  );
};

export default ProblemSection;
