import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAILdPWxziOPNFMhsTRt1BcQrNaZJHZ8yY",
    authDomain: "bus-booking-4685f.firebaseapp.com",
    projectId: "bus-booking-4685f",
    storageBucket: "bus-booking-4685f.appspot.com",
    messagingSenderId: "665686499375",
    appId: "1:665686499375:web:876dd8efd5df0834f8a6da",
    measurementId: "G-ZCX8ZPH4DT"
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app };