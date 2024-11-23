"use client";
import { API } from "@/Essentials";
import Input from "/app/component/Input";
import { useAuthContext } from "@/app/(utitlies)/utils/AuthWrapper";
import {
  socketemitfunc,
  useSocketContext,
} from "@/app/(utitlies)/utils/SocketWrapper";
import axios from "axios";
import moment from "moment";
import { useParams, useSearchParams } from "next/navigation";
import React, { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removechatmsg,
  setContent,
  setMessage,
  setMessages,
  setReplyFunction,
  setType,
  setincommsgs,
} from "/app/redux/slice/messageSlice";
// default
import hidden from "/app/assets/hidden.png";
import hiddenlight from "/app/assets/lighthidden.png";
import blockpic from "/app/assets/block.png";
import styles from "/app/CustomScrollbarComponent.module.css";
import reportspic from "/app/assets/reports.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { LuLoader2 } from "react-icons/lu";
import PrivateChats from "/app/component/PrivateChats";
import Hidden from "/app/component/Hidden";
import { IoDocument } from "react-icons/io5";
import Link from "next/link";
import { setConvId, setPreview } from "@/app/redux/slice/remember";
import { RxCross2 } from "react-icons/rx";
import Loader from "@/app/component/Loader";
import { BsThreeDotsVertical } from "react-icons/bs";
import Image from "next/image";
import { useTheme } from "next-themes";
import Reports from "./Reports";

