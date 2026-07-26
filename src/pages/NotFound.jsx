import { Link } from "react-router";
import { toast } from "sonner";
import NotFoundCard from "../components/ui/NotFoundCard";

const NotFound = () => {
    toast.error("Invalid Page!");
    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center">
            <NotFoundCard />
            <p>Page Not Found</p>
            <Link to={"/"}>
                <h1 className="text text-blue-500 font-mono">Home -{">"}</h1>
            </Link>
        </div>
    );
};

export default NotFound;
