import React from "react";
import { Link } from "react-router";
import { Plus } from "lucide-react";
import VaultApiCard from "../components/card/VaultApiCard.jsx";

const Vault = () => {
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

            {/* Show apis */}
            <div className="min-h-[50vh] grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* max 5 */}
                <VaultApiCard />
                <VaultApiCard />
                <VaultApiCard />
                <VaultApiCard />
                <VaultApiCard />
            </div>
        </section>
    );
};

export default Vault;
