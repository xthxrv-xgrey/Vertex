import { useState } from "react";
import { useParams } from "react-router";
import { Calendar, Globe, Mail, Pencil, User, FolderGit2 } from "lucide-react";
import { RiGithubFill, RiLinkedinBoxFill } from "react-icons/ri";

import { useUser } from "../features/auth/useUser";
import { useAuth } from "../features/auth/useAuth";
import EditProfileModal from "../components/modals/EditProfileModal";

const ProfilePage = () => {
    const { username } = useParams();

    const { getUserByUsername } = useUser();
    const { currentUser } = useAuth();

    const user = getUserByUsername(username);

    const [editing, setEditing] = useState(false);
    if (!user) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <h1 className="text-3xl font-bold text-muted-foreground">User not found.</h1>
            </div>
        );
    }

    const isOwner = username === user.username;

    return (
        <div className="max-w-6xl mx-auto py-10 space-y-8">
            {/* ================= HEADER ================= */}

            <div className="rounded-3xl border border-border bg-card p-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Avatar */}
                    <img
                        src={user.avatar}
                        alt={user.username}
                        className="w-32 h-32 rounded-full object-cover border border-border shrink-0"
                    />

                    {/* Right Side */}
                    <div className="flex-1 flex flex-col">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-bold font-logo">
                                    {user.firstName} {user.lastName}
                                </h1>

                                <p className="mt-1 text-muted-foreground text-sm font-logo">@{user.username}</p>
                            </div>

                            {isOwner && (
                                <button
                                    onClick={() => setEditing(true)}
                                    className="bg-primary text-primary-foreground inline-flex items-center gap-2 rounded-xl border border-primary px-4 py-2 hover:bg-primary-foreground hover:text-primary transition active:scale-98"
                                >
                                    <Pencil size={16} />
                                    Edit Profile
                                </button>
                            )}
                        </div>

                        <p className="mt-5 leading-7 text-foreground max-w-3xl">
                            {user.bio
                                ? user.bio
                                : isOwner
                                  ? "Tell people a little about yourself."
                                  : "This user hasn't added a bio yet."}
                        </p>

                        <div className="flex flex-wrap gap-6 mt-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Mail size={16} />
                                {user.email}
                            </div>

                            <div className="flex items-center gap-2">
                                <Calendar size={16} />
                                Joined {new Date(user.createdAt).toLocaleDateString()}
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mt-6">
                            {user.github && (
                                <a
                                    href={user.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-10 h-10 rounded-xl border border-border flex items-center justify-center hover:bg-accent transition"
                                >
                                    <RiGithubFill size={18} />
                                </a>
                            )}

                            {user.linkedin && (
                                <a
                                    href={user.linkedin}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-10 h-10 rounded-xl border border-border flex items-center justify-center hover:bg-accent transition"
                                >
                                    <RiLinkedinBoxFill size={18} />
                                </a>
                            )}

                            {user.website && (
                                <a
                                    href={user.website}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-10 h-10 rounded-xl border border-border flex items-center justify-center hover:bg-accent transition"
                                >
                                    <Globe size={18} />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* ================= CONTENT ================= */}

            <div className="grid lg:grid-cols-3 gap-8">
                {/* LEFT */}

                <div className="space-y-6">
                    <div className="rounded-2xl border border-border bg-card p-6">
                        <h2 className="text-lg font-semibold mb-6">Account Information</h2>

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

                            <div>
                                <p className="text-sm text-muted-foreground">Member Since</p>
                                <p className="font-medium">{new Date(user.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT */}

                <div className="lg:col-span-2">
                    <div className="rounded-2xl border border-border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold">Published APIs</h2>

                            <span className="text-sm text-muted-foreground">0 APIs</span>
                        </div>

                        <div className="mt-8 border border-dashed border-border rounded-2xl py-20 flex flex-col items-center">
                            <FolderGit2 className="text-muted-foreground" size={54} />

                            <h3 className="text-xl font-semibold mt-6">No APIs Published</h3>

                            <p className="text-muted-foreground mt-2 text-center max-w-sm">
                                {isOwner
                                    ? "You haven't published any APIs yet."
                                    : "This user hasn't published any APIs yet."}
                            </p>

                            {isOwner && (
                                <button className="mt-8 px-5 py-2 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition">
                                    Publish your first API
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* TODO:
                Replace with your EditProfileModal
            */}

            {editing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
                    <div className="w-full max-w-2xl max-h-[85vh] rounded-3xl border border-border bg-card shadow-2xl overflow-hidden flex flex-col">
                        {/* Header */}
                        <div className="flex items-center justify-between px-8 py-5 border-b border-border">
                            <div>
                                <h2 className="text-xl font-semibold">Edit Profile</h2>
                                <p className="text-sm text-muted-foreground">Update your personal information</p>
                            </div>

                            <button
                                onClick={() => setEditing(false)}
                                className="w-9 h-9 rounded-full bg-primary text-primary-foreground border border-border transition active:scale-98"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Scroll Area */}
                        <div className="overflow-y-auto px-8 py-6">
                            <EditProfileModal defaultData={user} setEditing={setEditing} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
