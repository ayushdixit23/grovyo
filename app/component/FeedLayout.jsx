import React, { Suspense } from "react";
import Switcher from "../main/feed/Component/Switcher";
import PostLoading from "./PostLoading";
import NewforfetchComponent from "./NewforfetchComponent";
import CommunityFetch from "./CommunityFetch";

const FeedLayout = ({ path, isMobile, id }) => {
  return (
    <div
      className={`${
        id && isMobile && "hidden"
      } lg:w-[27%] md:w-[32%] sm:w-[37%] w-full flex flex-col h-full`}
    >
      <div className="w-full pn:max-sm:h-[8%]"></div>
      <div className="w-full h-[9%] ">
        <Switcher />
      </div>
      <div className="h-[91%] overflow-y-scroll">
        <Suspense fallback={<PostLoading />}>
          {path.startsWith("/main/feed/newForYou") ? (
            <div className="w-full h-full">
              <NewforfetchComponent />
            </div>
          ) : (
            <div className="w-full h-full">
              <CommunityFetch />
            </div>
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default FeedLayout;
