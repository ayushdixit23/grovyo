"use client";
import useIsMobile from "@/app/(utitlies)/hooks/useIsMobile";
import EmptyCommunity from "@/app/component/EmptyCommunity";
import FeedLayout from "@/app/component/FeedLayout";
import Newforyou from "@/app/component/Newforyou";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

const NewForYouLayout = () => {
  const path = usePathname();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const isMobile = useIsMobile();
  return (
    <div className="w-full flex justify-center items-center h-screen">
      <FeedLayout path={path} isMobile={isMobile} id={id} />
      <div
        className={`lg:w-[73%] md:w-[68%] sm:w-[63%] w-full h-full ${
          id && isMobile ? "" : "pn:max-sm:hidden"
        }  `}
      >
        <div className="w-full h-full">
          <div className="w-full h-full">
            {id && (
              <div className="w-full">
                <Newforyou id={id} />
              </div>
            )}
            {!id && (
              <div className="w-full">
                <EmptyCommunity />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewForYouLayout;
