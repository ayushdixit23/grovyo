import { configureStore } from "@reduxjs/toolkit";
import messageSlice from "./slice/messageSlice";
import comChatSlice from "./slice/comChatSlice";
import anotherSlice from "./slice/anotherSlice";
import lastMessage from "./slice/lastMessage";
import rememberSlice from "./slice/remember";
import feedData from "./slice/feedData";
import comFeed from "./slice/comFeed";


export const store = configureStore({
  reducer: {
    message: messageSlice,
    comChat: comChatSlice,
    another: anotherSlice,
    remember: rememberSlice,
    lastmessage: lastMessage,
    feedData: feedData,
    comFeed: comFeed,
  },
});
