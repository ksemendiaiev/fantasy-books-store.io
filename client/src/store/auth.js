import { createSlice } from "@reduxjs/toolkit";

// Initialize role and login state from localStorage
const initialRole = localStorage.getItem("role") || "user"; // Default role is "user"
const initialLoginState = !!localStorage.getItem("token"); // Check if a token exists

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: initialLoginState, // Set initial login state
        role: initialRole, // Set initial role from localStorage
    },
    reducers: {
        login(state, action) {
            const { role = "user", token = "" } = action.payload || {}; // Safely destructure payload
            state.isLoggedIn = true; // Set login state to true
            state.role = role; // Use default "user" role if undefined
            localStorage.setItem("role", role); // Save role to localStorage
            localStorage.setItem("token", token); // Save token to localStorage
        },
        logout(state) {
            state.isLoggedIn = false; // Set login state to false
            state.role = "user"; // Reset role to default "user"
            localStorage.removeItem("role"); // Remove role from localStorage
            localStorage.removeItem("token"); // Remove token from localStorage
        },
        changeRole(state, action) {
            const role = action.payload || "user"; // Default to "user" if payload is undefined
            state.role = role; // Update the state with the new role
            localStorage.setItem("role", role); // Save the updated role to localStorage
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
