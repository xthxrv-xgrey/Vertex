import React, { useMemo, useState } from "react";
import { Link } from "react-router";
import { Plus } from "lucide-react";
import VaultApiCard from "../components/card/VaultApiCard.jsx";
import { useApis } from "../features/api/useApi.js";

const Vault = () => {
    const { currentUserApisData } = useApis();

    const [search, setSearch] = useState("");

    const apiDisplay = useMemo(() => {
        return currentUserApisData.filter((api) => api.title.toLowerCase().includes(search.toLowerCase()));
    }, [search, currentUserApisData]);

    return (
        <section className="flex flex-col gap-12 py-10">
            {/* Hero */}
            <section className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div className="space-y-3">
                    <h1 className="text-4xl font-semibold tracking-tight">Vault</h1>

                    <p className="max-w-xl text-sm leading-6 text-muted-foreground">
                        Your personal collection of APIs.
                    </p>
                </div>

                <Link
                    to="/createApi"
                    className="flex w-max items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground transition-all hover:opacity-90 active:scale-95"
                >
                    <Plus size={18} />
                    Create API
                </Link>
            </section>
            {/* SearchBar */}
            <h2>Search bar comes here leaving space</h2>

            {/* Show APIs */}
            {apiDisplay.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {apiDisplay.map((api) => (
                        <VaultApiCard apiData={api} key={api.id} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
                    <h3 className="text-xl font-semibold">{search ? "No APIs found" : "No APIs yet"}</h3>

                    <p className="mt-2 max-w-md text-sm text-muted-foreground">
                        {search
                            ? `No APIs match "${search}". Try a different search term.`
                            : "Create your first API to start building your personal vault."}
                    </p>

                    {!search && (
                        <Link
                            to="/createApi"
                            className="mt-6 flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground transition hover:opacity-90"
                        >
                            <Plus size={18} />
                            Create API
                        </Link>
                    )}
                </div>
            )}
        </section>
    );
};

export default Vault;
