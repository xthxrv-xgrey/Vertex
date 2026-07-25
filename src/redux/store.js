import { configureStore } from "@reduxjs/toolkit";
import { saveAuthState } from "./localStorage";
import authReducer from "../features/auth/authSlice.js";
import apiReducer from "../features/api/apiSlice.js";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        apis: apiReducer,
    },
});

store.subscribe(() => {
    const { currentUser, users, usernames } = store.getState().auth;

    saveAuthState({
        currentUser,
        users,
        usernames,
    });
});
