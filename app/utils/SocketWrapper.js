"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthWrapper";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { setincommsgs } from "../redux/slice/messageSlice";

export const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

//emitting function
export const socketemitfunc = async ({ event, data, socket }) => {
  console.log("Socket Connection:", socket?.connected);
  if (!socket?.connected) {
    socket?.connect();
    socket?.emit(event, data);
    setTimeout(() => {
      console.log("Reconnecting...", socket?.connected);
    }, 1000);
  } else {
    console.log("Connecting...");
    socket?.emit(event, data);
  }
};

//function for listening
export const socketonfunc = async ({ event, data }) => {
  if (!socket.connected) {
    socket.connect();
    socket.on(event, data);
    setTimeout(() => {
      console.log("Reconnecting...", socket.connected);
    }, 1000);
  } else {
    socket.emit(event, data);
  }
};

export const disconnectSocket = () => {
  socket.disconnect();
  console.log("Socket disconnected manually");
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();
  // const messages = useSelector((state) => state.message.messages);
  const [socketId, setSocketId] = useState(null);
  const convId = useSelector((state) => state.remember.convId);
  const { data, auth: AUTH } = useAuthContext();

  useEffect(() => {
    let newSocket;
     const url = "https://rooms.grovyo.xyz"
    if (AUTH) {
     
      newSocket = io(url, {
        auth: { id: data?.id },
        reconnectionAttempts: 100,
        reconnectionDelay: 3000,
        reconnection: true,
        autoConnect: true,
        transports: ["websocket"],
      });


      newSocket?.on("connect", () => {
        console.log("Socket connected without ID.");
        setSocketId(newSocket.id); // Set socketId without auth id
      });



      newSocket?.on("outer-private", (data) => {
        console.log(data?.data?.mesId, ",es", data)
        if (data.data.convId === convId) {
          dispatch(setincommsgs(data.data));
        }
      });

      newSocket?.on("outer-ms", (data) => {
        console.log(data, ",es", data)
        // if (data.data.convId === convId) {
        //   dispatch(setincommsgs(data.data));
        // }
      });
      setSocket(newSocket);

      console.log("Reconnecting...", newSocket.connected);

    } else {
      newSocket = io(url, {
        reconnectionAttempts: 100,
        auth: {
          skipMiddleware: true, 
        },
        reconnectionDelay: 2000,
        reconnection: true,
        autoConnect: true,
        transports: ["websocket"],
      });


      newSocket?.on("connect", () => {
       
        setSocketId(newSocket.id); // Update socketId state when connected
      });
      setSocket(newSocket)
      console.log("Reconnecting without id...", newSocket.connected);
    }

    return () => {
      newSocket?.off("outer-private");
    };
  }, [AUTH, data.id, convId]);

  return (
    <SocketContext.Provider value={{ socket,socketId }}>
      {children}
    </SocketContext.Provider>
  );
};
