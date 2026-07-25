import React from "react";

const SavedApiCard = () => {
    return (
        <div className="group rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:border-ring/40">
            <div className="flex items-start justify-between">
                <div className="flex gap-3 items-center">
                    <div className="rounded-lg border border-border bg-secondary px-2.5 py-1">
                        <p className="font-mono text-xs font-semibold text-method-get">GET</p>
                    </div>

                    <h2 className="font-semibold text-lg">Login API</h2>
                </div>

                <button className="rounded-lg border border-border px-3 py-1.5 text-xs hover:bg-secondary transition">
                    Remove
                </button>
            </div>

            <p className="mt-5 truncate font-mono text-xs text-muted-foreground">https://api.vertex.dev/auth/login</p>

            <p className="mt-4 line-clamp-2 text-sm leading-6 text-muted-foreground">
                Authenticate users using JWT access and refresh tokens. Supports email/password login, token refresh and
                logout.
            </p>

            <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                <p className="text-xs text-muted-foreground">
                    By <span className="text-foreground">atharv-agrey</span>
                </p>

                <p className="text-xs text-muted-foreground">Saved</p>
            </div>
        </div>
    );
};

export default SavedApiCard;
