import { accordionSummaryClasses } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";

export const channelSlice = createSlice({
  name: "channel",
  initialState: {
    isLoading: false,
    activeChannel: {
      name: "",
      email: "",
      subscribed: [],
      subscribers: [],
      videos: [],
      _id: "",
      icon: "",
    },
    error: false,
  },
  reducers: {
    startFetchingChannel: (state) => {
      state.isLoading = true;
    },
    fetchingChannelSucces: (state,actions) => {
      state.isLoading = false
      state.error = false
      state.activeChannel = actions.payload
    },
    fetchingChannelFailed: (state) => {
      state.isLoading = false
      state.error = true
    },
    subscribe: (state,actions) => {
        state.activeChannel.subscribers.push(actions.payload)
    },
    unsubscribe: (state,actions) => {
        state.activeChannel.subscribers.splice(state.activeChannel.subscribers.indexOf(userID => userID === actions.payload),1)
    }
  }
});

export const { startFetchingChannel, fetchingChannelSucces, fetchingChannelFailed, subscribe, unsubscribe  } = channelSlice.actions;

export default channelSlice.reducer;