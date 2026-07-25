import { Link } from "react-router";
import { Plus } from "lucide-react";
import SphereApiCard from "../components/card/SphereApiCard.jsx";
import { useApis } from "../features/api/useApi.js";
import { useState, useMemo } from "react";

const Sphere = () => {
    const { publicApisData } = useApis();

    const [search, setSearch] = useState("");

    const apiDisplay = useMemo(() => {
        return publicApisData.filter((api) => api.title.toLowerCase().includes(search.toLowerCase()));
    }, [search, publicApisData]);

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
            {/* SearchBar */}
            <h2>Search bar comes here leaving space</h2>

            {/* Show apis */}
            <div className="min-h-[50vh] grid grid-cols-1 lg:grid-cols-2 gap-4">
                {apiDisplay.map((api) => (
                    <SphereApiCard apiData={api} key={api.id} />
                ))}
            </div>
        </section>
    );
};

export default Sphere;
