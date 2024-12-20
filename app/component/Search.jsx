"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useAuthContext } from "@/app/(utitlies)/utils/AuthWrapper";
import { API } from "../../Essentials";
import { MdVerified } from "react-icons/md";
import styles from "../CustomScrollbarComponent.module.css";
import { RxCross2 } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import searchlottie from "../assets/search.json";
import searchblack from "../assets/searchblack.json";
import { useTheme } from "next-themes";
import { useDispatch, useSelector } from "react-redux";
import {
  setRecentSearchCom,
  setRecentSearchPro,
} from "../redux/slice/remember";

const Search = React.memo(({ setShow }) => {
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const [dataa, setDataa] = useState([]);
  const recentSearchPro = useSelector(
    (state) => state.remember.recentSearchPro
  );
  const recentSearchCom = useSelector(
    (state) => state.remember.recentSearchCom
  );
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const debounceTimer = useRef(null);
  const { theme } = useTheme();
  const [all, setAll] = useState({
    prosites: [],
    community: [],
    posts: [],
  });

  const [active, setActive] = useState("all");

  const { data: user } = useAuthContext();
  const [click, setClick] = useState(1);

  const abortController = new AbortController();
  // // Call this function when you want to abort the request
  // const abortSearch = () => {
  //   abortController.abort(); // Abort the API request
  // };

  const searchAll = useCallback(async () => {
    try {
      const res = await axios.post(
        `${API}/searchall/${user?.id}?query=${text}`,
        {
          signal: abortController.signal,
        }
      );
      if (res.data.success) {
        setAll({
          prosites: res.data.mergedpros,
          community: res.data.mergedcoms,
          posts: res.data.mergedposts,
        });
      }
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.log(error);
      }
    }
  }, [text, user?.id]);

  const searchforposts = useCallback(async () => {
    try {
      const res = await axios.post(`${API}/searchposts?query=${text}`, {
        signal: abortController.signal,
      });
      if (res.data.success) {
        setPosts(res.data.posts);
      }
    } catch (error) {
      console.log(error);
    }
  }, [text]);

  const handleSearch = useCallback(async () => {
    setActive("prosites");
    setClick(1);
    const res = await axios.post(`${API}/searchpros?query=${text}`, {
      signal: abortController.signal,
    });
    if (res?.data?.success) {
      const pros = res?.data?.data?.pros;
      const dp = res?.data?.data?.dps;
      const merge = pros?.map((p, i) => ({ p, dps: dp[i] }));
      setData(merge);
      setLoad(true);
    }
  }, [text]);

  const comm = useCallback(async () => {
    setActive("communities");
    setClick(2);
    const res = await axios.post(
      `${API}/searchcoms/${user?.id}?query=${text}`,
      {
        signal: abortController.signal,
      }
    );
    if (res?.data?.success) {
      const pros = res?.data?.data?.coms;
      const dp = res?.data?.data?.dps;
      const c = res?.data?.data?.creatordps;
      const merge = pros?.map((p, i) => ({
        p,
        dps: dp[i],
        creatordps: c[i],
      }));
      setDataa(merge);
      setLoad(true);
    }
  }, [text, user?.id]);

  const addSearchCom = async (sId) => {
    try {
      const res = await axios.post(
        `${API}/addRecentSearchCommunity/${user?.id}`,
        {
          sId,
        }
      );
      if (res.data.success) {
        recentSearchs();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addSearchPro = async (sId) => {
    try {
      const res = await axios.post(
        `${API}/addRecentSearchProsite/${user?.id}`,
        {
          sId,
        }
      );
      if (res.data.success) {
        recentSearchs();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeSearchCom = async (sId) => {
    try {
      const res = await axios.post(
        `${API}/removeRecentSearchCommunity/${user?.id}`,
        { sId }
      );
      if (res.data.success) {
        recentSearchs();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeSearchPro = async (sId) => {
    try {
      const res = await axios.post(
        `${API}/removeRecentSearchProsite/${user?.id}`,
        { sId }
      );
      if (res.data.success) {
        recentSearchs();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      if (text) {
        switch (active) {
          case "prosites":
            handleSearch();
            break;
          case "communities":
            comm();
            break;
          case "all":
            searchAll();
            break;
          case "posts":
            searchforposts();
            break;
          default:
            break;
        }
      }
    }, 300); // 300ms debounce delay

    return () => {
      clearTimeout(debounceTimer.current);
    };
  }, [text, active]);

  const recentSearchs = async () => {
    try {
      const res = await axios.get(`${API}/recentSearches/${user?.id}`, {
        signal: abortController.signal,
      });
      if (res.data.success) {
        dispatch(setRecentSearchCom(res.data?.recentSearchesCommunity));
        dispatch(setRecentSearchPro(res.data?.recentSearchesProsites));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user.id) {
      const shouldFetchRecentSearches =
        !recentSearchPro ||
        (Array.isArray(recentSearchPro) && recentSearchPro.length === 0) ||
        !recentSearchCom ||
        (Array.isArray(recentSearchCom) && recentSearchCom.length === 0);

      if (shouldFetchRecentSearches) {
        recentSearchs();
      }
    }
  }, [user.id]);

  return (
    <div className="pn:max-pp:w-[100%] pp:w-[390px] z-50 h-screen bg-white dark:bg-[#0D0F10] flex flex-col">
      <div className="flex justify-between items-center my-2 py-2 gap-2 px-2">
        <div className="text-2xl font-semibold">Search</div>
        <div className="flex justify-center items-center gap-2">
          <div className="sm:block hidden">
            <IoIosSearch className="text-xl" />
          </div>
          <div className="block sm:hidden">
            <RxCross2 className="text-xl" onClick={() => setShow(false)} />
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-around bg-white dark:bg-transparent items-center px-2 w-[100%]">
        <input
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          value={text}
          className=" border dark:border-[#1F2228] dark:text-white dark:bg-bluelight :bg-[#3e3e3e] px-3 :text-[#fff] rounded-xl p-1.5 w-[100%] outline-none text-black"
          placeholder="Search"
          onChange={(t) => setText(t.target.value)}
        />
      </div>

      <div className="flex justify-center mt-3 px-2 items-center gap-2">
        <div
          onClick={() => {
            setActive("all");
            if (text) {
              searchAll();
            }
          }}
          className={`w-full text-center rounded-xl cursor-pointer ${
            active === "all"
              ? "bg-[#5585FF] dark:bg-white text-white dark:text-black"
              : " border border-[#1f2228]"
          }  p-2 text-sm`}
        >
          All
        </div>
        <div
          onClick={() => {
            setActive("prosites");
            if (text) {
              handleSearch();
            }
          }}
          className={`w-full text-center rounded-xl cursor-pointer ${
            active === "prosites"
              ? "bg-[#5585FF] dark:bg-white text-white dark:text-black"
              : " border border-[#1f2228]"
          } p-2 text-sm`}
        >
          Prosite
        </div>
        <div
          onClick={() => {
            setActive("communities");
            if (text) {
              comm();
            }
          }}
          className={`w-full text-center rounded-xl cursor-pointer ${
            active === "communities"
              ? "bg-[#5585FF] dark:bg-white text-white dark:text-black"
              : " border border-[#1f2228]"
          } p-2 text-sm`}
        >
          Communities
        </div>
        <div
          onClick={() => {
            setActive("posts");
            if (text) {
              searchforposts();
            }
          }}
          className={`w-full text-center rounded-xl cursor-pointer ${
            active === "posts"
              ? "bg-[#5585FF] dark:bg-white text-white dark:text-black"
              : "border border-[#1f2228]"
          }  p-2 text-sm`}
        >
          Posts
        </div>
      </div>

      {active === "all" && (
        <>
          {all.prosites.length > 0 ||
          all.community.length > 0 ||
          all.posts.length > 0 ? (
            <div
              className={`p-2 mt-4 flex flex-col gap-5 overflow-y-scroll ${styles.customScrollbar}`}
            >
              {/* prosites */}
              <div>
                <div className="dark:bg-[#171717] bg-[#f1f1f1] rounded-xl flex justify-between items-center p-2 px-4">
                  <div className="font-semibold">
                    Prosite{" "}
                    <span className="text-[#5585FF]">
                      ({all.prosites?.length})
                    </span>
                  </div>
                  <div className="text-sm underline text-[#555555]">
                    view all
                  </div>
                </div>
                <div className="flex flex-col gap-2 px-2 mt-3">
                  {all.prosites?.map((d, i) => (
                    <a
                      href={`https://grovyo.com/${d?.username}`}
                      target="_blank"
                      key={i}
                      onClick={addSearchPro}
                      className="flex flex-row items-center py-1 bg-[#f7f7f7] rounded-lg dark:bg-[#0D0D0D] px-3 justify-between"
                    >
                      <div className="flex justify-center items-center">
                        <div className="h-[45px] w-[45px]">
                          <img
                            src={d?.dps}
                            className="w-full h-full object-cover bg-[#fff] rounded-[20px]"
                          />
                        </div>
                        <div className="px-2 py-2 :text-white text-black dark:text-white text-[14px] font-bold ">
                          <div className="flex items-center gap-1">
                            <div>{d?.fullname}</div>

                            {d?.isverified && (
                              <div>
                                <MdVerified className="text-blue-600" />
                              </div>
                            )}
                          </div>
                          <div className="text-[11px] dark:text-white">
                            {d?.username}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm underline">view</div>
                    </a>
                  ))}
                </div>
              </div>

              {/* community */}
              <div>
                <div className="dark:bg-[#171717] bg-[#f1f1f1] rounded-xl flex justify-between items-center p-2 px-4">
                  <div className="font-semibold">
                    Community
                    <span className="text-[#5585FF]">
                      ({all.community?.length})
                    </span>
                  </div>
                  <div className="text-sm underline text-[#555555]">
                    view all
                  </div>
                </div>
                <div className="flex flex-col gap-2 px-2 mt-3">
                  {all.community?.map((d, i) => (
                    <a
                      href={`https://grovyo.com/main/feed/newForYou?id=${d?._id}`}
                      target="_blank"
                      key={i}
                      onClick={addSearchCom}
                      className="flex flex-row items-center py-1 bg-[#f7f7f7] rounded-lg dark:bg-[#0D0D0D] px-3 justify-between"
                    >
                      <div className="flex justify-center items-center">
                        <div className="h-[45px] w-[45px]">
                          <img
                            src={d?.img}
                            className="w-full h-full object-cover bg-[#fff] rounded-[20px]"
                          />
                        </div>
                        <div className="px-2 py-2 :text-white text-black dark:text-white text-[14px] font-bold ">
                          <div className="flex items-center gap-1">
                            <div>{d?.title}</div>

                            {d?.isverified && (
                              <div>
                                <MdVerified className="text-blue-600" />
                              </div>
                            )}
                          </div>
                          <div className="text-[11px] dark:text-white">
                            {d?.memberscount}{" "}
                            {Number(d?.memberscount) > 1 ? "members" : "member"}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm underline">view</div>
                    </a>
                  ))}
                </div>
              </div>

              {/* posts */}
              <div>
                <div className="dark:bg-[#171717] bg-[#f1f1f1] rounded-xl flex justify-between items-center p-2 px-4">
                  <div className="font-semibold">
                    Posts{" "}
                    <span className="text-[#5585FF]">
                      ({all.posts?.length})
                    </span>
                  </div>
                  <div className="text-sm underline text-[#555555]">
                    view all
                  </div>
                </div>
                <div className="flex flex-col gap-2 px-2 mt-3">
                  {all.posts?.map((d, i) => (
                    <a
                      // href={`https://grovyo.com/main/feed/newForYou?id=${d?.community?._id}#${d?._id}`}
                      href={`http://localhost:3000/main/feed/newForYou?id=${d?.community?._id}#${d?._id}`}
                      target="_blank"
                      key={i}
                      className="flex flex-row items-center py-1 bg-[#f7f7f7] rounded-lg dark:bg-[#0D0D0D] px-3 justify-between"
                    >
                      <div className="flex justify-center items-center">
                        <div className="h-[45px] w-[45px]">
                          <img
                            src={d?.img}
                            className="w-full h-full min-h-[45px] min-w-[45px] max-h-[45px] max-w-[45px] object-cover bg-[#fff] rounded-[20px]"
                          />
                        </div>
                        <div className="px-2 py-2 flex flex-col gap-1 text-black dark:text-white text-[14px] font-bold ">
                          <div className="flex items-center gap-1">
                            <div className="text-[#CFCDDE] ">
                              {d?.title?.length > 32
                                ? `${d?.title?.substring(0, 32)}...`
                                : d?.title}
                            </div>
                          </div>
                          <div className="text-[11px] max-w-[90%] dark:text-white">
                            {d?.desc && d?.desc?.length > 49
                              ? `${d?.desc?.substring(0, 49)}...`
                              : d?.desc}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm underline">view</div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-[100%] flex justify-center items-start">
              <div className="flex justify-center items-center h-full max-h-[400px]">
                {theme === "dark" ? (
                  <Lottie animationData={searchlottie} size={100} loop={true} />
                ) : (
                  <Lottie animationData={searchblack} size={100} loop={true} />
                )}
              </div>
            </div>
          )}
        </>
      )}

      {active === "posts" && (
        <>
          {posts.length > 0 ? (
            <div
              className={`p-2 mt-4 flex flex-col gap-5 overflow-y-scroll ${styles.customScrollbar}`}
            >
              <div>
                <div className="dark:bg-[#171717] bg-[#f1f1f1] rounded-xl flex justify-between items-center p-2 px-4">
                  <div className="font-semibold">
                    Posts{" "}
                    <span className="text-[#5585FF]">({posts?.length})</span>
                  </div>
                  <div className="text-sm underline text-[#555555]">
                    view all
                  </div>
                </div>
                <div className="flex flex-col gap-2 px-2 mt-3">
                  {posts?.map((d, i) => (
                    <a
                      href={`https://grovyo.com/main/feed/newForYou?id=${d?.community?._id}#${d?._id}`}
                      target="_blank"
                      key={i}
                      className="flex flex-row items-center py-1 bg-[#f7f7f7] rounded-lg dark:bg-[#0D0D0D] px-3 justify-between"
                    >
                      <div className="flex justify-center items-center">
                        <div className="h-[45px] w-[45px]">
                          <img
                            src={d?.img}
                            className="w-full h-full min-h-[45px] min-w-[45px] max-h-[45px] max-w-[45px] object-cover bg-[#fff] rounded-[20px]"
                          />
                        </div>
                        <div className="px-2 py-2 flex flex-col gap-1 text-black dark:text-white text-[14px] font-bold ">
                          <div className="flex items-center gap-1">
                            <div className="text-[#CFCDDE] ">
                              {d?.title?.length > 32
                                ? `${d?.title?.substring(0, 32)}...`
                                : d?.title}
                            </div>
                          </div>
                          <div className="text-[11px] max-w-[90%] dark:text-white">
                            {d?.desc && d?.desc?.length > 49
                              ? `${d?.desc?.substring(0, 49)}...`
                              : d?.desc}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm underline">view</div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-[100%] flex justify-center items-start">
              <div className="flex justify-center items-center h-full max-h-[400px]">
                {theme === "dark" ? (
                  <Lottie animationData={searchlottie} size={100} loop={true} />
                ) : (
                  <Lottie animationData={searchblack} size={100} loop={true} />
                )}
              </div>
            </div>
          )}
        </>
      )}

      {active === "prosites" && (
        <>
          {data.length > 0 ? (
            <div
              className={`p-2 mt-4 flex flex-col gap-5 overflow-y-scroll ${styles.customScrollbar}`}
            >
              <div>
                <div className="dark:bg-[#171717] bg-[#f1f1f1] rounded-xl flex justify-between items-center p-2 px-4">
                  <div className="font-semibold">
                    Prosite{" "}
                    <span className="text-[#5585FF]">({data?.length})</span>
                  </div>
                  <div className="text-sm underline text-[#555555]">
                    view all
                  </div>
                </div>
                <div className="flex flex-col gap-2 px-2 mt-3">
                  {data?.map((d, i) => (
                    <a
                      href={`https://grovyo.com/${d?.p?.username}`}
                      target="_blank"
                      key={i}
                      onClick={addSearchPro}
                      className="flex flex-row items-center py-1 bg-[#f7f7f7] rounded-lg dark:bg-[#0D0D0D] px-3 justify-between"
                    >
                      <div className="flex justify-center items-center">
                        <div className="h-[45px] w-[45px]">
                          <img
                            src={d?.dps}
                            className="w-full h-full object-cover bg-[#fff] rounded-[20px]"
                          />
                        </div>
                        <div className="px-2 py-2 :text-white text-black dark:text-white text-[14px] font-bold ">
                          <div className="flex items-center gap-1">
                            <div>{d?.p?.fullname}</div>

                            {d?.p?.isverified && (
                              <div>
                                <MdVerified className="text-blue-600" />
                              </div>
                            )}
                          </div>
                          <div className="text-[11px] dark:text-white">
                            {d?.p?.username}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm underline">view</div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div
              className={`p-2 mt-4 flex flex-col gap-5 overflow-y-scroll ${styles.customScrollbar}`}
            >
              <div>
                <div className="dark:bg-[#171717] bg-[#f1f1f1] rounded-xl flex justify-between items-center p-2 px-4">
                  <div className="font-semibold">
                    Recent Prosite Searches{" "}
                    <span className="text-[#5585FF]">
                      ({recentSearchPro?.length})
                    </span>
                  </div>
                  <div className="text-sm underline text-[#555555]">
                    view all
                  </div>
                </div>
                <div className="flex flex-col gap-2 px-2 mt-3">
                  {recentSearchPro?.map((d, i) => (
                    <div
                      key={i}
                      className="flex flex-row items-center py-1 bg-[#f7f7f7] rounded-lg dark:bg-[#0D0D0D] px-3 justify-between"
                    >
                      <a
                        href={`https://grovyo.com/${d?.username}`}
                        target="_blank"
                        className="flex justify-center items-center"
                      >
                        <div className="h-[45px] w-[45px]">
                          <img
                            src={d?.dp}
                            className="w-full h-full object-cover bg-[#fff] rounded-[20px]"
                          />
                        </div>
                        <div className="px-2 py-2 :text-white text-black dark:text-white text-[14px] font-bold ">
                          <div className="flex items-center gap-1">
                            <div>{d?.fullname}</div>

                            {d?.isverified && (
                              <div>
                                <MdVerified className="text-blue-600" />
                              </div>
                            )}
                          </div>
                          <div className="text-[11px] dark:text-white">
                            {d?.username}
                          </div>
                        </div>
                      </a>
                      <div>
                        <RxCross2 onClick={() => removeSearchPro(d?.id)} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {active === "communities" && (
        <>
          {dataa.length > 0 ? (
            <div
              className={`p-2 mt-4 flex flex-col gap-5 overflow-y-scroll ${styles.customScrollbar}`}
            >
              <div>
                <div className="dark:bg-[#171717] bg-[#f1f1f1] rounded-xl flex justify-between items-center p-2 px-4">
                  <div className="font-semibold">
                    Community
                    <span className="text-[#5585FF]">({dataa?.length})</span>
                  </div>
                  <div className="text-sm underline text-[#555555]">
                    view all
                  </div>
                </div>
                <div className="flex flex-col gap-2 px-2 mt-3">
                  {dataa?.map((d, i) => (
                    <a
                      href={`https://grovyo.com/main/feed/newForYou?id=${d?.p?._id}`}
                      target="_blank"
                      key={i}
                      onClick={addSearchCom}
                      className="flex flex-row items-center py-1 bg-[#f7f7f7] rounded-lg dark:bg-[#0D0D0D] px-3 justify-between"
                    >
                      <div className="flex justify-center items-center">
                        <div className="h-[45px] w-[45px]">
                          <img
                            src={d?.dps}
                            className="w-full h-full object-cover bg-[#fff] rounded-[20px]"
                          />
                        </div>
                        <div className="px-2 py-2 :text-white text-black dark:text-white text-[14px] font-bold ">
                          <div className="flex items-center gap-1">
                            <div>{d?.p?.title}</div>

                            {d?.p?.isverified && (
                              <div>
                                <MdVerified className="text-blue-600" />
                              </div>
                            )}
                          </div>
                          <div className="text-[11px] dark:text-white">
                            {d?.p?.memberscount}{" "}
                            {Number(d?.p?.memberscount) > 1
                              ? "members"
                              : "member"}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm underline">view</div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div
              className={`p-2 mt-4 flex flex-col gap-5 overflow-y-scroll ${styles.customScrollbar}`}
            >
              <div>
                <div className="dark:bg-[#171717] bg-[#f1f1f1] rounded-xl flex justify-between items-center p-2 px-4">
                  <div className="font-semibold">
                    Recent Community Searches{" "}
                    <span className="text-[#5585FF]">
                      ({recentSearchCom?.length})
                    </span>
                  </div>
                  <div className="text-sm underline text-[#555555]">
                    view all
                  </div>
                </div>
                <div className="flex flex-col gap-2 px-2 mt-3">
                  {recentSearchCom?.map((d, i) => (
                    <div
                      key={i}
                      className="flex flex-row items-center py-1 bg-[#f7f7f7] rounded-lg dark:bg-[#0D0D0D] px-3 justify-between"
                    >
                      <a
                        href={`https://grovyo.com/main/feed/newForYou?id=${d?.id}`}
                        target="_blank"
                        className="flex justify-center items-center"
                      >
                        <div className="h-[45px] w-[45px]">
                          <img
                            src={d?.dp}
                            className="w-full h-full object-cover bg-[#fff] rounded-[20px]"
                          />
                        </div>
                        <div className="px-2 py-2 :text-white text-black dark:text-white text-[14px] font-bold ">
                          <div className="flex items-center gap-1">
                            <div>{d?.title}</div>

                            {d?.isverified && (
                              <div>
                                <MdVerified className="text-blue-600" />
                              </div>
                            )}
                          </div>
                          <div className="text-[11px] dark:text-white">
                            {d?.memberscount}{" "}
                            {Number(d?.memberscount) > 1 ? "members" : "member"}
                          </div>
                        </div>
                      </a>
                      <div>
                        <RxCross2 onClick={() => removeSearchCom(d?.id)} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
});

export default Search;
