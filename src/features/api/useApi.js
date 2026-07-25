import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { createApi as createApiAction, saveApi as saveApiAction, unsaveApi as unsaveApiAction } from "./apiSlice.js";
import { useMemo } from "react";

export const useApis = () => {
    const dispatch = useDispatch();

    const apis = useSelector((state) => state.apis.apis);
    const userApis = useSelector((state) => state.apis.userApis);

    const publicApis = useSelector((state) => state.apis.publicApis);
    const publicApisData = Object.keys(publicApis).map((apiId) => apis[apiId]);

    const savedApis = useSelector((state) => state.apis.savedApis);

    const currentUser = useSelector((state) => state.auth.currentUser);

    const currentUserApis = userApis[currentUser] || {};
    const currentUserApisData = Object.keys(currentUserApis).map((apiId) => apis[apiId]);

    const currentUserSavedApis = savedApis[currentUser] || {};
    const currentUserSavedApisData = Object.keys(currentUserSavedApis).map((apiId) => apis[apiId]);

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

    const unsaveApi = (apiId) => {
        if (!currentUser) {
            toast.error("Please login");
            return;
        }

        if (!apis[apiId]) {
            toast.error("Api not found!");
            return;
        }

        dispatch(
            unsaveApiAction({
                id: apiId,
                email: currentUser,
            })
        );

        toast.success("API Removed Successfully");
    };

    const publicApiCount = useMemo(() => {
        return Object.keys(currentUserApis).reduce((count, apiId) => {
            return publicApis[apiId] ? count + 1 : count;
        }, 0);
    }, [currentUserApis, publicApis]);

    return {
        apis,
        publicApis,
        publicApisData,

        currentUserApis,
        currentUserApisData,

        currentUserSavedApis,
        currentUserSavedApisData,

        publicApiCount,

        createApi,
        saveApi,
        unsaveApi,
    };
};
