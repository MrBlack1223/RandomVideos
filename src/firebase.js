
import { initializeApp} from "firebase/app";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDO1qa_9xmcawbrTp3FI2xkx_PlpM4nl3o",
  authDomain: "randomvideos-db952.firebaseapp.com",
  projectId: "randomvideos-db952",
  storageBucket: "randomvideos-db952.appspot.com",
  messagingSenderId: "1008828115605",
  appId: "1:1008828115605:web:36e8870e15f79ee9eec99c",
  measurementId: "G-8914WZW23W"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);