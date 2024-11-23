import { AutoSizer, List } from "react-virtualized";
import PostLoading from "./PostLoading";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense, lazy, useCallback, useMemo } from "react";
import liked from "@/app/assets/liked.png";
import lightunlike from "@/app/assets/lightunlike.png";
import darkunlike from "@/app/assets/darkunlike.png";
import { VscSend } from "react-icons/vsc";
import { MdVerified } from "react-icons/md";

// Lazy load components
const ImageComponent = lazy(() => import("./ImageComponent"));
const VideoPlayer = lazy(() => import("./VideoPlayer"));

const MyFeedComponent = ({
  feed,
  loading,
  handleLike,
  isMobile,
  setHide,
  dispatch,
  theme,
}) => {
  const rowRenderer = useCallback(
    ({ index, key, style }) => {
      const d = feed[index];

      return (
        <div
          key={d?.posts[0]?._id || key}
          style={style}
          className="pn:max-md:rounded-2xl w-full px-2"
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
            <div className="h-[55px] pn:max-sm:h-[50px]  flex flex-row items-center ">
              <ImageComponent
                src={d?.dps}
                width="w-[35px] pn:max-sm:w-[30px]"
                borderRadius="pn:max-sm:rounded-[13px] rounded-[15px]"
                height="h-[35px] pn:max-sm:h-[30px] "
              />

              <div className="flex flex-col justify-center px-2 items-start ">
                <div className="flex flex-col space-y-[0.5px] justify-start items-start">
                  {/* <div className="text-[14px]  dark:text-[#f5f5f5] pn:max-sm:text-[12px] font-semibold">
                    {d?.community?.title}
                  </div> */}

                  <div className="flex gap-1 items-center">
                    <div className="text-[14px] dark:text-[#f5f5f5] pn:max-sm:text-[12px] font-semibold">
                      {d?.community?.title}
                    </div>
                    {d?.community?.isverified && (
                      <div>
                        <MdVerified className="text-blue-600" />
                      </div>
                    )}
                  </div>

                  <div className="flex">
                    <div className="text-[10px] dark:text-[#f5f5f5] pn:max-sm:text-[10px] font-medium text-[#5C5C5C]">
                      By {d?.community?.creator?.fullname}
                    </div>
                    <div className="dark:text-[#f5f5f5] text-[10px] font-medium text-[#5C5C5C]"></div>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <Link
            onClick={() => {
              if (isMobile) {
                dispatch(setHide(true));
              }
            }}
            href={`/main/feed/community?id=${d?.community?._id}`}
          >
            <div
              className={`bg-[#f4f4f4] dark:bg-graydark rounded-xl ${
                d?.urls.length > 1 ? "overflow-x-scroll no-scrollbar" : null
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
                                key={key}
                                src={f?.content}
                                poster={f?.thumbnail}
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
                            poster={d?.urls[0]?.thumbnail}
                            width={"100%"}
                            height={"h-full"}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="py-1 px-2 w-[100%] flex flex-col">
                <div className="text-[14px] pn:max-sm:text-[12px] dark:text-[#f5f5f5] text-black w-[100%] font-medium text-ellipsis overflow-hidden px-1">
                  {d?.posts[0]?.title.length > 50
                    ? `${d?.posts[0]?.title.slice(0, 40)}...`
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
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </div>
                <div className="h-[20px] w-[20px] rounded-lg -ml-[10px] ">
                  {" "}
                  <img
                    src={d?.memdps[1]}
                    className="object-cover rounded-2xl w-full h-full "
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </div>
                <div className="h-[20px] w-[20px] rounded-lg  -ml-[10px]  ">
                  {" "}
                  <img
                    src={d?.memdps[2]}
                    className="object-cover rounded-2xl w-full h-full "
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </div>
                <div className="h-[20px] w-[20px] rounded-lg z-0 -ml-[10px] ">
                  {" "}
                  <img
                    src={d?.memdps[3]}
                    className="object-cover rounded-2xl w-full h-full "
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </div>
              </div>
              <div className="text-[12px] self-center mt-1 font-medium ">
                {d?.posts?.[0]?.community?.memberscount}

                <span> Member</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div
                onClick={() => handleLike(d?.posts?.[0]?._id, d?.liked)}
                className={`dark:bg-graydark cursor-pointer flex justify-center rounded-xl ${
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
                <div className="text-[12px]">{d?.posts[0]?.likes}</div>
              </div>

              <div
                onClick={() => {
                  setShareValue(
                    `https://grovyo.com/main/feed/newForYou?id=${d?.community?._id}#${d?.posts?.[0]?._id}`
                  );

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
      );
    },
    [feed, handleLike, setHide, dispatch]
  );

  const rowCount = useMemo(() => feed.length, [feed]);

  return (
    <>
      {loading ? (
        <PostLoading />
      ) : (
        <AutoSizer>
          {({ height, width }) => (
            <List
              className="virtualized-list"
              height={height}
              width={width}
              rowHeight={isMobile ? 430 : 400}
              rowCount={rowCount}
              rowRenderer={rowRenderer}
            />
          )}
        </AutoSizer>
      )}
    </>
  );
};

export default React.memo(MyFeedComponent);
