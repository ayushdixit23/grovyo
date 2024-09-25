"use client";
// import Empty from "../../../assets/Images/community.png";
import { useAuthContext } from "../../../utils/AuthWrapper";
import { useEffect, useState } from "react";
import axios from "axios";
import { GoArrowRight } from "react-icons/go";
import { API } from "../../../../Essentials";
import Link from "next/link";
import styles from "../../../CustomScrollbarComponent.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { formatDate } from "../../../utils/useful";
import { VscSend } from "react-icons/vsc";
import { socketemitfunc, useSocketContext } from "../../../utils/SocketWrapper";
import toast from "react-hot-toast";
import VideoPlayer from "@/app/component/VideoPlayer";
import Newforyou from "@/app/component/Newforyou";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setHide } from "@/app/redux/slice/remember";
import ImageComponent from "@/app/component/ImageComponent";
import Image from "next/image";

import liked from "../../../assets/liked.png";
import lightunlike from "../../../assets/lightunlike.png";
import darkunlike from "../../../assets/darkunlike.png";
import { useTheme } from "next-themes";
import PostLoading from "@/app/component/PostLoading";
import { setFeed } from "@/app/redux/slice/feedData";
import EmptyCommunity from "@/app/component/EmptyCommunity";
import VirtualizedFeed from "@/app/component/VirtualizedFeed";
//import { PauseIcon, PlayIcon } from '@vidstack/react/icons';

