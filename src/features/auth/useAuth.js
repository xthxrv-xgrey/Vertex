import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import { login, logout, register } from "./authSlice";

export const useAuth = () => {
    const dispatch = useDispatch();

    const currentUser = useSelector((state) => state.auth.currentUser);
    const users = useSelector((state) => state.auth.users);
    const usernames = useSelector((state) => state.auth.usernames);

    // Main Functions

    const signIn = ({ email, password }) => {
        const existingUser = users[email];

        if (!existingUser) {
            toast.error("User does not exist.");
            return false;
        }

        if (existingUser.password !== password) {
            toast.error("Incorrect password.");
            return false;
        }

        dispatch(login(email));
        toast.success("Login successful!");

        return true;
    };

    const signOut = () => {
        dispatch(logout());
        toast.success("Logout successful!");
    };

    const registerUser = ({ firstName, lastName, email, username, password }) => {
        if (users[email]) {
            toast.error("Email already in use.");
            return false;
        }

        if (usernames[username]) {
            toast.error("Username already exists.");
            return false;
        }

        const newUser = {
            firstName,
            lastName,
            email,
            username,
            password,

            avatar: "https://lh3.googleusercontent.com/a/ACg8ocL7nHnAVztJQTz-qPPxg8ohI-fSniwN9Zub186GI7EC2sY49xA=s360-c-no",

            bio: "",

            github: "",
            linkedin: "",
            website: "",

            createdAt: Date.now(),
        };

        dispatch(register(newUser));

        toast.success("Registration successful!");

        dispatch(login(email));

        return true;
    };

    return {
        currentUser,
        user: currentUser ? users[currentUser] : null,
        isLoggedIn: Boolean(currentUser),
        signIn,
        signOut,
        registerUser,
    };
};
