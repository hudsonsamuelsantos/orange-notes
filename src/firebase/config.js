import { getFirestore } from 'firebase/firestore'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCP_spMq2TifDcPjxNad1Q-JFURmS89XyY",
    authDomain: "orange-notes-eb193.firebaseapp.com",
    projectId: "orange-notes-eb193",
    storageBucket: "orange-notes-eb193.appspot.com",
    messagingSenderId: "630769682354",
    appId: "1:630769682354:web:f6ee378d41e67b704dc6ab"
}

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export { db } 