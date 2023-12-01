// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC_qKuAlznWvSaUGfNDyTHHt_wTahNbHeg",
    authDomain: "mooscles-60f83.firebaseapp.com",
    projectId: "mooscles-60f83",
    storageBucket: "mooscles-60f83.appspot.com",
    messagingSenderId: "198209942543",
    appId: "1:198209942543:web:b58f557778a89bf7c91f7a"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export default appFirebase