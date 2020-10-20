import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDr0XbxvgryYc-Fqnkqe-7ynmaxvCmf4YE",
  authDomain: "discord-clone-7fbd8.firebaseapp.com",
  databaseURL: "https://discord-clone-7fbd8.firebaseio.com",
  projectId: "discord-clone-7fbd8",
  storageBucket: "discord-clone-7fbd8.appspot.com",
  messagingSenderId: "813418379107",
  appId: "1:813418379107:web:3c5a3056469d1ace768556",
  measurementId: "G-CLJNSB2GX4",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };

export default db;
