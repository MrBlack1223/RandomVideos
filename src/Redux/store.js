import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import videoReducer from './videoSlice'
import channelReducer from './channelSlice'
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const rootReducer = combineReducers({user: userReducer, video: videoReducer, channel: channelReducer})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default configureStore({
  reducer: {
    reducer: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});


