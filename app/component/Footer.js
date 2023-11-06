import Link from "next/link";
import React from "react";
import { FaInstagram } from "react-icons/fa";
import { GrLinkedinOption } from "react-icons/gr";
import { RiTwitterXLine } from "react-icons/ri";

function Footer() {
  return (
    <div className="w-full bg-black h-20 flex justify-between items-center text-center pn:max-sm:flex-col -mt-4 ">
      <div>Follow us on social media 👉</div>

      <div
        className="flex items-center justify-between w-20
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
  );
}

export default Footer;
