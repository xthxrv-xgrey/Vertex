import React from "react";
import SavedApiCard from "../components/card/SavedApiCard.jsx";

const Saved = () => {
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

            {/* Show apis */}
            <div className="min-h-[50vh] grid grid-cols-1 lg:grid-cols-2 gap-4">
                <SavedApiCard />
                <SavedApiCard />
                <SavedApiCard />
                <SavedApiCard />
                <SavedApiCard />
                <SavedApiCard />
            </div>
        </section>
    );
};

export default Saved;
