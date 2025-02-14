// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";
import { firebaseConfig } from "../../config/firebaseConfig.js";

// Your web app's Firebase configuration


// Initialize Firebase
const fireapp = initializeApp(firebaseConfig);
const auth = getAuth(fireapp);

export { fireapp, auth };