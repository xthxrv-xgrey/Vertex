import React, { useMemo, useState } from "react";
import SavedApiCard from "../components/card/SavedApiCard.jsx";
import FilterBar from "../components/ui/FilterBar.jsx";
import { useApis } from "../features/api/useApi.js";

const Saved = () => {
    const { currentUserSavedApisData } = useApis();

    const [search, setSearch] = useState("");
    const [method, setMethod] = useState("");
    const [status, setStatus] = useState("");

    const apiDisplay = useMemo(() => {
        return currentUserSavedApisData.filter((api) => {
            const matchesSearch = api.title.toLowerCase().includes(search.toLowerCase());
            const matchesMethod = !method || api.method === method;
            const matchesStatus = !status || api.status === status;

            return matchesSearch && matchesMethod && matchesStatus;
        });
    }, [search, method, status, currentUserSavedApisData]);

    const hasActiveFilters = search || method || status;

    return (
        <section className="flex flex-col gap-12 py-10">
            {/* Hero */}
            <section className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div className="space-y-3">
                    <h1 className="text-4xl font-semibold tracking-tight">Saved</h1>

                    <p className="max-w-xl text-sm leading-6 text-muted-foreground">
                        APIs you've bookmarked from Sphere.
                    </p>
                </div>
            </section>

            {/* Filter Bar */}
            {currentUserSavedApisData.length > 0 && (
                <FilterBar
                    search={search}
                    onSearchChange={setSearch}
                    method={method}
                    onMethodChange={setMethod}
                    status={status}
                    onStatusChange={setStatus}
                    resultCount={apiDisplay.length}
                />
            )}

            {/* Show APIs */}
            {apiDisplay.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {apiDisplay.map((api) => (
                        <SavedApiCard apiData={api} key={api.id} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
                    <h3 className="text-xl font-semibold">
                        {hasActiveFilters ? "No saved APIs found" : "No saved APIs yet"}
                    </h3>

                    <p className="mt-2 max-w-md text-sm text-muted-foreground">
                        {hasActiveFilters
                            ? "No saved APIs match your filters. Try adjusting your search or clearing filters."
                            : "Browse APIs in Sphere and save your favorites to access them quickly later."}
                    </p>
                </div>
            )}
        </section>
    );
};

export default Saved;
