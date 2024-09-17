"use client";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import icon from "../app/assets/Logo.png";
import icon2 from "../app/assets/icon2.png";
import Image from "next/image";
import Feature from "./component/Feature";
import Businesses from "./component/Businesses";
import Search from "./component/SearchPage";

const Page = () => {
  const [state, setState] = useState("main");
  const [scrolled, setScrolled] = useState(false);

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
      <div className="fixed bottom-0 select-none z-40 sm:hidden block left-0 w-full">
        <div className="py-4 bg-black text-white  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-25 px-5 rounded-full w-full gap-4 flex justify-center items-center">
          <div
            className="text-sm relative cursor-pointer after:content-[''] after:absolute after:left-1/2 after:transform after:-translate-x-1/2 after:w-[50%] after:h-[1px] after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:ease-in-out after:bottom-0 after:mt-1 hover:[text-shadow:1px_1px_5px_var(--tw-shadow-color)] shadow-white"
            onClick={() => setState("main")}
          >
            Communities
          </div>
          <div
            className="text-sm relative cursor-pointer after:content-[''] after:absolute after:left-1/2 after:transform after:-translate-x-1/2 after:w-[50%] after:h-[1px] after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:ease-in-out after:bottom-0 after:mt-1 hover:[text-shadow:1px_1px_5px_var(--tw-shadow-color)] shadow-white"
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
        </div>
      </div>
      <div
        style={{ userSelect: "none" }}
        className={`text-white ${state == "main" && "h-screen"}  ${
          state == "business" && "h-full sm:h-screen"
        }  ${
          state == "feature" && "h-full md:h-screen"
        } w-screen bg-gradient-to-r from-black via-[#111827] to-black`}
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
            <Image
              src={icon}
              alt="icon"
              className="h-[40px] w-[40px] object-contain"
            />
          </div>
          <div className="flex-grow hidden sm:flex justify-center items-center w-[60%]">
            <div className="bg-gray-400 flex items-center justify-center space-x-10 h-[80%] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-25 border border-[#444] px-5 py-2 rounded-full">
              <span
                onClick={() => setState("main")}
                className="relative cursor-pointer after:content-[''] after:absolute after:left-1/2 after:transform after:-translate-x-1/2 after:w-[50%] after:h-[1px] after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:ease-in-out after:bottom-0 after:mt-1 hover:[text-shadow:1px_1px_5px_var(--tw-shadow-color)] shadow-white"
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
            </div>
          </div>
          <div className="flex justify-row gap-5 w-[20%] justify-end">
            <div
              onClick={() => setState("search")}
              className="border-solid flex justify-center items-center space-x-4 h-[80%] bg-gray-400 rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-25 px-2 py-2"
            >
              <FiSearch size={20} />
            </div>
            <div className="rounded-full py-2 px-8 bg-blue-600 shadow-lg shadow-blue-500/50 text-[12px]">
              Login
            </div>
          </div>
        </div>

        <div className={`flex flex-col `}>
          {state == "main" && (
            <>
              {/* Centered Icon2 and Avatar (im1) in a common flex container */}
              <div className="flex flex-col items-center my-8 sm:mr-10">
                <div className="flex justify-center items-center gap-[35%]">
                  {/* <Image src={im1} alt="im1" className="w-[40px] scale h-[40px]" /> */}

                  <Image
                    src={icon2}
                    alt="icon2"
                    className=" w-[80%] flex justify-center items-center sm:w-[35%] object-contain "
                  />

                  {/* <Image src={im5} alt="im5"  className="w-[40px] scale h-[40px]"  /> */}
                </div>
              </div>
              {/* <Bts/> */}

              {/* Main Text */}
              <div className="flex flex-col items-center justify-center mt-4 sm:mt-8">
                <div className="text-center font-medium text-2xl pp:text-4xl md:text-5xl">
                  India’s first Peer to Peer Social
                </div>
                <div className="text-center font-medium text-2xl pp:text-4xl mt-2 md:text-5xl sm:mt-4">
                  Commerce Platform
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col items-center justify-center mt-4 sm:mt-8 text-[#C8C8C8] font-normal">
                <div className="text-center text-sm pp:text-xl">
                  Create communities, gather your audience, and showcase your
                  products -
                </div>
                <div className="text-center text-sm pp:text-xl">
                  all in one dynamic space.
                </div>
              </div>

              {/* Download Button */}
              <div className="flex justify-center mt-6 sm:mt-8">
                <a
                  href="https://play.google.com/store/apps/details?id=com.grovyomain&hl=en_IN&gl=US"
                  target="_blank"
                  className="px-6 py-2 bg-white text-black rounded-full text-xs z-40 font-semibold hover:bg-blue-700 hover:text-white duration-300 "
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
        </div>
      </div>
    </>
  );
};

export default Page;
