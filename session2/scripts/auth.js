import { auth, googleProvider } from "../config/firebase.js";
import { createUserWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
// import { initializeHighScore, getHighScore, updateHighScore } from "./database.js";

// elements from the html
const authStatus = document.getElementById("authStatus");
// const highScoreElement = document.getElementById("highScore");
// const currentScoreElement = document.getElementById("currentScore");
const logoutButton = document.getElementById("logoutButton");
// const incrementButton = document.getElementById("incrementBtn");
// const decrementButton = document.getElementById("decrementBtn");
const loginButton = document.getElementById("loginButton");
const loginPopup = document.getElementById("login-popup")

// current user and current score
let currentUserId = null;
// let currentScore = 0;

// Update UI based on auth state
onAuthStateChanged(auth, async (user) => {
    if (user) {
        currentUserId = user.uid;
        authStatus.textContent = `Signed In as: ${user.email}`;

        // Initialize high score if it doesn't exist (TODO: optimize this later?)
        // await initializeHighScore(user.uid);

        // Fetch high score and display it
        // const highScore = await getHighScore(user.uid);
        // highScoreElement.textContent = highScore !== null ? highScore : "0";
    } else {
        currentUserId = null;
        authStatus.textContent = "Not Signed In";
        // highScoreElement.textContent = "-";
        // currentScoreElement.textContent = "0";
    }
});

// Sign In with email and password
const signIn = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // await initializeHighScore(userCredential.user.uid);
        alert("Signed in with email and password successfully!");
    } catch (err) {
        console.error(err);
        alert(`Error: ${err.message}`);
    }
};

// Sign In with Google
const signInWithGoogle = async () => {
    try {
        const userCredential = await signInWithPopup(auth, googleProvider);
        // await initializeHighScore(userCredential.user.uid);
        alert("Signed in with Google successfully!");
    } catch (err) {
        console.error(err);
        alert(`Error: ${err.message}`);
    }
};

// Logout
const logout = async () => {
    try {
        await signOut(auth);
        alert("Logged out successfully!");
        // currentScore = 0;
        // currentScoreElement.textContent = "0";
    } catch (err) {
        console.error(err);
        alert(`Error: ${err.message}`);
    }
};

// Update the current score and change the high score if necessary
// const updateCurrentScore = async (num) => {
//     currentScore = currentScore + num;
//     currentScoreElement.textContent = currentScore;

//     const highScore = await getHighScore(currentUserId);

//     // Update high score if the cur score is higher
//     if (currentScore > (highScore || 0)) {
//         await updateHighScore(currentUserId, currentScore);
//         highScoreElement.textContent = currentScore;
//     }
// };

// Event Listeners
document.getElementById("emailSignInBtn").addEventListener("click", signIn);
document.getElementById("googleSignInBtn").addEventListener("click", signInWithGoogle);
logoutButton.addEventListener("click", logout);
// incrementButton.addEventListener("click", () => updateCurrentScore(1));
// decrementButton.addEventListener("click", () => updateCurrentScore(-1));
loginButton.addEventListener("click", () => {
    if (loginPopup.style.display === "block") {
        loginPopup.style.display = "none";
    } else {
        loginPopup.style.display = "block";
    }
});
