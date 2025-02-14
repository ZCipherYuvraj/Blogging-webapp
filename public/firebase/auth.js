// Import Firebase Auth functions
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";
import { auth } from "./firebaseAuth.js"; // Import the initialized Firebase app

// Auth State Listener
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("User logged in:", user);
    // Redirect to dashboard or update UI
    // window.location.href = "/dashboard";
  } else {
    console.log("User logged out");
    // Redirect to login or update UI
    // window.location.href = "/";
  }
});

// Signup form submission
const signupForm = document.querySelector("#signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get email and password from the form
    const email = signupForm["signup-email"].value;
    const password = signupForm["signup-password"].value;

    // Create user with email and password
    createUserWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        console.log("User created:", cred.user);
        signupForm.reset(); // Reset the form
        // window.location.href = "/dashboard"; // Redirect to dashboard
      })
      .catch((error) => {
        console.error("Error creating user:", error.message);
        alert(error.message); // Show error message to the user
      });
  });
}

// Login form submission
const loginForm = document.querySelector("#login-form");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get email and password from the form
    const email = loginForm["login-email"].value;
    const password = loginForm["login-password"].value;

    // Sign in with email and password
    signInWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        console.log("User logged in:", cred.user);
        loginForm.reset(); // Reset the form
        window.location.href = "/dashboard"; // Redirect to dashboard
      })
      .catch((error) => {
        console.error("Error logging in:", error.message);
        alert(error.message); // Show error message to the user
      });
  });
}

// Logout
const logoutButton = document.querySelector("#logout");
if (logoutButton) {
  logoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        console.log("User logged out");
        window.location.href = "/"; // Redirect to login page
      })
      .catch((error) => {
        console.error("Error logging out:", error.message);
      });
  });
}