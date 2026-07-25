import { createBrowserRouter, RouterProvider } from "react-router";

import GuestRoutes from "./GuestRoutes.jsx";
import ProtectedRoutes from "./ProtectedRoutes.jsx";

import AppLayout from "../layouts/AppLayout.jsx";

import Home from "../pages/Home.jsx";
import NotFound from "../pages/NotFound.jsx";

import Dashboard from "../pages/Dashboard.jsx";
import Vault from "../pages/Vault.jsx";
import Sphere from "../pages/Sphere.jsx";
import Saved from "../pages/Saved.jsx";
import CreateApi from "../pages/CreateApi.jsx";
import Profile from "../pages/Profile.jsx";

import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";

const router = createBrowserRouter([
    // Landing Route
    {
        path: "/",
        element: <Home />,
    },
    {
        element: <GuestRoutes />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
        ],
    },
    {
        element: <ProtectedRoutes />,
        children: [
            {
                element: <AppLayout />,
                children: [
                    {
                        path: "/dashboard",
                        element: <Dashboard />,
                    },
                    {
                        path: "/vault",
                        element: <Vault />,
                    },
                    {
                        path: "/sphere",
                        element: <Sphere />,
                    },
                    {
                        path: "/saved",
                        element: <Saved />,
                    },
                    {
                        path: "/createApi",
                        element: <CreateApi />,
                    },
                    {
                        path: "/users/:username",
                        element: <Profile />,
                    },
                ],
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

const AppRoutes = () => {
    return <RouterProvider router={router} />;
};

export default AppRoutes;
