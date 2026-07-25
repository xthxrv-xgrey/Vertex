import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export const useUser = () => {
    const dispatch = useDispatch();

    const currentUser = useSelector((state) => state.auth.currentUser);
    const users = useSelector((state) => state.auth.users);
    const usernames = useSelector((state) => state.auth.usernames);

    const getUsernameByEmail = (email) => {
        const user = users[email];
        if (!user) {
            toast.error("User with this email does not exists");
            return;
        }
        return user.username;
    };

    const getUserByUsername = (username) => {
        const userEmail = usernames[username];
        if (!userEmail) {
            toast.error("Username does not exists");
            return;
        }
        return users[userEmail];
    };

    return {
        firstName: currentUser ? users[currentUser].firstName : null,
        username: currentUser ? users[currentUser].username : null,
        avatar: currentUser ? users[currentUser].avatar : null,
        getUsernameByEmail,
        getUserByUsername,
    };
};
