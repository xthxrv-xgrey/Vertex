import React from "react";
import { useParams } from "react-router";
import { Calendar, Globe, Mail, User } from "lucide-react";
import { RiGithubFill, RiLinkedinBoxFill } from "react-icons/ri";

import { useUser } from "../features/auth/useUser";

const StatusBadge = ({ children = "Upcoming" }) => (
    <span className="inline-flex items-center rounded-full border border-amber-500/20 bg-amber-500/10 px-2 py-1 text-xs font-medium text-amber-600">
        {children}
    </span>
);

const Profile = () => {
    const { username } = useParams();
    const { getUserByUsername } = useUser();

    const user = getUserByUsername(username);

    if (!user) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <h1 className="text-4xl font-bold text-muted-foreground">User does not exist.</h1>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto py-12 flex flex-col gap-10">
            {/* Header */}
            <div className="rounded-2xl border border-border bg-card p-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Avatar */}
                    <img
                        src={user.avatar}
                        alt={user.username}
                        className="w-36 h-36 rounded-full border border-border object-cover"
                    />

                    {/* Info */}
                    <div className="flex-1 flex flex-col gap-5">
                        <div>
                            <h1 className="text-3xl font-bold">
                                {user.firstName} {user.lastName}
                            </h1>

                            <p className="text-muted-foreground text-lg">@{user.username}</p>
                        </div>

                        <p className="text-foreground">{user.bio || "No bio added yet."}</p>

                        <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Mail size={16} />
                                {user.email}
                            </div>

                            <div className="flex items-center gap-2">
                                <Calendar size={16} />
                                Joined {new Date(user.createdAt).toLocaleDateString()}
                            </div>
                        </div>

                        {/* Socials */}
                        <div className="flex gap-4">
                            {user.github && (
                                <a
                                    href={user.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-2 rounded-lg border border-border hover:bg-accent transition"
                                >
                                    <RiGithubFill size={18} />
                                </a>
                            )}

                            {user.linkedin && (
                                <a
                                    href={user.linkedin}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-2 rounded-lg border border-border hover:bg-accent transition"
                                >
                                    <RiLinkedinBoxFill size={18} />
                                </a>
                            )}

                            {user.website && (
                                <a
                                    href={user.website}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-2 rounded-lg border border-border hover:bg-accent transition"
                                >
                                    <Globe size={18} />
                                </a>
                            )}
                        </div>

                        <p className="text-xs text-muted-foreground">More profile customization is in development.</p>
                    </div>
                </div>
            </div>

            {/* Information */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Account Information */}
                <div className="rounded-2xl border border-border bg-card p-6">
                    <div className="flex items-center gap-2 mb-6">
                        <h2 className="font-semibold text-lg">Account Information</h2>
                        <StatusBadge />
                    </div>

                    <div className="space-y-5">
                        <div>
                            <p className="text-sm text-muted-foreground">Full Name</p>

                            <p className="font-medium">
                                {user.firstName} {user.lastName}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">Username</p>

                            <p className="font-medium">@{user.username}</p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">Email</p>

                            <p className="font-medium">{user.email}</p>
                        </div>
                    </div>
                </div>

                {/* Activity */}
                <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6">
                    <div className="flex items-center gap-2 mb-6">
                        <h2 className="font-semibold text-lg">Activity Overview</h2>
                        <StatusBadge>In Development</StatusBadge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                        {["APIs", "Stars", "Forks", "Followers"].map((item) => (
                            <div key={item} className="rounded-xl border border-border p-5">
                                <p className="text-3xl font-bold">0</p>

                                <p className="text-sm text-muted-foreground mt-1">{item}</p>

                                <p className="text-xs text-amber-600 mt-2">Coming soon</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 flex flex-col items-center justify-center py-16 border border-dashed border-border rounded-xl">
                        <User size={48} className="text-muted-foreground mb-4" />

                        <h3 className="text-xl font-semibold">Activity Coming Soon</h3>

                        <p className="text-muted-foreground mt-2 text-center max-w-md">
                            API publishing, analytics, stars, forks, and followers tracking are currently in
                            development.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
