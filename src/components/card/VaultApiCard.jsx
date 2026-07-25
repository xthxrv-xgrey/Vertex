import React from "react";

const VaultApiCard = ({ apiData }) => {
    const methodColors = {
        get: "text-method-get",
        post: "text-method-post",
        put: "text-method-put",
        delete: "text-method-delete",
    };

    return (
        <div className="group rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:border-ring/40">
            <div className="flex items-start justify-between">
                <div className="flex gap-3 items-center">
                    <div className="rounded-lg border border-border bg-secondary px-2.5 py-1">
                        <p className={`font-mono text-xs font-semibold ${methodColors[apiData.method.toLowerCase()]}`}>
                            {apiData.method}
                        </p>
                    </div>

                    <h2 className="font-semibold text-lg">{apiData.title}</h2>
                </div>

                <span className="rounded-lg border border-border bg-secondary px-3 py-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                    {apiData.visibility}
                </span>
            </div>

            <p className="mt-5 truncate font-mono text-xs text-muted-foreground">{apiData.baseUrl + apiData.url}</p>

            <p className="mt-4 line-clamp-2 text-sm leading-6 text-muted-foreground">{apiData.description}</p>

            <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                <p className="text-xs text-muted-foreground">
                    Updated{" "}
                    {new Date(apiData.updatedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                    })}
                </p>

                <button className="rounded-lg border border-border px-3 py-1.5 text-xs hover:bg-secondary transition">
                    Open
                </button>
            </div>
        </div>
    );
};

export default VaultApiCard;
