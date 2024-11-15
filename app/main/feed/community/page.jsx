import React, { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import Component from "./component";

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
