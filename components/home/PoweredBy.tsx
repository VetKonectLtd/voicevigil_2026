import React from "react";
import SubLogos from "./Sub-Logos";

const PoweredBy = () => {
  return (
    <>
      <section className="px-5 py-8 text-center sm:px-10 bg-blue-50">
        <p className="mb-12 text-[15px] font-bold uppercase text-[#000000] md:text-[20px]">
          Powered By
        </p>
        <SubLogos />
      </section>
    </>
  );
};

export default PoweredBy;
