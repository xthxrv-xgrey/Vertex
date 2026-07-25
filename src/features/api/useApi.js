import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import {
    createApi as createApiAction,
    editApi as editApiAction,
    deleteApi as deleteApiAction,
    saveApi as saveApiAction,
    unsaveApi as unsaveApiAction,
    visitedApi as visitedApiAction,
} from "./apiSlice.js";
import { useMemo } from "react";

export const useApis = () => {
    const dispatch = useDispatch();

    const apis = useSelector((state) => state.apis.apis);
    const userApis = useSelector((state) => state.apis.userApis);

    const publicApis = useSelector((state) => state.apis.publicApis);

    const publicApisData = Object.keys(publicApis)
        .map((apiId) => apis[apiId])
        .filter(Boolean);

    const savedApis = useSelector((state) => state.apis.savedApis);

    const currentUser = useSelector((state) => state.auth.currentUser);

    const currentUserApis = userApis[currentUser] || {};

    const recentlyVisitedApis = useSelector((state) => state.apis.recentlyVisitedApis);
    const currentUserVisitedApis = recentlyVisitedApis[currentUser] || [];

    const currentUserVisitedApisData = currentUserVisitedApis.map((apiId) => apis[apiId]).filter(Boolean);

    const currentUserApisData = Object.keys(currentUserApis)
        .map((apiId) => apis[apiId])
        .filter(Boolean);

    const currentUserSavedApis = savedApis[currentUser] || {};

    const currentUserSavedApisData = Object.keys(currentUserSavedApis)
        .map((apiId) => apis[apiId])
        .filter(Boolean);

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

    const editApi = (apiData) => {
        dispatch(editApiAction(apiData));
        toast.success("API Edited Successfully");
    };

    const deleteApi = (apiId) => {
        const api = apis[apiId];

        if (!currentUserApis[apiId]) {
            toast.error("API does not belongs to you");
            return;
        }

        dispatch(deleteApiAction(apiId));

        toast.success("API Deleted Successfully");
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

    const visitApi = (apiId) => {
        if (!currentUser) {
            return;
        }

        if (!apis[apiId]) {
            toast.error("API not found");
            return;
        }

        dispatch(
            visitedApiAction({
                apiId,
                email: currentUser,
            })
        );
    };

    const publicApiCount = useMemo(() => {
        return Object.keys(currentUserApis).reduce((count, apiId) => {
            return publicApis[apiId] ? count + 1 : count;
        }, 0);
    }, [currentUserApis, publicApis]);

    const getApiById = (apiId) => {
        const api = apis[apiId];

        if (!api) {
            toast.error("API Not found");
            return;
        }

        return api;
    };

    const isUsersApi = (apiId) => {
        return currentUserApis[apiId];
    };

    const isApiSaved = (apiId) => {
        return !!savedApis[currentUser]?.[apiId];
    };

    return {
        apis,

        publicApis,
        publicApisData,

        currentUserApis,
        currentUserApisData,

        currentUserSavedApis,
        currentUserSavedApisData,

        currentUserVisitedApis,
        currentUserVisitedApisData,

        publicApiCount,

        getApiById,
        isUsersApi,
        isApiSaved,

        createApi,
        editApi,
        deleteApi,
        saveApi,
        unsaveApi,
        visitApi,
    };
};
