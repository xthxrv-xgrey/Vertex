export const loadAuthState = () => {
    try {
        return {
            currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
            users: JSON.parse(localStorage.getItem("users")) || {},
            usernames: JSON.parse(localStorage.getItem("usernames")) || {},
        };
    } catch (error) {
        return {
            currentUser: null,
            users: {},
            usernames: {},
        };
    }
};

export const saveAuthState = (state) => {
    localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
    localStorage.setItem("users", JSON.stringify(state.users));
    localStorage.setItem("usernames", JSON.stringify(state.usernames));
};

// API STORAGE

export const loadApiState = () => {
    try {
        return {
            apis: JSON.parse(localStorage.getItem("apis")) || {},
            userApis: JSON.parse(localStorage.getItem("userApis")) || {},
            publicApis: JSON.parse(localStorage.getItem("publicApis")) || {},
            savedApis: JSON.parse(localStorage.getItem("savedApis")) || {},
        };
    } catch (error) {
        return {
            apis: {},
            userApis: {},
            publicApis: {},
            savedApis: {},
        };
    }
};

export const saveApiState = (state) => {
    localStorage.setItem("apis", JSON.stringify(state.apis));
    localStorage.setItem("userApis", JSON.stringify(state.userApis));
    localStorage.setItem("publicApis", JSON.stringify(state.publicApis));
    localStorage.setItem("savedApis", JSON.stringify(state.savedApis));
};
