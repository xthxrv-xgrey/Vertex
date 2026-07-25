import { Navigate, Outlet } from "react-router";
import { useAuth } from "../features/auth/useAuth";
import { toast } from "sonner";

const ProtectedRoutes = () => {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoutes;
