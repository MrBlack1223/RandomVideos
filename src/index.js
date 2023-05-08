import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/home';
import Channel from './pages/channel';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Video from './pages/video';
import SearchPage from './pages/searchPage'
import { Provider } from "react-redux"
import store from './Redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist';
import axios from "axios"
import Settings from './pages/settings';

const root = ReactDOM.createRoot(document.getElementById('root'));
let persistor = persistStore(store)
axios.defaults.withCredentials = true
root.render(

    <Provider store={store}>
      <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/video/:id" element={<Video />} />
              <Route path="/search" element ={<SearchPage />} />
              <Route path="/channel/:id" element={<Channel />}/>
              <Route path="/settings" element = {<Settings/>}/>
          </Routes>
        </BrowserRouter>
        </PersistGate>
    </Provider>
    
  
);


