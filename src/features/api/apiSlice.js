import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    apis: {
        api_123456: {
            id: "api_123456",
            owner: "atharv@gmail.com",
            title: "Login API",
            description: "Authenticate user credentials",
            method: "POST",
            visibility: "public",
            status: "active",
            url: "https://example.com/api/login",
            baseUrl: "https://example.com",

            headers: {
                Authorization: "Bearer Token",
                Accept: "application/json",
            },

            requestBody: `{
    "email": "string",
    "password": "string"
}`,

            responseBody: `{
    "token": "...",
    "user": {}
}`,

            createdAt: Date.now(),
            updatedAt: Date.now(),
        },
    },

    userApis: {
        "atharv@gmail.com": {
            api_123456: 1,
        },
    },

    publicApis: {
        api_123456: 1,
    },

    savedApis: {
        "atharv@gmail.com": {
            api_123456: 1,
        },
    },
};

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
