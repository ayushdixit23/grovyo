"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
// import Sidebar from "../component/Sidebar";
import LogoutModal from "../../component/LogOut";
// import MobileNav from "../component/MobileNav";
import Image from "next/image";
// import { getData } from "../utils/useful";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuthContext } from "@/app/(utitlies)/utils/AuthWrapper";
import Cookies from "js-cookie";
import { MdOutlineCampaign, MdOutlineLogout, MdVerified } from "react-icons/md";
import { FaUser, FaUsers } from "react-icons/fa";
import { IoChatbubbleSharp } from "react-icons/io5";
import { CgWebsite } from "react-icons/cg";
import { HiCurrencyDollar } from "react-icons/hi";
import { FiHelpCircle } from "react-icons/fi";
import Account from "./account/page";
import SettingChat from "./chat/page";
import SettingCommunity from "./community/page";

export default function SettingLayout({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchparams = useSearchParams();
  const { data, setAuth, setData } = useAuthContext();
  const path = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const type = searchparams.get("type");
  const router = useRouter();
  const MemoizedAccount = React.memo(Account);
  const MemoizedSettingCommunity = React.memo(SettingCommunity);

  const MemoizedSettingChat = React.memo(SettingChat);

  const deleteCookies = () => {
    Cookies.remove(`access_token`);
    Cookies.remove(`refresh_token`);
    setAuth(false);
    setTimeout(() => {
      setData("");
    }, 3000);
    router.push("/login");
  };

  //   useEffect(() => {
  //     const initialWidth = window.innerWidth;
  //     if (initialWidth > 821) {
  //       setIsMobile(false);
  //     } else {
  //       setIsMobile(true);
  //     }
  //   }, []);

  //   useEffect(() => {
  //     const handleResize = () => {
  //       const initialWidth = window.innerWidth;
  //       if (initialWidth > 821) {
  //         setIsMobile(false);
  //       } else {
  //         setIsMobile(true);
  //       }
  //     };
  //     window.addEventListener("resize", handleResize);
  //     return () => {
  //       window.removeEventListener("resize", handleResize);
  //     };
  //   }, []);
  const handleResize = () => setIsMobile(window.innerWidth <= 821);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // (() => {
  //   if (
  //     typeof window !== "undefined" &&
  //     window.history &&
  //     window.history.pushState
  //   ) {
  //     window.addEventListener("popstate", function () {
  //       if (typeof setIsChildrenHidden === "function") {
  //         setIsChildrenHidden(false);
  //       }
  //     });
  //   } else {
  //     console.warn("History API is not supported by this browser");
  //   }
  // })();
  const links = [
    {
      href: isMobile ? "/main/settings?type=account" : "/main/settings/account",
      icon: <FaUser />,
      label: "Account",
    },
    {
      href: isMobile ? "/main/settings?type=chat" : "/main/settings/chat",
      icon: <IoChatbubbleSharp />,
      label: "Chats",
    },
    {
      href: `https://prosite.grovyo.com/lwozxip?id=${encodeURIComponent(
        data?.id
      )}&temp=1&addData=false`,
      icon: <CgWebsite />,
      label: "Prosite",
      external: true,
    },
    {
      href: isMobile
        ? "/main/settings?type=community"
        : "/main/settings/community",
      icon: <FaUsers />,
      label: "Communities",
    },
    {
      href: `https://ads.grovyo.com/alginsf?zray=${data?.id}`,
      icon: <MdOutlineCampaign />,
      label: "Create Your Ad",
      external: true,
    },
    {
      href: "https://grovyo.com/features/earnwithus",
      icon: <HiCurrencyDollar />,
      label: "Earn With Us",
      external: true,
    },
    { href: "#", icon: <FiHelpCircle />, label: "Help" },
  ];
  return (
    <>
      <div className="w-[100%] h-[100vh] bg-white dark:bg-[#0D0F10] flex pn:max-md:justify-center ">
        {!type && (
          <div className=" pn:max-md:h-[100vh] h-screen overflow-auto scrollbar-hide select-none md:min-w-[390px] lg:w-[360px] flex flex-col items-center md:border-r-2 dark:border-none border-[#f7f7f7] self-end w-full">
            <div
              className="w-[100%] h-[10%] dark:bg-[#0D0F10] light:border-b dark:border dark:border-[#131619] 
           flex flex-row px-5 justify-between items-center pn:max-md:h-[50px]"
            >
              <div className="text-[24px] text-black dark:text-white font-sans font-semibold">
                Settings
              </div>
            </div>

            <div
              className={`md:col-span-1 w-full dark:bg-[#0D0F10] dark:border dark:border-[#131619] sm:col-span-2 h-[90%] bg-maincolor max-h-screen `}
            >
              {links.map(({ href, icon, label, external }, index) =>
                external ? (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    className="text-sm rounded-xl flex items-center gap-3 my-2 p-4 py-3 font-semibold"
                  >
                    <div>{icon}</div>
                    <div>{label}</div>
                  </a>
                ) : (
                  <Link
                    key={index}
                    href={href}
                    className={`text-sm rounded-xl flex items-center gap-3 my-2 p-4 py-3 font-semibold ${path === href ? "text-blue-600" : ""
                      }`}
                  >
                    <div>{icon}</div>
                    <div>{label}</div>
                  </Link>
                )
              )}
              <div
                onClick={() => setIsModalOpen(true)}
                className=" text-sm sm:max-md:p-2 p-4 py-3 text-red-700  my-2 rounded-xl  flex items-center gap-3 font-semibold"
              >
                <div>
                  <MdOutlineLogout className="text-xl" />
                </div>
                <div>Log Out</div>
              </div>
              <LogoutModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                // onLogout={handleLogout}
                onLogout={deleteCookies}
              />
            </div>
          </div>
        )}
        {type == "account" && <MemoizedAccount />}
        {type == "chat" && <MemoizedSettingChat />}
        {type == "community" && <MemoizedSettingCommunity />}
        <div className="w-full pn:max-sm:hidden"> {children}</div>
      </div>
    </>
  );
}
