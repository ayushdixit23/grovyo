"use client";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Creator = () => {
  const [creator, setCreator] = useState({
    name: "Ayush Dixit",
    email: "fsayush100@gmail.com",
  });

  const sendCreatorDetails = async () => {
    try {
      const data = {
        name: creator.name,
        email: creator.email,
      };
      const res = await axios.post(
        `http://localhost:7191/api/sendcreatordetails`,
        data
      );
      console.log(res.data);
      if (res.data.success) {
        toast.success("Invite Send!");
        setCreator({ name: "", email: "" });
      } else {
        toast.error("Some Error Occured!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-creator bg-center relative bg-cover p-8 sm:p-7">
      {/* <div className="absolute inset-0 bg-[#0A0A0A] opacity-50 -z-10"></div> */}
      <div className="flex justify-between w-full items-center sm:px-12">
        <div>
          <svg
            width="33"
            height="36"
            viewBox="0 0 33 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_431_5109)">
              <path
                d="M8.68457 16.6479C8.68457 17.0783 8.21684 17.3457 7.84589 17.1275L7.10237 16.6899C6.93245 16.5899 6.82812 16.4075 6.82812 16.2103V15.3618C6.82812 14.926 7.30641 14.6594 7.67713 14.8885L8.42065 15.348C8.58471 15.4494 8.68457 15.6285 8.68457 15.8213V16.6479Z"
                fill="white"
              />
              <path
                d="M8.68457 19.9858C8.68457 20.4162 8.21684 20.6836 7.84589 20.4653L7.10237 20.0278C6.93245 19.9278 6.82812 19.7454 6.82812 19.5482V18.6997C6.82812 18.2639 7.30641 17.9973 7.67713 18.2264L8.42065 18.6859C8.58471 18.7873 8.68457 18.9664 8.68457 19.1592V19.9858Z"
                fill="white"
              />
              <path
                d="M11.8691 21.5363C11.8691 21.9642 11.4062 22.232 11.0352 22.0187L10.2917 21.5911C10.1191 21.4919 10.0126 21.3079 10.0126 21.1087V20.3016C10.0126 19.8683 10.4859 19.6013 10.8567 19.8252L11.6003 20.2742C11.7671 20.375 11.8691 20.5557 11.8691 20.7506V21.5363Z"
                fill="white"
              />
              <path
                d="M11.7334 24.9866C11.7334 25.4233 11.2534 25.6898 10.8827 25.4589L10.1392 24.9958C9.9761 24.8942 9.87695 24.7157 9.87695 24.5235V23.57C9.87695 23.1277 10.368 22.8622 10.738 23.1043L11.4816 23.5907C11.6387 23.6935 11.7334 23.8686 11.7334 24.0564V24.9866Z"
                fill="white"
              />
              <path
                d="M8.68457 23.3822C8.68457 23.8127 8.21684 24.0801 7.84589 23.8618L7.10237 23.4243C6.93245 23.3243 6.82812 23.1419 6.82812 22.9447V22.0962C6.82812 21.6604 7.30641 21.3937 7.67713 21.6229L8.42065 22.0824C8.58471 22.1838 8.68457 22.3629 8.68457 22.5557V23.3822Z"
                fill="white"
              />
              <path
                d="M14.5898 26.2192C14.5898 26.6496 14.1221 26.917 13.7512 26.6987L13.0076 26.2612C12.8377 26.1612 12.7334 25.9788 12.7334 25.7816V24.9331C12.7334 24.4973 13.2117 24.2307 13.5824 24.4598L14.3259 24.9193C14.49 25.0207 14.5898 25.1998 14.5898 25.3926V26.2192Z"
                fill="white"
              />
              <path
                d="M28.5005 13.8933V11.3385C28.5005 11.1701 28.4106 11.0145 28.2648 10.9303L16.4859 4.13486C16.3402 4.0508 16.1608 4.05079 16.015 4.13486L4.23619 10.9303C4.09034 11.0145 4.00048 11.1701 4.00048 11.3385V24.9288C4.00048 25.0972 4.09034 25.2528 4.23619 25.3369L16.015 32.1324C16.1607 32.2165 16.3402 32.2165 16.4859 32.1324L28.2648 25.3369C28.4106 25.2528 28.5005 25.0972 28.5005 24.9288V19.0759C28.5005 18.8157 28.2895 18.6048 28.0293 18.6048H23.7889"
                stroke="white"
                stroke-width="1.88462"
                stroke-linecap="round"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_431_5109"
                x="0.231183"
                y="0.302472"
                width="32.0386"
                height="35.6621"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset />
                <feGaussianBlur stdDeviation="1.41346" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_431_5109"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_431_5109"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </div>
        {/* pn:max-sm:fixed pn:max-sm:bottom-0 pn:max-sm:left-0 */}
        <div className="text-[#D7E1F5] justify-center sm:ml-12 hidden md:ml-24 bg-gray-800 text-sm sm:flex items-center py-2 px-5 gap-12 rounded-3xl max-sm:rounded-none max-sm:gap-14 max-sm:w-full max-sm:opacity-85 max-sm:ml-0">
          <div className="hover:drop-shadow-xl hover:text-white py-1 cursor-pointer flex flex-col items-center hover:contrast-200 hover:brightness-200">
            Communities
          </div>
          <div className="hover:drop-shadow-xl hover:text-white py-1 cursor-pointer flex flex-col items-center hover:contrast-200 hover:brightness-200">
            Features
          </div>
          <div className=" hover:drop-shadow-xl hover:text-white py-1 cursor-pointer flex flex-col items-center hover:contrast-200 hover:brightness-200">
            For Creators
          </div>
        </div>
        <div className="flex gap-4">
          <div className="rounded-full bg-gray-900 w-9 h-9 flex justify-center items-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M18.5 11.5C18.5 15.366 15.366 18.5 11.5 18.5C7.63401 18.5 4.5 15.366 4.5 11.5C4.5 7.63401 7.63401 4.5 11.5 4.5C15.366 4.5 18.5 7.63401 18.5 11.5ZM18.5319 17.1177C19.7635 15.578 20.5 13.625 20.5 11.5C20.5 6.52944 16.4706 2.5 11.5 2.5C6.52944 2.5 2.5 6.52944 2.5 11.5C2.5 16.4706 6.52944 20.5 11.5 20.5C13.625 20.5 15.578 19.7635 17.1177 18.5319L19.7929 21.2071C20.1834 21.5976 20.8166 21.5976 21.2071 21.2071C21.5976 20.8166 21.5976 20.1834 21.2071 19.7929L18.5319 17.1177Z"
                fill="white"
              />
            </svg>
          </div>

          <button className="text-sm font-light text-white py-1 px-5 bg-blue-600 rounded-2xl shadow-lg shadow-blue-600/50">
            Download
          </button>
        </div>
      </div>
      <div className="mt-28 px-4 sm:px-24 flex flex-col gap-6">
        <div className="text-white font-bold text-3xl font-[Montserrat Alternates]">
          Creators Invite
        </div>

        <div className="text-[#FFF5EA] leading-5 text-sm">
          Enter your email for an exclusive invite. Join the next big thing in
          social <br />
          commerce. Let's create something extraordinary!
        </div>
        <div className="text-[#FFF5EA] w-full flex flex-col gap-2">
          Name
          <div>
            <input
              type="text"
              value={creator.name}
              onChange={(e) => setCreator({ ...creator, name: e.target.value })}
              placeholder="Enter your full name"
              className="outline-none bg-inherit w-full sm:w-[450px] text-[#F5F5F5] text-xs border-b-2 border-[#F5F5F5] p-2"
            />
          </div>
        </div>
        <div className="text-[#FFF5EA] w-full flex flex-col gap-2">
          Email Address
          <div>
            <input
              type="email"
              value={creator.email}
              onChange={(e) =>
                setCreator({ ...creator, email: e.target.value })
              }
              placeholder="Enter your email"
              className="outline-none bg-inherit w-full sm:w-[450px] text-[#F5F5F5] text-xs border-b-2 border-[#F5F5F5] p-2"
            />
          </div>
        </div>
        <div className="flex gap-2 text-[#FFF5EA] text-xs items-center mt-2">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.81354 2.1748C3.22965 2.1748 1.92578 3.47867 1.92578 5.06256V18.5388C1.92578 20.1226 3.22965 21.4265 4.81354 21.4265H18.2897C19.8736 21.4265 21.1775 20.1226 21.1775 18.5388V10.8381H19.2523V18.5388C19.2523 19.0725 18.8235 19.5013 18.2897 19.5013H4.81354C4.27974 19.5013 3.85095 19.0725 3.85095 18.5388V5.06256C3.85095 4.52876 4.27974 4.09997 4.81354 4.09997H13.4768V2.1748H4.81354ZM19.7073 4.01725L10.762 13.5002L7.22752 9.96573L5.86636 11.3269L10.8015 16.262L21.1079 5.33893L19.7073 4.01725Z"
              fill="white"
            />
          </svg>
          Privacy matters. Check out our
          <span className="text-[#0066FF]">Privacy Policy</span>
        </div>
        <div className="mt-2">
          <button
            onClick={sendCreatorDetails}
            className="text-sm font-semibold bg-white text-black rounded-lg py-1.5 px-12"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Creator;
