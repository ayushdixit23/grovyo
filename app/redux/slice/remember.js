import { createSlice } from "@reduxjs/toolkit";

export const remberSlice = createSlice({
  name: "remember",
  initialState: {
    convId: "",
    preview: false,
    hide: false,
    compath: "",
    recentSearchPro: [],
    recentSearchCom: []
  },
  reducers: {
    setConvId: (state, action) => {
      state.convId = action.payload;
    },
    setPreview: (state, action) => {
      state.preview = action.payload;
    },
    setHide: (state, action) => {
      state.hide = action.payload;
    },
    setPathForSharing: (state, action) => {
      state.compath = action.payload
    },
    setRecentSearchPro: (state, action) => {
      state.recentSearchPro = action.payload
    },
    setRecentSearchCom: (state, action) => {
      state.recentSearchCom = action.payload
    },
  },
});

export const { setConvId, setPreview, setHide, setRecentSearchPro, setRecentSearchCom, setPathForSharing } = remberSlice.actions;
export default remberSlice.reducer;
