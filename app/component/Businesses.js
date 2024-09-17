import React from "react";
import im1 from "../assets/ads.png";
import im2 from "../assets/careers.png";
import im3 from "../assets/OBJECTS.png";
import Image from "next/image";
import Link from "next/link";
const Businesses = () => {
  return (
    <div className="flex flex-col pn:max-sm:mb-[80px]  pn:max-sm:h-full items-center justify-center font-medium text-2xl pp:text-4xl md:text-5xl">
      <div className="sm:mt-8 mt-2">Resources that help you</div>
      <div className="mt-2">hire with intention</div>
      <div className="sm:text-lg text-sm text-center font-light mt-6 pp:w-[50%]">
        Not an expert? No worries! We’ve got guides and articles packed with
        hiring best practices and tips
      </div>
      <div className="grid sm:grid-cols-3 gap-4 mt-7 md:h-[40%] lg:w-[50%]">
        {/* ads*/}
        <a href="https://ads.grovyo.com/login" target="_blank" class="bg-[#E0F7FA] hover:scale-105 sm:duration-200 p-4 text-center border rounded-xl border-[#E0F7FA]">
          <Image
            src={im1}
            alt="im1"
            className="md:h-[200px] w-[230px] pp:w-[200px] object-contain"
          />
          <div className="text-black text-base font-bold">Grovyo Ads</div>
          <div className="text-xs text-black text-center">
            Helps save you from the chaos of
          </div>
          <div className="text-xs text-black text-center">
            an unstructured ads process.
          </div>
        </a>
        {/* Careers */}
        <Link href={"/careers"} class="bg-[#ECECFE] p-4 hover:scale-105 duration-300 text-center border rounded-xl border-[#ECECFE]">
          <Image
            src={im2}
            alt="im2"
            className="md:h-[200px] w-[230px] pp:w-[200px] object-contain"
          />
          <div className="text-black text-base font-bold">Careers</div>
          <div className="text-xs text-black text-center">
            Helps you create a remote hiring
          </div>
          <div className="text-xs text-black text-center">
            process that works.
          </div>
        </Link>
        {/* contact us */}
        <Link href={"/contact"} class="bg-[#FBE9E7] p-4 hover:scale-105 duration-300 text-center border rounded-xl border-[#FBE9E7]">
          <Image
            src={im3}
            alt="im3"
            className="md:h-[200px] w-[230px] pp:w-[200px] object-contain"
          />
          <div className="text-black mt-1 text-base font-bold">Contact Us</div>
          <div className="text-xs text-black text-center">
            Everything you need to know to</div>
          <div className="text-xs text-black text-center">
            find and hire your next great intern.
          </div>
        </Link>
      </div>
    </div >
  );
};

export default Businesses;
