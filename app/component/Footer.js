import Link from "next/link";
import React from "react";
import { FaInstagram } from "react-icons/fa";
import { GrLinkedinOption } from "react-icons/gr";
import { RiTwitterXLine } from "react-icons/ri";

function Footer() {
  return (
    <>
      <div className="flex justify-between items-center w-full">
        <div className="w-full bg-black p-2 flex gap-3 items-center text-center pn:max-sm:flex-col">
          <div>Follow us on social media 👉</div>

          <div
            className="flex items-center justify-center gap-2
  "
          >
            <Link href={"https://www.linkedin.com/company/81949261/admin/feed/posts/"} className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-xl text-black ">
              <FaInstagram />
            </Link>
            <Link href={"https://www.linkedin.com/company/81949261/admin/feed/posts/"} className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-xl text-black ">
              <GrLinkedinOption />
            </Link>
            {/* <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-xl text-black ">
          <RiTwitterXLine />
        </div> */}
          </div>
        </div>
        <div className="flex justify-end items-center pn:max-sm:hidden md:gap-4 gap-2 w-full">
          <Link href="/shipping" className="hover:underline duration-75 text-xs md:text-base shadow-md text-white ">
            Shipping
          </Link>
          <Link href="/cancellation" className="hover:underline duration-75 text-xs md:text-base shadow-md text-white ">
            Cancellation
          </Link>
          <Link href="/terms" className="hover:underline duration-75 text-xs md:text-base shadow-md text-white ">
            Terms & Conditions
          </Link>
          <Link href="/privacy" className="hover:underline duration-75 text-xs md:text-base shadow-md text-white ">
            Privacy Policy
          </Link>

        </div>
      </div>
    </>
  );
}

export default Footer;
