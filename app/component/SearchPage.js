
"use client";
import React, { useState, useEffect } from 'react';
import { BiSearchAlt } from "react-icons/bi";
import axios from "axios";
import { encryptaes } from "../utils/useful";
import { MdVerified } from "react-icons/md";
import Link from 'next/link';
import { API } from '@/Essentials';

const SearchPage = () => {
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const [recentSearch, setRecentSearch] = useState([]);

  const handleSearch = async (t) => {
    if (!t) {
      setData([]);
    }
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

  const handSave = (id) => {
    const getids = localStorage.getItem("ids");
    let setids;
    if (getids) {
      const parseIds = JSON.parse(getids);
      if (parseIds.includes(encryptaes(id))) {
        const filterArr = parseIds.filter((d) => d !== encryptaes(id));
        const newArr = [encryptaes(id), ...filterArr];
        localStorage.setItem("ids", JSON.stringify(newArr));
        return;
      }
      if (parseIds.length <= 10) {
        setids = [encryptaes(id), ...parseIds];
      } else {
        parseIds.pop();
        setids = [encryptaes(id), ...parseIds];
      }
    } else {
      setids = [encryptaes(id)];
    }
    localStorage.setItem("ids", JSON.stringify(setids));
  };

  const changeOrder = (id) => {
    const getids = localStorage.getItem("ids");
    if (getids) {
      const parseIds = JSON.parse(getids);
      const filterArr = parseIds.filter((d) => d !== encryptaes(id));
      const newArr = [encryptaes(id), ...filterArr];
      localStorage.setItem("ids", JSON.stringify(newArr));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (window !== undefined) {
        const getids = localStorage.getItem("ids");
        if (getids) {
          const parseIds = JSON.parse(getids) || [];
          const filteredIds = parseIds.filter(
            (id) => id !== null && id !== undefined
          );

          if (filteredIds.length > 0) {
            try {
              console.log(filteredIds)
              const res = await axios.post(
                `
                ${API}/search/recentSearch`,
                filteredIds
              );
              setRecentSearch(res.data.users);
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          }
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center flex-col bg-gradient-to-r bg-yellow-300  from-black via-[#111827] to-black overflow-hidden`}
    >
      <div className="flex flex-col text-center text-3xl w-[100%]  h-[50%] justify-center items-baseline font-poppins">
        <div className="text-2xl pp:text-3xl relative top-12 md:leading-snug sm:w-[80%] md:w-[100%] lg:text-3xl mt-4">
          Effortlessly Discover Your Perfect Prosites..
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
      <div
        className={`flex  w-[50%] sm:w-[50%]  ${data.length > 2 ? "h-auto sm:h-[100vh]" : "h-[100vh] sm:h-[100vh]"
          } mt-9`}
      >
        <div className="font-poppins pn:max-sm:w-full pn:max-sm:h-full ml-10 mt-2">
          Top Results:
          <div className=" pn:max-sm:w-full pn:max-sm:h-full">
            {text ? (
              <>
                {data?.length > 0 ? (
                  <div class="grid grid-cols-2 pp:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4 p-2 mt-5 w-full h-full">
                    {data.map((d, i) => (
                      <Link
                        key={i}
                        onClick={() => handSave(d?.p._id)}
                        href={`/${d?.p?.username}`}
                        class="flex flex-col items-center sm:w-[110px] h-[130px] justify-center bg-[#f9f9f9] sm:px-2 relative text-white shadow-lg shadow-white-500/5 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 ring-1 ring-[#f4f4f452] sm:py-2 rounded-[24px] p-2"
                      >
                        <div className="h-[60px]  w-[60px] rounded-lg overflow-hidden">
                          <img
                            src={d?.dps}
                            alt="img1"
                            className="object-cover w-full h-full justify-center"
                          />
                        </div>

                        <div className="font-semibold text-sm  font-sans mt-2">
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
                    <div className="flex pn:max-sm:w-full pn:max-sm:h-full justify-center items-center text-lg text-gray-400 font-merriweather">
                      Search Prosites
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                {recentSearch?.length > 0 && (
                  <div className=" md:w-[100%] max-w-full mt-2 flex flex-col pn:max-sm:w-full text-white flex-wrap ml-8">
                    <div className="font-merriweather select-none p-2">
                      Recent Search:
                    </div>

                    <div className="mt-1 grid grid-cols-2 md:grid-cols-5 w-[100%] gap-5 justify-center items-center md:gap-2 md:items-center">
                      {recentSearch?.slice(0, 10).map((d, i) => (
                        <Link
                          key={d?.id}
                          href={`/${d?.username}`}
                          onClick={() => changeOrder(d?.id)}
                          className={`flex flex-col items-center sm:w-[110px] h-[130px] justify-center bg-[#f9f9f9] sm:px-2 relative text-white shadow-lg shadow-white-500/5 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 ring-1 ring-[#f4f4f452] sm:py-2 rounded-[24px] p-2`}
                        >
                          <div className="h-[50px] w-[50px] rounded-[20px] ">
                            <img
                              className="w-full h-full object-cover rounded-[20px] "
                              src={d?.dp}
                              alt="image"
                            />
                          </div>

                          <div className="font-medium flex items-center mt-1  pn:max-sm:hidden text-sm">
                            <div className="pr-[2px]">
                              {d?.fullname?.length > 10
                                ? `${d?.fullname?.slice(0, 9)}...`
                                : d?.fullname}{" "}
                            </div>
                            {d?.isverified && (
                              <MdVerified className="text-blue-700" />
                            )}
                          </div>
                          <div className="text-[10px] pn:max-sm:hidden ">
                            {d?.username?.length > 8
                              ? `${d?.username?.slice(0, 8)}...`
                              : d?.fullname}{" "}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
