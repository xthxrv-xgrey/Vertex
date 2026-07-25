import React from "react";

const RecentActivityCard = () => {
    return (
        <div className="group flex items-center gap-5 rounded-2xl border border-border bg-card px-5 py-4 transition-all duration-200 hover:border-ring/40 hover:bg-secondary/40">
            <div className="rounded-lg border border-border bg-secondary px-2.5 py-1">
                <p className="font-mono text-xs font-semibold text-method-get">GET</p>
            </div>

            <div className="flex-1 min-w-0">
                <h3 className="truncate font-semibold">Login API</h3>

                <p className="truncate font-mono text-xs text-muted-foreground">https://api.vertex.dev/auth/login</p>
            </div>

            <p className="shrink-0 text-xs text-muted-foreground">2 mins ago</p>
        </div>
    );
};

export default RecentActivityCard;
