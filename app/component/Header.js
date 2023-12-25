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
          className="flex items-center gap-4 justify-between pn:max-sm:hidden
      "
        >
          <Link href="/about" className="hover:underline duration-75 text-sm  shadow-md text-white ">
            About us
          </Link>
          <Link
            href={"/contact"}
            className="hover:underline duration-75 text-sm  shadow-md text-white "
          >
            Contact us
          </Link>
          <Link
            href={"/deleterequest"}
            className="hover:underline duration-75 text-sm  shadow-md text-white "
          >
            Data Deletion Request
          </Link>
          <Link
            href={"/requestdata"}
            className="hover:underline duration-75 text-sm  shadow-md text-white "
          >
            Account Deletion Request
          </Link>
          {/* <Link href="/shipping" className="hover:underline duration-75 text-xs md:text-sm shadow-md text-white ">
            Shipping
          </Link>
          <Link href="/cancellation" className="hover:underline duration-75 text-xs md:text-sm shadow-md text-white ">
            Cancellation
          </Link>
          <Link href="/terms" className="hover:underline duration-75 text-xs md:text-sm shadow-md text-white ">
            Terms & Conditions
          </Link>
          <Link href="/privacy" className="hover:underline duration-75 text-xs md:text-sm shadow-md text-white ">
            Privacy Policy
          </Link> */}

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
        className={`absolute duration-500 sm:hidden left-0 w-full z-10 bg-white ${menu ? "top-0 " : "-top-[1000px]"
          }`}
      >
        <div className="w-full justify-center items-center p-3 flex flex-col text-black">
          <div className="flex flex-col items-center w-full gap-3 pt-5">
            <Link href="/about" className="text-xl font-semibold py-2 drop-shadow-[0_0px_15px_rgba(255,255,255,1)]">
              About Us
            </Link>
            <Link href="/contact" className="text-xl font-semibold py-2 drop-shadow-[0_0px_15px_rgba(255,255,255,1)]">
              Contact
            </Link>
            <Link href="/terms" className="text-xl font-semibold py-2 drop-shadow-[0_0px_15px_rgba(255,255,255,1)]">
              Terms & Conditions
            </Link>
            <Link href="/shipping" className="text-xl font-semibold py-2 drop-shadow-[0_0px_15px_rgba(255,255,255,1)]">
              Shipping Policy
            </Link>
            <Link href="/return" className="text-xl font-semibold py-2 drop-shadow-[0_0px_15px_rgba(255,255,255,1)]">
              Return Policy
            </Link>
            <Link href="/privacy" className="text-xl font-semibold py-2 drop-shadow-[0_0px_15px_rgba(255,255,255,1)]">
              Privacy Policy
            </Link>
            <Link href="/cancellation" className="text-xl font-semibold py-2 drop-shadow-[0_0px_15px_rgba(255,255,255,1)]">
              Cancellation Policy
            </Link>
            <Link href={"/deleterequest"} className="text-xl font-semibold py-2 drop-shadow-[0_0px_15px_rgba(255,255,255,1)]">
              Data Deletion Request
            </Link>
            <Link href={"/requestdata"} className="text-xl font-semibold py-2 drop-shadow-[0_0px_15px_rgba(255,255,255,1)]">
              Account Deletion Request
            </Link>

            <div className="sm:hidden my-1">
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
