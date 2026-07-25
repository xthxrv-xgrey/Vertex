import { Link } from "react-router";
import { toast } from "sonner";

const NotFound = () => {
    toast.error("Invalid Page!");
    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center">
            <h1>404</h1>
            <p>Page Not Found</p>
            <Link to={"/"}>
                <h1 className="text-9xl text-blue-300">Home</h1>
            </Link>
        </div>
    );
};

export default NotFound;
