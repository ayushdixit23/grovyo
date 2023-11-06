"use client";
import React, { useState } from "react";
import Logo from "../assets/Logo";

import { CgMenuRightAlt } from "react-icons/cg";
import Link from "next/link";

function Header() {
  const [menu, setMenu] = useState(false);
  return (
    <>
      <div className="w-full bg-black h-10 flex justify-between items-center">
        <div>
          <Logo />
        </div>

        <div
          className="flex items-center justify-between w-48 pn:max-sm:hidden
      "
        >
          <div className="hover:underline duration-75 text-lg shadow-md text-white ">
            About us
          </div>
          <Link
            href={"/contact"}
            className="hover:underline duration-75 text-lg shadow-md text-white "
          >
            Contant us
          </Link>
        </div>
        <div
          className="flex items-center justify-end w-48  sm:hidden
      "
          onClick={() => setMenu(!menu)}
        >
          <CgMenuRightAlt className="h-20 w-8" />
        </div>
      </div>
      <div
        className={`absolute duration-500 sm:hidden left-0 w-full bg-white ${
          menu ? "top-0 " : "-top-[500px]"
        }`}
      >
        <div className="w-full justify-center items-center p-3 flex flex-col bg-black">
          <div className="flex flex-col items-center w-full gap-3 pt-5">
            <div className="text-xl font-semibold py-2 drop-shadow-[0_0px_15px_rgba(255,255,255,1)]">
              Contact
            </div>
            <div className="text-xl font-semibold py-2 drop-shadow-[0_0px_15px_rgba(255,255,255,1)]">
              About Us
            </div>
            <div className="sm:hidden my-3">
              <div className="flex items-center flex-wrap gap-3"></div>
            </div>
            <div className="w-full px-3 pb-7">
              <button
                onClick={() => setMenu(!menu)}
                className="bg-black w-full p-3 rounded-full text-white"
              >
                close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
