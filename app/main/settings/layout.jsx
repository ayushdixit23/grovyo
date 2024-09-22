"use client";
import React, { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Component from "./laycom";

const page = ({ children }) => {
  return (
    <>
      <Toaster />
      <Suspense
        fallback={
          <>
            <div className="flex justify-center items-center h-screen">
              <div className="animate-spin">
                <AiOutlineLoading3Quarters />
              </div>
            </div>
          </>
        }
      >
        <Component>{children}</Component>
      </Suspense>
    </>
  );
};

export default page;
