import { createSlice} from "@reduxjs/toolkit";

export const videoSlice = createSlice({
  name: "video",
  initialState: {
    isFeaching: false,
    activeVideo: {
      title: "",
      photo: "",
      likes: [],
      dislikes: [],
      videoURL: "",
      tags: [],
      comments: [],
      authorID: "",
      desc: "",
      views: null,
      _id: null,
      createdAt: ''
    },
  error: false,
  },
  reducers: {
    startFetch: (state) => {
      state.isFeaching = true;
    },
    fetchSucces: (state,actions) => {
      state.isFeaching = false
      state.error = false
      state.activeVideo = actions.payload
    },
    fetchFailed: (state) => {
      state.isFeaching = false
      state.error = true
    },
    like: (state,actions) => {
      if(!state.activeVideo.likes.includes(actions.payload)){
        state.activeVideo.likes.push(actions.payload)
        if(state.activeVideo.dislikes.findIndex((userId) => userId === actions.payload  ) !== -1 ) {
          state.activeVideo.dislikes.splice(state.activeVideo.dislikes.findIndex(
            (userId) => userId === actions.payload
            ),1
          )
        }
      }
    },
    dislike: (state,actions) => {
      if(!state.activeVideo.dislikes.includes(actions.payload)){
        state.activeVideo.dislikes.push(actions.payload)
        if(state.activeVideo.likes.findIndex((userId) => userId === actions.payload  ) !== -1 ) {
            state.activeVideo.likes.splice(state.activeVideo.likes.findIndex(
              (userId) => userId === actions.payload
              ),1
            )
          }
        }
    }
  }
})

export const { startFetch, fetchSucces, fetchFailed, like, dislike } = videoSlice.actions;

export default videoSlice.reducer;