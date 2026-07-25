import { Navigate, Outlet } from "react-router";
import { useAuth } from "../features/auth/useAuth";
import { toast } from "sonner";

const GuestRoutes = () => {
    const { isLoggedIn } = useAuth();

    if (isLoggedIn) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

export default GuestRoutes;
