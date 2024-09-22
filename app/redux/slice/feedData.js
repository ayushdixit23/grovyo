import { createSlice } from "@reduxjs/toolkit";

export const feedData = createSlice({
	name: "feedData",
	initialState: {
		feed: []
	},
	reducers: {
		setFeed: (state, action) => {
			state.feed = action.payload
		}
	}
})

export const { setFeed } = feedData.actions
export default feedData.reducer
