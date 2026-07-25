import React from "react";
import { Link } from "react-router";
import { Plus } from "lucide-react";
import RecentActivityCard from "../components/card/RecentActivityCard.jsx";

import { useUser } from "../features/auth/useUser.js";

const Dashboard = () => {
    const today = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
    }).format(new Date());

    const { firstName } = useUser();

    return (
        <section className="flex flex-col gap-12 py-10">
            {/* Hero */}
            <section className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">{today}</p>

                    <h1 className="text-4xl font-semibold tracking-tight">Welcome back, {firstName}.</h1>

                    <p className="max-w-xl text-sm leading-6 text-muted-foreground">
                        Your workspace is ready. Create, organize, and share APIs without the clutter.
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

            {/* Statistics */}
            <section className="overflow-hidden rounded-2xl border border-border md:flex">
                <div className="flex-1 border-border p-6 not-last:border-b md:not-last:border-r md:not-last:border-b-0">
                    <p className="font-mono text-sm uppercase tracking-wide text-muted-foreground">Total APIs</p>

                    <p className="mt-6 text-4xl font-semibold tracking-tight">{1}</p>

                    <p className="mt-2 text-sm text-muted-foreground">In your workspace</p>
                </div>

                <div className="flex-1 border-border p-6 not-last:border-b md:not-last:border-r md:not-last:border-b-0">
                    <p className="font-mono text-sm uppercase tracking-wide text-muted-foreground">Public APIs</p>

                    <p className="mt-6 text-4xl font-semibold tracking-tight">1</p>

                    <p className="mt-2 text-sm text-muted-foreground">Visible to everyone</p>
                </div>

                <div className="flex-1 border-border p-6 not-last:border-b md:not-last:border-r md:not-last:border-b-0">
                    <p className="font-mono text-sm uppercase tracking-wide text-muted-foreground">Saved</p>

                    <p className="mt-6 text-4xl font-semibold tracking-tight">1</p>

                    <p className="mt-2 text-sm text-muted-foreground">Bookmarked APIs</p>
                </div>
            </section>

            {/* Recent Activity */}
            <section className="space-y-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold">Recent activity</h2>

                    <Link to="/vault" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                        View all →
                    </Link>
                </div>

                <div className="space-y-4">
                    <RecentActivityCard />
                    <RecentActivityCard />
                    <RecentActivityCard />
                    <RecentActivityCard />
                </div>

                {/* Empty State */}

                {/* <div className="rounded-xl border border-dashed border-border py-12 text-center">
                    <h3 className="font-medium">
                        No recent activity
                    </h3>

                    <p className="mt-2 text-sm text-muted-foreground">
                        Create your first API to get started.
                    </p>
                </div> */}
            </section>
        </section>
    );
};

export default Dashboard;
