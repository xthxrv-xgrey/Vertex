import { Link } from "react-router";
import { Globe, Clock3, ArrowUpRight } from "lucide-react";

const methodColors = {
    GET: "bg-green-500/10 text-green-600",
    POST: "bg-blue-500/10 text-blue-600",
    PUT: "bg-yellow-500/10 text-yellow-600",
    PATCH: "bg-purple-500/10 text-purple-600",
    DELETE: "bg-red-500/10 text-red-600",
};

const PublicApiCard = ({ api }) => {
    return (
        <Link
            to={`/api/${api.id}`}
            className="block rounded-2xl border border-border bg-card p-5 transition hover:border-primary hover:shadow-sm"
        >
            <div className="flex items-start justify-between gap-4">
                {/* Left */}
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                        <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                methodColors[api.method] || "bg-accent"
                            }`}
                        >
                            {api.method}
                        </span>

                        <h3 className="truncate text-lg font-semibold">{api.title}</h3>
                    </div>

                    <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                        {api.description || "No description provided."}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <Globe size={15} />
                            <span className="capitalize">{api.visibility}</span>
                        </div>

                        <div className="flex items-center gap-1">
                            <Clock3 size={15} />
                            <span>{new Date(api.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>

                    {api.url && (
                        <div className="mt-4 rounded-lg bg-muted px-3 py-2">
                            <p
                                className="overflow-hidden text-ellipsis whitespace-nowrap text-xs font-mono text-muted-foreground"
                                title={api.url}
                            >
                                {api.url}
                            </p>
                        </div>
                    )}
                </div>

                {/* Right */}
                <ArrowUpRight size={18} className="shrink-0 text-muted-foreground" />
            </div>
        </Link>
    );
};

export default PublicApiCard;
