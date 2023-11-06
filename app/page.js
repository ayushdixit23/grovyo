"use client";
import React from "react";
import Header from "./component/Header";
import Footer from "./component/Footer";
import Animation from "./component/Animation";

function page() {
  return (
    <div className="w-screen h-screen select-none bg-black items-center flex-col flex justify-center text-[#fff] duration-100">
      <div
        className="flex w-[100%] absolute
       top-0 h-20 items-center px-10 pn:max-sm:px-4 duration-100"
      >
        <Header />
      </div>

      <div className="bg-bgg drop-shadow-[0_0px_15px_rgba(0,117,255,1)] w-full h-28 bg-contain bg-center flex justify-center items-center text-[60px] font-bold text-center pn:max-sm:h-16 pn:max-sm:text-[25px] bg-no-repeat duration-100">
        We are testing in Locals
      </div>
      <div className="w-full flex justify-center items-center text-[30px] font-medium pn:max-sm:text-[20px] text-center duration-100">
        “Experience it today – Download Now and Try it out!"
      </div>
      <Animation />

      <div className="flex drop-shadow-[0_0px_15px_rgba(255,255,255,1)] justify-center items-center text-[40px] font-semibold underline cursor-pointer text-center pn:max-sm:text-[25px] duration-100">
        Download Now
      </div>
      <div
        className="flex w-[100%] absolute
       bottom-0 h-20 items-center px-10"
      >
        <Footer />
      </div>
    </div>
  );
}

export default page;
