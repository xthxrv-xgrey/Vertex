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
