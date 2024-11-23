"use client";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import { IoCheckmark, IoChevronBack } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { Toaster, toast } from "react-hot-toast";
import { setHide } from "@/app/redux/slice/remember";
import styles from "@/app/CustomScrollbarComponent.module.css";
import { setData } from "@/app/redux/slice/lastMessage";
import { API } from "@/Essentials";
import { useAuthContext } from "@/app/(utitlies)/utils/AuthWrapper";
import ShimmerChat from "@/app/component/ShimmerChat";
import EmptyInbox from "@/app/component/EmptyInbox";
import Convs from "@/app/component/Convs";
const Chats = dynamic(() => import("@/app/component/Chats"));

const Page = () => {
  const [checkRequest, setCheckRequest] = useState(false);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const data = useSelector((state) => state.lastmessage.data);
  const { data: user } = useAuthContext();
  const dispatch = useDispatch();
  const params = useSearchParams();
  const id = params.get("id");
  const con = params.get("con");

  useEffect(() => {
    if (id) {
      dispatch(setHide(true));
    } else {
      dispatch(setHide(false));
    }
  }, [id, dispatch]);

  const fetchAllChats = async () => {
    try {
      const res = await axios.post(`${API}/v1/fetchallchatsnew/${user?.id}`);
      if (res.data.success) {
        dispatch(setData(res.data.conv));
      } else {
        toast.error("Error Fetching Chats");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatus = async (index, status, d) => {
    try {
      const res = await axios.post(`${API}/acceptorrejectmesgreq`, {
        reciever: user.id,
        sender: d.req.id._id,
        status,
      });

      if (res.data.success) {
        const updatedRequests = requests.filter((_, i) => i !== index);
        setRequests(updatedRequests);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccept = useCallback(
    (i, d) => {
      handleStatus(i, "accept", d);
    },
    [handleStatus]
  );

  const handleReject = useCallback(
    (i, d) => {
      handleStatus(i, "reject", d);
    },
    [handleStatus]
  );

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${API}/fetchallmsgreqs/${user.id}`);
      if (res.data.success) {
        const combinedRequests = res.data.dps.map((dp, i) => ({
          dp,
          req: res.data.reqs[i],
        }));
        setRequests(combinedRequests || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMuting = async (convId) => {
    try {
      const res = await axios.post(`${API}/muting`, {
        convId,
        id: user.id,
      });

      if (res.data.success) {
        const updatedData = data.map((item) =>
          item.convid === convId ? { ...item, ismuted: !item.ismuted } : item
        );
        dispatch(setData(updatedData));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeChat = async (convId) => {
    try {
      const res = await axios.post(`${API}/removeconversation/${user?.id}`, {
        convId,
      });

      if (res.data.success) {
        const updatedData = data.filter((item) => item.convid !== convId);
        dispatch(setData(updatedData));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchRequests();
      fetchAllChats();
    }
  }, [user.id]);

  useEffect(() => {
    const updateMobileView = () => setIsMobile(window.innerWidth <= 821);
    updateMobileView();
    window.addEventListener("resize", updateMobileView);
    return () => window.removeEventListener("resize", updateMobileView);
  }, []);

  return (
    <>
      <Toaster />
      <div
        className={`${
          isMobile && id && con
            ? "hidden"
            : "h-[100vh] w-full bg-white dark:bg-bluedark pn:max-sm:pb-20 flex flex-col sm:flex-row"
        } `}
      >
        <div className="h-full select-none bg-white dark:bg-[#0D0D0D] relative sm:min-w-[390px] flex flex-col">
          <div className="w-full h-[10%] border-b dark:border-[#131619] flex justify-between items-center p-2">
            <div className="text-2xl font-semibold text-black dark:text-white">
              Chats
            </div>
            <div
              onClick={() => setCheckRequest(true)}
              className="flex items-center text-[14px] font-medium dark:text-white text-black cursor-pointer"
            >
              Request{" "}
              <span className="text-[#1A85FF] pl-1">({requests.length})</span>
            </div>
          </div>

          {checkRequest ? (
            <div
              className={`flex flex-col ${styles.customScrollbar} w-full h-full overflow-auto`}
            >
              <div className="text-xl flex items-center gap-2 p-3 border-b">
                <IoChevronBack
                  className="text-2xl cursor-pointer"
                  onClick={() => setCheckRequest(false)}
                />
                <div>Requests</div>
              </div>
              {requests.length ? (
                requests.map((req, i) => (
                  <div
                    key={i}
                    className="w-full flex justify-between items-center p-2"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={req.dp}
                        alt="dp"
                        className="h-[40px] w-[40px] rounded-full"
                      />
                      <div>
                        <div className="text-[15px] font-semibold">
                          {req.req.id.fullname}
                        </div>
                        <div className="text-[14px]">{req.req.id.username}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <RxCross2
                        className="text-red-600 cursor-pointer"
                        onClick={() => handleReject(i, req)}
                      />
                      <IoCheckmark
                        className="text-green-600 cursor-pointer"
                        onClick={() => handleAccept(i, req)}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex justify-center items-center h-full">
                  No Requests!
                </div>
              )}
            </div>
          ) : (
            <div
              className={`w-full h-full ${styles.customScrollbar} overflow-auto px-2`}
            >
              {loading ? (
                <ShimmerChat />
              ) : (
                <>
                  {data.length > 0 ? (
                    <>
                      {data.map((chat, i) => (
                        <Convs
                          key={i}
                          d={chat}
                          handleVisible={() => {
                            const updatedData = data.map((item) =>
                              item.convid === chat.convid
                                ? { ...item, unread: 0 }
                                : item
                            );
                            dispatch(setData(updatedData));
                            dispatch(setHide(false));
                          }}
                          href={`/main/chat?id=${chat.id}&con=${chat.convid}`}
                          handleMuting={handleMuting}
                          removingchat={removeChat}
                        />
                      ))}
                    </>
                  ) : (
                    <>
                      <div className="flex justify-center items-center h-full">
                        No Chats!
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        <div className="w-full h-full">
          {!id && !con ? <EmptyInbox /> : <Chats con={con} id={id} />}
        </div>
      </div>

      {isMobile && id && con && <Chats con={con} id={id} />}
    </>
  );
};

export default Page;
