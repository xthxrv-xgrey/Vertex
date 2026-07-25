import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export const useUser = () => {
    const dispatch = useDispatch();

    const currentUser = useSelector((state) => state.auth.currentUser);
    const users = useSelector((state) => state.auth.users);
    const usernames = useSelector((state) => state.auth.usernames);

    return {
        firstName: currentUser ? users[currentUser].firstName : null,
        avatar: currentUser ? users[currentUser].avatar : null,
    };
};
