// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzsMEtbPRLyJCKPGET3cOtWxOtiYCKyXI",
  authDomain: "whatsapp-clone-7cbf6.firebaseapp.com",
  projectId: "whatsapp-clone-7cbf6",
  storageBucket: "whatsapp-clone-7cbf6.appspot.com",
  messagingSenderId: "4483983865",
  appId: "1:4483983865:web:bb6f2f0d05da19dfb13528",
  measurementId: "G-DHBLHTZRMY"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app)

const auth = getAuth(app)

const provider = new GoogleAuthProvider();

export { db, auth, provider }