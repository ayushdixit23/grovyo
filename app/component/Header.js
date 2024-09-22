"use client";
import React, { useEffect, useState } from "react";
// import search from "../assets/Images/Searchhhh.png";
// import notify from "../assets/Images/Notify.png";
import Image from "next/image";
import Link from "next/link";
import { useAuthContext } from "../utils/AuthWrapper";
import { ModeToggle } from "./ModeToggle";
import { AiOutlineSearch } from "react-icons/ai";
import Search from "./Search";

function Header() {
  const { data } = useAuthContext();
  const [show, setShow] = useState(false)

  useEffect(() => { }, []);
  return (
    <>
      <div
        className={`w-full duration-1000 h-screen  ${show ? "absolute z-0 left-0" : "absolute z-0 -left-[100vh]"
          }`}
      >
        <Search setShow={setShow} />
      </div>
      <div className="w-full h-[8vh] flex flex-row justify-between px-1 bg-white dark:bg-bluedark items-center py-1  ">
        <div className="w-[15%] h-[100%] flex justify-center items-center">
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
        </div>
        {/* <ModeToggle /> */}

        <div className="pr-3">
          <AiOutlineSearch className="text-2xl" onClick={() => setShow(true)} />
        </div>
      </div>
    </>

  );
}

export default Header;
