"use client";
import React, { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import axios from "axios";
import Link from "next/link";
import { API } from "@/Essentials";
const SearchPage = () => {
  const [text, setText] = useState("");
  const [data, setData] = useState([]);

  const handleSearch = async (t) => {
    if (!t) {
      setData([]);
    }

    console.log("object");
    setText(t);
    try {
      if (t) {
        const res = await axios.post(`${API}/search/searchpros?query=${t}`);

        console.log(res.data);
        if (res?.data?.success) {
          const pros = res?.data?.data?.pros;
          const dp = res?.data?.data?.dps;
          const merge = pros?.map((p, i) => ({ p, dps: dp[i] }));
          const useful = merge.slice(0, 10);
          setData(useful);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      className={`flex justify-center pn:max-sm:mb-[80px] items-center flex-col`}
    >
      <div className="flex flex-col mt-4 items-center text-center text-3xl font-semibold">
        <div className="text-2xl pp:text-3xl text-center px-4 md:leading-snug sm:w-[50%] md:w-[70%] lg:text-4xl">
          Discover The Perfect Prosites With An Effortless Search And Selection
        </div>
      </div>
      <div className="w-full h-[50px] flex justify-center items-center mt-4">
        <div className="bg-gray-400 w-[90%] space-x-2 flex items-center bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-25 sm:w-[50%] h-full border border-[#444] px-5 py-2 rounded-full mt-5">
          <BiSearchAlt size={25} className="mt-1" />
          <input
            placeholder="Search Prosites"
            className="bg-transparent outline-none w-full"
            value={text}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
      <div className={`flex w-[90%] sm:w-[50%] ${data.length > 4 ? "h-auto sm:h-[59vh]" : "h-[52vh] sm:h-[59vh]"} mt-9`}>
        <div className="font-semibold pn:max-sm:w-full pn:max-sm:h-full">
          Top Results:
          <div className=" pn:max-sm:w-full pn:max-sm:h-full">
            <>
              {data?.length > 0 ? (
                <div class="grid grid-cols-2 pp:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-6 p-2 mt-5 w-full h-full">
                  {data.map((d, i) => (
                    <Link
                      key={i}
                      href={`/${d?.p?.username}`}
                      class="bg-gray-400 sm:max-w-[400px]  p-2 flex justify-center items-center flex-col px-4 text-center bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-25 border-[#444] rounded-xl"
                    >
                      <div className="h-[60px]  w-[60px] rounded-lg overflow-hidden">
                        <img
                          src={d?.dps}
                          alt="img1"
                          className="object-cover w-full h-full justify-center"
                        />
                      </div>

                      <div className="font-semibold text-sm font-sans mt-2">
                        {d?.p?.fullname?.length > 10
                          ? `${d?.p?.fullname.slice(0, 10)}...`
                          : d?.p?.fullname}
                      </div>
                      <div className="font-light text-xs font-sans">
                        @{" "}
                        {d?.p?.username?.length > 10
                          ? `${d?.p?.username.slice(0, 10)}...`
                          : d?.p?.username}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <>
                  <div className="flex pn:max-sm:w-full pn:max-sm:h-full justify-center items-center text-lg text-gray-400 ">
                    Search Prosites
                  </div>
                </>
              )}
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
