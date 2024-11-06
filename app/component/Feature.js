import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import ic1 from "../assets/div.animate-block.png";
import ic2 from "../assets/div.animate.png";
import ic3 from "../assets/Chat.png";
import ic4 from "../assets/monetize.png";
import ic5 from "../assets/buy.png";
import ic6 from "../assets/topics.png";
import Image from "next/image";
import Link from "next/link";

const Feature = () => {
  return (
    <div className="flex pn:max-sm:mb-[70px] justify-center items-center  mt-12">
      <div className="grid pp:grid-cols-2 md:grid-cols-3 gap-10 lg:w-[80%] px-5 sm:px-8 ">
        <div className="flex flex-col gap-4">
          <div className="flex justify-center text-xl pp:text-3xl font-semibold  ">
            Community
          </div>
          <div className="border border-[#FFD5D5] rounded-3xl bg-[#FFD5D5] text-black text-xs px-4 flex flex-col font-bold">
            <div className="grid grid-cols-2 gap-1">
              <div>
                <Image
                  src={ic1}
                  alt="ic1"
                  onContextMenu={(e) => e.preventDefault()}
                  className="h-[200px] md:w-[200px] object-contain"
                />
              </div>
              <div className="flex flex-col justify-center items-center font-medium">
                <div className="mb-2 mt-5 text-[13px] font-bold">Create Communities</div>
                <div className="flex justify-center text-center items-center w-full">
                  Join or create hubs for your interests. Make friends & discuss what you love.
                </div>
                <Link href={"/features/community"} className="flex items-center bg-transparent hover:bg-black text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-slate rounded-full mt-5 gap-2">
                  Learn more
                  <IoIosArrowRoundForward className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* chats */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-center text-xl pp:text-3xl font-semibold  ">
            Chats
          </div>
          <div className="border border-[#FFD8AA] rounded-3xl bg-[#FFD8AA] text-black text-xs px-4  flex flex-col font-bold">
            <div className="grid grid-cols-2 gap-1">
              <div>
                <Image
                  src={ic3}
                  alt="ic3"
                  onContextMenu={(e) => e.preventDefault()}
                  className="h-[200px] flex justify-center items-center relative top-3 w-[220px] object-contain"
                />
              </div>
              <div className="flex flex-col justify-center items-center font-medium">
                <div className="mb-2 mt-5 text-[13px] font-bold">Chats</div>
                <div className="flex justify-center text-center items-center w-full">
                  Connect with anyone! Find friends, network with businesses, or explore new chat features.
                </div>
                <Link href={"/features/chats"} className="flex items-center bg-transparent hover:bg-black text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-slate rounded-full mt-5 gap-2">
                  Learn more
                  <IoIosArrowRoundForward className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* prosite */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-center text-xl pp:text-3xl font-semibold  ">
            Prosite
          </div>
          <div className="border border-[#BFF9EA] rounded-3xl bg-[#BFF9EA] text-black text-xs px-4  flex flex-col font-bold">
            <div className="grid grid-cols-2 gap-1">
              <div>
                <Image
                  src={ic2}
                  alt="ic2"
                  onContextMenu={(e) => e.preventDefault()}
                  className="h-[200px] md:w-[200px] object-contain"
                />
              </div>
              <div className="flex flex-col justify-center items-center font-medium">
                <div className="mb-2 mt-5 text-[13px] font-bold">Create your Prosite</div>
                <div className="text-center">
                  Build a professional online presence. Craft your profile website and wow your audience.
                </div>
                <Link href={"/features/prosite"} className="flex items-center bg-transparent hover:bg-black text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-slate rounded-full mt-5 gap-2">
                  Learn more
                  <IoIosArrowRoundForward className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Monetize */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-center text-xl pp:text-3xl font-semibold  ">
            Monetization
          </div>
          <div className="border border-[#E7D472] rounded-3xl bg-[#E7D472] text-black text-xs px-4 flex flex-col font-bold">
            <div className="grid grid-cols-2 gap-1">
              <div>
                <Image
                  src={ic4}
                  alt="ic4"
                  onContextMenu={(e) => e.preventDefault()}
                  className="h-[200px] md:w-[200px] object-contain"
                />
              </div>
              <div className="flex flex-col justify-center items-center font-medium">
                <div className="mb-2 mt-5 text-center text-[13px] font-bold">Monetize your community</div>
                <div className="flex justify-center text-center items-center w-full">Turn your passions into profit! Sell products, display ads, or offer paid content in your community.</div>

                <Link href={"/features/earnwithus"} className="flex items-center bg-transparent hover:bg-black text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-slate rounded-full mt-3 gap-2">
                  Learn more
                  <IoIosArrowRoundForward className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Buy and Sell */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-center text-xl pp:text-3xl font-semibold  ">
            Buy and Sell
          </div>
          <div className="border border-[#FFD8AA] rounded-3xl bg-[#F4F0E4] text-black text-xs px-4 flex flex-col font-bold">
            <div className="grid grid-cols-2 gap-1">
              <div>
                <Image
                  src={ic5}
                  alt="ic5"
                  onContextMenu={(e) => e.preventDefault()}
                  className="h-[200px] md:w-[200px] object-contain"
                />
              </div>
              <div className="flex flex-col justify-center items-center font-medium">
                <div className="mb-2 mt-5 text-[13px] font-bold">Create Your store</div>
                <div className="text-center">
                  Become a Grovyo merchant!
                  Sell directly, build a brand
                  community, and thrive.
                </div>
                <Link href={"/features/store"} className="flex items-center bg-transparent hover:bg-black text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-slate rounded-full mt-5 gap-2">
                  Learn more
                  <IoIosArrowRoundForward className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Topics */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-center text-xl pp:text-3xl font-semibold  ">
            Topics
          </div>
          <div className="border border-[#C7D0FF] rounded-3xl bg-[#C7D0FF] text-black text-xs px-4  flex flex-col font-bold">
            <div className="grid grid-cols-2 gap-1">
              <div>
                <Image
                  src={ic6}
                  alt="ic6"
                  onContextMenu={(e) => e.preventDefault()}
                  className="h-[200px] md:w-[200px] object-contain"
                />
              </div>
              <div className="flex flex-col justify-center items-center font-medium">
                <div className="mb-2 mt-5 text-[13px] font-bold">Topics</div>
                <div className="flex justify-center text-center items-center w-full">
                  Share expertise, spark discussions, and potentially earn income with in-depth content.
                </div>
                <Link href={"/features/topics"} className="flex items-center bg-transparent hover:bg-black text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-slate rounded-full mt-5 gap-2">
                  Learn more
                  <IoIosArrowRoundForward className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