export default function NewforyouLayout() {
  const { data } = useAuthContext();
  const { socket } = useSocketContext();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const dispatch = useDispatch();
  const [shareValue, setShareValue] = useState("");
  const [share, setShare] = useState(false);
  const feed = useSelector((state) => state.feedData.feed);
  const [isMobile, setIsMobile] = useState(false);
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialWidth = window.innerWidth;
    if (initialWidth > 821) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const initialWidth = window.innerWidth;
      if (initialWidth > 821) {
        setIsMobile(false);
      } else {
        setIsMobile(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // optimized
  const fetchfeed = async () => {
    try {
      const res = await axios.get(`${API}/post/v1/getfeed/${data?.id}`);
      if (res.data.success) {
        dispatch(setFeed(res.data?.mergedData));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const joinmembers = async (comId, i) => {
    try {
      const res = await axios.post(`${API}/chats/joincom/${data?.id}/${comId}`);
      if (res.data.success) {
        const newwfeed = feed.map((d) =>
          d?.posts?.community._id === comId ? { ...d, subs: "subscribed" } : d
        );
        dispatch(setFeed(newwfeed));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const unjoinmembers = async (comId) => {
    try {
      const res = await axios.post(`${API}/chats/unjoin/${data?.id}/${comId}`);
      if (res.data.success) {
        const newwfeed = feed.map((d) =>
          d?.posts?.community._id === comId ? { ...d, subs: "unsubscribed" } : d
        );
        dispatch(setFeed(newwfeed));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // optimized
  const loadmoreData = async () => {
    try {
      const res = await axios.post(`${API}/post/fetchmore/${data?.id}`, {
        fetchAds: { adIds: [] },
      });
      if (res.data.success) {
        dispatch(setFeed([...feed, ...res.data.mergedData]));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Like function
  const handleLike = async (postId, liked) => {
    try {
      // setLike(true);
      const randomNumber = Math.floor(Math.random() * (500 - 100 + 1)) + 100;
      socketemitfunc({
        event: "adviews",
        data: {
          postId: postId,
          imp: randomNumber,
          click: 1,
          userId: data?.id,
          inside: false,
        },
        socket,
      });
      const res = await axios.post(
        `${API}/post/likepost/${data?.id}/${postId}`
      );
      if (res.data.success) {
        if (liked) {
          const newwfeed = feed.map((d) =>
            d?.posts._id === postId
              ? {
                  ...d,
                  liked: false,
                  posts: { ...d.posts, likes: Number(d?.posts?.likes) - 1 },
                }
              : d
          );
          dispatch(setFeed(newwfeed));
        } else {
          const newwfeed = feed.map((d) =>
            d?.posts._id === postId
              ? {
                  ...d,
                  liked: true,
                  posts: { ...d.posts, likes: Number(d?.posts?.likes) + 1 },
                }
              : d
          );
          dispatch(setFeed(newwfeed));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(shareValue).then(() => {
      toast.success("Copied!");
    });
  };

  useEffect(() => {
    if (data?.id && (!feed || feed.length === 0)) {
      fetchfeed();
    }

    if (feed && feed.length > 0 && loading) {
      setLoading(false);
    }
  }, [data, feed]);

  useEffect(() => {
    if (!searchParams.get("id") || !isMobile) {
      dispatch(setHide(false));
    }
  }, [searchParams, id, isMobile]);

  useEffect(() => {
    if (id && isMobile) {
      dispatch(setHide(true));
    }
  }, [searchParams, id, isMobile]);

  return (
    <>
      {share && (
        <div
          id="course-modal"
          tabindex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 bg-black/70 flex justify-center items-center w-screen md:inset-0 h-screen max-h-full"
        >
          <div className="relative p-4 flex justify-center items-center w-full max-w-lg max-h-full">
            <div className="relative bg-white dark:bg-[#0d0d0d] rounded-lg shadow ">
              <div className="flex items-center justify-between p-4 md:p-5">
                <h3 className="text-lg text-gray-500 dark:text-white ">
                  Share Post
                </h3>
                <button
                  type="button"
                  onClick={() => setShare(false)}
                  className="text-gray-400 hover:dark:bg-gray-400   hover:bg-gray-200
									 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center "
                  data-modal-toggle="course-modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="px-4 pb-4 md:px-5 md:pb-5">
                <label
                  for="post-url"
                  className="text-sm font-medium dark:text-slate-300 text-gray-900 mb-2 block"
                >
                  Share the Post link below with your friends:
                </label>
                <div
                  className="flex justify-center dark:bg-bluelight  items-center
								  border rounded-lg bg-transparent border-gray-300 text-gray-500 mb-4"
                >
                  <input
                    id="post-url"
                    type="text"
                    className="col-span-6 dark:bg-bluelight rounded-lg  text-sm  block w-full p-2.5  dark:text-selectdark "
                    value={shareValue}
                    disabled
                    readonly
                  />
                  <button
                    onClick={handleCopyToClipboard}
                    data-copy-to-clipboard-target="course-url"
                    data-tooltip-target="tooltip-course-url"
                    className=" p-2 inline-flex items-center justify-center "
                  >
                    <span id="default-icon-course-url">
                      <svg
                        className="w-3.5 h-3.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 18 20"
                      >
                        <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                      </svg>
                    </span>
                    <span
                      id="success-icon-course-url"
                      className="hidden inline-flex items-center"
                    >
                      <svg
                        className="w-3.5 h-3.5 text-blue-700"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 16 12"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 5.917 5.724 10.5 15 1.5"
                        />
                      </svg>
                    </span>
                  </button>
                  <div
                    id="tooltip-course-url"
                    role="tooltip"
                    className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium
										 text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip "
                  >
                    <span id="default-tooltip-message-course-url">
                      Copy to clipboard
                    </span>
                    <span
                      id="success-tooltip-message-course-url"
                      className="hidden"
                    >
                      Copied!
                    </span>
                    <div className="tooltip-arrow" data-popper-arrow></div>
                  </div>
                </div>
                {/* <button type="button" data-modal-hide="course-modal" className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Close</button> */}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="w-[100%] h-[100vh] bg-white dark:bg-[#0D0D0D] flex flex-col sm:flex-row pn:max-md:justify-center ">
        <div
          className={`${
            id && isMobile
              ? "hidden"
              : " pn:max-md:h-[96vh] lg:w-[27%] md:w-[32%] sm:w-[37%] h-screen md:overflow-auto scrollbar-hide select-none dark:border:[#273142] flex flex-col w-full items-center md:border-r-2 border-[#f7f7f7] dark:border-[#131619] self-end "
          }`}
        >
          {/* post 1*/}
          <div className="h-[10vh]"></div>

          {/* <div className="md:h-[100vh] h-[10vh]"></div> */}
          <div
            id="scrollableDiv"
            style={{
              height: "92vh",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
            className={`pn:max-sm:w-[calc(100%-8px)] ${styles.customScrollbar}`}
          >
            {/*Put the scroll bar always on the bottom*/}
            <VirtualizedFeed
              feed={feed}
              setShareValue={setShareValue}
              dispatch={dispatch}
              loadmoreData={loadmoreData}
              handleLike={handleLike}
              setHide={setHide}
              loading={loading}
              isMobile={isMobile}
              unjoinmembers={unjoinmembers}
              setShare={setShare}
              joinmembers={joinmembers}
              theme={theme}
            />
          </div>
        </div>

        {/* <div className="lg:w-[73%] md:w-[68%] sm:w-[63%] pn:max-sm:hidden"> {children}</div> */}
        {id && (
          <div className="lg:w-[73%] md:w-[68%] sm:w-[63%] ">
            <Newforyou id={id} />
          </div>
        )}
        {!id && (
          <div className="lg:w-[73%] md:w-[68%] sm:w-[63%]">
            <EmptyCommunity />
          </div>
        )}
      </div>
    </>
  );
}
