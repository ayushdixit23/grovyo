"use client";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/app/(utitlies)/utils/AuthWrapper";
import { useSocketContext } from "@/app/(utitlies)/utils/SocketWrapper";
import { useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";
import { useDispatch, useSelector } from "react-redux";
import { API } from "@/Essentials";
import axios from "axios";
import { setFeed } from "../redux/slice/comFeed";
import VirtualizedCommunity from "./VirtualizedCommunity";
import { setHide } from "../redux/slice/remember";

function CommunityFetch() {
  const { data } = useAuthContext();
  const { socket } = useSocketContext();
  const [shareValue, setShareValue] = useState("");
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [isMobile, setIsMobile] = useState(false);
  const [share, setShare] = useState(false);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  const feed = useSelector((state) => state.comFeed.feed);
  const dispatch = useDispatch();

  const comfetchfeed = async () => {
    try {
      const res = await axios.get(`${API}/chats/joinedcomnews3/${data?.id}`);

      dispatch(setFeed(res.data?.mergedData));
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId, liked) => {
    console.log(postId, "hj");
    try {
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
        // if (liked) {
        //   const newwfeed = feed.map((d) =>
        //     d?.posts._id === postId ? { ...d, liked: false, posts: { ...d.posts, likes: Number(d?.posts?.likes) - 1 } } : d
        //   );
        //   dispatch(setFeed(newwfeed);
        // } else {
        //   const newwfeed = feed.map((d) =>
        //     d?.posts._id === postId ? { ...d, liked: true, posts: { ...d.posts, likes: Number(d?.posts?.likes) + 1 } } : d
        //   );
        //   dispatch(setFeed(newwfeed);
        // }

        const newFeed = feed.map((d) => {
          if (d.posts[0]?._id === postId) {
            const newLikes = liked
              ? Number(d.posts[0].likes) - 1
              : Number(d.posts[0].likes) + 1;
            return {
              ...d,
              liked: !liked,
              posts: [
                {
                  ...d.posts[0],
                  likes: newLikes,
                },
              ],
            };
          }
          return d;
        });
        dispatch(setFeed(newFeed));
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

  useEffect(() => {
    if (data?.id && (!feed || feed.length === 0)) {
      comfetchfeed();
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

      <div className="w-full h-full">
        <div className=" w-full rounded-xl my-[4px] px-2">
          <div className="bg-[#151315] bg-com-image bg-cover bg-center w-full rounded-2xl p-2 text-white text-center h-[160px] flex flex-col justify-evenly items-center">
            <div className="font-semibold">Don't have a community ?</div>
            <div className="text-[12px] w-[85%]">
              Create your own community and invite your friends and people
            </div>
            <a
              target="_blank"
              href={`https://workspace.grovyo.com/aybdhw?zyxxpht=${data?.id}&path=/main/community/createCommunity`}
              className="bg-white text-[12px] text-black mt-2 p-2 rounded-xl"
            >
              Create now
            </a>
          </div>
        </div>
        <VirtualizedCommunity
          feed={feed}
          loading={loading}
          handleLike={handleLike}
          isMobile={isMobile}
          setHide={setHide}
          dispatch={dispatch}
          theme={theme}
        />
      </div>
    </>
  );
}

export default CommunityFetch;
