"use client";
import React, { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import Search from "../component/Search";
import Home from "../assets/Home";
import Chat from "../assets/Chat";
import Library from "../assets/Lib";
import Sarch from "../assets/Search";
import Setting from "../assets/Setting";
import { useAuthContext } from "@/app/(utitlies)/utils/AuthWrapper";
import { ModeToggle } from "./ModeToggle";
import { usePathname } from "next/navigation";

// Memoized child components to avoid unnecessary re-renders
const MemoizedHomeIcon = React.memo(Home);
const MemoizedChatIcon = React.memo(Chat);
const MemoizedLibraryIcon = React.memo(Library);
const MemoizedSearchIcon = React.memo(Sarch);
const MemoizedSettingIcon = React.memo(Setting);

const Siderbar = () => {
  const { data } = useAuthContext();
  const [sear, setSear] = useState(false);
  const [color, setColor] = useState(1);
  const path = usePathname();

  // Memoize path-related checks to avoid recalculating on every render
  const isHomeActive = useMemo(() => path.startsWith("/main/feed/newForYou") || path.startsWith("/main/feed/community"), [path]);
  const isChatActive = useMemo(() => path.startsWith("/main/chat"), [path]);
  const isLibraryActive = useMemo(() => path.startsWith("/main/library"), [path]);
  const isSettingsActive = useMemo(() => path.startsWith("/main/settings"), [path]);

  // Memoize toggle functions to avoid re-creating on each render
  const toggleSearch = useCallback(() => setSear((prev) => !prev), []);
  const closeSearch = useCallback(() => setSear(false), []);

  return (
    <div className="h-screen w-[60px] z-50 bg-[#ffffff] dark:bg-[#0D0F10] flex flex-col justify-center items-start">
      {/* Image */}
      <div className="h-screen w-[60px] ring-[#f5f5f5] bg-[#f2f2f2] dark:bg-bluedark border-[#f7f7f7] dark:border-[#131619]
      border-r-2 absolute flex flex-col justify-evenly items-center">
        {data?.dp ? (
          <div className="h-[40px] w-[40px] ">
            <Link href={`/${data?.username}`} className="w-full h-full">
              <img
                className="w-full h-full object-cover rounded-[15px] ring-1 ring-white dark:ring-[#273142] bg-white dark:bg-bluedark"
                src={data?.dp}

              />
            </Link>
          </div>
        ) : (
          <div className="h-[40px] w-[40px] rounded-[18px] bg-[#f5f5f5] ring-1 ring-white shadow-sm animate-pulse "></div>
        )}

        <div className="flex flex-col py-28 w-[100%] h-[80%] justify-between items-center md:max-sm:hidden">
          {/* Home Link */}
          <Link onClick={closeSearch} href="/main/feed/newForYou"
            className={`flex justify-center items-center ${isHomeActive
              ? "bg-slate-200 dark:bg-selectdark h-[50px] rounded-full w-[50px]"
              : "hover:dark:bg-[#323d4e] h-[50px] rounded-full w-[50px]"
              } flex-col`}>
            <div className="my-1">
              <MemoizedHomeIcon color={isHomeActive ? 1 : 0} />
            </div>
            <div className={`font-medium text-[10px] ${isHomeActive ? "dark:text-[#569FF5] text-[#569FF5]" : "dark:text-white text-[#333]"}`}>
              Home
            </div>
          </Link>

          {/* Chat Link */}
          <Link onClick={closeSearch} href="/main/chat"
            className={`flex justify-center items-center ${isChatActive
              ? "bg-slate-200 dark:bg-selectdark h-[50px] rounded-full w-[50px]"
              : "hover:dark:bg-[#323d4e] h-[50px] rounded-full w-[50px]"
              } flex-col`}>
            <div className="my-1">
              <MemoizedChatIcon color={isChatActive ? 2 : 0} />
            </div>
            <div className={`font-medium text-[10px] ${isChatActive ? "dark:text-[#569FF5] text-[#569FF5]" : "dark:text-white text-[#333]"}`}>
              Chats
            </div>
          </Link>

          {/* Library Link */}
          <Link onClick={closeSearch} href="/main/library"
            className={`flex justify-center items-center ${isLibraryActive
              ? "bg-slate-200 dark:bg-selectdark h-[50px] rounded-full w-[50px]"
              : "hover:dark:bg-[#323d4e] h-[50px] rounded-full w-[50px]"
              } flex-col`}>
            <div className="my-1">
              <MemoizedLibraryIcon color={isLibraryActive ? 3 : 0} />
            </div>
            <div className={`font-medium text-[10px] ${isLibraryActive ? "text-[#569FF5]" : "dark:text-white text-[#333]"}`}>
              Library
            </div>
          </Link>

          {/* Search Button */}
          <div onClick={toggleSearch} className={`flex justify-center cursor-pointer items-center flex-col ${color === 4
            ? "bg-slate-200 dark:bg-selectdark h-[50px] rounded-full w-[50px]"
            : "hover:dark:bg-[#323d4e] h-[50px] rounded-full w-[50px]"
            }`}>
            <div className="my-1 h-5 w-5 flex justify-center items-center">
              <MemoizedSearchIcon color={color} setColor={setColor} />
            </div>
            <div className={`font-medium text-[10px] ${color === 4 ? "text-[#569FF5]" : "dark:text-white text-[#333]"}`}>
              Search
            </div>
          </div>

          {/* Settings Link */}
          <Link onClick={closeSearch} href="/main/settings"
            className={`flex justify-center items-center flex-col ${isSettingsActive
              ? "bg-slate-200 dark:bg-selectdark h-[50px] rounded-full w-[50px]"
              : "hover:dark:bg-[#323d4e] h-[50px] rounded-full w-[50px]"
              }`}>
            <MemoizedSettingIcon color={isSettingsActive ? 5 : 0} />
            <div className={`font-medium text-[10px] ${isSettingsActive ? "text-blue-300" : "dark:text-white text-[#333]"}`}>
              Settings
            </div>
          </Link>
        </div>

        <div className="dark:bg-[#171717]">
          <ModeToggle />
        </div>
      </div>

      {/* Search Overlay */}
      <div className={`bg-blue-700 border-r-2 border-[#f9f9f9] dark:border-[#171717] md:min-w-[390px] md:[360px] duration-1000 h-screen ${sear ? "absolute z-0 left-[60px]" : "absolute z-0 -left-[100vh]"}`}>
        <Search />
      </div>
    </div>
  );
}

export default React.memo(Siderbar);