const Chats = memo(({ id, con }) => {
  const { data } = useAuthContext();
  const { socket } = useSocketContext();
  const searchParams = useSearchParams();
  const [end, setEnd] = useState(true);
  const optionType = searchParams.get("type");
  const [isBlocked, setIsBlocked] = useState(false);
  const [canblock, setCanblock] = useState(false);
  const [reports, setReports] = useState([]);

  const [user, setUser] = useState();
  const messages = useSelector((state) => state.message.messages);
  const [options, setOptions] = useState(false);
  const dispatch = useDispatch();
  const type = useSelector((state) => state.message.type);
  const name = useSelector((state) => state.message.name);
  const preview = useSelector((state) => state.remember.preview);
  const content = useSelector((state) => state.message.content);
  const size = useSelector((state) => state.message.size);
  const msg = useSelector((state) => state.message.message);
  const reply = useSelector((state) => state.message.reply);
  const replyId = useSelector((state) => state.message.replyId);
  const [loading, setLoading] = useState(true);
  const messageRefs = useRef({});
  const { theme } = useTheme();
  const [istyping, setIstyping] = useState(false);

  useEffect(() => {
    messages.forEach((message) => {
      messageRefs.current[message.mesId] = React.createRef();
    });
  }, [messages]);

  const handleScrollToMessage = (mesId) => {
    const targetRef = messageRefs.current[mesId];
    if (targetRef && targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const limitWords = (text, wordLimit) => {
    // const words = text.split(" ");
    return text.length > wordLimit ? text.slice(0, wordLimit) + ".." : text;
  };

  const fetchChats = async () => {
    try {
      const res = await axios.get(`${API}/fetchconvs/${data?.id}/${con}/${id}`);
      setIsBlocked(res.data.isblocked);
      setCanblock(res.data.canblock);
      setUser(res.data.otheruserdetails);
      dispatch(setMessages(res.data.messages || []));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const sendm = async (rid) => {
    const timer = moment(new Date()).format("HH:mm").toString();
    const timestamp = `${new Date()}`;

    if (!msg.trim()) {
      console.log("Type Something");
    } else {
      let mess = {
        sender_fullname: data?.fullname,
        sender_id: data?.id,
        text: msg,
        createdAt: timestamp,
        timestamp: timer,
        mesId: rid,
        typ: "message",
        // typ: reply ? 'reply' : 'message',
        convId: con,
        reciever: id,
        reciever_pic: user?.profilepic,
        isread: false,
        sequence: messages?.length + 1,
        sender: { _id: data?.id },
        // reply: reply,
        // replyId: replyId,
        readby: [],
        status: "active",
      };
      let ext = {
        convid: con,
        fullname: data?.fullname,
        id: data?.id,
        isverified: data?.isverified,
        msgs: [
          {
            conversationId: con,
            createdAt: timestamp,
            isread: false,
            mesId: rid,
            sender: data?.id,
            sequence: messages?.length + 1,
            text: msg,
            timestamp: timer,
            // typ: reply ? 'reply' : 'message',
            typ: "message",
            // reply: reply,
            // replyId: replyId,
            status: "active",
          },
        ],
        pic: data?.dp,
        username: data?.username,
        readby: [],
      };

      socketemitfunc({
        event: "singleChatMessage",
        data: { roomId: id, userId: data?.id, data: mess, ext: ext },
        socket,
      });
      socketemitfunc({
        event: "typing",
        data: { userId: data?.id, roomId: id, status: false },
        socket,
      });

      // setMessage([...messages, msg])

      dispatch(setMessage(""));
      dispatch(setType("text"));
    }
  };

  useEffect(() => {
    if (!socket?.connected) {
      socket?.connect();

      setTimeout(() => {
        console.log("Reconnecting from useeffect...", socket?.connected);
      }, 1000);
    } else {
      console.log(socket, "c");
      socket?.on("ms", (dat) => {
        socketemitfunc({
          event: "readnow",
          data: { userId: data?.id, roomId: id, mesId: dat?.mesId },
          socket,
        });
      });

      socket?.on("reads", (dat) => {
        console.log("reads", dat);
        socketemitfunc({
          event: "readnow",
          data: { userId: data?.id, roomId: data?.id, mesId: dat?.mesId },
          socket,
        });
      });

      //marking as read
      socket?.on("readconvs", (dat) => {
        console.log("readconvs", dat);
        socketemitfunc({
          event: "successreadnow",
          data: { userId: data?.id, roomId: data?.id, mesId: dat?.mesId },
          socket,
        });
      });

      //listening for blocking event
      socket?.on("afterblock", (dat) => {
        if (dat?.id === data?.id) {
          // dispatch(setisblock(dat?.action));
          setIsBlocked(dat?.action);
        }
      });

      //listening typing status
      socket?.on("istyping", (dat) => {
        const { id, status } = dat;
        // dispatch(settypingstatus({ status, id }));
      });

      //listening for delete for everyone
      socket?.on("deleted", (dat) => {
        // dispatch(removeselectedmsgseveryonewithsockets(dat));
      });
    }

    return () => {
      // dispatch(clearcurrentconvId());
      socket?.off("ms");
      // socket?.off("outer-private");
      socket?.off("readconvs");
      socket?.off("istyping");
      socket?.off("deleted");
    };
  }, [con, data?.id, socket]);

  const loadmore = async () => {
    try {
      if (messages?.length >= 20) {
        // setLoad(true);
        const res = await axios.post(
          `${API}/v1/loadmorechatmsg/${data?.id}`,
          {
            convId: con,
            sequence: parseInt(
              // loadedmessages[0]?.sequence
              // 	? loadedmessages[0]?.sequence:
              messages[0]?.sequence
            ),
          },
          {
            headers: {
              "Cache-Control": "no-cache",
              Pragma: "no-cache",
              Expires: "0",
            },
          }
        );

        if (res.data.success) {
          const newMessages = res.data.messages;
          // console.log(newMessages, "message", res.data)
          // dispatch(sendmoreconvmessage(newMessages));

          // dispatch(setMessages([...newMessages, ...messages]));
          dispatch(setMessages([...newMessages, ...messages]));
          if (res.data.messages.length > 0) {
            // setEnd(true);
            setEnd(false);
          } else {
            setEnd(true);
          }
        }
      }
      // setLoad(false);
    } catch (e) {
      // detecterror({ e });
      console.log(e, "Error");
    }
    // setLoad(false);
  };

  useEffect(() => {
    dispatch(setConvId(con));
  }, [con]);

  //gif sending
  const sendgif = async (ur, rid) => {
    // setLoad(true);

    const timer = moment(new Date()).format("HH:mm").toString();
    const timestamp = `${new Date()}`;

    const mess = {
      sender_fullname: data?.fullname,
      sender_id: data?.id,
      text: msg,
      createdAt: timestamp,
      timestamp: timer,
      mesId: rid,
      typ: "gif",
      convId: con,
      reciever: id,
      isread: false,
      sequence: messages.length + 1,
      sender: { _id: data?.id },
      //  content: {content, name: docname, size: size},
      url: ur,
      status: "active",
      readby: [],
    };

    dispatch(setincommsgs(mess));

    // dispatch(setattachopen(false));
    const form = new FormData();
    form.append("gif", {
      uri: ur,
      type: "image/gif",
      name: "new.pdf",
    });
    form.append("data", JSON.stringify(mess));

    try {
      const res = await axios.post(`${API}/v1/sendchatfile`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data?.success) {
        const newmess = {
          sender_fullname: data?.fullname,
          sender_id: data?.id,

          createdAt: timestamp,
          timestamp: timer,
          mesId: rid,
          typ: "gif",
          convId: con,
          reciever: id,
          isread: false,
          sequence: messages.length + 1,
          sender: { _id: data?.id },
          // content: {content:ur, name: docname, size: formattedSize},
          url: res?.data?.link,
          readby: [],
          status: "active",
        };
        let ext = {
          convid: con,
          fullname: data?.fullname,
          id: data?.id,
          isverified: data?.isverified,
          msgs: [
            {
              conversationId: con,
              createdAt: timestamp,
              isread: false,
              mesId: rid,
              sender: data?.id,
              sequence: messages.length + 1,
              timestamp: timer,
              status: "active",
              typ: "gif",
            },
          ],
          pic: data?.profilepic,
          username: data?.username,
          readby: [],
        };
        socketemitfunc({
          event: "singleChatContent",
          data: {
            roomId: id,
            userId: data?.id,
            data: newmess,
            ext: ext,
          },
          socket,
        });

        dispatch(setMessage(""));
        dispatch(setContent(""));
        dispatch(setType("text"));
      }
    } catch (error) {
      console.log("Error uploading file:", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    if (id && con && data?.id) {
      fetchChats();
    }
  }, [id, con, data?.id]);

  const handleSend = async (rid) => {
    const timer = moment(new Date()).format("HH:mm").toString();
    const timestamp = `${new Date()}`;

    const mess = {
      sender_fullname: data?.fullname,
      sender_id: data?.id,
      text: msg,
      createdAt: timestamp,
      timestamp: timer,
      mesId: rid,
      typ:
        type === "image"
          ? "image"
          : type === "video"
          ? "video"
          : type === "doc"
          ? "doc"
          : "message",
      convId: con,
      reciever: id,
      isread: false,
      sequence: messages.length + 1,
      sender: { _id: data?.id },
      content: { content, name, size },
      url: content,
      status: "active",
      readby: [],
    };

    const form = new FormData();
    form.append(
      type === "image"
        ? "image"
        : type === "video"
        ? "video"
        : type === "doc"
        ? "doc"
        : "doc",
      JSON.stringify({
        uri: content,
        type:
          type === "image"
            ? "image/jpg"
            : type === "video"
            ? "video/mp4"
            : type === "doc"
            ? content?.type
            : content?.type,
        name:
          type === "image"
            ? "image.jpg"
            : type === "video"
            ? "video.mp4"
            : type === "doc"
            ? "doc.pdf"
            : "doc.pdf",
      })
    );
    form.append("media", content);
    form.append("data", JSON.stringify(mess));

    try {
      //const res = await sendfile({data: form});
      //   console.log(res.data);
      // setLoad(true);

      const res = await axios.post(`${API}/v1/sendchatfile`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (uploadEvent) => {
          const uploadProgress = Math.round(
            (100 * uploadEvent.loaded) / uploadEvent.total
          );
          // setProgress({ appear: true, progress: uploadProgress });
        },
      });
      if (res.data?.success) {
        const newmess = {
          sender_fullname: data?.fullname,
          sender_id: data?.id,
          text: msg,
          createdAt: timestamp,
          timestamp: timer,
          mesId: rid,
          typ:
            type === "image"
              ? "image"
              : type === "video"
              ? "video"
              : type === "doc"
              ? "doc"
              : "message",
          convId: con,
          reciever: id,
          isread: false,
          sequence: messages.length + 1,
          sender: { _id: data?.id },
          content: { content, name, size },
          url: res?.data?.link,
          readby: [],
          status: "active",
        };
        let ext = {
          convid: con,
          fullname: data?.fullname,
          id: data?.id,
          isverified: data?.isverified,
          msgs: [
            {
              conversationId: con,
              createdAt: timestamp,
              isread: false,
              mesId: rid,
              sender: data?.id,
              sequence: messages.length + 1,
              text: msg,
              timestamp: timer,
              status: "active",
              typ:
                type === "image"
                  ? "image"
                  : type === "video"
                  ? "video"
                  : type === "doc"
                  ? "doc"
                  : "message",
            },
          ],
          pic: data?.profilepic,
          username: data?.username,
          readby: [],
        };
        socketemitfunc({
          event: "singleChatContent",
          data: {
            roomId: id,
            userId: data?.id,
            data: newmess,
            ext: ext,
          },
          socket,
        });

        // dispatch(sendconvmessage(mess));
        // dispatch(sendchats({ data: ext }));

        //   nav.goBack();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReport = async ({ type }) => {
    try {
      if (reports?.length > 0) {
        await axios.post(`${API}/v1/reporting/${data?.id}`, {
          data: reports,
          id: con,
          type: type,
        });
      } else {
        console.log("Something went wrong...");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleBlock = async () => {
    try {
      socketemitfunc({
        event: "blockperson",
        data: {
          roomId: con,
          userId: data?.id,
          rec: id,
          action: canblock,
        },
        socket,
      });
      const res = await axios.post(`${API}/blockpeople/${data?.id}`, {
        userid: id,
        time: Date.now(),
      });
      if (res.data.success) {
        setCanblock(!canblock);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const replyFunc = async (rid) => {
    try {
      const timer = moment(new Date()).format("HH:mm").toString();
      const timestamp = `${new Date()}`;

      if (!msg.trim()) {
        console.log("Type Something");
      } else {
        let mess = {
          sender_fullname: data?.fullname,
          sender_id: data?.id,
          text: msg,
          createdAt: timestamp,
          timestamp: timer,
          mesId: rid,
          typ: "reply",
          convId: con,
          reciever: id,
          reciever_pic: user?.profilepic,
          isread: false,
          sequence: messages?.length + 1,
          sender: { _id: data?.id },
          reply: reply,
          replyId: replyId,
          readby: [],
          status: "active",
        };
        let ext = {
          convid: con,
          fullname: data?.fullname,
          id: data?.id,
          isverified: data?.isverified,
          msgs: [
            {
              conversationId: con,
              createdAt: timestamp,
              isread: false,
              mesId: rid,
              sender: data?.id,
              sequence: messages?.length + 1,
              text: msg,
              timestamp: timer,
              typ: "reply",
              reply: reply,
              replyId: replyId,
              status: "active",
            },
          ],
          pic: data?.dp,
          username: data?.username,
          readby: [],
        };

        socketemitfunc({
          event: "singleChatMessage",
          data: { roomId: id, userId: data?.id, data: mess, ext: ext },
          socket,
        });
        socketemitfunc({
          event: "typing",
          data: { userId: data?.id, roomId: id, status: false },
          socket,
        });
        dispatch(setincommsgs(mess));
        // setMessage([...messages, msg])
        dispatch(setReplyFunction({ reply: "", replyId: "" }));
        dispatch(setMessage(""));
        dispatch(setType("text"));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    socket?.on("reads", (dat) => {
      console.log("reads", dat, id, data.id, "mine");

      socket.emit("readnow", {
        userId: data?.id,
        roomId: id,
        mesId: dat?.mesId,
      });
    });

    socket?.on("readnow", async ({ userId, roomId, mesId }) => {
      let data = { id: userId, mesId };
      socket.to(roomId).emit("readconvs", data);
      console.log("read", data?.id);
    });

    socket?.on("readconvs", (dat) => {
      console.log("readedconvs", dat);
      const updatedMessages = messages.map((f) => {
        console.log(dat?.mesId === f?.mesId, dat?.mesId, f?.mesId);

        return {
          ...f,
          readby: [id, data?.id],
        };
      });
      console.log("Updated messages:", updatedMessages);
      // Dispatch the updated messages
      dispatch(setMessages(updatedMessages));

      socket?.emit("successreadnow", {
        userId: data?.id,
        roomId: id,
        mesId: dat?.mesId,
      });
    });

    // Listener for the "istypingext" event (typing status)
    socket?.on("istypingext", (data) => {
      if (data?.convId === con) {
        setIstyping(true);
        setTimeout(() => {
          setIstyping(false);
        }, 3000);
      }
    });

    // Listener for the "deletedext" event (delete message)
    socket?.on("deletedext", (dat) => {
      const updatedMessages = messages.map((f) => {
        if (f.mesId === dat) {
          return { ...f, status: "deleted" };
        } else {
          return f;
        }
      });

      dispatch(removechatmsg(dat));
    });

    // Listener for the "afterblock" event (block user)
    socket?.on("afterblock", (dat) => {
      console.log(dat, "blocking");
      setIsBlocked(dat.action);
      // dispatch(removeselectedmsgseveryonewithsockets(dat));
    });

    // Clean up event listeners when the component unmounts or dependencies change
    return () => {
      // dispatch(clearcurrentconvId());
      // socket?.off("outer-private");
      socket?.off("readconvs");
      socket?.off("istyping");
      socket?.off("deletedtext");
    };
  }, [con, data?.id, socket, messages]);

  return (
    <>
      {optionType === "reports" && (
        <Reports
          setReports={setReports}
          reports={reports}
          href={`/main/chat?id=${id}&con=${con}`}
        />
      )}

      {loading ? (
        <Loader />
      ) : (
        <>
          <div
            onClick={() => setOptions(false)}
            className={`fixed inset-0 ${
              options ? "z-40" : "-z-20"
            } w-screen h-screen`}
          ></div>
          <div className="w-full h-[100vh] relative">
            {/* header  */}
            <div
              className="w-[100%] gap-2 bg-white shadow-md dark:bg-[#0D0F10] dark:border-[#131619]  border-[#888] justify-between items-center h-[10%] 
        border-b-[0.5px] border-b-gray-200 px-4 flex flex-row"
            >
              <a
                target="_blank"
                href={`https://grovyo.com/${user?.username}`}
                className="flex flex-row items-center w-full h-full gap-2"
              >
                <div className="h-[45px] w-[45px]">
                  <img
                    src={user?.profilepic}
                    className="w-full h-full object-cover rounded-[20px]  ring-1 dark:ring-[#273142] ring-white bg-white-300 "
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </div>
                <div>
                  <div className="text-[15px] font-medium">
                    {user?.fullname}
                  </div>
                  <div className="text-[14px]">
                    {istyping ? "Typing..." : ""}
                  </div>
                </div>
              </a>
              {/* user.isverified */}

              <div
                onClick={() => setOptions(!options)}
                className="flex justify-center relative gap-2 items-center "
              >
                <BsThreeDotsVertical />

                <div
                  className={`absolute duration-100 ease-in-out transform ${
                    options
                      ? "min-w-[180px] p-2 px-4 top-7 text-xs h-auto right-0 translate-y-0 opacity-100"
                      : "min-w-[0px] min-h-[0px] text-[0px] top-0 right-0 translate-y-4 opacity-0"
                  } z-40 rounded-lg dark:text-white dark:bg-[#0D0F10] text-[#6e6e6e] bg-[#f5f4f4] shadow-custom-lg`}
                  style={{ transition: "all 0.2s ease-in-out" }}
                >
                  <div className="flex flex-col font-semibold h-full">
                    <Link
                      className="rounded-lg flex items-center justify-start"
                      href={`/main/chat?id=${id}&con=${con}&type=hiddenMsgs`}
                    >
                      <div className="flex justify-center  items-center">
                        {theme === "dark" ? (
                          <Image
                            src={hidden}
                            className={`relative top-2 max-w-[40px] max-h-[40px] flex justify-center items-center h-full ${
                              options ? "" : "hidden"
                            } `}
                          />
                        ) : (
                          <Image
                            src={hiddenlight}
                            className={`relative top-2 max-w-[40px] max-h-[40px] flex justify-center items-center h-full ${
                              options ? "" : "hidden"
                            } `}
                          />
                        )}
                      </div>
                      <div className="">Hidden Message</div>
                    </Link>

                    <Link
                      className="flex items-center justify-start"
                      href={`/main/chat?id=${id}&con=${con}&type=reports`}
                    >
                      <div className="flex justify-center  items-center">
                        <Image
                          src={reportspic}
                          className={`relative top-2 max-w-[40px] max-h-[40px] flex justify-center items-center h-full ${
                            options ? "" : "hidden"
                          } `}
                        />
                      </div>
                      <div>Reports</div>
                    </Link>

                    {canblock ? (
                      <div
                        onClick={handleBlock}
                        className="rounded-lg flex items-center justify-start"
                      >
                        <div className="flex justify-center  items-center">
                          <Image
                            src={blockpic}
                            className={`relative top-2 max-w-[40px] max-h-[40px] flex justify-center items-center h-full ${
                              options ? "" : "hidden"
                            } `}
                          />
                        </div>
                        <div className="">Block</div>
                      </div>
                    ) : (
                      <div
                        onClick={handleBlock}
                        className="rounded-lg flex items-center justify-start"
                      >
                        <div className="flex justify-center  items-center">
                          <Image
                            src={blockpic}
                            className={`relative top-2 max-w-[40px] max-h-[40px] flex justify-center items-center h-full ${
                              options ? "" : "hidden"
                            } `}
                          />
                        </div>
                        <div className="">UnBlock</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* change krna hai */}
              {/* <div
                onClick={() => setOptions(true)}
                className="flex justify-center relative items-center text-3xl"
              >
                <div className="">
                  <IoReorderThreeOutline />
                </div>
                <div
                  className={`duration-100 absolute shadow-xl ${
                    options
                      ? " w-[200px] z-40 h-auto -left-[171px] p-3 top-7 dark:text-white text-black rounded-xl bg-white dark:bg-[#4c66ad]"
                      : "w-0 h-0 p-0 top-0 right-0 z-0 "
                  }`}
                >
                  <div
                    className={`${
                      options
                        ? "flex flex-col gap-2 font-semibold h-full  text-sm"
                        : "h-0 gap-0  text-[0px] "
                    }`}
                  >
                    <Link
                      onClick={() => setOptions(false)}
                      href={`/main/chat/${id}/${con}?type=hiddenMsgs`}
                    >
                      Hidden Messages
                    </Link>
                    <Link
                      href={`/main/chat/${id}/${con}?type=reports`}
                    >
                      Reports
                    </Link>
                    {canblock ? (
                      <div className="text-red-300" onClick={handleBlock}>
                        Block
                      </div>
                    ) : (
                      <div className="text-red-300" onClick={handleBlock}>
                        UnBlock
                      </div>
                    )}
                  </div>
                </div>
              </div> */}
            </div>
            {/* chats  */}

            {optionType === "hiddenMsgs" && (
              <Hidden
                id={data?.id}
                user={user}
                convId={con}
                socket={socket}
                data={data}
                handleScrollToMessage={handleScrollToMessage}
                dispatch={dispatch}
              />
            )}
            {!optionType && (
              <>
                <div
                  id="scrollableDiv"
                  style={{
                    overflow: "auto",
                    display: "flex",
                    flexDirection: "column-reverse",

                    padding: 10,
                  }}
                  className={`duration-75  bg-chatslightbg dark:bg-chatsdarkbg bg-cover bg-no-repeat ${
                    styles.customScrollbar
                  } relative overflow-y-scroll bg-white dark:bg-bluedark 
                    
                 

                      ${reply && replyId ? "h-[76%] " : "h-[calc(80%-20px)] "}
                     
                    `}
                >
                  <InfiniteScroll
                    dataLength={messages?.length}
                    next={loadmore}
                    style={{
                      display: "flex",
                      flexDirection: "column-reverse",
                    }}
                    inverse={true}
                    hasMore={end}
                    height={"100%"}
                    loader={
                      <div className="flex justify-center items-center p-3">
                        <div className="animate-spin ">
                          <LuLoader2 />
                        </div>
                      </div>
                    }
                    scrollableTarget="scrollableDiv"
                  >
                    {preview === false && (
                      <div className="flex flex-col gap-3">
                        {messages.map((d, i) => (
                          <PrivateChats
                            d={d}
                            ref={messageRefs.current[d.mesId]}
                            messages={messages}
                            handleScrollToMessage={handleScrollToMessage}
                            receiverId={id}
                            convId={con}
                            key={d.mesId}
                            socket={socket}
                            data={data}
                            dispatch={dispatch}
                            i={i}
                            user={user}
                          />
                        ))}
                      </div>
                    )}

                    {preview && (
                      <div className="w-full h-[70vh]">
                        <div className="flex flex-col w-full justify-center items-center h-full ">
                          <div
                            onClick={() => {
                              dispatch(setType(""));
                              dispatch(setContent(""));
                              dispatch(setPreview(false));
                            }}
                            className="flex justify-end items-end mr-7 w-full"
                          >
                            <RxCross2 className="text-2xl" />
                          </div>
                          <div className="h-full justify-center items-center flex">
                            {type === "image" && content && (
                              <div className="h-full flex w-full justify-center items-center">
                                <img
                                  className="max-h-[500px] max-w-[500px] flex"
                                  src={
                                    typeof content === "string"
                                      ? content
                                      : URL.createObjectURL(content)
                                  }
                                />
                              </div>
                            )}
                            {type === "video" && content && (
                              <div className="h-full flex w-full justify-center items-center">
                                <video
                                  className="max-h-[500px] max-w-[500px] flex"
                                  src={URL.createObjectURL(content)}
                                  controls
                                />
                              </div>
                            )}
                            {type === "gif" && content && (
                              <div className="h-full flex w-full bg-green-200 justify-center items-center">
                                <img
                                  className="max-h-[500px] max-w-[500px] bg-red-300 flex"
                                  src={
                                    typeof content === "string"
                                      ? content
                                      : URL.createObjectURL(content)
                                  }
                                />
                              </div>
                            )}
                            {type === "doc" && content && (
                              <div className="h-full flex gap-4 flex-col w-full justify-center items-center">
                                <div className="flex gap-1 justify-center items-center">
                                  <div className="">
                                    <IoDocument className="w-[50px] h-[50px]" />
                                  </div>
                                  <div className="text-xl">{name}</div>
                                </div>
                                <div className="text-xl">
                                  No Preview Available
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </InfiniteScroll>
                </div>
                {/* footer  */}
                <div
                  className={`bg-[#fff] duration-75 flex border-t-2 dark:border-[#131619] dark:bg-bluelight justify-center 
                     ${
                       reply && replyId
                         ? "h-[12%] gap-2 space-y-2"
                         : "h-[calc(10%+20px)]  items-center"
                     }`}
                >
                  {canblock === true && isBlocked === false && (
                    <div
                      className={`duration-100 px-2 ${
                        reply && replyId ? "" : "-mt-2"
                      }  w-full dark:bg-bluelight`}
                    >
                      {reply && replyId && (
                        <div className="flex justify-between p-1 px-2 rounded-[10px] m-1 items-center dark:text-white text-black">
                          <div
                            className={`${
                              reply && replyId ? "text-[14px] " : "text-[0px] "
                            }`}
                          >
                            {limitWords(reply, 65)}
                          </div>
                          <div>
                            <RxCross2
                              className={`dur${
                                reply && replyId ? "text-[14px]" : "text-[0px]"
                              }`}
                              onClick={() => {
                                dispatch(setType(""));
                                dispatch(
                                  setReplyFunction({
                                    reply: "",
                                    replyId: "",
                                  })
                                );
                              }}
                            />
                          </div>
                        </div>
                      )}
                      <Input
                        sendMessages={sendm}
                        sendgif={sendgif}
                        senderId={data?.id}
                        sender_fullname={data?.fullname}
                        convId={con}
                        recieverId={id}
                        handleSend={handleSend}
                        setContent={setContent}
                        reply={replyFunc}
                        setMessages={setMessages}
                        setincommsgs={setincommsgs}
                        setMessage={setMessage}
                        setType={setType}
                        type={type}
                        socket={socket}
                        name={name}
                        content={content}
                        size={size}
                        message={msg}
                        dispatch={dispatch}
                      />
                    </div>
                  )}

                  {canblock === false && isBlocked != true && (
                    <div className="absolute bottom-5 flex justify-center items-center text-red-600 font-semibold  bg-white dark:bg-bluelight w-full">
                      You Have Blocked {user?.fullname}
                    </div>
                  )}

                  {isBlocked && canblock !== false && (
                    <div className="absolute bottom-6 flex justify-center items-center text-red-600 font-semibold  bg-white dark:bg-bluelight w-full">
                      You Have Been Blocked by {user?.fullname}
                    </div>
                  )}

                  {canblock === false && isBlocked && (
                    <div className="absolute bottom-6 flex justify-center items-center text-red-600 font-semibold  bg-white dark:bg-bluelight w-full">
                      You Both Blocked Each other
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
});

export default Chats;
