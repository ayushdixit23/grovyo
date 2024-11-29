import { List, AutoSizer, InfiniteLoader } from "react-virtualized";
import ImageComponent from "./ImageComponent";
import Link from "next/link";
import liked from "@/app/assets/liked.png";
import lightunlike from "@/app/assets/lightunlike.png";
import darkunlike from "@/app/assets/darkunlike.png";
import styles from "@/app/CustomScrollbarComponent.module.css";
import { formatDate } from "@/app/(utitlies)/utils/useful";
import { VscSend } from "react-icons/vsc";
import "react-virtualized/styles.css"; // Import default styles for react-virtualized
import VideoPlayer from "./VideoPlayer";
import Image from "next/image";
import PostLoading from "./PostLoading";
import Loader from "./Loader";
import { MdVerified } from "react-icons/md";

const VirtualizedFeed = ({
  feed,
  setShareValue,
  dispatch,
  loadmoreData,
  loading,
  handleLike,
  setHide,
  isMobile,
  unjoinmembers,
  setShare,
  joinmembers,
  theme,
}) => {
  const rowRenderer = ({ index, key, style }) => {
    const d = feed[index];
    return (
      <>
        {d?.posts?.kind === "ad" ? (
          <div className="bg-white dark:bg-[#0d0d0d] pn:max-sm:mt-[120px] pt-9 pn:max-md:rounded-2xl ">
            <div className="w-[100%] bg-white dark:bg-graydark flex px-1 justify-between items-center ">
              <div className="h-[55px] pn:max-sm:h-[50px] flex flex-row items-center ">
                <div className=" flex object-scale-down items-center h-[100%] ">
                  <img
                    src={d?.dps}
                    loading="lazy"
                    className="h-[35px] w-[35px] pn:max-sm:w-[30px] pn:max-sm:h-[30px] pn:max-sm:rounded-[13px] rounded-[15px] ring-1 ring-white bg-yellow-300 "
                  />
                </div>

                <div className="flex flex-col justify-center px-2 items-start">
                  <div className="flex flex-col space-y-[0.5px] justify-start items-start">
                    <div className="text-[14px] dark:text-[#f5f5f5] pn:max-sm:text-[12px] font-semibold">
                      {d?.posts?.community?.title}
                    </div>
                    <div className="flex">
                      <div className="text-[10px] dark:text-[#f5f5f5] pn:max-sm:text-[10px] font-medium text-[#5C5C5C]">
                        By {d?.posts?.sender?.fullname}
                      </div>
                      <div className="text-[10px] dark:text-[#f5f5f5] font-bold text-[#5C5C5C]">
                        . Sponsored
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {d?.subs === "unsubscribed" ? (
                <div
                  onClick={() => joinmembers(d?.posts?.community._id)}
                  className="bg-[#f5f5f5] dark:text-[#f5f5f5] dark:bg-graydark
                   p-2 px-4 rounded-xl text-[12px] font-medium text-[#5c5c5c]"
                >
                  Join
                </div>
              ) : (
                <div
                  onClick={() => unjoinmembers(d?.posts?.community._id)}
                  className="rounded-xl dark:text-[#f5f5f5] text-[14px] text-[#5c5c5c]"
                ></div>
              )}
            </div>

            <div className="">
              <div className="bg-[#f4f4f4] dark:bg-graydark rounded-xl w-full flex flex-col px-2 ">
                <>
                  {d?.urls.length > 1 ? (
                    <>
                      {d?.urls.map((f) => (
                        <div className="sm:h-[260px] h-[300px] w-full rounded-xl ">
                          {f?.type.startsWith("image") ? (
                            <div className="h-full w-full">
                              <img
                                src={f?.content}
                                loading="lazy"
                                className="h-full object-contain bg-black rounded-t-xl w-full"
                              />
                            </div>
                          ) : (
                            <VideoPlayer
                              key={i}
                              src={f?.content}
                              poster={f?.thumbnail}
                              width={"100%"}
                              height={"h-full"}
                            />
                          )}
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      <div className="sm:h-[260px] h-[300px] w-full rounded-xl ">
                        {d?.urls[0]?.type.startsWith("image") ? (
                          <div className="h-full w-full ">
                            <img
                              src={d?.urls[0]?.content}
                              loading="lazy"
                              className="h-full object-contain bg-black rounded-t-xl w-full"
                            />
                          </div>
                        ) : (
                          <VideoPlayer
                            key={i}
                            poster={d?.urls[0]?.thumbnail}
                            src={d?.urls[0]?.content}
                            width={"100%"}
                            height={"h-full"}
                          />
                        )}
                      </div>
                    </>
                  )}
                </>

                <div className="flex justify-start w-full rounded-b-xl text-sm  bg-blue-700 animate-pulse text-white p-2 px-3 items-center">
                  <a
                    href={d?.posts?.ctalink}
                    target="_blank"
                    className="flex w-full  cursor-pointer items-center gap-2"
                  >
                    <div>{d?.posts?.cta}</div>
                    <div>
                      <GoArrowRight />
                    </div>
                  </a>
                </div>
                <div className="h-[45px] mt-2 sm:h-[55px] w-[100%] flex flex-col">
                  <div className="text-[10px] dark:text-[#b6b0b0] pn:max-sm:text-[10px] text-black w-[100%] font-bold px-1">
                    {d?.posts.title}
                  </div>
                  <div className="text-[10px] dark:text-[#b6b0b0] truncate pn:max-sm:text-[10px] text-black w-[100%] font-medium px-1">
                    {d?.posts?.desc}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full border-b-[0.5px] pt-1"></div>
          </div>
        ) : (
          <div
            key={key}
            style={style}
            className={`px-2 sm:my-2  pn:max-sm:pb-20 ${styles.customScrollbar} w-full bg-white dark:bg-graydark `}
          >
            <div className="bg-slate-50 dark:bg-transparent pn:max-md:rounded-2xl">
              <Link
                onClick={() => {
                  if (isMobile) {
                    dispatch(setHide(true));
                  }
                }}
                href={`/main/feed/newForYou?id=${d?.posts?.community?._id}`}
                className="w-[100%] bg-white dark:bg-transparent flex px-1 justify-between items-center"
              >
                <div className="h-[55px] pn:max-sm:h-[50px] flex flex-row items-center">
                  <ImageComponent
                    src={d?.dps}
                    alt={d?.posts?.community?.title}
                    borderRadius={"pn:max-sm:rounded-[13px] rounded-[15px]"}
                    width="w-[35px] pn:max-sm:w-[30px]"
                    height="h-[35px] pn:max-sm:h-[30px]"
                  />
                  <div className="flex flex-col justify-center  px-2 items-start">
                    <div className="flex flex-col space-y-[0.5px] justify-start items-start">
                      <div className="flex gap-1 items-center">
                        <div className="text-[14px] dark:text-[#f5f5f5] pn:max-sm:text-[12px] font-semibold">
                          {d?.posts?.community?.title}
                        </div>
                        {d?.posts?.community?.isverified && (
                          <div>
                            <MdVerified className="text-blue-600" />
                          </div>
                        )}
                      </div>
                      <div className="flex">
                        <div className="text-[10px] dark:text-[#f5f5f5] pn:max-sm:text-[10px] font-medium text-[#5C5C5C]">
                          By {d?.posts?.sender?.fullname}
                        </div>
                        <div className="text-[10px] dark:text-[#f5f5f5]  font-medium text-[#5C5C5C]">
                          . {formatDate(d?.posts?.createdAt)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {d?.subs === "unsubscribed" ? (
                  <div
                    onClick={() => joinmembers(d?.posts?.community._id, index)}
                    className="bg-[#f5f5f5] dark:bg-selectdark dark:text-[#fff]  p-2 px-4 rounded-xl text-[12px] font-medium text-[#5c5c5c]"
                  >
                    Join
                  </div>
                ) : (
                  <div
                    onClick={() =>
                      unjoinmembers(d?.posts?.community._id, index)
                    }
                    className="rounded-xl dark:bg-selectlight dark:text-[#2f2f2f] text-[14px] text-[#5c5c5c]"
                  ></div>
                )}
              </Link>

              <Link
                onClick={() => {
                  if (isMobile) {
                    dispatch(setHide(true));
                  }
                }}
                href={`/main/feed/newForYou?id=${d?.posts?.community?._id}`}
                className=""
              >
                <div
                  className={`bg-[#f4f4f4] dark:bg-[#121212] rounded-xl w-full ${
                    d?.urls.length > 1 ? "overflow-x-scroll no-scrollbar" : null
                  } flex flex-col justify-center items-center `}
                >
                  <div className="flex w-full ">
                    {d?.urls.length > 1 ? (
                      <>
                        {d?.urls.map((f, i) => (
                          <div className="sm:h-[260px] flex lg:min-w-[360px] h-[300px] w-full rounded-xl ">
                            {f?.type.startsWith("image") ? (
                              <div className="h-full w-full relative p-1">
                                <img
                                  src={f?.content}
                                  loading="lazy"
                                  className="h-full object-contain bg-black rounded-2xl w-full"
                                />
                                <div className="absolute top-3 right-2">
                                  <div className="w-9  h-9 flex justify-center items-center text-sm font-medium dark:bg-graydark bg-white text-black rounded-full">
                                    {i + 1}/{d?.urls.length}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="p-1 h-full ">
                                <div className=" rounded-2xl relative h-full overflow-hidden">
                                  <div className="absolute z-10 h-[300px] sm:h-[260px] w-full"></div>
                                  <VideoPlayer
                                    key={key}
                                    src={f?.content}
                                    width={"100%"}
                                    height={"h-full"}
                                  />
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
                        {d?.urls[0]?.type.startsWith("image") ? (
                          <div className="h-full w-full p-1">
                            <img
                              loading="lazy"
                              src={d?.urls[0]?.content}
                              className="h-full object-contain bg-black rounded-2xl w-full"
                            />
                          </div>
                        ) : (
                          <div className="p-1 h-full">
                            <div className=" rounded-2xl h-full overflow-hidden relative ">
                              <div className="absolute z-10 h-[300px] sm:h-[260px] w-full"></div>
                              <VideoPlayer
                                key={key}
                                src={d?.urls[0]?.content}
                                width={"100%"}
                                height={"h-full"}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="h-[20px] sm:h-[32px] px-2 w-[100%] flex flex-col">
                    <div className="text-[14px] pn:max-sm:text-[12px] dark:text-[#f5f5f5] text-black w-[100%] font-medium text-ellipsis overflow-hidden py-1">
                      {d?.posts.title?.length > 20
                        ? `${d?.posts?.title?.slice(0, 30)}...`
                        : d?.posts?.title}
                    </div>
                  </div>
                </div>
              </Link>

              <div className="px-2 w-full py-2 flex justify-between items-center">
                <Link
                  onClick={() => {
                    if (isMobile) {
                      dispatch(setHide(true));
                    }
                  }}
                  href={`/main/feed/newForYou?id=${d?.posts?.community?._id}`}
                  className="flex flex-row gap-2 items-center  w-[100%]"
                >
                  <div className="flex flex-row justify-start mt-1 z-0">
                    <div className="h-[20px] w-[20px] rounded-lg z-30 ">
                      <img
                        src={d?.memdps[0]}
                        className="w-full h-full object-cover rounded-2xl  "
                        onContextMenu={(e) => e.preventDefault()}
                      />
                    </div>
                    <div className="h-[20px] w-[20px] rounded-lg z-20 -ml-[10px]">
                      {" "}
                      <img
                        src={d?.memdps[1]}
                        className="w-full h-full object-cover rounded-2xl  "
                        onContextMenu={(e) => e.preventDefault()}
                      />
                    </div>
                    <div className="h-[20px] w-[20px] rounded-lg z-10 -ml-[10px]">
                      <img
                        src={d?.memdps[2]}
                        className="w-full h-full object-cover rounded-2xl  "
                        onContextMenu={(e) => e.preventDefault()}
                      />
                    </div>
                    <div className="h-[20px] w-[20px] rounded-lg z-0 -ml-[10px]">
                      {" "}
                      <img
                        src={d?.memdps[3]}
                        className="w-full h-full object-cover rounded-2xl"
                        onContextMenu={(e) => e.preventDefault()}
                      />
                    </div>
                  </div>
                  <div className="text-[12px] self-center mt-1 font-medium">
                    {d?.posts?.community?.memberscount}{" "}
                    <span>
                      {d?.posts?.community?.memberscount > 1
                        ? "Members"
                        : "Member"}
                    </span>
                  </div>
                </Link>
                <div className="flex gap-2 items-center">
                  <div
                    onClick={() => handleLike(d?.posts?._id, d?.liked)}
                    className={`dark:bg-graydark cursor-pointer flex justify-center rounded-xl ${
                      d?.liked ? "dark:text-white " : ""
                    } items-center border w-full dark:border-[#1A1D21] gap-1.5 p-2 px-4`}
                  >
                    {d?.liked ? (
                      <Image src={liked} className="w-[23px] " />
                    ) : theme == "dark" ? (
                      <Image src={darkunlike} className="w-[23px] " />
                    ) : (
                      <Image src={lightunlike} className="w-[23px] " />
                    )}
                    <div className="text-[12px]">{d?.posts?.likes}</div>
                  </div>

                  <div
                    onClick={() => {
                      setShareValue(
                        `https://grovyo.com/main/feed/newForYou?id=${d?.posts?.community?._id}#${d?.posts?._id}`
                      );
                      setShare(true);
                    }}
                    className="rounded-xl bg-[#f4f4f4] flex justify-center items-center border dark:border-[#1A1D21] dark:bg-bluedark p-2"
                  >
                    <VscSend />
                  </div>
                </div>
              </div>
              <div className="w-full border-b-[0.5px] "></div>
            </div>
          </div>
        )}
      </>
    );
  };

  const isRowLoaded = ({ index }) => {
    return !!feed[index];
  };

  const loadMoreRows = async () => {
    await loadmoreData();
  };

  if (loading) {
    return <PostLoading />;
  }

  return (
    <div className={`${styles.customScrollbar}  h-full`}>
      {loading ? (
        <PostLoading />
      ) : (
        <InfiniteLoader
          isRowLoaded={isRowLoaded}
          loadMoreRows={loadMoreRows}
          rowCount={feed.length + 3}
          threshold={5}
        >
          {(
            { onRowsRendered, registerChild } // Fix for InfiniteLoader
          ) => (
            <AutoSizer>
              {({ height, width }) => (
                <List
                  height={height}
                  rowCount={feed.length}
                  className="virtualized-list"
                  rowHeight={
                    ({ index }) =>
                      index === feed.length ? 80 : isMobile ? 430 : 400 // Dynamic height for loader row
                  }
                  rowRenderer={({ index, key, style }) => {
                    if (index === feed.length) {
                      // Render loader for the last row
                      return (
                        <div
                          key={key}
                          style={style}
                          className="flex justify-center items-center h-full w-full"
                        >
                          <Loader height="h-[80px]" />
                        </div>
                      );
                    }

                    return rowRenderer({ index, key, style });
                  }}
                  width={width}
                  onRowsRendered={onRowsRendered}
                  ref={registerChild}
                />
              )}
            </AutoSizer>
          )}
        </InfiniteLoader>
      )}
    </div>
  );
};

export default VirtualizedFeed;
