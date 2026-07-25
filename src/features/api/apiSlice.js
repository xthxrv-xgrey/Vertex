import { createSlice } from "@reduxjs/toolkit";
import { loadApiState } from "../../redux/localStorage";

const initialState = loadApiState();

const apiSlice = createSlice({
    name: "apis",
    initialState,

    reducers: {
        createApi: (state, action) => {
            const api = action.payload;

            state.apis[api.id] = api;

            if (!state.userApis[api.owner]) {
                state.userApis[api.owner] = {};
            }

            state.userApis[api.owner][api.id] = 1;

            if (api.visibility === "public") {
                state.publicApis[api.id] = 1;
            }
        },

        editApi: (state, action) => {
            const api = action.payload;

            state.apis[api.id] = api;

            if (api.visibility === "public") {
                state.publicApis[api.id] = 1;
            }

            if (api.visibility === "private") {
                delete state.publicApis[api.id];
            }
        },

        deleteApi: (state, action) => {
            const apiId = action.payload;

            const api = state.apis[apiId];

            if (!api) return;

            // Delete API data
            delete state.apis[apiId];

            // Remove from user's APIs
            if (state.userApis[api.owner]) {
                delete state.userApis[api.owner][apiId];
            }

            // Remove from public APIs
            delete state.publicApis[apiId];

            // Remove from all users' saved APIs
            Object.keys(state.savedApis).forEach((email) => {
                if (state.savedApis[email]?.[apiId]) {
                    delete state.savedApis[email][apiId];
                }
            });
        },

        updateApi: (state, action) => {
            const { id, updates } = action.payload;

            if (state.apis[id]) {
                state.apis[id] = {
                    ...state.apis[id],
                    ...updates,
                    updatedAt: Date.now(),
                };
            }
        },

        saveApi: (state, action) => {
            const { id: apiId, email } = action.payload;

            if (!state.savedApis[email]) {
                state.savedApis[email] = {};
            }

            state.savedApis[email][apiId] = 1;
        },

        unsaveApi: (state, action) => {
            const { id: apiId, email } = action.payload;

            if (state.savedApis[email]) {
                delete state.savedApis[email][apiId];
            }
        },
    },
});

export const { createApi, editApi, deleteApi, updateApi, saveApi, unsaveApi } = apiSlice.actions;

export default apiSlice.reducer;
