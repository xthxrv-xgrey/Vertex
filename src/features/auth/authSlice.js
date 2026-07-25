import { createSlice } from "@reduxjs/toolkit";
import { loadAuthState } from "../../redux/localStorage";

const initialState = loadAuthState();

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.currentUser = action.payload;
        },

        logout: (state) => {
            state.currentUser = null;
        },

        register: (state, action) => {
            const user = action.payload;

            state.users[user.email] = user;
            state.usernames[user.username] = user.email;
        },
    },
});

export const { login, logout, register } = authSlice.actions;

export default authSlice.reducer;
