import { useState, useMemo } from "react";
import SphereApiCard from "../components/card/SphereApiCard.jsx";
import FilterBar from "../components/ui/FilterBar.jsx";
import { useApis } from "../features/api/useApi.js";

const Sphere = () => {
    const { publicApisData } = useApis();

    const [search, setSearch] = useState("");
    const [method, setMethod] = useState("");
    const [status, setStatus] = useState("");

    const apiDisplay = useMemo(() => {
        return publicApisData.filter((api) => {
            const matchesSearch = api.title.toLowerCase().includes(search.toLowerCase());
            const matchesMethod = !method || api.method === method;
            const matchesStatus = !status || api.status === status;

            return matchesSearch && matchesMethod && matchesStatus;
        });
    }, [search, method, status, publicApisData]);

    const hasActiveFilters = search || method || status;

    return (
        <section className="flex flex-col gap-12 py-10">
            {/* Hero */}
            <section className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div className="space-y-3">
                    <h1 className="text-4xl font-semibold tracking-tight">Sphere</h1>

                    <p className="max-w-xl text-sm leading-6 text-muted-foreground">
                        Public APIs shared by developers on Vertex.
                    </p>
                </div>
            </section>

            {/* Filter Bar */}
            <FilterBar
                search={search}
                onSearchChange={setSearch}
                method={method}
                onMethodChange={setMethod}
                status={status}
                onStatusChange={setStatus}
                resultCount={apiDisplay.length}
            />

            {/* Show APIs */}
            {apiDisplay.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {apiDisplay.map((api) => (
                        <SphereApiCard apiData={api} key={api.id} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
                    <h3 className="text-xl font-semibold">
                        {hasActiveFilters ? "No APIs found" : "No public APIs yet"}
                    </h3>

                    <p className="mt-2 max-w-md text-sm text-muted-foreground">
                        {hasActiveFilters
                            ? "No public APIs match your filters. Try adjusting your search or clearing filters."
                            : "There are no public APIs available at the moment. Check back later to discover APIs shared by the community."}
                    </p>
                </div>
            )}
        </section>
    );
};

export default Sphere;
