// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAe2Lv7QPcYf8trEO9uLsOgjlz8NM5ugjI",
  authDomain: "connect-e75b1.firebaseapp.com",
  projectId: "connect-e75b1",
  storageBucket: "connect-e75b1.appspot.com",
  messagingSenderId: "209884382782",
  appId: "1:209884382782:web:7156453adbac848ec2f36f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app)

export default storage