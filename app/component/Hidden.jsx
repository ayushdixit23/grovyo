import axios from "axios";
import React, { useEffect } from "react";
import { API } from "../../Essentials";
import { useSelector } from "react-redux";
import { setHiddenMsgs } from "../redux/slice/messageSlice";
import PrivateChats from "./PrivateChats";

const Hidden = ({
  id,
  convId,
  dispatch,
  data,
  user,
  handleScrollToMessage,
}) => {
  const hiddenMsgs = useSelector((state) => state.message.hiddenMsg);

  const fetchHiddenMsgs = async () => {
    try {
      const res = await axios.get(`${API}/v1/fetchhiddenconv/${id}/${convId}`);
      console.log(res.data, "response");
      if (res.data.success) {
        dispatch(setHiddenMsgs(res.data.messages));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const loadmore = async () => {
    try {
      const res = await axios.get(`${API}/v1/fetchmorehiddenconv/${id}`, {
        convId,
      });
      console.log(res.data);
      if (res.data.success) {
        dispatch(setHiddenMsgs([res.data.messages, ...hiddenMsgs]));
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(hiddenMsgs);

  useEffect(() => {
    fetchHiddenMsgs();
  }, []);

  return (
    <div>
      {hiddenMsgs.map((d, i) => (
        <PrivateChats
          d={d}
          data={data}
          i={i}
          showHiddenreply={false}
          handleScrollToMessage={handleScrollToMessage}
          user={user}
          dispatch={dispatch}
        />
      ))}
    </div>
    // </InfiniteScroll>
  );
};

export default Hidden;
