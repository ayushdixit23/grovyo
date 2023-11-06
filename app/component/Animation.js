"use client";
import React from "react";
import animationData from "../assets/animationData.json";
import Lottie from "lottie-react";

function Animation() {
  return (
    <div className="">
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        size={120}
      />
    </div>
  );
}

export default Animation;
