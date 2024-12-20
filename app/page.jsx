"use client";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import icon from "../app/assets/Logo.png";
import icon2 from "../app/assets/icon2.png";
import Image from "next/image";
import Feature from "./component/Feature";
import Businesses from "./component/Businesses";
import Creator from "./component/creator";
import Search from "./component/SearchPage";
import { useAuthContext } from "@/app/(utitlies)/utils/AuthWrapper";
import Link from "next/link";

const Page = () => {
  const [state, setState] = useState("main");

  const [scrolled, setScrolled] = useState(false);
  const { auth } = useAuthContext();

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className={`${state === "creators" ? "" : ""}`}>
        <div className="fixed bottom-0 select-none z-40 sm:hidden block left-0 w-full">
          <div className="py-4 bg-black text-white  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-25 px-5 rounded-full w-full gap-4 flex justify-center items-center">
            <div
              className="text-sm font-sans relative cursor-pointer after:content-[''] after:absolute after:left-1/2 after:transform after:-translate-x-1/2 after:w-[50%] after:h-[1px] after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:ease-in-out after:bottom-0 after:mt-1 hover:[text-shadow:1px_1px_5px_var(--tw-shadow-color)] shadow-white"
              onClick={() => setState("main")}
            >
              Communities
            </div>
            <div
              className="text-sm  font-sans relative cursor-pointer after:content-[''] after:absolute after:left-1/2 after:transform after:-translate-x-1/2 after:w-[50%] after:h-[1px] after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:ease-in-out after:bottom-0 after:mt-1 hover:[text-shadow:1px_1px_5px_var(--tw-shadow-color)] shadow-white"
              onClick={() => setState("feature")}
            >
              Features
            </div>
            <div
              className="text-sm relative cursor-pointer after:content-[''] after:absolute after:left-1/2 after:transform after:-translate-x-1/2 after:w-[50%] after:h-[1px] after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:ease-in-out after:bottom-0 after:mt-1 hover:[text-shadow:1px_1px_5px_var(--tw-shadow-color)] shadow-white"
              onClick={() => setState("business")}
            >
              For Businesses
            </div>
            <div
              className="text-sm relative cursor-pointer after:content-[''] after:absolute after:left-1/2 after:transform after:-translate-x-1/2 after:w-[50%] after:h-[1px] after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:ease-in-out after:bottom-0 after:mt-1 hover:[text-shadow:1px_1px_5px_var(--tw-shadow-color)] shadow-white"
              onClick={() => setState("creators")}
            >
              For Creators
            </div>
          </div>
        </div>
      </div>
      <div
        style={{ userSelect: "none" }}
        className={`text-white ${
          state === "creators"
            ? "h-full ss:h-screen bg-creator bg-center bg-cover"
            : "bg-gradient-to-r from-black via-[#111827] to-black"
        } ${state == "main" && "h-screen"}  ${
          state == "business" && "h-full sm:h-screen"
        }  ${state == "feature" && "h-full md:h-screen"} w-screen `}
      >
        {/* Top section with header */}
        {/* <div className={`sm:px-10 sticky ${
        scrolled ? 'pn:max-sm:bg-black' : 'bg-transparent'
      } top-0 left-0 px-3 w-full flex items-center justify-between text-white py-3.5 mb-4 rounded-xl z-40 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-25 gap-4 `}>
        <div className="w-[20%]">
          <Image
            src={icon}
            alt="icon"
            className="h-[40px] w-[40px] object-contain"
          />
        </div>
        <div className="flex-grow hidden sm:flex justify-center items-center w-[60%]">
          <div className="bg-gray-400 flex items-center justify-center space-x-10 h-[80%] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-25 border border-[#444] px-5 py-2 rounded-full">
          
          
          
            <span onClick={()=>setState("main")} className="relative cursor-pointer after:content-[''] after:absolute after:left-1/2 after:transform after:-translate-x-1/2 after:w-[50%] after:h-[1px] after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:ease-in-out after:bottom-0 after:mt-1 hover:[text-shadow:1px_1px_5px_var(--tw-shadow-color)] shadow-white">
              Communities
            </span>
            <span onClick={()=>setState("feature")} className="relative cursor-pointer after:content-[''] after:absolute after:left-1/2 after:transform after:-translate-x-1/2 after:w-[50%] after:h-[1px] after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:ease-in-out after:bottom-0 after:mt-1 hover:[text-shadow:1px_1px_5px_var(--tw-shadow-color)] shadow-white ">
              Features
            </span>
            <span onClick={()=>setState("business")} className="relative cursor-pointer after:content-[''] after:absolute after:left-1/2 after:transform after:-translate-x-1/2 after:w-[50%] after:h-[1px] after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:ease-in-out after:bottom-0 after:mt-1 hover:[text-shadow:1px_1px_5px_var(--tw-shadow-color)] shadow-white">
             For Businesses
            </span>
          </div>
        </div>
        <div className="flex justify-row gap-5 w-[20%] justify-end">
          <div onClick={()=>setState("search")} className="border-solid flex justify-center items-center space-x-4 h-[80%] bg-gray-400 rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-25 px-2 py-2 ">
            <FiSearch size={20} />
          </div>
          <div className="rounded-full py-2 px-8 bg-blue-600 shadow-lg shadow-blue-500/50">
            Login
          </div>
        </div>
      </div> */}
        <div
          className={`sm:px-10 sticky top-0 left-0 px-3 w-full flex items-center justify-between text-white py-3.5 mb-4 rounded-xl z-40 transition-colors duration-300 ease-in-out ${
            scrolled ? "bg-black bg-opacity-50" : "bg-transparent"
          } bg-clip-padding backdrop-filter backdrop-blur-sm`}
        >
          <div className="w-[20%]">
            <div>
              <Image
                src={icon}
                alt="icon"
                onContextMenu={(e) => e.preventDefault()}
                className="h-[40px] w-[40px] object-contain"
              />
            </div>
          </div>
          <div className="flex-grow hidden sm:flex justify-center items-center w-[60%]">
            <div className="bg-gray-400 flex items-center justify-center space-x-10 h-[80%] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-25 border border-[#444] px-5 py-2 rounded-full">
              <span
                onClick={() => setState("main")}
                className="relative font-normal cursor-pointer after:content-[''] after:absolute after:left-1/2 after:transform after:-translate-x-1/2 after:w-[50%] after:h-[1px] after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:ease-in-out after:bottom-0 after:mt-1 hover:[text-shadow:1px_1px_5px_var(--tw-shadow-color)] shadow-white"
                //                 className={`relative cursor-pointer after:content-[''] after:absolute after:left-1/2 after:transform after:-translate-x-1/2 after:w-[50%] after:h-[1px] after:bg-white after:bottom-0 after:mt-1 after:transition-transform after:duration-200 after:ease-in-out ${
                //   state === "main"
                //     ? "after:scale-x-100 [text-shadow:1px_1px_5px_var(--tw-shadow-color)] shadow-white"
                //     : "after:scale-x-0 hover:after:scale-x-100 hover:[text-shadow:1px_1px_5px_var(--tw-shadow-color)]"
                // }`}
              >
                Communities
              </span>
              <span
                onClick={() => setState("feature")}
                className="relative cursor-pointer after:content-[''] after:absolute after:left-1/2 after:transform after:-translate-x-1/2 after:w-[50%] after:h-[1px] after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:ease-in-out after:bottom-0 after:mt-1 hover:[text-shadow:1px_1px_5px_var(--tw-shadow-color)] shadow-white"
              >
                Features
              </span>
              <span
                onClick={() => setState("business")}
                className="relative cursor-pointer after:content-[''] after:absolute after:left-1/2 after:transform after:-translate-x-1/2 after:w-[50%] after:h-[1px] after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:ease-in-out after:bottom-0 after:mt-1 hover:[text-shadow:1px_1px_5px_var(--tw-shadow-color)] shadow-white"
              >
                For Businesses
              </span>
              <span
                onClick={() => setState("creators")}
                className="relative cursor-pointer after:content-[''] after:absolute after:left-1/2 after:transform after:-translate-x-1/2 after:w-[50%] after:h-[1px] after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:ease-in-out after:bottom-0 after:mt-1 hover:[text-shadow:1px_1px_5px_var(--tw-shadow-color)] shadow-white"
              >
                For Creators
              </span>
            </div>
          </div>
          <div className="flex justify-row gap-5  w-[20%] justify-end">
            <div
              onClick={() => setState("search")}
              className="border-solid flex justify-center items-center space-x-4 h-[80%] bg-gray-400 rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-25 px-2 py-2"
            >
              <FiSearch size={20} />
            </div>
            {auth ? (
              <Link
                href={"/main/feed/newForYou"}
                className="rounded-full py-2 px-8 bg-blue-600 shadow-lg shadow-blue-500/50 text-[12px]"
              >
                Login
              </Link>
            ) : (
              <Link
                href={"/login"}
                className="rounded-full py-2 px-8 bg-blue-600 shadow-lg shadow-blue-500/50 text-[12px]"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        <div
          className={`flex flex-col justify-center gap-8 items-center h-[55%]  mt-16 `}
        >
          {state == "main" && (
            <>
              {/* Centered Icon2 and Avatar (im1) in a common flex container */}
              <div className="flex flex-col justify-center items-center sm:mr-10">
                <div className="flex justify-center items-center w-full pl-8">
                  {/* <Image src={im1} alt="im1" className="w-[40px] scale h-[40px]" /> */}

                  <Image
                    src={icon2}
                    alt="icon2"
                    onContextMenu={(e) => e.preventDefault()}
                    className=" w-[80%] flex justify-center items-center sm:w-[300px] object-contain "
                  />

                  {/* <Image src={im5} alt="im5"  className="w-[40px] scale h-[40px]"  /> */}
                </div>
              </div>
              {/* <Bts/> */}

              {/* Main Text */}
              <div className="flex flex-col items-center py-2  justify-center gap-4">
                <div className="text-center font-poppins text-2xl pp:text-4xl md:text-5xl">
                  India’s first Peer to Peer Social
                </div>
                <div className="text-center font-poppins text-2xl pp:text-4xl md:text-5xl">
                  Commerce Platform
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col items-center justify-center gap-2 text-[#C8C8C8] font-merriweather">
                <div className="text-center text-sm pp:text-base">
                  Create communities, gather your audience, and showcase your
                  products -
                </div>
                <div className="text-center text-sm pp:text-base">
                  all in one dynamic space.
                </div>
              </div>

              {/* Download Button */}
              <div className="flex justify-center mt-6 font-bold sm:mt-2 font-merriweather">
                <a
                  href="https://play.google.com/store/apps/details?id=com.grovyomain&hl=en_IN&gl=US"
                  target="_blank"
                  className="px-5 py-2 bg-white text-black rounded-full text-[14px] z-40  hover:bg-blue-700 hover:text-white duration-300 "
                >
                  Download Grovyo Now
                </a>
              </div>
            </>
          )}

          {state === "feature" && (
            <>
              <Feature />
            </>
          )}
          {state === "business" && (
            <>
              <Businesses />
            </>
          )}

          {state === "search" && (
            <>
              <Search />
            </>
          )}
          {state === "creators" && (
            <>
              <Creator />
            </>
          )}
        </div>
        <Link
          href="/privacy"
          className=" flex gap-1 items-center fixed bottom-2 left-2"
        >
          <div className="font-merriweather text-[12px]">Privacy Policy</div>
        </Link>
      </div>
    </>
  );
};

export default Page;
