import React from "react";

const VaultApiCard = () => {
    return (
        <div className="group rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:border-ring/40">
            <div className="flex items-start justify-between">
                <div className="flex gap-3 items-center">
                    <div className="rounded-lg border border-border bg-secondary px-2.5 py-1">
                        <p className="font-mono text-xs font-semibold text-method-get">GET</p>
                    </div>

                    <h2 className="font-semibold text-lg">Login API</h2>
                </div>

                <span className="rounded-lg border border-border bg-secondary px-3 py-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                    Private
                </span>
            </div>

            <p className="mt-5 truncate font-mono text-xs text-muted-foreground">https://api.vertex.dev/auth/login</p>

            <p className="mt-4 line-clamp-2 text-sm leading-6 text-muted-foreground">
                Private authentication endpoint used by the main application. Accessible only within your workspace.
            </p>

            <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                <p className="text-xs text-muted-foreground">Updated Jul 25, 2026</p>

                <button className="rounded-lg border border-border px-3 py-1.5 text-xs hover:bg-secondary transition">
                    Open
                </button>
            </div>
        </div>
    );
};

export default VaultApiCard;
