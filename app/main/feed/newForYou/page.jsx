import React, { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import Component from "./component";
import PostLoading from "@/app/component/PostLoading";

const page = () => {
  return (
    <>
      <Toaster />
      <Suspense>
        <Component />
      </Suspense>
    </>
  );
};

export default page;
