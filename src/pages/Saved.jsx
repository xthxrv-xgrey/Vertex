import React from "react";
import SavedApiCard from "../components/card/SavedApiCard.jsx";
import { useApis } from "../features/api/useApi.js";

const Saved = () => {
    const { currentUserSavedApisData } = useApis();
    console.log("hello", currentUserSavedApisData);

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
            {/* Show APIs */}
            {currentUserSavedApisData.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {currentUserSavedApisData.map((api) => (
                        <SavedApiCard apiData={api} key={api} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
                    <h3 className="text-xl font-semibold">No saved APIs yet</h3>

                    <p className="mt-2 max-w-md text-sm text-muted-foreground">
                        Browse APIs in Sphere and save your favorites to access them quickly later.
                    </p>
                </div>
            )}
        </section>
    );
};

export default Saved;
