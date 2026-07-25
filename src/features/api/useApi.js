import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { createApi as createApiAction, saveApi as saveApiAction } from "./apiSlice.js";

export const useApis = () => {
    const dispatch = useDispatch();

    const apis = useSelector((state) => state.apis.apis);
    const userApis = useSelector((state) => state.apis.userApis);
    const publicApis = useSelector((state) => state.apis.publicApis);
    const savedApis = useSelector((state) => state.apis.savedApis);

    const currentUser = useSelector((state) => state.auth.currentUser);

    const currentUserApis = userApis[currentUser] || {};
    const currentUserSavedApis = savedApis[currentUser] || {};

    const createApi = (apiData) => {
        const id = `api_${crypto.randomUUID()}`;

        const newAPI = {
            id,
            owner: currentUser,
            ...apiData,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };

        dispatch(createApiAction(newAPI));

        toast.success("API Created Successfully");
    };

    const saveApi = (apiId) => {
        if (!currentUser) {
            toast.error("Please login to save API");
            return;
        }

        dispatch(
            saveApiAction({
                id: apiId,
                email: currentUser,
            })
        );

        toast.success("API Saved Successfully");
    };

    return {
        apis,
        publicApis,

        currentUserApis,
        currentUserSavedApis,

        createApi,
        saveApi,
    };
};
