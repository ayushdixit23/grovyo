"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const Switcher = React.memo(() => {
  const path = usePathname();

  return (
    <div
      className="h-full bg-white dark:bg-[#0D0F10] shadow-sm z-50 pn:max-sm:items-center 
    pn:max-sm:w-[100%] overflow-hidden sm:max-md:rounded-r-3xl md:px-2 pn:max-md:justify-start flex flex-row items-center"
    >
      <Link
        href={"/main/feed/newForYou"}
        // href="/main/feed/test"
        className={`${
          path.startsWith("/main/feed/newForYou")
            ? "text-[14px] pn:max-sm:text-[12px] dark:text-white dark:bg-[#121212] text-[#171717] p-3 bg-[#f5f5f5] rounded-xl font-semibold mx-2 hover:text-black transition-all duration-300"
            : "text-[14px] pn:max-sm:text-[12px] text-[#727272] dark:hover:text-white font-medium mx-2 hover:text-black border-b-0 transition-all duration-300"
        }`}
      >
        New for you
      </Link>

      <Link
        href={"/main/feed/community"}
        // href="/main/feed/test"
        className={`${
          path.startsWith("/main/feed/community")
            ? "text-[14px] pn:max-sm:text-[12px] dark:bg-[#121212] p-3 dark:text-white  bg-[#f5f5f5] rounded-xl text-[#171717] font-semibold mx-2 hover:text-black transition-all duration-300"
            : "text-[14px] pn:max-sm:text-[12px] text-[#727272] dark:hover:text-white font-medium mx-2 hover:text-black border-b-0 transition-all duration-300"
        }`}
      >
        Community
      </Link>
    </div>
  );
});

export default Switcher;
