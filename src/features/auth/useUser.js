import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { updateUser as updateUserAction } from "./authSlice";

export const useUser = () => {
    const dispatch = useDispatch();

    const currentUser = useSelector((state) => state.auth.currentUser);
    const users = useSelector((state) => state.auth.users);
    const usernames = useSelector((state) => state.auth.usernames);

    const currentUserData = currentUser ? users[currentUser] : null;

    const getUsernameByEmail = (email) => {
        const user = users[email];

        if (!user) {
            toast.error("User with this email does not exist");
            return null;
        }

        return user.username;
    };

    const getUserByUsername = (username) => {
        const userEmail = usernames[username];

        if (!userEmail) {
            toast.error("Username does not exist");
            return null;
        }

        return users[userEmail];
    };

    const updateUser = (updates) => {
        if (!currentUserData) {
            toast.error("No user logged in");
            return;
        }

        const updatedUser = {
            ...currentUserData,
            ...updates,
        };

        dispatch(updateUserAction(updatedUser));
    };

    return {
        firstName: currentUserData?.firstName ?? null,
        username: currentUserData?.username ?? null,
        avatar: currentUserData?.avatar ?? null,
        getUsernameByEmail,
        getUserByUsername,
        updateUser,
    };
};
