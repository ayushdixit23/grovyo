import Image from "next/image";
import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";
import Logo from "../assets/Grovyo.png";
import Link from "next/link";

const FooterComponent = () => {
  return (
    <div className="w-full text-white bg-[#0D0D0D] md:bg-[#0F0F0F] flex flex-col  px-4 py-12 gap-y-16 md:h-96  md:px-20 md:py-16">
      <div className="flex flex-col justify-between gap-5 md:flex-row ">
        <div className=" flex  flex-col justify-center text-white/60 gap-y-11 md:justify-start xl:flex-1">
          <div className="flex justify-center md:justify-start">
            <Image
              className="w-[200px] h-[45px]"
              src={Logo}
              alt="logo"
              width={150}
              height={50}
            />
          </div>
          <ul className="hidden lg:flex text-[12px] text-white/60 gap-x-8">
            <li>
              <Link href={"/terms"}>Terms & Conditions</Link>
            </li>
            <li>
              <Link href={"/contact"}>Contact</Link>
            </li>
            <li>
              <Link href={"/about"}>About</Link>
            </li>
            <li>
              <Link href={"/privacy"}>Privacy Policy</Link>
            </li>
          </ul>

          <div className="w-full gap-x-8 text-white hidden md:flex text-[24px]">
            <FaFacebook />
            <FaInstagram />
            <FaTwitter />
            <FaLinkedin />
          </div>
        </div>
        <div className="flex justify-center border-t border-[#262626] text-white md:border-none xl:flex-1">
          <div className="flex gap-x-4 items-start justify-between pt-9 md:pt-0 lg:gap-x-16">
            <h3 className="text-[15px] py-3">Create your Prosite for free</h3>
            <Link
              className="bg-[#1A85FF] text-[14px] px-5 py-3 rounded-lg flex gap-x-2"
              href=""
            >
              Create For free <GoArrowUpRight className="text-xl" />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center border-t text-white/60 pt-9 border-[#262626] gap-8  text-[14px] md:flex-row md:justify-between">
        <ul className="gap-x-8 hidden md:flex ">
          <li>English</li>
          <li>Privacy</li>
          <li>Legal</li>
        </ul>
        <ul className="flex justify-between px-2 w-full text-[18px] sm:px-24 md:hidden">
          <li>
            <Link href={"/about"}>About Us</Link>
          </li>
          <li>
            <Link href={"/contact"}>Contact</Link>
          </li>
          <li>
            <Link href={"/privacy"}>Privacy Policy</Link>
          </li>
        </ul>
        <p className="text-[14px]">© 2023 Cadet UI. All Rights Reserved.</p>
        <div className="flex w-full text-white justify-center gap-x-8 md:hidden text-[28px]">
          <FaFacebook />
          <FaInstagram />
          <FaTwitter />
          <FaLinkedin />
        </div>
      </div>
    </div>
  );
};

export default FooterComponent;
