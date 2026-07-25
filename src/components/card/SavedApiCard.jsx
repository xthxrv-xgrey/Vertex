import React from "react";
import { Link } from "react-router";
import { useApis } from "../../features/api/useApi";
import { useUser } from "../../features/auth/useUser";

const SavedApiCard = ({ apiData }) => {
    const { unsaveApi } = useApis();
    const { getUsernameByEmail } = useUser();

    const methodColors = {
        get: "text-method-get",
        post: "text-method-post",
        put: "text-method-put",
        delete: "text-method-delete",
    };

    return (
        <Link
            to={`/apis/${apiData.id}`}
            className="block group rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:border-ring/40"
        >
            <div className="flex items-start justify-between">
                <div className="flex gap-3 items-center">
                    <div className="rounded-lg border border-border bg-secondary px-2.5 py-1">
                        <p className={`font-mono text-xs font-semibold ${methodColors[apiData.method.toLowerCase()]}`}>
                            {apiData.method}
                        </p>
                    </div>

                    <h2 className="font-semibold text-lg">{apiData.title}</h2>
                </div>

                <button
                    onClick={(e) => {
                        e.preventDefault();
                        unsaveApi(apiData.id);
                    }}
                    className="rounded-lg border border-border px-3 py-1.5 text-xs hover:bg-secondary transition"
                >
                    Remove
                </button>
            </div>

            <p className="mt-5 truncate font-mono text-xs text-muted-foreground">{apiData.baseUrl + apiData.url}</p>

            <p className="mt-4 line-clamp-2 text-sm leading-6 text-muted-foreground">{apiData.description}</p>

            <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                <p className="text-xs text-muted-foreground">
                    By <span className="text-foreground">{getUsernameByEmail(apiData.owner)}</span>
                </p>

                <p className="text-xs text-muted-foreground">Saved</p>
            </div>
        </Link>
    );
};

export default SavedApiCard;
