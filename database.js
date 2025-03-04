// import { getFirestore, doc, setDoc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// const db = getFirestore();

// // Initializes a high score for a user when they log in for the first time
// export const initializeHighScore = async (userId) => {
//     try {
//         // Try catch block so a connnection/api error doesn't crash everything
//         const userDoc = doc(db, "users", userId);
//         const docSnap = await getDoc(userDoc);

//         if (!docSnap.exists()) {
//             // If the user document doesn't exist (it won't), initialize it to 0
//             await setDoc(userDoc, { highScore: 0 });
//         }
//     } catch (e) {
//         console.log("Error initializing high score:", e);
//     }
// };


// // Getter method for getting the high score for the user
// export const getHighScore = async (userId) => {
//     try {
//         const docSnap = await getDoc(doc(db, "users", userId));
//         if (docSnap.exists()) {
//             return docSnap.data().highScore;
//         } else {
//             console.log("No high score found for this user.");
//             return null;
//         }
//     } catch (err) {
//         console.error("Error getting high score:", err);
//         return null;
//     }
// };

// // Updates the high score in the database
// export const updateHighScore = async (userId, newScore) => {
//     try {
//         await updateDoc(doc(db, "users", userId), { highScore: newScore });
//     } catch (e) {
//         console.log("Error updating high score:", e);
//     }
// };
