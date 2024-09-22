"use client";
import { useSelector } from "react-redux";
import Switcher from "./Component/Switcher";
import React from "react";

const PostLayout = React.memo(({ children }) => {
  const hide = useSelector((state) => state.remember.hide);
  return (
    <div className="w-full">
      {!hide && (
        <div className="z-40 w-full bg-white pn:max-md:w-full">
          <Switcher />
        </div>
      )}

      <div className="w-full h-screen flex z-0">{children}</div>

    </div>
  );
});

export default PostLayout;
