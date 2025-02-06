import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBrhV8Z9I9bj2ysxVys5VX1oXJwFMQQ_4c",
    authDomain: "functions-research.firebaseapp.com",
    projectId: "functions-research",
    storageBucket: "functions-research.firebasestorage.app",
    messagingSenderId: "886742538462",
    appId: "1:886742538462:web:44a67485442cfbbd308a4f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };