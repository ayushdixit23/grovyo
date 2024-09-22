"use client";
import { useAuthContext } from "../../../utils/AuthWrapper";
import { Suspense, useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../../../Essentials";
import Link from "next/link";
import styles from "../../../CustomScrollbarComponent.module.css";
import { VscSend } from "react-icons/vsc";
import { socketemitfunc, useSocketContext } from "../../../utils/SocketWrapper";
import toast from "react-hot-toast";
import VideoPlayer from "@/app/component/VideoPlayer";
import { useRouter, useSearchParams } from "next/navigation";
import CommunityFeed from "@/app/component/CommunityFeed";
import { setHide } from "@/app/redux/slice/remember";
import { useDispatch, useSelector } from "react-redux";
import ImageComponent from "@/app/component/ImageComponent";
import Image from "next/image";
import liked from "../../../assets/liked.png";
import lightunlike from "../../../assets/lightunlike.png";
import darkunlike from "../../../assets/darkunlike.png";
import { useTheme } from "next-themes";
import PostLoading from "@/app/component/PostLoading";
import { setFeed } from "@/app/redux/slice/comFeed";
import Loader from "@/app/component/Loader";
import EmptyCommunity from "@/app/component/EmptyCommunity";

function page() {
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

      {/*if no data*/}
      <div className="w-[100%] h-screen bg-white dark:bg-graydark flex flex-col sm:flex-row pn:max-md:justify-center ">
        <div
          className={`${
            id && isMobile
              ? "hidden"
              : "select-none lg:w-[27%] md:w-[32%] sm:w-[37%] flex flex-col items-center md:border-r-2 border-[#f7f7f7] dark:border-[#131619] self-end"
          } `}
        >
          {/* <div className="h-[100vh] pn:max-sm:h-[16vh]"></div> */}
          <div className="h-[10vh] pn:max-sm:h-[16vh]"></div>

          <div
            className={`h-[92vh] pn:max-sm:h-[87vh] w-full ${styles.customScrollbar} overflow-auto `}
          >
            {/* mt-[125px] */}

            {/* post 1*/}
            <div className=" w-full mt-[25px] rounded-xl mb-[4px] px-2">
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
            <>
              {loading ? (
                <>
                  <PostLoading />
                </>
              ) : (
                <>
                  {feed.map((d, i) => (
                    <div
                      key={i}
                      className={`pn:max-md:rounded-2xl w-full px-2`}
                    >
                      <Link
                        onClick={() => {
                          if (isMobile) {
                            dispatch(setHide(true));
                          }
                        }}
                        href={`/main/feed/community?id=${d?.community?._id}`}
                        className="w-[100%] bg-white dark:bg-graydark flex px-1 justify-between items-center "
                      >
                        <div className="h-[55px] pn:max-sm:h-[50px] flex flex-row items-center ">
                          {/* <div className=" flex object-scale-down items-center ">
                              <img
                                src={d?.dps}
                                className="h-[35px] w-[35px] dark:ring-[#273142] pn:max-sm:w-[30px] pn:max-sm:h-[30px] 
													pn:max-sm:rounded-[13px] rounded-[15px] ring-1 ring-white bg-white dark:bg-graydark "
                              />
                            </div> */}

                          <ImageComponent
                            src={d?.dps}
                            width="w-[35px] pn:max-sm:w-[30px]"
                            borderRadius="pn:max-sm:rounded-[13px] rounded-[15px]"
                            height="h-[35px] pn:max-sm:h-[30px] "
                          />

                          {/* Community name */}
                          <div className="flex flex-col justify-center px-2 items-start ">
                            <div className="flex flex-col space-y-[0.5px] justify-start items-start">
                              <div className="text-[14px] dark:text-[#f5f5f5] pn:max-sm:text-[12px] font-semibold">
                                {d?.community?.title}
                              </div>
                              <div className="flex">
                                <div className="text-[10px] dark:text-[#f5f5f5] pn:max-sm:text-[10px] font-medium text-[#5C5C5C]">
                                  By {d?.community?.creator?.fullname}
                                </div>
                                <div className="dark:text-[#f5f5f5] text-[10px] font-medium text-[#5C5C5C]">
                                  {/* . {formatDate(d?.posts?.createdAt)} */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Animation of join nd bell */}
                        {/* {d?.subs === "unsubscribed" ? (
                     
                      ) : (
                        <div
                          onClick={() => unjoinmembers(d?.posts?.community._id)}
                          className="  rounded-xl text-[14px] text-[#5c5c5c]"
                        ></div>
                      )} */}
                        {/* <div className="bg-[#f5f5f5] p-2 px-4 rounded-xl pn:max-sm:text-[12px] font-medium text-[14px] text-[#5c5c5c]">
                  Join
                </div> */}
                      </Link>

                      {/* POst */}
                      <Link
                        onClick={() => {
                          if (isMobile) {
                            dispatch(setHide(true));
                          }
                        }}
                        href={`/main/feed/community?id=${d?.community?._id}`}
                      >
                        <div
                          className={`bg-[#f4f4f4]  dark:bg-graydark rounded-xl ${
                            d?.urls.length > 1
                              ? "overflow-x-scroll no-scrollbar"
                              : null
                          } flex flex-col justify-center items-center `}
                        >
                          <div className="flex w-full">
                            {d?.urls.length > 1 ? (
                              <>
                                {d?.urls.map((f, i) => (
                                  <div className="sm:h-[260px] flex min-w-full lg:min-w-[360px] h-[300px] w-full rounded-xl ">
                                    {f?.type.startsWith("image") ? (
                                      <div className="h-full w-full relative p-1">
                                        <img
                                          src={f?.content}
                                          className="h-full object-contain bg-black rounded-2xl w-full"
                                        />
                                        <div className="absolute top-3 right-2">
                                          <div className="w-9  h-9 flex justify-center items-center text-sm font-medium dark:bg-graydark bg-white text-black rounded-full">
                                            {i + 1}/{d?.urls.length}
                                          </div>
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="p-1 h-full">
                                        <div className=" rounded-2xl relative h-full overflow-hidden">
                                          <div className="absolute z-10 h-[300px] sm:h-[260px] w-full"></div>

                                          <VideoPlayer
                                            key={i}
                                            src={f?.content}
                                            poster={f?.thumbnail}
                                            width={"100%"}
                                            height={"h-full"}
                                          />

                                          {/* <video controls src={f?.content}></video> */}
                                          <div className="absolute top-3 right-2">
                                            <div
                                              className="w-9 flex justify-center items-center text-sm font-medium h-9 
                                                 text-black rounded-full"
                                            >
                                              {i + 1}/{d?.urls.length}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </>
                            ) : (
                              <div className="sm:h-[260px] h-[300px] w-full rounded-xl ">
                                {
                                  d?.urls[0]?.type.startsWith("image") ? (
                                    <div className="h-full w-full p-1">
                                      <img
                                        src={d?.urls[0]?.content}
                                        className="h-full object-contain bg-black rounded-2xl w-full"
                                      />
                                    </div>
                                  ) : (
                                    <div className="p-1 h-full">
                                      <div className=" rounded-2xl h-full overflow-hidden relative ">
                                        <div className="absolute z-10 h-[300px] sm:h-[260px] w-full"></div>

                                        {/* <MediaPlayer
                                            src={d?.urls[0]?.content}
                                            onQualitiesChange={480}
                                            className=" z-0 h-[300px] sm:h-[260px]"
                                          >
                                            <MediaProvider />
                                            <DefaultVideoLayout
                                              thumbnails={d?.urls[0]?.content}
                                              icons={defaultLayoutIcons}
                                            />
                                          </MediaPlayer> */}
                                        <VideoPlayer
                                          key={i}
                                          src={d?.urls[0]?.content}
                                          poster={d?.urls[0]?.thumbnail}
                                          width={"100%"}
                                          height={"h-full"}
                                        />

                                        {/* <video controls src={d?.urls[0]?.content}></video> */}
                                      </div>
                                    </div>
                                  )
                                  // <video src={f?.content} controls className="max-h-full" />
                                }
                              </div>
                            )}
                          </div>

                          <div className="py-1 px-2 w-[100%] flex flex-col">
                            <div className="text-[14px] pn:max-sm:text-[12px] dark:text-[#f5f5f5] text-black w-[100%] font-medium text-ellipsis overflow-hidden px-1">
                              {d?.posts[0]?.title.length > 50
                                ? `${d?.posts[0]?.title.slice(0, 50)}...`
                                : d?.posts[0]?.title}
                            </div>
                          </div>
                        </div>
                      </Link>

                      <div className="px-2 w-full h-[40px] flex justify-between items-center">
                        <div className="flex flex-row gap-2 items-center  w-[100%]">
                          <div className="flex flex-row justify-start mt-1 ">
                            <div className="h-[20px] w-[20px] rounded-lg ">
                              <img
                                src={d?.memdps[0]}
                                className="object-cover rounded-2xl w-full h-full "
                              />
                            </div>
                            <div className="h-[20px] w-[20px] rounded-lg -ml-[10px] ">
                              {" "}
                              <img
                                src={d?.memdps[1]}
                                className="object-cover rounded-2xl w-full h-full "
                              />
                            </div>
                            <div className="h-[20px] w-[20px] rounded-lg  -ml-[10px]  ">
                              {" "}
                              <img
                                src={d?.memdps[2]}
                                className="object-cover rounded-2xl w-full h-full "
                              />
                            </div>
                            <div className="h-[20px] w-[20px] rounded-lg z-0 -ml-[10px] ">
                              {" "}
                              <img
                                src={d?.memdps[3]}
                                className="object-cover rounded-2xl w-full h-full "
                              />
                            </div>
                          </div>
                          <div className="text-[12px] self-center mt-1 font-medium">
                            {d?.posts?.community?.memberscount}
                            <span> Member</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div
                            onClick={() =>
                              handleLike(d?.posts?.[0]?._id, d?.liked)
                            }
                            className={`dark:bg-graydark flex justify-center rounded-xl ${
                              d?.liked ? "dark:text-white " : ""
                            } items-center border w-full dark:border-[#1A1D21] gap-1.5 p-2 px-4`}
                          >
                            {d?.liked ? (
                              <Image src={liked} className="w-[43px] " />
                            ) : theme == "dark" ? (
                              <Image src={darkunlike} className="w-[43px] " />
                            ) : (
                              <Image src={lightunlike} className="w-[43px] " />
                            )}
                            <div className="text-[12px]">
                              {d?.posts[0]?.likes}
                            </div>
                          </div>

                          <div
                            onClick={() => {
                              if (isMobile) {
                                setShareValue(
                                  `https://grovyo.com/main/feed/newForYou?id=${d?.community?._id}#${d?.posts?.[0]?._id}`
                                );
                              } else {
                                setShareValue(
                                  `https://grovyo.com/main/feed/newForYou/${d?.community?._id}#${d?.posts?.[0]?._id}`
                                );
                              }

                              setShare(true);
                            }}
                            className="rounded-xl bg-[#f4f4f4] border dark:border-[#1A1D21] p-2 dark:bg-bluedark "
                          >
                            <VscSend />
                          </div>
                        </div>
                      </div>
                      <div className="w-full border-b-[0.5px] mt-2"></div>
                    </div>
                  ))}
                </>
              )}
            </>
          </div>

          {/* POst */}
        </div>
        {id && (
          <div className="lg:w-[73%] md:w-[68%] sm:w-[63%] ">
            <CommunityFeed id={id} />
          </div>
        )}
        {!id && (
          <div className="lg:w-[73%] md:w-[68%] sm:w-[63%] pn:max-sm:hidden">
            {" "}
            <EmptyCommunity />
          </div>
        )}
      </div>
    </>
  );
}

export default page;
