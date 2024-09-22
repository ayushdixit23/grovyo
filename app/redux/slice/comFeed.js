import { createSlice } from "@reduxjs/toolkit";

export const comFeed = createSlice({
	name: "comFeed",
	initialState: {
		feed: []
	},
	reducers: {
		setFeed: (state, action) => {
			state.feed = action.payload
		}
	}
})

export const { setFeed } = comFeed.actions
export default comFeed.reducer
