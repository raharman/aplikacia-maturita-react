import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
/* import { getAnalytics } from "firebase/analytics"; */

const firebaseConfig = {
  apiKey: "AIzaSyDgnwV-iJubXfDuFk0LhltiKlePE3xteNE",
  authDomain: "aplikacia-maturita-react.firebaseapp.com",
  projectId: "aplikacia-maturita-react",
  storageBucket: "aplikacia-maturita-react.appspot.com",
  messagingSenderId: "253136519634",
  appId: "1:253136519634:web:920cade7c48d822193c80b",
  measurementId: "G-XHVZH0Q8BZ",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
/* const analytics = getAnalytics(app); */
