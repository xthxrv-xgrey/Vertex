import { configureStore } from "@reduxjs/toolkit";
import { saveAuthState, saveApiState } from "./localStorage";
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
    const { apis, userApis, publicApis, savedApis, recentlyVisitedApis } = store.getState().apis;

    saveAuthState({
        currentUser,
        users,
        usernames,
    });

    saveApiState({
        apis,
        userApis,
        publicApis,
        savedApis,
        recentlyVisitedApis,
    });
});
