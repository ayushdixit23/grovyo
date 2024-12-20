"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAuthContext } from "@/app/(utitlies)/utils/AuthWrapper";
import {
  socketemitfunc,
  useSocketContext,
} from "@/app/(utitlies)/utils/SocketWrapper";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "next-themes";
import axios from "axios";
import { API } from "@/Essentials";
import VirtualizedFeed from "./VirtualizedFeed";
import { setHide } from "../redux/slice/remember";
import { setFeed } from "../redux/slice/feedData";

export default function NewforfetchComponent() {
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
      const res = await axios.get(`${API}/v1/getfeed/${data?.id}`);
      if (res.data.success) {
        dispatch(setFeed(res.data?.mergedData));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const joinmembers = async (comId, i) => {
    try {
      const res = await axios.post(`${API}/joincom/${data?.id}/${comId}`);
      if (res.data.success) {
        const newwfeed = feed.map((d) => {
          // Check if the community ID matches
          if (d?.posts?.community._id === comId) {
            console.log("first", d?.posts?.community._id === comId);
            return { ...d, subs: "subscribed" };
          }
          return d;
        });

        dispatch(setFeed(newwfeed));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const unjoinmembers = async (comId) => {
    try {
      const res = await axios.post(`${API}/unjoin/${data?.id}/${comId}`);
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

  const loadmoreData = async () => {
    try {
      const res = await axios.get(`${API}/v1/fetchmore/${data?.id}`);
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
      await axios.post(`${API}/likepost/${data?.id}/${postId}`);

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
      <div className="h-full w-full ">
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
    </>
  );
}
