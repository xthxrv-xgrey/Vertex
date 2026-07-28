import React from "react";
import { Link } from "react-router";
import { useUser } from "../../features/auth/useUser.js";

const RecentActivityCard = ({ apiData }) => {
    const methodColors = {
        get: "text-method-get",
        post: "text-method-post",
        patch: "text-method-patch",
        put: "text-method-put",
        delete: "text-method-delete",
    };

    const { getUsernameByEmail } = useUser();

    const username = getUsernameByEmail(apiData.owner);

    return (
        <Link
            to={`/apis/${apiData.id}`}
            className="group flex items-center gap-5 rounded-2xl border border-border bg-card px-5 py-4 transition-all duration-200 hover:-translate-y-1 hover:border-ring/40"
        >
            <div className="rounded-lg border border-border bg-secondary px-2.5 py-1">
                <p className={`font-mono text-xs font-semibold ${methodColors[apiData.method.toLowerCase()]}`}>
                    {apiData.method}
                </p>
            </div>

            <div className="flex-1 min-w-0">
                <h3 className="truncate font-semibold text-lg">{apiData.title}</h3>

                <p className="truncate font-mono text-xs text-muted-foreground">{apiData.baseUrl + apiData.url}</p>
            </div>
            <Link className="text-xs text-muted-foreground hover:font-semibold" to={`/users/${username}`}>
                By {username}
            </Link>
        </Link>
    );
};

export default RecentActivityCard;
