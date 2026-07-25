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

        deleteApi: (state, action) => {
            const apiId = action.payload;

            const api = state.apis[apiId];

            if (!api) return;

            delete state.apis[apiId];

            if (state.userApis[api.owner]) {
                delete state.userApis[api.owner][apiId];
            }

            delete state.publicApis[apiId];
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
    },
});

export const { createApi, deleteApi, updateApi, saveApi } = apiSlice.actions;

export default apiSlice.reducer;
