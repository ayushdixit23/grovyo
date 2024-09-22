"use client";
import React, { useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import Home from "../assets/Home";
import Chat from "../assets/Chat";
import Library from "../assets/Lib";
import { IoSettingsSharp } from "react-icons/io5";

const Tabbar = React.memo(() => {
  const path = usePathname();
  const router = useRouter();

  // Use memoized object to store active states for performance
  const activeClass = useMemo(() => "text-[#2d9aff]", []);
  const inactiveClass = useMemo(() => "text-gray-500 dark:text-gray-400", []);

  // Function to determine active state based on path
  const getClass = (activePath) => (path.startsWith(activePath) ? activeClass : inactiveClass);

  return (
    <div className="fixed bottom-0 sm:hidden left-0 z-40 w-full h-16 bg-white border-t border-gray-200 dark:bg-black dark:border-gray-600 mt-40">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
        <button
          onClick={() => router.push("/main/feed/newForYou")}
          type="button"
          className="inline-flex flex-col gap-1 hover:bg-gray-50 dark:hover:bg-gray-800 items-center justify-center px-5 group"
        >
          <Home
            color={path.startsWith("/main/feed/newForYou") || path.startsWith("/main/feed/community") ? 1 : 0}
            className={`w-5 h-5 mb-1 ${getClass("/main/feed/newForYou")}`}
          />
          <span className={`text-xs ${getClass("/main/feed/newForYou")}`}>Home</span>
        </button>

        <button
          onClick={() => router.push("/main/chat")}
          type="button"
          className="inline-flex flex-col gap-1 hover:bg-gray-50 dark:hover:bg-gray-800 items-center justify-center px-5 group"
        >
          <Chat color={path.startsWith("/main/chat") ? 2 : 0} className={`w-5 h-5 mb-1 ${getClass("/main/chat")}`} />
          <span className={`text-xs ${getClass("/main/chat")}`}>Chats</span>
        </button>

        <button
          onClick={() => router.push("/main/library")}
          type="button"
          className="inline-flex flex-col gap-1 hover:bg-gray-50 dark:hover:bg-gray-800 items-center justify-center px-5 group"
        >
          <Library color={path.startsWith("/main/library") ? 3 : 0} className={`w-5 h-5 mb-1 ${getClass("/main/library")}`} />
          <span className={`text-xs ${getClass("/main/library")}`}>Library</span>
        </button>

        <button
          onClick={() => router.push("/main/settings")}
          type="button"
          className="inline-flex flex-col hover:bg-gray-50 dark:hover:bg-gray-800 items-center justify-center px-5 group"
        >
          <IoSettingsSharp className={`w-5 h-5 mb-1 ${getClass("/main/settings")}`} />
          <span className={`text-sm ${getClass("/main/settings")}`}>Settings</span>
        </button>
      </div>
    </div>
  );
});

export default Tabbar;
