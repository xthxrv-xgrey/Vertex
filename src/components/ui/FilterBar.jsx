import { Search, X } from "lucide-react";

const METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"];

const METHOD_TEXT_CLASS = {
    GET: "text-method-get",
    POST: "text-method-post",
    PUT: "text-method-put",
    PATCH: "text-method-patch",
    DELETE: "text-method-delete",
};

/**
 * Reusable search + method + status filter bar.
 *
 * Props:
 * - search, onSearchChange
 * - method, onMethodChange        ("" = all methods)
 * - status, onStatusChange        ("" = all statuses)
 * - showStatus                    (default: true) — set false where status isn't relevant
 * - resultCount                   (optional) — shown next to the bar
 */
const FilterBar = ({
    search,
    onSearchChange,
    method,
    onMethodChange,
    status,
    onStatusChange,
    showStatus = true,
    resultCount,
}) => {
    const hasActiveFilters = search || method || status;

    const clearAll = () => {
        onSearchChange("");
        onMethodChange("");
        if (showStatus) onStatusChange("");
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
                {/* Search */}
                <div className="relative flex-1">
                    <Search
                        size={16}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search APIs..."
                        className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-1 focus:ring-ring"
                    />

                    {search && (
                        <button
                            type="button"
                            onClick={() => onSearchChange("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                            <X size={14} />
                        </button>
                    )}
                </div>

                {/* Status */}
                {showStatus && (
                    <select
                        value={status}
                        onChange={(e) => onStatusChange(e.target.value)}
                        className="rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring md:w-44"
                    >
                        <option value="">All statuses</option>
                        <option value="active">Active</option>
                        <option value="deprecated">Deprecated</option>
                        <option value="draft">Draft</option>
                    </select>
                )}

                {hasActiveFilters && (
                    <button
                        type="button"
                        onClick={clearAll}
                        className="flex items-center gap-1.5 rounded-xl border border-border px-4 py-2.5 text-sm text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                    >
                        <X size={14} />
                        Clear
                    </button>
                )}
            </div>

            {/* Method chips */}
            <div className="flex flex-wrap items-center gap-2">
                <button
                    type="button"
                    onClick={() => onMethodChange("")}
                    className={`rounded-lg border px-3 py-1.5 font-mono text-xs font-semibold transition ${
                        method === ""
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border text-muted-foreground hover:bg-secondary"
                    }`}
                >
                    ALL
                </button>

                {METHODS.map((m) => (
                    <button
                        key={m}
                        type="button"
                        onClick={() => onMethodChange(method === m ? "" : m)}
                        className={`rounded-lg border px-3 py-1.5 font-mono text-xs font-semibold transition ${
                            method === m
                                ? `border-border bg-secondary ${METHOD_TEXT_CLASS[m]}`
                                : "border-border text-muted-foreground hover:bg-secondary"
                        }`}
                    >
                        {m}
                    </button>
                ))}

                {typeof resultCount === "number" && (
                    <span className="ml-auto text-xs text-muted-foreground">
                        {resultCount} {resultCount === 1 ? "result" : "results"}
                    </span>
                )}
            </div>
        </div>
    );
};

export default FilterBar;
