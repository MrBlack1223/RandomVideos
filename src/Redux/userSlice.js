import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    activeUser: {
      name: "",
      email: "",
      subscribed: [],
      videos: [],
      _id: "",
      icon: "",
    },
    error: false,
  },
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    loginSucces: (state,actions) => {
      state.isLoading = false
      state.error = false
      state.activeUser = actions.payload
    },
    loginFailed: (state) => {
      state.isLoading = false
      state.error = true
    },
    subscribeChannel: (state,actions)=>{
      state.activeUser.subscribed.push(actions.payload)
    },
    unsubscribeChannel: (state,actions)=>{
      state.activeUser.subscribed.splice(state.activeUser.subscribed.indexOf(actions.payload),1)
    },
    logout: (state) =>{
      state.activeUser = {
        name: null,
        email: null,
        subscribed: [],
        videos: [],
        _id: null,
        icon: "",
      }
    }
  }
});

export const { startLoading, loginSucces, loginFailed, logout, subscribeChannel , unsubscribeChannel} = userSlice.actions;

export default userSlice.reducer;