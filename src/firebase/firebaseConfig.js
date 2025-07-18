import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAT5CY3riRfRIa7ph3gfCHaSeW11kpFeGY",
  authDomain: "good2eat-a8e67.firebaseapp.com",
  projectId: "good2eat-a8e67",
  storageBucket: "good2eat-a8e67.firebasestorage.app",
  messagingSenderId: "948989950776",
  appId: "1:948989950776:web:0e97ef62f98f8b3ec8dfcd",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
